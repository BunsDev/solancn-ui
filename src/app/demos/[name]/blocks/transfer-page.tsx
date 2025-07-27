"use client";

import { TransferComponentDemo } from "@/components/solana/transfer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TransferContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">

      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto py-8">
            <Card className="bg-background border border-[#9945FF]/20 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-text">Transfer</CardTitle>
              </CardHeader>
              <CardContent><TransferComponentDemo /></CardContent>
            </Card>
          </div>
      </main> 
    </div>
  );
}

export default function TransferPage() {
  return (
      <TransferContent />
  );
}
