import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@/components/docs/docs-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function DocsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MobileSidebarTrigger />
      <RegistrySidebar />
      <main className="flex w-full justify-center">{children}</main>
      <Toaster />
    </SidebarProvider>
  );
}
