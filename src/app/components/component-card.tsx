"use client";

import { Eye } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { type ComponentItem } from "./components-data";
import Link from "next/link";

interface ComponentCardProps {
  component: ComponentItem;
}

export function ComponentCard({ component }: ComponentCardProps) {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1">
      {/* Component Preview */}
      <Link href={`/components/${component.id}`}>
        <div className="relative h-48 overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center">
            <div className="text-center px-4">
              {/* <div className="w-12 h-12 mb-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-white text-lg font-bold">{component.name.charAt(0)}</span>
              </div> */}
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {component.name}
              </h3>
            </div>
          </div>

          {/* Overlay with view button - visible on hover/tap */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 md:gap-2">
            <button className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg text-xs md:text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg">
              <Eye size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">View Component</span>
            </button>
          </div>
        </div>
      </Link>

      {/* Component Info */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-zinc-900 dark:text-white">
              {component.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {component.description}
            </p>
          </div>
        </div>

        {/* Category badge */}
        <div className="mt-3">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300">
            {component.category}
          </span>
        </div>
      </div>
    </div>
  );
}
