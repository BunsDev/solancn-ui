export type TransactionStatus = "pending" | "confirmed" | "failed";

export type TransactionType =
	| "transfer"
	| "send"
	| "receive"
	| "swap"
	| "stake"
	| "unstake"
	| "mint"
	| "burn"
	| "vote";

export interface Transaction {
	id: string;
	signature: string;
	type: string; // Using TransactionType would be more restrictive, but this allows for future types
	status: TransactionStatus;
	timestamp: string | Date;
	description: string;
	amount?: number;
	token?: string;
	fee?: number;
	blockHeight?: number;
	sender?: string;
	recipient?: string;
	programId?: string;
	// Additional fields
	instructions?: TransactionInstruction[];
	logs?: string[];
}

export interface TransactionInstruction {
	programId: string;
	data: string;
	accounts: string[];
}

export interface TransactionFilter {
	status?: TransactionStatus | "all";
	type?: string | "all";
	dateRange?: {
		from: Date;
		to: Date;
	};
	search?: string;
}
