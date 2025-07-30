/**
 * Format a date string or Date object to a human-readable format
 * @param date Date string or object to format
 * @param includeTime Whether to include the time in the formatted output
 * @returns Formatted date string
 */
export const formatDate = (
	date: string | Date,
	includeTime = false,
): string => {
	const dateObj = typeof date === "string" ? new Date(date) : date;

	try {
		if (includeTime) {
			return new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			}).format(dateObj);
		}

		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		}).format(dateObj);
	} catch (error) {
		console.error("Error formatting date:", error);
		return "Invalid date";
	}
};

/**
 * Format a number amount to a string with proper decimal places
 * @param amount Number to format
 * @param decimals Number of decimal places to include (default: 6 for SOL)
 * @returns Formatted amount string
 */
export const formatAmount = (amount: number, decimals = 6): string => {
	try {
		// For very small numbers, use scientific notation
		if (amount > 0 && amount < 0.000001) {
			return amount.toExponential(2);
		}

		// For regular numbers, format with fixed decimals
		return amount.toLocaleString("en-US", {
			minimumFractionDigits: 0,
			maximumFractionDigits: decimals,
		});
	} catch (error) {
		console.error("Error formatting amount:", error);
		return amount?.toString() || "0";
	}
};

/**
 * Truncate a long address or signature for display
 * @param address Full address or signature string
 * @param startChars Number of characters to show at the start (default: 6)
 * @param endChars Number of characters to show at the end (default: 4)
 * @returns Truncated address string
 */
export const truncateAddress = (
	address: string,
	startChars = 6,
	endChars = 4,
): string => {
	if (!address) return "";

	if (address.length <= startChars + endChars) {
		return address;
	}

	return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Calculate the time difference between now and a given date in a human-readable format
 * @param date Date string or object to calculate difference from
 * @returns Human readable time difference (e.g., "2 minutes ago")
 */
export const timeAgo = (date: string | Date): string => {
	const dateObj = typeof date === "string" ? new Date(date) : date;
	const now = new Date();

	const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

	// Less than a minute
	if (seconds < 60) {
		return "just now";
	}

	// Less than an hour
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
	}

	// Less than a day
	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours} hour${hours === 1 ? "" : "s"} ago`;
	}

	// Less than a month
	const days = Math.floor(hours / 24);
	if (days < 30) {
		return `${days} day${days === 1 ? "" : "s"} ago`;
	}

	// Less than a year
	const months = Math.floor(days / 30);
	if (months < 12) {
		return `${months} month${months === 1 ? "" : "s"} ago`;
	}

	// Years
	const years = Math.floor(months / 12);
	return `${years} year${years === 1 ? "" : "s"} ago`;
};
