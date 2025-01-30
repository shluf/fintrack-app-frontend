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
import { Banknote, CalendarDays, Settings, Wallet } from 'lucide-react';
import BudgetSkeleton from '@/components/budget/budget-skeleton';

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

  return (
    <div className="space-y-6 md:pb-4 pb-[120px]">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Financial Dashboard
        </h1>
        <div className="flex items-center gap-2 mt-1 text-slate-400">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm">
            {selectedMonth.month} {selectedMonth.year}
          </span>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
            <Settings className="mr-2 h-4 w-4" />
            {currentBudget ? "Adjust Budget" : "Set Budget"}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#0F172A] border-slate-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-400">
              <Wallet className="h-5 w-5" />
              Set Monthly Budget
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter monthly limit"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-100 pl-10 no-spinner"
              />
              <Banknote className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-slate-700 hover:border-emerald-400"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateBudget}
                className="bg-emerald-500/90 hover:bg-emerald-400 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  
    { loading ? <BudgetSkeleton /> : currentBudget ? (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Budget Limit" value={formatRupiah(monthlyLimit)} />
          <StatCard title="Total Used" value={formatRupiah(totalExpenses)} />
          <StatCard
            title="Remaining"
            value={formatRupiah(monthlyLimit - totalExpenses)}
          />
        </div>
        
        <BudgetAlerts
          totalExpenses={totalExpenses}
          monthlyLimit={monthlyLimit}
          percentageUsed={percentageUsed}
        />
  
        <BudgetProgress
          totalExpenses={totalExpenses}
          monthlyLimit={monthlyLimit}
          percentageUsed={percentageUsed}
        />
      </>
    ) : (
      <div className="text-center py-8 border border-dashed border-slate-800 rounded-lg">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Wallet className="h-8 w-8" />
          <p>No budget configured for this month</p>
        </div>
      </div>
    )}
  </div>
  );
}