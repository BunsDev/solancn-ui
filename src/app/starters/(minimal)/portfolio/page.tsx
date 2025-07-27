"use client";

import { ArrowDown, ArrowUp, Info } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Mock portfolio data
const PORTFOLIO_DATA = {
  totalValue: 2347.89,
  percentChange: 5.67,
  isPositiveChange: true,
  assets: [
    {
      name: "SOL",
      fullName: "Solana",
      amount: 12.5,
      value: 1250.0,
      percentOfPortfolio: 53.24,
      percentChange24h: 8.32,
      isPositive: true,
    },
    {
      name: "USDC",
      fullName: "USD Coin",
      amount: 750.35,
      value: 750.35,
      percentOfPortfolio: 31.96,
      percentChange24h: 0.01,
      isPositive: true,
    },
    {
      name: "BONK",
      fullName: "Bonk",
      amount: 2500000,
      value: 225.0,
      percentOfPortfolio: 9.58,
      percentChange24h: 12.75,
      isPositive: true,
    },
    {
      name: "JTO",
      fullName: "Jito",
      amount: 8.14,
      value: 122.54,
      percentOfPortfolio: 5.22,
      percentChange24h: -2.45,
      isPositive: false,
    },
  ],
  transactions: [
    {
      id: "tx1",
      type: "buy",
      asset: "SOL",
      amount: 2.5,
      value: 250.0,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "completed",
    },
    {
      id: "tx2",
      type: "sell",
      asset: "BONK",
      amount: 500000,
      value: 45.0,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "completed",
    },
    {
      id: "tx3",
      type: "buy",
      asset: "JTO",
      amount: 3.2,
      value: 48.0,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "completed",
    },
  ],
};

function PortfolioContent() {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <Card className="bg-background/80 backdrop-blur-sm border border-[#9945FF]/20 shadow-xl w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-text">
              Solana Portfolio
            </CardTitle>
            <CardDescription className="text-text/70">
              Track and manage your assets
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-text/70">Total Value</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-text">
                  ${PORTFOLIO_DATA.totalValue.toFixed(2)}
                </p>
                <Badge
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1",
                    PORTFOLIO_DATA.isPositiveChange
                      ? "text-[#14F195] border-[#14F195]/30"
                      : "text-red-500 border-red-500/30",
                  )}
                >
                  {PORTFOLIO_DATA.isPositiveChange ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {PORTFOLIO_DATA.percentChange}%
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-background/50 border border-[#9945FF]/20 p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#9945FF] data-[state=active]:text-text"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="assets"
              className="data-[state=active]:bg-[#9945FF] data-[state=active]:text-text"
            >
              Assets
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-[#9945FF] data-[state=active]:text-text"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <Card className="border border-[#9945FF]/20 bg-background/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">
                      Portfolio Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-text/50 text-center">
                      <p>Portfolio chart visualization</p>
                      <p className="text-sm mt-2">
                        Visual representation of portfolio value over time
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border border-[#9945FF]/20 bg-background/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Asset Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {PORTFOLIO_DATA.assets.map((asset) => (
                        <div
                          key={asset.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#9945FF]/20 flex items-center justify-center text-xs font-bold">
                              {asset.name}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {asset.fullName}
                              </p>
                              <p className="text-xs text-text/70">
                                {asset.percentOfPortfolio.toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              ${asset.value.toFixed(2)}
                            </p>
                            <div
                              className={cn(
                                "text-xs",
                                asset.isPositive
                                  ? "text-[#14F195]"
                                  : "text-red-500",
                              )}
                            >
                              {asset.isPositive ? "+" : ""}
                              {asset.percentChange24h}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border border-[#9945FF]/20 bg-background/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {PORTFOLIO_DATA.transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 bg-[#9945FF]/5 border border-[#9945FF]/20 rounded-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            tx.type === "buy"
                              ? "bg-[#14F195]/20 text-[#14F195]"
                              : "bg-red-500/20 text-red-500",
                          )}
                        >
                          {tx.type === "buy" ? (
                            <ArrowDown className="h-4 w-4" />
                          ) : (
                            <ArrowUp className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {tx.type === "buy" ? "Bought" : "Sold"} {tx.amount}{" "}
                            {tx.asset}
                          </div>
                          <div className="text-xs text-text/70">
                            ${tx.value.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium">
                          {tx.status.charAt(0).toUpperCase() +
                            tx.status.slice(1)}
                        </div>
                        <div className="text-xs text-text/70">
                          {tx.date.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets" className="mt-4 space-y-4">
            {PORTFOLIO_DATA.assets.map((asset) => (
              <Card
                key={asset.name}
                className="border border-[#9945FF]/20 bg-background/50"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#9945FF]/20 flex items-center justify-center text-sm font-bold">
                        {asset.name}
                      </div>
                      <div>
                        <CardTitle className="text-md">
                          {asset.fullName}
                        </CardTitle>
                        <CardDescription>
                          {asset.amount} {asset.name}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-bold">
                        ${asset.value.toFixed(2)}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "flex items-center gap-1",
                          asset.isPositive
                            ? "text-[#14F195] border-[#14F195]/30"
                            : "text-red-500 border-red-500/30",
                        )}
                      >
                        {asset.isPositive ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        {asset.percentChange24h}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[100px] flex items-center justify-center">
                  <div className="text-text/50 text-center">
                    <p>Asset price chart</p>
                    <p className="text-sm mt-2">
                      Visual representation of asset price over time
                    </p>
                  </div>
                </CardContent>
                <div className="px-6 pb-4 flex justify-between">
                  <Button
                    variant="outline"
                    className="border-[#9945FF]/30 hover:border-[#9945FF] hover:bg-[#9945FF]/10"
                  >
                    Buy
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#9945FF]/30 hover:border-[#9945FF] hover:bg-[#9945FF]/10"
                  >
                    Sell
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card className="border border-[#9945FF]/20 bg-background/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {PORTFOLIO_DATA.transactions.length > 0 ? (
                    PORTFOLIO_DATA.transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-3 bg-[#9945FF]/5 border border-[#9945FF]/20 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              tx.type === "buy"
                                ? "bg-[#14F195]/20 text-[#14F195]"
                                : "bg-red-500/20 text-red-500",
                            )}
                          >
                            {tx.type === "buy" ? (
                              <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUp className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {tx.type === "buy" ? "Bought" : "Sold"}{" "}
                              {tx.amount} {tx.asset}
                            </div>
                            <div className="text-xs text-text/70">
                              ${tx.value.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium">
                            {tx.status.charAt(0).toUpperCase() +
                              tx.status.slice(1)}
                          </div>
                          <div className="text-xs text-text/70">
                            {tx.date.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-text/50">
                      <p>No transaction history</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CardContent className="pt-0 pb-4">
        <div className="flex items-center justify-between text-xs text-text/50 mt-4 pt-4 border-t border-[#9945FF]/20">
          <div>Last updated: {new Date().toLocaleString()}</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3" />
              </TooltipTrigger>
              <TooltipContent className="bg-background border border-[#9945FF]/20 p-2 shadow-md">
                <p className="text-xs">
                  Mock portfolio data for demonstration purposes
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PortfolioPage() {
  return (
    <div className="container py-4">
      <PortfolioContent />
    </div>
  );
}
