import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@/components/docs/docs-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function BlocksLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MobileSidebarTrigger />
      <RegistrySidebar />
      <main className="flex w-full justify-center p-2 mt-16 sm:mt-8 md:mt-4 lg:mt-0 md:p-4 lg:p-8">
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
