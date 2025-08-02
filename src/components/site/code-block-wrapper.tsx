"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
	expandButtonTitle?: string;
}

export function CodeBlockWrapper({
	expandButtonTitle = "View Code",
	className,
	children,
	...props
}: CodeBlockProps) {
	const [isOpened, setIsOpened] = React.useState(false);
	const isMobile = useMediaQuery("(max-width: 640px)");

	return (
		<Collapsible open={isOpened} onOpenChange={setIsOpened}>
			<div className={cn("relative overflow-hidden w-full", className)} {...props}>
				<CollapsibleContent
					forceMount
					className={cn("overflow-hidden", !isOpened && "max-h-28 sm:max-h-32")}
				>
					<div
						className={cn(
							"[&_pre]:my-0 [&_pre]:max-h-[50vh] sm:[&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
							!isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto",
						)}
					>
						{children}
					</div>
				</CollapsibleContent>
				<div
					className={cn(
						"absolute flex items-center justify-center bg-gradient-to-b from-zinc-700/30 to-zinc-950/90",
						isMobile ? "p-1" : "p-2",
						isOpened ? "inset-x-0 bottom-0 h-10 sm:h-12" : "inset-0",
					)}
				>
					<CollapsibleTrigger asChild>
						<Button 
							variant="secondary" 
							className={cn(
								"text-xs",
								isMobile ? "h-7 px-2" : "h-8 px-4"
							)}
						>
							{isOpened ? "Collapse" : expandButtonTitle}
						</Button>
					</CollapsibleTrigger>
				</div>
			</div>
		</Collapsible>
	);
}
