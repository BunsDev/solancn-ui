import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	// Temporarily disable static export to allow builds to complete during development
	// output: "export", // Force static export - no server functions
	trailingSlash: true,
	reactStrictMode: true,
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

	// SEO and Performance Optimizations
	compress: true,
	poweredByHeader: false,

	async redirects() {
		return [
			{
				source: "/templates",
				destination: "/templates/nftmarket",
				permanent: true,
			},
			{
				source: "/blocks",
				destination: "/components/accordion",
				permanent: true,
			},
			{
				source: "/components",
				destination: "/components/accordion",
				permanent: true,
			},
		];
	},
	// Image optimization disabled for static export
	images: {
		unoptimized: true, // Required for static export
	},

	// Static export doesn't support headers() or redirects()
	// These will be handled by your hosting provider (Vercel)

	// Experimental features for better performance
	experimental: {
		optimizePackageImports: ["lucide-react", "framer-motion"],
	},

	// Bundle analyzer for performance monitoring
	webpack: (config, { dev, isServer }) => {
		// Optimize bundle size
		if (!dev && !isServer) {
			config.optimization.splitChunks = {
				chunks: "all",
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			};
		}
		return config;
	},
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
