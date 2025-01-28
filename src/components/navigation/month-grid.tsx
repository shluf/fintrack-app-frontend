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
    <div className={cn("px-6", className)}>
      <div className="grid gap-y-4">
        <div className="flex justify-between">

        <div className={"flex items-center justify-center space-x-4"}>
          <button
            className="h-full px-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-800"
            onClick={() => onSelectYear(selectedMonth.year - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="text-md font-semibold text-white">{selectedMonth.year}</div>

          <button
            className="h-full px-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-800"
            onClick={() => onSelectYear(selectedMonth.year + 1)}
            >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        {pathname === "/transactions" && (
          <button
          onClick={() => onSelectMonth("All")}
          className={cn(
              "w-14 py-1.5 text-sm rounded-md transition-colors",
              "All" === selectedMonth.month
                ? "bg-green-button text-white font-medium"
                : "text-gray-400 hover:text-white hover:bg-zinc-800"
              )}
              >
            All
          </button>
        )}
        </div>
        {months.map((row, i) => (
          <div key={i} className="flex justify-between">
            {row.map((month) => (
              <button
                key={month}
                onClick={() => onSelectMonth(month)}
                className={cn(
                  "w-14 py-1.5 text-sm rounded-md transition-colors",
                  month === selectedMonth.month
                    ? "bg-green-button text-white font-medium"
                    : "text-gray-400 hover:text-white hover:bg-zinc-800"
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
