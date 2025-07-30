// Component imports

import AccordionPage from "@/app/components/accordion/accordion-view";
import AccordionSection from "@/app/components/accordion/accordion2";
import CustomAccordion from "@/app/components/accordion/customAccordion";
import AccordionLast from "@/app/components/accordion-last/accordion-last";
import AmazonGiftCard from "@/app/components/amazongift/amazongift";
import BadgeView from "@/app/components/badge/badge-view";
import BentoGridCom from "@/app/components/bento-grid/bento-grid";
import ActionButton from "@/app/components/button/action";
import ButtonView from "@/app/components/button/button-view";
import CommerceButton from "@/app/components/button/commerce";
import OnlyIconButton from "@/app/components/button/only";
import OthersButton from "@/app/components/button/others";
import RightIconButton from "@/app/components/button/righticon";
import SocialButton from "@/app/components/button/social-button";
import CardView from "@/app/components/card/card-view";
import Carousel from "@/app/components/carousel/carousel";
import CarouselCards from "@/app/components/carousel/carousel2";
import EnhancedCarousel from "@/app/components/carousel/enhanced-carousel";
import ImageCarousel from "@/app/components/carousel/imagecarousel";
import CodeProfile from "@/app/components/codeprofile/codeprofile";
import CopyButton from "@/app/components/copybutton/copybutton";
import CopyButton2 from "@/app/components/copybutton/copybutton2";
import DecryptingText from "@/app/components/decrypting/decrypting";
import ColorfulDock from "@/app/components/dock/colorful-dock";
import Dock from "@/app/components/dock/dock";
import FloatingDock from "@/app/components/dock/floating-dock";
import MinimalDock from "@/app/components/dock/minimal-dock";
import SimpleDock from "@/app/components/dock/simple-dock";
import DocTabs from "@/app/components/doctabs/doctabs";
import { GradientTabsDemo } from "@/app/components/doctabs/doctabs-gradient";
import { VerticalTabsDemo } from "@/app/components/doctabs/doctabs-vertical";
import Dropdown from "@/app/components/dropdown/dropdown";
import NotificationDropdown from "@/app/components/dropdown/notification-dropdown";
import SimpleDropdown from "@/app/components/dropdown/simple-dropdown";
import UserProfileDropdown from "@/app/components/dropdown/user-profile-dropdown";
import FileTree from "@/app/components/filetree/filetree";
import FileTree2 from "@/app/components/filetree/filetree2";
import FlipwordsView from "@/app/components/flipwords/flipwords-view";
import ForgotPassword from "@/app/components/forgotpassword/forgotpassword";
import FuzzySearch from "@/app/components/fuzzy/fuzzy";
import GradientView from "@/app/components/gradient/gradient-view";
import HeroSection from "@/app/components/hero/hero";
import Hero2 from "@/app/components/hero/hero2";
import NexusOrb from "@/app/components/integrations/nexusorb";
import NexusOrbSup from "@/app/components/integrations/nexusorbsup";
import Spider from "@/app/components/integrations/spider";
import Login from "@/app/components/login/login";
import MagicCardView from "@/app/components/magic/magiccard-view";
import MarqueeView from "@/app/components/marquee/marquee-view";
import Header from "@/app/components/navbar/header";
import Header2 from "@/app/components/navbar/header2";
import Navbar from "@/app/components/navbar/navbar";
import Network from "@/app/components/network/network";
import NftMarketplace from "@/app/components/nftmarketplace/nftmarketplace";
import PasswordInput from "@/app/components/password/password";
import StrongPassword from "@/app/components/password/strongPassword";
import CoderProfileCard from "@/app/components/portfolio/portfolio";
import Portfolio2Page from "@/app/components/portfolio/portfolio2";
import Portfolio3Page from "@/app/components/portfolio/portfolio3";
import Portfolio4Page from "@/app/components/portfolio/portfolio4";
import PortfolioHero from "@/app/components/portfolio/portfolio5";
import Pricing from "@/app/components/pricing/pricing";
import Pricing2 from "@/app/components/pricing/pricing2";
import SimplePricing from "@/app/components/pricing/pricing3";
import Prompt from "@/app/components/prompt/prompt";
import VercelV0Chat from "@/app/components/prompt/v0";
import Search from "@/app/components/search/search";
import Shimmer from "@/app/components/shimmer/shimmer";
import TabsView from "@/app/components/tabs/tabs-view";
import TabsClassicView from "@/app/components/tabs-classic/tabs-view-classic";
import TabsFancyView from "@/app/components/tabs-fancy/tabs-view-fancy";
import Testimonial from "@/app/components/testimonial/testimonial";
import Testimonial2 from "@/app/components/testimonial/testimonial2";
import TextReveal from "@/app/components/textreveal/textreveal";
import ToastView from "@/app/components/toast/toast-view";
import TwoStep from "@/app/components/twostep/twostep";

// Component registry mapping component names to their view components
export const ComponentRegistry: Record<string, React.ComponentType> = {
	"button-view": ButtonView,
	"social-button": SocialButton,
	"action-button": ActionButton,
	"right-icon-button": RightIconButton,
	"icon-only-button": OnlyIconButton,
	"commerce-button": CommerceButton,
	"other-buttons": OthersButton,
	card: CardView,
	flipwords: FlipwordsView,
	twostep: TwoStep,
	search: Search,
	password: PasswordInput,
	"strong-password": StrongPassword,
	prompt: Prompt,
	"vercel-v0-chat": VercelV0Chat,
	dropdown: Dropdown,
	"simple-dropdown": SimpleDropdown,
	"user-profile-dropdown": UserProfileDropdown,
	"notification-dropdown": NotificationDropdown,
	dock: Dock,
	"floating-dock": FloatingDock,
	"minimal-dock": MinimalDock,
	"colorful-dock": ColorfulDock,
	"simple-dock": SimpleDock,
	accordion: AccordionPage,
	"accordion-last": AccordionLast,
	amazongift: AmazonGiftCard,
	"amazon-gift-card": AmazonGiftCard,
	codeprofile: CodeProfile,
	"code-profile": CodeProfile,
	decrypting: DecryptingText,
	"decrypting-text": DecryptingText,
	fuzzy: FuzzySearch,
	"fuzzy-search": FuzzySearch,
	login: Login,
	pricing: Pricing,
	"pricing-2": Pricing2,
	"pricing-3": SimplePricing,
	tabs: TabsView,
	"tabs-classic": TabsClassicView,
	"classic-tabs": TabsClassicView,
	"tabs-fancy": TabsFancyView,
	"fancy-tabs": TabsFancyView,
	textreveal: TextReveal,
	"text-reveal": TextReveal,
	carousel: Carousel,
	"enhanced-carousel": EnhancedCarousel,
	customAccordion: CustomAccordion,
	testimonial: Testimonial,
	"testimonial-2": Testimonial2,
	toast: ToastView,
	badge: BadgeView,
	"copy-button": CopyButton,
	"copy-button-2": CopyButton2,
	"file-tree": FileTree,
	"file-tree-2": FileTree2,
	"forgot-password": ForgotPassword,
	gradient: GradientView,
	"magic-card": MagicCardView,
	marquee: MarqueeView,
	navbar: Navbar,
	header: Header,
	"header-2": Header2,
	network: Network,
	shimmer: Shimmer,
	"doc-tabs": DocTabs,
	"doc-tabs-gradient": GradientTabsDemo,
	"doc-tabs-vertical": VerticalTabsDemo,
	"nexus-orb": NexusOrb,
	"nexus-orb-sup": NexusOrbSup,
	spider: Spider,
	hero: HeroSection,
	"hero-2": Hero2,
	CoderProfileCard: CoderProfileCard,
	Portfolio2Page: Portfolio2Page,
	Portfolio3Page: Portfolio3Page,
	NftMarketplace: NftMarketplace,
	ImageCarousel: ImageCarousel,
	Portfolio4Page: Portfolio4Page,
	PortfolioHero: PortfolioHero,
	CarouselCards: CarouselCards,
	AccordionSection: AccordionSection,
	BentoGridCom: BentoGridCom,
	// Add more components here...
};
