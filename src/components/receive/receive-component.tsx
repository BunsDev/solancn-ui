"use client";

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
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { toast } from "sonner";

export const ReceiveComponent: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("sol");
  const [memo, setMemo] = useState<string>("");
  const [domainName, setDomainName] = useState<string>("");
  const [domainExtension, setDomainExtension] = useState<string>(".sol");

  // Copy wallet address to clipboard
  const copyAddress = () => {
    if (!publicKey) return;

    navigator.clipboard
      .writeText(publicKey.toString())
      .then(() => toast.success("Address copied to clipboard"))
      .catch(() => toast.error("Failed to copy address"));
  };

  // Generate payment link with amount and token
  const generatePaymentLink = () => {
    if (!publicKey || !amount) return;

    let paymentUrl = `solana:${publicKey.toString()}?amount=${amount}&spl-token=${selectedToken}`;
    if (memo) paymentUrl += `&memo=${encodeURIComponent(memo)}`;

    navigator.clipboard
      .writeText(paymentUrl)
      .then(() => toast.success("Payment link copied to clipboard"))
      .catch(() => toast.error("Failed to copy payment link"));
  };

  // Check domain availability
  const checkDomainAvailability = () => {
    if (!domainName) return;
    toast.info(`Checking availability for ${domainName}${domainExtension}...`);
    // In a real app, this would make an API call to check domain availability
  };

  return (
    <Card className="w-full bg-background text-text border border-[#9945FF]/20">
      <CardHeader className="border-b border-[#9945FF]/20">
        <CardTitle className="text-[#14F195]">Receive</CardTitle>
        <CardDescription className="text-gray-400">
          Receive tokens to your wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-background p-2 rounded-lg mb-4">
              {/* QR Code placeholder */}
              <div className="w-full h-full bg-[#9945FF]/10 flex items-center justify-center">
                <div className="text-black font-bold">QR Code</div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-sm text-gray-400">Your Solana Address</div>
              <div className="bg-[#9945FF]/10 rounded-lg p-2 flex items-center justify-between">
                {connected && publicKey ? (
                  <>
                    <code className="text-sm font-mono text-gray-300 truncate max-w-[200px]">
                      {publicKey.toString().slice(0, 12)}...
                      {publicKey.toString().slice(-8)}
                    </code>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={copyAddress}
                      aria-label="Copy address"
                    >
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
                        aria-hidden="true"
                      >
                        <rect
                          width="14"
                          height="14"
                          x="8"
                          y="8"
                          rx="2"
                          ry="2"
                        />
                        <path d="M4 16c0 1.1.9 2 2 2h2" />
                        <path d="M4 12c0-1.1.9-2 2-2h2" />
                        <path d="M12 4c-1.1 0-2 .9-2 2v2" />
                        <path d="M16 4c1.1 0 2 .9 2 2v2" />
                      </svg>
                    </Button>
                  </>
                ) : (
                  <code className="text-sm font-mono text-gray-300 w-full text-center">
                    Connect wallet to view
                  </code>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                onClick={copyAddress}
                disabled={!connected || !publicKey}
              >
                Copy Address
              </Button>
            </div>
          </div>

          <Tabs defaultValue="request" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-background border border-[#9945FF]/30">
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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                  />
                  <Select
                    defaultValue="sol"
                    value={selectedToken}
                    onValueChange={setSelectedToken}
                  >
                    <SelectTrigger className="w-[120px] bg-background border-[#9945FF]/30">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-[#9945FF]/30">
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
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="What's this payment for?"
                  className="bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                />
              </div>

              <Button
                className="w-full bg-[#14F195] text-black hover:bg-[#14F195]/90"
                onClick={generatePaymentLink}
                disabled={!connected || !amount || Number(amount) <= 0}
              >
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
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    className="flex-1 bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                  />
                  <Select
                    defaultValue=".sol"
                    value={domainExtension}
                    onValueChange={setDomainExtension}
                  >
                    <SelectTrigger className="w-[100px] bg-background border-[#9945FF]/30">
                      <SelectValue placeholder=".sol" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-[#9945FF]/30">
                      <SelectItem value=".sol">.sol</SelectItem>
                      <SelectItem value=".backpack">.backpack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                className="w-full bg-[#9945FF] hover:bg-[#9945FF]/90"
                onClick={checkDomainAvailability}
                disabled={!domainName}
              >
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
          {!connected ? (
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
                <path d="M19 14v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6" />
                <polyline points="12 10 12 2" />
                <polyline points="18 8 12 2 6 8" />
              </svg>
            </Button>
          ) : (
            <Button
              variant="link"
              className="p-0 h-auto text-gray-400 hover:text-text"
              disabled
            >
              Connected
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export const receive = {
  name: "receive",
  components: {
    Default: <ReceiveComponent />,
  },
};
