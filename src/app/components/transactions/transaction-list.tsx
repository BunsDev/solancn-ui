"use client";

import React from "react";
import { TransactionItem } from "./transaction-item";
import { Transaction } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleMinus } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onTransactionSelect: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  isLoading,
  onTransactionSelect
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800"
          >
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg border-gray-300 dark:border-gray-700">
        <CircleMinus className="h-10 w-10 text-gray-400 mb-3" />
        <h3 className="font-medium text-gray-900 dark:text-gray-100">No transactions found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          There are no transactions matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onClick={() => onTransactionSelect(transaction)}
        />
      ))}
    </div>
  );
};
