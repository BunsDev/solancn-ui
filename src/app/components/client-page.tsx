"use client";

import { ArrowLeft, Check, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Component } from "@/lib/registry";
import { getLink } from "@/lib/utils";
import type { RegistryItem } from "@/lib/types";

// Feature badges for component cards
const FeatureBadge = ({ feature }: { feature: string }) => {
  const colors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    responsive: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    animated: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    accessible: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    customizable: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
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

// Component card that displays details for each component
function ComponentCard({ component }: { component: Component }) {
  // Extract features and tags from description
  const features = component.features || [];
  const tags = component.tags || [];
  
  // Determine component category and color
  const categories = [
    { name: "Form", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    { name: "Layout", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    { name: "Navigation", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
    { name: "Display", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
    { name: "Feedback", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400" },
    { name: "Overlay", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400" },
  ];
  
  // Determine component category (could be extracted from component data in a real implementation)
  const category = component.category ? 
    categories.find(c => c.name.toLowerCase() === component.category?.toLowerCase()) || 
    categories[Math.floor(Math.random() * categories.length)] : 
    categories[Math.floor(Math.random() * categories.length)];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{component.title}</CardTitle>
        <CardDescription>{component.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className={category.color}>
            {category.name}
          </Badge>
          {features.length > 0 && (
            <div className="flex gap-1">
              {features.map((feature: string) => (
                <FeatureBadge key={feature.toLowerCase()} feature={feature} />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="bg-background text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button asChild size="sm" variant="default">
          <Link href={getLink(component as RegistryItem)}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Main client component that handles filtering and rendering
export function ComponentsClientPage({ components }: { components: Component[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredComponents, setFilteredComponents] = useState(components);
  const [categoryOpen, setCategoryOpen] = useState(false);
  
  // Extract all unique categories from components
  const uniqueCategories = Array.from(
    new Set(
      components
        .map((component) => component.category || "")
        .filter(Boolean)
    )
  ).sort();

  // Filter components based on search and category
  const filterComponents = useCallback(() => {
    let filtered = [...components];
    
    // Apply category filter if selected
    if (selectedCategory) {
      filtered = filtered.filter(
        component => component.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply search filter if term exists
    const term = searchTerm.toLowerCase();
    if (term) {
      filtered = filtered.filter(
        component => 
          component.title.toLowerCase().includes(term) || 
          component.description?.toLowerCase().includes(term) ||
          component.tags?.some((tag: string) => tag.toLowerCase().includes(term)) ||
          component.features?.some((feature: string) => feature.toLowerCase().includes(term))
      );
    }
    
    setFilteredComponents(filtered);
  }, [components, searchTerm, selectedCategory]);
  
  // Update filtered components when dependencies change
  useEffect(() => {
    filterComponents();
  }, [filterComponents]);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                {selectedCategory ? (
                  <>{selectedCategory}</>
                ) : (
                  <>Category</>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="end">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {uniqueCategories.map((category) => (
                      <CommandItem
                        key={category}
                        onSelect={() => {
                          setSelectedCategory(category);
                          setCategoryOpen(false);
                        }}
                      >
                        {category}
                        {selectedCategory === category && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {(searchTerm || selectedCategory) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="gap-1 text-muted-foreground"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Component Grid */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredComponents.map((component) => (
            <ComponentCard key={component.name} component={component} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="text-muted-foreground mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto h-12 w-12"
            >
                <title>No components found, try adjusting your search or filters</title>
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </div>
          <div className="text-xl font-medium">No components found</div>
          <div className="text-muted-foreground mt-2">
            Try adjusting your search or filters
          </div>
          <Button className="mt-4" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
      
      {/* Back Button */}
      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link href="/docs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documentation
          </Link>
        </Button>
      </div>
    </div>
  );
}
