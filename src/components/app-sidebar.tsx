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
// import { NavProjects } from "@/components/nav-projects"
import { NavResources } from "@/components/nav-resources"
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
  resources: {
    name: 'Resources',
    links: [
      {
        name: 'Solana Docs',
        url: 'https://docs.solana.com/',
        description: 'Official documentation for Solana blockchain',
      },
      {
        name: 'Solana Faucet',
        url: 'https://faucet.solana.com/',
        description: 'Get test tokens for development',
      },
      {
        name: 'Solana Cookbook',
        url: 'https://solana.com/developers/cookbook/',
        description: 'Recipes for common Solana development tasks',
      },
    ],
  },
  teams: [
    {
      name: "Solancn UI",
      logo: GalleryVerticalEnd,
      plan: "Installation and Guides",
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
      name: "Templates",
      logo: Command,
      plan: "Comprehensive Elements",
      path: "/templates",
      teamContext: "templates"
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/components",
      icon: SquareTerminal,
      isActive: true,
      teamContext: "components",
      items: [
        {
          title: "Introduction",
          url: "/components/introduction",
        },
        {
          title: "Getting Started",
          url: "/components/getting-started",
        }
      ],
    },
    {
      title: "Layout",
      url: "/components/layout",
      icon: Frame,
      teamContext: "components",
      items: [
        {
          title: "Accordion",
          url: "/components/accordion",
        },
        {
          title: "Card",
          url: "/components/card",
        },
        {
          title: "Collapsible",
          url: "/components/collapsible",
        },
        {
          title: "Resizable",
          url: "/components/resizable",
        },
        {
          title: "Scroll Area",
          url: "/components/scroll-area",
        },
        {
          title: "Separator",
          url: "/components/separator",
        },
        {
          title: "Sheet",
          url: "/components/sheet",
        },
        {
          title: "Sidebar",
          url: "/components/sidebar",
        },
        {
          title: "Tabs",
          url: "/components/tabs",
        },
      ],
    },
    {
      title: "Data Display",
      url: "/components/data-display",
      icon: PieChart,
      teamContext: "components",
      items: [
        {
          title: "Avatar",
          url: "/components/avatar",
        },
        {
          title: "Badge",
          url: "/components/badge",
        },
        {
          title: "Code Block",
          url: "/components/code-block",
        },
        {
          title: "Table",
          url: "/components/table",
        },
        {
          title: "Vitepress Table",
          url: "/components/vitepress-table",
        },
      ],
    },
    {
      title: "Inputs & Forms",
      url: "/components/inputs",
      icon: Settings2,
      teamContext: "components",
      items: [
        {
          title: "Button",
          url: "/components/button",
        },
        {
          title: "Input",
          url: "/components/input",
        },
        {
          title: "Label",
          url: "/components/label",
        },
        {
          title: "Select",
          url: "/components/select",
        },
        {
          title: "Switch",
          url: "/components/switch",
        },
        {
          title: "Toggle",
          url: "/components/toggle",
        },
        {
          title: "Toggle Group",
          url: "/components/toggle-group",
        },
      ],
    },
    {
      title: "Feedback & Overlay",
      url: "/components/feedback",
      icon: AudioWaveform,
      teamContext: "components",
      items: [
        {
          title: "Dropdown Menu",
          url: "/components/dropdown-menu",
        },
        {
          title: "Skeleton",
          url: "/components/skeleton",
        },
        {
          title: "Sonner",
          url: "/components/sonner",
        },
        {
          title: "Tooltip",
          url: "/components/tooltip",
        },
        {
          title: "Border Beam",
          url: "/components/border-beam",
        },
      ],
    },
    {
      title: "Navigation",
      url: "/components/navigation",
      icon: Map,
      teamContext: "components",
      items: [
        {
          title: "Breadcrumb",
          url: "/components/breadcrumb",
        }
      ],
    },
    {
      title: "Utility",
      url: "/components/utility",
      icon: Command,
      teamContext: "components",
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
      title: "Templates",
      url: "/templates",
      icon: BookOpen,
      teamContext: "templates", // This item is shown when Templates team is active
      items: [
        {
          title: "Dashboard",
          url: "/templates/dashboard",
        },
        {
          title: "Staking",
          url: "/templates/staking",
        },
        {
          title: "Staking Interface",
          url: "/templates/staking-interface",
        },
        {
          title: "Swap",
          url: "/templates/swap",
        },
        {
          title: "Swap Interface",
          url: "/templates/swap-interface",
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
      teamContext: "templates", // This item is shown when Templates team is active
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
      case "templates": return "Templates";
      case "docs": return "Documentation";
      default: return "Platform";
    }
  };
  
  // Get brand color based on active team
  const getBrandColor = () => {
    switch(activeTeam.teamContext) {
      case "components": return "#9945FF"; // Solana Purple
      case "designs": return "#14F195"; // Solana Green
      case "templates": return "#9945FF"; // Solana Purple
      case "docs": return "#14F195"; // Solana Green
      default: return "#9945FF"; // Default to Solana Purple
    }
  };

  // Apply brand color to sidebar elements
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--solana-accent', getBrandColor());
  }, [activeTeam]);

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
          {/* <NavProjects projects={filteredProjects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavResources resources={data.resources} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TeamContext.Provider>
  )
}
