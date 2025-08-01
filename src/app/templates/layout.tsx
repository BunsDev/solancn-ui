import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DocsLayoutContent } from "@/components/site/docs-layout-content";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TOCProvider } from "@/contexts/toc-context";

// Force static generation for all docs pages
export const dynamic = "force-static";

export default function TemplatesLayout({ children }: { children: ReactNode }) {
	return (
		<TOCProvider>
			<SidebarProvider>
				<DocsLayoutContent section="Templates" name="" description="">
					{children}
				</DocsLayoutContent>
			</SidebarProvider>
		</TOCProvider>
	);
}
