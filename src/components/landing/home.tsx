"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  ArrowRight,
  Wallet,
  Coins,
  Activity,
  TrendingUp,
  Shield,
  Zap,
  Copy,
} from "lucide-react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { SiteHeader } from "./site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeSelect } from "@/components/theme-select";
import Image from "next/image";

export default function SolancnHome() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <SiteHeader page="Home" /> */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">
                  <Image
                    src="/logo-round.png"
                    alt="Solancn"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
              <span className="hidden font-bold sm:inline-block text-base">
                Solancn
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/docs"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Docs
              </Link>
              <Link
                href="/components"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Components
              </Link>
              <Link
                href="/blocks"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Blocks
              </Link>
              <Link
                href="/examples"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Examples
              </Link>
              <Link
                href="/themes"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Themes
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="pl-8 md:w-[300px] lg:w-[400px]"
                />
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
            <nav className="flex items-center">
              <ThemeSelect />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  window.open(
                    "https://github.com/BunsDev/solancn-ui",
                    "_blank",
                    "noopener noreferrer",
                  );
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0 border border-border bg-muted/40 mx-1"
              >
                <Icon icon="line-md:github-loop" className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="flex max-w-dvw flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
          <Link
            href="#"
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
          >
            🎉 <div className="h-4 w-px bg-border mx-2" /> New Wallet Adapter
            Component <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Build your Solana dApp Library
          </h1>
          <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            A set of beautifully-designed, accessible Solana components and a
            code distribution platform. Works with your favorite frameworks.
            Open Source. Open Code.
          </span>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <Button size="default" asChild>
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button variant="outline" size="default">
              Browse Blocks
            </Button>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="relative">
        <Tabs defaultValue="wallet" className="relative mt-6 w-full">
          <div className="flex items-center justify-between pb-3">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="wallet"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Wallet
              </TabsTrigger>
              <TabsTrigger
                value="defi"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                DeFi
              </TabsTrigger>
              <TabsTrigger
                value="nft"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                NFT
              </TabsTrigger>
              <TabsTrigger
                value="trading"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Trading
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline">Theme: Default</Badge>
            </div>
          </div>

          <TabsContent value="wallet" className="relative rounded-md border">
            <div className="flex items-center justify-between p-4">
              <div className="grid gap-1">
                <h1 className="text-2xl font-semibold">Wallet Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your Solana assets and transactions
                </p>
              </div>
              <Button size="sm">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
            <div className="grid gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Balance
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45.23 SOL</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Token Holdings
                  </CardTitle>
                  <Coins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 new tokens</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Transactions
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Staking Rewards
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.34 SOL</div>
                  <p className="text-xs text-muted-foreground">+12% APY</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Sent SOL
                        </p>
                        <p className="text-sm text-muted-foreground">
                          To: 7xKX...9mN2
                        </p>
                      </div>
                      <div className="ml-auto font-medium">-5.00 SOL</div>
                    </div>
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Received USDC
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: 3kL9...8xR4
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+100.00 USDC</div>
                    </div>
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Staking Reward
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Validator: Solana Labs
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+0.25 SOL</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your Solana assets</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Button className="w-full">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Send SOL
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Coins className="mr-2 h-4 w-4" />
                    Swap Tokens
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Shield className="mr-2 h-4 w-4" />
                    Stake SOL
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="defi" className="relative rounded-md border">
            <div className="flex items-center justify-between p-4">
              <div className="grid gap-1">
                <h1 className="text-2xl font-semibold">DeFi Portfolio</h1>
                <p className="text-sm text-muted-foreground">
                  Track your decentralized finance positions
                </p>
              </div>
            </div>
            <div className="grid gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Liquidity Pools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,450</div>
                  <p className="text-xs text-muted-foreground">
                    +5.2% this week
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>SOL/USDC</span>
                      <span>$8,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>RAY/SOL</span>
                      <span>$4,250</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Lending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,750</div>
                  <p className="text-xs text-muted-foreground">8.5% APY</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Supplied USDC</span>
                      <span>$5,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Supplied SOL</span>
                      <span>$3,750</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Yield Farming</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,200</div>
                  <p className="text-xs text-muted-foreground">+12.3% APR</p>
                  <div className="mt-4">
                    <Button size="sm" className="w-full">
                      Claim Rewards
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nft" className="relative rounded-md border">
            <div className="flex items-center justify-between p-4">
              <div className="grid gap-1">
                <h1 className="text-2xl font-semibold">NFT Collection</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your digital collectibles
                </p>
              </div>
            </div>
            <div className="grid gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-muted-foreground">NFT #{i}</span>
                    </div>
                    <h3 className="font-semibold">Solana Monkey #{i}23</h3>
                    <p className="text-sm text-muted-foreground">
                      Floor: 2.5 SOL
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trading" className="relative rounded-md border">
            <div className="flex items-center justify-between p-4">
              <div className="grid gap-1">
                <h1 className="text-2xl font-semibold">Trading Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Execute trades and monitor positions
                </p>
              </div>
            </div>
            <div className="grid gap-4 p-4 pt-0 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Place Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="from">From</Label>
                      <Input id="from" placeholder="SOL" />
                    </div>
                    <div>
                      <Label htmlFor="to">To</Label>
                      <Input id="to" placeholder="USDC" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="0.00" />
                  </div>
                  <Button className="w-full">
                    <Zap className="mr-2 h-4 w-4" />
                    Execute Trade
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    +$2,450
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +15.2% this month
                  </p>
                  <div className="mt-4 h-[200px] bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">
                      Chart Placeholder
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Installation Section */}
      <section className="relative py-8">
        <div className="mx-auto flex max-w-dvw flex-col items-center gap-2 py-8 md:py-12">
          <h2 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Get started in seconds
          </h2>
          <span className="max-w-dvw text-center text-lg text-muted-foreground sm:text-xl">
            Install Solana UI components and start building your dApp today
          </span>
          <div className="w-full max-w-dvw mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Install the package
                    </Label>
                    <div className="mt-2 flex items-center space-x-2 rounded-md bg-muted p-3 font-mono text-sm">
                      <span className="flex-1">
                        npm install @solana-ui/react
                      </span>
                      <Button size="sm" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Add to your app
                    </Label>
                    <div className="mt-2 rounded-md bg-muted p-3 font-mono text-sm">
                      <div>
                        {"import { WalletProvider } from '@solana-ui/react'"}
                      </div>
                      <div className="mt-1">{"<WalletProvider>"}</div>
                      <div className="ml-4">{"<YourApp />"}</div>
                      <div>{"</WalletProvider>"}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24  md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by the Solana community. The source code is available on{" "}
              <Link
                href="https://github.com/BunsDev/solancn-ui"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </Link>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
