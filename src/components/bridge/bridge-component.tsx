"use client";

import React, { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import Image from "next/image";
import {
  ArrowLeftRight,
  ArrowRight,
  Settings,
  RefreshCw,
  ChevronDown,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BRIDGE_SAMPLE_TOKENS, BRIDGE_NETWORKS, BRIDGE_PRESET_AMOUNTS, BridgeToken, BridgeNetwork } from "@/lib/constants/bridge";

// Bridge fee estimation interface
interface FeeEstimate {
  networkFee: number;
  bridgeFee: number;
  processingTime: string;
  totalFee: number;
}

// Custom token selector component
function TokenSelector({
  selectedToken,
  onTokenChange,
  tokens,
  label,
  disabled = false,
}: {
  selectedToken: BridgeToken | null;
  onTokenChange: (token: BridgeToken) => void;
  tokens: BridgeToken[];
  label: string;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text/70 mb-1">
        {label}
      </label>
      <div className="relative">
        <Select

          value={selectedToken?.symbol}
          onValueChange={(value) => {
            const token = tokens.find((t) => t.symbol === value);
            if (token) onTokenChange(token);
          }}
          disabled={disabled}
        >
          <SelectTrigger
            className={cn(
              "w-full bg-background/50 border border-[#9945FF]/30 focus:ring-[#9945FF] focus:ring-opacity-50 h-12",
              "focus:border-[#9945FF] hover:border-[#9945FF]/80 transition-colors",
              disabled ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            <SelectValue placeholder="Select token">
              {selectedToken && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-[#9945FF]/10">
                    <Image
                      src={selectedToken.logo}
                      alt={selectedToken.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <span>{selectedToken.symbol}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-auto border border-[#9945FF]/30 bg-background/95 backdrop-blur-sm">
            {tokens.map((token) => (
              <SelectItem
                key={`${token.network}-${token.address}`}
                value={token.symbol}
                className="cursor-pointer hover:bg-[#9945FF]/10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-[#9945FF]/10">
                    <Image
                      src={token.logo}
                      alt={token.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{token.symbol}</span>
                    <span className="text-xs text-text/50">{token.name}</span>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs text-text/70">
                      {token.balance.toFixed(4)}
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// Custom network selector component
function NetworkSelector({
  selectedNetwork,
  onNetworkChange,
  networks,
  label,
  disabled = false,
}: {
  selectedNetwork: BridgeNetwork | null;
  onNetworkChange: (network: BridgeNetwork) => void;
  networks: Record<string, BridgeNetwork>;
  label: string;
  disabled?: boolean;
}) {
  const networksArray = Object.values(networks);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text/70 mb-1">
        {label}
      </label>
      <div className="relative">
        <Select

          value={selectedNetwork?.chainId}
          onValueChange={(value) => {
            const network = networksArray.find((n) => n.chainId === value);
            if (network) onNetworkChange(network);
          }}
          disabled={disabled}
        >
          <SelectTrigger
            className={cn(
              "w-full bg-background/50 border border-[#9945FF]/30 focus:ring-[#9945FF] focus:ring-opacity-50 h-12",
              "focus:border-[#9945FF] hover:border-[#9945FF]/80 transition-colors",
              disabled ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            <SelectValue placeholder="Select network">
              {selectedNetwork && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-[#9945FF]/10">
                    <Image
                      src={selectedNetwork.logo}
                      alt={selectedNetwork.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <span>{selectedNetwork.name}</span>
                  {selectedNetwork.isTestnet && (
                    <Badge variant="outline" className="ml-1 text-[#14F195] border-[#14F195]/30">
                      Testnet
                    </Badge>
                  )}
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-auto border border-[#9945FF]/30 bg-background/95 backdrop-blur-sm">
            {networksArray.map((network) => (
              <SelectItem
                key={network.chainId}
                value={network.chainId}
                className="cursor-pointer hover:bg-[#9945FF]/10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-[#9945FF]/10">
                    <Image
                      src={network.logo}
                      alt={network.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <span>{network.name}</span>
                  {network.isTestnet && (
                    <Badge variant="outline" className="ml-1 text-[#14F195] border-[#14F195]/30">
                      Testnet
                    </Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function BridgeComponent() {
  // Initialize with demo mode or connect to real wallet
  const { publicKey, connected } = { publicKey: new PublicKey("DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ"), connected: true };
  const { connection } = { connection: null };
  
  // States
  const [sourceNetwork, setSourceNetwork] = useState<BridgeNetwork | null>(BRIDGE_NETWORKS.solana);
  const [targetNetwork, setTargetNetwork] = useState<BridgeNetwork | null>(BRIDGE_NETWORKS.ethereum);
  const [sourceToken, setSourceToken] = useState<BridgeToken | null>(BRIDGE_SAMPLE_TOKENS[0]);
  const [targetToken, setTargetToken] = useState<BridgeToken | null>(BRIDGE_SAMPLE_TOKENS[2]);
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("bridge");
  const [feeEstimate, setFeeEstimate] = useState<FeeEstimate>({
    networkFee: 0.0005,
    bridgeFee: 0.001,
    processingTime: "10-30 minutes",
    totalFee: 0.0015,
  });
  const [txHistory, setTxHistory] = useState<Array<{
    id: string;
    from: string;
    to: string;
    amount: number;
    token: string;
    status: "pending" | "completed" | "failed";
    date: Date;
  }>>([
    {
      id: "tx1",
      from: "Solana",
      to: "Ethereum",
      amount: 1.5,
      token: "SOL",
      status: "completed",
      date: new Date(Date.now() - 86400000),
    },
    {
      id: "tx2",
      from: "Ethereum",
      to: "Solana",
      amount: 0.05,
      token: "ETH",
      status: "pending",
      date: new Date(),
    },
  ]);

  // Calculate max amount user can bridge based on selected token
  const maxAmount = sourceToken?.balance || 0;

  // Handle network swap
  const handleNetworkSwap = () => {
    const tempNetwork = sourceNetwork;
    setSourceNetwork(targetNetwork);
    setTargetNetwork(tempNetwork);

    // Find appropriate tokens for the swapped networks
    const sourceTokensForNetwork = BRIDGE_SAMPLE_TOKENS.filter(
      (t) => t.network === targetNetwork?.chainId
    );
    const targetTokensForNetwork = BRIDGE_SAMPLE_TOKENS.filter(
      (t) => t.network === sourceNetwork?.chainId
    );

    setSourceToken(sourceTokensForNetwork[0] || null);
    setTargetToken(targetTokensForNetwork[0] || null);
  };

  // Handle amount change
  const handleAmountChange = (value: string) => {
    // Allow only numbers with up to 6 decimal places
    const regex = /^\d*\.?\d{0,6}$/;
    if (value === "" || regex.test(value)) {
      setAmount(value);

      // Update fee estimate
      const amountNum = Number.parseFloat(value) || 0;
      if (amountNum > 0) {
        const networkFee = 0.0005;
        const bridgeFee = amountNum * 0.005; // 0.5% bridge fee
        setFeeEstimate({
          ...feeEstimate,
          bridgeFee,
          totalFee: networkFee + bridgeFee,
        });
      }
    }
  };

  // Handle preset amount selection
  const handlePresetAmount = (preset: number) => {
    const presetValue = Math.min(preset, maxAmount);
    setAmount(presetValue.toString());
    
    // Update fee estimate
    const networkFee = 0.0005;
    const bridgeFee = presetValue * 0.005; // 0.5% bridge fee
    setFeeEstimate({
      ...feeEstimate,
      bridgeFee,
      totalFee: networkFee + bridgeFee,
    });
  };

  // Handle bridge action
  const handleBridge = async () => {
    if (!sourceToken || !targetToken || !amount || Number.parseFloat(amount) <= 0) {
      return;
    }

    setIsLoading(true);

    // Simulate bridge transaction
    setTimeout(() => {
      const newTx = {
        id: `tx${Date.now()}`,
        from: sourceNetwork?.name || "",
        to: targetNetwork?.name || "",
        amount: parseFloat(amount),
        token: sourceToken.symbol,
        status: "pending" as const,
        date: new Date(),
      };

      setTxHistory([newTx, ...txHistory]);
      setAmount("");
      setIsLoading(false);

      // After a few seconds, update the transaction to completed
      setTimeout(() => {
        setTxHistory((prev) =>
          prev.map((tx) =>
            tx.id === newTx.id ? { ...tx, status: "completed" } : tx
          )
        );
      }, 5000);
    }, 2000);
  };

  // Filter available tokens based on selected network
  const sourceTokens = BRIDGE_SAMPLE_TOKENS.filter(
    (token) => token.network === sourceNetwork?.chainId
  );
  const targetTokens = BRIDGE_SAMPLE_TOKENS.filter(
    (token) => token.network === targetNetwork?.chainId
  );

  // Calculate expected amount after fees
  const amountNum = Number.parseFloat(amount) || 0;
  const expectedAmount = Math.max(0, amountNum - feeEstimate.totalFee);

  // Check if the user has enough balance
  const hasInsufficientBalance =
    sourceToken && amountNum > sourceToken.balance;

  return (
    <Card className="bg-background/80 backdrop-blur-sm border border-[#9945FF]/20 shadow-xl w-full max-w-md mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-text">Solana Bridge</CardTitle>
            <CardDescription className="text-text/70">
              Transfer assets across blockchains
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-end mb-4">
            <TabsList className="bg-background/50 border border-[#9945FF]/20 p-1">
              <TabsTrigger
                value="bridge"
                className="data-[state=active]:bg-[#9945FF] data-[state=active]:text-text"
              >
                Bridge
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-[#9945FF] data-[state=active]:text-text"
              >
                History
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="bridge" className="mt-0 space-y-4">
          <div className="flex flex-col space-y-4">
            {/* From section */}
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between">
                <NetworkSelector
                  selectedNetwork={sourceNetwork}
                  onNetworkChange={setSourceNetwork}
                  networks={BRIDGE_NETWORKS}
                  label="From"
                />
              </div>

              <div className="flex space-x-2">
                <TokenSelector
                  selectedToken={sourceToken}
                  onTokenChange={setSourceToken}
                  tokens={sourceTokens}
                  label="Token"
                />

                <div className="w-full">
                  <label htmlFor="bridge-amount" className="block text-sm font-medium text-text/70 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <Input
                      id="bridge-amount"
                      type="text"
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="bg-background/50 border border-[#9945FF]/30 focus:ring-[#9945FF] focus:ring-opacity-50 h-12 pr-16"
                      placeholder="0.0"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-[#9945FF]/10 hover:bg-[#9945FF]/20 text-[#9945FF] px-2 py-1 rounded transition-colors"
                      onClick={() => handleAmountChange(maxAmount.toString())}
                    >
                      MAX
                    </button>
                  </div>

                  {/* Balance display */}
                  <div className="flex justify-between mt-1 text-xs text-text/70">
                    <span>Balance: {sourceToken?.balance.toFixed(6) || "0"}</span>
                    <span className={hasInsufficientBalance ? "text-red-500" : ""}>
                      {hasInsufficientBalance ? "Insufficient balance" : ""}
                    </span>
                  </div>

                  {/* Preset amounts */}
                  <div className="flex justify-between gap-2 mt-2">
                    {BRIDGE_PRESET_AMOUNTS.map((preset) => (
                      <Button
                        key={preset}
                        type="button"
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs h-8 border-[#9945FF]/30 hover:border-[#9945FF] hover:bg-[#9945FF]/10"
                        onClick={() => handlePresetAmount(preset)}
                        disabled={preset > maxAmount}
                      >
                        {preset}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Network swap button */}
            <div className="flex justify-center">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full w-10 h-10 p-0 border border-[#9945FF]/30 bg-background hover:border-[#9945FF] hover:bg-[#9945FF]/10 transition-all"
                onClick={handleNetworkSwap}
              >
                <ArrowLeftRight className="h-4 w-4 text-[#9945FF]" />
              </Button>
            </div>

            {/* To section */}
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between">
                <NetworkSelector
                  selectedNetwork={targetNetwork}
                  onNetworkChange={setTargetNetwork}
                  networks={BRIDGE_NETWORKS}
                  label="To"
                />
              </div>

              <div className="flex space-x-2">
                <TokenSelector
                  selectedToken={targetToken}
                  onTokenChange={setTargetToken}
                  tokens={targetTokens}
                  label="Token"
                />

                <div className="w-full">
                  <label htmlFor="estimated-amount" className="block text-sm font-medium text-text/70 mb-1">
                    Estimated Received
                  </label>
                  <div className="relative">
                    <Input
                      id="estimated-amount"
                      type="text"
                      value={expectedAmount > 0 ? expectedAmount.toFixed(6) : "0"}
                      readOnly
                      className="bg-background/50 border border-[#9945FF]/30 h-12 opacity-70 cursor-not-allowed"
                      disabled
                    />
                  </div>

                  {/* Fee information */}
                  <div className="flex justify-between mt-1 text-xs text-text/70">
                    <span>Fee: {feeEstimate.totalFee.toFixed(6)}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-background border border-[#9945FF]/20 p-2 shadow-md">
                          <div className="text-xs">
                            <p>Network Fee: {feeEstimate.networkFee.toFixed(6)}</p>
                            <p>Bridge Fee: {feeEstimate.bridgeFee.toFixed(6)}</p>
                            <p>Processing Time: ~{feeEstimate.processingTime}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction information */}
            <div className="bg-[#9945FF]/5 border border-[#9945FF]/20 rounded-md p-3 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text/70">Processing Time</span>
                <span className="text-text font-medium">
                  ~{feeEstimate.processingTime}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-text/70">Fee</span>
                <span className="text-text font-medium">
                  {feeEstimate.totalFee.toFixed(6)} {sourceToken?.symbol}
                </span>
              </div>
            </div>

            {/* Bridge button */}
            <Button
              type="button"
              className={cn(
                "w-full h-12 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-text font-semibold",
                "hover:opacity-90 transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              disabled={
                isLoading ||
                // !sourceToken ||
                // !targetToken ||
                !amount ||
                Number.parseFloat(amount) <= 0
                // || hasInsufficientBalance
              }
              onClick={handleBridge}
            >
              {isLoading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
              {isLoading
                ? "Processing..."
                // : hasInsufficientBalance
                // ? "Insufficient Balance"
                : !amount || parseFloat(amount) <= 0
                ? "Enter Amount"
                : `Bridge ${sourceToken?.symbol} to ${targetNetwork?.name}`}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <div className="space-y-3">
            <div className="text-sm font-medium text-text/70">
              Recent Transactions
            </div>

            {txHistory.length > 0 ? (
              <div className="space-y-2">
                {txHistory.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 bg-[#9945FF]/5 border border-[#9945FF]/20 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          tx.status === "completed"
                            ? "bg-[#14F195]"
                            : tx.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        )}
                      ></div>
                      <div>
                        <div className="text-sm font-medium">
                          {tx.amount} {tx.token}
                        </div>
                        <div className="text-xs text-text/70 flex items-center">
                          {tx.from} <ArrowRight className="w-3 h-3 mx-1" /> {tx.to}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={cn(
                          "text-xs font-medium",
                          tx.status === "completed"
                            ? "text-[#14F195]"
                            : tx.status === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        )}
                      >
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </div>
                      <div className="text-xs text-text/70">
                        {tx.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-text/50">
                <p>No transaction history</p>
              </div>
            )}
          </div>
        </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between pt-0">
        <div className="text-xs text-text/50">
          Powered by Solana
        </div>
        <button type="button" className="text-xs text-[#9945FF] hover:text-[#14F195] transition-colors">
          <Settings className="h-3 w-3" />
        </button>
      </CardFooter>
    </Card>
  );
}

// Export with named component format
export const bridge = {
  name: "bridge",
  components: {
    Default: BridgeComponent,
  },
};
