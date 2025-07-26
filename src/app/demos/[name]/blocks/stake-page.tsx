"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SolanaWalletProvider from "../context/wallet-provider";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { CoinsIcon } from "lucide-react";
import StyledWalletButton from "@/components/wallet/wallet-button";
import WalletStatus from "@/components/wallet/wallet-status";
import { StakeComponent } from "@/components/solana/stake";

export function StakeContent() {
  return (
    <SolanaWalletProvider>
      <div className="flex min-h-screen flex-col bg-background text-text w-full">
        <header className="border-b border-[#9945FF]/20 p-4 sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
          <div className="container mx-auto flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[#9945FF]/20 p-2 rounded-md text-text">
              <CoinsIcon size={20} className="text-[#9945FF]" />
              <h1 className="text-2xl font-bold">Solana Staking</h1>
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
                    <CardTitle className="text-text">Staking</CardTitle>
                    <CardDescription className="text-text/70">
                      Stake SOL to earn rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StakeComponent />
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
                        Connect wallet to start staking
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-6">
                      <p className="text-text/70 text-center max-w-xs">
                        You need to connect a wallet to use the staking features
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

export default function StakePage() {
  return (
    <SolanaWalletProvider>
      <StakeContent />
    </SolanaWalletProvider>
  );
}
