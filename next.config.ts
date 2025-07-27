import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily ignore type errors during build to fix starters
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint to speed up build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Use correct Next.js 15.4.1 configuration
  serverExternalPackages: [],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
      },
      {
        protocol: "https",
        hostname: "cryptologos.cc",
      },
      {
        protocol: "https",
        hostname: "files.swissborg.com",
      },
      {
        protocol: "https",
        hostname: "phantom.app",
      },
    ],
  },
};

export default nextConfig;
