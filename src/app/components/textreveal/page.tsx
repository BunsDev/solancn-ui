"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Import the component dynamically with SSR disabled
const TextRevealComponent = dynamic(() => import("./textreveal"), {
  ssr: false,
  loading: () => <div className="p-4">Loading text reveal component...</div>
});

export default function TextRevealPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Text Reveal Animation</h1>
      <p className="text-lg mb-8">
        A smooth text reveal animation component with staggered word animations using Framer Motion.
      </p>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Text Reveal Example</CardTitle>
            <CardDescription>Words appear with a smooth blur-to-clear animation</CardDescription>
          </CardHeader>
          <CardContent className="min-h-48 flex items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <TextRevealComponent />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
