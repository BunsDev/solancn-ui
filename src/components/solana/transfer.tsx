"use client";

import { useState } from "react";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useWallet } from "@solana/wallet-adapter-react";

export default function TransferComponent() {
  const { connected } = useWallet();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [token, setToken] = useState<string>("sol");
  const [priority, setPriority] = useState<number>(1);
  const [memo, setMemo] = useState<string>("");
  const [recentAddresses] = useState([
    { address: "6Hj8...rfGo", name: "Alice", date: "2 days ago" },
    { address: "7Ko9...wPr1", name: "Bob's Wallet", date: "3 days ago" },
    { address: "4Mn5...9jKl", name: "Work Account", date: "1 week ago" },
  ]);
  const [includeDecompress, setIncludeDecompress] = useState<boolean>(false);
  const [lookupTable, setLookupTable] = useState<boolean>(false);

  // Calculate estimated fee based on priority
  const estimatedFee = 0.000005 + priority * 0.000005;

  // Calculate maximum amount based on token
  const maxAmount = token === "sol" ? 1.5 : token === "usdc" ? 100 : 5;

  // Handle max button click
  const handleSetMax = () => {
    // Reserve some SOL for fees
    if (token === "sol") {
      setAmount((maxAmount - estimatedFee).toFixed(5));
    } else {
      setAmount(maxAmount.toString());
    }
  };

  // Handle transfer
  const handleTransfer = () => {
    alert(`Transfer ${amount} ${token.toUpperCase()} to ${recipient}`);
    // Implement actual transfer logic here
  };

  return (
    <Card className="w-full bg-black text-white border border-[#9945FF]/20">
      <CardHeader className="border-b border-[#9945FF]/20">
        <CardTitle className="text-[#14F195]">Transfer</CardTitle>
        <CardDescription className="text-gray-400">
          Send tokens to another wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="recipient" className="text-sm font-medium">
              Recipient
            </label>
            <div className="relative">
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Address or .sol domain"
                className="bg-black border-[#9945FF]/30 focus:border-[#9945FF] pr-20"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 text-[#9945FF]"
                aria-label="Scan QR code"
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
                  aria-hidden="true"
                >
                  <rect width="6" height="6" x="4" y="4" rx="1" />
                  <rect width="6" height="6" x="14" y="4" rx="1" />
                  <rect width="6" height="6" x="4" y="14" rx="1" />
                  <path d="M14 14h.01" />
                  <path d="M14 18h.01" />
                  <path d="M18 14h.01" />
                  <path d="M18 18h.01" />
                </svg>
                Scan
              </Button>
            </div>
          </div>

          {recipient && (
            <div className="bg-[#9945FF]/10 p-3 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195]" />
                  <div className="text-sm">Unknown Address</div>
                </div>
                <div className="text-xs text-gray-400">First transfer</div>
              </div>
            </div>
          )}

          {recentAddresses.length > 0 && !recipient && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Recent</div>
              <div className="space-y-1">
                {recentAddresses.map((addr) => (
                  <button
                    key={addr.address}
                    type="button"
                    className="w-full flex items-center justify-between p-2 hover:bg-[#9945FF]/10 rounded-md cursor-pointer text-left"
                    onClick={() => setRecipient(addr.address)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195]" />
                      <div>
                        <div className="text-sm">{addr.name}</div>
                        <div className="text-xs text-gray-400">
                          {addr.address}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{addr.date}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <span className="text-xs text-gray-400">
                Balance: {maxAmount.toFixed(token === "sol" ? 5 : 2)}{" "}
                {token.toUpperCase()}
              </span>
            </div>
            <div className="flex space-x-2">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
              />
              <Select value={token} onValueChange={setToken}>
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
            <div className="flex justify-end">
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-[#9945FF]"
                onClick={handleSetMax}
              >
                Max
              </Button>
            </div>
          </div>

          <Tabs defaultValue="quick" className="w-full">
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="memo" className="text-sm font-medium">
                    Memo (optional)
                  </label>
                  <Input
                    id="memo"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="Add a note to this transfer"
                    className="bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Transaction Priority
                    </span>
                    <span className="text-xs text-[#14F195]">
                      ~{estimatedFee.toFixed(6)} SOL fee
                    </span>
                  </div>
                  <Slider
                    value={[priority]}
                    onValueChange={(value) => setPriority(value[0])}
                    min={0}
                    max={2}
                    step={1}
                    className="[&>span]:bg-[#9945FF]"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Standard</span>
                    <span>Priority</span>
                    <span>High Priority</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="decompress" className="text-sm">
                        Include state decompression
                      </Label>
                      <div className="text-xs text-gray-400">
                        For specific tokens requiring decompression
                      </div>
                    </div>
                    <Switch
                      id="decompress"
                      checked={includeDecompress}
                      onCheckedChange={setIncludeDecompress}
                      className="data-[state=checked]:bg-[#14F195]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="lookup-table" className="text-sm">
                        Use address lookup table
                      </Label>
                      <div className="text-xs text-gray-400">
                        Reduce transaction size using lookup tables
                      </div>
                    </div>
                    <Switch
                      id="lookup-table"
                      checked={lookupTable}
                      onCheckedChange={setLookupTable}
                      className="data-[state=checked]:bg-[#14F195]"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>

      <CardFooter className="border-t border-[#9945FF]/20 pt-4">
        <Button
          className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
          onClick={handleTransfer}
          disabled={!connected || !recipient || !amount || Number(amount) <= 0}
        >
          {connected ? "Send" : "Connect Wallet to Send"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export const transfer = {
  name: "transfer",
  components: {
    Default: <TransferComponent />,
  },
};
