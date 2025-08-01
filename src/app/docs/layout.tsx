import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DocsLayoutContent } from "@/components/site/docs-layout-content";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TOCProvider } from "@/contexts/toc-context";

// Force static generation for all docs pages
export const dynamic = "force-static";

export default function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<TOCProvider>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<DocsLayoutContent
						section="Docs"
						name="Installation"
						description="How to install dependencies and structure your app."
					>
						{children}
					</DocsLayoutContent>
				</SidebarInset>
			</SidebarProvider>
		</TOCProvider>
	);
}
