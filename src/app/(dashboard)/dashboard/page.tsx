'use client'
import { useRef, useState } from "react"
import { useMonthContext } from "@/hooks/month-context"
import { useTransactions } from "@/hooks/use-transactions"
import { useSummary } from "@/hooks/use-summary"
import { useExportReport } from "@/hooks/use-export-report"
import { processChartData } from "@/lib/chart-data"
import { formatRupiah } from "@/lib/utils"
import { SpendingOverview } from "@/components/charts/spending-overview"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ChartFilterButtons } from "@/components/dashboard/chart-filter-buttons"
import { BalanceOverview } from "@/components/dashboard/balance-overview"
import BalanceCard from "@/components/dashboard/total-balance-card"
import { RecentTransactions } from "@/components/dashboard/recent-transaction-card"
import { DashboardNotificationCard } from "@/components/dashboard/dashboard-notification-card"


export default function DashboardPage() {
  const { transactions } = useTransactions()
  const { selectedMonth } = useMonthContext()
  const { summary } = useSummary(transactions, selectedMonth)
  const reportRef = useRef<HTMLDivElement>(null)
  const { isExporting, exportAsPNG, exportAsPDF } = useExportReport(reportRef)
  const chartDataArray = processChartData(transactions, selectedMonth)
  const [chartFilter, setChartFilter] = useState<'all' | 'income' | 'expense'>('all')

  return (
    <div className="h-full">
      <div className="h-full grid gap-6">
        <div
          ref={reportRef}
          className="md:pb-4 pb-[120px] grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <DashboardHeader
                selectedMonth={selectedMonth}
                isExporting={isExporting}
                onExportPNG={exportAsPNG}
                onExportPDF={exportAsPDF}
              />
              <ChartFilterButtons
                chartFilter={chartFilter}
                setChartFilter={setChartFilter}
              />
            </div>

            <SpendingOverview data={chartDataArray} filterType={chartFilter} />
            
            <BalanceOverview summary={summary} formatRupiah={formatRupiah} />
          </div>

          <div className="space-y-6">
            <BalanceCard summary={summary} formatRupiah={formatRupiah} />
            <DashboardNotificationCard />
            <RecentTransactions transactions={transactions} formatRupiah={formatRupiah} />
          </div>
        </div>
      </div>
    </div>
  )
}