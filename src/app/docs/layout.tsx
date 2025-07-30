import type { ReactNode } from "react";
import { DocsLayoutContent } from "@/components/site/docs-layout-content";
import { TOCProvider } from "@/contexts/toc-context";

// Force static generation for all docs pages
export const dynamic = "force-static";

export default function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<TOCProvider>
			<DocsLayoutContent>{children}</DocsLayoutContent>
		</TOCProvider>
	);
}
