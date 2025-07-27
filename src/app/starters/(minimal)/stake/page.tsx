"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StakeComponent } from "@/components/stake/stake-component";

function StakeContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <main className="flex-1 p-2 flex flex-col w-full">
        <Card className="bg-background border border-[#9945FF]/20 max-w-screen">
          <CardHeader>
            <CardTitle className="text-text">Stake Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <StakeComponent />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function StakeDemo() {
  return <StakeContent />;
}
