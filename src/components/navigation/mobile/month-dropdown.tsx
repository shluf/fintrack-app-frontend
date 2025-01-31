"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CalendarDays, ChevronDown } from "lucide-react"
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
      <div
        className={cn(
          "fixed bottom-28 left-4 right-4 z-50 transform transition-all duration-300 ease-out",
          isOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 translate-y-40"
        )}
      >
        <div className="bg-slate-900/80 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-slate-800/50">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-emerald-400 font-medium flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Select Period
            </h3>
            <button
              onClick={() => onClose()}
              className="p-2 text-slate-400 hover:text-emerald-400 rounded-md hover:bg-slate-800/50 transition-colors"
            >
              <ChevronDown className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <MonthGrid
            selectedMonth={selectedMonth}
            onSelectMonth={(month) => {
              setSelectedMonth({ ...selectedMonth, month });
              onClose();
            }}
            onSelectYear={(year) => {
              setSelectedMonth({ ...selectedMonth, year });
            }}
          />
        </div>
      </div>
    </div>
  );
}

