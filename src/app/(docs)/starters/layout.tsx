import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function StartersLayout({
  children,
}: Readonly<{ 
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full max-w-[100vw] mx-auto justify-center items-center overflow-auto min-h-[100dvh] relative">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
