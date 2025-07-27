"use client";

import { TradingComponent } from "@/components/trading/trading-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TradingContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <main className="flex-1 p-2 flex flex-col w-full">
        <Card className="bg-background border border-[#9945FF]/20 max-w-screen">
          <CardHeader>
            <CardTitle className="text-text">Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <TradingComponent />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function TradingPage() {
  return <TradingContent />;
}
