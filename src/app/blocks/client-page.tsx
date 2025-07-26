"use client";

import { ArrowLeft, Check, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { Block } from "@/lib/registry";

// Category definitions and their colors
const categories = [
  { name: "Dashboard", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  { name: "Marketing", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  { name: "Forms", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
  { name: "Cards", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  { name: "Authentication", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400" },
  { name: "Layout", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400" },
];

// Helper to extract tags from description
const extractTags = (description: string | undefined = "") => {
  // Extract words with # symbol
  const tags = description?.match(/#[\w-]+/g) || [];
  return tags.map(tag => tag.substring(1));
};

// Feature badges for block cards
const FeatureBadge = ({ feature }: { feature: string }) => {
  const colors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    responsive: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    animated: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  };

  // Convert feature to lowercase and use as key, with a fallback
  const colorClass = colors[feature.toLowerCase()] || "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";

  return (
    <Badge
      variant="outline"
      className={`${colorClass} font-medium`}
    >
      {feature}
    </Badge>
  );
};

// Block card component
function BlockCard({ block }: { block: Block }) {
  const category = block.category ? 
    categories.find(c => c.name.toLowerCase() === block.category?.toLowerCase()) || 
    categories[Math.floor(Math.random() * categories.length)] : 
    categories[Math.floor(Math.random() * categories.length)];
  const tags = extractTags(block.description);
  
  // Randomly assign features for demo - in production you'd get these from metadata
  const features = [];
  if (Math.random() > 0.7) features.push("New");
  if (Math.random() > 0.5) features.push("Responsive");
  if (Math.random() > 0.8) features.push("Animated");
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800">
          <Link href={`/blocks/${block.name}`} className="absolute inset-0">
            {/* Use a placeholder image - in production, you'd use actual previews */}
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <span className="text-sm">Block Preview</span>
            </div>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className={category.color}>
            {category.name}
          </Badge>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {features.map((feature) => (
                <FeatureBadge key={feature.toLowerCase()} feature={feature} />
              ))}
            </div>
          )}
        </div>
        <Link href={`/blocks/${block.name}`}>
          <CardTitle className="mb-1 text-lg hover:underline">{block.title}</CardTitle>
        </Link>
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          {block.description || "A beautiful UI block for your next web application."}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1 border-t p-3">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="bg-background text-xs">
            {tag}
          </Badge>
        ))}
        {tags.length === 0 && (
          <span className="text-xs text-muted-foreground">No tags</span>
        )}
      </CardFooter>
    </Card>
  );
}

// Client component for search and filter functionality
export function BlocksClientPage({ initialBlocks }: { initialBlocks: Block[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [blocks, setBlocks] = useState(initialBlocks);

  const filterBlocks = useCallback(() => {
    let filtered = [...initialBlocks];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        block => 
          block.title.toLowerCase().includes(term) || 
          block.description?.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategory) {
      // In production, you'd filter based on actual categories from metadata
      // This is a placeholder filtering mechanism
      const categoryIndex = categories.findIndex(c => c.name === selectedCategory);
      filtered = filtered.filter((_, idx) => idx % categories.length === categoryIndex);
    }
    
    setBlocks(filtered);
  }, [searchTerm, selectedCategory, initialBlocks]);

  useEffect(() => {
    filterBlocks();
  }, [filterBlocks]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="mb-2 text-3xl font-bold tracking-tight">UI Blocks</h1>
        <p className="text-muted-foreground">
          A collection of beautifully designed UI blocks ready for your next project.
          Browse, preview, and integrate these components seamlessly.
        </p>
      </div>

      {/* Search and filter section */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blocks..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {selectedCategory ? selectedCategory : "Filter by Category"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className="cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>{category.name}</span>
                      {selectedCategory === category.name && <Check className="h-4 w-4" />}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {(searchTerm || selectedCategory) && (
            <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear filters">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Results stats */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{blocks.length}</span> of{" "}
          <span className="font-medium text-foreground">{initialBlocks.length}</span> blocks
          {searchTerm && (
            <>
              {" "}
              for <span className="font-medium text-foreground">"{searchTerm}"</span>
            </>
          )}
          {selectedCategory && (
            <>
              {" "}
              in <span className="font-medium text-foreground">{selectedCategory}</span>
            </>
          )}
        </p>
      </div>

      {/* Blocks grid */}
      {blocks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blocks.map((block) => (
            <BlockCard key={block.name} block={block} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary/60" />
          </div>
          <h2 className="mt-4 text-xl font-medium">No blocks found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find any blocks matching your criteria.
          </p>
          <Button className="mt-6" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
