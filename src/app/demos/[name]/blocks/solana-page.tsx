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
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { swap } from "@/components/solana/swap";
import { bridge } from "@/components/solana/bridge";
import { borrow } from "@/components/solana/borrow";
import { lend } from "@/components/solana/lend";
import { defi } from "@/components/solana/defi";
import { nft } from "@/components/solana/nft";
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
  Minimize2,
  ChevronUp,
  Maximize2,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SolanaWalletProvider from "../context/wallet-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Custom styled WalletButton component with enhanced styling
const StyledWalletButton = () => {
  return (
    <div
      className={cn(
        "wallet-adapter-button-container",
        "dark:bg-[#9945FF] text-text rounded-md border-none hover:opacity-90 ",
      )}
    >
      <WalletMultiButton
        className={cn(
          "bg-gradient-to-r from-[#9945FF] to-[#14F195] dark:bg-[#9945FF] dark:text-text",
          "hover:opacity-90 transition-all duration-200",
          "shadow-md hover:shadow-lg",
          "border border-[#9945FF]/20 dark:border-[#9945FF]/20",
          "font-medium text-white dark:text-text",
          "flex items-center gap-2",
        )}
      />
    </div>
  );
};

// Section component for responsive sections
interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  priority?: number; // Higher priority sections stay expanded longer on smaller screens
}

const Section = ({
  title,
  icon,
  children,
  defaultExpanded = false,
  className = "",
  priority = 0,
}: SectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle section expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (isFullscreen && !isExpanded) {
      setIsFullscreen(false); // Exit fullscreen when collapsing
    }
  };

  // Toggle fullscreen mode
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
    if (!isExpanded && !isFullscreen) {
      setIsExpanded(true); // Ensure expanded when going fullscreen
    }
  };

  // Determine responsive classes based on priority and fullscreen state
  const getSectionClasses = () => {
    if (isFullscreen) {
      return "col-span-12 order-first h-auto max-h-none z-10";
    }

    // Base priority classes - higher priority sections take more space on medium screens
    const priorityClasses =
      {
        0: "md:col-span-6 lg:col-span-4",
        1: "md:col-span-6 lg:col-span-4",
        2: "md:col-span-6 lg:col-span-6",
        3: "md:col-span-12 lg:col-span-8",
      }[priority] || "md:col-span-6 lg:col-span-4";

    return `${priorityClasses}`;
  };

  return (
    <Card
      className={cn(
        "bg-background border border-[#9945FF]/20 shadow-sm transition-all duration-300",
        getSectionClasses(),
        isExpanded ? "" : "h-[65px] overflow-hidden",
        className,
        isFullscreen ? "fixed inset-4 overflow-auto" : "",
      )}
    >
      <CardHeader
        className={cn(
          "flex flex-row items-center justify-between p-3 cursor-pointer",
          isExpanded ? "border-b border-[#9945FF]/10" : "",
        )}
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#9945FF]/10">{icon}</div>
          <CardTitle className="text-text text-lg">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          {isExpanded && (
            <Button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-md hover:bg-[#9945FF]/20 text-text/70 hover:text-text transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </Button>
          )}
          <Button className="p-1.5 rounded-md hover:bg-[#9945FF]/20 text-text/70 hover:text-text transition-colors">
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent
          className={cn(
            "p-3",
            isFullscreen ? "h-[calc(100%-60px)] overflow-auto" : "",
          )}
        >
          {children}
        </CardContent>
      )}
    </Card>
  );
};

// Enhanced wallet status component that shows address, balance, and refresh option
const WalletStatus = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBalance = async () => {
    if (!publicKey) return;
    try {
      setIsRefreshing(true);
      const bal = await connection.getBalance(publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
    } catch (e) {
      console.error("Failed to fetch balance:", e);
      setBalance(0);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
      // Set up a refresh interval
      const intervalId = setInterval(fetchBalance, 30000); // Refresh every 30 seconds
      return () => clearInterval(intervalId);
    }
  }, [connection, publicKey]);

  if (!connected || !publicKey) return null;

  return (
    <Card className="bg-background border border-[#9945FF]/20 shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-text text-lg">Wallet Connected</CardTitle>
        <CardDescription className="text-text/70">
          Your Solana wallet is ready to use
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center bg-[#9945FF]/10 p-3 rounded-md">
            <span className="text-text font-medium">Address</span>
            <span className="font-mono text-text bg-background/30 p-1 px-2 rounded-md">
              {publicKey.toString().slice(0, 6)}...
              {publicKey.toString().slice(-4)}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#14F195]/10 p-3 rounded-md">
            <span className="text-text font-medium">Balance</span>
            <div className="flex items-center gap-2">
              <span className="text-text">{balance.toFixed(4)} SOL</span>
              <button
                type="button"
                onClick={fetchBalance}
                className="text-[#9945FF] hover:text-[#14F195] transition-colors p-1 rounded-full"
                disabled={isRefreshing}
                aria-label="Refresh balance"
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component content with wallet context
function SolanaContent() {
  const { publicKey, connected } = useWallet();

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
          <StyledWalletButton />
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
                    Connect your Solana wallet to access the full functionality
                    of the dashboard including swapping, staking, and managing
                    your portfolio.
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
