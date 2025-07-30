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
  type LucideIcon,
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
import { docsNavigation, componentsNavigation, templatesNavigation, designsNavigation } from "@/constants/navigation"
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
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}

const allNavigation = [...docsNavigation, ...componentsNavigation, ...templatesNavigation, ...designsNavigation]; 

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
    ...docsNavigation,
    ...componentsNavigation,
    ...templatesNavigation,
    ...designsNavigation,
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

  // Filter navigation items based on active team and map them to the NavItem interface
  const filteredNavItems = React.useMemo(() => {
    // First, filter the navigation items based on active team
    const filteredItems = data.navMain.filter(item => {
      // If no children property or empty children array, show in all contexts
      if (!item.children || item.children.length === 0) {
        return true;
      }
      
      // Check if there's a matching navigation item based on first child's href
      return allNavigation.some(navItem => {
        // Make sure both items have children arrays with at least one child
        if (!navItem.children?.length || !item.children?.length) {
          return false;
        }
        
        // Get the first child from each to compare hrefs
        const navItemFirstChild = navItem.children[0];
        const itemFirstChild = item.children[0];
        
        // For navigation items, we can determine their category based on which array they belong to
        const belongsToActiveTeam = 
          (activeTeam.teamContext === "docs" && docsNavigation.includes(navItem)) ||
          (activeTeam.teamContext === "components" && componentsNavigation.includes(navItem)) ||
          (activeTeam.teamContext === "templates" && templatesNavigation.includes(navItem)) ||
          (activeTeam.teamContext === "designs" && designsNavigation.includes(navItem));
        
        // Compare the hrefs if they exist and check if this belongs to the active team
        return navItemFirstChild.href === itemFirstChild?.href && belongsToActiveTeam;
      });
    });
    
    // Convert filtered items to NavItem type
    return filteredItems.map(item => {
      // Check if the item has most NavItem properties
      if ('title' in item && 'url' in item) {
        // Ensure teamContext property exists
        const navItem = item as any;
        if (!('teamContext' in item)) {
          navItem.teamContext = activeTeam.teamContext;
        }
        return navItem as NavItem;
      }
      
      // Convert NavigationItem to NavItem
      return {
        title: 'title' in item ? item.title : item.label || '',
        url: 'url' in item ? item.url : (item.children?.[0]?.href || ''),
        teamContext: 'teamContext' in item ? item.teamContext : activeTeam.teamContext,
        // Only use the icon if it's a LucideIcon
        icon: 'icon' in item && item.icon ? 
          (typeof item.icon === 'function' && 'displayName' in item.icon ? item.icon as LucideIcon : undefined) 
          : undefined,
        isActive: 'isActive' in item ? item.isActive : undefined,
        items: 'items' in item ? item.items : item.children?.map(child => ({
          title: child.label || '',
          url: child.href || '',
          // No icons for child items when converting from NavigationItem
          icon: undefined
        }))
      } as NavItem;
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
