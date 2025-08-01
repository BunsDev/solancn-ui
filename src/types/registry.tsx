export type RegistryType = "component" | "template" | "ui" | "theme";

// Registry item types
export type RegistryItemType =
	| "registry:component"
	| "registry:template"
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

export interface RegistryItemSchema extends RegistryItem {
	type: RegistryItemType;
	dependencies: string[];
	files: Record<string, string>;
}


// Component registry types
export interface ComponentEntry {
	component: React.ComponentType;
	files?: string[] | { path: string; type: string }[];
	dependencies?: string[];
	type?: RegistryType;
}

export interface Registry {
	[componentName: string]: ComponentEntry;
}

export interface StyleRegistry {
	[style: string]: {
		[componentName: string]: ComponentEntry;
	};
}
