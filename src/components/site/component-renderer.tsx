"use client";
import { Expand, ExternalLink, RotateCw } from "lucide-react";
import { cloneElement, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ComponentPreviewProps = {
	component: React.ReactElement;
	reTrigger?: boolean;
	className?: string;
	componentName?: string;
};

export function ComponentRenderer({
	component,
	className,
	reTrigger = false,
	componentName,
}: ComponentPreviewProps) {
	const [key, setKey] = useState(Date.now());
	const [isFullPage, setIsFullPage] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const changeKey = () => {
		setKey(Date.now());
	};

	const handleFullPage = () => {
		setIsFullPage(!isFullPage);
	};

	const handleNewPage = () => {
		if (componentName) {
			// Create a URL for the standalone component view
			const standaloneUrl = `/standalone/${componentName}`;
			window.open(standaloneUrl, "_blank");
		}
	};

	return (
		<div
			ref={containerRef}
			className={cn(
				"group flex w-full items-center justify-center rounded-md p-4 relative not-prose grid-bg bg-background",
				isFullPage
					? "fixed inset-0 top-16 z-50 min-h-screen rounded-none overflow-auto mx-auto"
					: "min-h-[450px]",
				className,
			)}
		>
			{componentName && (
				<button
					onClick={handleNewPage}
					className="absolute top-3 right-12 z-20 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
					aria-label="Open in new page"
					type="button"
				>
					<ExternalLink
						size={20}
						className="text-zinc-700 dark:text-zinc-300"
					/>
				</button>
			)}
			<button
				onClick={handleFullPage}
				className="absolute top-3 right-4 z-20 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
				aria-label="Toggle full page"
				type="button"
			>
				<Expand size={20} className="text-zinc-700 dark:text-zinc-300" />
			</button>
			{reTrigger && (
				<div
					className={`absolute top-3 ${componentName ? "right-20" : "right-12"}`}
				>
					<button
						onClick={changeKey}
						className="cursor-pointer p-1 flex items-center gap-3 opacity-0 transition-opacity group-hover:opacity-100 text-zinc-700 dark:text-zinc-300"
					>
						<RotateCw size={16} />
					</button>
				</div>
			)}
			<div
				className={cn(
					"flex items-center justify-center w-full",
					isFullPage ? "h-full min-h-full overflow-auto" : "h-full",
				)}
			>
				{reTrigger ? cloneElement(component, { key }) : component}
			</div>
		</div>
	);
}
