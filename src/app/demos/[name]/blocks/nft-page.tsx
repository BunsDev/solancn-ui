"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SolanaWalletProvider from "../context/wallet-provider";
import { NFTComponent } from "@/components/nft";

// Component content with wallet context
function NFTContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
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
  return <NFTContent />;
}
