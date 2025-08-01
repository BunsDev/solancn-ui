"use client";

import { Icon } from "@iconify/react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	useSidebar,
} from "@/components/ui/sidebar";
import { useTopicContext } from "./app-sidebar"; // Import the TeamContext hook

interface Topic {
	name: string;
	logo: React.ElementType;
	plan: string;
	path: string;
	topicContext: string;
}

export function TopicSwitcher({ topics }: { topics: Topic[] }) {
	const router = useRouter();
	const pathname = usePathname();
	const { isMobile } = useSidebar();

	// Get active topic and setter from context
	const { activeTopic, setActiveTopic } = useTopicContext();

	// Update active topic based on URL path if it changes
	React.useEffect(() => {
		// Determine which topic should be active based on the current path
		const pathTopic = topics.find((topic) => {
			const topicPath = topic.path.split("/")[1]; // e.g., 'components' from '/components'
			return pathname.startsWith(`/${topicPath}`);
		});

		// Update active topic if the path indicates a different topic
		if (pathTopic && pathTopic.topicContext !== activeTopic.topicContext) {
			setActiveTopic(pathTopic);
		}
	}, [pathname, topics, activeTopic, setActiveTopic]);

	const handleTopicSelect = async (topic: Topic) => {
		// Update the topic in context
		setActiveTopic(topic);

		// Navigate to the topic's path if available
		if (topic.path) {
			router.push(topic.path);
		}
	};

	if (!activeTopic) {
		return null;
	}

	// Get the icon for each topic context
	const getTopicIcon = (context: string) => {
		switch (context) {
			case "components":
				return "lucide:terminal-square";
			case "templates":
				return "lucide:book-open";
			case "docs":
				return "lucide:gallery-vertical-end";
			default:
				return "fa7-solid:gem";
		}
	};

	return (
		<SidebarProvider>
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<Icon
									icon={getTopicIcon(activeTopic.topicContext)}
									className="size-4"
								/>
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{activeTopic.name}</span>
								<span className="truncate text-xs">{activeTopic.plan}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Topics
						</DropdownMenuLabel>
						{topics.map((topic, index) => (
							<DropdownMenuItem
								key={topic.name}
								onClick={() => handleTopicSelect(topic)}
								// Highlight the active topic
								className={`gap-2 p-2 ${topic.topicContext === activeTopic.topicContext ? "bg-accent text-accent-foreground" : ""}`}
							>
								<div className="flex size-6 items-center justify-center rounded-md border">
									<Icon
										icon={getTopicIcon(topic.topicContext)}
										className="size-3.5 shrink-0"
									/>
								</div>
								{topic.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
		</SidebarProvider>
	);
}
