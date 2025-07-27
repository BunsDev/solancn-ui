// biome-ignore lint/style/useNodejsImportProtocol: disables biome linting for nodejs import protocol
import path from "path";
import fs from "fs-extra";
import fetch from "node-fetch";
import type { RegistryData, RegistryItem, RegistryItemType } from "./types";

/**
 * Default registry URL
 * Can be overridden by REGISTRY_URL environment variable
 */
const DEFAULT_REGISTRY_URL = "https://ui.solancn.com";

/**
 * Get registry base URL
 */
export function getRegistryBaseUrl(): string {
  return process.env.REGISTRY_URL || DEFAULT_REGISTRY_URL;
}

export function getRegistryUrl(): string {
  return process.env.REGISTRY_URL || DEFAULT_REGISTRY_URL;
}

/**
 * Load registry data from a local registry.json file
 */
export async function loadLocalRegistry(
  cwd: string = process.cwd(),
): Promise<RegistryData | null> {
  const registryPath = path.join(cwd, "registry.json");

  try {
    if (await fs.pathExists(registryPath)) {
      const data = await fs.readJson(registryPath);
      console.log("Loaded local registry from:", registryPath);
      return data;
    }
  } catch (error) {
    console.error("Failed to load local registry:", error);
  }

  return null;
}

/**
 * Fetch registry data from remote API
 */
export async function fetchRemoteRegistry(): Promise<RegistryData | null> {
  try {
    const baseUrl = getRegistryBaseUrl();
    const response = await fetch(`${baseUrl}/api/registry`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch registry: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as RegistryData;
    console.log("Fetched remote registry");
    return data;
  } catch (error) {
    console.error("Failed to fetch remote registry:", error);
    return null;
  }
}

/**
 * Get registry data (try local first, then remote)
 */
export async function getRegistry(
  cwd: string = process.cwd(),
): Promise<RegistryData | null> {
  // Try loading from local registry.json first
  const localRegistry = await loadLocalRegistry(cwd);
  if (localRegistry) {
    return localRegistry;
  }

  // Fallback to remote registry
  return fetchRemoteRegistry();
}

interface FetchRegistryItemsOptions {
  type: RegistryItemType;
}

/**
 * Fetch a specific item type from registry (components, blocks, primitives, theme)
 */
export async function fetchRegistryItems(
  options: FetchRegistryItemsOptions,
  cwd: string = process.cwd(),
): Promise<Record<string, RegistryItem> | null> {
  const registry = await getRegistry(cwd);

  if (!registry) {
    return null;
  }

  switch (options.type) {
    case "registry:component":
      return registry.components || null;
    case "registry:block":
      return registry.blocks || null;
    case "registry:ui":
      return registry.ui || null;
    case "registry:theme":
      return registry.theme ? { theme: registry.theme } : null;
    default:
      return null;
  }
}

interface FetchRegistryItemOptions {
  type: RegistryItemType;
  name?: string;
}

/**
 * Fetch a specific registry item by type and name
 */
export async function fetchRegistryItem(
  options: FetchRegistryItemOptions,
  cwd: string = process.cwd(),
): Promise<RegistryItem | null> {
  const items = await fetchRegistryItems(options, cwd);

  if (!items) {
    return null;
  }

  // For theme, just return the theme item
  if (options.type === "registry:theme") {
    return items.theme || null;
  }

  // For other types, return the specific named item
  if (options.name && items[options.name]) {
    return items[options.name];
  }

  return null;
}

/**
 * Search registry items by query
 */
export async function searchRegistry(
  query: string,
  options: FetchRegistryItemsOptions,
  cwd: string = process.cwd(),
): Promise<Record<string, RegistryItem>> {
  const registry = await getRegistry(cwd);

  if (!registry) {
    return {};
  }

  const normalizedQuery = query.toLowerCase();
  const results: Record<string, RegistryItem> = {};

  // Helper function to search and add matching items
  const searchItems = (
    items: Record<string, RegistryItem> | undefined,
    itemType: RegistryItemType,
  ) => {
    if (!items) return;
    for (const [key, item] of Object.entries(items)) {
      const matchesName = key.toLowerCase().includes(normalizedQuery);
      const matchesDescription = item.description
        ?.toLowerCase()
        .includes(normalizedQuery);

      if (matchesName || matchesDescription) {
        results[key] = { ...item, type: itemType };
      }
    }
  };

  // Search in the requested type only, or all types if not specified
  if (!options.type || options.type === "registry:component") {
    searchItems(registry.components, "registry:component");
  }

  if (!options.type || options.type === "registry:block") {
    searchItems(registry.blocks, "registry:block");
  }

  if (!options.type || options.type === "registry:ui") {
    searchItems(registry.ui, "registry:ui");
  }

  return results;
}
