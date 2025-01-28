import { SelectedMonthType } from "@/hooks/month-context"
import { ExportReportButton } from "./dashboard-export"

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
      <p className="text-sm text-gray-400">
        {selectedMonth.month} {selectedMonth.year}
      </p>
    </div>
    <ExportReportButton
      isExporting={isExporting}
      onExportPNG={onExportPNG}
      onExportPDF={onExportPDF}
    />
  </div>
)