"use client";

import {
	Activity,
	ArrowRight,
	ChevronRight,
	Code,
	Coins,
	CreditCard,
	Download,
	Shield,
	Sparkles,
	Star,
	Terminal,
	TrendingUp,
	Users,
	Wallet,
	Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getStats } from "@/lib/stats/getStats";

// Type definitions
type FeatureCardProps = {
	icon: React.ElementType;
	title: string;
	description: string;
	className?: string;
};

// Feature card component
const FeatureCard = ({
	icon: Icon,
	title,
	description,
	className,
}: FeatureCardProps) => (
	<div
		className={cn(
			"flex flex-col p-6 bg-card border rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1",
			className,
		)}
	>
		<div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
			<Icon className="h-6 w-6 text-primary" />
		</div>
		<h3 className="text-xl font-semibold mb-2">{title}</h3>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

// Project statistics component
const ProjectStats = () => {
	const [stats, setStats] = useState({
		components: 0,
		templates: 0,
		license: "MIT",
		downloads: 0,
		lastUpdated: "",
	});
	
	useEffect(() => {
		// Fetch stats when component mounts
		const fetchStats = async () => {
			try {
				const fetchedStats = await getStats();
				setStats(fetchedStats);
			} catch (error) {
				console.error("Error fetching stats:", error);
			}
		};
		
		fetchStats();
	}, []);
	
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8 mb-12">
			<div className="flex flex-col w-full items-center p-6 bg-card rounded-xl border">
				<Star className="h-6 w-6 mb-2 text-yellow-500" />
				<span className="text-xl font-bold">{stats.components}</span>
				<span className="text-sm text-muted-foreground">Components</span>
			</div>

			<div className="flex flex-col w-full items-center p-6 bg-card rounded-xl border">
				<Download className="h-6 w-6 mb-2 text-green-500" />
				<span className="text-xl font-bold">{stats.templates}</span>
				<span className="text-sm text-muted-foreground">Templates</span>
			</div>

			<div className="flex flex-col w-full items-center p-6 bg-card rounded-xl border">
				<CreditCard className="h-6 w-6 mb-2 text-violet-500" />
				<span className="text-xl font-bold">{stats.license}</span>
				<span className="text-sm text-muted-foreground">License</span>
			</div>
		</div>
	);
};

// Testimonial component
// const Testimonial = ({
// 	quote,
// 	author,
// 	role,
// 	logo,
// }: {
// 	quote: string;
// 	author: string;
// 	role: string;
// 	logo: string;
// }) => (
// 	<Card className="bg-card/50 backdrop-blur-sm">
// 		<CardContent className="p-6">
// 			<div className="flex items-center mb-4">
// 				<div className="h-8 w-8 bg-muted rounded-full mr-3" />
// 				<div>
// 					<p className="font-medium">{author}</p>
// 					<p className="text-sm text-muted-foreground">{role}</p>
// 				</div>
// 				<div className="ml-auto text-muted-foreground opacity-50">{logo}</div>
// 			</div>
// 			<p className="italic">&quot;{quote}&quot;</p>
// 		</CardContent>
// 	</Card>
// );

// Button with gradient hover effect
// const GradientButton = ({
// 	children,
// 	href,
// 	className,
// }: {
// 	children: React.ReactNode;
// 	href: string;
// 	className?: string;
// }) => (
// 	<Link
// 		href={href}
// 		className={cn(
// 			"relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary px-8 py-3 font-medium text-primary-foreground",
// 			"transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
// 			"before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-primary-foreground/10 before:to-primary/0 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
// 			"before:animate-[gradient_3s_ease_infinite]",
// 			className,
// 		)}
// 	>
// 		{children}
// 	</Link>
// );

export default function SolancnHome() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("wallet");
	const [isLoaded, setIsLoaded] = useState(false);
	const nftCards = [
		{
			name: "SMB #614",
			collection: "Solana Monkey Business",
			image: "/nfts/smb-614.png",
			floor: "744.6 SOL",
		},
		{
			name: "DeGod #8470",
			collection: "DeGods",
			image: "/nfts/degod-8470.png",
			floor: "11.7 SOL",
		},
		{
			name: "TYR-0691",
			collection: "Taiyo Robotics",
			image: "/nfts/tyr-0691.png",
			floor: "96.3 SOL",
		},
		{
			name: "Portals #411",
			collection: "Portals",
			image: "/nfts/portals-411.png",
			floor: "1 SOL",
		},
	];
	// Simulate loading and animate elements when component mounts
	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 300);
		return () => clearTimeout(timer);
	}, []);

	// Streamlined tab change handler
	const handleTabChange = useCallback((value: string) => {
		setActiveTab(value);
	}, []);

	return (
		<div className="min-h-screen w-full flex flex-col bg-background mx-auto justify-center px-2 sm:px-12">
			{/* Gradient overlay effect */}
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>

			{/* Hero Section with staggered animations */}
			<section
				className={cn(
					"relative transition-all duration-1000",
					isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-8",
				)}
			>
				<div className="flex max-w-dvw flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
					<h1 className="mt-4 text-center text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] bg-clip-text text-transparent bg-purple-500">
						Build your Solana dApp Library
					</h1>

					<p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl mt-4">
						A beautiful, accessible component library for Solana blockchain
						applications.
						<span className="block mt-2">
							Open Source. Professional. Production-ready.
						</span>
					</p>

					<div className="flex w-full items-center justify-center space-x-4 py-8">
						<Button
							variant="default"
							size="default"
							onClick={() => router.push("/docs")}
							className="cursor-pointer"
						>
							Get Started
							<ChevronRight className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="default"
							onClick={() => router.push("/components/accordion")}
							className="cursor-pointer"
						>
							<Code className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
							Browse Components
						</Button>
					</div>

					<ProjectStats />
				</div>
			</section>
			{/* Examples Section with tabs */}
			<section
				className={cn(
					"relative mb-12 transition-all duration-1000 delay-200",
					isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-8",
				)}
			>
				<div className="mx-auto max-w-5xl mb-8">
					<h2 className="text-3xl font-bold text-center">
						Powerful Solana Components
					</h2>
					<p className="text-center text-muted-foreground mt-2">
						Explore our professionally designed components for Solana dApps
					</p>
				</div>

				<Tabs
					defaultValue="wallet"
					className="relative mt-6 w-full"
					value={activeTab}
					onValueChange={handleTabChange}
				>
					<div className="flex items-center justify-between pb-3">
						<TabsList className="w-full justify-start border-b bg-transparent p-0">
							<TabsTrigger
								value="wallet"
								className="relative h-9 rounded-md border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-all duration-300 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none cursor-pointer"
							>
								Wallet
							</TabsTrigger>
							<TabsTrigger
								value="defi"
								className="relative h-9 rounded-md border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-all duration-300 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none cursor-pointer"
							>
								DeFi
							</TabsTrigger>
							<TabsTrigger
								value="nft"
								className="relative h-9 rounded-md border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-all duration-300 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none cursor-pointer"
							>
								NFT
							</TabsTrigger>
							<TabsTrigger
								value="trading"
								className="relative h-9 rounded-md border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-all duration-300 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none cursor-pointer"
							>
								Trading
							</TabsTrigger>
						</TabsList>
					</div>

					<div className="relative mt-6 overflow-hidden rounded-xl border p-1">
						{/* Tab indicator animation */}
						<div
							className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
							style={{
								left:
									activeTab === "wallet"
										? "0%"
										: activeTab === "defi"
											? "25%"
											: activeTab === "nft"
												? "50%"
												: "75%",
								width: "25%",
							}}
						/>

						{/* Wallet Tab Content */}
						{activeTab === "wallet" && (
							<div className="animate-in fade-in-50 duration-300">
								<TabsContent
									value="wallet"
									className="relative rounded-md border"
								>
									<div className="flex items-center justify-between p-4">
										<div className="grid gap-1">
											<h1 className="text-2xl font-semibold">
												Wallet Dashboard
											</h1>
											<p className="text-sm text-muted-foreground">
												Manage your Solana assets and transactions
											</p>
										</div>
										<Button size="sm">
											<Wallet className="mr-2 h-4 w-4" />
											Connect Wallet
										</Button>
									</div>
									<div className="grid gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-4">
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">
													Total Balance
												</CardTitle>
												<Wallet className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">45.23 SOL</div>
												<p className="text-xs text-muted-foreground">
													+20.1% from last month
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">
													Token Holdings
												</CardTitle>
												<Coins className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">12</div>
												<p className="text-xs text-muted-foreground">
													+2 new tokens
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">
													Transactions
												</CardTitle>
												<Activity className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">573</div>
												<p className="text-xs text-muted-foreground">
													+201 since last week
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">
													Staking Rewards
												</CardTitle>
												<TrendingUp className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">2.34 SOL</div>
												<p className="text-xs text-muted-foreground">
													+12% APY
												</p>
											</CardContent>
										</Card>
									</div>
									<div className="grid gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-7">
										<Card className="col-span-4">
											<CardHeader>
												<CardTitle>Recent Transactions</CardTitle>
											</CardHeader>
											<CardContent className="pl-2">
												<div className="space-y-4">
													<div className="flex items-center">
														<div className="ml-4 space-y-1">
															<p className="text-sm font-medium leading-none">
																Sent SOL
															</p>
															<p className="text-sm text-muted-foreground">
																To: 7xKX...9mN2
															</p>
														</div>
														<div className="ml-auto font-medium">-5.00 SOL</div>
													</div>
													<div className="flex items-center">
														<div className="ml-4 space-y-1">
															<p className="text-sm font-medium leading-none">
																Received USDC
															</p>
															<p className="text-sm text-muted-foreground">
																From: 3kL9...8xR4
															</p>
														</div>
														<div className="ml-auto font-medium">
															+100.00 USDC
														</div>
													</div>
													<div className="flex items-center">
														<div className="ml-4 space-y-1">
															<p className="text-sm font-medium leading-none">
																Staking Reward
															</p>
															<p className="text-sm text-muted-foreground">
																Validator: Solana Labs
															</p>
														</div>
														<div className="ml-auto font-medium">+0.25 SOL</div>
													</div>
												</div>
											</CardContent>
										</Card>
										<Card className="col-span-3">
											<CardHeader>
												<CardTitle>Quick Actions</CardTitle>
												<CardDescription>
													Manage your Solana assets
												</CardDescription>
											</CardHeader>
											<CardContent className="grid gap-4">
												<Button className="w-full">
													<ArrowRight className="mr-2 h-4 w-4" />
													Send SOL
												</Button>
												<Button
													variant="outline"
													className="w-full bg-transparent"
												>
													<Coins className="mr-2 h-4 w-4" />
													Swap Tokens
												</Button>
												<Button
													variant="outline"
													className="w-full bg-transparent"
												>
													<Shield className="mr-2 h-4 w-4" />
													Stake SOL
												</Button>
											</CardContent>
										</Card>
									</div>
								</TabsContent>
							</div>
						)}

						{/* DeFi Tab Content - with similar animation pattern */}
						{activeTab === "defi" && (
							<div className="animate-in fade-in-50 duration-300">
								<TabsContent
									value="defi"
									className="relative rounded-md border mt-0"
								>
									<div className="flex items-center justify-between p-4">
										<div className="grid gap-1">
											<h1 className="text-2xl font-semibold">DeFi Portfolio</h1>
											<p className="text-sm text-muted-foreground">
												Track your decentralized finance positions
											</p>
										</div>
									</div>
									<div className="grid gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-3">
										<Card>
											<CardHeader>
												<CardTitle className="text-base">
													Liquidity Pools
												</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">$12,450</div>
												<p className="text-xs text-muted-foreground">
													+5.2% this week
												</p>
												<div className="mt-4 space-y-2">
													<div className="flex justify-between text-sm">
														<span>SOL/USDC</span>
														<span>$8,200</span>
													</div>
													<div className="flex justify-between text-sm">
														<span>RAY/SOL</span>
														<span>$4,250</span>
													</div>
												</div>
											</CardContent>
										</Card>
										<Card>
											<CardHeader>
												<CardTitle className="text-base">Lending</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">$8,750</div>
												<p className="text-xs text-muted-foreground">
													8.5% APY
												</p>
												<div className="mt-4 space-y-2">
													<div className="flex justify-between text-sm">
														<span>Supplied USDC</span>
														<span>$5,000</span>
													</div>
													<div className="flex justify-between text-sm">
														<span>Supplied SOL</span>
														<span>$3,750</span>
													</div>
												</div>
											</CardContent>
										</Card>
										<Card>
											<CardHeader>
												<CardTitle className="text-base">
													Yield Farming
												</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">$3,200</div>
												<p className="text-xs text-muted-foreground">
													+12.3% APR
												</p>
												<div className="mt-4">
													<Button size="sm" className="w-full">
														Claim Rewards
													</Button>
												</div>
											</CardContent>
										</Card>
									</div>
								</TabsContent>
							</div>
						)}

						{/* NFT Tab Content */}
						{activeTab === "nft" && (
							<div className="animate-in fade-in-50 duration-300">
								<TabsContent
									value="nft"
									className="relative rounded-md border mt-0"
								>
									<div className="flex items-center justify-between p-4">
										<div className="grid gap-1">
											<h1 className="text-2xl font-semibold">NFT Collection</h1>
											<p className="text-sm text-muted-foreground">
												Manage your digital collectibles
											</p>
										</div>
									</div>
									<div className="grid gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4">
										{nftCards.map((nft) => (
											<Card key={nft.name}>
												<CardContent className="p-4">
													<div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
														<Image
															src={nft.image}
															alt={nft.name}
															className="w-full h-full object-cover"
															width={100}
															height={100}
														/>
													</div>
													<h3 className="font-semibold">{nft.name}</h3>
													<p className="text-sm text-muted-foreground">
														Floor: {nft.floor}
													</p>
												</CardContent>
											</Card>
										))}
									</div>
								</TabsContent>
							</div>
						)}

						{/* Trading Tab Content */}
						{activeTab === "trading" && (
							<div className="animate-in fade-in-50 duration-300">
								<TabsContent
									value="trading"
									className="relative rounded-md border mt-0"
								>
									<div className="flex items-center justify-between p-4">
										<div className="grid gap-1">
											<h1 className="text-2xl font-semibold">
												Trading Dashboard
											</h1>
											<p className="text-sm text-muted-foreground">
												Execute trades and monitor positions
											</p>
										</div>
									</div>
									<div className="grid gap-4 p-4 pt-0 md:grid-cols-2">
										<Card>
											<CardHeader>
												<CardTitle>Place Order</CardTitle>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="grid grid-cols-2 gap-4">
													<div>
														<Label htmlFor="from">From</Label>
														<Input id="from" placeholder="SOL" />
													</div>
													<div>
														<Label htmlFor="to">To</Label>
														<Input id="to" placeholder="USDC" />
													</div>
												</div>
												<div>
													<Label htmlFor="amount">Amount</Label>
													<Input id="amount" placeholder="0.00" />
												</div>
												<Button className="w-full">
													<Zap className="mr-2 h-4 w-4" />
													Execute Trade
												</Button>
											</CardContent>
										</Card>
										<Card>
											<CardHeader>
												<CardTitle>Portfolio Performance</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold text-green-600">
													+$2,450
												</div>
												<p className="text-xs text-muted-foreground">
													+15.2% this month
												</p>
												<div className="mt-4 h-[200px] bg-muted rounded-lg flex items-center justify-center">
													<span className="text-muted-foreground">
														Chart Placeholder
													</span>
												</div>
											</CardContent>
										</Card>
									</div>
								</TabsContent>
							</div>
						)}
					</div>
				</Tabs>
			</section>
			{/* Features Section */}
			<section
				className={cn(
					"relative py-16 transition-all duration-1000 delay-300",
					isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-8",
				)}
			>
				<div className="mx-auto max-w-5xl">
					<h2 className="text-3xl font-bold text-center">
						Why Choose Solancn UI
					</h2>
					<p className="text-center text-muted-foreground mt-2 mb-12">
						Built with developers and users in mind
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<FeatureCard
							icon={Sparkles}
							title="Beautiful Design"
							description="Professionally designed components that follow modern design principles and trends."
						/>
						<FeatureCard
							icon={Shield}
							title="Type Safety"
							description="Fully typed with TypeScript for a robust development experience with fewer bugs."
						/>
						<FeatureCard
							icon={Terminal}
							title="Developer Friendly"
							description="Intuitive API with comprehensive documentation and examples."
						/>
						<FeatureCard
							icon={Wallet}
							title="Solana Integration"
							description="Native support for Solana wallets and blockchain functionality."
						/>
						<FeatureCard
							icon={Zap}
							title="Performance Optimized"
							description="Built with performance in mind to ensure smooth user experiences."
						/>
						<FeatureCard
							icon={Users}
							title="Community Driven"
							description="Open source project with an active community of contributors."
						/>
					</div>
				</div>
			</section>
			{/* Testimonials Section */}
			{/* <section className={cn(
                "relative py-16 bg-muted/30 transition-all duration-1000 delay-400",
                isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
            )}>
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold text-center">Loved by Developers</h2>
                    <p className="text-center text-muted-foreground mt-2 mb-12">
                        See what others are saying about Solancn UI
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Testimonial 
                            quote="This library saved me weeks of development time. The components are beautiful and intuitive." 
                            author="Alex Johnson" 
                            role="Senior Frontend Developer" 
                            logo="CompanyA" 
                        />
                        <Testimonial 
                            quote="The best Solana UI kit I've used. Documentation is excellent and integration was seamless." 
                            author="Sarah Miller" 
                            role="Blockchain Developer" 
                            logo="CompanyB" 
                        />
                        <Testimonial 
                            quote="As a designer, I appreciate the attention to detail in every component. Truly professional work." 
                            author="Michael Chen" 
                            role="UI/UX Designer" 
                            logo="CompanyC" 
                        />
                    </div>
                </div>
            </section> */}
			{/* Installation Section */}
			<section
				className={cn(
					"relative py-16 transition-all duration-1000 delay-500",
					isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-8",
				)}
			>
				<div className="mx-auto flex max-w-dvw flex-col items-center gap-2 py-8 md:py-12">
					<h2 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
						Get started in seconds
					</h2>
					<span className="max-w-dvw text-center text-lg text-muted-foreground sm:text-xl">
						Install Solana UI components and start building your dApp today
					</span>
					{/* <div className="w-full max-w-xl mt-8">
                        <Card className="border-2 border-muted hover:border-primary/20 transition-colors duration-300">
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <Label className="text-sm font-medium flex items-center">
                                            Install the package
                                            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">Recommended</Badge>
                                        </Label>
                                        <div className="mt-2 flex items-center space-x-2 rounded-md bg-muted p-3 font-mono text-sm group relative">
                                            <span className="flex-1">
                                                npm install @solana-ui/react
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="opacity-50 hover:opacity-100 transition-opacity"
                                                onClick={() => navigator.clipboard.writeText('npm install @solana-ui/react')}
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                            <span className="absolute -top-9 right-0 bg-primary text-primary-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                Copy to clipboard
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Import components
                                        </Label>
                                        <div className="mt-2 rounded-md bg-muted p-3 font-mono text-sm">
                                            <pre className="text-xs md:text-sm">
                                                <code>{`import { WalletAdapter, WalletButton } from '@solancn-ui/react';\n\nexport default function MyApp() {\n  return <WalletButton>Connect Wallet</WalletButton>;\n}`}</code>
                                            </pre>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center pt-4">
                                        <Button className="w-full sm:w-auto">
                                            <Code className="mr-2 h-4 w-4" />
                                            View Documentation
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div> */}
				</div>
			</section>
		</div>
	);
}