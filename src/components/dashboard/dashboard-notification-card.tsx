import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import Link from "next/link"
import { Transaction } from "@/lib/api"
import { TransactionItem } from "./transaction-item"

interface DashboardNotificationCardProps {
  transactions: Transaction[]
  formatRupiah: (amount: number) => string
}

export const DashboardNotificationCard = ({ transactions, formatRupiah }: DashboardNotificationCardProps) => (
  <Card className="bg-[#1e2e2e] border-none">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-medium text-gray-400">
        Notifications
      </CardTitle>
      <Button className="bg-transparent" variant="ghost" size="icon" asChild>
        <Link href="/transactions" className="text-gray-400 text-xs">
          <ChevronUp width="24px" height="24px" />
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