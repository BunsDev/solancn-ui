import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type React from "react";

import { ComponentCard } from "@/components/docs/component-card";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MobileSidebarTrigger } from "@/components/docs/registry-sidebar";
import { RegistrySidebar } from "@/components/docs/registry-sidebar";

const starters = [
  {
    title: "Blank",
    name: "blank",
    url: "/starters/blank",
  },
  {
    title: "Dashboard",
    name: "dashboard",
    url: "/starters/dashboard",
  },
  {
    title: "Borrow",
    name: "borrow",
    url: "/starters/borrow",
  },
  {
    title: "Bridge",
    name: "bridge",
    url: "/starters/bridge",
  },
  {
    title: "Defi",
    name: "defi",
    url: "/starters/defi",
  },
  {
    title: "Frame",
    name: "frame",
    url: "/starters/frame",
  },
  {
    title: "Lend",
    name: "lend",
    url: "/starters/lend",
  },
  {
    title: "NFT",
    name: "nft",
    url: "/starters/nft",
  },
  {
    title: "Portfolio",
    name: "portfolio",
    url: "/starters/portfolio",
  },
  {
    title: "Receive",
    name: "receive",
    url: "/starters/receive",
  },
  {
    title: "Solana",
    name: "solana",
    url: "/starters/solana",
  },
  {
    title: "Stake",
    name: "stake",
    url: "/starters/stake",
  },
  {
    title: "Swap",
    name: "swap",
    url: "/starters/swap",
  },
  {
    title: "Trading",
    name: "trading",
    url: "/starters/trading",
  },
  {
    title: "Transfer",
    name: "transfer",
    url: "/starters/transfer",
  },
  {
    title: "Wallet",
    name: "wallet",
    url: "/starters/wallet",
  },
];

export default function StartPage() {
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="font-bold text-3xl tracking-tight">Starters</h1>
        </div>
      </div>
      <SidebarProvider>
      <MobileSidebarTrigger />
      <RegistrySidebar />
      <div className="flex flex-col gap-8">
        {starters.map((starter) => (
          <ComponentCard
            key={starter.name}
            name={starter.name}
            baseUrl={process.env.VERCEL_BRANCH_URL ?? ""}
            title={starter.title}
            promptTitle={`${starter.title ?? ""} Starter Kit`}
            previewUrl={starter.url}
          />
        ))}
      </div>
      </SidebarProvider>
    </div>
  );
}
