import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Transaction } from "@/lib/api"
import { TransactionItem } from "./transaction-item"

interface RecentTransactionsProps {
  transactions: Transaction[]
  formatRupiah: (amount: number) => string
}

export const RecentTransactions = ({ transactions, formatRupiah }: RecentTransactionsProps) => (
  <Card className="bg-green-dark border-none">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-medium text-gray-400">
        Recent Transactions
      </CardTitle>
      <Button className="bg-transparent" variant="ghost" size="sm" asChild>
        <Link href="/transactions" className="text-gray-400 text-xs">
          View All
          <ChevronRight className="pl-2" width="24px" height="24px" />
        </Link>
      </Button>
    </CardHeader>
    <CardContent className="space-y-4">
      {transactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)
        .map((transaction) => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            formatRupiah={formatRupiah}
          />
        ))}
    </CardContent>
  </Card>
)