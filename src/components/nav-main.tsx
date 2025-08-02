"use client";

import {
	ChevronDown,
	ChevronRight,
	Component,
	type LucideIcon,
	Package,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavMainItemProps } from "@/types/navigation";

export function NavMain({ items }: { items: NavMainItemProps[] }) {
	const pathname = usePathname();

	// Determine if an item is the current active route
	const isActive = (url: string) => {
		return pathname === url;
	};	

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{items[0].title}</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={true}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon className="shrink-0" />}
									<span className="truncate">{item.title}</span>
									<span className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center">
										<ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</span>
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<Link
													href={subItem.href || '#'}
													className={`flex items-center gap-2 ${isActive(subItem.href) ? "font-medium" : ""}`}
													style={
														isActive(subItem.href)
															? { color: "var(--solana-accent)" }
															: undefined
													}
												>
													{subItem.icon ? (
														<subItem.icon className="h-4 w-4 shrink-0" />
													) : (
														<Component className="h-4 w-4 shrink-0 text-muted-foreground" />
													)}
													<span className="truncate">{subItem.title}</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
