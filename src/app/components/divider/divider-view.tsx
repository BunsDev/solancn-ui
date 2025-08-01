"use client";
import Divider from "./divider";

export default function DividerView() {
	return (
		<div className="flex flex-col gap-8 w-full max-w-full mx-auto p-4 bg-black text-white">
			<div className="w-full rounded-lg">
				<div className="text-sm text-[#14F195] mb-1">Total Transactions</div>
				<div className="text-3xl font-semibold text-white mb-6">1,587</div>

				<Divider color="purple">
					<span>Transaction Details</span>
				</Divider>

				<p className="text-sm text-zinc-300 mt-6 leading-relaxed">
					Transaction volume peaked in March, largely due to the{" "}
					<b style={{ color: "#14F195" }}>&ldquo;Solana Breakpoint&rdquo;</b> event,
					drawing significant developer interest. Network upgrades and 
					DeFi protocol launches further boosted activity. Additionally, targeted
					Solana developer grants ahead of the event significantly increased
					smart contract deployments.
				</p>
			</div>

			{/* Text section divider */}
			<Divider variant="dashed" thickness={2} color="green">
				<span>Network Statistics</span>
			</Divider>

			{/* Solana-styled button in divider */}
			<Divider color="purple">
				<button
					className="relative inline-flex items-center justify-center whitespace-nowrap border px-4 py-2 text-center text-sm font-medium shadow-sm transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:shadow-none outline-offset-2 outline-0 focus-visible:outline-2 border-[#9945FF] text-white bg-[#9945FF]/90 hover:bg-[#9945FF] disabled:text-gray-400 rounded-lg"
				>
					View All Transactions
				</button>
			</Divider>

			{/* Solana icon example */}
			<Divider color="green">
				<span className="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 32 32"
					>
						<path d="M6.361 20.881c0.182-0.182 0.433-0.295 0.711-0.295h24.576c0.446 0 0.67 0.541 0.354 0.857l-6.358 6.361c-0.182 0.182-0.433 0.295-0.711 0.295h-24.576c-0.446 0-0.67-0.541-0.354-0.857l6.358-6.361z"></path>
						<path d="M6.361 4.655c0.182-0.182 0.433-0.295 0.711-0.295h24.576c0.446 0 0.67 0.541 0.354 0.857l-6.358 6.361c-0.182 0.182-0.433 0.295-0.711 0.295h-24.576c-0.446 0-0.67-0.541-0.354-0.857l6.358-6.361z"></path>
						<path d="M25.639 12.765c-0.182-0.182-0.433-0.295-0.711-0.295h-24.576c-0.446 0-0.67 0.541-0.354 0.857l6.358 6.361c0.182 0.182 0.433 0.295 0.711 0.295h24.576c0.446 0 0.67-0.541 0.354-0.857l-6.358-6.361z"></path>
					</svg>
					Powered by Solana
				</span>
			</Divider>
					{/* Stats divider */}
			<Divider color="purple">
				<span>Key Metrics</span>
			</Divider>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="p-4 rounded-lg bg-[#13131d] border border-[#9945FF]/30">
					<div className="text-sm text-[#14F195] mb-1">TPS</div>
					<div className="text-2xl font-bold">4,128</div>
				</div>
				<div className="p-4 rounded-lg bg-[#13131d] border border-[#9945FF]/30">
					<div className="text-sm text-[#14F195] mb-1">Active Validators</div>
					<div className="text-2xl font-bold">1,785</div>
				</div>
				<div className="p-4 rounded-lg bg-[#13131d] border border-[#9945FF]/30">
					<div className="text-sm text-[#14F195] mb-1">Total Value Locked</div>
					<div className="text-2xl font-bold">$2.45B</div>
				</div>
			</div>
		</div>
	);
}
