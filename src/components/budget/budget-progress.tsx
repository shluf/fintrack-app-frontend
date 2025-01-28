import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Spent: ${totalExpenses.toFixed(2)}</span>
          <span>Budget: ${monthlyLimit.toFixed(2)}</span>
        </div>
        <Progress value={percentageUsed} />
        <div className="text-sm text-muted-foreground">
          {remainingBudget >= 0 ? (
            <p>${remainingBudget.toFixed(2)} remaining</p>
          ) : (
            <p className="text-red-500">
              Exceeded by ${Math.abs(remainingBudget).toFixed(2)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};