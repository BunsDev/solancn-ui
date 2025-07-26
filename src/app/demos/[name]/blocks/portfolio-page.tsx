"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SolanaWalletProvider from "../context/wallet-provider";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, RefreshCw } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the portfolio component to prevent SSR issues
const PortfolioComponent = dynamic(
  () => import("@/components/solana/portfolio").then((mod) => {
    const PortfolioComp = () => mod.portfolio?.components.Default;
    return PortfolioComp;
  }),
  { ssr: false }
);

// Custom styled WalletButton component with enhanced styling
const StyledWalletButton = () => {
  return (
    <div
      className={cn(
        "wallet-adapter-button-container",
        "dark:bg-[#9945FF] text-text rounded-md border-none hover:opacity-90",
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

// Wallet status component to display connection state and balance
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
    <Card className="bg-background border border-[#9945FF]/20 shadow-md overflow-hidden mb-6">
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
                className={cn(
                  "p-1.5 rounded-md bg-background/30 text-text hover:bg-background/50 transition-colors",
                  isRefreshing && "animate-spin",
                )}
                disabled={isRefreshing}
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function PortfolioPage() {
  return (
    <SolanaWalletProvider>
      <div className="flex min-h-screen flex-col bg-background text-text w-full">
        <header className="border-b border-[#9945FF]/20 p-4 sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
          <div className="container mx-auto flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[#9945FF]/20 p-2 rounded-md text-text">
              <LayoutDashboard size={20} className="text-[#9945FF]" />
              <h1 className="text-2xl font-bold">Solana Portfolio</h1>
            </div>
            <StyledWalletButton />
          </div>
        </header>

        <main className="flex-1 p-2 flex flex-col w-full">
          <div className="container mx-auto py-8">
            {useWallet().connected ? (
              <div className="max-w-md mx-auto">
                <WalletStatus />
                <Card className="bg-background border border-[#9945FF]/20">
                  <CardHeader>
                    <CardTitle className="text-text">Portfolio Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PortfolioComponent />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#14F195] blur-xl opacity-20 rounded-full" />
                  <Card className="relative bg-background/80 backdrop-blur-sm border border-[#9945FF]/20 shadow-xl w-full max-w-md mx-auto">
                    <CardHeader>
                      <CardTitle className="text-text text-2xl">Connect Your Wallet</CardTitle>
                      <CardDescription className="text-text/70">
                        Connect your Solana wallet to view your portfolio
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-6">
                      <p className="text-text/70 text-center max-w-xs">
                        You need to connect a wallet to use the Solana Portfolio viewer
                      </p>
                      <StyledWalletButton />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SolanaWalletProvider>
  );
}
