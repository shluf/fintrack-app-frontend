import { ChevronDown, FileDown } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export const ExportReportButton = ({ 
    isExporting,
    onExportPNG,
    onExportPDF 
  }: { 
    isExporting: boolean
    onExportPNG: () => void
    onExportPDF: () => void
  }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-green-bar" disabled={isExporting}>
            <ChevronDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onExportPNG}>
            <FileDown className="mr-2 h-4 w-4" />
            Export as PNG
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportPDF}>
            <FileDown className="mr-2 h-4 w-4" />
            Export as PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }