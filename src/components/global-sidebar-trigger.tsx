"use client";

import { PanelLeftIcon, PanelRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export function GlobalSidebarTrigger() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50 md:hidden">
      <Button
        variant="outline" 
        size="icon"
        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-sidebar-accent hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <PanelRightIcon className="h-4 w-4" />
        ) : (
          <PanelLeftIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
