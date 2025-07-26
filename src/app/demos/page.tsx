import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  // Define the different Solana UI demos
  const demos = [
    {
      title: "Solana Dashboard",
      description:
        "Complete Solana dashboard with wallet connection, swap, borrow, lend, and more",
      href: "/demos/solanaDemo",
      tags: ["Wallet", "Swap", "Borrow", "Lend"],
      gradient: "from-[#9945FF] to-[#14F195]",
    },
    {
      title: "NFT Gallery",
      description: "NFT showcase with minting and trading capabilities",
      href: "/demos/nftDemo",
      tags: ["NFTs", "Marketplace", "Collection"],
      gradient: "from-pink-500 to-orange-500",
    },
    {
      title: "Bridge Interface",
      description: "Cross-chain asset bridging with multi-chain support",
      href: "/demos/bridgeDemo",
      tags: ["Bridge", "Cross-chain", "Transfer"],
      gradient: "from-yellow-500 to-red-500",
    },
    {
      title: "Swap Interface",
      description: "Token swap interface for Solana",
      href: "/demos/swapDemo",
      tags: ["Swap", "DeFi", "Trading"],
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "Transfer Tokens",
      description: "Send tokens to other Solana addresses",
      href: "/demos/transferDemo",
      tags: ["Transfer", "Send", "Tokens"],
      gradient: "from-green-500 to-blue-500",
    },
    {
      title: "Receive Tokens",
      description: "Receive tokens from other Solana addresses",
      href: "/demos/receiveDemo",
      tags: ["Receive", "Deposit", "QR Code"],
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Borrow Assets",
      description: "Borrow assets using your crypto as collateral",
      href: "/demos/borrowDemo",
      tags: ["Borrow", "Loans", "Collateral"],
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "NFT Gallery",
      description: "NFT showcase with minting and trading capabilities",
      href: "/demos/nftDemo",
      tags: ["NFTs", "Marketplace", "Collection"],
      gradient: "from-pink-500 to-orange-500",
    },
    {
      title: "Lend Assets",
      description: "Earn yield by lending your crypto assets",
      href: "/demos/lendDemo",
      tags: ["Lend", "Earn", "Yield"],
      gradient: "from-teal-500 to-green-500",
    },
    {
      title: "Wallet Details",
      description: "View your wallet details and transaction history",
      href: "/demos/walletDemo",
      tags: ["Wallet", "Transactions", "Balance"],
      gradient: "from-[#9945FF] to-[#14F195]",
    },
    {
      title: "Solana Frames",
      description: "Interact with Solana Frame content",
      href: "/demos/frameDemo",
      tags: ["Frames", "Content", "Interactive"],
      gradient: "from-blue-400 to-purple-400",
    },
    {
      title: "Portfolio Dashboard",
      description: "View your Solana token portfolio and holdings",
      href: "/demos/portfolioDemo",
      tags: ["Portfolio", "Assets", "Dashboard"],
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      title: "Stake Assets",
      description: "Stake your SOL and earn staking rewards",
      href: "/demos/stake",
      tags: ["Stake", "Rewards", "Earn"],
      gradient: "from-amber-500 to-orange-500",
    }
  ];

  return (
    <div className="container py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Solana UI Components
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Explore our collection of premium Solana UI components and templates
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <Link key={demo.title} href={demo.href} className="block h-full">
            <Card className="h-full transition-all hover:shadow-lg dark:hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{demo.title}</CardTitle>
                  <div
                    className={`h-8 w-8 rounded-full bg-gradient-to-r ${demo.gradient}`}
                  />
                </div>
                <CardDescription className="pt-1">
                  {demo.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full bg-gradient-to-r ${demo.gradient} text-text hover:opacity-90`}
                >
                  View Demo
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
