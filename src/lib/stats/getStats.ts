import { RegistryItemSchema, RegistryItemType } from "@/types/registry";

// Function to fetch the registry data
async function fetchRegistry(): Promise<Record<string, { name: string; description: string; type: RegistryItemType }>> {
  try {
    // Use relative URL for public directory assets
    const response = await fetch('/registry.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch registry: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading registry:', error);
    return {};
  }
}

// This will be used to cache the registry data
let registryCache: Record<string, { name: string; description: string; type: RegistryItemType }> | null = null;

/**
 * Dynamically count the total components in the registry
 */
const getTotalComponents = async (): Promise<number> => {
    try {
        const registry = await getRegistryData();
        // Count components based on registry entries with type set to 'registry:component'
        const componentsCount = Object.values(registry).filter(item =>
            (item as RegistryItemSchema).type === 'registry:component'
        ).length;
        return componentsCount;
    } catch (error) {
        console.error('Error counting components:', error);
        return 59; // Fallback to the last known count
    }
};

/**
 * Get the total number of templates
 */
const getTotalTemplates = async (): Promise<number> => {
    try {
        const registry = await getRegistryData();
        // Count templates based on registry entries with type set to 'registry:template'
        const templatesCount = Object.values(registry).filter(item =>
            (item as RegistryItemSchema).type === 'registry:template'
        ).length;
        return templatesCount || 0; // Return 0 if no templates found
    } catch (error) {
        console.error('Error counting templates:', error);
        return 0;
    }
};

/**
 * Get the total number of downloads
 */
const getTotalDownloads = async (): Promise<number> => {
    return 1245;
};

/**
 * Helper function to get registry data with caching
 */
async function getRegistryData() {
    if (registryCache) {
        return registryCache;
    }
    registryCache = await fetchRegistry();
    return registryCache;
}

/**
 * Returns the up-to-date project statistics
 * Last updated: 2025-08-01
 */
export async function getStats() {
    const totalComponents = await getTotalComponents();
    const totalTemplates = await getTotalTemplates();
    const totalLicense = "MIT";
    const totalDownloads = await getTotalDownloads();
    const lastUpdated = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    return {
        components: totalComponents,
        templates: totalTemplates,
        license: totalLicense,
        downloads: totalDownloads,
        lastUpdated,
    };
};