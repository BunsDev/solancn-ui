"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

// Mock trading data
const marketPairs = [
  { name: "SOL/USDC", price: 57.24, change: 3.2 },
  { name: "BONK/USDC", price: 0.00002341, change: -1.4 },
  { name: "JTO/USDC", price: 2.68, change: 0.5 },
  { name: "RNDR/USDC", price: 7.12, change: -0.8 },
  { name: "JUP/USDC", price: 1.43, change: 5.2 },
];

const orderbook = {
  asks: [
    { price: 57.30, size: 42.5, total: 42.5 },
    { price: 57.28, size: 15.2, total: 57.7 },
    { price: 57.27, size: 8.4, total: 66.1 },
    { price: 57.26, size: 5.3, total: 71.4 },
    { price: 57.25, size: 3.1, total: 74.5 },
  ],
  bids: [
    { price: 57.23, size: 6.2, total: 6.2 },
    { price: 57.22, size: 18.7, total: 24.9 },
    { price: 57.21, size: 12.9, total: 37.8 },
    { price: 57.20, size: 25.4, total: 63.2 },
    { price: 57.19, size: 10.8, total: 74.0 },
  ],
};

const recentTrades = [
  { price: 57.24, size: 1.2, time: "12:45:32", side: "buy" },
  { price: 57.23, size: 0.5, time: "12:45:30", side: "sell" },
  { price: 57.24, size: 2.0, time: "12:45:25", side: "buy" },
  { price: 57.22, size: 1.5, time: "12:45:20", side: "sell" },
  { price: 57.24, size: 0.8, time: "12:45:15", side: "buy" },
];

export default function TradingComponent() {
  const { connected } = useWallet();
  const [selectedPair, setSelectedPair] = useState("SOL/USDC");
  const [orderType, setOrderType] = useState("limit");
  const [orderSide, setOrderSide] = useState("buy");
  const [price, setPrice] = useState("57.24");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");

  // Calculate total when price or amount changes
  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && price) {
      setTotal((Number.parseFloat(value) * Number.parseFloat(price)).toFixed(2));
    } else {
      setTotal("");
    }
  };

  // Calculate amount when total changes
  const handleTotalChange = (value: string) => {
    setTotal(value);
    if (value && price) {
      setAmount((Number.parseFloat(value) / Number.parseFloat(price)).toFixed(6));
    } else {
      setAmount("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Market selection and chart */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Market pairs */}
        <Card className="bg-background border border-[#9945FF]/20 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#14F195] text-lg">Markets</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4">
              <Input 
                placeholder="Search markets" 
                className="bg-background border-[#9945FF]/30" 
              />
            </div>
            <div className="mt-2 overflow-auto max-h-[300px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-background border-b border-[#9945FF]/20">
                  <tr>
                    <th className="text-left p-4 text-sm text-gray-400">Pair</th>
                    <th className="text-right p-4 text-sm text-gray-400">Price</th>
                    <th className="text-right p-4 text-sm text-gray-400">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {marketPairs.map((pair) => (
                    <tr 
                      key={pair.name} 
                      className={`cursor-pointer hover:bg-[#9945FF]/10 ${pair.name === selectedPair ? 'bg-[#9945FF]/10' : ''}`}
                      onClick={() => setSelectedPair(pair.name)}
                      onKeyUp={() => setSelectedPair(pair.name)}
                      onKeyDown={() => setSelectedPair(pair.name)}
                    >
                      <td className="text-left p-4 text-sm">{pair.name}</td>
                      <td className="text-right p-4 text-sm">{pair.name.includes("BONK") ? pair.price.toFixed(8) : pair.price.toFixed(2)}</td>
                      <td className={`text-right p-4 text-sm ${pair.change >= 0 ? 'text-[#14F195]' : 'text-red-500'}`}>
                        {pair.change >= 0 ? '+' : ''}{pair.change}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Price chart */}
        <Card className="bg-background border border-[#9945FF]/20 lg:col-span-3 min-h-[300px] relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#14F195] text-lg flex justify-between">
              <span>{selectedPair} Chart</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-[#9945FF]/30 text-sm hover:bg-[#9945FF]/10">1H</Button>
                <Button variant="outline" size="sm" className="border-[#9945FF]/30 text-sm bg-[#9945FF]/20">4H</Button>
                <Button variant="outline" size="sm" className="border-[#9945FF]/30 text-sm hover:bg-[#9945FF]/10">1D</Button>
                <Button variant="outline" size="sm" className="border-[#9945FF]/30 text-sm hover:bg-[#9945FF]/10">1W</Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center border border-dashed border-[#9945FF]/20 rounded-md">
              <span className="text-gray-400">Chart visualization would appear here</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orderbook, trades and order form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Orderbook and recent trades */}
        <Card className="bg-background border border-[#9945FF]/20 lg:col-span-2">
          <CardHeader className="pb-2">
            <Tabs defaultValue="orderbook" className="w-full">
              <TabsList className="grid grid-cols-3 bg-background border border-[#9945FF]/30">
                <TabsTrigger value="orderbook" className="data-[state=active]:bg-[#9945FF]/20">
                  Order Book
                </TabsTrigger>
                <TabsTrigger value="trades" className="data-[state=active]:bg-[#9945FF]/20">
                  Recent Trades
                </TabsTrigger>
                <TabsTrigger value="openorders" className="data-[state=active]:bg-[#9945FF]/20">
                  Open Orders
                </TabsTrigger>
              </TabsList>
            
              <TabsContent value="orderbook" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Asks */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1 px-2">
                      <span>Price (USDC)</span>
                      <span>Size (SOL)</span>
                      <span>Total</span>
                    </div>
                    <div className="space-y-1">
                      {orderbook.asks.map((ask) => (
                        <div key={ask.price} className="flex justify-between text-sm bg-red-500/10 p-2 rounded">
                          <span className="text-red-500">{ask.price.toFixed(2)}</span>
                          <span>{ask.size.toFixed(2)}</span>
                          <span>{ask.total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bids */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1 px-2">
                      <span>Price (USDC)</span>
                      <span>Size (SOL)</span>
                      <span>Total</span>
                    </div>
                    <div className="space-y-1">
                      {orderbook.bids.map((bid) => (
                        <div key={bid.price} className="flex justify-between text-sm bg-[#14F195]/10 p-2 rounded">
                          <span className="text-[#14F195]">{bid.price.toFixed(2)}</span>
                          <span>{bid.size.toFixed(2)}</span>
                          <span>{bid.total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trades" className="mt-4">
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead className="border-b border-[#9945FF]/20">
                      <tr>
                        <th className="text-left p-2 text-sm text-gray-400">Price</th>
                        <th className="text-right p-2 text-sm text-gray-400">Size</th>
                        <th className="text-right p-2 text-sm text-gray-400">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTrades.map((trade, index) => (
                        <tr key={`${trade.time}-${index}`}>
                          <td className={`text-left p-2 text-sm ${trade.side === 'buy' ? 'text-[#14F195]' : 'text-red-500'}`}>
                            {trade.price.toFixed(2)}
                          </td>
                          <td className="text-right p-2 text-sm">{trade.size.toFixed(2)}</td>
                          <td className="text-right p-2 text-sm text-gray-400">{trade.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="openorders" className="mt-4">
                {connected ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-400">No open orders</p>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-400">Connect your wallet to view open orders</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Order form */}
        <Card className="bg-background border border-[#9945FF]/20 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#14F195] text-lg">
              <div className="flex w-full">
                <Button 
                  className={`flex-1 rounded-r-none ${orderSide === 'buy' ? 'bg-[#14F195] hover:bg-[#14F195]/90 text-black' : 'bg-transparent hover:bg-[#14F195]/10 text-[#14F195] border border-[#14F195]'}`}
                  onClick={() => setOrderSide('buy')}
                >
                  Buy
                </Button>
                <Button 
                  className={`flex-1 rounded-l-none ${orderSide === 'sell' ? 'bg-red-500 hover:bg-red-500/90 text-white' : 'bg-transparent hover:bg-red-500/10 text-red-500 border border-red-500'}`}
                  onClick={() => setOrderSide('sell')}
                >
                  Sell
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Select defaultValue={orderType} onValueChange={(value) => setOrderType(value)}>
                    <SelectTrigger className="w-full bg-background border-[#9945FF]/30">
                      <SelectValue placeholder="Order Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-[#9945FF]/30">
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="stopLimit">Stop Limit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {orderType !== 'market' && (
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm text-gray-400">Price (USDC)</label>
                  <Input 
                    id="price"
                    type="number" 
                    placeholder="0.00" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-background border-[#9945FF]/30" 
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm text-gray-400">Amount (SOL)</label>
                <Input 
                  id="amount"
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="bg-background border-[#9945FF]/30" 
                />
                <div className="flex justify-between gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs border-[#9945FF]/30" onClick={() => handleAmountChange((0.25).toString())}>25%</Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs border-[#9945FF]/30" onClick={() => handleAmountChange((0.5).toString())}>50%</Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs border-[#9945FF]/30" onClick={() => handleAmountChange((0.75).toString())}>75%</Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs border-[#9945FF]/30" onClick={() => handleAmountChange((1).toString())}>MAX</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="total" className="text-sm text-gray-400">Total (USDC)</label>
                <Input 
                  id="total"
                  type="number" 
                  placeholder="0.00" 
                  value={total}
                  onChange={(e) => handleTotalChange(e.target.value)}
                  className="bg-background border-[#9945FF]/30" 
                />
              </div>

              <div className="pt-2">
                {connected ? (
                  <Button 
                    className={`w-full ${orderSide === 'buy' ? 'bg-[#14F195] hover:bg-[#14F195]/90 text-black' : 'bg-red-500 hover:bg-red-500/90'}`}
                  >
                    {orderSide === 'buy' ? 'Buy' : 'Sell'} SOL
                  </Button>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                    Connect Wallet to Trade
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const trading = {
  name: "trading",
  components: {
    Default: <TradingComponent />,
  },
};
