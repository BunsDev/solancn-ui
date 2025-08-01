type NavigationChild = {
	label: string;
	href: string;
	badge?: string; // Optional badge like "New" or "Updated"
};
type NavigationItem = {
	label: string;
	children: NavigationChild[];
};

export const docsNavigation: NavigationItem[] = [
	{
		label: "Getting Started",
		children: [
			{ label: "Introduction", href: "/docs" },
			{ label: "Installation", href: "/docs/installation" },
		],
	},
];
export const componentsNavigation: NavigationItem[] = [
	{
		label: "Blocks",
		children: [
			// { label: "Hero", href: "/components/hero" },
			// { label: "Header", href: "/components/navbar" },
			{ label: "Marquee", href: "/components/marquee" },
			{ label: "Pricing", href: "/components/pricing" },

			// { label: "Testimonial", href: "/components/testimonial" },
			// { label: "Forgot Password", href: "/components/forgotpassword" },
			// { label: "Team Member", href: "/components/teammember" },
			// { label: "Integrations", href: "/components/integrations" },
			// { label: "Network", href: "/components/network" },
			// { label: "Image Swiper", href: "/components/imageswiper" },
			// { label: "Noise", href: "/components/noise" },

		],
	},
	{
		label: "Button",
		children: [
			{ label: "Buttons", href: "/components/button" },
			{ label: "Dropdown", href: "/components/dropdown" },
			// { label: "Shimmer Button", href: "/components/shimmer" },
			{ label: "Drawer", href: "/components/drawer" },
		],
	},

	{
		label: "Badge & Toast",
		children: [
			{ label: "Badges", href: "/components/badge" },
			// { label: "Animated Badges", href: "/components/animatedbadge" },
			{ label: "Toasts", href: "/components/toast" },
		],
	},
	{
		label: "Input",
		children: [
			{ label: "Search", href: "/components/search" },
			{ label: "Prompt", href: "/components/prompt" },
			{ label: "Password", href: "/components/password" },
		],
	},
	{
		label: "Text",
		children: [
			{ label: "Animated", href: "/components/text" },
			{ label: "Fuzzy", href: "/components/fuzzy" },
			// { label: "Changing", href: "/components/flipwords" },
			// { label: "Reveal", href: "/components/textreveal" },
			{ label: "Decrypt", href: "/components/decrypting" },
			// { label: "Aurora", href: "/components/aurora" },
			// { label: "Sparkles Text", href: "/components/sparklestext" },
			{ label: "Ticker", href: "/components/ticker" },
			// { label: "Glitch", href: "/components/letter-glitch" },
			// { label: "ResizeHandle", href: "/components/resize-handle" },
		],
	},
	{
		label: "Accordion & Tabs",
		children: [
			// { label: "Dock Tabs", href: "/components/doctabs" },
			// { label: "Carousel", href: "/components/carousel" },
			{ label: "Tabs", href: "/components/tabs" },
			// { label: "Fancy Tabs", href: "/components/tabs-fancy" },
			// { label: "Classic Tabs", href: "/components/tabs-classic" },
			// { label: "Dock", href: "/components/dock" },
			// { label: "File Tree", href: "/components/filetree" },
			{ label: "Install", href: "/components/copybutton" },
			{ label: "Accordion", href: "/components/accordion" },
			// { label: "Fancy", href: "/components/accordion-last" },
			{ label: "Divider", href: "/components/divider" },
		],
	},
	{
		label: "Forms & Cards",
		children: [
			// { label: "Login", href: "/components/login" },
			// { label: "Login", href: "/components/signin" },
			// { label: "Newsletter", href: "/components/waitlist" },
			{ label: "Card", href: "/components/card" },
			// { label: "Portfolio", href: "/components/portfolio" }, // √

			{ label: "MFA", href: "/components/twostep" },
			// { label: "Amazon Gift Card", href: "/components/amazongift" },
			// { label: "Magic Card", href: "/components/magic" },
			// { label: "Gradient", href: "/components/gradient" },
			// { label: "Spotlight Card", href: "/components/spotlightcard" },
			{ label: "Multi-Select", href: "/components/multiselector" },
		],
	},
	{
		label: "Grid",
		children: [
			{ label: "Masonary Grid", href: "/components/masonary" },
			{ label: "Bento Grid", href: "/components/bento-grid" },
		],
	},
	// {
	// 	label: "Backgrounds",
	// 	children: [
	// 		{ label: "Falling Glitch", href: "/components/falling-glitch" },
	// 		{ label: "Moving Grid", href: "/components/moving-grid" },

	// 	],
	// },

];

export const templatesNavigation: NavigationItem[] = [
	{
		label: "Templates",
		children: [
			{ label: "NFT Market", href: "/templates/nft-market" },
			{ label: "Bridge", href: "/templates/bridge" },
			{ label: "Stake", href: "/templates/stake" },
			// { label: "Wallet", href: "/templates/wallet" },
			// { label: "Trading View", href: "/templates/tradingview" },
			// { label: "Portfolio View", href: "/templates/portfolio-view" },

			// { label: "Lending Market", href: "/templates/lendingmarket" },
			{ label: "DeFi Dashboard", href: "/templates/defi-dashboard" },
			// { label: "DeFi Portfolio", href: "/templates/defiportfolio" },

			// { label: "NFT Gallery", href: "/templates/nftgallery" },
			// { label: "NFT Collection", href: "/templates/nftcollection" },
		],
	},
];
