import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReceiveComponent() {
  return (
    <Card className="w-[400px] bg-black text-white border border-[#9945FF]/20">
      <CardHeader className="border-b border-[#9945FF]/20">
        <CardTitle className="text-[#14F195]">Receive</CardTitle>
        <CardDescription className="text-gray-400">
          Receive tokens to your wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-white p-2 rounded-lg mb-4">
              {/* QR Code placeholder */}
              <div className="w-full h-full bg-[#9945FF]/10 flex items-center justify-center">
                <div className="text-black font-bold">QR Code</div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-sm text-gray-400">Your Solana Address</div>
              <div className="bg-[#9945FF]/10 rounded-lg p-2 flex items-center justify-between">
                <code className="text-sm font-mono text-gray-300 truncate max-w-[200px]">
                  E1chcuGUQgH9bZ3Rm3zM9yobaKP9bLq9yQ3
                </code>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#14F195"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>Copy Address</title>
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c0 1.1.9 2 2 2h2" />
                    <path d="M4 12c0-1.1.9-2 2-2h2" />
                    <path d="M12 4c-1.1 0-2 .9-2 2v2" />
                    <path d="M16 4c1.1 0 2 .9 2 2v2" />
                  </svg>
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
              >
                Copy Address
              </Button>
            </div>
          </div>

          <Tabs defaultValue="request" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black border border-[#9945FF]/30">
              <TabsTrigger
                value="request"
                className="data-[state=active]:bg-[#9945FF]/20"
              >
                Request Payment
              </TabsTrigger>
              <TabsTrigger
                value="domain"
                className="data-[state=active]:bg-[#9945FF]/20"
              >
                Solana Domain
              </TabsTrigger>
            </TabsList>

            <TabsContent value="request" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                  />
                  <Select defaultValue="sol">
                    <SelectTrigger className="w-[120px] bg-black border-[#9945FF]/30">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#9945FF]/30">
                      <SelectItem value="sol">SOL</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="rndr">RNDR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="memo" className="text-sm font-medium">
                  Memo (optional)
                </label>
                <Input
                  id="memo"
                  placeholder="What's this payment for?"
                  className="bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                />
              </div>

              <Button className="w-full bg-[#14F195] text-black hover:bg-[#14F195]/90">
                Generate Payment Link
              </Button>
            </TabsContent>

            <TabsContent value="domain" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Get a Solana Domain</div>
                <p className="text-sm text-gray-400">
                  Replace your complex address with a human-readable name.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="domain-name" className="text-sm font-medium">
                  Check domain availability
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="domain-name"
                    placeholder="yourname"
                    className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                  />
                  <Select defaultValue=".sol">
                    <SelectTrigger className="w-[100px] bg-black border-[#9945FF]/30">
                      <SelectValue placeholder=".sol" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#9945FF]/30">
                      <SelectItem value=".sol">.sol</SelectItem>
                      <SelectItem value=".backpack">.backpack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-[#9945FF] hover:bg-[#9945FF]/90">
                Check Availability
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="border-t border-[#9945FF]/20 pt-4">
        <div className="w-full flex justify-between text-sm">
          <Button
            variant="link"
            className="p-0 h-auto text-[#9945FF] hover:text-[#9945FF]/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <title>Share Address</title>
              <path d="m9 18 6-6-6-6" />
            </svg>
            Share Address
          </Button>
          <Button
            variant="link"
            className="p-0 h-auto text-[#9945FF] hover:text-[#9945FF]/90"
          >
            Connect Wallet
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <title>Connect Wallet</title>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
