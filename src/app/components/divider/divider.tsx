"use client";
import type React from "react";

// Solana theme colors
const SOLANA_COLORS = {
	purple: "#9945FF",
	green: "#14F195",
	black: "#000000",
	darkGray: "#13131d",
};

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
	decorative?: boolean;
	variant?: "solid" | "dashed" | "dotted";
	thickness?: number;
	color?: "purple" | "green" | "default" | string;
	className?: string;
	children?: React.ReactNode;
}

const Divider = ({
	orientation = "horizontal",
	decorative = true,
	variant = "solid",
	thickness = 1,
	color = "default",
	className = "",
	children,
	...props
}: DividerProps) => {
	const baseClasses = "flex items-center";
	const orientationClasses =
		orientation === "horizontal" ? "w-full my-8" : "h-full self-stretch mx-8";

	const variantStyles = {
		solid: "border-solid",
		dashed: "border-dashed",
		dotted: "border-dotted",
	};

	// Map predefined Solana color names to hex values, or use custom color if provided
const resolveColor = () => {
		if (color === "purple") return SOLANA_COLORS.purple;
		if (color === "green") return SOLANA_COLORS.green;
		if (color === "default") return SOLANA_COLORS.purple;
		return color; // Use custom color if provided
	};
	
	const colorStyle = { borderColor: resolveColor() };

	const thicknessStyle =
		orientation === "horizontal"
			? { borderTopWidth: `${thickness}px` }
			: { borderLeftWidth: `${thickness}px` };

	const lineClasses = `
    flex-grow
    ${orientation === "horizontal" ? "border-t" : "border-l"}
    ${variantStyles[variant]}
  `;

	return (
		<div
			className={`${baseClasses} ${orientationClasses} ${className}`}
			role={decorative ? "none" : "separator"}
			aria-orientation={orientation}
			{...props}
		>
			{children ? (
				<>
					<div
						className={lineClasses}
						style={{ ...colorStyle, ...thicknessStyle }}
					></div>
					<span className="flex items-center px-4 text-sm font-medium" style={{ color: color === "green" ? SOLANA_COLORS.green : SOLANA_COLORS.purple }}>
						{children}
					</span>
					<div
						className={lineClasses}
						style={{ ...colorStyle, ...thicknessStyle }}
					></div>
				</>
			) : (
				<div
					className={lineClasses}
					style={{ ...colorStyle, ...thicknessStyle }}
				></div>
			)}
		</div>
	);
};

export default Divider;
