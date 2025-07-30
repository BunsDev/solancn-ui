"use client";

import type { RegistryItem } from "@/lib/types";

interface PreviewProps {
	item: RegistryItem;
}

export default function MinimalPreview({ item }: PreviewProps) {
	// Fallback preview for items without a defined preview
	const fallbackPreview = (
		<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#9945FF]/10 to-[#14F195]/10 dark:from-[#9945FF]/20 dark:to-[#14F195]/20">
			<div className="text-center">
				<div className="text-lg font-semibold text-[#9945FF] dark:text-[#14F195]">
					{item.name}
				</div>
				<div className="text-xs text-slate-500 dark:text-slate-400">
					{item.type}
				</div>
			</div>
		</div>
	);

	// Apply proper styling to ensure previews are visible in cards
	return (
		<div className="w-full h-full overflow-hidden bg-slate-950 rounded-t-md border-b border-slate-800">
			<div className="w-full h-full flex items-center justify-center p-4 transform scale-100">
				{item.preview || fallbackPreview}
			</div>
		</div>
	);
}
