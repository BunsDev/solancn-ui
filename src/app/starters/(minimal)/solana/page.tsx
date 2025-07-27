"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { swap } from "@/components/swap/swap-component";
import { bridge } from "@/components/bridge/bridge-component";
import { borrow } from "@/components/borrow/borrow-component";
import { lend } from "@/components/lend/lend-component";
import { defi } from "@/components/defi/defi-component";
import { frame } from "@/components/frame/frame-component";
import { portfolio } from "@/components/portfolio/portfolio-component";
import { stake } from "@/components/stake/stake-component";
import { receive } from "@/components/receive/receive-component";
import { nft } from "@/components/nft/nft-component";
import { transfer } from "@/components/transfer/transfer-component";
import { trading } from "@/components/trading/trading-component";
import { wallet } from "@/components/wallet/wallet-component";
import {
  Layers,
  BarChart3,
  Award,
  Coins,
  ArrowRightLeft,
  Banknote,
  Download,
  FrameIcon,
} from "lucide-react";
import SolanaWalletProvider from "@/lib/context/wallet-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  {
    value: "borrow",
    icon: <Coins className="w-4 h-4 md:mr-1" />,
    label: "Borrow",
    content: borrow.components.Default,
  },
  {
    value: "bridge",
    icon: <Download className="w-4 h-4 md:mr-1" />,
    label: "Bridge",
    content: bridge.components.Default,
  },
  {
    value: "defi",
    icon: <Coins className="w-4 h-4 md:mr-1" />,
    label: "DeFi",
    content: defi.components.Default,
  },
  {
    value: "frame",
    icon: <Layers className="w-4 h-4 md:mr-1" />,
    label: "Frame",
    content: frame.components.Default,
  },
  {
    value: "lend",
    icon: <Banknote className="w-4 h-4 md:mr-1" />,
    label: "Lend",
    content: lend.components.Default,
  },
  {
    value: "nft",
    icon: <FrameIcon className="w-4 h-4 md:mr-1" />,
    label: "NFT",
    content: nft.components.Default,
  },
  {
    value: "portfolio",
    icon: <BarChart3 className="w-4 h-4 md:mr-1" />,
    label: "Portfolio",
    content: portfolio.components.Default,
  },
  {
    value: "receive",
    icon: <Download className="w-4 h-4 md:mr-1" />,
    label: "Receive",
    content: receive.components.Default,
  },
  {
    value: "stake",
    icon: <Award className="w-4 h-4 md:mr-1" />,
    label: "Stake",
    content: stake.components.Default,
  },
  {
    value: "trade",
    icon: <ArrowRightLeft className="w-4 h-4 md:mr-1" />,
    label: "Trade",
    content: swap.components.Default,
  },
  {
    value: "trading",
    icon: <ArrowRightLeft className="w-4 h-4 md:mr-1" />,
    label: "Trading",
    content: trading.components.Default,
  },
  {
    value: "transfer",
    icon: <ArrowRightLeft className="w-4 h-4 md:mr-1" />,
    label: "Transfer",
    content: transfer.components.Default,
  },
  {
    value: "wallet",
    icon: <Banknote className="w-4 h-4 md:mr-1" />,
    label: "Wallet",
    content: wallet.components.Default,
  },

]
function SolanaContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto">
          <Tabs
            defaultValue="defi"
            className="w-full flex flex-col justify-center items-center"
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-2 bg-background border border-[#9945FF]/30 w-full overflow-hidden gap-1 mt-1 p-1 justify-center items-center">
              {tabs.map((tab) => (
                <TabsTrigger
                  value={tab.value}
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  {tab.icon}
                  <span className="hidden md:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2 w-full">
              {tabs.map((tab) => (
                <TabsContent value={tab.value} className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">{tab.label}</CardTitle>
                    </CardHeader>
                    <CardContent>{
                      typeof tab.content === "function" ? tab.content() : tab.content}</CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

// Export a wrapper component that provides the wallet context
export function SolanaDemo() {
  return (
    <SolanaWalletProvider>
      <SolanaContent />
    </SolanaWalletProvider>
  );
}
