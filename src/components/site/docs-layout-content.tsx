"use client";

import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { TableOfContents } from "@/components/site/table-of-contents";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTOC } from "@/contexts/toc-context";

interface DocsLayoutProps {
	section: string;
	name: string;
	description: string;
	children: ReactNode;
}

export function DocsLayoutContent({
	section,
	name,
	description,
	children,
}: DocsLayoutProps) {
	const { showTOC } = useTOC();

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										{section}
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>{name}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>

				{/* Main content area with responsive padding and width */}
				<div className="flex flex-1 min-w-0 overflow-hidden container mx-auto max-w-fit">
					<main className={`flex-1 py-6 pb-16 pt-6 min-w-0 px-4 sm:px-6 lg:px-8 ${showTOC ? "max-w-3xl lg:max-w-4xl" : "max-w-none"}`}>
						<div className="prose prose-zinc dark:prose-invert prose-h1:text-3xl prose-h1:font-semibold prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-14 prose-h3:text-lg prose-h3:font-medium prose-h3:scroll-m-20 max-w-none w-full">
							{children}
						</div>
					</main>

					{/* Table of contents - only visible on larger screens when showTOC is true */}
					{/* {showTOC && (
						<div className="hidden lg:block w-[240px] xl:w-[280px] flex-shrink-0 border-l p-4">
							<div className="sticky top-20">
								<TableOfContents />
							</div>
						</div>
					)} */}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
