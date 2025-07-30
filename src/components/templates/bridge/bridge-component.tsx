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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftRight,
  ArrowDown,
  Clock,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Info,
  HelpCircle,
} from "lucide-react";

export function BridgeComponent() {
  return (
    <div className="max-w-[500px] mx-auto">
      <Card className="bg-black text-text border border-[#9945FF]/20">
        <CardHeader className="border-b border-[#9945FF]/20">
          <CardTitle className="text-[#14F195] flex items-center">
            <ArrowLeftRight className="mr-2 h-5 w-5" /> Cross-Chain Bridge
          </CardTitle>
          <CardDescription className="text-gray-400">
            Transfer assets between Solana and other blockchains
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black border border-[#9945FF]/30">
              <TabsTrigger
                value="deposit"
                className="data-[state=active]:bg-[#9945FF]/20"
              >
                Deposit to Solana
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className="data-[state=active]:bg-[#9945FF]/20"
              >
                Withdraw from Solana
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="space-y-6 mt-6">
              {/* From Chain */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">From</span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Info className="h-3 w-3 mr-1" /> Select source chain
                  </span>
                </div>
                <Select>
                  <SelectTrigger className="w-full bg-black border-[#9945FF]/30 focus:border-[#9945FF]">
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="ethereum">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#627EEA] mr-2"></div>
                        Ethereum
                      </div>
                    </SelectItem>
                    <SelectItem value="polygon">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#8247E5] mr-2"></div>
                        Polygon
                      </div>
                    </SelectItem>
                    <SelectItem value="bnbchain">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#F3BA2F] mr-2"></div>
                        BNB Chain
                      </div>
                    </SelectItem>
                    <SelectItem value="arbitrum">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#28A0F0] mr-2"></div>
                        Arbitrum
                      </div>
                    </SelectItem>
                    <SelectItem value="avalanche">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#E84142] mr-2"></div>
                        Avalanche
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Asset Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Asset</span>
                  <span className="text-xs text-gray-400">Balance: 0.00</span>
                </div>
                <Select>
                  <SelectTrigger className="w-full bg-black border-[#9945FF]/30 focus:border-[#9945FF]">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="eth">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#627EEA] mr-2"></div>
                        ETH
                      </div>
                    </SelectItem>
                    <SelectItem value="usdc">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#2775CA] mr-2"></div>
                        USDC
                      </div>
                    </SelectItem>
                    <SelectItem value="usdt">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#26A17B] mr-2"></div>
                        USDT
                      </div>
                    </SelectItem>
                    <SelectItem value="wbtc">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#F7931A] mr-2"></div>
                        WBTC
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Amount</span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                  />
                  <Button className="bg-[#9945FF]/10 hover:bg-[#9945FF]/20 text-[#9945FF] border border-[#9945FF]/30">
                    MAX
                  </Button>
                </div>
                <div className="text-xs text-gray-400">
                  Min: 0.005 ETH | Max: 100 ETH
                </div>
              </div>

              <div className="flex justify-center py-2">
                <div className="bg-[#9945FF]/20 rounded-full p-2">
                  <ArrowDown className="h-5 w-5 text-[#9945FF]" />
                </div>
              </div>

              {/* To Chain (Solana) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">To</span>
                </div>
                <Select disabled>
                  <SelectTrigger className="w-full bg-black border-[#9945FF]/30">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] mr-2"></div>
                      Solana
                    </div>
                  </SelectTrigger>
                </Select>
              </div>

              {/* Recipient Address */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Recipient Address</span>
                  <span className="text-xs text-[#14F195]">Use My Wallet</span>
                </div>
                <Input
                  placeholder="Solana address"
                  className="w-full bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                />
              </div>

              {/* Fee and Time Estimation */}
              <div className="space-y-3 bg-[#9945FF]/10 p-4 rounded-md">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimated Fee</span>
                  <span>~0.002 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">You Will Receive</span>
                  <span className="text-[#14F195] font-medium">~0.00 sETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimated Time</span>
                  <span>~10-15 minutes</span>
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                  Connect Wallet to Bridge
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="withdraw" className="space-y-6 mt-6">
              {/* From Chain (Solana) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">From</span>
                </div>
                <Select disabled>
                  <SelectTrigger className="w-full bg-black border-[#9945FF]/30">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] mr-2"></div>
                      Solana
                    </div>
                  </SelectTrigger>
                </Select>
              </div>

              {/* Asset Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Asset</span>
                  <span className="text-xs text-gray-400">Balance: 0.00</span>
                </div>
                <Select>
                  <SelectTrigger className="w-full bg-black border-[#9945FF]/30 focus:border-[#9945FF]">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="seth">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#627EEA] mr-2"></div>
                        sETH
                      </div>
                    </SelectItem>
                    <SelectItem value="susdc">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#2775CA] mr-2"></div>
                        sUSDC
                      </div>
                    </SelectItem>
                    <SelectItem value="susdt">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#26A17B] mr-2"></div>
                        sUSDT
                      </div>
                    </SelectItem>
                    <SelectItem value="swbtc">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#F7931A] mr-2"></div>
                        sWBTC
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Amount</span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                  />
                  <Button className="bg-[#9945FF]/10 hover:bg-[#9945FF]/20 text-[#9945FF] border border-[#9945FF]/30">
                    MAX
                  </Button>
                </div>
                <div className="text-xs text-gray-400">
                  Min: 0.005 sETH | Max: 100 sETH
                </div>
              </div>

              <div className="flex justify-center py-2">
                <div className="bg-[#9945FF]/20 rounded-full p-2">
                  <ArrowDown className="h-5 w-5 text-[#9945FF]" />
                </div>
              </div>

              {/* To Chain */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">To</span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Info className="h-3 w-3 mr-1" /> Select destination chain
                  </span>
                </div>
                <Select>
                  <SelectTrigger className="w-full bg-black border-[#9945FF]/30 focus:border-[#9945FF]">
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="ethereum">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#627EEA] mr-2"></div>
                        Ethereum
                      </div>
                    </SelectItem>
                    <SelectItem value="polygon">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#8247E5] mr-2"></div>
                        Polygon
                      </div>
                    </SelectItem>
                    <SelectItem value="bnbchain">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#F3BA2F] mr-2"></div>
                        BNB Chain
                      </div>
                    </SelectItem>
                    <SelectItem value="arbitrum">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#28A0F0] mr-2"></div>
                        Arbitrum
                      </div>
                    </SelectItem>
                    <SelectItem value="avalanche">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[#E84142] mr-2"></div>
                        Avalanche
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Recipient Address */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Recipient Address</span>
                </div>
                <Input
                  placeholder="Recipient address"
                  className="w-full bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                />
              </div>

              {/* Fee and Time Estimation */}
              <div className="space-y-3 bg-[#9945FF]/10 p-4 rounded-md">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Bridge Fee</span>
                  <span>~0.002 SOL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">You Will Receive</span>
                  <span className="text-[#14F195] font-medium">~0.00 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimated Time</span>
                  <span>~15-30 minutes</span>
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                  Connect Wallet to Bridge
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="border-t border-[#9945FF]/20 pt-4 flex-col items-start space-y-4">
          <div className="w-full">
            <div className="text-sm font-medium mb-2">Recent Transactions</div>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-[#9945FF]/5 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="bg-[#14F195]/20 p-1 rounded-full mr-2">
                    <CheckCircle2 className="h-4 w-4 text-[#14F195]" />
                  </div>
                  <div>
                    <div className="text-xs">0.5 ETH → Solana</div>
                    <div className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Completed
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-between items-center bg-[#9945FF]/5 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="bg-amber-500/20 p-1 rounded-full mr-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-xs">1000 USDC → Solana</div>
                    <div className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Pending
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between bg-[#9945FF]/10 p-3 rounded-md text-xs">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
              <span>Always verify destination addresses</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 p-0"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
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
