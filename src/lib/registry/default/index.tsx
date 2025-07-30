import * as React from "react";

// Button component example
export const Button = {
	component: () => (
		<button className="inline-flex items-center justify-center rounded-md bg-[#9945FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#8035EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors">
			Default Button
		</button>
	),
	type: "component" as const,
};

// Card component example
export const Card = {
	component: () => (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<h3 className="text-lg font-medium">Default Card</h3>
			<p className="mt-2 text-gray-600">
				This is a card component with Solana styling.
			</p>
			<div className="mt-4">
				<button className="inline-flex items-center text-[#9945FF] hover:text-[#8035EF]">
					Learn more
					<svg
						className="ml-1 h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	),
	type: "component" as const,
};

// Alert component example
export const Alert = {
	component: () => (
		<div className="rounded-md bg-[#14F195]/20 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<svg
						className="h-5 w-5 text-[#14F195]"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="ml-3">
					<p className="text-sm font-medium text-gray-900">Success Alert</p>
					<p className="mt-1 text-sm text-gray-700">
						Your transaction has been confirmed.
					</p>
				</div>
			</div>
		</div>
	),
	type: "component" as const,
};

// Badge component example
export const Badge = {
	component: () => (
		<span className="inline-flex items-center rounded-full bg-[#9945FF]/10 px-2.5 py-0.5 text-xs font-medium text-[#9945FF]">
			New
		</span>
	),
	type: "component" as const,
};

// WalletConnect component example
export const WalletConnect = {
	component: () => (
		<button className="inline-flex items-center rounded-md bg-gradient-to-r from-[#9945FF] to-[#14F195] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all">
			<svg
				className="mr-2 h-4 w-4"
				fill="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M21.17 2.06L13.5 9.73a2.98 2.98 0 01-4.24 0L1.83 2.06A1.5 1.5 0 013.89.5h15.22a1.5 1.5 0 011.06 2.56zM3.89 23.5a1.5 1.5 0 01-1.06-2.56l7.67-7.67a2.98 2.98 0 014.24 0l7.67 7.67a1.5 1.5 0 01-1.06 2.56H3.89z" />
			</svg>
			Connect Wallet
		</button>
	),
	type: "component" as const,
};

// StakingCard component example
export const StakingCard = {
	component: () => (
		<div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-medium">Stake SOL</h3>
				<span className="rounded-md bg-[#14F195]/20 px-2 py-1 text-xs font-medium text-[#14F195]">
					6.8% APY
				</span>
			</div>
			<div className="mt-4 space-y-4">
				<div>
					<label className="text-sm font-medium text-gray-700">
						Amount to stake
					</label>
					<div className="mt-1 flex rounded-md shadow-sm">
						<input
							type="text"
							className="block w-full flex-1 rounded-md border-gray-300 focus:border-[#9945FF] focus:ring-[#9945FF] sm:text-sm"
							placeholder="0.0"
						/>
						<span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
							SOL
						</span>
					</div>
				</div>
				<button className="w-full rounded-md bg-[#9945FF] py-2 px-4 text-center text-sm font-medium text-white hover:bg-[#8035EF] focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:ring-offset-2">
					Stake
				</button>
			</div>
		</div>
	),
	type: "component" as const,
};
