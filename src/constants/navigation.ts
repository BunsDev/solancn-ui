import { NavigationItem } from "@/types/navigation";


export const docsNavigation: NavigationItem[] = [
	{
		itemName: "Getting Started",
		href: "/docs/introduction",
		children: [
			{ childName: "Introduction", href: "/docs/introduction" },
			{ childName: "Installation", href: "/docs/installation" },
		],
	},
];

export const componentsNavigation: NavigationItem[] = [
	{
		itemName: "Badges",
		href: "/components/badge",
		children: [
			{ childName: "Badges", href: "/components/badge" },
			{ childName: "Toasts", href: "/components/toast" },
		],
	},
	{
		itemName: "Blocks",
		href: "/components/hero",
		children: [
			{ childName: "Hero", href: "/components/hero" },
			// { childName: "Header", href: "/components/navbar" },
			{ childName: "Pricing", href: "/components/pricing" },
			// { childName: "Testimonial", href: "/components/testimonial" },
			// { childName: "Forgot Password", href: "/components/forgotpassword" },
			// { childName: "Integrations", href: "/components/integrations" }, // √
			// { childName: "Network", href: "/components/network" }, // √
			// { childName: "Image Swiper", href: "/components/imageswiper" }, // √
			// { childName: "Noise", href: "/components/noise" },
		],
	},
	{
		itemName: "Buttons",
		href: "/components/button",
		children: [
			{ childName: "Buttons", href: "/components/button" },
			{ childName: "Dropdown", href: "/components/dropdown" },
			// { childName: "Shimmer Button", href: "/components/shimmer" },
			{ childName: "Drawer", href: "/components/drawer" },
		],
	},
	{
		itemName: "Cards",
		href: "/components/card",
		children: [
			// { childName: "Login", href: "/components/login" },
			// { childName: "Login", href: "/components/signin" },
			// { childName: "Newsletter", href: "/components/waitlist" },
			{ childName: "2FA", href: "/components/twostep" },
			{ childName: "Card", href: "/components/card" },
			// { childName: "Portfolio", href: "/components/portfolio" }, // √

			// { childName: "Amazon Gift Card", href: "/components/amazongift" },
			// { childName: "Magic Card", href: "/components/magic" },
			// { childName: "Gradient", href: "/components/gradient" },
			// { childName: "Spotlight Card", href: "/components/spotlightcard" },
			{ childName: "Multi-Select", href: "/components/multiselector" },
		],
	},
	{
		itemName: "Grids",
		href: "/components/grid",
		children: [
			{ childName: "Masonary Grid", href: "/components/masonary" },
			{ childName: "Bento Grid", href: "/components/bento-grid" },
		],
	},
	{
		itemName: "Inputs",
		href: "/components/input",
		children: [
			{ childName: "Search", href: "/components/search" },
			{ childName: "Prompt", href: "/components/prompt" },
			{ childName: "Password", href: "/components/password" },
		],
	},
	{
		itemName: "Tabs",
		href: "/components/accordion",
		children: [
			// { childName: "Dock Tabs", href: "/components/doctabs" },
			// { childName: "Carousel", href: "/components/carousel" },
			{ childName: "Tabs", href: "/components/tabs" },
			// { childName: "Fancy Tabs", href: "/components/tabs-fancy" },
			// { childName: "Classic Tabs", href: "/components/tabs-classic" },
			// { childName: "Dock", href: "/components/dock" },
			// { childName: "File Tree", href: "/components/filetree" },
			{ childName: "Install", href: "/components/copybutton" },
			{ childName: "Accordion", href: "/components/accordion" },
			// { childName: "Fancy", href: "/components/accordion-last" },
			{ childName: "Divider", href: "/components/divider" },
		],
	},
	{
		itemName: "Texts",
		href: "/components/text",
		children: [
			{ childName: "Animated", href: "/components/text" },
			{ childName: "Fuzzy", href: "/components/fuzzy" },
			// { childName: "Changing", href: "/components/flipwords" },
			// { childName: "Reveal", href: "/components/textreveal" },
			{ childName: "Decrypt", href: "/components/decrypting" },
			// { childName: "Aurora", href: "/components/aurora" }, // √
			{ childName: "Ticker", href: "/components/ticker" },
			// { childName: "ResizeHandle", href: "/components/resize-handle" },
		],
	},


];

export const templatesNavigation: NavigationItem[] = [
	{
		itemName: "Templates",
		href: "/templates/nft-market",
		children: [
			{ childName: "NFT Market", href: "/templates/nft-market" },
			{ childName: "Bridge", href: "/templates/bridge" },
			{ childName: "Stake", href: "/templates/stake" },
			// { childName: "Wallet", href: "/templates/wallet" },
			// { childName: "Trading View", href: "/templates/tradingview" },
			// { childName: "Portfolio View", href: "/templates/portfolio-view" },

			// { childName: "Lending Market", href: "/templates/lendingmarket" },
			{ childName: "DeFi Dashboard", href: "/templates/defi-dashboard" },
			// { childName: "DeFi Portfolio", href: "/templates/defiportfolio" },

			// { childName: "NFT Gallery", href: "/templates/nftgallery" },
			// { childName: "NFT Collection", href: "/templates/nftcollection" },
		],
	},
];

export const designsNavigation: NavigationItem[] = [
	{
		itemName: "Design",
		href: "/components/pattern",
		children: [
			{ childName: "Pattern", href: "/components/pattern" },
			{ childName: "Colors", href: "/components/colors" },
			{ childName: "Typography", href: "/components/typography" },
		],
	},
];
