import { useEffect, useState } from "react";
import { Budget, Transaction, budgetsApi, transactionsApi } from "@/lib/api";

export const useBudgetData = () => {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refreshData = () => setRefreshTrigger(prev => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, transactionsRes] = await Promise.all([
          budgetsApi.getAll(),
          transactionsApi.getAll(),
        ]);

        if (budgetRes.data.budgets.length > 0) {
          setBudget(budgetRes.data.budgets[0]);
        }

        const expenses = transactionsRes.data.transactions
          .filter((t: Transaction) => t.type === 'expense')
          .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

        setTotalExpenses(expenses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  return {
    budget,
    totalExpenses,
    loading,
    monthlyLimit: budget?.monthly_limit || 0,
    percentageUsed: budget ? (totalExpenses / budget.monthly_limit) * 100 : 0,
    refreshData
  };
};