'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { budgetsApi } from '@/lib/api';
import { useBudgetData } from '@/hooks/use-budget-data';
import { BudgetAlerts } from '@/components/budget/budget-alert';
import { StatCard } from '@/components/budget/stat-card';
import { BudgetProgress } from '@/components/budget/budget-progress';
import { months, useMonthContext } from '@/hooks/month-context';
import { formatRupiah } from '@/lib/utils';

export default function BudgetPage() {
  const {
    currentBudget,
    totalExpenses,
    monthlyLimit,
    percentageUsed,
    loading,
    refreshData,
  } = useBudgetData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLimit, setNewLimit] = useState("");
  const { toast } = useToast();
  const { selectedMonth } = useMonthContext();

  const handleUpdateBudget = async () => {
    try {
      const limit = parseFloat(newLimit);
      if (isNaN(limit) || limit <= 0) {
        throw new Error("Invalid amount");
      }

      const monthDate = new Date(
        selectedMonth.year,
        months.flat().indexOf(selectedMonth.month)
      );
      const isoMonth = monthDate.toISOString();

      if (currentBudget?._id) {
        await budgetsApi.update(currentBudget._id, {
          monthly_limit: limit,
          month: isoMonth,
        });
      } else {
        await budgetsApi.create({
          monthly_limit: limit,
          month: isoMonth,
        });
      }

      toast({ title: "Success", description: "Budget updated successfully!" });
      setIsDialogOpen(false);
      refreshData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update budget. ${error}`,
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Budget Tracker</h1>
          <p className="text-sm text-gray-400">
            {selectedMonth.month} {selectedMonth.year}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                setNewLimit(currentBudget?.monthly_limit?.toString() || "")
              }
            >
              {currentBudget ? "Edit Budget" : "Set Budget"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Monthly Budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Enter monthly limit"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateBudget}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {currentBudget ? (
        <>
          <BudgetAlerts
            totalExpenses={totalExpenses}
            monthlyLimit={monthlyLimit}
            percentageUsed={percentageUsed}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Budget Limit" value={formatRupiah(monthlyLimit)} />
            <StatCard title="Total Used" value={formatRupiah(totalExpenses)} />
            <StatCard
              title="Remaining"
              value={formatRupiah(monthlyLimit - totalExpenses)}
            />
          </div>

          <BudgetProgress
            totalExpenses={totalExpenses}
            monthlyLimit={monthlyLimit}
            percentageUsed={percentageUsed}
          />
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No budget set for this month</p>
        </div>
      )}
    </div>
  );
}