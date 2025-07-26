"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Block, Component, UIPrimitive } from "@/lib/types";
import { createElement } from "react";

interface PreviewProps {
  item: Block | Component | UIPrimitive;
}

export const MinimalPreview = ({ item }: PreviewProps) => {
  // Fallback preview for items without a defined preview
  const fallbackPreview = (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">{item.title}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{item.name}</div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="scale-[0.9] justify-center flex h-36 w-full items-center overflow-hidden pointer-events-none">
          {item.preview || fallbackPreview}
        </div>
      </CardContent>
    </Card>
  );
};