import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BudgetAlerts } from "../budget/budget-alert"
import { useBudgetData } from "@/hooks/use-budget-data"

export const DashboardNotificationCard = () => {
  const {
    totalExpenses,
    monthlyLimit,
    percentageUsed,
  } = useBudgetData()

  return (
    <Card className="bg-green-dark border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-gray-400">
          Notifications
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:bg-gray-800/50"
          asChild
        ></Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {percentageUsed < 80 ? (
          <p className="text-center text-white">Nothing for today</p>
        ) : (
          <BudgetAlerts
            totalExpenses={totalExpenses}
            monthlyLimit={monthlyLimit}
            percentageUsed={percentageUsed}
            budgetDetails={true}
          />
        )}
      </CardContent>
    </Card>
  );
}