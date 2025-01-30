import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStatCard } from "./dashboard-stat-card";
import { CalendarDays, Wallet } from "lucide-react";

export interface Summary {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    
    percentageIncome: number;
    percentageExpenses: number;
    percentageBalance: number;
    
    differenceIncome: number;
    differenceExpenses: number;

    totalBalance: number;
  }

interface BalanceOverviewProps {
  summary: Summary
  formatRupiah: (amount: number, options?: { abbreviate?: boolean }) => string
}

export const BalanceOverview = ({ summary, formatRupiah }: BalanceOverviewProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <Card className="bg-[#0F172A] border border-slate-800/50 hover:border-emerald-500/30 transition-all group flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-emerald-400/80" />
          <CardTitle className="text-lg font-semibold bg-emerald-300 bg-clip-text text-transparent">
            Monthly Balance
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center h-full py-6">
        <div className="relative text-center">
          <p className="text-3xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-400 bg-clip-text text-transparent drop-shadow-md">
            {formatRupiah(summary.balance)}
          </p>
          <div className="flex items-center gap-1 justify-end text-slate-400/80 mt-2">
            <CalendarDays className="h-4 w-4" />
            <p className="text-xs">per this month</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="space-y-6">
      <DashboardStatCard
        title="Total Income"
        amount={summary.totalIncome}
        percentage={summary.percentageIncome}
        difference={summary.differenceIncome}
        type="income"
        formatRupiah={formatRupiah}
      />
      <DashboardStatCard
        title="Total Expenses"
        amount={summary.totalExpenses}
        percentage={summary.percentageExpenses}
        difference={summary.differenceExpenses}
        type="expense"
        formatRupiah={formatRupiah}
      />
    </div>
  </div>
);