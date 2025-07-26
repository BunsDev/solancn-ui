"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  RefreshCw,
} from "lucide-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import WalletStatus from "@/components/wallet/wallet-status";
import SolanaWalletProvider from "../context/wallet-provider";

function BridgeContent() {
    const { connected , publicKey } = useWallet();
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
        <WalletStatus />
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
}
// Export a wrapper component that provides the wallet context
export default function BridgePage() {
  return (
    <SolanaWalletProvider>
      <BridgeContent />
    </SolanaWalletProvider>
  );
}