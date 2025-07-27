"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { ArrowRightLeft, Settings, Zap, Info, RefreshCw, BarChart3, Repeat, LineChart, Clock } from "lucide-react";
import StyledWalletButton from "@/components/wallet/wallet-button";
import { cn } from "@/lib/utils";
import { SwapToken } from "@/lib/types";
import SwapTokenSelectButton from "@/components/swap/token-select-button";
import { useWallet } from "@solana/wallet-adapter-react";
import { SwapComponent } from "@/components/swap/swap-component";
import { mockSwapTokens } from "@/lib/constants/swap";

export default function SwapPage() {
  const { connected } = useWallet();

  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <header className="border-b border-[#9945FF]/20 p-4 sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[#9945FF]/20 p-2 rounded-md text-text">
            <div className="w-8 h-8 cursor-pointer rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center">
              <ArrowRightLeft className="text-text w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold">Solana Swap</h1>
          </div>
          <StyledWalletButton />
        </div>
      </header>

      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto py-8">
          {connected ? (
            <Card className="bg-background border border-[#9945FF]/20 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-text flex justify-between items-center">
                  <span>Swap</span>
                  <div className="flex items-center gap-1 text-xs font-normal">
                    <Badge variant="outline" className="bg-[#9945FF]/10 hover:bg-[#9945FF]/20">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        Solana Devnet
                      </span>
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SwapComponent />
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg blur opacity-25 animate-pulse group-hover:opacity-75 transition duration-1000" />
                <div className="relative w-full bg-background border border-[#9945FF]/30 rounded-lg p-8 shadow-xl">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center mb-6">
                    <ArrowRightLeft className="text-white w-8 h-8" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4 text-text bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                    Connect Wallet
                  </h2>

                  <p className="text-text/80 mb-8 max-w-md mx-auto">
                    Connect your Solana wallet to access the swap functionality
                    and trade tokens on the Solana network.
                  </p>

                  <div className="flex justify-center">
                    <StyledWalletButton />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}