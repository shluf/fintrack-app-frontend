'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TransactionForm } from './transaction-form';

interface TransactionsHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  onTransactionAdded?: () => void;
}

export function TransactionsHeader({ isDialogOpen, setIsDialogOpen }: TransactionsHeaderProps) {
  const handleTransactionSuccess = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className='bg-green-bar'>Add Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm onSuccess={handleTransactionSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
}