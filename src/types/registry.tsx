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
