"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

// Define the particle type
type Particle = {
	x: number;
	y: number;
	size: number;
	color: string;
	speed: number;
};

export default function NotFound() {
	// Animation particles state
	const [particles, setParticles] = useState<Particle[]>([]);

	// Generate particles on mount
	useEffect(() => {
		const generateParticles = () => {
			const colors = [
				"#9945FF",
				"#14F195",
				"#000000",
				"#9945FF50",
				"#14F19550",
			];
			const newParticles: Particle[] = [];
			for (let i = 0; i < 50; i++) {
				newParticles.push({
					x: Math.random() * 100,
					y: Math.random() * 100,
					size: Math.random() * 10 + 2,
					color: colors[Math.floor(Math.random() * colors.length)],
					speed: Math.random() * 2 + 0.5,
				});
			}
			setParticles(newParticles);
		};

		generateParticles();
	}, []);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black/5 dark:bg-slate-950 px-4 tablet:px-8">
					{/* Floating particles background */}
					{particles.map((particle: Particle, index: number) => (
						<motion.div
							key={index}
							className="absolute rounded-full"
							style={{
								backgroundColor: particle.color,
								width: `${particle.size}px`,
								height: `${particle.size}px`,
								left: `${particle.x}%`,
								top: `${particle.y}%`,
							}}
							animate={{
								y: [`${particle.y}%`, `${(particle.y + 20) % 100}%`],
								x: [
									`${particle.x}%`,
									`${(particle.x + (Math.random() * 10 - 5)) % 100}%`,
								],
								opacity: [0.7, 0.3, 0.7],
							}}
							transition={{
								duration: 10 / particle.speed,
								repeat: Infinity,
								repeatType: "reverse",
								ease: "easeInOut",
							}}
						/>
					))}

					{/* Content container */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="relative z-10 flex w-full max-w-[35rem] flex-col items-center gap-8 rounded-2xl bg-white/70 dark:bg-slate-900/70 p-8 text-center backdrop-blur-md border border-purple-500/20"
					>
						{/* 404 heading */}
						<motion.div
							initial={{ y: -20 }}
							animate={{ y: 0 }}
							className="flex flex-col items-center"
						>
							<h1 className="font-black text-8xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
								404
							</h1>
							<div className="h-1 w-40 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full my-2"></div>
						</motion.div>

						{/* Messages */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="space-y-4"
						>
							<h2 className="font-bold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100">
								Page Not Found
							</h2>
							<p className="text-slate-600 dark:text-slate-300 text-lg max-w-md mx-auto">
								Looks like you&apos;ve ventured into uncharted territory. This
								page doesn&apos;t exist in Solancn UI.
							</p>
						</motion.div>

						{/* Action buttons */}
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4 }}
							className="flex flex-col sm:flex-row gap-4 mt-4"
						>
							<Link
								href="/"
								className="inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-sm transition duration-200 ease-in-out text-lg justify-center font-bold h-12 px-8 rounded-xl bg-[#9945FF] hover:bg-[#8A3DF7] text-white border-[#9945FF]/30 hover:border-[#9945FF]/50 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:ring-offset-2 backdrop-blur-sm"
							>
								Back to Home
							</Link>
							<Link
								href="/templates"
								className="inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-sm transition duration-200 ease-in-out text-lg justify-center font-bold h-12 px-8 rounded-xl bg-[#14F195]/20 hover:bg-[#14F195]/30 text-[#14F195] dark:text-[#14F195] border-[#14F195]/30 hover:border-[#14F195]/50 focus:outline-none focus:ring-2 focus:ring-[#14F195]/50 focus:ring-offset-2 backdrop-blur-sm"
							>
								Explore Templates
							</Link>
						</motion.div>
					</motion.div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
