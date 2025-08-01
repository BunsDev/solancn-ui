"use client";
import {
	ArrowDownRight,
	ArrowUpRight,
	BarChart3,
	Clock,
	Layers,
	PieChart,
	TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { toast } from "sonner";
import WalletStatus from "@/components/solana/wallet-status";
import type React from "react";

export function DefiDashboard() {
	const { publicKey, connecting, connected } = useWallet();
	const { connection } = useConnection();

	const handleRebalance = () => {
		toast.info("Preparing portfolio rebalance...");
		setTimeout(() => {
			toast.success("Portfolio optimization complete", {
				description: "Your portfolio has been rebalanced for optimal returns"
			});
		}, 1500);
	};

	const handleRefresh = () => {
		toast.loading("Refreshing market data...");
		setTimeout(() => {
			toast.success("Data refreshed", {
				description: "Latest market prices and portfolio values updated"
			});
		}, 1000);
	};

	return (
		<div className="relative p-4 sm:p-6 lg:p-8 overflow-hidden">
			{/* Import wallet adapter styles */}
			<style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
				 @import url('https://cdnjs.cloudflare.com/ajax/libs/sol-wallet-adapter/0.1.5/styles.min.css');`}</style>

			<div className="relative z-10 flex flex-col w-full max-w-[1800px] md:w-3xl lg:w-4xl xl:max-w-screen-xl mx-auto font-space-grotesk">
				{/* Header Section with Wallet Button */}
				<div className="mb-6 sm:mb-8 lg:mb-12 mt-4">
					<div className="flex flex-col md:flex-row justify-between items-center mb-6">
						<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
							Solana DeFi
						</h1>
						<div className="flex items-center gap-4">
							<WalletStatus />
							<div className="wallet-adapter-dropdown">
								<WalletMultiButton className="wallet-adapter-button-trigger bg-[#9945FF] hover:bg-[#8035e0] text-white" />
							</div>
						</div>
					</div>
					<div className="text-center md:text-left">
						<p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-slate-400 max-w-2xl px-4 md:px-0">
							Manage your DeFi investments and track performance on Solana across multiple DeFi protocols.
						</p>
					</div>
				</div>

				{/* DeFi Statistics */}
				<div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center">
							<p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
							<p className="text-2xl font-bold text-[#9945FF]">$24K</p>
						</div>
						<div className="text-center">
							<p className="text-sm text-gray-500 dark:text-gray-400">Daily Change</p>
							<p className="text-2xl font-bold text-[#14F195]">+5.6%</p>
						</div>
						<div className="text-center">
							<p className="text-sm text-gray-500 dark:text-gray-400">Active Pools</p>
							<p className="text-2xl font-bold text-[#9945FF]">3</p>
						</div>
						<div className="text-center">
							<p className="text-sm text-gray-500 dark:text-gray-400">APY</p>
							<p className="text-2xl font-bold text-[#14F195]">15.7%</p>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Portfolio Value Card */}
					<Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40 rounded-2xl col-span-1 md:col-span-2">
						<CardHeader className="border-b border-gray-100 dark:border-gray-800">
							<CardTitle className="text-[#14F195] flex items-center">
								<BarChart3 className="mr-2 h-5 w-5" /> Portfolio Overview
							</CardTitle>
							<CardDescription className="text-gray-400">
								Your DeFi investments at a glance
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="space-y-4">
								<div>
									<div className="text-gray-400 text-sm">Total Value</div>
									<div className="text-3xl font-bold">$24,758.90</div>
									<div className="flex items-center text-[#14F195] text-sm mt-1">
										<ArrowUpRight className="h-4 w-4 mr-1" /> +5.6% (24h)
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4 pt-2">
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">Staked Assets</div>
										<div className="text-xl font-medium">$14,320.45</div>
										<div className="text-[#14F195] text-xs">
											57.8% of portfolio
										</div>
									</div>
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">Liquidity Pools</div>
										<div className="text-xl font-medium">$8,219.30</div>
										<div className="text-[#14F195] text-xs">
											33.2% of portfolio
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>Asset Allocation</span>
										<span className="text-gray-400">% of portfolio</span>
									</div>
									<div className="space-y-3">
										<div className="space-y-1">
											<div className="flex justify-between text-xs">
												<span>SOL</span>
												<span>45%</span>
											</div>
											<Progress
												value={45}
												className="h-1 bg-[#9945FF]/20"
												indicatorClassName="bg-[#14F195]"
											/>
										</div>
										<div className="space-y-1">
											<div className="flex justify-between text-xs">
												<span>USDC</span>
												<span>30%</span>
											</div>
											<Progress
												value={30}
												className="h-1 bg-[#9945FF]/20"
												indicatorClassName="bg-[#14F195]"
											/>
										</div>
										<div className="space-y-1">
											<div className="flex justify-between text-xs">
												<span>BONK</span>
												<span>15%</span>
											</div>
											<Progress
												value={15}
												className="h-1 bg-[#9945FF]/20"
												indicatorClassName="bg-[#14F195]"
											/>
										</div>
										<div className="space-y-1">
											<div className="flex justify-between text-xs">
												<span>JUP</span>
												<span>10%</span>
											</div>
											<Progress
												value={10}
												className="h-1 bg-[#9945FF]/20"
												indicatorClassName="bg-[#14F195]"
											/>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* APY Summary Card */}
					<Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40 rounded-2xl">
						<CardHeader className="border-b border-gray-100 dark:border-gray-800">
							<CardTitle className="text-[#14F195] flex items-center">
								<TrendingUp className="mr-2 h-5 w-5" /> APY Summary
							</CardTitle>
							<CardDescription className="text-gray-400">
								Current yield rates
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<div className="flex items-center">
											<div className="w-2 h-2 bg-[#14F195] rounded-full mr-2"></div>
											<span className="text-sm">SOL Staking</span>
										</div>
										<span className="text-[#14F195] font-medium">7.2%</span>
									</div>
									<div className="flex justify-between items-center">
										<div className="flex items-center">
											<div className="w-2 h-2 bg-[#9945FF] rounded-full mr-2"></div>
											<span className="text-sm">SOL/USDC LP</span>
										</div>
										<span className="text-[#9945FF] font-medium">12.5%</span>
									</div>
									<div className="flex justify-between items-center">
										<div className="flex items-center">
											<div className="w-2 h-2 bg-[#FFA500] rounded-full mr-2"></div>
											<span className="text-sm">BONK/SOL LP</span>
										</div>
										<span className="text-[#FFA500] font-medium">24.3%</span>
									</div>
									<div className="flex justify-between items-center">
										<div className="flex items-center">
											<div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
											<span className="text-sm">JUP/SOL LP</span>
										</div>
										<span className="text-pink-500 font-medium">18.9%</span>
									</div>
								</div>

								<div className="pt-2">
									<Button
										className="w-full bg-[#9945FF] hover:bg-[#8035e0] text-white transition-colors"
										onClick={handleRebalance}
									>
										Rebalance Portfolio
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Investment Performance */}
				<Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40 rounded-2xl">
					<CardHeader className="border-b border-gray-100 dark:border-gray-800">
						<CardTitle className="text-[#14F195] flex items-center">
							<PieChart className="mr-2 h-5 w-5" /> Investment Performance
						</CardTitle>
						<CardDescription className="text-gray-400">
							Track your DeFi investments over time
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-6">
						<Tabs defaultValue="all" className="w-full">
							<TabsList className="grid w-full grid-cols-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
								<TabsTrigger
									value="all"
									className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-[#9945FF]"
								>
									All Time
								</TabsTrigger>
								<TabsTrigger
									value="month"
									className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-[#9945FF]"
								>
									1 Month
								</TabsTrigger>
								<TabsTrigger
									value="week"
									className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-[#9945FF]"
								>
									1 Week
								</TabsTrigger>
								<TabsTrigger
									value="day"
									className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-[#9945FF]"
								>
									24h
								</TabsTrigger>
							</TabsList>

							<TabsContent value="all" className="space-y-4 mt-4">
								<div className="h-[200px] w-full bg-[#9945FF]/5 rounded-md flex items-center justify-center">
									<span className="text-gray-400">
										Performance Chart (All Time)
									</span>
								</div>

								<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">
											Initial Investment
										</div>
										<div className="text-lg font-medium">$18,500.00</div>
									</div>
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">Current Value</div>
										<div className="text-lg font-medium">$24,758.90</div>
									</div>
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">Total Profit</div>
										<div className="text-lg font-medium text-[#14F195]">
											+$6,258.90
										</div>
									</div>
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">ROI</div>
										<div className="text-lg font-medium text-[#14F195]">
											+33.8%
										</div>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="month" className="space-y-4 mt-4">
								<div className="h-[200px] w-full bg-transparent rounded-md flex items-center justify-center">
									<span className="text-gray-400">
										Performance Chart (1 Month)
									</span>
								</div>

								<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">Initial Value</div>
										<div className="text-lg font-medium">$23,210.45</div>
									</div>
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">Current Value</div>
										<div className="text-lg font-medium">$24,758.90</div>
									</div>
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">Monthly Profit</div>
										<div className="text-lg font-medium text-[#14F195]">
											+$1,548.45
										</div>
									</div>
									<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
										<div className="text-gray-400 text-xs">Monthly ROI</div>
										<div className="text-lg font-medium text-[#14F195]">
											+6.7%
										</div>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="week" className="mt-4">
								{/* Similar content for 1 week tab */}
								<div className="h-[200px] w-full bg-transparent rounded-md flex items-center justify-center">
									<span className="text-gray-400">
										Performance Chart (1 Week)
									</span>
								</div>
							</TabsContent>

							<TabsContent value="day" className="mt-4">
								{/* Similar content for 24h tab */}
								<div className="h-[200px] w-full bg-transparent rounded-md flex items-center justify-center">
									<span className="text-gray-400">
										Performance Chart (24 Hours)
									</span>
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
						<div className="w-full">
							<div className="flex justify-between items-center">
								<span className="text-gray-400 text-sm flex items-center">
									<Clock className="h-4 w-4 mr-1" /> Last updated: 2 minutes ago
								</span>
								<Button
									variant="outline"
									className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
									size="sm"
									onClick={handleRefresh}
								>
									Refresh Data
								</Button>
							</div>
						</div>
					</CardFooter>
				</Card>

				{/* Recent Activities */}
				<Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40 rounded-2xl">
					<CardHeader className="border-b border-gray-100 dark:border-gray-800">
						<CardTitle className="text-[#14F195] flex items-center">
							<Layers className="mr-2 h-5 w-5" /> Recent Activities
						</CardTitle>
						<CardDescription className="text-gray-400">
							Your latest transactions and activities
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-6">
						<div className="space-y-4">
							<div className="border-b border-gray-100 dark:border-gray-800 pb-3">
								<div className="flex justify-between items-start">
									<div className="flex items-start">
										<div className="bg-[#14F195]/20 p-2 rounded-full mr-3">
											<ArrowUpRight className="h-4 w-4 text-[#14F195]" />
										</div>
										<div>
											<div className="font-medium">Staked 5 SOL</div>
											<div className="text-xs text-gray-400">Jul 28, 2025</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-[#14F195]">+0.35 SOL</div>
										<div className="text-xs text-gray-400">
											Est. Yearly Rewards
										</div>
									</div>
								</div>
							</div>

							<div className="border-b border-gray-100 dark:border-gray-800 pb-3">
								<div className="flex justify-between items-start">
									<div className="flex items-start">
										<div className="bg-[#9945FF]/20 p-2 rounded-full mr-3">
											<ArrowUpRight className="h-4 w-4 text-[#9945FF]" />
										</div>
										<div>
											<div className="font-medium">Added Liquidity</div>
											<div className="text-xs text-gray-400">Jul 25, 2025</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-sm">SOL/USDC Pool</div>
										<div className="text-xs text-gray-400">
											500 USDC + 3.2 SOL
										</div>
									</div>
								</div>
							</div>

							<div className="border-b border-gray-100 dark:border-gray-800 pb-3">
								<div className="flex justify-between items-start">
									<div className="flex items-start">
										<div className="bg-orange-500/20 p-2 rounded-full mr-3">
											<ArrowDownRight className="h-4 w-4 text-orange-500" />
										</div>
										<div>
											<div className="font-medium">Swapped Tokens</div>
											<div className="text-xs text-gray-400">Jul 20, 2025</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-sm">2.5 SOL → 350 BONK</div>
										<div className="text-xs text-gray-400">
											Rate: 140 BONK/SOL
										</div>
									</div>
								</div>
							</div>

							<div>
								<div className="flex justify-between items-start">
									<div className="flex items-start">
										<div className="bg-[#14F195]/20 p-2 rounded-full mr-3">
											<ArrowUpRight className="h-4 w-4 text-[#14F195]" />
										</div>
										<div>
											<div className="font-medium">Received Rewards</div>
											<div className="text-xs text-gray-400">Jul 15, 2025</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-[#14F195]">+0.12 SOL</div>
										<div className="text-xs text-gray-400">Staking Rewards</div>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
						<Button variant="link" className="text-[#9945FF] hover:text-[#8035e0] transition-colors w-full">
							View All Transactions
						</Button>
					</CardFooter>
				</Card>
				{/* Solana-themed gradient background */}
				<div className="fixed inset-0 -z-50 opacity-20">
					<div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/30 to-[#14F195]/30 animate-aurora"></div>
				</div>

				{/* Add keyframes for animation and font-family */}
				<style>{`
				@keyframes aurora {
				  0% { transform: rotate(0deg); }
				  100% { transform: rotate(360deg); }
				}
				.animate-aurora {
				  animation: aurora 20s linear infinite;
				}
				.font-space-grotesk {
				  font-family: 'Space Grotesk', sans-serif;
				}
				
				/* Solana wallet adapter custom styles */
				.wallet-adapter-button {
				  background-color: #9945FF;
				  transition: all 0.2s ease;
				}
				.wallet-adapter-button:hover {
				  background-color: #8035e0;
				}
				.wallet-adapter-button:not([disabled]):hover {
				  background-color: #8035e0;
				}
			`}</style>
			</div>
		</div>
	);
}