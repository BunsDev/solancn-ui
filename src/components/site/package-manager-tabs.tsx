"use client";

import type React from "react";
import { FaYarn } from "react-icons/fa";
import { SiBun, SiNpm, SiPnpm } from "react-icons/si";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/site/tabs";
import {
	type PackageManager,
	usePackageManager,
} from "@/contexts/package-manager-context";

interface PackageManagerTabsProps {
	children: React.ReactNode;
	className?: string;
}

interface TabContentProps {
	packageManager: PackageManager;
	children: React.ReactNode;
}

// Individual tab content component
export function PMTabContent({ packageManager, children }: TabContentProps) {
	return <TabsContent value={packageManager}>{children}</TabsContent>;
}

// Main package manager tabs component
export function PackageManagerTabs({
	children,
	className,
}: PackageManagerTabsProps) {
	const { packageManager, setPackageManager } = usePackageManager();

	const packageManagers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];

	const getIcon = (pm: PackageManager) => {
		switch (pm) {
			case "npm":
				return <SiNpm className="w-4 h-4" />;
			case "pnpm":
				return <SiPnpm className="w-4 h-4" />;
			case "yarn":
				return <FaYarn className="w-4 h-4" />;
			case "bun":
				return <SiBun className="w-4 h-4" />;
		}
	};

	return (
		<Tabs
			value={packageManager}
			onValueChange={(value) => setPackageManager(value as PackageManager)}
			className={className}
		>
			<TabsList>
				{packageManagers.map((pm) => (
					<TabsTrigger key={pm} value={pm} className="flex items-center gap-2">
						{getIcon(pm)}
						{pm}
					</TabsTrigger>
				))}
			</TabsList>
			{children}
		</Tabs>
	);
}

// Convenience components for each package manager
export function NPMTabContent({ children }: { children: React.ReactNode }) {
	return <PMTabContent packageManager="npm">{children}</PMTabContent>;
}

export function PNPMTabContent({ children }: { children: React.ReactNode }) {
	return <PMTabContent packageManager="pnpm">{children}</PMTabContent>;
}

export function YarnTabContent({ children }: { children: React.ReactNode }) {
	return <PMTabContent packageManager="yarn">{children}</PMTabContent>;
}

export function BunTabContent({ children }: { children: React.ReactNode }) {
	return <PMTabContent packageManager="bun">{children}</PMTabContent>;
}

// Export alias for PackageManagerTabs
export { PackageManagerTabs as PMTabs };
