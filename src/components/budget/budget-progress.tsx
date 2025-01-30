import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatRupiah } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Scale, Target, Wallet } from "lucide-react";

type BudgetProgressProps = {
  totalExpenses: number;
  monthlyLimit: number;
  percentageUsed: number;
};

export const BudgetProgress = ({
  totalExpenses,
  monthlyLimit,
  percentageUsed,
}: BudgetProgressProps) => {
  const remainingBudget = monthlyLimit - totalExpenses;
  const hasBudget = monthlyLimit > 0;

  if (!hasBudget) return null;

  return (
<Card className="bg-[#0F172A] border border-slate-800/50 hover:border-emerald-500/30 transition-all group">
  <CardHeader className="pb-3 border-b border-slate-800">
    <div className="flex items-center gap-2">
      <Scale className="h-5 w-5 text-emerald-400" />
      <CardTitle className="text-lg font-semibold text-emerald-400">
        Monthly Budget Overview
      </CardTitle>
    </div>
  </CardHeader>
  <CardContent className="space-y-4 mt-4">
    <div className="flex justify-between text-slate-300 text-sm">
      <div className="flex items-center gap-2">
        <Wallet className="h-4 w-4 text-purple-400" />
        <span>Spent: {formatRupiah(totalExpenses)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-emerald-400" />
        <span>Budget: {formatRupiah(monthlyLimit)}</span>
      </div>
    </div>
    
    <Progress
      value={percentageUsed}
      className={cn(
        "h-2 bg-slate-800/50",
        percentageUsed > 100
          ? "[&>div]:bg-red-400 [&>div]:animate-pulse"
          : percentageUsed > 80
          ? "[&>div]:bg-purple-400"
          : "[&>div]:bg-emerald-400"
      )}
    />
    
    <div className="text-sm flex items-center gap-2">
      {remainingBudget >= 0 ? (
        <>
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span className="text-emerald-400">
            Remaining: {formatRupiah(remainingBudget)}
          </span>
        </>
      ) : (
        <>
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span className="text-red-400">
            Exceeded by {formatRupiah(Math.abs(remainingBudget))}
          </span>
        </>
      )}
    </div>
  </CardContent>
</Card>
  );
};
