"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Import the component dynamically with SSR disabled
const LetterGlitchComponent = dynamic(() => import("./letter-glitch"), {
  ssr: false,
  loading: () => <div className="p-4">Loading letter glitch component...</div>
});

export default function LetterGlitchPage() {
  // Solana brand colors
  const solanaColors = ["#9945FF", "#14F195", "#000000"];
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Letter Glitch Effect</h1>
      <p className="text-lg mb-8">
        A canvas-based letter glitch animation effect with configurable colors and animation speed.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Solana Themed</CardTitle>
            <CardDescription>Letter glitch animation with Solana brand colors</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <Suspense fallback={<div>Loading...</div>}>
              <LetterGlitchComponent 
                // glitchColors={solanaColors}
                // glitchSpeed={2}
                // smooth={true}
              />
            </Suspense>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vignette Effect</CardTitle>
            <CardDescription>Letter glitch with center vignette effect</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <Suspense fallback={<div>Loading...</div>}>
              <LetterGlitchComponent 
                // glitchColors={["#14F195", "#9945FF", "#666666"]}
                // glitchSpeed={3}
                // smooth={true}
                // centerVignette={true}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
