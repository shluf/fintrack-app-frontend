'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TransactionForm } from '@/components/transactions/transaction-form';
import { transactionsApi, type Transaction } from '@/lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({
    key: 'date' as keyof Transaction,
    direction: 'desc' as 'asc' | 'desc'
  });

  const fetchTransactions = async () => {
    try {
      const response = await transactionsApi.getAll();
      setTransactions(response.data.transactions);
      setFilteredTransactions(response.data.transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...transactions];

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }

      return 0;
    });

    setFilteredTransactions(filtered);
  }, [transactions, typeFilter, searchTerm, sortConfig]);

  const handleSort = (key: keyof Transaction) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleTransactionSuccess = () => {
    setIsDialogOpen(false);
    fetchTransactions();
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Transaction }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Transaction</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm onSuccess={handleTransactionSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-1">
                  Date
                  <SortIcon columnKey="date" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('description')}
              >
                <div className="flex items-center gap-1">
                  Description
                  <SortIcon columnKey="description" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center gap-1">
                  Type
                  <SortIcon columnKey="type" />
                </div>
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center justify-end gap-1">
                  Amount
                  <SortIcon columnKey="amount" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>
                  {format(new Date(transaction.date), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.type}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      transaction.type === 'income'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    ${transaction.amount.toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}