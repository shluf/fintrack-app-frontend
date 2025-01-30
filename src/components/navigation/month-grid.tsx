import { months, SelectedMonthType } from "@/hooks/month-context";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthGridProps {
  selectedMonth: SelectedMonthType;
  onSelectMonth: (month: string) => void;
  onSelectYear: (year: number) => void;
  className?: string;
}

export function MonthGrid({
  selectedMonth,
  onSelectMonth,
  onSelectYear,
  className,
}: MonthGridProps) {
  const pathname = usePathname();

  return (
    <div className={cn("px-3", className)}>
      <div className="grid gap-y-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 rounded-lg border border-slate-800/50 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 transition-all"
              onClick={() => onSelectYear(selectedMonth.year - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="text-lg font-semibold text-emerald-400">
              {selectedMonth.year}
            </span>

            <button
              className="p-1.5 rounded-lg border border-slate-800/50 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 transition-all"
              onClick={() => onSelectYear(selectedMonth.year + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {pathname === "/transactions" && (
            <button
              onClick={() => onSelectMonth("All")}
              className={cn(
                "col-span-1 px-3 py-1.5 rounded-lg border transition-all",
                "All" === selectedMonth.month
                  ? "bg-emerald-500 text-white border-emerald-500/50"
                  : "border-slate-800/50 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400"
              )}
            >
              All
            </button>
          )}
        </div>

        {months.map((row, i) => (
          <div key={i} className="flex justify-between gap-1 mb-1">
            {row.map((month) => (
              <button
                key={month}
                onClick={() => onSelectMonth(month)}
                className={cn(
                  "flex-1 py-2 text-sm rounded-lg border transition-all",
                  month === selectedMonth.month
                    ? "bg-emerald-500/80 text-white border-emerald-500/50 shadow-emerald-500/20"
                    : "border-slate-800/50 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400"
                )}
              >
                {month}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
