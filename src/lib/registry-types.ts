import type * as React from "react";

// Component registry types
export interface ComponentEntry {
	component: React.ComponentType;
	files?: string[] | { path: string; type: string }[];
	dependencies?: string[];
	type?: "component" | "example" | "block";
}

export interface Registry {
	[componentName: string]: ComponentEntry;
}

export interface StyleRegistry {
	[style: string]: {
		[componentName: string]: ComponentEntry;
	};
}
