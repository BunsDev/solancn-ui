import type { Metadata } from "next";
import React from "react";
import Header from "@/components/site/header";
import { Footer } from "./_components/footer";
import SolancnHome from "./_components/home";

// Force static generation for landing page
export const dynamic = "force-static";
// Force static generation for landing page
export const metadata: Metadata = {
	title: "Solancn UI - Modern React Component Library",
	description:
		"Build stunning web applications with Solancn UI's modern React components. Free, open-source, and built with Tailwind CSS & Framer Motion.",
	keywords: [
		"React components",
		"UI library",
		"Tailwind CSS",
		"Framer Motion",
		"TypeScript",
	],
	openGraph: {
		title: "Solancn UI - Modern React Component Library",
		description:
			"Build stunning web applications with Solancn UI's modern React components.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Solancn UI - Modern React Component Library",
		description:
			"Build stunning web applications with Solancn UI's modern React components.",
	},
};

const page = () => {
	return (
		<main className="bg-background dark:bg-background text-text min-h-screen w-full mx-auto justify-center md:w-full">
			<Header />
			<SolancnHome />
			<Footer />
		</main>
	);
};

export default page;
