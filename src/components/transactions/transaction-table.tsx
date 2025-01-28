'use client';
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Edit, Trash2, PencilOff, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TransactionForm } from '@/components/transactions/transaction-form';
import { Transaction } from '@/lib/api';
import { transactionsApi } from '@/lib/api';
import { useMonthContext } from '@/hooks/month-context';
import { useToast } from '@/hooks/use-toast';
import { formatRupiah } from '@/lib/utils';
import { ExportPDFButton } from './transaction-export';

interface TransactionsTableProps {
  transactions: Transaction[];
  sortConfig: {
    key: keyof Transaction;
    direction: 'asc' | 'desc';
  };
  handleSort: (key: keyof Transaction) => void;
  onUpdateTransactions: (updatedTransactions: Transaction[]) => void;
}

export function TransactionsTable({
  transactions,
  sortConfig,
  handleSort,
  onUpdateTransactions
}: TransactionsTableProps) {
  const { selectedMonth } = useMonthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [showActions, setShowActions] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, transactions]);

  const filteredTransactions = selectedMonth.month === "All" 
    ? transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const transactionYear = format(transactionDate, 'yyyy');
      return transactionYear ===  String(selectedMonth.year);
    }) : transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const transactionMonth = format(transactionDate, 'MMM');
        const transactionYear = format(transactionDate, 'yyyy');
        return transactionMonth === selectedMonth.month && transactionYear ===  String(selectedMonth.year);
      });

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  const SortIcon = ({ columnKey }: { columnKey: keyof Transaction }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc'
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await transactionsApi.delete(transactionId);
      
      const updatedTransactions = transactions.filter(t => t._id !== transactionId);
      onUpdateTransactions(updatedTransactions);
      
      toast({
        title: "Transaction Deleted",
        description: "Transaction was successfully deleted.",
      });
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete transaction.",
      });
    }
  };

  const handleSuccessfulUpdate = () => {
    setEditingTransaction(null);
 
    onUpdateTransactions(transactions);
  };

  return (
    <div className="border rounded-lg">
      <div className="flex justify-between items-center p-4">
        <div className="text-sm text-muted-foreground">
          <span className="hidden md:inline">Transactions for</span> {selectedMonth.month}, {selectedMonth.year}
        </div>
        <div className="flex gap-2">
          <ExportPDFButton
            filteredTransactions={filteredTransactions}
            selectedMonth={selectedMonth}
            className="mr-2"
          />
          <Button
            variant="outline"
            onClick={() => setShowActions(!showActions)}
            title={showActions ? "Hide Actions" : "Show Actions"}
          >
            {showActions ? (
              <PencilOff className="w-4 h-4" />
            ) : (
              <Pencil className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {(
              [
                "date",
                "description",
                "type",
                "amount",
                ...(showActions ? ["actions"] : []),
              ] as (keyof Transaction | "actions")[]
            ).map((key) => (
              <TableHead
                key={key}
                className={`
                  ${key === "amount" ? "text-right" : ""} 
                  ${key === "actions" ? "text-center" : ""} 
                  ${
                    key !== "actions" && key !== "amount"
                      ? "cursor-pointer"
                      : ""
                  }
                `}
                onClick={() =>
                  key !== "actions" && handleSort(key as keyof Transaction)
                }
              >
                <div
                  className={`
                  flex items-center 
                  ${key === "amount" ? "justify-end" : ""} 
                  ${key === "actions" ? "justify-center" : ""} 
                  gap-1
                `}
                >
                  {key === "actions"
                    ? "Actions"
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                  {key !== "actions" && (
                    <SortIcon columnKey={key as keyof Transaction} />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedTransactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>
                {format(new Date(transaction.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-sm ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {formatRupiah(transaction.amount)}
                </span>
              </TableCell>
              {showActions && (
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingTransaction(transaction)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteTransaction(transaction._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredTransactions.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          No transactions found in {selectedMonth.month}, {selectedMonth.year}
        </div>
      )}
      {filteredTransactions.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t gap-2">
          <div className="text-sm text-muted-foreground">
            {`Showing ${startIndex + 1}-${Math.min(
              endIndex,
              filteredTransactions.length
            )} of ${filteredTransactions.length} transactions`}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <Dialog
        open={!!editingTransaction}
        onOpenChange={() => setEditingTransaction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <TransactionForm
              initialData={editingTransaction}
              onSuccess={handleSuccessfulUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
