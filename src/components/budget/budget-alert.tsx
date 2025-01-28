import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle } from "lucide-react";

type BudgetAlertsProps = {
  totalExpenses: number;
  monthlyLimit: number;
  percentageUsed: number;
};

export const BudgetAlerts = ({
  totalExpenses,
  monthlyLimit,
  percentageUsed,
}: BudgetAlertsProps) => {
  if (!monthlyLimit) return null;

  return (
    <div className="space-y-2">
      {totalExpenses > monthlyLimit && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Budget Exceeded!</AlertTitle>
          <AlertDescription>
            Exceeded by ${(totalExpenses - monthlyLimit).toFixed(2)}
          </AlertDescription>
        </Alert>
      )}
      
      {totalExpenses <= monthlyLimit && percentageUsed >= 80 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Approaching Budget Limit</AlertTitle>
          <AlertDescription>
            {percentageUsed.toFixed(0)}% budget used. Consider reducing expenses.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};