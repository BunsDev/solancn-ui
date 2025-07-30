"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    Filter,
    ArrowUpDown,
    RefreshCw,
} from "lucide-react";
import { TransactionList } from "./transaction-list";
import { TransactionDetail } from "./transaction-detail";
import { Transaction } from "./types";
import { mockTransactions } from "./mock-data";

export default function TransactionsPage() {
    return <Transactions />;
}

export const Transactions = () => {
    // State for managing transactions and filters
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    // Fetch transactions (mock for now)
    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            try {
                // In a real implementation, this would fetch from Solana
                // For example: const txns = await connection.getSignaturesForAddress(publicKey)
                setTimeout(() => {
                    setTransactions(mockTransactions);
                    setIsLoading(false);
                }, 1000); // Simulate network delay
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    // Apply filters whenever dependencies change
    useEffect(() => {
        let filtered = [...transactions];

        // Filter by tab (status)
        if (activeTab !== "all") {
            filtered = filtered.filter(tx => tx.status.toLowerCase() === activeTab);
        }

        // Filter by transaction type
        if (selectedType !== "all") {
            filtered = filtered.filter(tx => tx.type === selectedType);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                tx =>
                    tx.signature.toLowerCase().includes(query) ||
                    tx.description.toLowerCase().includes(query)
            );
        }

        // Sort by date
        filtered.sort((a, b) => {
            const dateA = new Date(a.timestamp).getTime();
            const dateB = new Date(b.timestamp).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredTransactions(filtered);
    }, [transactions, activeTab, searchQuery, selectedType, sortOrder]);

    // Handle refreshing transactions
    const handleRefresh = async () => {
        setIsRefreshing(true);
        // In a real implementation, this would re-fetch from Solana
        setTimeout(() => {
            // Simulate updated data by adding a new transaction
            const refreshedTransactions = [...transactions];
            setTransactions(refreshedTransactions);
            setIsRefreshing(false);
        }, 1500);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold">Transactions</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    View and manage your recent Solana transactions
                </p>
            </div>

            {selectedTransaction ? (
                <div>
                    <button
                        className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 mb-4"
                        onClick={() => setSelectedTransaction(null)}
                    >
                        ← Back to transactions
                    </button>
                    <TransactionDetail
                        transaction={selectedTransaction}
                        onClose={() => setSelectedTransaction(null)}
                    />
                </div>
            ) : (
                <>
                    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <TabsList className="bg-gray-100 dark:bg-gray-800">
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="pending">Pending</TabsTrigger>
                                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                                <TabsTrigger value="failed">Failed</TabsTrigger>
                            </TabsList>

                            <div className="flex items-center gap-2">
                                <button
                                    className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${isRefreshing ? "animate-spin text-purple-600" : ""
                                        }`}
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                    aria-label="Refresh transactions"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                </button>
                                <button
                                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                                    aria-label="Sort by date"
                                >
                                    <ArrowUpDown className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Filter and search bar */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search signature or description"
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 min-w-[180px]">
                                <Filter className="w-4 h-4 text-gray-400" />
                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger className="flex-grow">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="transfer">Transfer</SelectItem>
                                        <SelectItem value="swap">Swap</SelectItem>
                                        <SelectItem value="stake">Stake</SelectItem>
                                        <SelectItem value="unstake">Unstake</SelectItem>
                                        <SelectItem value="mint">Mint</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <TabsContent value="all" className="mt-0">
                            <TransactionList
                                transactions={filteredTransactions}
                                isLoading={isLoading}
                                onTransactionSelect={setSelectedTransaction}
                            />
                        </TabsContent>

                        <TabsContent value="pending" className="mt-0">
                            <TransactionList
                                transactions={filteredTransactions}
                                isLoading={isLoading}
                                onTransactionSelect={setSelectedTransaction}
                            />
                        </TabsContent>

                        <TabsContent value="confirmed" className="mt-0">
                            <TransactionList
                                transactions={filteredTransactions}
                                isLoading={isLoading}
                                onTransactionSelect={setSelectedTransaction}
                            />
                        </TabsContent>

                        <TabsContent value="failed" className="mt-0">
                            <TransactionList
                                transactions={filteredTransactions}
                                isLoading={isLoading}
                                onTransactionSelect={setSelectedTransaction}
                            />
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </div>
    );
};
