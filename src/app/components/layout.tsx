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
				<AppSidebar />
				<SidebarInset>
					<DocsLayoutContent
						section="Components"
						name="Library"
						description="Explore our collection of responsive and accessible UI components."
					>
						{children}
					</DocsLayoutContent>
				</SidebarInset>
			</SidebarProvider>
		</TOCProvider>
	);
}
