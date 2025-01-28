import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";

type BudgetAlertsProps = {
  totalExpenses: number;
  monthlyLimit: number;
  percentageUsed: number;
  budgetDetails?: boolean;
};

export const BudgetAlerts = ({
  totalExpenses,
  monthlyLimit,
  percentageUsed,
  budgetDetails = false,
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
            {budgetDetails && <Link href="/budget" className="flex items-center justify-end text-green-button">Details <ChevronRight /></Link>}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};