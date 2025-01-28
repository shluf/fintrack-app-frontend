import { Button } from "@/components/ui/button"

interface ChartFilterButtonsProps {
  chartFilter: 'all' | 'income' | 'expense'
  setChartFilter: (filter: 'all' | 'income' | 'expense') => void
}

export const ChartFilterButtons = ({ chartFilter, setChartFilter }: ChartFilterButtonsProps) => (
  <div className="flex flex-wrap gap-2">
    {[
      { value: 'all', label: 'All' },
      { value: 'income', label: 'Income' },
      { value: 'expense', label: 'Expense' }
    ].map(({ value, label }) => (
      <Button
        key={value}
        variant={chartFilter === value ? "default" : "ghost"}
        className={
          chartFilter === value ? "bg-emerald-500 hover:bg-emerald-600" : ""
        }
        onClick={() => setChartFilter(value as 'all' | 'income' | 'expense')}
      >
        {label}
      </Button>
    ))}
  </div>
)