import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { GlobalSidebarTrigger } from "@/components/global-sidebar-trigger";
import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@/components/docs/registry-sidebar";

import "@/app/tokens.css";
import "@/app/tailwind.css";

export const metadata: Metadata = {
  title: "Solancn UI",
  description: "Solancn UI - A collection of components for building modern web applications on Solana.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};

const GeistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const GeistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const MontserratSerif = Montserrat({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        MontserratSerif.variable,
        "bg-background text-foreground",
      )}
    >
      <meta
        name="robots"
        content="noindex, nofollow, noarchive, nosnippet, noimageindex"
      />
      <body className="flex grow">
        <SidebarProvider>
          <GlobalSidebarTrigger />
          <RegistrySidebar />
          <main className="flex flex-col h-screen w-full bg-black px-4 md:px-6 py-6 justify-center items-center mx-auto">
            {children}
          </main>
          <Analytics />
          <SpeedInsights />
        </SidebarProvider>
      </body>
    </html>
  );
}
