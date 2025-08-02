"use client"

import * as React from "react"
import { BookOpen, Layout, PenTool, Palette, Search, ChevronRight } from "lucide-react"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import {
	componentsNavigation,
	docsNavigation,
	templatesNavigation,
	designsNavigation
} from "@/constants/navigation";
import { NavigationItem, NavigationChild } from "@/types/navigation";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/assets/icons/logo";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
// Navigation section descriptions
const sectionDescriptions = {
	docs: "Official documentation and guides for using the Solana UI components",
	components: "Reusable UI building blocks for creating consistent Solana interfaces",
	templates: "Pre-built page templates optimized for common Solana application patterns",
	designs: "Design system resources including colors, typography, and visual patterns"
};

// Enhanced navigation data with descriptions
const data = {
	user: {
		name: "bunsdev",
		email: "bunsdev@gmail.com",
		avatar: "/bunsdev.png",
	},
	navMain: [
		{
			itemName: "Documentation",
			href: "/docs",
			icon: BookOpen,
			isActive: true,
			navigationType: "docs",
			description: sectionDescriptions.docs
		},
		{
			itemName: "Components",
			href: "/components",
			icon: Layout,
			isActive: false,
			navigationType: "components",
			description: sectionDescriptions.components
		},
		{
			itemName: "Templates",
			href: "/templates",
			icon: PenTool,
			isActive: false,
			navigationType: "templates",
			description: sectionDescriptions.templates
		},
		{
			itemName: "Designs",
			href: "/designs",
			icon: Palette,
			isActive: false,
			navigationType: "designs",
			description: sectionDescriptions.designs
		},
	],
	// Combined navigation items for search functionality
	allItems: [...componentsNavigation, ...docsNavigation, ...templatesNavigation, ...designsNavigation]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	// Note: I'm using state to show active item.
	// IRL you should use the url/router.
	const [activeItem, setActiveItem] = React.useState(data.navMain[0])
	const [navigationItems, setNavigationItems] = React.useState<NavigationItem[]>(docsNavigation)
	const { setOpen } = useSidebar()
	const { theme } = useTheme()
	
	// Function to get the appropriate navigation items based on the selected main item
	const getNavigationItems = (item: typeof data.navMain[0]) => {
		switch(item.navigationType) {
			case "components":
				return componentsNavigation
			case "docs":
				return docsNavigation
			case "templates":
				return templatesNavigation
			case "designs":
				return designsNavigation
			default:
				return []
		}
	}

	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
			{...props}
		>
			{/* This is the first sidebar */}
			{/* We disable collapsible and adjust width to icon. */}
			{/* This will make the sidebar appear as icons. */}
			<Sidebar
				collapsible="none"
				className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
			>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
								<Link href="/">
									<div className="bg-muted text-muted-foreground flex aspect-square size-8 items-center justify-center rounded-lg p-1">
									<Logo
										// useBlack={theme !== "dark"}
									/>
								</div>
							</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent className="px-1.5 md:px-0">
							<SidebarMenu>
								{data.navMain.map((item) => (
									<SidebarMenuItem key={item.itemName}>
										<SidebarMenuButton
											tooltip={{
												children: item.itemName,
												hidden: false,
											}}
											onClick={() => {
												setActiveItem(item)
												// Get the appropriate navigation items for the selected main navigation item
												const items = getNavigationItems(item)
												setNavigationItems(items)
												setOpen(true)
											}}
											isActive={activeItem?.itemName === item.itemName}
											className="px-2.5 md:px-2"
										>
											<item.icon />
											<span>{item.itemName}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				{/* <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter> */}
			</Sidebar>

			{/* This is the second sidebar */}
			{/* We disable collapsible and let it fill remaining space */}
			<Sidebar collapsible="none" className="hidden flex-1 md:flex">
				<SidebarHeader className="gap-3.5 border-b p-4">
					<div className="flex w-full items-center justify-between">
						<div className="text-foreground text-base font-medium">
							{activeItem?.itemName}
						</div>
					</div>
					<SidebarInput placeholder="Type to search..." />
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup className="px-0">
						<SidebarGroupContent>
							{navigationItems.map((section) => (
								<div key={section.itemName} className="border-b last:border-b-0">
									<div className="flex w-full items-center justify-between">
										<div>{section.itemName}</div>
										{section.badge && (
											<span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{section.badge}</span>
										)}
										</div>
									{section.children && section.children.length > 0 && (
										<div className="pl-4">
											{section.children.map((child) => (
												<Link 
													key={child.childName}
													href={child.href || '#'}
													className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center justify-between p-2 text-xs text-muted-foreground"
												>
													<span>{child.childName}</span>
													{child.badge && (
														<span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-full">{child.badge}</span>
													)}
												</Link>
											))}
										</div>
									)}
								</div>
							))}
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</Sidebar>
	)
}
