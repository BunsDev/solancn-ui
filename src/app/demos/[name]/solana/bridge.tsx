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

export const bridge = {
  name: "bridge",
  components: {
    Default: (
      <Card className="w-[400px] bg-black text-white border border-[#9945FF]/20">
        <CardHeader className="border-b border-[#9945FF]/20">
          <CardTitle className="text-[#14F195]">Bridge Assets</CardTitle>
          <CardDescription className="text-gray-400">
            Move assets between blockchains
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black border border-[#9945FF]/30">
              <TabsTrigger
                value="deposit"
                className="data-[state=active]:bg-[#9945FF]/20"
              >
                Deposit
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className="data-[state=active]:bg-[#9945FF]/20"
              >
                Withdraw
              </TabsTrigger>
            </TabsList>
            <TabsContent value="deposit" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">From Chain</span>
                </div>
                <Select>
                  <SelectTrigger className="bg-black border-[#9945FF]/30">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="bsc">BSC</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">To Chain</span>
                </div>
                <Select defaultValue="solana" disabled>
                  <SelectTrigger className="bg-black border-[#9945FF]/30">
                    <SelectValue placeholder="Solana" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="solana">Solana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Asset</span>
                  <span className="text-sm text-gray-400">Balance: 0.00</span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                  />
                  <Select>
                    <SelectTrigger className="w-[120px] bg-black border-[#9945FF]/30">
                      <SelectValue placeholder="USDC" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#9945FF]/30">
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="wbtc">WBTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-[#9945FF]/10 p-3 rounded-md text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Fee</span>
                  <span>0.001 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Time</span>
                  <span>~15 minutes</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="withdraw" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">From Chain</span>
                </div>
                <Select defaultValue="solana" disabled>
                  <SelectTrigger className="bg-black border-[#9945FF]/30">
                    <SelectValue placeholder="Solana" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="solana">Solana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">To Chain</span>
                </div>
                <Select>
                  <SelectTrigger className="bg-black border-[#9945FF]/30">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="bsc">BSC</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Asset</span>
                  <span className="text-sm text-gray-400">Balance: 0.00</span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                  />
                  <Select>
                    <SelectTrigger className="w-[120px] bg-black border-[#9945FF]/30">
                      <SelectValue placeholder="USDC" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#9945FF]/30">
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="sol">SOL</SelectItem>
                      <SelectItem value="rndr">RNDR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-[#9945FF]/10 p-3 rounded-md text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Fee</span>
                  <span>0.01 SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Time</span>
                  <span>~5 minutes</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter>
          <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
            Connect Wallet to Bridge
          </Button>
        </CardFooter>
      </Card>
    ),
  },
};
