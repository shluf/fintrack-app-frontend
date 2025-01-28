import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStatCard } from "./dashboard-stat-card";

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
    <Card className="bg-green-dark border-none flex items-center justify-center flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-400">Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center mb-6 justify-start h-full">
        <div className="relative">
          <p className="text-3xl font-bold text-emerald-500">
            {formatRupiah(summary.balance)}
          </p>
          <p className="absolute right-0 -bottom-4 text-gray-400 text-xs text-nowrap">
            /this month
          </p>
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
)