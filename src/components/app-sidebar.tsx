"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Define team type for better type safety
interface Team {
  name: string
  logo: React.ElementType
  plan: string
  teamContext: string // Array of team IDs this item belongs to
  path: string
}

// Define navigation item type
interface NavItem {
  title: string
  url: string
  teamContext: string // Array of team IDs this item belongs to
  icon?: React.ElementType
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

// This is sample data.
const data = {
  user: {
    name: "Solancn",
    email: "admin@solancn.com",
    avatar: "/logo.png",
  },
  teams: [
    {
      name: "Documentation",
      logo: GalleryVerticalEnd,
      plan: "Installation",
      path: "/docs",
      teamContext: "docs"
    },
    {
      name: "Designs",
      logo: AudioWaveform,
      plan: "Get Started",
      path: "/designs",
      teamContext: "designs"
    },
    {
      name: "Components",
      logo: Command,
      plan: "UI Legos",
      path: "/components",
      teamContext: "components"
    },
    {
      name: "Blocks",
      logo: Command,
      plan: "Comprehensive Elements",
      path: "/blocks",
      teamContext: "blocks"
    },
  ],
  navMain: [
    {
      title: "Components",
      url: "/components",
      icon: SquareTerminal,
      isActive: true,
      teamContext: "components", // This item is shown when Components team is active
      items: [
        {
          title: "History",
          url: "/components/history",
        },
        {
          title: "Starred",
          url: "/components/starred",
        },
        {
          title: "Settings",
          url: "/components/settings",
        },
      ],
    },
    {
      title: "Designs",
      url: "/designs",
      icon: Bot,
      teamContext: "designs", // This item is shown when Designs team is active
      items: [
        {
          title: "Genesis",
          url: "/designs/genesis",
        },
        {
          title: "Explorer",
          url: "/designs/explorer",
        },
        {
          title: "Quantum",
          url: "/designs/quantum",  
        },
      ],
    },
    {
      title: "Blocks",
      url: "/blocks",
      icon: BookOpen,
      teamContext: "blocks", // This item is shown when Blocks team is active
      items: [
        {
          title: "Dashboard",
          url: "/blocks/dashboard",
        },
        {
          title: "Staking",
          url: "/blocks/staking",
        },
        {
          title: "Staking Interface",
          url: "/blocks/staking-interface",
        },
        {
          title: "Swap",
          url: "/blocks/swap",
        },
        {
          title: "Swap Interface",
          url: "/blocks/swap-interface",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: Settings2,
      teamContext: "docs", // This item is shown when Documentation team is active
      items: [
        {
          title: "Introduction",
          url: "/docs",
        },
        {
          title: "Get Started",
          url: "/docs/installation",
        },
        // {
        //   title: "Tutorials",
        //   url: "/docs/tutorials",
        // },
        // {
        //   title: "Changelog",
        //   url: "/docs/changelog",
        // },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
      teamContext: "designs", // This item is shown when Designs team is active
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
      teamContext: "components", // This item is shown when Components team is active
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
      teamContext: "blocks", // This item is shown when Blocks team is active
    },
  ],
}

const activeTeam = data.teams.find(team => team.teamContext === "components")
if (!activeTeam) {
  throw new Error("Active team not found");
}

// Define TeamContext type for better TypeScript support
export interface TeamContextType {
  activeTeam: Team;
  setActiveTeam: React.Dispatch<React.SetStateAction<Team>>;
  filteredNavItems: NavItem[];
  filteredProjects: typeof data.projects;
  platformTitle?: string;
}

// Create a context for the active team
const TeamContext = React.createContext<TeamContextType>({
  activeTeam: activeTeam,
  setActiveTeam: () => {},
  filteredNavItems: [],
  filteredProjects: [],
});

// Custom hook to use team context
export const useTeamContext = () => React.useContext(TeamContext);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // State for tracking active team, initialized with the first team
  const [activeTeam, setActiveTeam] = React.useState<Team>(data.teams[0]);

  // Filter navigation items based on active team
  const filteredNavItems = React.useMemo(() => {
    return data.navMain.filter(item => {
      // If no teamContext is specified, show in all contexts
      if (!item.teamContext || item.teamContext.length === 0) {
        return true;
      }
      // Show items that include the active team in their context
      return item.teamContext.includes(activeTeam.teamContext);
    });
  }, [activeTeam]);

  // Filter projects based on active team
  const filteredProjects = React.useMemo(() => {
    return data.projects.filter(project => {
      // If no teamContext is specified, show in all contexts
      if (!project.teamContext || project.teamContext.length === 0) {
        return true;
      }
      // Show projects that include the active team in their context
      return project.teamContext.includes(activeTeam.teamContext);
    });
  }, [activeTeam]);

  // Calculate platform title based on active team
  const getPlatformTitle = () => {
    switch(activeTeam.teamContext) {
      case "components": return "Components";
      case "designs": return "Designs";
      case "blocks": return "Blocks";
      case "docs": return "Documentation";
      default: return "Platform";
    }
  };

  return (
    <TeamContext.Provider 
      value={{ 
        activeTeam, 
        setActiveTeam,
        filteredNavItems,
        filteredProjects,
        platformTitle: getPlatformTitle()
      }}
    >
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams.map(team => ({
            name: team.name,
            logo: team.logo,
            plan: team.plan,
            path: team.path,
            teamContext: team.teamContext,
          }))} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={filteredNavItems} />
          <NavProjects projects={filteredProjects} />
        </SidebarContent>
        <SidebarFooter>
          {/* <NavUser user={data.user} /> */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TeamContext.Provider>
  )
}
