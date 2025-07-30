import type { ReactNode } from "react";
import { DocsLayoutContent } from "@/components/site/docs-layout-content";
import { TOCProvider } from "@/contexts/toc-context";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
					<DocsLayoutContent section="Components" name="Library" description="Explore our collection of responsive and accessible UI components.">
						{children}
					</DocsLayoutContent>
				</SidebarInset>
			</SidebarProvider>
		</TOCProvider>
	);
}
