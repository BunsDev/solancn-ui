import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@/components/docs/registry-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function StartersLayout({
  children,
}: Readonly<{ 
  children: ReactNode;
}>) {
  return (
          <SidebarProvider>
            <MobileSidebarTrigger />
            <RegistrySidebar />
            <div className="flex w-full justify-center">{children}</div>
            <Toaster />
          </SidebarProvider>
  );
}
