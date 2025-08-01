import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

// import { Atom } from "@/components/lo-fi/atom"

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const atomVariants = cva(
	"inline-flex rounded-lg border-neutral-300 dark:border-neutral-600",
	{
		variants: {
			shade: {
				"50": "bg-neutral-50 dark:bg-neutral-900",
				"100": "bg-neutral-100 dark:bg-neutral-800",
				"200": "bg-neutral-200 dark:bg-neutral-700",
				"300": "bg-neutral-300 dark:bg-neutral-600",
				"400": "bg-neutral-400 dark:bg-neutral-500",
				"500": "bg-neutral-500 dark:bg-neutral-400",
				"600": "bg-neutral-600 dark:bg-neutral-300",
				"700": "bg-neutral-700 dark:bg-neutral-200",
				"800": "bg-neutral-800 dark:bg-neutral-100",
				"900": "bg-neutral-900 dark:bg-neutral-50",
			},
		},
		defaultVariants: {
			shade: "50",
		},
	},
);

function Atom({
	className,
	shade,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof atomVariants>) {
	return (
		<div
			data-slot="button"
			className={cn(atomVariants({ shade, className }))}
			{...props}
		/>
	);
}

export { Atom };

export function AccordionLoFi() {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col gap-1 border-b py-2">
				<div className="flex items-center justify-between">
					<Atom shade="300" className="h-2 w-1/3" />
					<ChevronDownIcon className="size-3" />
				</div>
			</div>
			<div className="flex flex-col gap-1 border-b py-2">
				<div className="flex items-center justify-between">
					<Atom shade="300" className="h-2 w-1/2" />
					<ChevronUpIcon className="size-3" />
				</div>
				<div className="flex flex-col gap-1.5">
					<Atom shade="200" className="h-2 w-2/3" />
					<Atom shade="200" className="h-2 w-1/3" />
				</div>
			</div>
			<div className="flex flex-col gap-1 py-2">
				<div className="flex items-center justify-between">
					<Atom shade="300" className="h-2 w-2/3" />
					<ChevronDownIcon className="size-3" />
				</div>
			</div>
		</div>
	);
}
