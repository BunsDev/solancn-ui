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
		label: "Components",
		children: [
			{ label: "Marquee", href: "/components/marquee" },
			{ label: "Portfolio", href: "/components/portfolio" }, 			// √
			{ label: "Integrations", href: "/components/integrations" },
			{ label: "Network", href: "/components/network" },
			{ label: "Video Text", href: "/components/video-text" },
			{ label: "Image Swiper", href: "/components/imageswiper" },
			{ label: "Divider", href: "/components/divider" },
			{ label: "Noise", href: "/components/noise" },
			{ label: "GlitchVault Card", href: "/components/glitchvault" },
		],
	},
	{
		label: "Button",
		children: [
			{ label: "Button", href: "/components/button" },
			{ label: "Modern Button", href: "/components/modern-button" },
			{ label: "Glow Button", href: "/components/glow-button" },
			{ label: "Dropdown", href: "/components/dropdown" },
			{ label: "Shimmer Button", href: "/components/shimmer" },
			{ label: "Drawer", href: "/components/drawer" },
		],
	},

	{
		label: "Badge & Toast",
		children: [
			{ label: "Badge", href: "/components/badge" },
			{ label: "Animated Badge", href: "/components/animatedbadge" },
			{ label: "Toast", href: "/components/toast" },
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
			{ label: "Text Animation", href: "/components/text" },
			{ label: "Fuzzy", href: "/components/fuzzy" },
			{ label: "Flip Words", href: "/components/flipwords" },
			{ label: "Text Reveal", href: "/components/textreveal" },
			{ label: "Decrypting", href: "/components/decrypting" },
			{ label: "Aurora Text", href: "/components/aurora" },
			{ label: "Sparkles Text", href: "/components/sparklestext" },
			{ label: "Number Ticker", href: "/components/ticker" },
			{ label: "Letter Glitch", href: "/components/letter-glitch" },
			{ label: "ResizeHandle Text", href: "/components/resize-handle" },
		],
	},
	{
		label: "Tabs",
		children: [
			{ label: "Dock Tabs", href: "/components/doctabs" },
			{ label: "Carousel", href: "/components/carousel" },
			{ label: "Tabs", href: "/components/tabs" },
			{ label: "Fancy Tabs", href: "/components/tabs-fancy" },
			{ label: "Classic Tabs", href: "/components/tabs-classic" },
			{ label: "Dock", href: "/components/dock" },
			{ label: "File Tree", href: "/components/filetree" },
			{ label: "Copy Button", href: "/components/copybutton" },
		],
	},
	{
		label: "Accordion",
		children: [
			{ label: "Accordion", href: "/components/accordion" },
			{ label: "Fancy Accordion", href: "/components/accordion-last" },
			{
				label: "Gradient Accordion",
				href: "/components/gradient-accordion",
			},
		],
	},
	{
		label: "Form & Cards",
		children: [
			{ label: "Login", href: "/components/login" },
			{ label: "Sign In", href: "/components/signin" },
			{ label: "Newsletter", href: "/components/waitlist" },
			{ label: "Card", href: "/components/card" },
			{ label: "Two Step", href: "/components/twostep" },
			{ label: "Amazon Gift Card", href: "/components/amazongift" },
			{ label: "Magic Card", href: "/components/magic" },
			{ label: "Gradient", href: "/components/gradient" },
			{ label: "Spotlight Card", href: "/components/spotlightcard" },
			{ label: "Multi Select", href: "/components/multiselector" },
		],
	},
	{
		label: "Designs",
		children: [
			{ label: "Marquee", href: "/components/marquee" },
			{ label: "Portfolio", href: "/components/portfolio" },
			{ label: "Integrations", href: "/components/integrations" },
			{ label: "Network", href: "/components/network" },
			{ label: "Video Text", href: "/components/video-text" },
			{ label: "Image Swiper", href: "/components/imageswiper" },
			{ label: "Divider", href: "/components/divider" },
			{ label: "Noise", href: "/components/noise" },
			{ label: "GlitchVault Card", href: "/components/glitchvault" },
		],
	},
	{
		label: "Grid",
		children: [
			{ label: "Masonary Grid", href: "/components/masonary" },
			{ label: "Bento Grid", href: "/components/bento-grid" },
		],
	},
	{
		label: "Backgrounds",
		children: [
			{ label: "Falling Glitch", href: "/components/falling-glitch" },
			{ label: "Moving Grid", href: "/components/moving-grid" },
		],
	},
	{
		label: "Websites Blocks",
		children: [
			{ label: "Hero", href: "/components/hero" },
			{ label: "Header", href: "/components/navbar" },
			{ label: "Pricing", href: "/components/pricing" },
			{ label: "Testimonial", href: "/components/testimonial" },
			{ label: "Forgot Password", href: "/components/forgotpassword" },
			{ label: "Team Member", href: "/components/teammember" },
		],
	},
];

export const templatesNavigation: NavigationItem[] = [
	{
		label: "Templates",
		children: [
			{ label: "NFT Market", href: "/templates/nftmarket" },
			{ label: "Bridge", href: "/templates/bridge" },
			{ label: "Staking", href: "/templates/staking" },
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
