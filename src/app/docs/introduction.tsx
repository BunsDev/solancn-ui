"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Wallet, 
  Layers, 
  Zap, 
  Paintbrush, 
  Code, 
  ArrowRight, 
  ExternalLink,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define color constants
const SOLANA_PURPLE = "#9945FF";
const SOLANA_GREEN = "#14F195";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface CodeExample {
  title: string;
  code: string;
  language: string;
}

const features: Feature[] = [
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Wallet Integration",
    description: "Seamlessly connect to Solana wallets with pre-built components and hooks.",
    color: SOLANA_PURPLE,
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Component Library",
    description: "Beautiful, accessible, and customizable UI components for modern applications.",
    color: SOLANA_GREEN,
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "High Performance",
    description: "Optimized for speed with minimal overhead and efficient rendering.",
    color: SOLANA_PURPLE,
  },
  {
    icon: <Paintbrush className="h-6 w-6" />,
    title: "Tailwind Styling",
    description: "Fully customizable with Tailwind CSS classes and design tokens.",
    color: SOLANA_GREEN,
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Developer Experience",
    description: "TypeScript support, comprehensive docs, and copy-paste ready code.",
    color: SOLANA_PURPLE,
  },
];

const codeExamples: CodeExample[] = [
  {
    title: "Wallet Connection",
    language: "tsx",
    code: `import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function WalletConnect() {
  return (
    <div className="flex items-center justify-end">
      <WalletMultiButton className="connect-wallet-btn" />
    </div>
  );
}`
  },
  {
    title: "Staking Component",
    language: "tsx",
    code: `import { StakingCard } from "@/components/staking/staking-card";

export function StakePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Stake SOL</h1>
      <StakingCard />
    </div>
  );
}`
  }
];

export default function Introduction() {
  const [activeTab, setActiveTab] = useState(0);
  const [highlightedFeature, setHighlightedFeature] = useState<number | null>(null);

  // Cycle through features for highlighting effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedFeature((prev) => {
        if (prev === null || prev >= features.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 md:p-12">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-[#9945FF]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-[#14F195]/20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Badge 
              className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" 
              variant="outline"
            >
              v1.0.0
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent"
          >
            Solancn UI
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 max-w-2xl text-lg text-zinc-300"
          >
            A beautiful, accessible component library for building modern Solana applications
            with React and Next.js.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-[#9945FF] hover:bg-[#8035e0] text-white"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
            >
              View on GitHub <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Everything You Need</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Built by developers, for developers — components that just work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={cn(
                "transition-all duration-300 border border-zinc-200 dark:border-zinc-800",
                highlightedFeature === index && "shadow-md shadow-[#9945FF]/10"
              )}
              onMouseEnter={() => setHighlightedFeature(index)}
              onMouseLeave={() => setHighlightedFeature(null)}
            >
              <CardHeader>
                <div 
                  className="mb-2 inline-flex p-2 rounded-lg"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <div style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-500 dark:text-zinc-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Easy to Implement</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Copy and paste ready-to-use components into your project.
          </p>
        </div>
        
        <Card className="overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <div className="border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium",
                    activeTab === index 
                      ? "border-b-2 border-[#9945FF] text-[#9945FF]" 
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                  )}
                >
                  {example.title}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-950 p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-300">
              <code>
                {codeExamples[activeTab].code}
              </code>
            </pre>
          </div>
        </Card>
      </section>

      {/* Getting Started */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Get Started in Minutes</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Add Solancn UI to your project with a few simple steps.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="rounded-full w-8 h-8 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">1</span>
              </div>
              <CardTitle className="text-lg">Installation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Install the package using npm, yarn, or pnpm.
              </p>
            </CardContent>
            <CardFooter>
              <code className="text-xs bg-zinc-100 dark:bg-zinc-800 p-2 rounded w-full">
                pnpm add @solancn/ui
              </code>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="rounded-full w-8 h-8 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">2</span>
              </div>
              <CardTitle className="text-lg">Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Set up your project with the Solancn UI provider.
              </p>
            </CardContent>
            <CardFooter>
              <code className="text-xs bg-zinc-100 dark:bg-zinc-800 p-2 rounded w-full">
                {"import { SolancnProvider } from '@solancn/ui'"}
              </code>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="rounded-full w-8 h-8 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">3</span>
              </div>
              <CardTitle className="text-lg">Start Building</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Import and use components in your project.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full bg-[#14F195] hover:bg-[#10d681] text-zinc-900">
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Why Choose Solancn UI?</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Built from the ground up with developer experience in mind.
            </p>
          </div>
          
          <div className="space-y-4">
            {
              [
                "Modern, responsive design following Solana brand guidelines",
                "Fully typed TypeScript components with proper interfaces",
                "Accessibility built-in, following WCAG guidelines",
                "Optimized performance with minimal re-renders",
                "Consistent theming with Tailwind CSS and CSS variables",
                "Comprehensive documentation with examples"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#14F195]" />
                  <p>{item}</p>
                </div>
              ))
            }
          </div>
          
          <div className="flex justify-center pt-4">
            <Button 
              size="lg" 
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800 text-zinc-900 dark:text-zinc-300"
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}