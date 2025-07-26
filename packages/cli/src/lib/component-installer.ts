import fs from "fs-extra";
// biome-ignore lint/style/useNodejsImportProtocol: nodejs import protocol
import path from "path";
import { logger } from "./logger";
import type { InstallOptions, InstallResult, RegistryItem } from "./types";

/**
 * Install a component or block from registry data
 */
export async function installComponent(
	name: string,
	item: RegistryItem,
	options: InstallOptions,
): Promise<InstallResult> {
	const { targetDir, force = false } = options;
	const files: string[] = [];
	let hasErrors = false;

	// Ensure the component has files defined
	if (!item.files || Object.keys(item.files).length === 0) {
		return {
			success: false,
			files: [],
			componentName: name,
			message: `Component "${name}" has no files defined`,
		};
	}

	logger.info(`Installing ${item.type} "${name}" to ${targetDir}`);

	// Install each file
	for (const [relativePath, content] of Object.entries(item.files)) {
		try {
			// Create full path
			const fullPath = path.join(targetDir, relativePath);
			const dirPath = path.dirname(fullPath);

			// Create directory if it doesn't exist
			await fs.ensureDir(dirPath);

			// Check if file exists and we need to handle conflicts
			if (await fs.pathExists(fullPath) && !force) {
				logger.warn(`File already exists: ${relativePath}`);
				logger.info('Use --force to overwrite');
				hasErrors = true;
				continue;
			}

			// Write file
			await fs.writeFile(fullPath, content);
			files.push(fullPath);
			logger.success(`Created ${relativePath}`);

		} catch (error) {
			logger.error(`Failed to install file ${relativePath}: ${error}`);
			hasErrors = true;
		}
	}

	// Install dependencies if needed
	if (options.dependencies && !hasErrors) {
		await installDependencies(item, options);
	}

	return {
		success: !hasErrors,
		files,
		componentName: name,
	};
}

interface UninstallOptions {
	targetDir: string;
	dependencies?: string[];
	force?: boolean;
}

/**
 * Uninstall a component or block
 */
export async function uninstallComponent(
	name: string,
	item: RegistryItem,
	options: UninstallOptions,
): Promise<InstallResult> {
	const { targetDir } = options;
	const files: string[] = [];
	let hasErrors = false;

	// Ensure the component has files defined
	if (!item.files || Object.keys(item.files).length === 0) {
		return {
			success: false,
			files: [],
			componentName: name,
			message: `Component "${name}" has no files defined`,
		};
	}

	logger.info(`Uninstalling ${item.type} "${name}" from ${targetDir}`);

	// Remove each file
	for (const relativePath of Object.keys(item.files)) {
		try {
			// Create full path
			const fullPath = path.join(targetDir, relativePath);

			// Check if file exists
			const fileExists = await fs.pathExists(fullPath);
			if (!fileExists) {
				logger.debug(`File doesn't exist, skipping: ${fullPath}`);
				continue;
			}

			// Remove file
			await fs.remove(fullPath);
			files.push(fullPath);

			logger.debug(`Removed file: ${fullPath}`);
		} catch (error) {
			logger.error(`Failed to remove file: ${relativePath}`, error);
			hasErrors = true;
		}
	}

	if (hasErrors) {
		return {
			success: false,
			files,
			componentName: name,
			message: "Some files failed to uninstall",
		};
	}

	return {
		success: true,
		files,
		componentName: name,
		message: `Successfully uninstalled ${item.type} "${name}"`,
	};
}

/**
 * Check if a component or block is installed
 */
export async function isComponentInstalled(
	item: RegistryItem,
	targetDir: string,
): Promise<boolean> {
	// If no files, can't be installed
	if (!item.files || Object.keys(item.files).length === 0) {
		return false;
	}

	// Check if at least one file exists
	for (const relativePath of Object.keys(item.files)) {
		const fullPath = path.join(targetDir, relativePath);
		if (await fs.pathExists(fullPath)) {
			return true;
		}
	}

	return false;
}

/**
 * Install dependencies for a component or block
 * This would typically install npm dependencies, but for this implementation,
 * we're just ensuring the dependent components/blocks are installed
 */
export async function installDependencies(
	item: RegistryItem,
	options: InstallOptions,
): Promise<void> {
	if (!item.dependencies || item.dependencies.length === 0) {
		return;
	}

	logger.info(`Installing dependencies for ${item.name || item.type}`);
	logger.info(`Dependencies: ${item.dependencies.join(", ")}`);

	// In a real implementation, this would:
	// 1. Check if we need to install npm packages
	// 2. Run the appropriate package manager commands
	// 3. Install dependent components from the registry

	// For now, we'll just log that this would happen
	logger.info(
		"Dependency installation is a placeholder in this implementation",
	);
}

/**
 * Create a backup of files before installation
 */
export async function backupFiles(
	files: string[],
	targetDir: string,
): Promise<void> {
	const backupDir = path.join(
		targetDir,
		".solancn-backup",
		Date.now().toString(),
	);
	await fs.ensureDir(backupDir);

	for (const file of files) {
		if (await fs.pathExists(file)) {
			const relativePath = path.relative(targetDir, file);
			const backupPath = path.join(backupDir, relativePath);

			await fs.ensureDir(path.dirname(backupPath));
			await fs.copy(file, backupPath);

			logger.debug(`Backed up: ${file} -> ${backupPath}`);
		}
	}

	logger.info(`Created backup in ${backupDir}`);
}
