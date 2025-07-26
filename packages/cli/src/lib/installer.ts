// Unified installer for components and blocks

import fs from "fs-extra";
// biome-ignore lint/style/useNodejsImportProtocol: nodejs import protocol
import path from "path";
import { logger } from "./logger";
import { fetchRegistryItem, fetchRegistryItems } from "./registry-client";
import type { InstallOptions, InstallResult, RegistryItem, RegistryItemType } from "./types";

/**
 * Install a registry item (component, block, etc.) from registry data
 */
export async function installItem(
  name: string,
  targetDir: string,
  options: Partial<InstallOptions> & { itemType?: RegistryItemType } = {},
): Promise<InstallResult> {
  const { itemType = "component", force = false } = options;
  const skipDependencies = !options?.dependencies;
  const spinner = logger.spinner(`Installing ${itemType}: ${name}`);

  try {
    // Fetch item data from registry
    const item = await fetchRegistryItem({ type: itemType }, name);

    if (!item) {
      spinner.fail(`${itemType} "${name}" not found in registry`);
      return {
        success: false,
        componentName: name,
        message: `${itemType} "${name}" not found in registry`,
        files: [],
      };
    }

    // Ensure the item has files defined
    if (!item.files || Object.keys(item.files).length === 0) {
      spinner.fail(`${itemType} "${name}" has no files defined`);
      return {
        success: false,
        componentName: name,
        message: `${itemType} "${name}" has no files defined`,
        files: [],
      };
    }

    logger.info(`Installing ${itemType} "${name}" to ${targetDir}`);

    // Install each file
    const files: string[] = [];
    const filenames = Object.keys(item.files);

    // Check if we need to create backups (only if force is true)
    if (force) {
      const existingFiles = [];
      for (const filename of filenames) {
        const filePath = path.join(targetDir, filename);
        if (await fs.pathExists(filePath)) {
          existingFiles.push(filename);
        }
      }

      // Create backups if any files exist
      if (existingFiles.length > 0) {
        await backupFiles(existingFiles, targetDir);
      }
    }

    // Write files
    for (const filename of filenames) {
      const content = item.files[filename];
      const filePath = path.join(targetDir, filename);

      // Check if file exists already
      if (await fs.pathExists(filePath) && !force) {
        spinner.fail(`File ${filename} already exists. Use --force to overwrite.`);
        return {
          success: false,
          componentName: name,
          message: `File ${filename} already exists. Use --force to overwrite.`,
          files,
        };
      }

      // Ensure directory exists
      await fs.ensureDir(path.dirname(filePath));

      // Write file
      await fs.writeFile(filePath, content);
      files.push(filename);
    }

    // Install dependencies if needed
    if (!skipDependencies && item.dependencies && item.dependencies.length > 0) {
      await installDependencies(item.dependencies, targetDir);
    }

    spinner.succeed(`${itemType} "${name}" installed successfully`);
    
    return {
      success: true,
      componentName: name,
      message: `${itemType} "${name}" installed successfully`,
      files,
    };
  } catch (error) {
    spinner.fail(`Error installing ${itemType}: ${error instanceof Error ? error.message : String(error)}`);
    logger.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * Uninstall a registry item (component, block, etc.)
 */
export async function uninstallItem(
  name: string,
  targetDir: string,
  options: { itemType?: RegistryItemType, force?: boolean } = {},
): Promise<InstallResult> {
  const { itemType = "component", force = false } = options;
  const spinner = logger.spinner(`Uninstalling ${itemType}: ${name}`);

  try {
    // Fetch item data from registry
    const item = await fetchRegistryItem({ type: itemType }, name);

    if (!item) {
      spinner.fail(`${itemType} "${name}" not found in registry`);
      return {
        success: false,
        componentName: name,
        message: `${itemType} "${name}" not found in registry`,
        files: [],
      };
    }

    // Ensure the item has files defined
    if (!item.files || Object.keys(item.files).length === 0) {
      spinner.fail(`${itemType} "${name}" has no files defined`);
      return {
        success: false,
        componentName: name,
        message: `${itemType} "${name}" has no files defined`,
        files: [],
      };
    }

    logger.info(`Uninstalling ${itemType} "${name}" from ${targetDir}`);

    // Remove each file
    const files: string[] = [];
    const filenames = Object.keys(item.files);

    for (const filename of filenames) {
      const filePath = path.join(targetDir, filename);

      // Check if file exists
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
        files.push(filename);
      }
    }

    spinner.succeed(`${itemType} "${name}" uninstalled successfully`);
    
    return {
      success: true,
      componentName: name,
      message: `${itemType} "${name}" uninstalled successfully`,
      files,
    };
  } catch (error) {
    spinner.fail(`Error uninstalling ${itemType}: ${error instanceof Error ? error.message : String(error)}`);
    logger.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * Check if a registry item is installed
 */
export async function isItemInstalled(
  itemName: string, 
  itemType: RegistryItemType, 
  targetDir: string
): Promise<boolean> {
  // Fetch item data from registry
  const item = await fetchRegistryItem({ type: itemType }, itemName);
  
  if (!item) {
    return false;
  }
  
  return checkItemFilesExist(item, targetDir);
}

/**
 * Check if all files for an item exist
 */
export async function checkItemFilesExist(
  item: RegistryItem,
  targetDir: string,
): Promise<boolean> {
  if (!item.files || Object.keys(item.files).length === 0) {
    return false;
  }

  const filenames = Object.keys(item.files);
  
  for (const filename of filenames) {
    const filePath = path.join(targetDir, filename);
    if (!(await fs.pathExists(filePath))) {
      return false;
    }
  }

  return true;
}

/**
 * Get information about a specific installed item
 */
export async function getItemInfo(
  name: string,
  itemType: RegistryItemType,
  targetDir: string,
): Promise<{
  name: string;
  type: RegistryItemType;
  description?: string;
  installed: boolean;
  installedFiles?: string[];
  dependencies?: string[];
  [key: string]: unknown;
} | null> {
  // Fetch item data from registry
  const item = await fetchRegistryItem({ type: itemType }, name);
  
  if (!item) {
    return null;
  }

  // Check if item is installed
  const installed = await checkItemFilesExist(item, targetDir);

  // Get installed files if the item is installed
  const installedFiles = installed
    ? await getInstalledFiles(item, targetDir)
    : undefined;

  return {
    name: item.name,
    type: item.type,
    description: item.description,
    installed,
    installedFiles,
    dependencies: item.dependencies,
  };
}

/**
 * Get list of installed files for an item
 */
async function getInstalledFiles(
  item: RegistryItem,
  targetDir: string,
): Promise<string[]> {
  if (!item.files || Object.keys(item.files).length === 0) {
    return [];
  }

  const installedFiles = [];
  const filenames = Object.keys(item.files);
  
  for (const filename of filenames) {
    const filePath = path.join(targetDir, filename);
    if (await fs.pathExists(filePath)) {
      installedFiles.push(filename);
    }
  }

  return installedFiles;
}

/**
 * Get information about all installed items of a specific type
 */
export async function getInstalledItems(
  itemType: RegistryItemType,
  targetDir: string,
): Promise<{ name: string; installed: boolean }[]> {
  // Ensure the target directory exists
  if (!(await fs.pathExists(targetDir))) {
    return [];
  }
  
  // Get all registry items of the specified type
  const registry = await getRegistryItems(itemType);
  
  if (!registry) {
    return [];
  }

  // Check if each item is installed
  const installedItems = await Promise.all(
    Object.values(registry).map(async (item) => {
      const installed = await checkItemFilesExist(item, targetDir);
      return {
        name: item.name,
        installed,
      };
    }),
  );

  return installedItems;
}

/**
 * Get all registry items of a specific type
 * This is a helper function for use by other functions in this module
 */
async function getRegistryItems(itemType: RegistryItemType): Promise<Record<string, RegistryItem> | null> {
  try {
    // Fetch registry items of the specified type
    return fetchRegistryItems({ type: itemType });
  } catch (error) {
    logger.error(`Error fetching ${itemType}s from registry:`, error instanceof Error ? error.message : String(error));
    return null;
  }
}

/**
 * Install dependencies for a registry item
 */
export async function installDependencies(
  dependencies: string[],
  targetDir: string,
): Promise<void> {
  if (!dependencies || dependencies.length === 0) {
    logger.info('No dependencies to install');
    return;
  }

  logger.info(`Installing dependencies: ${dependencies.join(', ')}`);
  
  // Process each dependency
  // This is a simplified implementation that just logs what it would do
  // In a real implementation, this would likely execute package manager commands
  for (const dep of dependencies) {
    // If dependency is another component reference (e.g. @/components/button)
    if (dep.startsWith('@/')) {
      // Extract the component/block type and name
      const parts = dep.split('/');
      if (parts.length >= 3) {
        const depType = parts[1] as RegistryItemType; // e.g. "components" -> "component"
        const depName = parts[2]; // e.g. "button"
        
        logger.info(`Would install dependent ${depType}: ${depName}`);
        // Note: In a real implementation, we might recursively call installItem here
        // but for simplicity we're just logging
      }
    } else {
      // External package dependency
      logger.info(`Would install npm package: ${dep}`);
      // Note: In a real implementation, we would execute npm/yarn/pnpm here
    }
  }
}

/**
 * Create a backup of files before installation
 */
export async function backupFiles(
  files: string[],
  targetDir: string,
): Promise<void> {
  const backupDir = path.join(targetDir, '.backups', new Date().toISOString().replace(/:/g, '-'));
  await fs.ensureDir(backupDir);

  for (const file of files) {
    const sourcePath = path.join(targetDir, file);
    const backupPath = path.join(backupDir, file);

    // Only backup if file exists
    if (await fs.pathExists(sourcePath)) {
      // Create directory for the backup file
      await fs.ensureDir(path.dirname(backupPath));
      
      // Copy the file
      await fs.copy(sourcePath, backupPath);
    }
  }
}

// Export compatibility functions for backward compatibility with existing code
// These will redirect to the unified functions

export const installComponent = (
  name: string,
  targetDir: string,
  options: Partial<InstallOptions> = {},
): Promise<InstallResult> => {
  return installItem(name, targetDir, { ...options, itemType: "component" });
};

export const uninstallComponent = (
  name: string,
  targetDir: string,
  options: { force?: boolean } = {},
): Promise<InstallResult> => {
  return uninstallItem(name, targetDir, { ...options, itemType: "component" });
};

export const isComponentInstalled = (
  componentName: string,
  targetDir: string,
): Promise<boolean> => {
  return isItemInstalled(componentName, "component", targetDir);
};

export const installBlock = (
  name: string,
  targetDir: string,
  options: Partial<InstallOptions> = {},
): Promise<InstallResult> => {
  return installItem(name, targetDir, { ...options, itemType: "block" });
};

export const uninstallBlock = (
  name: string,
  targetDir: string,
  options: { force?: boolean } = {},
): Promise<InstallResult> => {
  return uninstallItem(name, targetDir, { ...options, itemType: "block" });
};

export const isBlockInstalled = (
  blockName: string,
  targetDir: string,
): Promise<boolean> => {
  return isItemInstalled(blockName, "block", targetDir);
};

export const getBlockInfo = (
  name: string,
  targetDir: string,
): Promise<{
  name: string;
  type: RegistryItemType;
  description?: string;
  installed: boolean;
  installedFiles?: string[];
  dependencies?: string[];
  [key: string]: unknown;
} | null> => {
  return getItemInfo(name, "block", targetDir);
};

export const getInstalledBlocks = (
  targetDir: string,
): Promise<{ name: string; installed: boolean }[]> => {
  return getInstalledItems("block", targetDir);
};

export const getComponentInfo = (
  name: string,
  targetDir: string,
): Promise<{
  name: string;
  type: RegistryItemType;
  description?: string;
  installed: boolean;
  installedFiles?: string[];
  dependencies?: string[];
  [key: string]: unknown;
} | null> => {
  return getItemInfo(name, "component", targetDir);
};

export const getInstalledComponents = (
  targetDir: string,
): Promise<{ name: string; installed: boolean }[]> => {
  return getInstalledItems("component", targetDir);
};
