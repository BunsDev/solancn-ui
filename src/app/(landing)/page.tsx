import React from "react";
import Header from "@/components/site/header";
import { Footer } from "./_components/footer";
import SolancnHome from "./_components/solancn-home";

// Force static generation for landing page
export const dynamic = 'force-static';

const HomePage = () => {
	return (
		<main className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
			<Header />
			<SolancnHome />
			<Footer />
		</main>
	);
};

export default HomePage;
