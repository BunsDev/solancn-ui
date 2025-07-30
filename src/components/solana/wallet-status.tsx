"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { formatWalletAddress, getSolBalance } from "@/lib/solana/connection";

export default function WalletStatus() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && publicKey) {
        setIsLoading(true);
        try {
          const solBalance = await getSolBalance(publicKey.toString());
          setBalance(solBalance);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBalance();

    // Refresh balance every 30 seconds if connected
    const intervalId = connected ? 
      setInterval(fetchBalance, 30000) : 
      null;

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [connected, publicKey]);

  if (!connected) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-purple-950/30 rounded-lg border border-purple-800/30 text-white">
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="font-medium">
            {formatWalletAddress(publicKey?.toString())}
          </span>
        </div>
        <div className="text-xs text-purple-200/80">
          {isLoading ? (
            <span>Loading balance...</span>
          ) : (
            <span>{balance !== null ? `${balance.toFixed(4)} SOL` : "-- SOL"}</span>
          )}
        </div>
      </div>
    </div>
  );
}
