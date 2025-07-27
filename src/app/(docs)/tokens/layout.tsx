import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@/components/docs/registry-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export default function TokensLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          storageKey="solancn-ui-theme"
        >
          <SidebarProvider>
            <MobileSidebarTrigger />
            <RegistrySidebar />
            <main className="flex w-full justify-center">{children}</main>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
  );
}
