import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock, MinusCircle } from "lucide-react"
import Link from "next/link"
import { Transaction } from "@/lib/api"
import { TransactionItem } from "./transaction-item"

interface RecentTransactionsProps {
  transactions: Transaction[]
  formatRupiah: (amount: number) => string
}

export const RecentTransactions = ({
  transactions,
  formatRupiah,
}: RecentTransactionsProps) => (
  <Card className="bg-[#0F172A] border border-slate-800/50 hover:border-emerald-500/30 transition-all group">
    <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-emerald-400/80" />
        <CardTitle className="text-lg font-semibold text-emerald-300">
          Recent Activities
        </CardTitle>
      </div>
      <Button
        variant="ghost"
        className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs"
        asChild
      >
        <Link href="/transactions">
          More
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </CardHeader>

    <CardContent className="space-y-4">
      {transactions.length < 1 ? (
        <div className="flex flex-col items-center gap-3 text-emerald-400/80">
          <MinusCircle className="h-8 w-8" />
          <p className="text-center">No activity yet</p>
        </div>
      ) : (
        transactions
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 3)
          .map((transaction) => (
            <TransactionItem
              key={transaction._id}
              transaction={transaction}
              formatRupiah={formatRupiah}
            />
          ))
      )}
    </CardContent>
  </Card>
);