import {
	componentsNavigation,
	docsNavigation,
	templatesNavigation,
} from "@/constants/navigation";
import { components } from "@/scripts/components";
import type { NavigationChild, NavigationItem } from "@/types/navigation";

export interface SearchableItem {
	id: string;
	title: string;
	description: string;
	href: string;
	category: string;
	keywords?: string[];
}

// Function to generate searchable items from navigation
function getNavigationItems(): SearchableItem[] {
	const items: SearchableItem[] = [];

	const allNavigation = [
		...componentsNavigation,
		...docsNavigation,
		...templatesNavigation,
	];
	allNavigation.forEach((section: NavigationItem) => {
		if (section.children) {
			section.children.forEach((child: NavigationChild) => {
				items.push({
					id: `nav-${child.href}`,
					title: child.label,
					description: `${section.label} - ${child.label}`,
					href: child.href || "#",
					category: section.label,
					keywords: [child.label.toLowerCase(), section.label.toLowerCase()],
				});
			});
		}
	});

	return items;
}

// Function to generate searchable items from components registry
function getComponentItems(): SearchableItem[] {
	try {
		return components.map((component) => ({
			id: `component-${component.name}`,
			title: component.title || component.name,
			description: component.description || `${component.name} component`,
			href: `/components/${component.name}`,
			category: "Components",
			keywords: [
				component.name.toLowerCase(),
				component.title?.toLowerCase() || "",
				...(component.description?.toLowerCase().split(" ") || []),
			].filter(Boolean),
		}));
	} catch (error) {
		console.warn("Error loading components for search:", error);
		return [];
	}
}

// Main function to get all searchable items
export function getAllSearchableItems(): SearchableItem[] {
	const navigationItems = getNavigationItems();
	const componentItems = getComponentItems();

	return [...navigationItems, ...componentItems];
}

// Search function with fuzzy matching
export function searchItems(
	query: string,
	items: SearchableItem[],
): SearchableItem[] {
	if (!query.trim()) {
		return items;
	}

	const searchTerm = query.toLowerCase().trim();

	return items
		.map((item) => {
			let score = 0;

			// Exact title match gets highest score
			if (item.title.toLowerCase() === searchTerm) {
				score += 100;
			}
			// Title starts with search term
			else if (item.title.toLowerCase().startsWith(searchTerm)) {
				score += 80;
			}
			// Title contains search term
			else if (item.title.toLowerCase().includes(searchTerm)) {
				score += 60;
			}

			// Description contains search term
			if (item.description.toLowerCase().includes(searchTerm)) {
				score += 40;
			}

			// Keywords match
			if (item.keywords?.some((keyword) => keyword.includes(searchTerm))) {
				score += 30;
			}

			// Category match
			if (item.category.toLowerCase().includes(searchTerm)) {
				score += 20;
			}

			return { ...item, score };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score);
}
