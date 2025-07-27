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
import { useWallet } from "@solana/wallet-adapter-react";
import { TransferComponent } from "@/components/transfer/transfer-component";

export default function TransferPage() {
    const { connected } = useWallet();
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [token, setToken] = useState<string>("sol");
    // const [priority, setPriority] = useState<number>(1);
    // const [memo, setMemo] = useState<string>("");

    // Calculate estimated fee based on priority
    // const estimatedFee = 0.000005 + priority * 0.000005;

    // // Calculate maximum amount based on token
    // const maxAmount = token === "sol" ? 1.5 : token === "usdc" ? 100 : 5;

    // // Handle max button click
    // // const handleSetMax = () => {
    // //     // Reserve some SOL for fees
    // //     if (token === "sol") {
    // //         setAmount((maxAmount - estimatedFee).toFixed(5));
    // //     } else {
    // //         setAmount(maxAmount.toString());
    // //     }
    // // };

    // Handle transfer
    const handleTransfer = () => {
        alert(`Transfer ${amount} ${token.toUpperCase()} to ${recipient}`);
        // Implement actual transfer logic here
    };

    return (
        <Card className="w-full bg-background text-text border border-[#9945FF]/20">
            <CardHeader className="border-b border-[#9945FF]/20">
                <CardTitle className="text-[#14F195]">Transfer</CardTitle>
                <CardDescription className="text-gray-400">
                    Send tokens to another wallet
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
            <TransferComponent />
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