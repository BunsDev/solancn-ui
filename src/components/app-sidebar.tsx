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

// Helper type for active child item tracking
interface ActiveNavState {
	parentItem: typeof data.navMain[0] | null;
	childItem: NavigationChild | null;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	// State to track active navigation elements
	const [activeNav, setActiveNav] = React.useState<ActiveNavState>({
		parentItem: data.navMain[0],
		childItem: null
	});
	const [navigationItems, setNavigationItems] = React.useState<NavigationItem[]>(docsNavigation);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [isSearching, setIsSearching] = React.useState(false);
	const { setOpen } = useSidebar();
	const { theme } = useTheme();

	// Function to get the appropriate navigation items based on the selected main item
	const getNavigationItems = (item: typeof data.navMain[0]) => {
		switch(item.navigationType) {
			case "components":
				return componentsNavigation;
			case "docs":
				return docsNavigation;
			case "templates":
				return templatesNavigation;
			case "designs":
				return designsNavigation;
			default:
				return [];
		}
	};

	// Function to handle search
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		setIsSearching(query.length > 0);
	};

	// Filter navigation items based on search query
	const filteredItems = React.useMemo(() => {
		if (!searchQuery) return navigationItems;
		
		return navigationItems.filter(section => {
			// Check if section name matches
			if (section.itemName.toLowerCase().includes(searchQuery)) return true;
			
			// Check if any children match
			const hasMatchingChildren = section.children?.some(child => 
				child.childName.toLowerCase().includes(searchQuery)
			);
			
			return hasMatchingChildren;
		});
	}, [navigationItems, searchQuery]);
	
	// Set active item and load appropriate navigation
	const setActiveItem = (item: typeof data.navMain[0]) => {
		setActiveNav({
			parentItem: item,
			childItem: null
		});
		const items = getNavigationItems(item);
		setNavigationItems(items);
		setOpen(true);
		setSearchQuery("");
		setIsSearching(false);
	};

	// Set active child item
	const setActiveChildItem = (child: NavigationChild) => {
		setActiveNav(prev => ({
			...prev,
			childItem: child
		}));
	}

	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden *:data-[sidebar=sidebar]:flex-row bg-background"
			{...props}
		>
			{/* Primary sidebar - Navigation icons */}
			<Sidebar
				collapsible="none"
				className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r border-border/50"
			>
				<SidebarHeader className="p-3 border-b border-border/30">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild className="md:h-10 md:p-0">
								<Link href="/">
									<div className="bg-primary/10 text-primary hover:bg-primary/15 transition-colors flex aspect-square size-10 items-center justify-center rounded-lg p-1">
									<Logo />
								</div>
							</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup className="mt-3">
						<SidebarGroupContent className="px-2 space-y-2">
							<SidebarMenu>
								{data.navMain.map((item) => (
									<SidebarMenuItem key={item.itemName}>
										<TooltipProvider>
											<Tooltip delayDuration={300}>
												<TooltipTrigger asChild>
													<SidebarMenuButton
														onClick={() => setActiveItem(item)}
														isActive={activeNav.parentItem?.itemName === item.itemName}
														className={cn(
															"px-2 py-2 w-full justify-center items-center rounded-lg transition-all",
															activeNav.parentItem?.itemName === item.itemName 
															? "bg-primary/10 text-primary" 
															: "text-muted-foreground hover:bg-muted"
														)}
													>
														<item.icon className="h-5 w-5" />
													</SidebarMenuButton>
												</TooltipTrigger>
												<TooltipContent side="right" className="text-xs font-medium">
													{item.itemName}
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter className="border-t border-border/30 p-2">
					<div className="flex justify-center">
						<TooltipProvider>
							<Tooltip delayDuration={300}>
								<TooltipTrigger asChild>
									<button className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-muted transition-colors">
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zM6.92 6.085c.081-.16.19-.299.34-.398.145-.097.371-.187.74-.187.28 0 .553.087.738.225A.613.613 0 019 6.25c0 .177-.04.264-.077.318a.956.956 0 01-.277.245c-.076.051-.158.1-.258.161l-.007.004c-.093.056-.204.122-.313.195a2.416 2.416 0 00-.692.661.75.75 0 001.248.832.956.956 0 01.276-.245 6.3 6.3 0 01.26-.16l.006-.004c.093-.057.204-.123.313-.195.222-.149.487-.355.692-.662.214-.32.329-.702.329-1.15 0-.76-.36-1.348-.863-1.725A2.76 2.76 0 008 4c-.631 0-1.155.16-1.572.438-.413.276-.68.638-.849.977a.75.75 0 101.342.67z" fill="currentColor" />
										</svg>
									</button>
								</TooltipTrigger>
								<TooltipContent side="right" className="text-xs font-medium">
									Help & Documentation
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</SidebarFooter>
			</Sidebar>

			{/* Content sidebar - Displays categories and items with descriptions */}
			<Sidebar collapsible="none" className="hidden flex-1 md:flex border-r border-border/30">
				<SidebarHeader className="border-b border-border/30 p-4">
					<div className="flex w-full items-center justify-between mb-4">
						<div className="text-foreground text-lg font-semibold tracking-tight">
							{activeNav.parentItem?.itemName}
						</div>
					</div>
					<div className="text-sm text-muted-foreground mb-4">
						{activeNav.parentItem?.description}
					</div>
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<SidebarInput 
							placeholder="Search..." 
							className="pl-9 bg-muted/50 focus:bg-background" 
							value={searchQuery}
							onChange={handleSearch}
						/>
					</div>
				</SidebarHeader>
				<SidebarContent>
					<ScrollArea className="h-full">
						{isSearching && filteredItems.length === 0 ? (
							<div className="p-4 text-center text-muted-foreground text-sm">
								No results found for {`"${searchQuery}"`}
							</div>
						) : (
							<SidebarGroup className="px-0">
								<SidebarGroupContent className="space-y-1">
									{(isSearching ? filteredItems : navigationItems).map((section) => (
										<div key={section.itemName} className="mb-6 last:mb-2">
											<div className="px-4 mb-2">
												<div className="flex w-full items-center justify-between">
													<h3 className="text-sm font-semibold text-foreground">{section.itemName}</h3>
													{section.badge && (
														<Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">{section.badge}</Badge>
													)}
												</div>
											</div>
											{section.children && section.children.length > 0 && (
												<div className="space-y-1">
													{section.children.map((child) => {
														const isActive = activeNav.childItem?.childName === child.childName;
														return (
															<Link 
																key={child.childName}
																href={child.href || '#'}
																onClick={() => setActiveChildItem(child)}
																className={cn(
																	"group relative flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
																	isActive 
																		? "bg-primary/10 text-primary font-medium" 
																		: "text-muted-foreground hover:bg-muted"
																)}
															>
																<div className="flex flex-col items-start">
																	<span className={cn("text-sm", isActive && "font-medium")}>{child.childName}</span>
																	{/* Description would go here if available in the data */}
																	<span className="text-xs text-muted-foreground group-hover:text-foreground/70 mt-0.5 line-clamp-1">
																		{section.itemName} component
																	</span>
																</div>
																<div className="flex items-center space-x-2">
																	{child.badge && (
																		<Badge variant="outline" className="text-[10px] py-0 px-1.5 bg-primary/5 text-primary border-primary/20">
																			{child.badge}
																		</Badge>
																	)}
																	<ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-opacity opacity-0 group-hover:opacity-100" />
																</div>
															</Link>
														);
													})}
												</div>
											)}
										</div>
									))}
								</SidebarGroupContent>
							</SidebarGroup>
						)}
					</ScrollArea>
				</SidebarContent>
			</Sidebar>
		</Sidebar>
	)
}
