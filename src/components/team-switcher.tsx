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
	useSidebar,
} from "@/components/ui/sidebar";
import { useTeamContext } from "./app-sidebar"; // Import the TeamContext hook

interface Team {
	name: string;
	logo: React.ElementType;
	plan: string;
	path: string;
	teamContext: string;
}

export function TeamSwitcher({ teams }: { teams: Team[] }) {
	const router = useRouter();
	const pathname = usePathname();
	const { isMobile } = useSidebar();

	// Get active team and setter from context
	const { activeTeam, setActiveTeam } = useTeamContext();

	// Update active team based on URL path if it changes
	React.useEffect(() => {
		// Determine which team should be active based on the current path
		const pathTeam = teams.find((team) => {
			const teamPath = team.path.split("/")[1]; // e.g., 'components' from '/components'
			return pathname.startsWith(`/${teamPath}`);
		});

		// Update active team if the path indicates a different team
		if (pathTeam && pathTeam.teamContext !== activeTeam.teamContext) {
			setActiveTeam(pathTeam);
		}
	}, [pathname, teams, activeTeam, setActiveTeam]);

	const handleTeamSelect = async (team: Team) => {
		// Update the team in context
		setActiveTeam(team);

		// Navigate to the team's path if available
		if (team.path) {
			router.push(team.path);
		}
	};

	if (!activeTeam) {
		return null;
	}

	// Get the icon for each team context
	const getTeamIcon = (context: string) => {
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
									icon={getTeamIcon(activeTeam.teamContext)}
									className="size-4"
								/>
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{activeTeam.name}</span>
								<span className="truncate text-xs">{activeTeam.plan}</span>
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
							Teams
						</DropdownMenuLabel>
						{teams.map((team, index) => (
							<DropdownMenuItem
								key={team.name}
								onClick={() => handleTeamSelect(team)}
								// Highlight the active team
								className={`gap-2 p-2 ${team.teamContext === activeTeam.teamContext ? "bg-accent text-accent-foreground" : ""}`}
							>
								<div className="flex size-6 items-center justify-center rounded-md border">
									<Icon
										icon={getTeamIcon(team.teamContext)}
										className="size-3.5 shrink-0"
									/>
								</div>
								{team.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Plus className="size-4" />
							</div>
							<div className="text-muted-foreground font-medium">Add team</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
