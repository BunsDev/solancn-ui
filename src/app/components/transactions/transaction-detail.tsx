"use client";

import {
	CheckCircle2,
	CircleCheck,
	CircleX,
	Clock,
	Copy,
	ExternalLink,
	X,
} from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import type { Transaction } from "./types";
import { formatAmount, formatDate, truncateAddress } from "./utils";

interface TransactionDetailProps {
	transaction: Transaction;
	onClose: () => void;
}

export const TransactionDetail: React.FC<TransactionDetailProps> = ({
	transaction,
	onClose,
}) => {
	const { toast } = useToast();
	const [copied, setCopied] = React.useState(false);

	const handleCopySignature = () => {
		navigator.clipboard.writeText(transaction.signature);
		setCopied(true);
		toast({
			title: "Signature copied",
			description: "Transaction signature copied to clipboard",
		});
		setTimeout(() => setCopied(false), 2000);
	};

	const getStatusIcon = () => {
		switch (transaction.status) {
			case "confirmed":
				return <CircleCheck className="h-6 w-6 text-green-500" />;
			case "pending":
				return <Clock className="h-6 w-6 text-yellow-500" />;
			case "failed":
				return <CircleX className="h-6 w-6 text-red-500" />;
			default:
				return <Clock className="h-6 w-6 text-gray-500" />;
		}
	};

	const getStatusClass = () => {
		switch (transaction.status) {
			case "confirmed":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
			case "pending":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
			case "failed":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
		}
	};

	return (
		<div className="w-full">
			<Card className="border border-gray-200 dark:border-gray-800">
				<CardHeader className="flex flex-row items-center justify-between">
					<div className="flex items-center gap-3">
						{getStatusIcon()}
						<CardTitle className="text-xl">Transaction Details</CardTitle>
						<Badge variant="outline" className={getStatusClass()}>
							{transaction.status.charAt(0).toUpperCase() +
								transaction.status.slice(1)}
						</Badge>
					</div>
					<Button variant="ghost" size="icon" onClick={onClose}>
						<X className="h-5 w-5" />
					</Button>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* Transaction Overview */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium">Overview</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Transaction Type */}
							<div className="space-y-1">
								<p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
								<p className="font-medium capitalize">{transaction.type}</p>
							</div>

							{/* Date & Time */}
							<div className="space-y-1">
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Date & Time
								</p>
								<p className="font-medium">
									{formatDate(transaction.timestamp, true)}
								</p>
							</div>

							{/* Amount (if applicable) */}
							{transaction.amount && (
								<div className="space-y-1">
									<p className="text-sm text-gray-500 dark:text-gray-400">
										Amount
									</p>
									<p className="font-medium">
										{formatAmount(transaction.amount)} {transaction.token}
									</p>
								</div>
							)}

							{/* Fee */}
							<div className="space-y-1">
								<p className="text-sm text-gray-500 dark:text-gray-400">Fee</p>
								<p className="font-medium">
									{transaction.fee ? formatAmount(transaction.fee) : "0.000005"}{" "}
									SOL
								</p>
							</div>
						</div>
					</div>

					<Separator />

					{/* Transaction Technical Details */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium">Technical Details</h3>

						<div className="space-y-3">
							{/* Signature with copy button */}
							<div className="flex flex-col space-y-1">
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Signature
								</p>
								<div className="flex items-center gap-2">
									<code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono break-all">
										{transaction.signature}
									</code>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										onClick={handleCopySignature}
									>
										{copied ? (
											<CheckCircle2 className="h-4 w-4 text-green-500" />
										) : (
											<Copy className="h-4 w-4" />
										)}
									</Button>
								</div>
							</div>

							{/* Block Height */}
							<div className="flex flex-col space-y-1">
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Block Height
								</p>
								<p className="font-medium">
									{transaction.blockHeight || "123,456,789"}
								</p>
							</div>

							{/* Sender & Receiver (if available) */}
							{transaction.sender && (
								<div className="flex flex-col space-y-1">
									<p className="text-sm text-gray-500 dark:text-gray-400">
										From
									</p>
									<code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono break-all">
										{transaction.sender}
									</code>
								</div>
							)}

							{transaction.recipient && (
								<div className="flex flex-col space-y-1">
									<p className="text-sm text-gray-500 dark:text-gray-400">To</p>
									<code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono break-all">
										{transaction.recipient}
									</code>
								</div>
							)}
						</div>
					</div>

					{/* Actions */}
					<div className="flex justify-end space-x-3 pt-4">
						<Button variant="outline" onClick={onClose}>
							Close
						</Button>
						<Button
							variant="default"
							className="bg-purple-600 hover:bg-purple-700 text-white"
							onClick={() =>
								window.open(
									`https://explorer.solana.com/tx/${transaction.signature}`,
									"_blank",
								)
							}
						>
							<ExternalLink className="h-4 w-4 mr-2" />
							View on Explorer
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
