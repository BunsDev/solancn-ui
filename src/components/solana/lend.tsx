"use client";

import { useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// Define asset types with their relevant data
const assets = [
  {
    symbol: "SOL",
    name: "Solana",
    icon: "S",
    iconBg: "bg-[#9945FF]/30",
    apy: 2.47,
    totalSupply: "120K",
    price: 134.26,
    walletBalance: 2.5,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "U",
    iconBg: "bg-green-800/30",
    apy: 3.92,
    totalSupply: "5.6M",
    price: 1.0,
    walletBalance: 500,
  },
  {
    symbol: "RNDR",
    name: "Render Network",
    icon: "R",
    iconBg: "bg-blue-600/30",
    apy: 4.18,
    totalSupply: "22K",
    price: 5.78,
    walletBalance: 10,
  },
  {
    symbol: "JTO",
    name: "Jito",
    icon: "J",
    iconBg: "bg-yellow-600/30",
    apy: 5.32,
    totalSupply: "88K",
    price: 2.34,
    walletBalance: 50,
  },
];

export const LendComponent = () => {
  const { publicKey, connected } = useWallet();
  const [selectedAsset, setSelectedAsset] = useState("");
  const [supplyAmount, setSupplyAmount] = useState("");
  const [lendTab, setLendTab] = useState("available");
  const [isLoading, setIsLoading] = useState(true);
  const [suppliedAssets, setSuppliedAssets] = useState<{
    [key: string]: number;
  }>({
    USDC: 100,
    SOL: 0.75,
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate supply value in USD
  const supplyValue = useMemo(() => {
    if (!selectedAsset || !supplyAmount) return 0;
    const asset = assets.find((a) => a.symbol === selectedAsset);
    if (!asset) return 0;
    return Number.parseFloat(supplyAmount) * asset.price;
  }, [selectedAsset, supplyAmount, assets]);

  // Get wallet balance of selected asset
  const walletBalance = useMemo(() => {
    if (!selectedAsset) return { amount: 0, value: 0 };
    const asset = assets.find((a) => a.symbol === selectedAsset);
    if (!asset) return { amount: 0, value: 0 };
    return {
      amount: asset.walletBalance,
      value: asset.walletBalance * asset.price,
    };
  }, [selectedAsset, assets]);

  // Handle supply action
  const handleSupplyAction = () => {
    if (!selectedAsset || !supplyAmount || Number.parseFloat(supplyAmount) <= 0)
      return;
    if (Number.parseFloat(supplyAmount) > walletBalance.amount) return;

    setSuppliedAssets((prev) => ({
      ...prev,
      [selectedAsset]:
        (prev[selectedAsset] || 0) + Number.parseFloat(supplyAmount),
    }));

    setSupplyAmount("");
  };

  // Calculate total supplied value
  const totalSuppliedValue = Object.entries(suppliedAssets).reduce(
    (acc, [symbol, amount]) => {
      const asset = assets.find((a) => a.symbol === symbol);
      return acc + (asset ? amount * asset.price : 0);
    },
    0,
  );

  // Handle max button click
  const handleMaxClick = () => {
    if (!selectedAsset) return;
    setSupplyAmount(walletBalance.amount.toString());
  };

  return (
    <Card className="w-full bg-background text-white border border-[#14F195]/20">
      <CardHeader className="border-b border-[#14F195]/20">
        <CardTitle className="text-[#9945FF]">Lend Assets</CardTitle>
        <CardDescription className="text-gray-400">
          Earn interest by lending your assets to the pool
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <Tabs value={lendTab} className="w-full" onValueChange={setLendTab}>
          <TabsList className="grid grid-cols-2 mb-4 bg-background border border-[#14F195]/30">
            <TabsTrigger
              value="available"
              className="data-[state=active]:bg-[#14F195]/20"
            >
              Available Assets
            </TabsTrigger>
            <TabsTrigger
              value="your"
              className="data-[state=active]:bg-[#14F195]/20"
            >
              Your Supply
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full bg-[#14F195]/5" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-[#14F195]/20">
                      <TableHead className="text-gray-400">Asset</TableHead>
                      <TableHead className="text-gray-400 text-right">
                        APY
                      </TableHead>
                      <TableHead className="text-gray-400 text-right">
                        Total Supply
                      </TableHead>
                      <TableHead className="text-gray-400 text-right">
                        Wallet Balance
                      </TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset) => {
                      const supplied = suppliedAssets[asset.symbol] || 0;
                      return (
                        <TableRow
                          key={asset.symbol}
                          className="border-b border-[#14F195]/10"
                        >
                          <TableCell className="font-medium flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-full ${asset.iconBg} flex items-center justify-center`}
                            >
                              {asset.icon}
                            </div>
                            {asset.symbol}
                          </TableCell>
                          <TableCell className="text-right">
                            {asset.apy}%
                          </TableCell>
                          <TableCell className="text-right">
                            {asset.totalSupply} {asset.symbol}
                          </TableCell>
                          <TableCell className="text-right">
                            {asset.walletBalance.toLocaleString(undefined, {
                              maximumFractionDigits: 4,
                            })}{" "}
                            {asset.symbol}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#14F195] text-[#14F195] hover:bg-[#14F195]/10"
                              onClick={() => {
                                setSelectedAsset(asset.symbol);
                                const element =
                                  document.getElementById("supply-form");
                                element?.scrollIntoView({ behavior: "smooth" });
                              }}
                              disabled={!connected || asset.walletBalance <= 0}
                            >
                              Supply
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          <TabsContent value="your" className="space-y-4">
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-12 w-full bg-[#14F195]/5" />
                  ))}
                </div>
              ) : Object.keys(suppliedAssets).length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-[#14F195]/20">
                      <TableHead className="text-gray-400">Asset</TableHead>
                      <TableHead className="text-gray-400 text-right">
                        Amount
                      </TableHead>
                      <TableHead className="text-gray-400 text-right">
                        Value
                      </TableHead>
                      <TableHead className="text-gray-400 text-right">
                        APY
                      </TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(suppliedAssets).map(([symbol, amount]) => {
                      if (amount <= 0) return null;
                      const asset = assets.find((a) => a.symbol === symbol);
                      if (!asset) return null;

                      return (
                        <TableRow
                          key={symbol}
                          className="border-b border-[#14F195]/10"
                        >
                          <TableCell className="font-medium flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-full ${asset.iconBg} flex items-center justify-center`}
                            >
                              {asset.icon}
                            </div>
                            {symbol}
                          </TableCell>
                          <TableCell className="text-right">
                            {amount.toLocaleString(undefined, {
                              maximumFractionDigits: 4,
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            $
                            {(amount * asset.price).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            {asset.apy}%
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
                              disabled={!connected}
                            >
                              Withdraw
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-gray-400 mb-2">
                    You have no supplied assets
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#14F195] text-[#14F195] hover:bg-[#14F195]/10"
                    onClick={() => setLendTab("available")}
                  >
                    Browse Assets
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div id="supply-form" className="bg-[#14F195]/10 p-4 rounded-md mt-6">
          <h3 className="text-lg font-medium mb-3">Supply Asset</h3>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger className="bg-background border-[#14F195]/30 w-1/3">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent className="bg-background border-[#14F195]/30">
                  {assets.map((asset) => (
                    <SelectItem key={asset.symbol} value={asset.symbol}>
                      {asset.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <Input
                  type="number"
                  value={supplyAmount}
                  onChange={(e) => setSupplyAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-background border-[#14F195]/30 focus:border-[#14F195] pr-16"
                />
                {connected && selectedAsset && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-[#14F195] hover:text-[#14F195]/80 hover:bg-transparent"
                    onClick={handleMaxClick}
                  >
                    MAX
                  </Button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Amount in USD</span>
              <span className="text-sm">
                $
                {supplyValue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Wallet Balance:</span>
                <span>
                  {selectedAsset ? (
                    <>
                      {walletBalance.amount.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}{" "}
                      {selectedAsset}
                      ($
                      {walletBalance.value.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                      )
                    </>
                  ) : (
                    "0.00"
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">APY:</span>
                <span className="text-[#14F195]">
                  {selectedAsset
                    ? `${assets.find((a) => a.symbol === selectedAsset)?.apy}%`
                    : "0.00%"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Daily Earnings:</span>
                <span className="text-[#14F195]">
                  {selectedAsset && supplyAmount
                    ? `${((Number.parseFloat(supplyAmount) * (assets.find((a) => a.symbol === selectedAsset)?.apy || 0)) / 100 / 365).toFixed(6)} ${selectedAsset}`
                    : "0.00"}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90"
              disabled={
                !connected ||
                !selectedAsset ||
                !supplyAmount ||
                Number.parseFloat(supplyAmount) <= 0 ||
                Number.parseFloat(supplyAmount) > walletBalance.amount
              }
              onClick={handleSupplyAction}
            >
              {!connected
                ? "Connect Wallet to Supply"
                : !selectedAsset
                  ? "Select an Asset"
                  : Number.parseFloat(supplyAmount) > walletBalance.amount
                    ? "Insufficient Balance"
                    : `Supply ${selectedAsset}`}
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between text-sm border-t border-[#14F195]/20 pt-4">
        <div className="text-gray-400">Total Supply Value</div>
        <div className="font-medium">
          $
          {totalSuppliedValue.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      </CardFooter>
    </Card>
  );
};

export const lend = {
  name: "lend",
  components: {
    Default: <LendComponent />,
  },
};