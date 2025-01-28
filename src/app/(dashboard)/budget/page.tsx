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

export default function BudgetPage() {
  const { 
    budget, 
    totalExpenses, 
    monthlyLimit, 
    percentageUsed, 
    loading, 
    refreshData 
  } = useBudgetData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLimit, setNewLimit] = useState('');
  const { toast } = useToast();

  const handleUpdateBudget = async () => {
    try {
      const limit = parseFloat(newLimit);
      if (isNaN(limit) || limit <= 0) {
        throw new Error('Invalid amount');
      }

      if (budget?._id) {
        await budgetsApi.update(budget._id, { monthly_limit: limit });
      } else {
        await budgetsApi.create({ monthly_limit: limit });
      }

      toast({ title: 'Success', description: 'Budget updated successfully!' });
      setIsDialogOpen(false);
      refreshData(); 
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to update budget. ${error}`,
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budget Tracker</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>{budget ? 'Update Budget' : 'Set Budget'}</Button>
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
              <Button onClick={handleUpdateBudget}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <BudgetAlerts
        totalExpenses={totalExpenses}
        monthlyLimit={monthlyLimit}
        percentageUsed={percentageUsed}
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Total Budget"
          value={budget ? `$${monthlyLimit.toFixed(2)}` : 'Not set'}
        />
        <StatCard
          title="Total Used"
          value={`$${totalExpenses.toFixed(2)}`}
        />
        <StatCard
          title="Remaining"
          value={budget ? `$${(monthlyLimit - totalExpenses).toFixed(2)}` : 'N/A'}
        />
      </div>

      <BudgetProgress
        totalExpenses={totalExpenses}
        monthlyLimit={monthlyLimit}
        percentageUsed={percentageUsed}
      />
    </div>
  );
}