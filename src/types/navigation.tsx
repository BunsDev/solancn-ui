export interface NavigationItem {
	label: string;
	href?: string;
	badge?: string;
	children?: NavigationChild[];
}

export interface NavigationChild {
	label: string;
	href?: string;
	badge?: string;
}
