import { useState } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { formatDate } from "@/lib/utils"

export const useExportReport = (reportRef: React.RefObject<HTMLDivElement | null>) => {
  const [isExporting, setIsExporting] = useState(false)

  const exportAsPNG = async () => {
    if (!reportRef.current) return
    setIsExporting(true)

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        // backgroundColor: "#1e2e2e", 
        logging: true 
      })

      const link = document.createElement("a")
      link.download = `financial-report-${formatDate()}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } finally {
      setIsExporting(false)
    }
  }

  const exportAsPDF = async () => {
    if (!reportRef.current) return
    setIsExporting(true)

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        // backgroundColor: "#1e2e2e",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [canvas.width * 0.264583, canvas.height * 0.264583]
      })

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width * 0.264583, canvas.height * 0.264583)
      pdf.save(`financial-report-${formatDate()}.pdf`)
    } finally {
      setIsExporting(false)
    }
  }

  return { isExporting, exportAsPNG, exportAsPDF }
}