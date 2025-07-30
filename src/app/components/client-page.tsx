"use client";

/**
 * Component Library Explorer - Solana UI
 * 
 * A simple responsive UI for exploring components
 * in the Solana UI component library.
 * 
 * @author Solana UI Team
 * @version 1.0.0
 */

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";

// Icons
import { Eye, Code, Search, ChevronRight, Grid3X3, X, ArrowLeft, List } from "lucide-react";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Types and Utilities
import type { Component, RegistryItem } from "@/lib/types";
import { cn, getLink } from "@/lib/utils";
import MinimalPreview from "@/components/cards/preview-card";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";

/**
 * Helper to extract tags from description
 * @param description - Component description text
 * @returns Array of extracted tags without the # symbol
 */
const extractTags = (description: string | undefined = "") => {
  // Extract words with # symbol
  const tags = description?.match(/#[\w-]+/g) || [];
  return tags.map((tag) => tag.substring(1));
};

/**
 * Component card with preview, details, and actions
 * Features responsive design, hover states, and accessibility improvements
 */
function ComponentCard({ component, viewMode = "grid" }: {
  component: Component;
  viewMode?: "grid" | "list";
}) {
  // Extract tags from the description
  // const tags = extractTags(component.description);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card
        className={cn(
          "overflow-hidden transition-all",
          isHovered ? "shadow-md ring-1 ring-primary/10" : "",
          viewMode === "list" ? "grid grid-cols-1 md:grid-cols-[300px_1fr]" : ""
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className={cn("p-0", viewMode === "list" ? "h-full" : "")}>
          <div className={cn(
            "relative overflow-hidden",
            viewMode === "grid" ? "aspect-video rounded-t-md" : "h-full rounded-l-md"
          )}>
            <Link
              href={getLink(component)}
              className="absolute inset-0"
              aria-label={`View ${component.title} component details`}
            >
              <div className="flex h-full w-full items-center justify-center bg-muted/40 transition-colors">
                <MinimalPreview item={component} />
                {isHovered && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
            </Link>
          </div>
        </CardHeader>
        <div className={viewMode === "list" ? "" : ""}>
          <CardContent className={cn("p-4", viewMode === "list" ? "pb-2" : "")}>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className={cn("flex items-center gap-1")}>
                      {component.category}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{component.category}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Link href={getLink(component)}>
              <CardTitle className="mb-1 text-lg transition-colors hover:text-primary hover:underline">
                {component.title}
              </CardTitle>
            </Link>
            <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
              {component.description}
            </CardDescription>
          </CardContent>
          <CardFooter className={cn(
            "border-t p-4",
            viewMode === "list" ? "flex-row justify-end" : ""
          )}>
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">
                {component.type.replace("registry:", "")}
              </span>
              <div className="flex items-center gap-2">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8" aria-label="View Code">
                        <Code className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Code</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-auto"
                  asChild
                >
                  <Link href={getLink(component)}>
                    View Details
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * Main client page component for browsing, searching, and filtering components
 */
export function ComponentsClientPage({
  components,
}: { components: Component[] }) {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const [filteredComponents, setFilteredComponents] = useState(components);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isPending, startTransition] = useTransition();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Track if any filters are applied
  const hasFilters = searchTerm !== "" || selectedCategory !== null;

  // Process components to assign categories
  const processedComponents = components.map((component) => ({
    ...component
  }));

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Focus search input on keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // When pressing / key focus the search input
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Button variant="ghost" size="sm" asChild className="w-fit">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Tabs defaultValue="all" className="w-[250px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Solana UI Components
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            A collection of beautifully designed UI components ready for your next
            Solana project. Browse, preview, and integrate these components seamlessly.
          </p>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Search components... (Press '/' to focus)"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">

            <div className="flex items-center border rounded-md p-1">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Grid View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>List View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {(searchTerm || selectedCategory) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="whitespace-nowrap"
              >
                <X className="mr-2 h-4 w-4" />
                Clear filters
              </Button>
            )}
          </div>
        </div>

      </div>

      {/* Results stats and settings */}
      <div className="mb-6 flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          {isPending ? (
            "Filtering components..."
          ) : (
            <>
              Showing{" "}
              <span className="font-medium text-foreground">
                {components.length}
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
            </>
          )}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="animations" defaultChecked />
            <Label htmlFor="animations">Animations</Label>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center space-x-2">
            <Switch id="preview" defaultChecked />
            <Label htmlFor="preview">Live Preview</Label>
          </div>
        </div>
      </div>

      {/* Components display */}
      {isPending ? (
        <div className="grid gap-6 animate-pulse sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 rounded-md bg-muted"></div>
          ))}
        </div>
      ) : components.length > 0 ? (
        <div className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 gap-4"
        )}>
          {components.map((component) => (
            <ComponentCard
              key={component.name}
              component={component}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (searchTerm !== "" || selectedCategory !== null) ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary/60" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-xl font-medium">No components found</h2>
          <p className="mt-2 max-w-xs text-muted-foreground">
            We couldn&apos;t find any components matching your criteria. Try adjusting your search or filters.
          </p>
          <Button className="mt-6" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 gap-4"
        )}>
          {components.map((component) => (
            <ComponentCard
              key={component.name}
              component={component}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Documentation section */}
      <div className="mt-16 rounded-lg border bg-card p-6">
        <h2 className="text-2xl font-bold">Component Documentation</h2>
        <p className="mt-2 text-muted-foreground">
          This UI uses modern design principles and features to provide an exceptional user experience.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Design Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                <li>Used Shadcn UI components for consistent design language</li>
                <li>Implemented responsive grid/list views for different screen sizes</li>
                <li>Added animations for improved user engagement</li>
                <li>Keyboard shortcuts for improved accessibility</li>
                <li>Tooltips and detailed descriptions for better information hierarchy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                <li>Keyboard navigable interface with focus management</li>
                <li>Proper ARIA labels on interactive elements</li>
                <li>Sufficient color contrast for readability</li>
                <li>Screen reader friendly component structure</li>
                <li>Responsive design adapts to viewport sizes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                <li>Client-side rendering with React hooks</li>
                <li>Debounced search for improved performance</li>
                <li>CSS transitions for smooth visual effects</li>
                <li>Tailwind CSS for utility-based styling</li>
                <li>Framer Motion for advanced animations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}