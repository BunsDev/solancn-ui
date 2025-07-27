"use client";

import { LendComponent } from "@/components/lend/lend-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LendContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <main className="flex-1 p-2 flex flex-col w-full">
        <Card className="bg-background border border-[#9945FF]/20 max-w-screen">
          <CardHeader>
            <CardTitle className="text-text">Lend Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <LendComponent />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function LendPage() {
  return <LendContent />;
}
