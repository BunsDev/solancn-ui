"use client";
import type React from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection } from '@solana/wallet-adapter-react';
import { toast } from "sonner";
import WalletStatus from '@/components/solana/wallet-status';

// TypeScript interface for the props of each NFT card
interface NftCardProps {
	id: string;
	imageUrl: string;
	title: string;
	creator: string;
	price: string;
	timeLeft: string;
	mintAddress: string;
}

// Data for the NFT cards with Solana pricing
const nftData: NftCardProps[] = [
	{
		id: "ethereal-dreams-001",
		imageUrl:
			"https://i.pinimg.com/1200x/93/b6/9f/93b69fd5d973b3f2fbc325982eb8e658.jpg",
		title: "Ethereal Dreams",
		creator: "Solana Artist",
		price: "1.2 SOL",
		timeLeft: "08:10:00",
		mintAddress: "9xszp3bPJP5XUHzBqEHmJcU1i3LpGJBZCYW3BEXoHagF"
	},
	{
		id: "crystal-harmony-002",
		imageUrl:
			"https://i.pinimg.com/1200x/c5/3e/6e/c53e6e265a893d70b00070563d063606.jpg",
		title: "Crystal Harmony",
		creator: "SolFlare Studio",
		price: "0.8 SOL",
		timeLeft: "10:40:00",
		mintAddress: "HNooSrJHAg1CcPdxLDhQL7hmwUYDxWg6FiMQU8ZYQgFE"
	},
	{
		id: "celestial-arch-003",
		imageUrl:
			"https://i.pinimg.com/736x/c6/1c/ae/c61cae893723278b817cd64ffc966bf8.jpg",
		title: "Celestial Arch",
		creator: "DegenApe",
		price: "0.9 SOL",
		timeLeft: "03:45:00",
		mintAddress: "2a2n7PJgvRQEoA5MT6HwbNsrk1Ger4bozPL5tq5V48T2"
	},
	{
		id: "quantum-sphere-004",
		imageUrl:
			"https://i.pinimg.com/1200x/e1/6c/58/e16c5867c9dcb1334d45cf51caee3563.jpg",
		title: "Quantum Sphere",
		creator: "Metaplex Creator",
		price: "1.1 SOL",
		timeLeft: "02:30:00",
		mintAddress: "FRkNDaZEVMxRMqNTNdLNuZXJA5hXvrHqvp2hAMuBaLs1"
	},
	{
		id: "digital-nexus-005",
		imageUrl:
			"https://i.pinimg.com/736x/c0/09/b1/c009b1bd4d8bb5439c59221e2eca7516.jpg",
		title: "Digital Nexus",
		creator: "MemeLab",
		price: "2.0 SOL",
		timeLeft: "",
		mintAddress: "GHRoqDZAT7zJgx4KYCbMM7munGBJoQXdKMj2CxKHnYms"
	},
	{
		id: "cosmic-voyage-006",
		imageUrl:
			"https://i.pinimg.com/736x/fb/27/0f/fb270f928d2af556c9d97f2af5fb908d.jpg",
		title: "Cosmic Voyage",
		creator: "Phantom Gallery",
		price: "4.2 SOL",
		timeLeft: "22:05:00",
		mintAddress: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E"
	},
	{
		id: "future-vision-007",
		imageUrl:
			"https://i.pinimg.com/1200x/af/5f/3d/af5f3d7fc5d2cd647fc5559c86b61096.jpg",
		title: "Future Vision",
		creator: "SolSea Collective",
		price: "2.3 SOL",
		timeLeft: "15:30:00",
		mintAddress: "So11111111111111111111111111111111111111112"
	},
	{
		id: "neo-genesis-008",
		imageUrl:
			"https://i.pinimg.com/736x/a8/13/20/a81320aa1ad808fa2fe9d05d06f06a6c.jpg",
		title: "Neo Genesis",
		creator: "Magic Eden Arts",
		price: "5.5 SOL",
		timeLeft: "01:15:00",
		mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
	},
	{
		id: "neon-warrior-009",
		imageUrl:
			"https://i.pinimg.com/1200x/4a/2a/8b/4a2a8b8d5c9a4cccc8de1e015119dfb3.jpg",
		title: "Neon Warrior",
		creator: "Solport",
		price: "3.1 SOL",
		timeLeft: "07:55:00",
		mintAddress: "kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6"
	},
	{
		id: "stellar-guardian-010",
		imageUrl:
			"https://i.pinimg.com/1200x/97/67/23/976723dda78a202b1ddbc5fc674c7511.jpg",
		title: "Stellar Guardian",
		creator: "Solanart",
		price: "9.5 SOL",
		timeLeft: "18:00:00",
		mintAddress: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"
	},
	{
		id: "dimensional-gate-011",
		imageUrl:
			"https://i.pinimg.com/1200x/67/99/6a/67996a2154fd2a8da518e4bfb45c1474.jpg",
		title: "Dimensional Gate",
		creator: "DeGods",
		price: "11.4 SOL",
		timeLeft: "11:20:00",
		mintAddress: "7i5KKsX2weiTkry7jA4ZwSd4dprreFGGFf8RNyGqfvhU"
	},
	{
		id: "auric-flow-012",
		imageUrl:
			"https://i.pinimg.com/1200x/2a/59/11/2a591199f4558350175dd0b2e120558a.jpg",
		title: "Auric Flow",
		creator: "Candy Machine",
		price: "13.5 SOL",
		timeLeft: "04:45:00",
		mintAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
	},
];

// SVG Icon Components
const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12 6V12L16 14"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.9501 2.99817C16.2277 2.99817 15.5122 3.14052 14.8447 3.41708C14.1772 3.69364 13.5707 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05008 2.9987C5.59102 2.9987 4.19174 3.5783 3.16008 4.60999C2.12843 5.64166 1.54883 7.04094 1.54883 8.49999C1.54883 9.95905 2.12843 11.3583 3.16008 12.39L12.0001 21.23L20.8401 12.39C21.8717 11.3583 22.4513 9.95905 22.4513 8.49999C22.4513 7.04094 21.8717 5.64166 20.8401 4.60999Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const SolIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M19.9995 4.99989L16.4995 7.39989L4.29953 16.4999L4.00055 18.9999L6.50055 18.6999L18.5995 9.69989L22.0005 7.29989L19.9995 4.99989Z"
			fill="currentColor"
		/>
		<path
			d="M19.9995 4.99989L16.4995 7.39989L18.5995 9.69989L22.0005 7.29989L19.9995 4.99989Z"
			fill="currentColor"
			fillOpacity="0.8"
		/>
		<path 
			d="M4.00055 5.00012L6.50055 5.30012L18.5995 14.3001L16.4995 16.6001L4.29953 7.50012L4.00055 5.00012Z"
			fill="currentColor"
			fillOpacity="0.6"
		/>
	</svg>
);

// The NFT Card Component
const NftCard: React.FC<NftCardProps> = ({
	imageUrl,
	title,
	creator,
	price,
	timeLeft,
	mintAddress,
}) => {
	const handleBuy = () => {
		toast.info("Connecting to wallet...", {
			description: `Preparing to purchase ${title} for ${price}`,
		});
		// This would be connected to a Solana transaction in a real application
		setTimeout(() => {
			toast.success("NFT purchase prepared", {
				description: "Please confirm the transaction in your wallet",
			});
		}, 1000);
	};

	return (
		<div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-700 w-full font-space-grotesk">
			<div className="relative p-2 sm:p-2.5">
				{/* Card Image Section */}
				<div className="relative">
					<img
						src={imageUrl}
						alt={title}
						className="w-full h-auto rounded-xl sm:rounded-2xl object-cover aspect-square"
					/>

					{/* Overlays */}
					{timeLeft && (
						<div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/70 dark:bg-black/70 text-white text-xs sm:text-sm font-semibold px-2 py-1 sm:px-4 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-2 backdrop-blur-sm border border-white/20">
							<ClockIcon className="w-3 h-3 sm:w-5 sm:h-5 text-[#14F195]" />
							<span className="hidden sm:inline">{timeLeft}</span>
							<span className="sm:hidden">{timeLeft.split(":")[0]}h</span>
						</div>
					)}

					<button className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 dark:bg-black/70 text-white p-1.5 sm:p-2.5 rounded-full transition-colors hover:text-[#9945FF] backdrop-blur-sm border border-white/20">
						<HeartIcon className="w-4 h-4 sm:w-6 sm:h-6" />
					</button>
				</div>

				{/* Card Content Section */}
				<div className="mt-3 sm:mt-4 px-1 sm:px-1.5 pb-2 sm:pb-3 pt-1 sm:pt-2">
					<div className="flex justify-between items-center">
						<h3
							className="text-base sm:text-xl font-bold text-gray-900 dark:text-white truncate pr-2"
							title={title}
						>
							{title}
						</h3>
						<SolIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#9945FF] dark:text-[#9945FF] flex-shrink-0" />
					</div>

					<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
						Creator: {creator}
					</p>

					<div className="mt-3 sm:mt-4 flex justify-between items-center">
						<p className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
							Price
						</p>
						<p className="text-sm sm:text-lg font-bold text-[#14F195] dark:text-[#14F195]">
							{price}
						</p>
					</div>
					
					<button 
						onClick={handleBuy}
						className="mt-3 w-full py-1.5 sm:py-2 bg-[#9945FF] hover:bg-[#8035e0] text-white text-sm sm:text-base font-semibold rounded-lg transition-colors"
					>
						Buy Now
					</button>
				</div>
			</div>
		</div>
	);
};

// Main App Component to display the grid of NFT cards
const NftMarket: React.FC = () => {
	const { publicKey, connecting, connected } = useWallet();
	const { connection } = useConnection();
	
	return (
		<div className="relative p-4 sm:p-6 lg:p-8 overflow-hidden">
			{/* Import wallet adapter styles */}
			<style>{
				`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
				 @import url('https://cdnjs.cloudflare.com/ajax/libs/sol-wallet-adapter/0.1.5/styles.min.css');`
			}</style>

			<div className="relative z-10 w-full max-w-[1600px] mx-auto">
				{/* Header Section with Wallet Button */}
				<div className="mb-6 sm:mb-8 lg:mb-12">
					<div className="flex flex-col md:flex-row justify-between items-center mb-6">
						<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0 font-space-grotesk">
							Solana NFT Marketplace
						</h1>
						<div className="flex items-center gap-4">
							<WalletStatus />
							<div className="wallet-adapter-dropdown">
								<WalletMultiButton className="wallet-adapter-button-trigger bg-[#9945FF] hover:bg-[#8035e0] text-white" />
							</div>
						</div>
					</div>
					<div className="text-center md:text-left">
						<p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-slate-400 max-w-2xl px-4 md:px-0">
							Discover, collect, and trade unique digital assets on Solana
						</p>
						
					</div>
				</div>

				{/* NFT Statistics */}
				<div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center">
							<p className="text-sm text-gray-500 dark:text-gray-400">Floor Price</p>
							<p className="text-2xl font-bold text-[#9945FF]">0.8 SOL</p>
						</div>
						<div className="text-center">
							<p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
							<p className="text-2xl font-bold text-[#9945FF]">1.2K SOL</p>
						</div>
						<div className="text-center">
							<p className="text-sm text-gray-500 dark:text-gray-400">Items</p>
							<p className="text-2xl font-bold text-[#9945FF]">12</p>
						</div>
						<div className="text-center">
							<p className="text-sm text-gray-500 dark:text-gray-400">Owners</p>
							<p className="text-2xl font-bold text-[#9945FF]">8</p>
						</div>
					</div>
				</div>

				{/* Fully responsive grid with 4 columns max on desktop */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
					{nftData.map((nft) => (
						<NftCard key={nft.id} {...nft} />
					))}
				</div>
			</div>
			
			{/* Solana-themed gradient background */}
			<div className="fixed inset-0 z-0 opacity-20">
				<div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/30 to-[#14F195]/30 animate-aurora"></div>
			</div>
			
			{/* Add keyframes for animation and font-family */}
			<style>{`
				@keyframes aurora {
				  0% { transform: rotate(0deg); }
				  100% { transform: rotate(360deg); }
				}
				.animate-aurora {
				  animation: aurora 20s linear infinite;
				}
				.font-space-grotesk {
				  font-family: 'Space Grotesk', sans-serif;
				}
				
				/* Solana wallet adapter custom styles */
				.wallet-adapter-button {
				  background-color: #9945FF;
				  transition: all 0.2s ease;
				}
				.wallet-adapter-button:hover {
				  background-color: #8035e0;
				}
				.wallet-adapter-button:not([disabled]):hover {
				  background-color: #8035e0;
				}
			`}</style>
		</div>
	);
};

export default NftMarket;
