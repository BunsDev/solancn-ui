// Registry item types
export type RegistryItemType = "registry:component" | "registry:block" | "registry:ui" | "registry:theme";

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
  ui?: Record<string, RegistryItem>;
  theme?: RegistryItem;
}
