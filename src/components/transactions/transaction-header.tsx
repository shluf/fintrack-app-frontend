'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TransactionForm } from './transaction-form';
import { Plus, Wallet } from 'lucide-react';
import { Transaction } from '@/lib/api';

interface TransactionsHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  onUpdateTransactions: (newTransaction: Transaction) => void;
}

export function TransactionsHeader({ isDialogOpen, setIsDialogOpen, onUpdateTransactions }: TransactionsHeaderProps) {
  const handleTransactionSuccess = (newTransaction: Transaction) => {
    setIsDialogOpen(false);
    onUpdateTransactions(newTransaction)
  };

  return (
<div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl md:text-3xl font-bold">
    Transaction Manager
  </h1>
  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button className="bg-emerald-500 hover:from-emerald-600 text-white shadow-lg shadow-emerald-500/20">
        <Plus className="mr-2 h-4 w-4" />
        Add Transaction
      </Button>
    </DialogTrigger>
    <DialogContent className="bg-slate-800 border-slate-700">
      <DialogHeader>
        <DialogTitle className="text-emerald-400 flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          New Transaction
        </DialogTitle>
      </DialogHeader>
      <TransactionForm onSuccess={handleTransactionSuccess} />
    </DialogContent>
  </Dialog>
</div>
  );
}