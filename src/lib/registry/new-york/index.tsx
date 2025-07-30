import * as React from "react";

// Button component example with New York style
export const Button = {
	component: () => (
		<button className="inline-flex items-center justify-center rounded-md bg-[#9945FF] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#8035EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9945FF] transition-colors">
			New York Button
		</button>
	),
	type: "component" as const,
};

// Card component example with New York style
export const Card = {
	component: () => (
		<div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
			<div className="flex items-center space-x-2">
				<div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195]"></div>
				<h3 className="text-lg font-semibold">New York Card</h3>
			</div>
			<p className="mt-3 text-gray-600">
				This card component features the Solana brand aesthetic with a modern
				New York style.
			</p>
			<div className="mt-4 flex items-center justify-between">
				<span className="text-sm font-medium text-[#9945FF]">Explore</span>
				<div className="h-1 w-16 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full"></div>
			</div>
		</div>
	),
	type: "component" as const,
};

// Alert component example with New York style
export const Alert = {
	component: () => (
		<div className="rounded-lg bg-[#9945FF]/10 p-4 border-l-4 border-[#9945FF]">
			<div className="flex">
				<div className="flex-shrink-0">
					<svg
						className="h-5 w-5 text-[#9945FF]"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-[#9945FF]">Information</h3>
					<div className="mt-2 text-sm text-gray-700">
						<p>
							This is a New York style alert component with Solana brand colors.
						</p>
					</div>
				</div>
			</div>
		</div>
	),
	type: "component" as const,
};

// Badge component example with New York style
export const Badge = {
	component: () => (
		<span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 px-3 py-0.5 text-xs font-medium text-[#9945FF]">
			New York Badge
		</span>
	),
	type: "component" as const,
};

// WalletConnect component example with New York style
export const WalletConnect = {
	component: () => (
		<button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#9945FF] to-[#14F195] p-0.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-[#9945FF]/50">
			<span className="relative rounded-md bg-white px-5 py-2 transition-all duration-75 ease-in group-hover:bg-opacity-0">
				<span className="flex items-center bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text font-medium text-transparent group-hover:text-white">
					<svg
						className="mr-2 h-4 w-4"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M21.17 2.06L13.5 9.73a2.98 2.98 0 01-4.24 0L1.83 2.06A1.5 1.5 0 013.89.5h15.22a1.5 1.5 0 011.06 2.56zM3.89 23.5a1.5 1.5 0 01-1.06-2.56l7.67-7.67a2.98 2.98 0 014.24 0l7.67 7.67a1.5 1.5 0 01-1.06 2.56H3.89z" />
					</svg>
					Connect Wallet
				</span>
			</span>
		</button>
	),
	type: "component" as const,
};

// StakingCard component example with New York style
export const StakingCard = {
	component: () => (
		<div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195]"></div>
					<h3 className="text-lg font-semibold">Stake SOL</h3>
				</div>
				<span className="inline-flex items-center rounded-full bg-[#14F195]/20 px-3 py-1 text-xs font-semibold text-[#14F195]">
					6.8% APY
				</span>
			</div>
			<div className="mt-4 space-y-4">
				<div>
					<label className="text-sm font-medium text-gray-700">
						Amount to stake
					</label>
					<div className="mt-1 flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-[#9945FF]">
						<input
							type="text"
							className="block w-full flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
							placeholder="0.0"
						/>
						<span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
							SOL
						</span>
					</div>
				</div>
				<button className="w-full rounded-lg bg-gradient-to-r from-[#9945FF] to-[#14F195] py-2 px-4 text-center text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9945FF]">
					Stake Now
				</button>
				<p className="text-xs text-gray-500 text-center">
					No withdrawal fees. Unstake anytime.
				</p>
			</div>
		</div>
	),
	type: "component" as const,
};
