"use client";
import { useEffect, useState } from "react";
import { Budget, Transaction, budgetsApi, transactionsApi } from "@/lib/api";
import { useMonthContext, months } from "@/hooks/month-context";

export const useBudgetData = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const { selectedMonth } = useMonthContext();

  const refreshData = () => setRefreshTrigger(prev => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetsRes, transactionsRes] = await Promise.all([
          budgetsApi.getAll(),
          transactionsApi.getAll(),
        ]);

        setBudgets(budgetsRes.data.budgets);

        const selectedMonthIndex = months.flat().indexOf(selectedMonth.month);
        const selectedYear = selectedMonth.year;
        
        const budgetForMonth = budgetsRes.data.budgets.find((b: Budget) => {
          const budgetDate = new Date(b.month);
          return (
            budgetDate.getMonth() === selectedMonthIndex &&
            budgetDate.getFullYear() === selectedYear
          );
        });

        setCurrentBudget(budgetForMonth || null);

        const expenses = transactionsRes.data.transactions
          .filter((t: Transaction) => {
            if (t.type !== 'expense') return false;
            
            const [yearStr, monthStr] = t.date.split('-');
            const transactionYear = parseInt(yearStr, 10);
            const transactionMonth = parseInt(monthStr, 10) - 1;
            
            return transactionMonth === selectedMonthIndex && 
                   transactionYear === selectedYear;
          })
          .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

        setTotalExpenses(expenses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger, selectedMonth]);

  return {
    budgets,
    currentBudget,
    totalExpenses,
    loading,
    monthlyLimit: currentBudget?.monthly_limit || 0,
    percentageUsed: currentBudget ? (totalExpenses / currentBudget.monthly_limit) * 100 : 0,
    refreshData
  };
};