import type React from "react";

export interface Component extends RegistryItem {
  name: string;
  title: string;
  installed: boolean;
  type: "registry:component";
  preview: React.ReactNode;
  description?: string;
  category?: string;
  tags?: string[];
  installedFiles?: string[];
  dependencies?: string[];
  categoryName?: string;
  categoryColor?: string;
}

export interface Block extends RegistryItem {
  name: string;
  title: string;
  type: "registry:block";
  preview: React.ReactNode;
  description?: string;
  category?: string;
  tags?: string[];
  files?: Record<string, string>;
  dependencies?: string[];
  registryDependencies?: string[];
  categoryName?: string;
  categoryColor?: string;
}

export interface UIPrimitive extends RegistryItem {
  name: string;
  title: string;
  type: "registry:ui";
  preview: React.ReactNode;
  description?: string;
  category?: string;
  tags?: string[];
  files?: Record<string, string>;
  dependencies?: string[];
  registryDependencies?: string[];
  categoryName?: string;
  categoryColor?: string;
}

export interface Theme extends RegistryItem {
  name: string;
  title: string;
  type: "registry:theme";
  preview?: React.ReactNode;
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

export interface Category {
  name: string;
  color: string;
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
  title: string;
  type: RegistryItemType;
  preview?: React.ReactNode;
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

export interface SwapToken {
  symbol: string;
  name: string;
  logo: string;
  decimals: number;
  address?: string;
  balance?: number;
  price?: number;
  priceChange?: number;
}

export interface SwapRoute {
  name: string;
  icon: React.ReactNode;
  value: string;
  fee: number;
  time: string;
  impact: number;
  optimizedFor: string;
}
