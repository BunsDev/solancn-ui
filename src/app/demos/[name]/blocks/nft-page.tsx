"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet } from "lucide-react";
import SolanaWalletProvider from "../context/wallet-provider";
import StyledWalletButton from "@/components/wallet/wallet-button";
import { NFTComponent } from "@/components/nft";

// Component content with wallet context
function NFTContent() {
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
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2 w-full">
              <Card className="bg-background border border-[#9945FF]/20">
                <CardHeader>
                  <CardTitle className="text-text">NFTs</CardTitle>
                </CardHeader>
                <CardContent>
                  <NFTComponent />
                </CardContent>
              </Card>
            </div>
        </div>
      </main>
    </div>
  );
}

export default function NFTPage() {
  return (
    <SolanaWalletProvider>
      <NFTContent />
    </SolanaWalletProvider>
  );
}
