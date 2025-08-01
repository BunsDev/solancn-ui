import type { Metadata } from "next";
import TransactionsPage from "./transactions";

export const metadata: Metadata = {
	title: "Solana Transactions",
	description: "View and manage your Solana blockchain transactions",
};

export default function Page() {
	return <TransactionsPage />;
}
