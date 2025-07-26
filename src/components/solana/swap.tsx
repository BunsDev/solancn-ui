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
    
    export default function SwapComponent() {
      return (
        <Card className="w-[400px] bg-black text-white border border-[#9945FF]/20">
          <CardHeader className="border-b border-[#9945FF]/20">
            <CardTitle className="text-[#14F195]">Swap Tokens</CardTitle>
            <CardDescription className="text-gray-400">
              Exchange tokens instantly on Solana
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Send</span>
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
                      <SelectValue placeholder="SOL" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#9945FF]/30">
                      <SelectItem value="sol">SOL</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="rndr">RNDR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
    
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
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
                    <title>Swap</title>
                    <path d="M7 10v4h10v-4" />
                    <path d="M17 20l-5-5-5 5" />
                    <path d="m17 4-5 5-5-5" />
                  </svg>
                </Button>
              </div>
    
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Receive</span>
                  <span className="text-sm text-gray-400">Balance: 0.00</span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                    disabled
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
                  <span className="text-gray-400">Rate</span>
                  <span>1 SOL = 57.24 USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fee</span>
                  <span>0.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
    
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
              Connect Wallet to Swap
            </Button>
          </CardFooter>
        </Card>
      );
    }
    