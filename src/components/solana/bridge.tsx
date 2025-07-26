"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWallet } from "@solana/wallet-adapter-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock supported networks and tokens
const networks = [
  { id: "solana", name: "Solana", icon: "◎", color: "#9945FF" },
  { id: "ethereum", name: "Ethereum", icon: "Ξ", color: "#627EEA" },
  { id: "polygon", name: "Polygon", icon: "◊", color: "#8247E5" },
  { id: "avalanche", name: "Avalanche", icon: "A", color: "#E84142" },
  { id: "bsc", name: "BNB Chain", icon: "B", color: "#F0B90B" },
];

const tokens = [
  { symbol: "USDC", name: "USD Coin", networks: ["solana", "ethereum", "polygon", "avalanche", "bsc"] },
  { symbol: "USDT", name: "Tether USD", networks: ["solana", "ethereum", "polygon", "avalanche", "bsc"] },
  { symbol: "WETH", name: "Wrapped Ethereum", networks: ["solana", "ethereum", "polygon", "avalanche", "bsc"] },
  { symbol: "WBTC", name: "Wrapped Bitcoin", networks: ["solana", "ethereum", "polygon", "avalanche", "bsc"] },
  { symbol: "SOL", name: "Solana", networks: ["solana"] },
  { symbol: "ETH", name: "Ethereum", networks: ["ethereum"] },
  { symbol: "MATIC", name: "Polygon", networks: ["polygon"] },
  { symbol: "AVAX", name: "Avalanche", networks: ["avalanche"] },
  { symbol: "BNB", name: "BNB", networks: ["bsc"] },
];

const recentTransactions = [
  { 
    hash: "5tGHP7...j8sWd", 
    fromNetwork: "solana", 
    toNetwork: "ethereum",
    token: "USDC", 
    amount: "100",
    status: "completed", 
    time: "12 min ago" 
  },
  { 
    hash: "0xF89B2...5Df1", 
    fromNetwork: "ethereum", 
    toNetwork: "solana",
    token: "USDT", 
    amount: "50",
    status: "pending", 
    time: "25 min ago" 
  }
];

export default function BridgeComponent() {
  const { connected } = useWallet();
  const [fromNetwork, setFromNetwork] = useState("solana");
  const [toNetwork, setToNetwork] = useState("ethereum");
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // Filter tokens available on the selected from network
  const availableTokens = tokens.filter(token => token.networks.includes(fromNetwork));
  
  // Find the details of the selected networks
  const sourceNetwork = networks.find(network => network.id === fromNetwork);
  const targetNetwork = networks.find(network => network.id === toNetwork);

  // Calculate estimated fees and time
  const calculateFees = () => {
    if (!amount || Number.parseFloat(amount) <= 0) return "0.00";
    
    // Mock fee calculation
    const baseRate = 0.001; // 0.1%
    const networkMultiplier = fromNetwork === "solana" ? 0.5 : 1; // Solana has lower fees
    
    const estimatedFee = Number.parseFloat(amount) * baseRate * networkMultiplier;
    return estimatedFee.toFixed(2);
  };

  const estimatedTime = () => {
    if (fromNetwork === "solana" && toNetwork === "solana") return "< 1 minute";
    if (fromNetwork === "solana" || toNetwork === "solana") return "15-20 minutes";
    return "30-45 minutes";
  };

  // Swap networks
  const handleSwapNetworks = () => {
    const temp = fromNetwork;
    setFromNetwork(toNetwork);
    setToNetwork(temp);
    // Reset token if it's not available on the new network
    if (!tokens.find(token => token.symbol === selectedToken)?.networks.includes(toNetwork)) {
      setSelectedToken("");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bridge Card */}
        <Card className="bg-black border border-[#9945FF]/20 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-[#14F195]">Bridge Assets</CardTitle>
            <CardDescription className="text-gray-400">
              Transfer tokens between different blockchains
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* From Network */}
            <div className="space-y-2">
              <label htmlFor="fromNetwork" className="text-sm text-gray-400">From</label>
              <Select value={fromNetwork} onValueChange={setFromNetwork}>
                <SelectTrigger className="bg-black border-[#9945FF]/30">
                  <SelectValue placeholder="Select network">
                    {sourceNetwork && (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: sourceNetwork.color }}>
                          <span className="text-white font-medium">{sourceNetwork.icon}</span>
                        </div>
                        {sourceNetwork.name}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-black border-[#9945FF]/30">
                  {networks.map((network) => (
                    <SelectItem 
                      key={network.id} 
                      value={network.id}
                      disabled={network.id === toNetwork}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: network.color }}>
                          <span className="text-white font-medium">{network.icon}</span>
                        </div>
                        {network.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Network swap button */}
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleSwapNetworks}
                className="rounded-full border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Swap Networks</title>
                  <path d="M7 10v4h10v-4" />
                  <path d="M17 20l-5-5-5 5" />
                  <path d="m17 4-5 5-5-5" />
                </svg>
              </Button>
            </div>

            {/* To Network */}
            <div className="space-y-2">
              <label htmlFor="toNetwork" className="text-sm text-gray-400">To</label>
              <Select value={toNetwork} onValueChange={setToNetwork}>
                <SelectTrigger className="bg-black border-[#9945FF]/30">
                  <SelectValue placeholder="Select network">
                    {targetNetwork && (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: targetNetwork.color }}>
                          <span className="text-white font-medium">{targetNetwork.icon}</span>
                        </div>
                        {targetNetwork.name}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-black border-[#9945FF]/30">
                  {networks.map((network) => (
                    <SelectItem 
                      key={network.id} 
                      value={network.id}
                      disabled={network.id === fromNetwork}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: network.color }}>
                          <span className="text-white font-medium">{network.icon}</span>
                        </div>
                        {network.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Token and Amount */}
            <div className="space-y-2">
              <label htmlFor="token" className="text-sm text-gray-400">Token</label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger className="bg-black border-[#9945FF]/30">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent className="bg-black border-[#9945FF]/30">
                  {availableTokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                          <span className="text-white font-medium text-xs">{token.symbol.substring(0, 2)}</span>
                        </div>
                        {token.name} ({token.symbol})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="amount" className="text-sm text-gray-400">Amount</label>
                <span className="text-xs text-gray-400">Balance: 0.00</span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-black border-[#9945FF]/30"
                />
                <Button 
                  variant="outline"
                  className="border-[#9945FF]/30 hover:bg-[#9945FF]/10"
                  onClick={() => setAmount("100")} // Mock max amount
                >
                  MAX
                </Button>
              </div>
            </div>

            {/* Recipient Address */}
            <div className="space-y-2">
              <label htmlFor="recipient" className="text-sm text-gray-400">Recipient Address {toNetwork !== fromNetwork && "(optional)"}</label>
              <Input
                id="recipient"
                placeholder={`Enter ${targetNetwork?.name} address`}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-black border-[#9945FF]/30"
              />
              {toNetwork !== fromNetwork && (
                <p className="text-xs text-gray-400">
                  Leave empty to use the connected wallet's {targetNetwork?.name} address
                </p>
              )}
            </div>

            {/* Bridge Details */}
            <div className="bg-[#9945FF]/10 p-4 rounded-md space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Fee</span>
                <span>{amount ? `${calculateFees()} ${selectedToken}` : "-"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">You will receive</span>
                <span>{amount ? `${(Number.parseFloat(amount) - Number.parseFloat(calculateFees())).toFixed(2)} ${selectedToken}` : "-"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estimated time</span>
                <span>{estimatedTime()}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            {connected ? (
              <Button 
                className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
                disabled={!selectedToken || !amount || Number.parseFloat(amount) <= 0}
              >
                Bridge {selectedToken}
              </Button>
            ) : (
              <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                Connect Wallet
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Info Card */}
        <Card className="bg-black border border-[#9945FF]/20">
          <CardHeader>
            <CardTitle className="text-[#14F195]">Bridge Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">About Cross-Chain Bridging</h3>
              <p className="text-sm text-gray-400">
                Bridges allow you to transfer tokens between different blockchain networks.
                This process typically involves locking tokens on one network and minting
                equivalent tokens on the target network.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Security</h3>
              <p className="text-sm text-gray-400">
                Our bridge uses secure, audited smart contracts to ensure the safety of your assets.
                Always verify transaction details before confirming.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Fees</h3>
              <p className="text-sm text-gray-400">
                Bridge fees consist of:
                <br />• Protocol fee: 0.1% of the transferred amount
                <br />• Network gas fees: varies by network
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions History */}
      <Card className="bg-black border border-[#9945FF]/20">
        <CardHeader>
          <CardTitle className="text-[#14F195]">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {connected ? (
            recentTransactions.length > 0 ? (
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#9945FF]/20">
                      <th className="text-left p-2 text-sm font-medium text-gray-400">Transaction</th>
                      <th className="text-left p-2 text-sm font-medium text-gray-400">From → To</th>
                      <th className="text-left p-2 text-sm font-medium text-gray-400">Token</th>
                      <th className="text-right p-2 text-sm font-medium text-gray-400">Amount</th>
                      <th className="text-right p-2 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-right p-2 text-sm font-medium text-gray-400">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => {
                      const source = networks.find(n => n.id === tx.fromNetwork);
                      const target = networks.find(n => n.id === tx.toNetwork);
                      
                      return (
                        <tr key={tx.hash} className="hover:bg-[#9945FF]/5">
                          <td className="text-left p-2 text-sm">
                            <span className="font-mono">{tx.hash}</span>
                          </td>
                          <td className="text-left p-2">
                            <div className="flex items-center gap-1">
                              <div 
                                className="w-4 h-4 rounded-full flex items-center justify-center" 
                                style={{ backgroundColor: source?.color }}
                              >
                                <span className="text-white font-medium text-[10px]">{source?.icon}</span>
                              </div>
                              <span className="text-[#9945FF]">→</span>
                              <div 
                                className="w-4 h-4 rounded-full flex items-center justify-center" 
                                style={{ backgroundColor: target?.color }}
                              >
                                <span className="text-white font-medium text-[10px]">{target?.icon}</span>
                              </div>
                            </div>
                          </td>
                          <td className="text-left p-2 text-sm">{tx.token}</td>
                          <td className="text-right p-2 text-sm">{tx.amount}</td>
                          <td className="text-right p-2 text-sm">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              tx.status === 'completed' 
                                ? 'bg-[#14F195]/20 text-[#14F195]' 
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="text-right p-2 text-sm text-gray-400">{tx.time}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400">No recent transactions found</p>
              </div>
            )
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">Connect your wallet to view transaction history</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const bridge = {
  name: "bridge",
  components: {
    Default: <BridgeComponent />,
  },
};
