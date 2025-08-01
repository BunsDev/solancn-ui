import path from "path";
import { Config } from "../get-config";
import {
  registryBaseColorSchema,
  registryIndexSchema,
  registryItemWithContentSchema,
  registryWithContentSchema,
  stylesSchema,
} from "./schema";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";
import { z } from "zod";

// Import mock data for testing
import { 
  mockIndexData,
  mockStylesData,
  mockRegistryItem,
  mockBaseColor 
} from "./mock-registry";

// Temporarily use Shadcn UI registry as fallback when Solancn registry is unavailable
const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? "https://ui.shadcn.com";
const shadcnBaseUrl = "https://ui.shadcn.com";

type theTree = z.infer<typeof registryIndexSchema>;

const agent = process.env.https_proxy
  ? new HttpsProxyAgent(process.env.https_proxy)
  : undefined;

export async function getRegistryIndexSolancn(env?: boolean) {
  // Use mock data when in test mode
  if (process.env.TEST_MODE === 'true') {
    return registryIndexSchema.parse(mockIndexData);
  }
  
  try {
    const [result] = await fetchRegistry(["index.json"], baseUrl);

    // Check if result is an object (new format) or array (old format)
    if (result && typeof result === 'object' && !Array.isArray(result)) {
      // Convert object format to array format required by the CLI
      const registryArray = Object.entries(result as Record<string, any>).map(([key, value]) => {
        return { ...value, name: key };
      });
      
      return registryIndexSchema.parse(registryArray);
    } else {
      // Handle case where result is already an array (fallback)
      return registryIndexSchema.parse(result);
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch components from SolancnUI registry. Check if ${baseUrl} is accessible.`);
  }
}

export async function getRegistryIndexShadcn() {
  // Use mock data when in test mode
  if (process.env.TEST_MODE === 'true') {
    return registryIndexSchema.parse(mockIndexData);
  }
  
  try {
    const [result] = await fetchRegistry(["index.json"], shadcnBaseUrl);

    return registryIndexSchema.parse(result);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch components from ShadcnUI registry. Check if https://ui.shadcn.com is accessible or use --registry flag to specify an alternative.");
  }
}

export async function getRegistryStyles() {
  // Use mock data when in test mode
  if (process.env.TEST_MODE === 'true') {
    return stylesSchema.parse(mockStylesData);
  }

  try {
    const [result] = await fetchRegistry(["styles/index.json"], shadcnBaseUrl);

    return stylesSchema.parse(result);
  } catch (error) {
    throw new Error("Failed to fetch styles from registry.");
  }
}

export async function getRegistryBaseColors() {
  return [
    {
      name: "slate",
      label: "Slate",
    },
    {
      name: "gray",
      label: "Gray",
    },
    {
      name: "zinc",
      label: "Zinc",
    },
    {
      name: "neutral",
      label: "Neutral",
    },
    {
      name: "stone",
      label: "Stone",
    },
  ];
}

export async function getRegistryBaseColor(baseColor: string) {
  // Use mock data when in test mode
  if (process.env.TEST_MODE === 'true') {
    return registryBaseColorSchema.parse(mockBaseColor);
  }

  try {
    const [result] = await fetchRegistry(
      [`colors/${baseColor}.json`],
      shadcnBaseUrl,
    );

    return registryBaseColorSchema.parse(result);
  } catch (error) {
    throw new Error("Failed to fetch base color from registry.");
  }
}

export async function resolveTreeWithShadcn(
  shadcnIndex: theTree,
  index: theTree,
  names: string[],
  calledByShadcn = false,
): Promise<{ shadcnTree: theTree; solancnTree: theTree }> {
  const shadcnTree: theTree = [];
  const solancnTree: theTree = [];

  for (const name of names) {
    if (!calledByShadcn) {
      const entry = index.find((e) => e.name === name);

      if (!entry) {
        const newName = name.split(":")[1];
        const shadcnEntry = shadcnIndex.find((e) => e.name === newName);

        if (!shadcnEntry) {
          continue;
        }
        shadcnTree.push(shadcnEntry);

        if (shadcnEntry.registryDependencies) {
          const { shadcnTree: shadcnTreeDependencies } =
            await resolveTreeWithShadcn(
              shadcnIndex,
              index,
              shadcnEntry.registryDependencies,
              true,
            );
          shadcnTree.push(...shadcnTreeDependencies);
        }
      }

      entry && solancnTree.push(entry);

      if (entry && entry.registryDependencies) {
        const {
          solancnTree: solancnTreeDependencies,
          shadcnTree: shadcnTreeDependencies,
        } = await resolveTreeWithShadcn(
          shadcnIndex,
          index,
          entry.registryDependencies,
          false,
        );
        shadcnTree.push(...shadcnTreeDependencies);
        solancnTree.push(...solancnTreeDependencies);
      }
    } else {
      const entry = shadcnIndex.find((e) => e.name === name);

      if (!entry) {
        continue;
      }

      shadcnTree.push(entry);

      if (entry.registryDependencies) {
        const { shadcnTree: shadcnTreeDependencies } =
          await resolveTreeWithShadcn(
            shadcnIndex,
            index,
            entry.registryDependencies,
            true,
          );
        shadcnTree.push(...shadcnTreeDependencies);
      }
    }
  }

  return {
    shadcnTree: shadcnTree.filter(
      (component, index, self) =>
        self.findIndex((c) => c.name === component.name) === index,
    ),
    solancnTree: solancnTree.filter(
      (component, index, self) =>
        self.findIndex((c) => c.name === component.name) === index,
    ),
  };
}

export async function resolveTree(index: theTree, names: string[]) {
  const tree: theTree = [];

  for (const name of names) {
    const entry = index.find((entry) => entry.name === name);

    if (!entry) {
      continue;
    }

    tree.push(entry);

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies);
      tree.push(...dependencies);
    }
  }

  return tree.filter(
    (component, index, self) =>
      self.findIndex((c) => c.name === component.name) === index,
  );
}

export async function fetchTree(tree: theTree, env?: string) {
  try {
    const treeNormal = tree.filter((item) => !item.type.includes("components"));
    // {baseUrl}/registry/components/solancn/[name].json.
    const paths = treeNormal.map((item) => {
      const [parent, subfolder] = item.type.split(":");
      return `${parent}/${subfolder}/${item.name}.json`;
    });
    const result = await fetchRegistry(paths, baseUrl);

    return registryWithContentSchema.parse([...result]);
  } catch (error) {
    throw new Error(`Failed to fetch tree from Solancn UI registry.`);
  }
}

export async function fetchTreeFromShadcn(style: string, tree: theTree) {
  try {
    const paths = tree.map((item) => `styles/${style}/${item.name}.json`);
    const result = await fetchRegistry(paths, shadcnBaseUrl);

    return registryWithContentSchema.parse(result);
  } catch (error) {
    throw new Error(`Failed to fetch tree from Shadcn UI registry.`);
  }
}

export async function getItemTargetPath(
  config: Config,
  item: Pick<z.infer<typeof registryItemWithContentSchema>, "type">,
  override?: string,
) {
  if (override) {
    return override;
  }

  const [parent, type] = item.type.split(":");
  if (!(parent in config.resolvedPaths)) {
    return null;
  }

  // Get the path from resolvedPaths, ensuring it's a string
  const parentPath = config.resolvedPaths[parent as keyof typeof config.resolvedPaths];
  
  // Check if parentPath is defined before joining
  if (!parentPath) {
    return null;
  }
  
return path.join(parentPath, type);
}

async function fetchRegistry(paths: string[], fetchBaseUrl = baseUrl) {
  // Use mock data when in test mode
  if (process.env.TEST_MODE === 'true') {
    return paths.map(() => mockRegistryItem);
  }

  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${fetchBaseUrl}/registry/${path}`, {
          agent,
        });
        return await response.json();
      }),
    );
    return results;
  } catch (error) {
    throw new Error(`Failed to fetch registry from ${fetchBaseUrl}.`);
  }
}
