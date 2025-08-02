import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DocsLayoutContent } from "@/components/site/docs-layout-content";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TOCProvider } from "@/contexts/toc-context";

// Force static generation for all docs pages
export const dynamic = "force-static";

export default function ComponentsLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<TOCProvider>
			<SidebarProvider>
				<DocsLayoutContent
					section="Components"
					name="Library"
					description="Explore our collection of responsive and accessible UI components."
				>
					<div
						className="w-full overflow-hidden max-w-[720px] sm:max-w-[1200px] mx-auto"
					>
						{children}
					</div>
				</DocsLayoutContent>
			</SidebarProvider>
		</TOCProvider>
	);
}
