export type Component = {
  componentName: string;
  description?: string;
  installed: boolean;
  installedFiles?: string[];
  dependencies?: string[];
};

export type Block = {
  name: string;
  title: string;
  description?: string;
  type: string;
  files?: Record<string, string>;
  dependencies?: string[];
  registryDependencies?: string[];
};

/**
 * Installation options
 */
export interface InstallOptions {
  targetDir: string;
  force?: boolean;
  dependencies?: boolean;
}

/**
 * Installation result
 */
export interface InstallResult {
  success: boolean;
  files: string[];
  componentName?: string;
  blockName?: string;
  message?: string;
}

// Registry item types
export type RegistryItemType = "component" | "block" | "primitive" | "theme";

// Registry item interface
export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  description?: string;
  dependencies?: string[];
  files?: Record<string, string>;
}

// Registry data interface
export interface RegistryData {
  components?: Record<string, RegistryItem>;
  blocks?: Record<string, RegistryItem>;
  primitives?: Record<string, RegistryItem>;
  theme?: RegistryItem;
}
