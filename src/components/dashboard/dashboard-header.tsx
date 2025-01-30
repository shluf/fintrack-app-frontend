import { SelectedMonthType } from "@/hooks/month-context"
import { ExportReportButton } from "./dashboard-export"
import { CalendarDays } from "lucide-react"

interface DashboardHeaderProps {
  selectedMonth: SelectedMonthType
  isExporting: boolean
  onExportPNG: () => void
  onExportPDF: () => void
}

export const DashboardHeader = ({
  selectedMonth,
  isExporting,
  onExportPNG,
  onExportPDF
}: DashboardHeaderProps) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">Financial Dashboard</h1>
      <div className="flex items-center gap-2 mt-1 text-slate-400">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm">
            {selectedMonth.month} {selectedMonth.year}
          </span>
        </div>
    </div>
    <ExportReportButton
      isExporting={isExporting}
      onExportPNG={onExportPNG}
      onExportPDF={onExportPDF}
    />
  </div>
)