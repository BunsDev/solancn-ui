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
          <div className="flex flex-col w-fit justify-center items-center overflow-x-hidden h-dvh mx-auto max-w-fit">
            {children}
            <Toaster />
          </div>
  );
}
