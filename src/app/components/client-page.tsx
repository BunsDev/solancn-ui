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

import { useState } from "react";
import Link from "next/link";

// Icons
import { Eye, Code } from "lucide-react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
import { Component } from "@/lib/types";

// Utils
import { cn, getLink } from "@/lib/utils";
import MinimalPreview from "@/components/cards/preview-card";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";

/**
 * ComponentCard - Card component for displaying a component with preview
 */
function ComponentCard({
  component,
}: {
  component: Component;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all h-[330px]",
        isHovered && "ring-2 ring-primary ring-offset-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Preview overlay that shows on hover */}
      <div
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity",
          isHovered && "opacity-100"
        )}
      >
        <div className="space-x-2 text-center">
          <Button asChild size="sm">
            <Link href={`/docs/${component.name}`} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View Documentation
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={getLink(component)} className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              View Code
            </Link>
          </Button>
        </div>
      </div>

      {/* Component preview */}
      <div className="relative flex items-center justify-center overflow-hidden border-b p-6 h-40">
        <MinimalPreview item={component} />
      </div>

      <div className="flex flex-col">
        <CardHeader className="px-4 pb-2 pt-4">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="line-clamp-1 text-lg">
              {component.title || component.name}
            </CardTitle>
            {component.category && (
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {component.category}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{component.category}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
            {component.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-t p-4">
          <div className="flex w-full flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1">
              <span className="font-medium">{component.files?.length || 1}</span> file{(Number(component.files?.length) || 1) > 1 && "s"}
            </div>
            <div className="flex items-center gap-1">
              {component.installed ? (
                <span className="flex items-center gap-1 font-medium text-green-500">Installed</span>
              ) : (
                <span className="flex items-center gap-1 text-muted-foreground">Not installed</span>
              )}
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

/**
 * Main client page component for browsing components
 */
export function ComponentsClientPage({
  components,
}: { components: Component[] }) {
  return (
    <div className="container mx-auto py-6 lg:py-10">
      {/* Page header */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Components Library</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Explore our collection of responsive and accessible UI components.
            </p>
          </div>
        </div>
      </div>

      {/* Components display */}
      <div className="mt-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {components.map((component) => (
            <ComponentCard
              key={component.name}
              component={component}
            />
          ))}
        </div>
      </div>

      <hr className="my-12 border-t" />

      {/* Documentation section */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Documentation</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Design Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                <li>Used Shadcn UI components for consistent design language</li>
                <li>Implemented responsive grid layout for different screen sizes</li>
                <li>Simple and focused component display</li>
                <li>Clear visual hierarchy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                <li>Keyboard navigable interface</li>
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
                <li>Client-side rendering with React</li>
                <li>CSS transitions for hover effects</li>
                <li>Tailwind CSS for utility-based styling</li>
                <li>Simple component structure for better performance</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}