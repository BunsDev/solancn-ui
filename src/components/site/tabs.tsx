"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Eye } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ComponentProps, ComponentPropsWithoutRef } from "react";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
	ComponentProps<typeof TabsPrimitive.List>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			"inline-flex h-10 items-center border border-zinc-800 bg-zinc-900 rounded-full p-1 gap-1 shadow-sm",
			className,
		)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	ComponentProps<typeof TabsPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
	const isPreviewTab =
		typeof children === "string" && children.toLowerCase() === "preview";

	return (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(
				"relative inline-flex h-8 items-center justify-center px-2 sm:px-5 py-1 text-sm font-medium whitespace-nowrap transition-colors",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2",
				"rounded-full",
				"cursor-pointer",
				"data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-md",
				"data-[state=inactive]:bg-transparent data-[state=inactive]:text-zinc-400",
				className,
			)}
			{...props}
		>
			{isPreviewTab && <Eye className="w-4 h-4 mr-2" />}
			{children}
		</TabsPrimitive.Trigger>
	);
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	ComponentProps<typeof TabsPrimitive.Content>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, value, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"focus-visible:ring-ring relative mt-4 rounded-lg ring-offset-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden border border-zinc-200 dark:border-zinc-700 w-full",
			className,
		)}
		value={value}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
