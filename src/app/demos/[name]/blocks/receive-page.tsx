"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import SolanaWalletProvider from "../context/wallet-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { ReceiveComponent } from "@/components/solana/receive";

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

function ReceiveContent() {
  const { connected } = useWallet();

  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <header className="border-b border-[#9945FF]/20 p-4 sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[#9945FF]/20 p-2 rounded-md text-text">
            <div className="w-8 h-8 cursor-pointer rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center">
              <Download className="text-text w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold">Solana Receive</h1>
          </div>
          <StyledWalletButton />
        </div>
      </header>

      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto py-8">
          {connected ? (
            <Card className="bg-background border border-[#9945FF]/20 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-text">Receive</CardTitle>
              </CardHeader>
              <CardContent><ReceiveComponent /></CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg blur opacity-25 animate-pulse group-hover:opacity-75 transition duration-1000" />
                <div className="relative w-full bg-background border border-[#9945FF]/30 rounded-lg p-8 shadow-xl">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center mb-6">
                    <Download className="text-white w-8 h-8" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4 text-text bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                    Connect Wallet
                  </h2>

                  <p className="text-text/80 mb-8 max-w-md mx-auto">
                    Connect your Solana wallet to access the receive functionality
                    and get your deposit address for receiving tokens.
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

export default function ReceivePage() {
  return (
    <SolanaWalletProvider>
      <ReceiveContent />
    </SolanaWalletProvider>
  );
}
