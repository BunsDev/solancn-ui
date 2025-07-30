"use client"

import { ChevronRight, ChevronDown, Component, Package, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import * as React from "react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useTeamContext } from "./app-sidebar"

interface NavMainItemProps {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}

export function NavMain({
  items,
}: {
  items: NavMainItemProps[]
}) {
  const pathname = usePathname()
  const { platformTitle = "Platform" } = useTeamContext()
  
  // CSS custom property for Solana brand color accents
  const accentStyle = {
    "--component-active": "var(--solana-accent, #9945FF)"
  } as React.CSSProperties
  
  // Determine if a section should be open based on the current path
  const isSectionActive = (item: { url: string }) => {
    return pathname.startsWith(item.url)
  }
  
  // Determine if an item is the current active route
  const isActive = (url: string) => {
    return pathname === url
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{platformTitle}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isSectionActive(item)}
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
                          href={subItem.url} 
                          className={`flex items-center gap-2 ${isActive(subItem.url) ? "font-medium" : ""}`}
                          style={isActive(subItem.url) ? { color: 'var(--solana-accent)' } : undefined}
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
  )
}
