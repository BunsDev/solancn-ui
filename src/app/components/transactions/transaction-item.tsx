"use client";

import {
	ArrowDownLeft,
	ArrowRight,
	ArrowUpRight,
	CircleCheck,
	CircleX,
	Clock,
	Coins,
	ExternalLink,
	RefreshCw,
	Shield,
} from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Transaction, TransactionStatus } from "./types";
import { formatAmount, formatDate, truncateAddress } from "./utils";

interface TransactionItemProps {
	transaction: Transaction;
	onClick: () => void;
}

// Helper to determine icon by transaction type
const getTransactionIcon = (type: string) => {
	switch (type.toLowerCase()) {
		case "transfer":
			return <ArrowRight className="h-5 w-5" />;
		case "send":
			return <ArrowUpRight className="h-5 w-5" />;
		case "receive":
			return <ArrowDownLeft className="h-5 w-5" />;
		case "swap":
			return <RefreshCw className="h-5 w-5" />;
		case "stake":
			return <Shield className="h-5 w-5" />;
		case "unstake":
			return <Shield className="h-5 w-5" />;
		case "mint":
			return <Coins className="h-5 w-5" />;
		default:
			return <ArrowRight className="h-5 w-5" />;
	}
};

// Helper to determine status indicator and color
const getStatusIndicator = (status: TransactionStatus) => {
	switch (status) {
		case "confirmed":
			return {
				icon: <CircleCheck className="h-4 w-4" />,
				color:
					"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
				label: "Confirmed",
			};
		case "pending":
			return {
				icon: <Clock className="h-4 w-4" />,
				color:
					"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
				label: "Pending",
			};
		case "failed":
			return {
				icon: <CircleX className="h-4 w-4" />,
				color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
				label: "Failed",
			};
		default:
			return {
				icon: <Clock className="h-4 w-4" />,
				color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
				label: status,
			};
	}
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
	transaction,
	onClick,
}) => {
	const statusInfo = getStatusIndicator(transaction.status);

	return (
		<div
			className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
			onClick={onClick}
		>
			{/* Left side: Icon, type & description */}
			<div className="flex items-center space-x-4 mb-3 md:mb-0">
				<div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300">
					{getTransactionIcon(transaction.type)}
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center">
						<p className="text-sm font-medium text-gray-900 dark:text-gray-100 mr-2 capitalize">
							{transaction.type}
						</p>
						<Badge
							variant="outline"
							className={`${statusInfo.color} flex items-center gap-1 text-xs`}
						>
							{statusInfo.icon}
							<span>{statusInfo.label}</span>
						</Badge>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400 truncate">
						{transaction.description || truncateAddress(transaction.signature)}
					</p>
				</div>
			</div>

			{/* Right side: Amount, date & explorer link */}
			<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
				{/* Amount (conditionally shown) */}
				{transaction.amount && (
					<div className="flex items-center text-right">
						<p
							className={`text-sm font-medium ${
								transaction.type === "receive"
									? "text-green-600 dark:text-green-400"
									: "text-gray-900 dark:text-gray-100"
							}`}
						>
							{transaction.type === "receive" ? "+" : ""}
							{formatAmount(transaction.amount)} {transaction.token}
						</p>
					</div>
				)}

				{/* Date */}
				<div className="flex items-center text-right">
					<p className="text-xs text-gray-500 dark:text-gray-400">
						{formatDate(transaction.timestamp)}
					</p>
				</div>

				{/* Explorer link */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={(e) => {
									e.stopPropagation();
									window.open(
										`https://explorer.solana.com/tx/${transaction.signature}`,
										"_blank",
									);
								}}
							>
								<ExternalLink className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>View on Solana Explorer</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
};
