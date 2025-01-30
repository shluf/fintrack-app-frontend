import { Receipt, TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { Card, CardContent } from "../ui/card"

interface StatCardProps {
    title: string
    amount: number
    percentage: number
    difference: number
    type: 'income' | 'expense'
    formatRupiah: (amount: number, options?: { abbreviate?: boolean }) => string
  }
  
  export const DashboardStatCard = ({
    title,
    amount,
    percentage,
    difference,
    type,
    formatRupiah
  }: StatCardProps) => (
    <Card className="bg-[#0F172A] border border-slate-800/50 hover:border-emerald-500/30 transition-all hover:scale-[101%] group relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                type === 'income' 
                  ? 'bg-emerald-500/20 text-emerald-300' 
                  : 'bg-purple-500/20 text-purple-300'
              }`}>
                {type === 'income' ? (
                  <TrendingUp className="h-5 w-5" />
                ) : (
                  <TrendingDown className="h-5 w-5" />
                )}
              </div>
              <p className="text-sm text-slate-400 font-medium">{title}</p>
            </div>
            
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
              type === 'income'
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-purple-500/30 bg-purple-500/10 text-purple-300'
            }`}>
              <span className="text-xs font-semibold">
                {percentage > 0 ? `↑${percentage.toFixed(1)}` : `↓${Math.abs(percentage).toFixed(1)}`}%
              </span>
            </div>
          </div>
  
          <div className="flex flex-col gap-2">
            <p className={`text-2xl font-bold ${
              type === 'income' ? 'text-emerald-400' : 'text-purple-400'
            }`}>
              {formatRupiah(amount)}
            </p>
            
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <div className={`h-[2px] w-4 ${
                difference === 0 ? 'bg-slate-600' : 
                difference > 0 ? 'bg-emerald-500' : 'bg-purple-500'
              }`} />
              <span>
                {difference === 0
                  ? "Stable this month"
                  : `${difference > 0 ? "Increased" : "Decreased"} by ${formatRupiah(
                      Math.abs(difference),
                      { abbreviate: true }
                    )}`}
              </span>
            </div>
          </div>
        </div>
  
        {type === 'income' ? (
          <Wallet className="h-16 w-16 absolute bottom-2 right-2 text-slate-800/40" />
        ) : (
          <Receipt className="h-16 w-16 absolute bottom-2 right-2 text-slate-800/40" />
        )}
      </CardContent>
    </Card>
  );
