#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { components } from "./components";
import { templates } from "./templates";
import type { RegistryItemSchema, RegistryType } from "./types";

// Local interface for registry list items
interface RegistryListItem {
	name: string;
	description: string;
	type: RegistryType;
}

const registryDirPath = path.join(__dirname, "../../public/registry");
const registryListPath = path.join(
	__dirname,
	"../../public/registry.json",
);

if (!fs.existsSync(registryDirPath)) {
	fs.mkdirSync(registryDirPath);
}

console.log(`Building component registry...`);
// Process components
for (const component of components) {
	const files: Array<{
		path: string;
		content: string;
		type: RegistryType;
	}> = [];

	try {
		// Resolve the path relative to the scripts directory
		const resolvedPath = path.resolve(__dirname, component.path);
		// Check if the path is a directory or a file
		const stats = fs.statSync(resolvedPath);

		if (stats.isDirectory()) {
			// Handle directory-based components
			const componentDir = resolvedPath;
			const dirContents = fs.readdirSync(componentDir);

			// Find the main component file (usually matches the component name)
			const mainComponentFile = dirContents.find(
				(file) =>
					file === `${component.name}.tsx` ||
					file === `${component.name}-view.tsx` ||
					file === `${component.name.split("-")[0]}.tsx`,
			);

			if (mainComponentFile) {
				const mainContent = fs.readFileSync(
					path.join(componentDir, mainComponentFile),
					"utf-8",
				);
				files.push({
					path: `${component.name}.tsx`,
					content: mainContent,
					type: "registry:component" as RegistryType,
				});
			} else {
				// If no main file found, use the first .tsx file
				const tsxFiles = dirContents.filter((file) => file.endsWith(".tsx"));
				if (tsxFiles.length > 0) {
					const firstTsxContent = fs.readFileSync(
						path.join(componentDir, tsxFiles[0]),
						"utf-8",
					);
					files.push({
						path: `${component.name}.tsx`,
						content: firstTsxContent,
						type: "registry:component" as RegistryType,
					});
				}
			}

			// Add other .tsx files as additional files
			const otherTsxFiles = dirContents.filter(
				(file) =>
					file.endsWith(".tsx") &&
					file !== mainComponentFile &&
					!file.includes("page.mdx"),
			);

			for (const file of otherTsxFiles) {
				try {
					const fileContent = fs.readFileSync(
						path.join(componentDir, file),
						"utf-8",
					);
					files.push({
						path: file,
						content: fileContent,
						type: "registry:component" as RegistryType,
					});
				} catch (error) {
					console.warn(
						`Warning: Could not read file ${file} in ${component.name}:`,
						error,
					);
				}
			}
		} else {
			// Handle single file components
			const content = fs.readFileSync(resolvedPath, "utf-8");
			files.push({
				path: `${component.name}.tsx`,
				content,
				type: "registry:component" as RegistryType,
			});
		}
	} catch (error) {
		console.error(`Error processing component ${component.name}:`, error);
		continue;
	}

	// Add any additional files specified in the component definition
	if (component.files && component.files.length > 0) {
		for (const file of component.files) {
			try {
				const fileContent = fs.readFileSync(file.path, "utf-8");

				files.push({
					path: file.name,
					content: fileContent,
					type: file.type ?? ("registry:component" as RegistryType),
				});
			} catch (error) {
				console.error(
					`Error Reading dependency file ${file.path} for component ${component.name}`,
					error,
				);
			}
		}
	}

	// Skip if no files were found
	if (files.length === 0) {
		console.warn(
			`Warning: No files found for component ${component.name}, skipping...`,
		);
		continue;
	}

	const componentSchema = {
		$schema: "https://ui.shadcn.com/schema/registry-item.json",
		name: component.name,
		title: component.title,
		description: component.description,
		author: component.author ?? "Reche Soares",
		type: "registry:component",
		dependencies: component.dependencies ?? [],
		devDependencies: component.devDependencies ?? [],
		registryDependencies: component.registryDependencies ?? [],
		cssVars: component.cssVars ?? {
			dark: {},
			light: {},
		},
		files,
	} satisfies RegistryItemSchema;

	fs.writeFileSync(
		path.join(registryDirPath, `${component.name}.json`),
		JSON.stringify(componentSchema, null, 2),
	);

	console.log(`✅ Built registry for component: ${component.name}`);
}

// Process templates
console.log(`Building template registry...`);
for (const template of templates) {
	const files: Array<{
		path: string;
		content: string;
		type: RegistryType;
	}> = [];

	try {
		// Resolve the path relative to the scripts directory
		const resolvedPath = path.resolve(__dirname, template.path);
		// Check if the path is a directory or a file
		const stats = fs.statSync(resolvedPath);

		if (stats.isDirectory()) {
			// Handle directory-based templates
			const templateDir = resolvedPath;
			const dirContents = fs.readdirSync(templateDir);

			// Find the main template file (usually matches the template name)
			const mainTemplateFile = dirContents.find(
				(file) =>
					file === `${template.name}.tsx` ||
					file === `${template.name}-view.tsx` ||
					file === `${template.name.split("-")[0]}.tsx`,
			);

			if (mainTemplateFile) {
				const mainContent = fs.readFileSync(
					path.join(templateDir, mainTemplateFile),
					"utf-8",
				);
				files.push({
					path: `${template.name}.tsx`,
					content: mainContent,
					type: "registry:template" as RegistryType,
				});
			} else {
				// If no main file found, use the first .tsx file
				const tsxFiles = dirContents.filter((file) => file.endsWith(".tsx"));
				if (tsxFiles.length > 0) {
					const firstTsxContent = fs.readFileSync(
						path.join(templateDir, tsxFiles[0]),
						"utf-8",
					);
					files.push({
						path: `${template.name}.tsx`,
						content: firstTsxContent,
						type: "registry:template" as RegistryType,
					});
				}
			}

			// Add other .tsx files as additional files
			const otherTsxFiles = dirContents.filter(
				(file) =>
					file.endsWith(".tsx") &&
					file !== mainTemplateFile &&
					!file.includes("page.mdx"),
			);

			for (const file of otherTsxFiles) {
				try {
					const fileContent = fs.readFileSync(
						path.join(templateDir, file),
						"utf-8",
					);
					files.push({
						path: file,
						content: fileContent,
						type: "registry:template" as RegistryType,
					});
				} catch (error) {
					console.warn(
						`Warning: Could not read file ${file} in ${template.name}:`,
						error,
					);
				}
			}
		} else {
			// Handle single file templates
			const content = fs.readFileSync(resolvedPath, "utf-8");
			files.push({
				path: `${template.name}.tsx`,
				content,
				type: "registry:template" as RegistryType,
			});
		}
	} catch (error) {
		console.error(`Error processing template ${template.name}:`, error);
		continue;
	}

	// Add any additional files specified in the template definition
	if (template.files && template.files.length > 0) {
		for (const file of template.files) {
			try {
				const fileContent = fs.readFileSync(file.path, "utf-8");

				files.push({
					path: file.name,
					content: fileContent,
					type: file.type ?? ("registry:template" as RegistryType),
				});
			} catch (error) {
				console.error(
					`Error Reading dependency file ${file.path} for template ${template.name}`,
					error,
				);
			}
		}
	}

	// Skip if no files were found
	if (files.length === 0) {
		console.warn(
			`Warning: No files found for template ${template.name}, skipping...`,
		);
		continue;
	}

	const templateSchema = {
		$schema: "https://ui.shadcn.com/schema/registry-item.json",
		name: template.name,
		title: template.title,
		description: template.description,
		author: template.author ?? "Solancn UI Team",
		type: "registry:template" as RegistryType,
		dependencies: template.dependencies ?? [],
		devDependencies: template.devDependencies ?? [],
		registryDependencies: template.registryDependencies ?? [],
		cssVars: template.cssVars ?? {
			dark: {},
			light: {},
		},
		files,
	} satisfies RegistryItemSchema;

	fs.writeFileSync(
		path.join(registryDirPath, `${template.name}.json`),
		JSON.stringify(templateSchema, null, 2),
	);

	console.log(`✅ Built registry for template: ${template.name}`);
}

// Create a registry list with all components and templates
const registryList = {} as Record<string, RegistryListItem>;

// Add components to the registry list
components.forEach(component => {
	if (!component.name) return;
	registryList[component.name] = {
		name: component.name as string,
		description: component.description || "",
		type: component.type ?? "registry:component",
	};
});

// Add templates to the registry list
templates.forEach(template => {
	if (!template.name) return;
	registryList[template.name] = {
		name: template.name as string,
		description: template.description || "",
		type: "registry:template",
	};
});

// Write the registry list to a JSON file
fs.writeFileSync(registryListPath, JSON.stringify(registryList, null, 2));

console.log("🎉 Registry built successfully!");
