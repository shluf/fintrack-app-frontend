import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatRupiah } from "@/lib/utils";

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
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Spent: {formatRupiah(totalExpenses)}</span>
          <span>Budget: {formatRupiah(monthlyLimit)}</span>
        </div>
        <Progress
          value={percentageUsed}
          className={cn(
            "h-3",
            percentageUsed > 100
              ? "[&>div]:bg-red-500"
              : percentageUsed > 80
              ? "[&>div]:bg-yellow-500"
              : "[&>div]:bg-green-500"
          )}
        />
        <div className="text-sm">
          {remainingBudget >= 0 ? (
            <p className="text-green-500">
              Remaining: {formatRupiah(remainingBudget)}
            </p>
          ) : (
            <p className="text-red-500">
              Exceeded by {formatRupiah(Math.abs(remainingBudget))}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
