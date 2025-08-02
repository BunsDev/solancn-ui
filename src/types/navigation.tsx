import { LucideIcon } from "lucide-react";

export interface NavigationItem {
	itemName: string;
	href?: string;
	badge?: string;
	children?: NavigationChild[];
}

export interface NavigationChild {
	childName: string;
	href?: string;
	badge?: string;
}

export interface Topic {
	name: string;
	logo: React.ElementType;
	plan: string;
	path: string;
	topicContext: string;
}
	
export interface NavMainItemProps {
	title: string;
	href?: string;
	icon?: LucideIcon;
	isActive?: boolean;
	items?: {
		title: string;
		href: string;
		icon?: LucideIcon;
	}[];
}
