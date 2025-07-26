"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import SolanaWalletProvider from '../context/wallet-provider';

// Import styles for the wallet adapter
import '@solana/wallet-adapter-react-ui/styles.css';

// Custom styled WalletButton component
const StyledWalletButton = () => {
  return (
    <div className="wallet-adapter-button-container">
      <WalletMultiButton 
        className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 border-none rounded-md px-4 py-2"
      />
    </div>
  );
};

// Custom wallet status component that shows address and balance
const WalletStatus = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  
  useEffect(() => {
    // Get account balance
    if (publicKey) {
      (async () => {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);
        } catch (e) {
          console.error('Failed to fetch balance:', e);
          setBalance(0);
        }
      })();
    }
  }, [connection, publicKey]);

  if (!connected || !publicKey) return null;
  
  return (
    <div className="bg-[#9945FF]/10 p-4 rounded-lg border border-[#9945FF]/20 text-white">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Address:</span>
          <span className="font-mono">
            {publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Balance:</span>
          <span>{balance.toFixed(4)} SOL</span>
        </div>
      </div>
    </div>
  );
};

// Component content with wallet context
function SolanaContent() {
  const { publicKey, connected } = useWallet();

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="border-b border-[#9945FF]/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#14F195]">Solana Dashboard</h1>
          <StyledWalletButton />
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <WalletStatus />
          </div>
          
          {connected ? (
            <Tabs defaultValue="swap" className="w-full">
              <TabsList className="grid grid-cols-5 mb-8 bg-black border border-[#9945FF]/30">
                <TabsTrigger value="swap" className="data-[state=active]:bg-[#9945FF]/20">Swap</TabsTrigger>
                <TabsTrigger value="stake" className="data-[state=active]:bg-[#9945FF]/20">Stake</TabsTrigger>
                <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#9945FF]/20">Portfolio</TabsTrigger>
                <TabsTrigger value="transfer" className="data-[state=active]:bg-[#9945FF]/20">Transfer</TabsTrigger>
                <TabsTrigger value="receive" className="data-[state=active]:bg-[#9945FF]/20">Receive</TabsTrigger>
              </TabsList>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TabsContent value="swap" className="mt-0">
                  <Card className="bg-black border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-[#14F195]">Swap Tokens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">Swap functionality will be implemented here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="stake" className="mt-0">
                  <Card className="bg-black border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-[#14F195]">Stake SOL</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">Staking functionality will be implemented here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="portfolio" className="mt-0">
                  <Card className="bg-black border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-[#14F195]">Portfolio Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">Portfolio details will be displayed here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="transfer" className="mt-0">
                  <Card className="bg-black border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-[#14F195]">Transfer Tokens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">Transfer functionality will be implemented here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="receive" className="mt-0">
                  <Card className="bg-black border border-[#9945FF]/20">
                    <CardHeader>
                      <CardTitle className="text-[#14F195]">Receive Tokens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">Receive functionality will be implemented here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-3xl font-bold mb-4 text-[#14F195]">Connect Your Wallet</h2>
              <p className="text-gray-400 mb-8 max-w-md">
                Connect your Solana wallet to access the full functionality of the dashboard including swapping, staking, and managing your portfolio.
              </p>
              <div className="flex justify-center">
                <StyledWalletButton />
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
