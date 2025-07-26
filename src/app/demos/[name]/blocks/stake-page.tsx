"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StakeComponent } from "@/components/solana/stake";

function StakeContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto py-8">
          <div className="max-w-md mx-auto">
            <Card className="bg-background border border-[#9945FF]/20">
              <CardHeader>
                <CardTitle className="text-text">Staking</CardTitle>
              </CardHeader>
              <CardContent>
                <StakeComponent />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function StakePage() {
  return (
    <StakeContent />
  );
}
