import { Card, CardContent } from "../ui/card"

interface StatCardProps {
    title: string
    amount: number
    percentage: number
    difference: number
    type: 'income' | 'expense'
    formatRupiah: (amount: number, options?: { abbreviate?: boolean }) => string
  }
  
export  const DashboardStatCard = ({
    title,
    amount,
    percentage,
    difference,
    type,
    formatRupiah
  }: StatCardProps) => (
    <Card className="bg-green-dark border-none">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-400">{title}</p>
              <p className={`text-2xl font-bold text-${type === 'income' ? 'green' : 'red'}-500`}>
                {formatRupiah(amount)}
              </p>
            </div>
            <div className={`bg-${type === 'income' ? 'emerald' : 'purple'}-500/20 text-${type === 'income' ? 'emerald' : 'purple'}-500 px-2 py-1 rounded`}>
              {percentage > 0 ? `+${percentage.toFixed(1)}` : percentage.toFixed(1)}%
            </div>
          </div>
          <p className="text-gray-400 text-xs text-nowrap">
            {difference === 0
              ? "stable this month"
              : `${difference > 0 ? "increased" : "decreased"} by ${formatRupiah(
                  Math.abs(difference),
                  { abbreviate: true }
                )} this month`}
          </p>
        </div>
      </CardContent>
    </Card>
  )