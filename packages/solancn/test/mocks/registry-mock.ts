import { z } from "zod";
import { 
  iconsSchema,
  registryBaseColorSchema, 
  registryIndexSchema, 
  registryItemSchema,
  registryResolvedItemsTreeSchema,
  stylesSchema
} from "../../src/registry/schema";
import { Config } from "../../src/utils/get-config";
import { vi } from "vitest";

// Mock registry data
const mockRegistryIndex = [
  {
    name: "accordion",
    type: "components:ui",
    registryDependencies: ["react-icons"],
    dependencies: ["@radix-ui/react-accordion"],
    files: ["ui/accordion.tsx"]
  },
  {
    name: "alert-dialog",
    type: "components:ui",
    registryDependencies: [],
    dependencies: ["@radix-ui/react-alert-dialog"],
    files: ["ui/alert-dialog.tsx"]
  },
  {
    name: "button",
    type: "components:ui",
    registryDependencies: [],
    dependencies: [],
    files: ["ui/button.tsx"]
  },
  {
    name: "new-york",
    type: "style",
    registryDependencies: [],
    dependencies: [
      "tailwindcss-animate",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
      "@radix-ui/react-icons"
    ],
    files: []
  }
];

const mockStyles = [
  {
    name: "default",
    label: "Default"
  },
  {
    name: "new-york",
    label: "New York"
  }
];

const mockIcons = {
  "lucide-react": {
    name: "lucide-react",
    label: "Lucide",
    files: ["icons/lucide.ts"]
  },
  "react-icons": {
    name: "react-icons",
    label: "React Icons",
    files: ["icons/react-icons.ts"]
  }
};

const mockBaseColor = {
  inlineColors: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(0 0% 3.9%)",
    primary: "hsl(0 0% 9%)",
    "primary-foreground": "hsl(0 0% 98%)",
    muted: "hsl(0 0% 96.1%)",
    "muted-foreground": "hsl(0 0% 45.1%)"
  },
  cssVars: {
    "--background": "0 0% 100%",
    "--foreground": "0 0% 3.9%",
    "--primary": "0 0% 9%",
    "--primary-foreground": "0 0% 98%",
    "--muted": "0 0% 96.1%",
    "--muted-foreground": "0 0% 45.1%"
  },
  inlineColorsTemplate: "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n",
  cssVarsTemplate: "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n  --background: 0 0% 100%;\n  --foreground: 0 0% 3.9%;\n}\n"
};

const mockItem = {
  name: "new-york",
  type: "style",
  dependencies: [
    "tailwindcss-animate",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "lucide-react",
    "@radix-ui/react-icons"
  ],
  registryDependencies: [],
  files: [],
  tailwind: {
    config: {
      theme: {
        extend: {
          borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)"
          }
        }
      },
      plugins: ['require("tailwindcss-animate")']
    },
    cssVariables: {
      "--radius": "0.5rem"
    },
    content: []
  }
};

const mockResolvedItemsTree = {
  resolvedItems: [
    {
      name: "accordion",
      type: "components:ui",
      dependencies: ["@radix-ui/react-accordion"],
      registryDependencies: ["react-icons"],
      files: ["ui/accordion.tsx"]
    },
    {
      name: "react-icons",
      type: "components:icons",
      dependencies: ["react-icons"],
      registryDependencies: [],
      files: ["icons/react-icons.ts"]
    }
  ],
  affectedFiles: ["ui/accordion.tsx", "icons/react-icons.ts"]
};

// Mock functions
export const getRegistryIndex = vi.fn().mockResolvedValue(mockRegistryIndex);

export const getRegistryStyles = vi.fn().mockResolvedValue(mockStyles);

export const getRegistryIcons = vi.fn().mockResolvedValue(mockIcons);

export const getRegistryItem = vi.fn().mockResolvedValue(mockItem);

export const getRegistryBaseColors = vi.fn().mockResolvedValue([
  { name: "neutral", label: "Neutral" },
  { name: "gray", label: "Gray" },
  { name: "zinc", label: "Zinc" },
  { name: "stone", label: "Stone" },
  { name: "slate", label: "Slate" }
]);

export const getRegistryBaseColor = vi.fn().mockResolvedValue(mockBaseColor);

export const resolveTree = vi.fn().mockImplementation((index, names) => {
  const tree = [];
  
  for (const name of names) {
    const entry = index.find((entry: any) => entry.name === name);
    if (entry) {
      tree.push(entry);
    }
  }
  
  return Promise.resolve(tree);
});

export const fetchTree = vi.fn().mockImplementation((style, tree) => {
  return Promise.resolve(tree.map((item: any) => ({ ...item })));
});

export const getItemTargetPath = vi.fn().mockImplementation((config, item, override) => {
  if (override) return override;
  
  switch (item.type) {
    case "components:ui":
      return config.ui;
    case "components:icons":
      return config.icons || config.ui;
    case "components:page":
      return config.ui;
    default:
      return config.ui;
  }
});

export const fetchRegistry = vi.fn().mockImplementation((paths) => {
  const results = paths.map((path: string) => {
    if (path.includes("index.json")) return mockRegistryIndex;
    if (path.includes("styles/index.json")) return mockStyles;
    if (path.includes("icons/index.json")) return mockIcons;
    if (path.includes("colors/")) return mockBaseColor;
    if (path.includes("new-york.json")) return mockItem;
    return {};
  });
  
  return Promise.resolve(results);
});

export const clearRegistryCache = vi.fn();

export const registryResolveItemsTree = vi.fn().mockResolvedValue(mockResolvedItemsTree);

export const resolveRegistryDependencies = vi.fn().mockResolvedValue([
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge"
]);

export const registryGetTheme = vi.fn().mockImplementation((name, config) => {
  return Promise.resolve({
    theme: {
      extend: {
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)"
        }
      }
    },
    plugins: ['require("tailwindcss-animate")']
  });
});

export const getRegistryUrl = vi.fn().mockImplementation((path) => {
  return `https://ui.shadcn.com/r/${path}`;
});

export const isUrl = vi.fn().mockImplementation((path) => {
  return path.startsWith("http://") || path.startsWith("https://");
});

export const resolveRegistryItems = vi.fn().mockResolvedValue([mockItem]);

export const getRegistryTypeAliasMap = vi.fn().mockReturnValue({
  ui: "components:ui",
  component: "components:ui",
  components: "components:ui",
  icon: "components:icons",
  icons: "components:icons"
});

export const getRegistryParentMap = vi.fn().mockImplementation((registryItems) => {
  const parentMap = new Map();
  
  registryItems.forEach((item: any) => {
    if (item.registryDependencies) {
      item.registryDependencies.forEach((dep: any) => {
        if (!parentMap.has(dep)) {
          parentMap.set(dep, []);
        }
        
        parentMap.get(dep).push(item.name);
      });
    }
  });
  
  return parentMap;
});
