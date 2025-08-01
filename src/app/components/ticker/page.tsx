"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Import the component dynamically with SSR disabled
const TickerComponent = dynamic(() => import("./ticker"), {
  ssr: false,
  loading: () => <div className="p-4">Loading ticker component...</div>
});

const TickerViewComponent = dynamic(() => import("./ticker-view"), {
  ssr: false,
  loading: () => <div className="p-4">Loading ticker view component...</div>
});

export default function TickerPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Number Ticker Component</h1>
      <p className="text-lg mb-8">
        A smooth number animation ticker component for displaying numeric values with animated counting effect.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Example</CardTitle>
            <CardDescription>Simple number ticker animation from 0 to 1000</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <TickerComponent 
                value={1000} 
                duration={2000} 
                prefix="$" 
                className="text-2xl font-bold text-solana-purple" 
              />
            </Suspense>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Advanced Usage</CardTitle>
            <CardDescription>Multiple ticker examples with different configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <TickerViewComponent />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
