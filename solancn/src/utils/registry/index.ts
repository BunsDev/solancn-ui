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
  mockIndexDataObject,
  stylesData,
  mockRegistryItem,
  mockBaseColor,
} from "./mock-registry";

// Use Solancn registry for components
const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? "https://ui.solancn.com";

type theTree = z.infer<typeof registryIndexSchema>;

const agent = process.env.https_proxy
  ? new HttpsProxyAgent(process.env.https_proxy)
  : undefined;

export async function getRegistryIndexSolancn(env?: boolean) {
  try {
    const [result] = await fetchRegistry(["index.json"]);
    const registryURL = `${baseUrl}/registry/index.json`;
    console.log({ registryURL });
    console.log({ result });
    // Check if result is an object (new format) or array (old format)
    if (result && typeof result === "object" && !Array.isArray(result)) {
      // Convert object format to array format required by the CLI
      const registryArray = Object.entries(result as Record<string, any>).map(
        ([key, value]) => {
          return { ...value, name: key };
        },
      );
      const registryIndex = registryIndexSchema.parse(registryArray);
      console.log({ registryIndex });
      return registryIndex;
    } else {
      // Handle case where result is already an array (fallback)
      const registryIndex = registryIndexSchema.parse(result);
      console.log({ registryIndex });
      return registryIndex;
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to fetch components from SolancnUI registry. Check if ${baseUrl} is accessible.`,
    );
  }
}

// This function has been removed as we're only using Solancn registry

export async function getRegistryStyles() {
  const registryStyles = await fetchRegistry(["styles/index.json"]);
  console.log({ registryStyles });
  return stylesSchema.parse(registryStyles);
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
  const registryBaseColor = registryBaseColorSchema.parse(mockBaseColor);
  console.log({ registryBaseColor });
  return registryBaseColor;
  // try {
  //   const [result] = await fetchRegistry([`colors/${baseColor}.json`]);

  //   return registryBaseColorSchema.parse(result);
  // } catch (error) {
  //   throw new Error("Failed to fetch base color from Solancn registry.");
  // }
}

export async function resolveTreeWithDependencies(
  index: theTree,
  names: string[],
): Promise<theTree> {
  const tree: theTree = [];

  for (const name of names) {
    // Find entry in the Solancn registry
    const entry = index.find((e) => e.name === name);

    if (!entry) {
      continue;
    }

    tree.push(entry);

    // Resolve dependencies recursively
    if (entry.registryDependencies) {
      const dependencies = await resolveTreeWithDependencies(
        index,
        entry.registryDependencies
      );
      tree.push(...dependencies);
    }
  }

  // Remove duplicates
  return tree.filter(
    (component, index, self) =>
      self.findIndex((c) => c.name === component.name) === index,
  );
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

export async function fetchTree(tree: theTree) {
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

export async function fetchTreeStyled(style: string, tree: theTree) {
  try {
    const paths = tree.map((item) => `styles/${style}/${item.name}.json`);
    const result = await fetchRegistry(paths);

    return registryWithContentSchema.parse(result);
  } catch (error) {
    throw new Error(`Failed to fetch styled components from Solancn UI registry.`);
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
  const parentPath =
    config.resolvedPaths[parent as keyof typeof config.resolvedPaths];

  // Check if parentPath is defined before joining
  if (!parentPath) {
    return null;
  }

  return path.join(parentPath, type);
}

async function fetchRegistry(paths: string[], customBaseUrl?: string) {
  // Use mock data when in test mode
  if (process.env.TEST_MODE === "true") {
    return paths.map(() => mockRegistryItem);
  }

  const urlToUse = customBaseUrl || baseUrl;

  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${urlToUse}/registry/${path}`, {
          agent,
        });
        return await response.json();
      }),
    );
    return results;
  } catch (error) {
    throw new Error(`Failed to fetch registry from ${urlToUse}.`);
  }
}
