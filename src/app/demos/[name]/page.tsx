import { notFound } from "next/navigation";

import { demos } from "@/app/demos/[name]/index";

import { Renderer } from "@/app/demos/[name]/renderer";
import { getRegistryItem } from "@/lib/registry";
import type { Component } from "@/lib/types";

export async function generateStaticParams() {
  return Object.keys(demos).map((name) => ({
    name,
  }));
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  // Try to get registry item by original name or with 'Demo' suffix
  // This handles cases where demos[name] exists but registry expects nameDemo
  let component: Component | undefined;
  try {
    component = getRegistryItem(name);
  } catch (e) {
    try {
      // Try with Demo suffix if regular name fails
      component = getRegistryItem(`${name}Demo`);
    } catch (e2) {
      // If both fail, continue but log warning
      console.warn(`Component "${name}" or "${name}Demo" not found in registry`);
      // Don't throw error, just proceed with demos rendering
    }
  }

  if (!component) {
    notFound();
  }
  
  // Check if demo exists in our demos object
  const demo = demos[name];
  if (!demo) {
    console.error(`Demo "${name}" not found in demos object`);
    notFound();
  }

  const { components } = demo;

  return (
    <div className="flex h-[100vh] w-full flex-col gap-4 bg-background">
      {components &&
        Object.entries(components).map(([key, node]) => (
          <div className="relative w-full" key={key}>
            <Renderer>{node}</Renderer>
          </div>
        ))}
    </div>
  );
}
