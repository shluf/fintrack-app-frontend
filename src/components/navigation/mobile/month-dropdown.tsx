"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { MonthGrid } from "../month-grid"
import { useMonthContext } from "@/hooks/month-context"

interface MonthDropdownProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function MonthDropdown({ isOpen, onClose, className }: MonthDropdownProps) {
  const { selectedMonth, setSelectedMonth } = useMonthContext();

  return (
    <div className={cn("relative", className)} data-dropdown>
      {isOpen && <div className="fixed inset-0 top-auto bg-black/50 z-40" aria-hidden="true" />}

      <div
        className={cn(
          "fixed bottom-28 left-4 right-4 z-50 transform transition-all duration-200 ease-in-out",
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-full invisible",
        )}
      >
        <div className="bg-zinc-900 rounded-2xl p-4 shadow-xl border border-zinc-800/50">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-white font-medium">Select Month</h3>
            <button onClick={() => onClose()} className="text-gray-400 hover:text-white">
              <ChevronDown className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <MonthGrid
            selectedMonth={selectedMonth}
            onSelectMonth={(month) => {
              setSelectedMonth({ ...selectedMonth, month })
              onClose()
            }}
            onSelectYear={(year) => {
              setSelectedMonth({ ...selectedMonth, year })
              onClose()
            }}
          />
        </div>
      </div>

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 h-[5px] bg-white/10 transition-transform duration-200",
          isOpen ? "transform-none" : "translate-y-full",
        )}
      />
    </div>
  )
}

