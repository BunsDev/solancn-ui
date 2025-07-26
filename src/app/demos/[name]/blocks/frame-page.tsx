"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FrameComponent } from "@/components/solana/frame";

function FrameContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">

      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto py-8">
            <Card className="bg-background border border-[#9945FF]/20 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-text">Solana Frames</CardTitle>
              </CardHeader>
              <CardContent><FrameComponent /></CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}

export default function FramePage() {
  return (
    <FrameContent />
  );
}
