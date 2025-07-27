"use client";

import { useEffect, useState } from "react";
import { SwapToken } from "@/lib/types";
import { ArrowRightLeft, Settings, Zap, Info, RefreshCw, BarChart3, Repeat, LineChart, Clock } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import SwapTokenSelectButton from "./token-select-button";
// import { useWallet } from "@solana/wallet-adapter-react";
import { mockSwapTokens } from "@/lib/constants/swap";
import { RouteOption } from "./route-option";

export const SwapContent = () => {
    const [fromToken, setFromToken] = useState<SwapToken>(mockSwapTokens[0]);
    const [toToken, setToToken] = useState<SwapToken>(mockSwapTokens[1]);
    const [fromAmount, setFromAmount] = useState<string>("1");
    const [toAmount, setToAmount] = useState<string>("245.18");
    const [slippage, setSlippage] = useState<number>(1); // 1%
    const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
    const [isPriceChart, setIsPriceChart] = useState<boolean>(false);
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

    // Routes for swapping
    const routes = [
        {
            name: "Jupiter Aggregator",
            icon: <Zap className="w-4 h-4 text-[#9945FF]" />,
            value: "245.18 USDC",
            fee: 0.35,
            time: "~12 sec",
            impact: 0.05,
            optimizedFor: "Best price"
        },
        {
            name: "Raydium",
            icon: <RefreshCw className="w-4 h-4" />,
            value: "244.95 USDC",
            fee: 0.3,
            time: "~8 sec",
            impact: 0.08,
            optimizedFor: ""
        },
        {
            name: "Orca",
            icon: <Clock className="w-4 h-4" />,
            value: "244.75 USDC",
            fee: 0.25,
            time: "~15 sec",
            impact: 0.1,
            optimizedFor: "Low fee"
        }
    ];

    // Calculate estimated exchange rate
    const exchangeRate = parseFloat(toAmount) / parseFloat(fromAmount);

    // Swap the tokens
    const handleSwapTokens = () => {
        const temp = fromToken;
        setFromToken(toToken);
        setToToken(temp);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    // Handle swap submission
    const handleSwap = () => {
        toast.success(
            "Swap initiated",
            { description: `Swapping ${fromAmount} ${fromToken.symbol} to approximately ${toAmount} ${toToken.symbol}` }
        );
        // Here you would implement the actual swap logic using Jupiter API or another DEX aggregator
    };

    // Update the to amount when from amount changes
    useEffect(() => {
        if (fromToken && toToken) {
            // Simple price calculation, in a real app this would come from an API
            const calculatedAmount = parseFloat(fromAmount) * (fromToken.price || 0) / (toToken.price || 1);
            setToAmount(calculatedAmount.toFixed(calculatedAmount < 0.1 ? 6 : 2));
        }
    }, [fromAmount, fromToken, toToken]);

    return (
        <div className="space-y-5">
            <Tabs defaultValue="swap" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="swap">Swap</TabsTrigger>
                    <TabsTrigger value="limit">Limit</TabsTrigger>
                    <TabsTrigger value="twap">TWAP</TabsTrigger>
                </TabsList>

                <TabsContent value="swap" className="space-y-4 pt-4">
                    {/* From token input */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">You pay</div>
                            <div className="text-sm text-muted-foreground">
                                Balance: {fromToken.balance?.toFixed(4)} {fromToken.symbol}
                            </div>
                        </div>

                        <div className="flex space-x-2 bg-muted/40 p-4 rounded-lg">
                            <div className="flex-grow">
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    value={fromAmount}
                                    onChange={(e) => setFromAmount(e.target.value)}
                                    className="border-none text-xl font-medium bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                                />
                                <div className="text-sm text-muted-foreground mt-1">
                                    ≈ ${(parseFloat(fromAmount) * (fromToken.price || 0)).toFixed(2)}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" onClick={() => setFromAmount((fromToken.balance || 0).toString())}>
                                        MAX
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setFromAmount(((fromToken.balance || 0) / 2).toString())}>
                                        HALF
                                    </Button>
                                </div>

                                <SwapTokenSelectButton
                                    token={fromToken}
                                    onClick={() => {
                                        // In a real app, show token selection modal here
                                        toast.info(
                                            "Token selection",
                                            { description: "Token selection would open in a real implementation" }
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Swap button */}
                    <div className="flex justify-center">
                        <div className="bg-muted/30 rounded-full p-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-background hover:bg-[#9945FF]/20"
                                onClick={handleSwapTokens}
                            >
                                <ArrowRightLeft className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* To token input */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">You receive</div>
                            <div className="text-sm text-muted-foreground">
                                Balance: {toToken.balance?.toFixed(4)} {toToken.symbol}
                            </div>
                        </div>

                        <div className="flex space-x-2 bg-muted/40 p-4 rounded-lg">
                            <div className="flex-grow">
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    value={toAmount}
                                    onChange={(e) => setToAmount(e.target.value)}
                                    className="border-none text-xl font-medium bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                                />
                                <div className="text-sm text-muted-foreground mt-1">
                                    ≈ ${(parseFloat(toAmount) * (toToken.price || 0)).toFixed(2)}
                                </div>
                            </div>

                            <SwapTokenSelectButton
                                token={toToken}
                                onClick={() => {
                                    // In a real app, show token selection modal here
                                    toast.info(
                                        "Token selection",
                                        { description: "Token selection would open in a real implementation" }
                                    );
                                }}
                            />
                        </div>
                    </div>

                    {/* Rate information */}
                    <div className="bg-muted/30 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="text-sm">Rate</div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-xs max-w-xs">Estimated price including all fees and price impact</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="text-sm">
                                    1 {fromToken.symbol} ≈ {exchangeRate.toFixed(exchangeRate < 0.1 ? 6 : 4)} {toToken.symbol}
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Repeat className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>

                        <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
                            <span>Price Impact</span>
                            <span className={routes[selectedRouteIndex].impact > 1 ? "text-orange-500" : "text-green-500"}>
                                {routes[selectedRouteIndex].impact}%
                            </span>
                        </div>
                    </div>

                    {/* Routing options */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">Route</div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 px-2 gap-1" onClick={() => setShowAdvanced(!showAdvanced)}>
                                            <Settings className="h-3.5 w-3.5" />
                                            <span className="text-xs">Settings</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">Configure slippage tolerance and other settings</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {/* Advanced settings */}
                        {showAdvanced && (
                            <div className="bg-muted/30 p-3 rounded-lg mb-3 space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm">Slippage tolerance</span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs max-w-xs">Your transaction will revert if the price changes unfavorably by more than this percentage.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant={slippage === 0.5 ? "default" : "outline"}
                                            size="sm"
                                            className="h-7 px-2 text-xs"
                                            onClick={() => setSlippage(0.5)}
                                        >
                                            0.5%
                                        </Button>
                                        <Button
                                            variant={slippage === 1 ? "default" : "outline"}
                                            size="sm"
                                            className="h-7 px-2 text-xs"
                                            onClick={() => setSlippage(1)}
                                        >
                                            1.0%
                                        </Button>
                                        <Button
                                            variant={slippage === 2 ? "default" : "outline"}
                                            size="sm"
                                            className="h-7 px-2 text-xs"
                                            onClick={() => setSlippage(2)}
                                        >
                                            2.0%
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Auto Router API</span>
                                    <Switch checked={true} />
                                </div>
                            </div>
                        )}

                        {/* Route options */}
                        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                            {routes.map((route, index) => (
                                <RouteOption
                                    key={route.name}
                                    route={route}
                                    selected={selectedRouteIndex === index}
                                    onSelect={() => setSelectedRouteIndex(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <Button
                        className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90"
                        onClick={handleSwap}
                    >
                        Swap
                    </Button>
                </TabsContent>

                <TabsContent value="limit">
                    <div className="py-10 text-center text-muted-foreground">
                        <p>Limit order functionality would be implemented here</p>
                    </div>
                </TabsContent>

                <TabsContent value="twap">
                    <div className="py-10 text-center text-muted-foreground">
                        <p>Time-Weighted Average Price (TWAP) orders would be implemented here</p>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Toggle for chart view */}
            <div className="flex justify-center">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPriceChart(!isPriceChart)}
                    className="text-xs gap-1"
                >
                    {isPriceChart ? <BarChart3 className="h-3.5 w-3.5" /> : <LineChart className="h-3.5 w-3.5" />}
                    {isPriceChart ? "Hide Chart" : "Show Chart"}
                </Button>
            </div>

            {/* Price chart - conditionally shown */}
            {isPriceChart && (
                <div className="bg-muted/30 h-[200px] rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Price chart would render here</p>
                </div>
            )}
        </div>
    );
};
