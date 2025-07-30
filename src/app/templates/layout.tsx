import type { ReactNode } from "react";
import { DocsLayoutContent } from "@/components/site/docs-layout-content";
import { TOCProvider } from "@/contexts/toc-context";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

// Force static generation for all docs pages
export const dynamic = "force-static";

export default function BlocksLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<TOCProvider>

			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<DocsLayoutContent section="Blocks" name="" description="">
						{children}
					</DocsLayoutContent>
				</SidebarInset>
			</SidebarProvider>
		</TOCProvider>
	);
}
