"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@solana/wallet-adapter-react";
import { PieChart, LineChart, BarChart } from "lucide-react";
import { mockDeFiPortfolioValue, mockDeFiPortfolioAssets, mockDeFiYieldOpportunities } from "@/lib/constants/defi";
import { DeFiCard } from "./defi-card";

export const DeFiComponent = () => {
  const { connected } = useWallet();
  const [chartView, setChartView] = useState<string>("allocation");

  // Helper for color coding change percentages
  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-[#14F195]' : 'text-red-500';
  };

  // Simple visualization of chart data
  const AllocationChart = () => (
    <div className="h-[180px] flex items-end gap-2 mt-6">
      {mockDeFiPortfolioAssets.map((asset) => (
        <div
          key={asset.symbol}
          className="flex flex-col items-center"
          style={{ width: `${100 / mockDeFiPortfolioAssets.length}%` }}
        >
          <div
            className="w-full bg-[#9945FF]/80 rounded-t-sm"
            style={{
              height: `${(asset.allocation / 100) * 160}px`,
              background: 'linear-gradient(180deg, rgba(153,69,255,0.8) 0%, rgba(20,241,149,0.4) 100%)'
            }} />
          <div className="text-xs mt-1 text-center text-gray-400">{asset.symbol}</div>
        </div>
      ))}
    </div>
  );

  const ValueChart = () => (
    <div className="h-[180px] flex items-end gap-1 mt-6">
      {mockDeFiPortfolioValue.history.map((point) => (
        <div
          key={point.date}
          className="flex flex-col items-center"
          style={{ width: `${100 / mockDeFiPortfolioValue.history.length}%` }}
        >
          <div
            className="w-full bg-[#14F195]/60 rounded-t-sm"
            style={{
              height: `${(point.value / Math.max(...mockDeFiPortfolioValue.history.map(p => p.value))) * 160}px`,
              background: 'linear-gradient(180deg, rgba(153,69,255,0.6) 0%, rgba(20,241,149,0.8) 100%)'
            }}
          />
          <div className="text-xs mt-1 text-center text-gray-400">{point.date}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Portfolio Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Value Card */}
        <DeFiCard
          title="Portfolio Value"
          value={`$${mockDeFiPortfolioValue.total.toLocaleString()}`}
          change={mockDeFiPortfolioValue.change}
          changePercent={mockDeFiPortfolioValue.changePercent}
        >
          <div className="flex items-center justify-end gap-2 mt-2">
            <Button
              variant={chartView === "value" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartView("value")}
              className={chartView === "value"
                ? "bg-[#9945FF] hover:bg-[#9945FF]/90"
                : "border-[#9945FF]/30 hover:bg-[#9945FF]/10"
              }
            >
              <LineChart className="h-4 w-4 mr-1" />
              Value
            </Button>
            <Button
              variant={chartView === "allocation" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartView("allocation")}
              className={chartView === "allocation"
                ? "bg-[#9945FF] hover:bg-[#9945FF]/90"
                : "border-[#9945FF]/30 hover:bg-[#9945FF]/10"
              }
            >
              <PieChart className="h-4 w-4 mr-1" />
              Allocation
            </Button>
            <Button
              variant={chartView === "yield" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartView("yield")}
              className={chartView === "yield"
                ? "bg-[#9945FF] hover:bg-[#9945FF]/90"
                : "border-[#9945FF]/30 hover:bg-[#9945FF]/10"
              }
            >
              <BarChart className="h-4 w-4 mr-1" />
              Yield
            </Button>
          </div>

          {chartView === "allocation" && <AllocationChart />}
          {chartView === "value" && <ValueChart />}
          {chartView === "yield" && (
            <div className="h-[180px] flex items-center justify-center mt-6">
              <div className="text-gray-400">Yield analytics visualization</div>
            </div>
          )}
        </DeFiCard>

        {/* Quick Stats */}
        <div className="flex flex-col gap-6">
          <DeFiCard
            title="Top Performer (24h)"
            value={`${mockDeFiPortfolioAssets.reduce((prev, current) => (prev.change24h > current.change24h) ? prev : current).symbol}`}
            subtitle={`${mockDeFiPortfolioAssets.reduce((prev, current) => (prev.change24h > current.change24h) ? prev : current).change24h}%`}
            change={mockDeFiPortfolioAssets.reduce((prev, current) => (prev.change24h > current.change24h) ? prev : current).change24h}
            changePercent={mockDeFiPortfolioAssets.reduce((prev, current) => (prev.change24h > current.change24h) ? prev : current).change24h}
          >
            <div className="h-[80px] flex items-center justify-center">
              <div className="text-4xl font-bold text-[#14F195]">
                +{mockDeFiPortfolioAssets.reduce((prev, current) => (prev.change24h > current.change24h) ? prev : current).change24h}%
              </div>
            </div>
          </DeFiCard>

          <DeFiCard
            title="Best Yield Opportunity"
            value={`${mockDeFiYieldOpportunities.reduce((prev, current) => (Number.parseFloat(prev.apy) > Number.parseFloat(current.apy)) ? prev : current).asset}`}
            subtitle={`${mockDeFiYieldOpportunities.reduce((prev, current) => (Number.parseFloat(prev.apy) > Number.parseFloat(current.apy)) ? prev : current).protocol}`}
            change={Number.parseFloat(mockDeFiYieldOpportunities.reduce((prev, current) => (Number.parseFloat(prev.apy) > Number.parseFloat(current.apy)) ? prev : current).apy)}
            changePercent={Number.parseFloat(mockDeFiYieldOpportunities.reduce((prev, current) => (Number.parseFloat(prev.apy) > Number.parseFloat(current.apy)) ? prev : current).apy)}
          >
            <div className="h-[80px] flex items-center justify-center">
              <div className="text-4xl font-bold text-[#14F195]">
                {mockDeFiYieldOpportunities.reduce((prev, current) => (Number.parseFloat(prev.apy) > Number.parseFloat(current.apy)) ? prev : current).apy}
              </div>
            </div>
          </DeFiCard>
        </div>

        {/* Actions Card */}
        <Card className="bg-background border border-[#9945FF]/20">
          <CardHeader>
            <CardTitle className="text-[#14F195]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
              Swap Tokens
            </Button>
            <Button variant="outline" className="border-[#9945FF]/30 hover:bg-[#9945FF]/10">
              Stake for Yield
            </Button>
            <Button variant="outline" className="border-[#9945FF]/30 hover:bg-[#9945FF]/10">
              Bridge Assets
            </Button>
            <Button variant="outline" className="border-[#9945FF]/30 hover:bg-[#9945FF]/10">
              Borrow Against Assets
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Details and Yield Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Portfolio Assets */}
        <Card className="bg-background border border-[#9945FF]/20">
          <CardHeader>
            <CardTitle className="text-[#14F195]">Portfolio Assets</CardTitle>
            <CardDescription className="text-gray-400">Your current holdings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#9945FF]/20">
                    <th className="text-left p-3 text-sm text-gray-400">Asset</th>
                    <th className="text-right p-3 text-sm text-gray-400">Price</th>
                    <th className="text-right p-3 text-sm text-gray-400">Balance</th>
                    <th className="text-right p-3 text-sm text-gray-400">Value</th>
                    <th className="text-right p-3 text-sm text-gray-400">24h</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDeFiPortfolioAssets.map((asset) => (
                    <tr key={asset.symbol} className="hover:bg-[#9945FF]/10">
                      <td className="text-left p-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center mr-2">
                            <span className="font-bold text-black">{asset.symbol.substring(0, 1)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{asset.symbol}</div>
                            <div className="text-xs text-gray-400">{asset.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right p-3">${asset.price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</td>
                      <td className="text-right p-3">{asset.balance.toLocaleString(undefined, { maximumFractionDigits: 6, minimumFractionDigits: 0 })}</td>
                      <td className="text-right p-3 font-medium">${asset.value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</td>
                      <td className={`text-right p-3 ${getChangeColor(asset.change24h)}`}>
                        {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Yield Opportunities */}
        <Card className="bg-background border border-[#9945FF]/20">
          <CardHeader>
            <CardTitle className="text-[#14F195]">Yield Opportunities</CardTitle>
            <CardDescription className="text-gray-400">Top earning strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#9945FF]/20">
                    <th className="text-left p-3 text-sm text-gray-400">Protocol</th>
                    <th className="text-left p-3 text-sm text-gray-400">Asset</th>
                    <th className="text-right p-3 text-sm text-gray-400">APY</th>
                    <th className="text-right p-3 text-sm text-gray-400">TVL</th>
                    <th className="text-right p-3 text-sm text-gray-400">Risk</th>
                    <th className="text-right p-3 text-sm text-gray-400">-</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDeFiYieldOpportunities.map((opportunity) => (
                    <tr key={opportunity.id} className="hover:bg-[#9945FF]/10">
                      <td className="text-left p-3">
                        <div className="font-medium">{opportunity.protocol}</div>
                      </td>
                      <td className="text-left p-3">{opportunity.asset}</td>
                      <td className="text-right p-3 text-[#14F195] font-medium">{opportunity.apy}</td>
                      <td className="text-right p-3">{opportunity.tvl}</td>
                      <td className="text-right p-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${opportunity.risk === 'Low'
                            ? 'bg-[#14F195]/20 text-[#14F195]'
                            : opportunity.risk === 'Medium'
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}>
                          {opportunity.risk}
                        </span>
                      </td>
                      <td className="text-right p-3">
                        <Button variant="outline" size="sm" className="border-[#9945FF]/30 hover:bg-[#9945FF]/10">
                          Stake
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-background border border-[#9945FF]/20">
        <CardHeader>
          <CardTitle className="text-[#14F195]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {connected ? (
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#9945FF]/20">
                    <th className="text-left p-3 text-sm text-gray-400">Type</th>
                    <th className="text-left p-3 text-sm text-gray-400">Asset</th>
                    <th className="text-right p-3 text-sm text-gray-400">Amount</th>
                    <th className="text-right p-3 text-sm text-gray-400">Value</th>
                    <th className="text-right p-3 text-sm text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-[#9945FF]/10">
                    <td className="text-left p-3">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-[#14F195]/20 text-[#14F195]">
                        Buy
                      </span>
                    </td>
                    <td className="text-left p-3">SOL</td>
                    <td className="text-right p-3">+5.2 SOL</td>
                    <td className="text-right p-3">$297.65</td>
                    <td className="text-right p-3 text-gray-400">Jul 25, 2025</td>
                  </tr>
                  <tr className="hover:bg-[#9945FF]/10">
                    <td className="text-left p-3">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-500">
                        Stake
                      </span>
                    </td>
                    <td className="text-left p-3">SOL</td>
                    <td className="text-right p-3">15.0 SOL</td>
                    <td className="text-right p-3">$858.60</td>
                    <td className="text-right p-3 text-gray-400">Jul 22, 2025</td>
                  </tr>
                  <tr className="hover:bg-[#9945FF]/10">
                    <td className="text-left p-3">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500">
                        Sell
                      </span>
                    </td>
                    <td className="text-left p-3">JUP</td>
                    <td className="text-right p-3">-250 JUP</td>
                    <td className="text-right p-3">$170.00</td>
                    <td className="text-right p-3 text-gray-400">Jul 20, 2025</td>
                  </tr>
                  <tr className="hover:bg-[#9945FF]/10">
                    <td className="text-left p-3">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-500">
                        Swap
                      </span>
                    </td>
                    <td className="text-left p-3">USDC → SOL</td>
                    <td className="text-right p-3">500 USDC</td>
                    <td className="text-right p-3">$500.00</td>
                    <td className="text-right p-3 text-gray-400">Jul 18, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">Connect your wallet to view transaction history</p>
              <Button className="mt-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                Connect Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const defi = {
  name: "defi",
  components: {
    Default: <DeFiComponent />,
  },
};