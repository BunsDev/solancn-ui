"use client";

import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavResources({
	resources,
}: {
	resources: {
		name: string;
		links: {
			name: string;
			url: string;
			description: string;
		}[];
	};
}) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{resources.name}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side="bottom"
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="grid flex-1 text-sm sm:text-base leading-tight justify-center text-center py-1">
								<span className="truncate font-medium">{resources.name}</span>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{resources.links.map((link) => (
								<DropdownMenuItem key={link.name} className="py-1 sm:py-2">
									<div className="grid grid-cols-1 items-center gap-2">
										<Link
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											{link.name}
										</Link>
										<div className="text-xs text-muted-foreground truncate">
											{link.description}
										</div>
									</div>
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
