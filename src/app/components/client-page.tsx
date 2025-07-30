"use client";

/**
 * Component Library Explorer - Solana UI
 *
 * A state-of-the-art UI for exploring components
 * in the Solana UI component library.
 *
 * @author Solana UI Team
 * @version 2.0.0
 */

import { AnimatePresence, motion } from "framer-motion";
// Icons
import {
	ArrowRight,
	ChevronDown,
	Code,
	Cpu,
	Download,
	Eye,
	Filter,
	Grid,
	LayoutList,
	Search,
	Star,
	X,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import MinimalPreview from "@/components/cards/preview-card";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { docsNavigation, componentsNavigation, designsNavigation, templatesNavigation } from "@/constants/navigation";

// Types
import type { Component } from "@/lib/types";
// Utils
import { cn, getLink } from "@/lib/utils";

// Custom hooks for debouncing search input
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

// Component metrics for display
interface ComponentMetric {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	color?: string;
}

/**
 * ComponentCard - Card component for displaying a component with preview
 */
function ComponentCard({
	component,
	viewMode = "grid",
	searchTerm = "",
}: {
	component: Component;
	viewMode: "grid" | "row";
	searchTerm?: string;
}) {
	const [isHovered, setIsHovered] = useState(false);

	// Define component metrics to highlight
	const metrics: ComponentMetric[] = [
		{
			icon: <Download className="h-3 w-3" />,
			label: "Files",
			value: component.files?.length || 1,
		},
		{
			icon: <Star className="h-3 w-3 text-amber-500" />,
			label: "Status",
			value: component.installed ? "Installed" : "Available",
			color: component.installed ? "text-green-500" : "text-muted-foreground",
		},
		{
			icon: <Cpu className="h-3 w-3 text-purple-500" />,
			label: "Type",
			value: component.category || "UI",
		},
	];

	// Highlight the search term in text
	const highlightText = (text: string) => {
		if (!searchTerm || !text) return text;

		const regex = new RegExp(
			`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
			"gi",
		);
		const parts = text.split(regex);

		return parts.map((part, i) =>
			regex.test(part) ? (
				<span
					key={i}
					className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-100"
				>
					{part}
				</span>
			) : (
				part
			),
		);
	};

	// Card variant based on view mode
	if (viewMode === "row") {
		return (
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className="w-full"
			>
				<Card
					className={cn(
						"group relative overflow-hidden transition-all",
						isHovered && "ring-1 ring-[#9945FF] shadow-lg",
					)}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onFocus={() => setIsHovered(true)}
					onBlur={() => setIsHovered(false)}
				>
					<div className="grid grid-cols-[180px_1fr] md:grid-cols-[250px_1fr]">
						{/* Preview section */}
						<div className="relative border-r">
							<div className="flex h-full items-center justify-center p-4">
								<MinimalPreview item={component} />
							</div>

							{/* Hover overlay */}
							<div
								className={cn(
									"absolute inset-0 z-10 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity",
									isHovered && "opacity-100",
								)}
							>
								<div className="flex flex-col gap-2">
									<Button
										asChild
										size="sm"
										className="bg-[#9945FF] hover:bg-[#9945FF]/80"
									>
										<Link href={`/docs/${component.name}`}>
											<Eye className="mr-2 h-3 w-3" /> View
										</Link>
									</Button>
									<Button asChild size="sm" variant="outline">
										<Link href={getLink(component)}>
											<Code className="mr-2 h-3 w-3" /> Code
										</Link>
									</Button>
								</div>
							</div>
						</div>

						{/* Content section */}
						<div className="flex flex-col p-4">
							<div className="mb-2 flex items-center justify-between">
								<Link href={`/docs/${component.name}`}>
									<h3 className="text-lg font-semibold hover:text-[#9945FF] hover:underline">
										{highlightText(component.title || component.name)}
									</h3>
								</Link>

								{component.category && (
									<Badge
										variant="secondary"
										className="bg-[#9945FF]/10 text-[#9945FF] hover:bg-[#9945FF]/20"
									>
										{component.category}
									</Badge>
								)}
							</div>

							<p className="line-clamp-2 text-sm text-muted-foreground mb-4">
								{highlightText(component.description || "")}
							</p>

							<div className="mt-auto flex items-center justify-between">
								<div className="flex gap-4">
									{metrics.map((metric, i) => (
										<div key={i} className="flex items-center text-xs">
											<div className="mr-1">{metric.icon}</div>
											<span className={cn("font-medium", metric.color)}>
												{metric.value}
											</span>
										</div>
									))}
								</div>

								<Button
									asChild
									size="sm"
									variant="ghost"
									className="ml-auto gap-1"
								>
									<Link href={getLink(component)}>
										Details <ArrowRight className="h-3 w-3" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</Card>
			</motion.div>
		);
	}

	// Grid card variant
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.96 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<Card
				className={cn(
					"group relative overflow-hidden transition-all h-[320px]",
					isHovered && "ring-2 ring-[#9945FF] ring-offset-2 shadow-lg",
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
						isHovered && "opacity-100",
					)}
				>
					<div className="space-y-3 text-center">
						<Button
							asChild
							size="sm"
							className="w-36 bg-[#9945FF] hover:bg-[#9945FF]/80"
						>
							<Link
								href={`/docs/${component.name}`}
								className="flex items-center justify-center gap-2"
							>
								<Eye className="h-4 w-4" />
								View Demo
							</Link>
						</Button>
						<Button asChild variant="outline" size="sm" className="w-36">
							<Link
								href={getLink(component)}
								className="flex items-center justify-center gap-2"
							>
								<Code className="h-4 w-4" />
								View Code
							</Link>
						</Button>

						{/* New interactive buttons */}
						<div className="flex justify-center gap-2 pt-2">
							<TooltipProvider delayDuration={200}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button size="icon" variant="outline" className="h-8 w-8">
											<Download className="h-4 w-4 text-[#14F195]" />
											<span className="sr-only">Install component</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent>Install this component</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>
				</div>

				{/* Component preview */}
				<div className="relative flex items-center justify-center overflow-hidden border-b p-6 bg-slate-50 dark:bg-slate-900/50 h-40">
					<MinimalPreview item={component} />

					{/* Category badge */}
					{component.category && (
						<Badge
							className="absolute top-2 right-2 bg-[#9945FF]/10 text-[#9945FF] hover:bg-[#9945FF]/20"
							variant="secondary"
						>
							{component.category}
						</Badge>
					)}
				</div>

				<div className="flex flex-col">
					<CardHeader className="px-4 py-3">
						<Link href={`/docs/${component.name}`}>
							<CardTitle className="line-clamp-1 text-lg hover:text-[#9945FF] hover:underline">
								{highlightText(component.title || component.name)}
							</CardTitle>
						</Link>
						<CardDescription className="line-clamp-2 text-sm text-muted-foreground mt-1">
							{highlightText(component.description || "")}
						</CardDescription>
					</CardHeader>

					<CardFooter className="border-t mt-auto px-4 py-3">
						<div className="flex w-full justify-between items-center text-xs">
							<div className="flex gap-3">
								{metrics.map((metric, i) => (
									<div key={i} className="flex items-center">
										<div className="mr-1.5">{metric.icon}</div>
										<span className={cn("font-medium", metric.color)}>
											{metric.value}
										</span>
									</div>
								))}
							</div>

							{/* Component status indicator */}
							<div className="flex items-center">
								<span
									className={cn(
										"inline-flex h-2 w-2 rounded-full mr-1.5",
										component.installed ? "bg-[#14F195]" : "bg-amber-500",
									)}
								/>
								<span
									className={
										component.installed ? "text-[#14F195]" : "text-amber-500"
									}
								>
									{component.installed ? "Ready" : "Available"}
								</span>
							</div>
						</div>
					</CardFooter>
				</div>
			</Card>
		</motion.div>
	);
}

/**
 * Main client page component for browsing components
 */
// Get categories from navigation for filtering
const allNavigation = [...componentsNavigation, ...designsNavigation, ...templatesNavigation];
const categories = ["All", ...allNavigation.map((item) => item.label)];

// Interface for the processed component with guaranteed category
interface ProcessedComponent extends Component {
	category: string;
}

// Helper function to get component category from navigation structure
const getComponentCategory = (componentName: string): string => {
	for (const section of allNavigation) {
		const found = section.children.some(
			(child) =>
				child.href.includes(`/components/${componentName}`) ||
				child.label.toLowerCase() === componentName.toLowerCase(),
		);

		if (found) return section.label;
	}
	return "Components"; // Default category
};

export function ComponentsClientPage({
	components,
}: {
	components: Component[];
}) {
	const [isPending, startTransition] = useTransition();
	const [searchTerm, setSearchTerm] = useState("");
	const [viewMode, setViewMode] = useState<"grid" | "row">("grid");
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Debounce search term to avoid excessive filtering
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	// Process components to ensure they have proper categories
	const processedComponents = components.map((component) => ({
		...component,
		category: component.category || getComponentCategory(component.name),
		// Ensure the required 'type' property is set for all components
		type: component.type || ("registry:component" as const),
	})) as ProcessedComponent[];

	// Filter components based on search term and selected category
	const filteredComponents = processedComponents.filter((component) => {
		// Search filter
		const matchesSearch =
			!debouncedSearchTerm ||
			component.name
				?.toLowerCase()
				.includes(debouncedSearchTerm.toLowerCase()) ||
				component.title
					?.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase()) ||
				component.description
					?.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase()) ||
				component.category
					?.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase()) ||
			component.tags?.some((tag) =>
				tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
			);

		// Category filter
		const matchesCategory =
			selectedCategory === "All" || component.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	// Clear search
	const handleClearSearch = () => {
		setSearchTerm("");
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};

	// Toggle view mode
	// const toggleViewMode = () => {
	//   setViewMode((prev) => (prev === "grid" ? "row" : "grid"));
	// };

	// Handle category selection
	const handleCategoryChange = (category: string) => {
		// Start a transition for smoother UI updates when filtering
		startTransition(() => {
			setSelectedCategory(category);
			// Clear search when changing category for better UX
			if (searchTerm) setSearchTerm("");
		});
	};

	// Focus search on key press (ctrl + k or cmd + k)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				searchInputRef.current?.focus();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="container mx-auto py-6 lg:py-10">
			{/* Page header with search and view toggle */}
			<div className="space-y-6">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Components Library
						</h1>
						<p className="mt-2 text-lg text-muted-foreground">
							Explore our collection of responsive and accessible UI components.
						</p>
					</div>

					{/* Search and view toggle */}
					<div className="flex flex-col gap-3 md:flex-row md:items-center md:space-x-2">
						<div className="relative w-full md:w-64">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								ref={searchInputRef}
								type="search"
								placeholder="Search components... (Ctrl+K)"
								className="w-full py-2 pl-8 pr-12"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							{searchTerm && (
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0 h-9 w-9"
									onClick={handleClearSearch}
								>
									<X className="h-4 w-4" />
									<span className="sr-only">Clear search</span>
								</Button>
							)}
						</div>

						<div className="flex items-center gap-2">
							<Label htmlFor="view-toggle" className="sr-only">
								Toggle view
							</Label>

							<Button
								variant={viewMode === "grid" ? "default" : "outline"}
								size="icon"
								className={cn(
									"h-9 w-9",
									viewMode === "grid" && "bg-[#9945FF] hover:bg-[#9945FF]/80",
								)}
								onClick={() => setViewMode("grid")}
							>
								<Grid className="h-4 w-4" />
								<span className="sr-only">Grid view</span>
							</Button>

							<Button
								variant={viewMode === "row" ? "default" : "outline"}
								size="icon"
								className={cn(
									"h-9 w-9",
									viewMode === "row" && "bg-[#9945FF] hover:bg-[#9945FF]/80",
								)}
								onClick={() => setViewMode("row")}
							>
								<LayoutList className="h-4 w-4" />
								<span className="sr-only">List view</span>
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Category filter dropdown */}
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button 
								variant="outline" 
								className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 border-[#9945FF]/20 hover:border-[#9945FF]/40"
							>
								<div className="flex items-center gap-2">
									<Filter className="h-4 w-4 text-[#9945FF]" />
									<span className="flex items-center gap-1.5">
										Filter by: <span className="font-semibold text-[#9945FF]">{selectedCategory}</span>
									</span>
								</div>
								<ChevronDown className="h-4 w-4 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-56">
							{categories.map((category) => {
								// Count components in this category
								const count =
									category === "All"
										? processedComponents.length
										: processedComponents.filter((c) => c.category === category).length;

								return (
									<DropdownMenuItem 
										key={category}
										onClick={() => handleCategoryChange(category)}
										className={cn(
											"flex items-center justify-between cursor-pointer",
											selectedCategory === category && "bg-[#9945FF]/10 text-[#9945FF] font-medium"
										)}
									>
										<span className="flex items-center gap-2">
											{category === "All" && <Grid className="h-4 w-4" />}
											{category}
										</span>
										<span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium">
											{count}
										</span>
									</DropdownMenuItem>
								);
							})}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Current category display - mobile only */}
					{selectedCategory !== "All" && (
						<Button 
							size="sm" 
							variant="ghost" 
							className="hidden sm:flex items-center gap-1 h-9 px-2 hover:bg-transparent hover:text-[#9945FF]"
							onClick={() => handleCategoryChange("All")}
						>
							<X className="h-3.5 w-3.5" />
							<span className="sr-only">Clear filter</span>
						</Button>
					)}
				</div>

				{/* Active category badge - larger screens */}
				{selectedCategory !== "All" && (
					<Badge className="hidden sm:flex bg-[#9945FF]/10 text-[#9945FF] hover:bg-[#9945FF]/20 px-3 py-1">
						{selectedCategory}
						<Button 
							size="sm" 
							variant="ghost" 
							className="h-auto p-0 ml-1 hover:bg-transparent"
							onClick={() => handleCategoryChange("All")}
						>
							<X className="h-3 w-3" />
						</Button>
					</Badge>
				)}
			</div>

			{/* Component count and search info */}
			<div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2">
				<p>
					{isPending ? (
						<span className="flex items-center text-zinc-500">
							<span className="mr-2 h-3 w-3 animate-pulse rounded-full bg-[#9945FF]"></span>
							Updating...
						</span>
					) : filteredComponents.length > 0 ? (
						<>
							Showing{" "}
							<span className="font-medium">{filteredComponents.length}</span>{" "}
							{filteredComponents.length === 1 ? "component" : "components"}
							{debouncedSearchTerm && (
								<>
									{" "}
									for{" "}
									<span className="font-medium">&quot;{debouncedSearchTerm}&quot;</span>
								</>
							)}
						</>
					) : (
						<>
							No components found for{" "}
							<span className="font-medium">&quot;{debouncedSearchTerm}&quot;</span>
						</>
					)}
				</p>

				<div className="flex items-center gap-2 text-muted-foreground">
					<Zap className="h-3.5 w-3.5 text-[#14F195]" />
					<span>
						Press{" "}
						<kbd className="rounded border px-1 py-0.5 text-xs">Ctrl/⌘ K</kbd>{" "}
						to search
					</span>
				</div>
			</div>

			{/* Components grid or list */}
			<AnimatePresence mode="wait">
				{filteredComponents.length > 0 ? (
					<motion.div
						key={viewMode}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className={cn(
							viewMode === "grid"
								? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
								: "flex flex-col gap-4",
						)}
					>
						<AnimatePresence mode="popLayout">
							{filteredComponents.map((component) => (
								<motion.div
									key={component.name}
									layout
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.2 }}
								>
									<ComponentCard
										key={component.name}
										component={component}
										viewMode={viewMode as "grid" | "row"}
										searchTerm={debouncedSearchTerm}
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex flex-col items-center justify-center py-16 text-center"
					>
						<div className="mb-4 rounded-full bg-muted p-4">
							<Search className="h-6 w-6 text-muted-foreground" />
						</div>
						<h3 className="mb-2 text-xl font-medium">No components found</h3>
						<p className="mb-6 max-w-md text-muted-foreground">
							{`We couldn\'t find any components matching your search. Try adjusting your search term or browse all components.`}
						</p>
						<Button onClick={handleClearSearch}>Show all components</Button>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Documentation section */}
			<section className="mt-16 space-y-8">
				<h2 className="font-heading text-2xl">Documentation</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card className="overflow-hidden">
						<div className="bg-[#9945FF]/10 p-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9945FF]">
								<Eye className="h-4 w-4 text-white" />
							</div>
						</div>
						<CardHeader>
							<CardTitle>Design System</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Our components adhere to the Solana design system, ensuring
								consistent aesthetics and interactions across the ecosystem.
							</p>
						</CardContent>
					</Card>
					<Card className="overflow-hidden">
						<div className="bg-[#14F195]/10 p-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14F195]">
								<Zap className="h-4 w-4 text-black" />
							</div>
						</div>
						<CardHeader>
							<CardTitle>Accessibility</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								All components are built with accessibility in mind, following
								WAI-ARIA standards and providing keyboard navigation support.
							</p>
						</CardContent>
					</Card>
					<Card className="overflow-hidden">
						<div className="bg-amber-500/10 p-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
								<Code className="h-4 w-4 text-white" />
							</div>
						</div>
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
			</section>
		</div>
	);
}
