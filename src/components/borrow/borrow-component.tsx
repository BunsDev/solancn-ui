// src/components/borrow/borrow-component.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function BorrowComponent() {
  // State for collateral amount
  const [collateralAmount, setCollateralAmount] = useState<string>("1.0");
  // State for borrow amount
  const [borrowAmount, setBorrowAmount] = useState<string>("50");
  // State for selected collateral token
  const [collateralToken, setCollateralToken] = useState<string>("sol");
  // State for selected borrow token
  const [borrowToken, setBorrowToken] = useState<string>("usdc");
  // State for health factor
  const [healthFactor, setHealthFactor] = useState<number>(2.5);
  // State for loan-to-value ratio
  const [ltvRatio, setLtvRatio] = useState<number>(50);

  // Calculate max borrow based on collateral and LTV
  const calculateMaxBorrow = () => {
    const collateral = parseFloat(collateralAmount) || 0;
    // Mock price of SOL at $57
    const solPrice = 57;
    // Mock price of USDC at $1
    const usdcPrice = 1;
    
    const collateralValue = collateralToken === "sol" 
      ? collateral * solPrice 
      : collateral * usdcPrice;
    
    return (collateralValue * ltvRatio / 100).toFixed(2);
  };

  // Calculate health factor based on borrowed amount and collateral
  const calculateHealthFactor = () => {
    const collateral = parseFloat(collateralAmount) || 0;
    const borrow = parseFloat(borrowAmount) || 0;
    const solPrice = 57;
    
    if (borrow <= 0) return 10; // Max health if no borrow
    
    const collateralValue = collateralToken === "sol" 
      ? collateral * solPrice 
      : collateral;
      
    const newHealthFactor = (collateralValue / borrow) * (100 / ltvRatio);
    setHealthFactor(parseFloat(newHealthFactor.toFixed(2)));
  };

  // Handle collateral amount change
  const handleCollateralChange = (value: string) => {
    setCollateralAmount(value);
    calculateHealthFactor();
  };

  // Handle borrow amount change
  const handleBorrowChange = (value: string) => {
    setBorrowAmount(value);
    calculateHealthFactor();
  };

  // Handle slider change for LTV ratio
  const handleLtvChange = (value: number[]) => {
    setLtvRatio(value[0]);
    calculateHealthFactor();
  };

  // Handle max button click
  const handleSetMaxBorrow = () => {
    const maxBorrow = calculateMaxBorrow();
    setBorrowAmount(maxBorrow);
    calculateHealthFactor();
  };

  // Get health factor color based on value
  const getHealthFactorColor = () => {
    if (healthFactor >= 2) return "text-green-500";
    if (healthFactor >= 1.5) return "text-yellow-500";
    return "text-red-500";
  };

  // Collateral tokens
  const collateralTokens = [
    { symbol: "sol", name: "Solana", icon: "S", apy: 2.5 },
    { symbol: "usdc", name: "USD Coin", icon: "U", apy: 1.8 },
    { symbol: "eth", name: "Ethereum", icon: "E", apy: 2.1 },
  ];

  // Borrow tokens
  const borrowTokens = [
    { symbol: "usdc", name: "USD Coin", icon: "U", apy: 3.5 },
    { symbol: "usdt", name: "Tether", icon: "T", apy: 3.8 },
    { symbol: "sol", name: "Solana", icon: "S", apy: 4.2 },
  ];

  return (
    <Card className="w-full bg-background text-text border border-[#9945FF]/20">
      <CardHeader className="border-b border-[#9945FF]/20">
        <CardTitle className="text-[#14F195]">Borrow</CardTitle>
        <CardDescription className="text-gray-400">
          Borrow assets using your crypto as collateral
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <Tabs defaultValue="borrow" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-background border border-[#9945FF]/30">
            <TabsTrigger
              value="borrow"
              className="data-[state=active]:bg-[#9945FF]/20"
            >
              Borrow
            </TabsTrigger>
            <TabsTrigger
              value="repay"
              className="data-[state=active]:bg-[#9945FF]/20"
            >
              Repay
            </TabsTrigger>
            <TabsTrigger
              value="positions"
              className="data-[state=active]:bg-[#9945FF]/20"
            >
              My Positions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="borrow" className="space-y-6 mt-4">
            {/* Collateral section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="collateral" className="text-sm font-medium">
                  Collateral
                </label>
                <span className="text-xs text-gray-400">
                  Balance: 10.0 SOL
                </span>
              </div>
              <div className="flex space-x-2">
                <Input
                  id="collateral"
                  type="number"
                  value={collateralAmount}
                  onChange={(e) => handleCollateralChange(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                />
                <Select
                  value={collateralToken}
                  onValueChange={setCollateralToken}
                >
                  <SelectTrigger className="w-[120px] bg-background border-[#9945FF]/30">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-[#9945FF]/30">
                    {collateralTokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#9945FF]/30 flex items-center justify-center text-xs">
                            {token.icon}
                          </div>
                          <span>{token.symbol.toUpperCase()}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-[#9945FF]"
                  onClick={() => setCollateralAmount("10.0")}
                >
                  Max
                </Button>
              </div>
            </div>

            {/* Loan to Value slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Loan to Value (LTV)</div>
                <div className="text-sm font-medium">{ltvRatio}%</div>
              </div>
              <Slider
                value={[ltvRatio]}
                min={10}
                max={75}
                step={1}
                onValueChange={handleLtvChange}
                className="[&>span]:bg-[#9945FF]"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Safe: 10%</span>
                <span>Moderate: 50%</span>
                <span>Risky: 75%</span>
              </div>
            </div>

            {/* Borrow section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="borrow" className="text-sm font-medium">
                  Borrow
                </label>
                <span className="text-xs text-gray-400">
                  Available: {calculateMaxBorrow()} USDC
                </span>
              </div>
              <div className="flex space-x-2">
                <Input
                  id="borrow"
                  type="number"
                  value={borrowAmount}
                  onChange={(e) => handleBorrowChange(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                />
                <Select
                  value={borrowToken}
                  onValueChange={setBorrowToken}
                >
                  <SelectTrigger className="w-[120px] bg-background border-[#9945FF]/30">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-[#9945FF]/30">
                    {borrowTokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#9945FF]/30 flex items-center justify-center text-xs">
                            {token.icon}
                          </div>
                          <span>{token.symbol.toUpperCase()}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-[#9945FF]"
                  onClick={handleSetMaxBorrow}
                >
                  Max
                </Button>
              </div>
            </div>

            {/* Borrow details */}
            <div className="bg-[#9945FF]/10 p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Health Factor</span>
                <span className={`text-sm font-medium ${getHealthFactorColor()}`}>
                  {healthFactor}x
                </span>
              </div>
              <Progress
                value={(healthFactor / 3) * 100}
                max={100}
                className="h-1.5 bg-[#9945FF]/20"
              />
              <div className="flex justify-between text-xs">
                <span className="text-red-500">Liquidation</span>
                <span className="text-yellow-500">Safe</span>
                <span className="text-green-500">Very Safe</span>
              </div>

              <Separator className="my-2 bg-[#9945FF]/20" />

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Borrow APY</span>
                <span>3.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Liquidation Threshold</span>
                <span>{(ltvRatio + 10).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Liquidation Penalty</span>
                <span>10%</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="repay" className="space-y-6 mt-4">
            <div className="space-y-4">
              <div className="text-center py-6 text-gray-400">
                You have no active loans to repay.
              </div>
              <Button
                variant="outline"
                className="w-full border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
              >
                Connect Wallet to View Loans
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="positions" className="mt-4">
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#9945FF]/20">
                    <TableHead className="text-gray-400">Asset</TableHead>
                    <TableHead className="text-gray-400 text-right">
                      Balance
                    </TableHead>
                    <TableHead className="text-gray-400 text-right">
                      APY
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Supply positions */}
                  <TableRow className="border-b border-[#9945FF]/10">
                    <TableCell colSpan={4} className="py-2">
                      <Badge className="bg-[#14F195]/20 text-[#14F195] hover:bg-[#14F195]/30 border-none">
                        Supplied
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-[#9945FF]/10">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#9945FF]/30 flex items-center justify-center">
                          S
                        </div>
                        <div>
                          <div>SOL</div>
                          <div className="text-xs text-gray-400">Solana</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">0.00</TableCell>
                    <TableCell className="text-right text-[#14F195]">
                      2.5%
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                      >
                        Supply
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Borrow positions */}
                  <TableRow className="border-b border-[#9945FF]/10">
                    <TableCell colSpan={4} className="py-2">
                      <Badge className="bg-[#9945FF]/20 text-[#9945FF] hover:bg-[#9945FF]/30 border-none">
                        Borrowed
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-800/30 flex items-center justify-center">
                          U
                        </div>
                        <div>
                          <div>USDC</div>
                          <div className="text-xs text-gray-400">USD Coin</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">0.00</TableCell>
                    <TableCell className="text-right text-orange-400">
                      3.5%
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="bg-[#14F195] text-black hover:bg-[#14F195]/90"
                      >
                        Borrow
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="border-t border-[#9945FF]/20 pt-4">
        <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
          Borrow {borrowAmount} {borrowToken.toUpperCase()}
        </Button>
      </CardFooter>
    </Card>
  );
}

export const borrow = {
  name: "borrow",
  components: {
    Default: <BorrowComponent />,
  },
};