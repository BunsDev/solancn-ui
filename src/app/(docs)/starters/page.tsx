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
  category?: "ui" | "app" | "tools" | "wallet";
  tags?: string[];
  featured?: boolean;
}

const starters: Starter[] = [
  {
    title: "Blog",
    name: "blog",
    url: "/starters/blog",
    description: "A beautiful, responsive blog starter with rich content support.",
    category: "app",
    tags: ["content", "markdown", "responsive"],
  },
  {
    title: "Dashboard",
    name: "dashboard",
    url: "/starters/dashboard",
    description: "Modern analytics dashboard with charts, tables and interactive widgets.",
    category: "app",
    tags: ["charts", "analytics", "tables"],
    featured: true,
  },
  {
    title: "DevTools",
    name: "devtools",
    url: "/starters/devtools",
    description: "Developer tools and utilities for efficient workflow.",
    category: "tools",
    tags: ["development", "utilities", "productivity"],
  },
  {
    title: "DiceBear",
    name: "dicebear",
    url: "/starters/dicebear",
    description: "Avatar generation and customization using DiceBear.",
    category: "tools",
    tags: ["avatars", "images", "generation"],
  },
  {
    title: "Docs",
    name: "docs",
    url: "/starters/docs",
    description: "Documentation site template with search and versioning support.",
    category: "app",
    tags: ["documentation", "search", "mdx"],
  },
  {
    title: "Editor",
    name: "editor",
    url: "/starters/editor",
    description: "Rich text editor with collaborative editing features.",
    category: "tools",
    tags: ["editor", "content", "collaboration"],
  },
  {
    title: "Forms",
    name: "forms",
    url: "/starters/forms",
    description: "Comprehensive form components with validation and submission handling.",
    category: "ui",
    tags: ["forms", "validation", "inputs"],
  },
  {
    title: "Landing",
    name: "landing",
    url: "/starters/landing",
    description: "Stunning landing page template with modern animations and CTAs.",
    category: "ui",
    tags: ["marketing", "hero", "animations"],
    featured: true,
  },
  {
    title: "Minimal",
    name: "minimal",
    url: "/starters/minimal",
    description: "Clean, minimal starter with essential components and styling.",
    category: "ui",
    tags: ["minimal", "lightweight", "starter"],
  },
  {
    title: "Music",
    name: "music",
    url: "/starters/music",
    description: "Music player interface with playlist management and visualizations.",
    category: "app",
    tags: ["audio", "player", "media"],
  },
  {
    title: "Photos",
    name: "photos",
    url: "/starters/photos",
    description: "Photo gallery with masonry layout and lightbox viewing.",
    category: "app",
    tags: ["gallery", "images", "lightbox"],
  },
  {
    title: "Playground",
    name: "playground",
    url: "/starters/playground",
    description: "Interactive playground for testing components and code snippets.",
    category: "tools",
    tags: ["testing", "interactive", "development"],
  },
  {
    title: "Store",
    name: "store",
    url: "/starters/store",
    description: "E-commerce store template with product listings and cart functionality.",
    category: "app",
    tags: ["ecommerce", "products", "checkout"],
    featured: true,
  },
  {
    title: "Wallet",
    name: "wallet",
    url: "/starters/wallet",
    description: "Solana wallet interface with transaction history and asset management.",
    category: "wallet",
    tags: ["crypto", "blockchain", "solana"],
    featured: true,
  },
];

const categoryIcons = {
  ui: <Layout className="w-4 h-4" />,
  app: <Globe className="w-4 h-4" />,
  tools: <Code className="w-4 h-4" />,
  wallet: <Wallet className="w-4 h-4" />,
};

export default function StartersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredStarters, setFilteredStarters] = useState<Starter[]>(starters);
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
