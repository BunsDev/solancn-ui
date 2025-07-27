export interface Component extends RegistryItem {
  name: string;
  title: string;
  installed: boolean;
  type: "registry:component";
  description?: string;
  category?: string;
  tags?: string[];
  installedFiles?: string[];
  dependencies?: string[];
}

export interface Block extends RegistryItem {
  name: string;
  title: string;
  type: "registry:block";
  description?: string;
  category?: string;
  tags?: string[];
  files?: Record<string, string>;
  dependencies?: string[];
  registryDependencies?: string[];
}

/**
 * Installation options
 */
export interface InstallOptions {
  targetDir: string;
  force?: boolean;
  dependencies?: boolean;
}

export interface uninstallOptions {
  targetDir: string;
  dependencies?: boolean;
}

/**
 * Installation result
 */
export interface InstallResult {
  success: boolean;
  files: string[];
  name?: string;
  message?: string;
}

// Registry item types
export type RegistryItemType =
  | "registry:component"
  | "registry:block"
  | "registry:ui"
  | "registry:theme";

// Registry item interface
export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  description?: string;
  category?: string;
  tags?: string[];
  dependencies?: string[];
  files?: Record<string, string>;
}

// Registry data interface
export interface RegistryData {
  components?: Record<string, RegistryItem>;
  blocks?: Record<string, RegistryItem>;
  ui?: Record<string, RegistryItem>;
  theme?: RegistryItem;
}
