"use client";

import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	type LucideIcon,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects"
import { NavResources } from "@/components/nav-resources";
import { TopicSwitcher } from "@/components/topic-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import {
	componentsNavigation,
	docsNavigation,
	templatesNavigation,
} from "@/constants/navigation";

// Define topic type for better type safety
interface Topic {
	name: string;
	logo: React.ElementType;
	plan: string;
	topicContext: string; // Array of topic IDs this item belongs to
	path: string;
}

// Define navigation item type
interface NavItem {
	title: string;
	url: string;
	topicContext: string; // Array of topic IDs this item belongs to
	icon?: LucideIcon;
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
		icon?: LucideIcon;
	}[];
}

const allNavigation = [
	...docsNavigation,
	...componentsNavigation,
	...templatesNavigation,
];

// This is sample data.
const data = {
	resources: {
		name: "Resources",
		links: [
			{
				name: "Solana Docs",
				url: "https://docs.solana.com/",
				description: "Official documentation for Solana blockchain",
			},
			{
				name: "Solana Faucet",
				url: "https://faucet.solana.com/",
				description: "Get test tokens for development",
			},
			{
				name: "Solana Cookbook",
				url: "https://solana.com/developers/cookbook/",
				description: "Recipes for common Solana development tasks",
			},
		],
	},
	topics: [
		{
			name: "Solancn UI",
			logo: GalleryVerticalEnd,
			plan: "Installation & Guides",
			path: "/docs/introduction",
			topicContext: "docs",
		},
		{
			name: "Components",
			logo: Command,
			plan: "Modular Components",
			path: "/components/accordion",
			topicContext: "components",
		},
		{
			name: "Templates",
			logo: Command,
			plan: "Starter Kits",
			path: "/templates/nft-market",
			topicContext: "templates",
		},
	],
	navMain: [...docsNavigation, ...componentsNavigation, ...templatesNavigation],
	// projects: [
	//   {
	//     name: "Sales & Marketing",
	//     url: "#",
	//     icon: PieChart,
	//     topicContext: "components", // This item is shown when Components topic is active
	//   },
	//   {
	//     name: "Travel",
	//     url: "#",
	//     icon: Map,
	//     topicContext: "templates", // This item is shown when Templates topic is active
	//   },
	// ],
};

const activeTopic = data.topics.find((topic) => topic.topicContext === "docs");
if (!activeTopic) {
	throw new Error("Active topic not found");
}

// Define TopicContext type for better TypeScript support
export interface TopicContextType {
	activeTopic: Topic;
	setActiveTopic: React.Dispatch<React.SetStateAction<Topic>>;
	filteredNavItems: NavItem[];
	filteredProjects?: any[]; // typeof data.projects;
	platformTitle?: string;
}

// Create a context for the active topic
const TopicContext = React.createContext<TopicContextType>({
	activeTopic: activeTopic,
	setActiveTopic: () => {},
	filteredNavItems: [],
	filteredProjects: [],
});

// Custom hook to use topic context
export const useTopicContext = () => React.useContext(TopicContext);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	// State for tracking active topic, initialized with the first topic
	const [activeTopic, setActiveTopic] = React.useState<Topic>(data.topics[0]);

	// Filter navigation items based on active topic and map them to the NavItem interface
	const filteredNavItems = React.useMemo(() => {
		// First, filter the navigation items based on active topic
		const filteredItems = data.navMain.filter((item) => {
			// If no children property or empty children array, show in all contexts
			if (!item.children || item.children.length === 0) {
				return true;
			}

			// Check if there's a matching navigation item based on first child's href
			return allNavigation.some((navItem) => {
				// Make sure both items have children arrays with at least one child
				if (!navItem.children?.length || !item.children?.length) {
					return false;
				}

				// Get the first child from each to compare hrefs
				const navItemFirstChild = navItem.children[0];
				const itemFirstChild = item.children[0];

				// For navigation items, we can determine their category based on which array they belong to
				const belongsToActiveTopic =
					(activeTopic.topicContext === "docs" &&
						docsNavigation.includes(navItem)) ||
					(activeTopic.topicContext === "components" &&
						componentsNavigation.includes(navItem)) ||
					(activeTopic.topicContext === "templates" &&
						templatesNavigation.includes(navItem));

				// Compare the hrefs if they exist and check if this belongs to the active topic
				return (
					navItemFirstChild.href === itemFirstChild?.href && belongsToActiveTopic
				);
			});
		});

		// Convert filtered items to NavItem type
		return filteredItems.map((item) => {
			// Check if the item has most NavItem properties
			if ("title" in item && "url" in item) {
				// Ensure topicContext property exists
				const navItem = item as any;
				if (!("topicContext" in item)) {
					navItem.topicContext = activeTopic.topicContext;
				}
				return navItem as NavItem;
			}

			// Convert NavigationItem to NavItem
			return {
				title: "title" in item ? item.title : item.label || "",
				url: "url" in item ? item.url : item.children?.[0]?.href || "",
				topicContext:
					"topicContext" in item ? item.topicContext : activeTopic.topicContext,
				// Only use the icon if it's a LucideIcon
				icon:
					"icon" in item && item.icon
						? typeof item.icon === "function" && "displayName" in item.icon
							? (item.icon as LucideIcon)
							: undefined
						: undefined,
				isActive: "isActive" in item ? item.isActive : undefined,
				items:
					"items" in item
						? item.items
						: item.children?.map((child) => ({
								title: child.label || "",
								url: child.href || "",
								// No icons for child items when converting from NavigationItem
								icon: undefined,
							})),
			} as NavItem;
		});
	}, [activeTopic]);

	// Filter projects based on active topic
	// const filteredProjects = React.useMemo(() => {
	//   return data.projects.filter(project => {
	//     // If no topicContext is specified, show in all contexts
	//     if (!project.topicContext || project.topicContext.length === 0) {
	//       return true;
	//     }
	//     // Show projects that include the active topic in their context
	//     return project.topicContext.includes(activeTopic.topicContext);
	//   });
	// }, [activeTopic]);

	// Calculate platform title based on active topic
	const getPlatformTitle = () => {
		switch (activeTopic.topicContext) {
			case "components":
				return "Components";
			case "templates":
				return "Templates";
			case "docs":
				return "Documentation";
			default:
				return "Platform";
		}
	};

	// Get brand color based on active topic
	const getBrandColor = () => {
		switch (activeTopic.topicContext) {
			case "components":
				return "#9945FF"; // Solana Purple
			case "templates":
				return "#9945FF"; // Solana Purple
			case "docs":
				return "#14F195"; // Solana Green
			default:
				return "#9945FF"; // Default to Solana Purple
		}
	};

	// Apply brand color to sidebar elements
	React.useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty("--solana-accent", getBrandColor());
	}, [activeTopic]);

	return (
		<TopicContext.Provider
			value={{
				activeTopic,
				setActiveTopic,
				filteredNavItems,
				// filteredProjects,
				platformTitle: getPlatformTitle(),
			}}
		>
			<Sidebar collapsible="offcanvas" {...props} className="z-100">
				<SidebarHeader>
					<TopicSwitcher
						topics={data.topics.map((topic) => ({
							name: topic.name,
							logo: topic.logo,
							plan: topic.plan,
							path: topic.path,
							topicContext: topic.topicContext,
						}))}
					/>
				</SidebarHeader>
				<SidebarContent>
					<NavMain items={filteredNavItems} />
					{/* <NavProjects projects={filteredProjects} /> */}
				</SidebarContent>
				<SidebarFooter>
					<NavResources resources={data.resources} />
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
		</TopicContext.Provider>
	);
}
