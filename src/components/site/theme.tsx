"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();

	const isDark = theme === "dark";

	const toggleTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<Button
			onClick={toggleTheme}
			variant="ghost"
			size="icon"
			className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
		>
			{isDark ? (
				<Icon
					icon="fa7-solid:sun"
					className="h-6 w-6 fill-zinc-950 dark:fill-zinc-50"
				/>
			) : (
				<Icon
					icon="fa7-solid:moon"
					className="h-6 w-6 fill-zinc-950 dark:fill-zinc-50"
				/>
			)}
		</Button>
	);
};
