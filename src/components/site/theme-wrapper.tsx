"use client";

import { cn } from "@/lib/utils";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
	defaultTheme?: string;
}

export function ThemeWrapper({
	defaultTheme,
	children,
	className,
}: ThemeWrapperProps) {
	return (
		<div
			className={cn(
				`theme-${defaultTheme || "dark"}`,
				"w-full",
				className,
			)}
			style={
				{
					"--radius": `${defaultTheme ? 0.5 : 0.5}rem`,
				} as React.CSSProperties
			}
		>
			{children}
		</div>
	);
}
