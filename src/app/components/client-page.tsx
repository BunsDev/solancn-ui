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
import type { Component } from "@/lib/types";
import type { RegistryItem } from "@/lib/types";
import { getLink } from "@/lib/utils";
import { getCategory } from "@/lib/registry/getCategory";

// Category definitions with their display names and colors
const categories = [
  {
    id: "dashboard",
    name: "Dashboard",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "marketing",
    name: "Marketing",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    id: "forms",
    name: "Forms",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    id: "cards",
    name: "Cards",
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    id: "authentication",
    name: "Authentication",
    color:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  {
    id: "layout",
    name: "Layout",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    id: "navigation",
    name: "Navigation",
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
  {
    id: "feedback",
    name: "Feedback",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  {
    id: "overlays",
    name: "Overlays",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    id: "data",
    name: "Data Display",
    color: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400",
  },
];

// Helper to extract tags from description
const extractTags = (description: string | undefined = "") => {
  // Extract words with # symbol
  const tags = description?.match(/#[\w-]+/g) || [];
  return tags.map((tag) => tag.substring(1));
};

// Component card component
function ComponentCard({ component }: { component: Component }) {
  // Assign category to this component
  const categoryId =
    component.category || getCategory(component as RegistryItem);
  const category =
    categories.find((c) => c.id === categoryId) ||
    categories.find((c) => c.id === "layout");

  // Get tags from description
  const tags = extractTags(component.description);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative h-44 w-full bg-slate-200 dark:bg-slate-950">
          <Link
            href={getLink(component as RegistryItem)}
            className="absolute inset-0"
          >
            {/* Use a placeholder image - in production, you'd use actual previews */}
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <span className="text-lg font-semibold">
                {component.title} Component
              </span>
            </div>{" "}
            {/* <Image
                src={component.preview || "/placeholder.png"}
                alt={component.title}
                width={500}
                height={500}
              /> */}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className={category?.color || ""}>
            {category?.name || "Layout"}
          </Badge>
        </div>
        <Link href={getLink(component as RegistryItem)}>
          <CardTitle className="mb-1 text-lg hover:underline">
            {component.title}
          </CardTitle>
        </Link>
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          {component.description ||
            "A beautiful UI component for your next web application."}
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
export function ComponentsClientPage({
  components,
}: { components: Component[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredComponents, setFilteredComponents] = useState(components);

  // Process components to assign categories
  const processedComponents = components.map((component) => ({
    ...component,
    category: component.category || getCategory(component as RegistryItem),
  }));

  // Filter components based on search term and category
  const filterComponents = useCallback(() => {
    let filtered = [...processedComponents];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (component) =>
          component.name.toLowerCase().includes(term) ||
          component.description?.toLowerCase().includes(term) ||
          extractTags(component.description).some((tag) =>
            tag.toLowerCase().includes(term),
          ),
      );
    }

    // Apply category filter
    if (selectedCategory) {
      const categoryObj = categories.find((c) => c.name === selectedCategory);
      if (categoryObj) {
        filtered = filtered.filter(
          (component) => component.category === categoryObj.id,
        );
      }
    }

    setFilteredComponents(filtered);
  }, [searchTerm, selectedCategory, processedComponents]);

  // Apply filters when dependencies change
  useEffect(() => {
    filterComponents();
  }, [searchTerm, selectedCategory]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };

  return (
    <div className="p-5 md:p-10">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/docs">
            <ArrowLeft className="mr-2 size-4" />
            Documentation
          </Link>
        </Button>

        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          UI Components
        </h1>
        <p className="text-muted-foreground">
          A collection of beautifully designed UI components ready for your next
          project. Browse, preview, and integrate these components seamlessly.
        </p>
      </div>

      {/* Search and filter section */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
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
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className="cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>{category.name}</span>
                      {selectedCategory === category.name && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {(searchTerm || selectedCategory) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              title="Clear filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Results stats */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {filteredComponents.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {components.length}
          </span>{" "}
          components
          {searchTerm && (
            <>
              {" "}
              for{" "}
              <span className="font-medium text-foreground">
                "{searchTerm}"
              </span>
            </>
          )}
          {selectedCategory && (
            <>
              {" "}
              in{" "}
              <span className="font-medium text-foreground">
                {selectedCategory}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Components grid */}
      {filteredComponents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredComponents.map((component) => (
            <ComponentCard key={component.name} component={component} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary/60" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-xl font-medium">No components found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find any components matching your criteria.
          </p>
          <Button className="mt-6" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
