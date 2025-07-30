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
      path: "/docs"
    },
    {
      name: "Designs",
      logo: AudioWaveform,
      plan: "Get Started",
      path: "/designs"
    },
    {
      name: "Components",
      logo: Command,
      plan: "UI Legos",
      path: "/components"
    },
    {
      name: "Blocks",
      logo: Command,
      plan: "Comprehensive Elements",
      path: "/blocks"
    },
  ],
  navMain: [
    {
      title: "Components",
      url: "/components",
      icon: SquareTerminal,
      isActive: true,
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
        {
          title: "Swap Interface",
          url: "/blocks/swap-interface",
        },
      ],
    },
    {
      title: "Blocks",
      url: "/blocks",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/blocks/general",
        },
        {
          title: "Team",
          url: "/blocks/team",
        },
        {
          title: "Billing",
          url: "/blocks/billing",
        },
        {
          title: "Limits",
          url: "/blocks/limits",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
