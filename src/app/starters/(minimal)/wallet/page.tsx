"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SolanaWalletProvider from "@/lib/context/wallet-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet as WalletIcon } from "lucide-react";
import StyledWalletButton from "@/components/wallet/wallet-button";
import WalletStatus from "@/components/wallet/wallet-status";
import { WalletComponentDemo } from "@/components/solana/wallet";

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
                <CardContent><WalletComponentDemo /></CardContent>
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


// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { WalletComponent } from "@/components/wallet/wallet-component";

// function WalletContent() {
//   return (
//     <div className="flex min-h-screen flex-col bg-background text-text w-full">
//       <main className="flex-1 p-2 flex flex-col w-full">
//         <Card className="bg-background border border-[#9945FF]/20 max-w-screen">
//           <CardHeader>
//             <CardTitle className="text-text">Wallet</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <WalletComponent />
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }

// export default function WalletDemo() {
//   return <WalletContent />;
// }
