// Block installer

import fs from "fs-extra";
import path from "path";
import { logger } from "./logger";
import { fetchRegistryItem } from "./registry-client";
import {
	installComponent,
	installDependencies,
	backupFiles,
	uninstallComponent,
	isComponentInstalled,
} from "./component-installer";
import { InstallOptions, InstallResult } from "./types";

/**
 * Install a block from registry
 */
export async function installBlock(
	name: string,
	targetDir: string,
	options: Partial<InstallOptions> = {},
): Promise<InstallResult> {
	const spinner = logger.spinner(`Installing block: ${name}`);

	try {
		// Fetch block data from registry
		const blockItem = await fetchRegistryItem({ type: "block" }, name);

		if (!blockItem) {
			spinner.fail(`Block '${name}' not found in registry`);
			return {
				success: false,
				files: [],
				blockName: name,
				message: `Block "${name}" not found in registry`,
			};
		}

		// Setup options with defaults
		const installOptions: InstallOptions = {
			targetDir,
			force: options.force || false,
			dependencies: options.dependencies !== false, // Install dependencies by default
		};

		// Create backup if needed
		if (installOptions.force && blockItem.files) {
			const filesToBackup = Object.keys(blockItem.files).map((file) =>
				path.join(targetDir, file),
			);

			try {
				await backupFiles(filesToBackup, targetDir);
			} catch (error) {
				logger.warn(`Failed to create backup: ${error}`);
			}
		}

		// Install block files
		const result = await installComponent(name, blockItem, installOptions);

		// Install dependencies if needed
		if (installOptions.dependencies && blockItem.dependencies?.length) {
			await installDependencies(blockItem, installOptions);
		}

		spinner.succeed(`Installed block: ${name}`);
		return {
			...blockItem,
			...result,
		};
	} catch (error) {
		spinner.fail(`Failed to install block: ${error}`);
		logger.error(`Block installation failed: ${error}`);
		throw error;
	}
}

/**
 * Uninstall a block
 */
export async function uninstallBlock(
	name: string,
	targetDir: string,
	options: Partial<InstallOptions> = {},
): Promise<InstallResult> {
	const spinner = logger.spinner(`Uninstalling block: ${name}`);

	try {
		// Fetch block data from registry
		const blockItem = await fetchRegistryItem({ type: "block" }, name);

		if (!blockItem) {
			spinner.fail(`Block '${name}' not found in registry`);
			return {
				success: false,
				files: [],
				message: `Block '${name}' not found in registry`,
			};
		}

		// Setup options
		const uninstallOptions: InstallOptions = {
			targetDir,
			force: options.force || false,
			dependencies: options.dependencies !== false,
		};

		// Create backup before removal
		if (blockItem.files) {
			const filesToBackup = Object.keys(blockItem.files).map((file) =>
				path.join(targetDir, file),
			);

			try {
				await backupFiles(filesToBackup, targetDir);
			} catch (error) {
				logger.warn(`Failed to create backup before uninstall: ${error}`);
			}
		}

		// Uninstall the block
		const result = await uninstallComponent(name, blockItem, uninstallOptions);

		// Note: We don't automatically uninstall dependencies to avoid
		// removing components that might be used elsewhere

		spinner.succeed(`Uninstalled block: ${name}`);
		return result;
	} catch (error) {
		spinner.fail(`Failed to uninstall block: ${error}`);
		logger.error(`Block uninstallation failed: ${error}`);

		return {
			success: false,
			files: [],
			blockName: name,
			message: `Failed to uninstall block: ${error}`,
		};
	}
}

/**
 * Check if a block is installed
 */
export async function isBlockInstalled(
	name: string,
	targetDir: string,
): Promise<boolean> {
	try {
		// Fetch block data from registry
		const blockItem = await fetchRegistryItem({ type: "block" }, name);

		if (!blockItem) {
			return false;
		}

		// Check if installed
		return isComponentInstalled(blockItem, targetDir);
	} catch (error) {
		logger.error(`Failed to check if block is installed: ${error}`);
		return false;
	}
}

/**
 * Get information about installed blocks
 */
export async function getInstalledBlocks(
	targetDir: string,
): Promise<{ name: string; installed: boolean }[]> {
	try {
		// Get all available blocks
		const allBlocks = await fetchRegistryItem({ type: "block" });
		const results: { name: string; installed: boolean }[] = [];

		if (!allBlocks) {
			return results;
		}

		// Check each block
		for (const [name, block] of Object.entries(allBlocks)) {
			const installed = await isComponentInstalled(block, targetDir);
			results.push({ name, installed });
		}

		return results;
	} catch (error) {
		logger.error(`Failed to get installed blocks: ${error}`);
		return [];
	}
}

/**
 * Get detailed information about a block
 */
export async function getBlockInfo(
	name: string,
	targetDir: string,
): Promise<{
	blockName: string;
	description?: string;
	installed: boolean;
	installedFiles?: string[];
	dependencies?: string[];
	[key: string]: any;
} | null> {
	try {
		// Fetch block data from registry
		const blockItem = await fetchRegistryItem({ type: "block" }, name);

		if (!blockItem) {
			return null;
		}

		// Check if installed
		const installed = await isComponentInstalled(blockItem, targetDir);

		// Get list of installed files if installed
		let installedFiles: string[] | undefined;

		if (installed && blockItem.files) {
			installedFiles = await Promise.all(
				Object.keys(blockItem.files).map(async (file) => {
					const fullPath = path.join(targetDir, file);
					return (await fs.pathExists(fullPath)) ? fullPath : null;
				}),
			).then((files) => files.filter((f): f is string => f !== null));
		}

		return {
			blockName: blockItem.name,
			description: blockItem.description,
			installed,
			installedFiles,
			dependencies: blockItem.dependencies,
			...blockItem,
		};
	} catch (error) {
		logger.error(`Failed to get block info: ${error}`);
		return null;
	}
}
