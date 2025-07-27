"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Code, Layout, Globe, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ComponentCard } from "@/components/docs/component-card";

interface Starter {
  title: string;
  name: string;
  url: string;
  description?: string;
  category?: "ui" | "app" | "tools" | "wallet" | "blank" | "dashboard" | "borrow" | "bridge" | "defi" | "frame" | "lend" | "nft" | "portfolio" | "receive" | "solana" | "stake" | "trading" | "transfer";
  tags?: string[];
  featured?: boolean;
}

const starters: Starter[] = [
  {
    title: "Blank",
    name: "blank",
    url: "/starters/blank",
    description: "A blank starter with essential components and styling.",
    category: "blank",
    tags: ["blank", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Dashboard",
    name: "dashboard",
    url: "/starters/dashboard",
    description: "A dashboard starter with essential components and styling.",
    category: "dashboard",
    tags: ["dashboard", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Borrow",
    name: "borrow",
    url: "/starters/borrow",
    description: "A borrow starter with essential components and styling.",
    category: "borrow",
    tags: ["borrow", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Bridge",
    name: "bridge",
    url: "/starters/bridge",
    description: "A bridge starter with essential components and styling.",
    category: "bridge",
    tags: ["bridge", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Defi",
    name: "defi",
    url: "/starters/defi",
    description: "A defi starter with essential components and styling.",
    category: "defi",
    tags: ["defi", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Frame",
    name: "frame",
    url: "/starters/frame",
    description: "A frame starter with essential components and styling.",
    category: "frame",
    tags: ["frame", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Lend",
    name: "lend",
    url: "/starters/lend",
    description: "A lend starter with essential components and styling.",
    category: "lend",
    tags: ["lend", "solana", "crypto"],
    featured: true,
  },
  {
    title: "NFT",
    name: "nft",
    url: "/starters/nft",
    description: "A nft starter with essential components and styling.",
    category: "nft",
    tags: ["nft", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Portfolio",
    name: "portfolio",
    url: "/starters/portfolio",
    description: "A portfolio starter with essential components and styling.",
    category: "portfolio",
    tags: ["portfolio", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Receive",
    name: "receive",
    url: "/starters/receive",
    description: "A receive starter with essential components and styling.",
    category: "receive",
    tags: ["receive", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Solana",
    name: "solana",
    url: "/starters/solana",
    description: "A solana starter with essential components and styling.",
    category: "solana",
    tags: ["solana", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Stake",
    name: "stake",
    url: "/starters/stake",
    description: "A stake starter with essential components and styling.",
    category: "stake",
    tags: ["stake", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Trading",
    name: "trading",
    url: "/starters/trading",
    description: "A trading starter with essential components and styling.",
    category: "trading",
    tags: ["trading", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Transfer",
    name: "transfer",
    url: "/starters/transfer",
    description: "A transfer starter with essential components and styling.",
    category: "transfer",
    tags: ["transfer", "solana", "crypto"],
    featured: true,
  },
  {
    title: "Wallet",
    name: "wallet",
    url: "/starters/wallet",
    description: "A wallet starter with essential components and styling.",
    category: "wallet",
    tags: ["wallet", "solana", "crypto"],
    featured: true,
  },
];

const categoryIcons = {
  ui: <Layout className="w-4 h-4" />,
  app: <Globe className="w-4 h-4" />,
  tools: <Code className="w-4 h-4" />,
  blank: <Layout className="w-4 h-4" />,
  dashboard: <Globe className="w-4 h-4" />,
  borrow: <Code className="w-4 h-4" />,
  bridge: <Layout className="w-4 h-4" />,
  defi: <Globe className="w-4 h-4" />,
  frame: <Code className="w-4 h-4" />,
  lend: <Layout className="w-4 h-4" />,
  nft: <Globe className="w-4 h-4" />,
  portfolio: <Code className="w-4 h-4" />,
  receive: <Layout className="w-4 h-4" />,
  solana: <Globe className="w-4 h-4" />,
  stake: <Code className="w-4 h-4" />,
  trading: <Layout className="w-4 h-4" />,
  transfer: <Globe className="w-4 h-4" />,
  wallet: <Code className="w-4 h-4" />,
};

export default function StartersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredStarters, setFilteredStarters] = useState<Starter[]>(
    starters,
  );
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Filter starters based on search query and active tab
  useEffect(() => {
    let filtered = starters;
    
    if (activeTab !== "all") {
      filtered = filtered.filter(starter => starter.category === activeTab);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(starter => 
        starter.title.toLowerCase().includes(query) || 
        starter.description?.toLowerCase().includes(query) ||
        starter.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredStarters(filtered);
  }, [searchQuery, activeTab]);

  if (!mounted) return null;
  
  // Get featured starters
  const featuredStarters = starters.filter(starter => starter.featured);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-primary/20 to-background mb-8">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Solana UI Starters
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Launch your next Solana project with our professionally designed starter templates.
            Built with React, Next.js, and Tailwind CSS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search starters..."
                className="pl-10 bg-background/80 backdrop-blur-sm border-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Main Content */}
      <div className="container px-4 pb-20">
        {/* Featured Section */}
        {featuredStarters.length > 0 && searchQuery === "" && activeTab === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6">Featured Starters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {featuredStarters.map((starter, index) => (
                <motion.div
                  key={starter.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="relative group overflow-hidden rounded-xl border border-primary/20 bg-black/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="secondary" className="bg-primary/20 text-white">
                        Featured
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        {categoryIcons[starter.category || 'ui']}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{starter.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{starter.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {starter.tags?.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild className="w-full mt-2">
                        <Link href={starter.url}>
                          View {starter.title}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* All Starters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col w-full bg-background sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold">{searchQuery ? 'Search Results' : 'All Starters'}</h2>
            
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-background/80 backdrop-blur-sm border border-border">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="ui">UI</TabsTrigger>
                <TabsTrigger value="app">Apps</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredStarters.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-muted-foreground">
                No starters found matching your criteria
              </h3>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2 w-full h-full">
              {filteredStarters.map((starter, index) => (
                <motion.div
                  key={starter.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="group"
                >
                  <div className="h-full flex flex-col rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-all duration-300">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-md bg-primary/10">
                          {categoryIcons[starter.category || 'ui']}
                        </div>
                        {starter.category && (
                          <Badge variant="outline" className="capitalize">
                            {starter.category}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {starter.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">
                        {starter.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {starter.tags?.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-muted/50 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <ComponentCard
                        key={starter.name}
                        name={starter.name}
                        baseUrl={process.env.VERCEL_BRANCH_URL ?? ""}
                        title={starter.title}
                        promptTitle={`${starter.title ?? ""} Starter Kit`}
                        previewUrl={starter.url}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
