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

export const transfer = {
  name: "transfer",
  components: {
    Default: (
      <Card className="w-full bg-black text-white border border-[#9945FF]/20">
        <CardHeader className="border-b border-[#9945FF]/20">
          <CardTitle className="text-[#14F195]">Transfer</CardTitle>
          <CardDescription className="text-gray-400">
            Send tokens to another wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="recipient" className="text-sm font-medium">
                Recipient Address
              </label>
              <Input
                id="recipient"
                placeholder="Enter Solana address or domain"
                className="bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <span className="text-xs text-gray-400">Balance: 0.00</span>
              </div>
              <div className="flex space-x-2">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                />
                <Select>
                  <SelectTrigger className="w-[120px] bg-black border-[#9945FF]/30">
                    <SelectValue placeholder="SOL" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="rndr">RNDR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="link"
                  className="text-xs text-[#9945FF] h-auto p-0"
                >
                  Send Max
                </Button>
              </div>
            </div>

            <div className="space-y-3 bg-[#9945FF]/10 p-4 rounded-md mt-2">
              <div className="text-sm font-medium mb-2">
                Transaction Details
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Network Fee</span>
                <span>~0.000005 SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estimated Confirmation</span>
                <span>~2 seconds</span>
              </div>
            </div>

            <Tabs defaultValue="quick" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2 bg-black border border-[#9945FF]/30">
                <TabsTrigger
                  value="quick"
                  className="data-[state=active]:bg-[#9945FF]/20"
                >
                  Quick Send
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="data-[state=active]:bg-[#9945FF]/20"
                >
                  Advanced
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quick" className="mt-2">
                <p className="text-xs text-gray-400">
                  Quick send uses the default settings for fast transactions on
                  Solana.
                </p>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 mt-2">
                <div className="space-y-2">
                  <div id="fee-priority">
                    <label
                      htmlFor="fee-priority"
                      className="text-sm font-medium"
                    >
                      Fee Priority
                    </label>
                    <Select defaultValue="market">
                      <SelectTrigger
                        id="fee-priority"
                        className="bg-black border-[#9945FF]/30"
                      >
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent
                        id="fee-priority"
                        className="bg-black border-[#9945FF]/30"
                      >
                        <SelectItem value="market">Market (1x)</SelectItem>
                        <SelectItem value="priority">
                          Priority (1.5x)
                        </SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div id="memo-input">
                    <label htmlFor="memo-input" className="text-sm font-medium">
                      Add Memo
                    </label>
                    <Input
                      id="memo-input"
                      placeholder="Optional message"
                      className="bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    The memo will be permanently stored on the Solana
                    blockchain.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
            Connect Wallet to Transfer
          </Button>
          <div className="text-xs text-center text-gray-400">
            All transfers are final and cannot be reversed
          </div>
        </CardFooter>
      </Card>
    ),
  },
};
