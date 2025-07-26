"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { swap } from "@/components/solana/swap";
import { bridge } from "@/components/solana/bridge";
import { borrow } from "@/components/solana/borrow";
import { lend } from "@/components/solana/lend";
import { defi } from "@/components/solana/defi";
import { nft } from "@/components/nft";
import { frame } from "@/components/solana/frame";
import { transfer } from "@/components/solana/transfer";
import { portfolio } from "@/components/solana/portfolio";
import { staking } from "@/components/solana/staking";
import { receive } from "@/components/solana/receive";
import {
  Wallet,
  Layers,
  BarChart3,
  Award,
  Coins,
  ArrowRightLeft,
  Banknote,
  RefreshCw,
  Download,
} from "lucide-react";
import SolanaWalletProvider from "../context/wallet-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletStatus from "@/components/wallet/wallet-status";
import StyledWalletButton from "@/components/wallet/wallet-button";

interface SolanaContentProps {
  demoMode?: boolean;
}

function SolanaContent({ demoMode = true }: SolanaContentProps) {
  let { publicKey, connected } = useWallet();
  if (demoMode) {
    publicKey = new PublicKey("DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ");
    connected = true;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <header className="border-b border-[#9945FF]/20 p-4 sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[#9945FF]/20 p-2 rounded-md text-text">
            <div className="w-8 h-8 cursor-pointer rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center">
              <Wallet className="text-text w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold">Solana Dashboard</h1>
          </div>
          {demoMode ? (
            <StyledWalletButton />
          ) : (
            <WalletStatus />
          )}
        </div>
      </header>

      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto">
          {connected && (
            <div className="mb-4 w-full max-w-7xl mx-auto transition-all duration-500 ease-in-out">
              <WalletStatus />
            </div>
          )}

          {connected ? (
            <Tabs
              defaultValue="defi"
              className="w-full flex flex-col justify-center items-center"
            >
              <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-2 bg-background border border-[#9945FF]/30 w-full overflow-hidden gap-1 mt-1 p-1 justify-center items-center">
                <TabsTrigger
                  value="defi"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <Coins className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">DeFi</span>
                </TabsTrigger>
                <TabsTrigger
                  value="trade"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <ArrowRightLeft className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">Trade</span>
                </TabsTrigger>
                <TabsTrigger
                  value="stake"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <Award className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">Stake</span>
                </TabsTrigger>
                <TabsTrigger
                  value="frame"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <Layers className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">Frame</span>
                </TabsTrigger>
                <TabsTrigger
                  value="portfolio"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <BarChart3 className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">Portfolio</span>
                </TabsTrigger>
                <TabsTrigger
                  value="bridge"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <Layers className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">Bridge</span>
                </TabsTrigger>
                <TabsTrigger
                  value="nfts"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <Layers className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">NFTs</span>
                </TabsTrigger>
                <TabsContent value="portfolio" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">
                        Portfolio Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>{portfolio.components.Default}</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="frame" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">
                        Frame Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>{frame.components.Default}</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="bridge" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">
                        Bridge Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>{bridge.components.Default}</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="transfer" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">
                        Transfer Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>{transfer.components.Default}</CardContent>
                  </Card>
                </TabsContent>
                <TabsTrigger
                  value="receive"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <Download className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">Receive</span>
                </TabsTrigger>
                <TabsTrigger
                  value="borrow"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <Coins className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">Borrow</span>
                </TabsTrigger>
                <TabsTrigger
                  value="lend"
                  className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-text flex items-center gap-2 justify-center transition-all"
                >
                  <Banknote className="w-4 h-4 md:mr-1" />
                  <span className="hidden md:inline">Lend</span>
                </TabsTrigger>
              </TabsList>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-2 w-full">
                <TabsContent value="trade" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">Trade</CardTitle>
                    </CardHeader>
                    <CardContent>{swap.components.Default}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="stake" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">Stake</CardTitle>
                    </CardHeader>
                    <CardContent>{staking.components.Default}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bridge" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">Bridge</CardTitle>
                    </CardHeader>
                    <CardContent>{bridge.components.Default}</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="portfolio" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">Portfolio</CardTitle>
                    </CardHeader>
                    <CardContent>{portfolio.components.Default}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="defi" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">DeFi</CardTitle>
                    </CardHeader>
                    <CardContent>{defi.components.Default}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="nfts" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">NFTs</CardTitle>
                    </CardHeader>
                    <CardContent>{nft.components.Default}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transfer" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">Transfer</CardTitle>
                    </CardHeader>
                    <CardContent>{transfer.components.Default}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="receive" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">Receive</CardTitle>
                    </CardHeader>
                    <CardContent>{receive.components.Default}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="borrow" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">Borrow Assets</CardTitle>
                    </CardHeader>
                    <CardContent>{borrow.components.Default}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="lend" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">Lend Assets</CardTitle>
                    </CardHeader>
                    <CardContent>{lend.components.Default}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="frame" className="mt-0 col-span-6">
                  <Card className="bg-background border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-text">Frame</CardTitle>
                    </CardHeader>
                    <CardContent>{frame.components.Default}</CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg blur opacity-25 animate-pulse group-hover:opacity-75 transition duration-1000" />
                <div className="relative w-full bg-background border border-[#9945FF]/30 rounded-lg p-8 shadow-xl">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center mb-6">
                    <Wallet className="text-white w-8 h-8" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4 text-text bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                    Connect Wallet
                  </h2>

                  <p className="text-text/80 mb-8 max-w-md mx-auto">
                    Connect wallet to access the full functionality of the
                    dashboard including swapping, staking, and managing your
                    portfolio.
                  </p>

                  <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-[#9945FF]/10 p-4 rounded-lg border border-[#9945FF]/20 text-center">
                      <ArrowRightLeft className="mx-auto h-6 w-6 text-[#9945FF] mb-2" />
                      <p className="text-text font-medium">Swap Tokens</p>
                    </div>
                    <div className="bg-[#9945FF]/10 p-4 rounded-lg border border-[#9945FF]/20 text-center">
                      <Award className="mx-auto h-6 w-6 text-[#14F195] mb-2" />
                      <p className="text-text font-medium">Stake Assets</p>
                    </div>
                    <div className="bg-[#9945FF]/10 p-4 rounded-lg border border-[#9945FF]/20 text-center">
                      <BarChart3 className="mx-auto h-6 w-6 text-[#9945FF] mb-2" />
                      <p className="text-text font-medium">Track Portfolio</p>
                    </div>
                  </div>

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

// Export a wrapper component that provides the wallet context
export default function SolanaPage() {
  return (
    <SolanaWalletProvider>
      <SolanaContent />
    </SolanaWalletProvider>
  );
}
