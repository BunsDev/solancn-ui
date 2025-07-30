import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/_next/", "/designs/react-code-runner", "/standalone/"],
		},
		sitemap: "https://ui.solancn.com/sitemap.xml",
	};
}
