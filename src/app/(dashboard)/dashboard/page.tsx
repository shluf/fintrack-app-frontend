'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpendingOverview } from '@/components/charts/spending-overview';
import { transactionsApi, type Transaction } from '@/lib/api';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionsApi.getAll();
        setTransactions(response.data.transactions);

        const summary = response.data.transactions.reduce(
          (acc: { totalIncome: number; totalExpenses: number }, transaction: Transaction) => {
            if (transaction.type === 'income') {
              acc.totalIncome += transaction.amount;
            } else {
              acc.totalExpenses += transaction.amount;
            }
            return acc;
          },
          { totalIncome: 0, totalExpenses: 0 }
        );
        
        setSummary({
          ...summary,
          balance: summary.totalIncome - summary.totalExpenses,
        });
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const chartData = transactions.map((transaction) => ({
    date: new Date(transaction.date).toLocaleDateString(),
    amount: transaction.type === 'income' ? transaction.amount : -transaction.amount,
  }));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              ${summary.totalIncome.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              ${summary.totalExpenses.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${summary.balance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <SpendingOverview data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}