"use client";

import type React from "react";
import { BridgeComponent } from "@/components/bridge/bridge-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BridgeContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto py-8">
          <BridgeComponent />
        </div>
      </main>
    </div>
  );
}

// Export the component directly
export default function BridgeDemo() {
  return <BridgeContent />;
}