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
import type { Category, RegistryItem, UIPrimitive } from "@/lib/types";
import { getLink } from "@/lib/utils";
import { getCategory } from "@/lib/registry/getCategory";
import MinimalPreview from "@/components/cards/preview-card";

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

// UI primitive card component
function UIPrimitiveCard({ primitive }: { primitive: UIPrimitive }) {
  // Extract tags from the description
  const tags = extractTags(primitive.description);
  const category = getCategory(primitive as RegistryItem);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-md">
          <Link href={getLink(primitive)} className="absolute inset-0">
            <div className="flex h-full w-full items-center justify-center">
              <MinimalPreview item={primitive} />
            </div>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className={primitive.categoryColor}>
            {primitive.categoryName}
          </Badge>
        </div>
        <Link href={getLink(primitive)}>
          <CardTitle className="mb-1 text-lg hover:underline">
            {primitive.title || primitive.name}
          </CardTitle>
        </Link>
        <div className="text-sm text-muted-foreground">
          {primitive.description}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {primitive.type.replace("registry:", "")}
          </span>
          <Button size="sm" variant="outline" className="ml-auto" asChild>
            <Link href={getLink(primitive)}>View Primitive</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Client component for search and filter functionality
export function UIPrimitivesClientPage({
  primitives,
}: { primitives: UIPrimitive[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPrimitives, setFilteredPrimitives] = useState(primitives);

  // Process primitives to assign categories
  const processedPrimitives = primitives.map((primitive) => ({
    ...primitive,
    category: primitive.category || getCategory(primitive as RegistryItem),
  }));

  // Filter primitives based on search term and category
  const filterPrimitives = useCallback(() => {
    let filtered = [...processedPrimitives];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (primitive) =>
          primitive.name.toLowerCase().includes(term) ||
          primitive.description?.toLowerCase().includes(term) ||
          extractTags(primitive.description).some((tag) =>
            tag.toLowerCase().includes(term),
          ),
      );
    }

    // Apply category filter
    if (selectedCategory) {
      const categoryObj = categories.find((c) => c.name === selectedCategory);
      if (categoryObj) {
        filtered = filtered.filter(
          (primitive) => primitive.category === categoryObj.id,
        );
      }
    }

    setFilteredPrimitives(
      filtered.map((primitive) => ({
        ...primitive,
        category: getCategory(primitive as RegistryItem).name,
      })),
    );
  }, [searchTerm, selectedCategory, processedPrimitives]);

  // Apply filters when dependencies change
  useEffect(() => {
    filterPrimitives();
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
          UI Primitives
        </h1>
        <p className="text-muted-foreground">
          A collection of beautifully designed UI primitives ready for your next
          project. Browse, preview, and integrate these primitives seamlessly.
        </p>
      </div>

      {/* Search and filter section */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search primitives..."
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
                {selectedCategory || "Filter by Category"}
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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={clearFilters}
                className="cursor-pointer"
              >
                <div className="flex w-full items-center gap-2">
                  <X className="h-4 w-4" />
                  <span>Clear filters</span>
                </div>
              </DropdownMenuItem>
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
            {filteredPrimitives.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {primitives.length}
          </span>{" "}
          primitives
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

      {/* Primitives grid */}
      {filteredPrimitives.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPrimitives.map((primitive) => (
            <UIPrimitiveCard key={primitive.name} primitive={primitive} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary/60" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-xl font-medium">No primitives found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find any primitives matching your criteria.
          </p>
          <Button className="mt-6" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
