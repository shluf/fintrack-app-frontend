'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { budgetsApi, type Budget } from '@/lib/api';

export default function BudgetPage() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [totalExpenses] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLimit, setNewLimit] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await budgetsApi.getAll();
        if (response.data.budgets.length > 0) {
          setBudget(response.data.budgets[0]);
        }
      } catch (error) {
        console.error('Failed to fetch budget:', error);
      }
    };

    fetchBudget();
  }, []);

  const handleUpdateBudget = async () => {
    try {
      const limit = parseFloat(newLimit);
      if (isNaN(limit) || limit <= 0) {
        throw new Error('Invalid amount');
      }

      if (budget?._id) {
        await budgetsApi.update(budget._id, { monthly_limit: limit });
      } else {
        const response = await budgetsApi.create({ monthly_limit: limit });
        setBudget(response.data.budget);
      }

      toast({
        title: 'Success',
        description: 'Budget updated successfully!',
      });
      setIsDialogOpen(false);


      const response = await budgetsApi.getAll();
      if (response.data.budgets.length > 0) {
        setBudget(response.data.budgets[0]);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to update budget. ${error}`,
      });
    }
  };

  const progress = budget
    ? Math.min((totalExpenses / budget.monthly_limit) * 100, 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budget Tracker</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              {budget ? 'Update Budget' : 'Set Budget'}
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
              <Button onClick={handleUpdateBudget}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {budget ? (
            <>
              <div className="flex justify-between text-sm">
                <span>Spent: ${totalExpenses.toFixed(2)}</span>
                <span>Budget: ${budget.monthly_limit.toFixed(2)}</span>
              </div>
              <Progress value={progress} />
              <div className="text-sm text-muted-foreground">
                {progress >= 100 ? (
                  <p className="text-red-500">Budget exceeded!</p>
                ) : (
                  <p>
                    ${(budget.monthly_limit - totalExpenses).toFixed(2)} remaining
                  </p>
                )}
              </div>
            </>
          ) : (
            <p>No budget set. Click the button above to set a monthly budget.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}