"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { wallet } from "@/components/solana/wallet";
import SolanaWalletProvider from "../context/wallet-provider";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { cn } from "@/lib/utils";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Wallet as WalletIcon, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

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

// Enhanced wallet status component
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

function WalletContent() {
  const { connected } = useWallet();

  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <header className="border-b border-[#9945FF]/20 p-4 sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[#9945FF]/20 p-2 rounded-md text-text">
            <div className="w-8 h-8 cursor-pointer rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center">
              <WalletIcon className="text-text w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold">Solana Wallet</h1>
          </div>
          <StyledWalletButton />
        </div>
      </header>

      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto py-8">
          {connected ? (
            <div className="max-w-md mx-auto">
              <WalletStatus />
              <Card className="bg-background border border-[#9945FF]/20">
                <CardHeader>
                  <CardTitle className="text-text">Wallet Details</CardTitle>
                </CardHeader>
                <CardContent>{wallet.components.Default}</CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg blur opacity-25 animate-pulse group-hover:opacity-75 transition duration-1000" />
                <div className="relative w-full bg-background border border-[#9945FF]/30 rounded-lg p-8 shadow-xl">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center mb-6">
                    <WalletIcon className="text-white w-8 h-8" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4 text-text bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                    Connect Wallet
                  </h2>

                  <p className="text-text/80 mb-8 max-w-md mx-auto">
                    Connect your Solana wallet to view your wallet details, balance
                    and transaction history.
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

export default function WalletPage() {
  return (
    <SolanaWalletProvider>
      <WalletContent />
    </SolanaWalletProvider>
  );
}
