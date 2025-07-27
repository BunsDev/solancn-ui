"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PortfolioComponent: React.FC = () => {
  return (
    <Card className="w-full bg-background text-text border border-[#9945FF]/20">
      <CardHeader className="border-b border-[#9945FF]/20">
        <CardTitle className="text-[#14F195]">Portfolio Dashboard</CardTitle>
        <CardDescription className="text-gray-400">
          View and manage your Solana assets
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-background border border-[#9945FF]/20">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">Total Balance</div>
              <div className="text-2xl font-bold">$0.00</div>
              <div className="text-xs text-gray-400 mt-1">0 assets</div>
            </CardContent>
          </Card>

          <Card className="bg-background border border-[#9945FF]/20">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">24h Change</div>
              <div className="text-2xl font-bold text-[#14F195]">+0.00%</div>
              <div className="text-xs text-gray-400 mt-1">+$0.00</div>
            </CardContent>
          </Card>

          <Card className="bg-background border border-[#9945FF]/20">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">SOL Price</div>
              <div className="text-2xl font-bold">$57.24</div>
              <div className="text-xs text-[#14F195] mt-1">+2.4% (24h)</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-background border border-[#9945FF]/30">
            <TabsTrigger
              value="tokens"
              className="data-[state=active]:bg-[#9945FF]/20"
            >
              Tokens
            </TabsTrigger>
            <TabsTrigger
              value="nfts"
              className="data-[state=active]:bg-[#9945FF]/20"
            >
              NFTs
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-[#9945FF]/20"
            >
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="space-y-4 mt-4">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#9945FF]/20">
                  <TableHead className="text-gray-400">Asset</TableHead>
                  <TableHead className="text-gray-400 text-right">
                    Price
                  </TableHead>
                  <TableHead className="text-gray-400 text-right">
                    Balance
                  </TableHead>
                  <TableHead className="text-gray-400 text-right">
                    Value
                  </TableHead>
                  <TableHead>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                    >
                      Portflio
                    </Button>{" "}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-[#9945FF]/10">
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#9945FF]/30 flex items-center justify-center">
                      S
                    </div>
                    <div>
                      <div>SOL</div>
                      <div className="text-xs text-gray-400">Solana</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$57.24</TableCell>
                  <TableCell className="text-right">0.00</TableCell>
                  <TableCell className="text-right">$0.00</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                      >
                        Send
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#14F195] text-black hover:bg-[#14F195]/90"
                      >
                        Buy
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-[#9945FF]/10">
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-800/30 flex items-center justify-center">
                      U
                    </div>
                    <div>
                      <div>USDC</div>
                      <div className="text-xs text-gray-400">USD Coin</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$1.00</TableCell>
                  <TableCell className="text-right">0.00</TableCell>
                  <TableCell className="text-right">$0.00</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                      >
                        Send
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#14F195] text-black hover:bg-[#14F195]/90"
                      >
                        Buy
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
                      R
                    </div>
                    <div>
                      <div>RNDR</div>
                      <div className="text-xs text-gray-400">
                        Render Network
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$5.87</TableCell>
                  <TableCell className="text-right">0.00</TableCell>
                  <TableCell className="text-right">$0.00</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                      >
                        Send
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#14F195] text-black hover:bg-[#14F195]/90"
                      >
                        Buy
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="nfts" className="space-y-4 mt-4">
            <div className="text-center py-8 text-gray-400">
              No NFTs found. Connect your wallet to view your NFTs.
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-4">
            <div className="text-center py-8 text-gray-400">
              No recent activity. Connect your wallet to view your transaction
              history.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="border-t border-[#9945FF]/20 pt-4">
        <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
          Connect Wallet
        </Button>
      </CardFooter>
    </Card>
  );
};

export const portfolio = {
  name: "portfolio",
  components: {
    Default: <PortfolioComponent />,
  },
};