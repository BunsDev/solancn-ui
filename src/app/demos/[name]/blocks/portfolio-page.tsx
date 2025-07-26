"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { BarChart, LineChart } from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

// Mock token data
const tokens = [
  {
    symbol: "SOL",
    name: "Solana",
    logo: "/images/tokens/sol.png",
    balance: 8.75,
    price: 245.18,
    value: 2145.33,
    change24h: 2.5,
    color: "#9945FF",
    allocation: 42.1
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    logo: "/images/tokens/usdc.png",
    balance: 1250.45,
    price: 1.00,
    value: 1250.45,
    change24h: 0.1,
    color: "#2775CA",
    allocation: 24.5
  },
  {
    symbol: "BONK",
    name: "Bonk",
    logo: "/images/tokens/bonk.png",
    balance: 15000000,
    price: 0.000015,
    value: 225.00,
    change24h: 5.2,
    color: "#F9A900",
    allocation: 4.4
  },
  {
    symbol: "JTO",
    name: "Jito",
    logo: "/images/tokens/jito.png",
    balance: 125.5,
    price: 3.75,
    value: 470.63,
    change24h: -1.2,
    color: "#7A73FF",
    allocation: 9.2
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    logo: "/images/tokens/jup.png",
    balance: 350,
    price: 1.25,
    value: 437.50,
    change24h: 3.7,
    color: "#FF455C",
    allocation: 8.6
  },
  {
    symbol: "PYTH",
    name: "Pyth Network",
    logo: "/images/tokens/pyth.png",
    balance: 500,
    price: 0.85,
    value: 425.00,
    change24h: -0.8,
    color: "#7C76DA",
    allocation: 8.3
  },
  {
    symbol: "RNDR",
    name: "Render Token",
    logo: "/images/tokens/rndr.png",
    balance: 45,
    price: 7.32,
    value: 329.40,
    change24h: 1.5,
    color: "#0B101E",
    allocation: 6.5
  }
];

// Mock NFT data
const nfts = [
  { name: "Solana Monkey #4325", collection: "SMB", floor: 18.5, img: "/images/nfts/smb.png", lastPrice: 24.5 },
  { name: "DeGods #2021", collection: "DeGods", floor: 35.2, img: "/images/nfts/degods.png", lastPrice: 42.0 },
  { name: "Okay Bears #749", collection: "Okay Bears", floor: 25.7, img: "/images/nfts/okay.png", lastPrice: 28.5 },
];

// Mock transaction data
const transactions = [
  { type: "swap", from: "SOL", to: "USDC", amount: "2.5", value: "$612.95", time: "2025-07-26T12:30:00", status: "completed" },
  { type: "receive", from: "External", to: "Wallet", amount: "250 USDC", value: "$250.00", time: "2025-07-25T18:42:00", status: "completed" },
  { type: "stake", from: "SOL", to: "Staked SOL", amount: "5.0", value: "$1,225.90", time: "2025-07-24T09:15:00", status: "completed" },
  { type: "send", from: "Wallet", to: "External", amount: "0.25 SOL", value: "$61.30", time: "2025-07-23T22:10:00", status: "completed" },
  { type: "nft_buy", from: "SOL", to: "NFT", amount: "Okay Bears #749", value: "$7,000.15", time: "2025-07-20T14:35:00", status: "completed" },
];

// Mock staking data
const stakingPositions = [
  { validator: "Solana Foundation", amount: 3.25, apy: 7.2, rewards: 0.012, since: "2025-06-15T10:00:00" },
  { validator: "Marinade Finance", amount: 1.75, apy: 7.8, rewards: 0.008, since: "2025-07-01T16:30:00" },
];

// Mock DeFi positions data
const defiPositions = [
  { platform: "Solend", type: "Lending", asset: "USDC", amount: 750, apy: 5.6, value: 750 },
  { platform: "Raydium", type: "Liquidity", asset: "SOL-USDC", amount: "1.2 SOL + 300 USDC", apy: 12.4, value: 594.22 },
  { platform: "Marinade", type: "Staking", asset: "mSOL", amount: "5 SOL", apy: 7.8, value: 1225.9 },
];

// Helper components
const TokenIcon = ({ symbol, size = "md" }: { symbol: string; size?: "sm" | "md" | "lg" }) => {
  const token = tokens.find(t => t.symbol === symbol);
  const sizeClass = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-10 h-10"
  };

  if (!token) {
    return <div className={`rounded-full bg-gray-200 ${sizeClass[size]}`} />;
  }

  return (
    <div className={`rounded-full bg-white flex items-center justify-center ${sizeClass[size]}`}>
      <span className="font-bold text-xs">{token.symbol.substring(0, 2)}</span>
    </div>
  );
};

const PortfolioSummary = ({ totalValue, totalChange24h }: { totalValue: number; totalChange24h: number }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium text-muted-foreground">Portfolio Value</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">${totalValue.toLocaleString()}</span>
        <span className={`ml-2 text-sm font-medium ${totalChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {totalChange24h >= 0 ? '+' : ''}{totalChange24h.toFixed(2)}%
        </span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-muted/40">
        <CardContent className="p-4">
          <div className="text-sm font-medium text-muted-foreground">Token Value</div>
          <div className="text-xl font-bold mt-1">${(totalValue * 0.85).toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card className="bg-muted/40">
        <CardContent className="p-4">
          <div className="text-sm font-medium text-muted-foreground">NFT Value</div>
          <div className="text-xl font-bold mt-1">${(totalValue * 0.15).toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const TokensTable = ({ tokens }: { tokens: any[] }) => (
  <div className="space-y-4">
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">24h</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TableRow key={token.symbol} className="cursor-pointer hover:bg-muted/50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <TokenIcon symbol={token.symbol} />
                  <div>
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {token.balance < 0.01 ? token.balance.toExponential(2) : token.balance.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ${token.price < 0.01 ? token.price.toFixed(6) : token.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right font-medium">
                ${token.value.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <span className={token.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const NFTGallery = ({ nfts }: { nfts: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {nfts.map((nft) => (
      <Card key={nft.name} className="overflow-hidden">
        <div className="aspect-square bg-muted/50">
          {/* This would be the NFT image in a real implementation */}
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#9945FF]/10 to-[#14F195]/10">
            <span className="text-lg font-medium text-muted-foreground">{nft.collection}</span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium truncate">{nft.name}</h3>
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="text-muted-foreground">Floor</span>
            <span className="font-medium">{nft.floor} SOL</span>
          </div>
          <div className="flex justify-between items-center mt-1 text-sm">
            <span className="text-muted-foreground">Last</span>
            <span className="font-medium">{nft.lastPrice} SOL</span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const TransactionsTable = ({ transactions }: { transactions: any[] }) => (
  <div className="space-y-4">
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index}>
              <TableCell>
                <Badge variant="outline" className={tx.type === 'receive' ? 'bg-green-100' : tx.type === 'send' ? 'bg-orange-100' : 'bg-blue-100'}>
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1).replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{tx.from} → {tx.to}</div>
                <div className="text-xs text-muted-foreground">{tx.value}</div>
              </TableCell>
              <TableCell className="text-right">{tx.amount}</TableCell>
              <TableCell className="text-right">{format(new Date(tx.time), 'MMM dd, yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const StakingTable = ({ positions }: { positions: any[] }) => (
  <div className="space-y-4">
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Validator</TableHead>
            <TableHead className="text-right">Staked</TableHead>
            <TableHead className="text-right">APY</TableHead>
            <TableHead className="text-right">Rewards</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((pos, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{pos.validator}</div>
                <div className="text-xs text-muted-foreground">
                  Since {format(new Date(pos.since), 'MMM dd, yyyy')}
                </div>
              </TableCell>
              <TableCell className="text-right">{pos.amount} SOL</TableCell>
              <TableCell className="text-right text-green-500">{pos.apy.toFixed(1)}%</TableCell>
              <TableCell className="text-right">{pos.rewards} SOL</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const DeFiTable = ({ positions }: { positions: any[] }) => (
  <div className="space-y-4">
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead>Position</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">APY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((pos, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{pos.platform}</div>
                <div className="text-xs text-muted-foreground">{pos.type}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{pos.asset}</div>
                <div className="text-xs text-muted-foreground">{pos.amount}</div>
              </TableCell>
              <TableCell className="text-right">${pos.value.toLocaleString()}</TableCell>
              <TableCell className="text-right text-green-500">{pos.apy.toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const AllocationChart = ({ tokens }: { tokens: any[] }) => (
  <div className="space-y-4">
    {tokens.map(token => (
      <div key={token.symbol} className="space-y-1">
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2">
            <TokenIcon symbol={token.symbol} size="sm" />
            <span>{token.symbol}</span>
          </div>
          <div className="text-muted-foreground">{token.allocation.toFixed(1)}%</div>
        </div>
        <Progress value={token.allocation} className="h-2" style={{ backgroundColor: `${token.color}20` }}>
          <div className="h-full" style={{ width: `${token.allocation}%`, backgroundColor: token.color }} />
        </Progress>
      </div>
    ))}
  </div>
);

const PortfolioContent = () => {

  // Calculate portfolio totals
  const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);
  const totalChange24h = tokens.reduce((sum, token) => sum + (token.change24h * token.value), 0) / totalValue;

  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <header className="border-b border-[#9945FF]/20 p-4 sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[#9945FF]/20 p-2 rounded-md text-text">
            <div className="w-8 h-8 cursor-pointer rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center">
              <BarChart className="text-text w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold">Portfolio</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 container mx-auto">
        <div className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Summary */}
            <Card className="border border-[#9945FF]/20 lg:col-span-1">
              <CardHeader>
                <CardTitle>Portfolio Summary</CardTitle>
                <CardDescription>Your assets at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <PortfolioSummary totalValue={totalValue} totalChange24h={totalChange24h} />
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button
                  variant="outline"
                  className="w-full text-xs gap-1"
                  onClick={() => toast.info("Portfolio report", { description: "This would generate a detailed portfolio report" })}
                >
                  <LineChart className="h-3.5 w-3.5" />
                  Generate Report
                </Button>
              </CardFooter>
            </Card>

            {/* Right column - Asset allocation */}
            <Card className="border border-[#9945FF]/20 lg:col-span-2">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution of your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <AllocationChart tokens={tokens} />
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <div className="mt-6">
            <Tabs defaultValue="tokens" className="w-full">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="nfts">NFTs</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="staking">Staking</TabsTrigger>
                <TabsTrigger value="defi">DeFi</TabsTrigger>
              </TabsList>

              <TabsContent value="tokens" className="mt-4">
                <TokensTable tokens={tokens} />
              </TabsContent>

              <TabsContent value="nfts" className="mt-4">
                <NFTGallery nfts={nfts} />
              </TabsContent>

              <TabsContent value="activity" className="mt-4">
                <TransactionsTable transactions={transactions} />
              </TabsContent>

              <TabsContent value="staking" className="mt-4">
                <StakingTable positions={stakingPositions} />
              </TabsContent>

              <TabsContent value="defi" className="mt-4">
                <DeFiTable positions={defiPositions} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}