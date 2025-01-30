import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BudgetAlerts } from "../budget/budget-alert"
import { useBudgetData } from "@/hooks/use-budget-data"
import { Bell, CheckCircle, Settings } from "lucide-react"

export const DashboardNotificationCard = () => {
  const {
    totalExpenses,
    monthlyLimit,
    percentageUsed,
  } = useBudgetData()

  return (
    <Card className="bg-[#0F172A] border border-slate-800/50 hover:border-emerald-500/30 transition-all group">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-emerald-400/80" />
          <CardTitle className="text-lg font-semibold text-emerald-300">
            Notifications
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-300"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="py-6">
        {percentageUsed < 80 ? (
          <div className="flex flex-col items-center gap-3 text-emerald-400/80">
            <CheckCircle className="h-8 w-8" />
            <p className="text-center">Great, your budget is normal</p>
          </div>
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