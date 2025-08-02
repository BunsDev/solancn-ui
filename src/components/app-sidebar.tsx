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
import { NavProjects } from "./nav-projects";
import { NavigationChild, NavigationItem, NavMainItemProps, Topic } from "@/types/navigation";

const allNavigation: NavigationItem[] = [
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
			path: "/components",
			topicContext: "components",
		},
		{
			name: "Templates",
			logo: Command,
			plan: "Starter Kits",
			path: "/templates",
			topicContext: "templates",
		},
	],
	navMain: allNavigation,
};

const activeTopic = data.topics.find((topic) => topic.topicContext === "components");
if (!activeTopic) {
	throw new Error("Active topic not found");
}

// Define TopicContext type for better TypeScript support
export interface TopicContextType {
	activeTopic: Topic;
	setActiveTopic: React.Dispatch<React.SetStateAction<Topic>>;
	filteredNavItems: NavMainItemProps[];
	platformTitle?: string;
}

// Create a context for the active topic
const TopicContext = React.createContext<TopicContextType>({
	activeTopic: activeTopic,
	setActiveTopic: () => {},
	filteredNavItems: [],
	platformTitle: "Platform",
});

// Custom hook to use topic context
export const useTopicContext = () => React.useContext(TopicContext);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	// State for tracking active topic, initialized with the first topic
	const [activeTopic, setActiveTopic] = React.useState<Topic>(data.topics[0]);

	// Filter navigation items based on active topic context
	const filteredNavItems: NavMainItemProps[] = React.useMemo(() => {
		// Select appropriate navigation array based on active topic
		let navigationSource: NavigationItem[] = [];
		
		// Select the right navigation source based on active topic
		switch (activeTopic.topicContext) {
			case "docs":
				navigationSource = docsNavigation;
				break;
			case "components":
				navigationSource = componentsNavigation;
				break;
			case "templates":
				navigationSource = templatesNavigation;
				break;
			default:
				navigationSource = [];
		}

		// Map the navigation structure to the format expected by NavMain
		const navItems: NavMainItemProps[] = navigationSource.map((section) => {
			// Make sure we have valid children
			const children = section.children || [];
			
			// Map each section to the NavMainItemProps interface
			return {
				title: section.label,
				href: section.href || children[0]?.href || "/",
				// Map children to the format expected by NavMain - href is required
				items: children.map((child) => ({
					title: child.label,
					href: child.href || "/",
					icon: undefined
				}))
			};
		});

		// Return the mapped navigation items
		return navItems;
	}, [activeTopic]);

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
				platformTitle: getPlatformTitle(),
			}}
		>
			<Sidebar collapsible="offcanvas" {...props}>
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
				</SidebarContent>
				<SidebarFooter>
					<NavResources resources={data.resources} />
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
		</TopicContext.Provider>
	);
}
