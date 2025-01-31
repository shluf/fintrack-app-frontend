'use client';
import { useEffect, useState } from 'react';
import { transactionsApi, type Transaction } from '@/lib/api';
import { TransactionsFilters } from '@/components/transactions/trasaction-filter';
import { TransactionsTable } from '@/components/transactions/transaction-table';
import { TransactionsHeader } from '@/components/transactions/transaction-header';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TransactionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]  | null>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]  | null>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: 'date' as keyof Transaction,
    direction: 'desc' as 'asc' | 'desc'
  });

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsDialogOpen(true);
    }
  }, [searchParams]);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    
    if (!open) {
      const params = new URLSearchParams(searchParams);
      params.delete('action');
      router.replace(`/transactions?${params.toString()}`, { scroll: false });
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionsApi.getAll();
      setTransactions(response.data.transactions);
      setFilteredTransactions(response.data.transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  useEffect(() => {
    let filtered = transactions ? [...transactions] : [];
    if (typeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
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

  const handleUpdateTransactions = (updatedTransaction: Transaction) => {
    setTransactions((prevTransactions) => {
      if (!prevTransactions) return [];
      const exists = prevTransactions.some((t) => t._id === updatedTransaction._id);
      return exists
        ? prevTransactions.map((transaction) =>
            transaction._id === updatedTransaction._id ? updatedTransaction : transaction
          )
        : [...prevTransactions, updatedTransaction];
    });
  };
  

  const handleDeleteTransactions = (updatedTransactions: Transaction[]) => {
    setTransactions(updatedTransactions);
  };

  return (
    <div className="space-y-6  md:pb-4 pb-[120px]">
      <TransactionsHeader
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpenChange}
        onUpdateTransactions={handleUpdateTransactions}
      />
      <TransactionsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
      <TransactionsTable
        transactions={filteredTransactions}
        sortConfig={sortConfig}
        handleSort={handleSort}
        onUpdateTransactions={handleUpdateTransactions}
        onDeleteTransactions={handleDeleteTransactions}
        loading={loading}
      />
    </div>
  );
}