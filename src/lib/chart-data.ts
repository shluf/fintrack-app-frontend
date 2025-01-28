import { Transaction } from "@/lib/api"
import { months, SelectedMonthType } from "@/hooks/month-context"

export const processChartData = (transactions: Transaction[], selectedMonth: SelectedMonthType) => {
  const filtered = transactions.filter((t) => {
    const date = new Date(t.date)
    return (
      date.getMonth() === months.flat().indexOf(selectedMonth.month) &&
      date.getFullYear() === selectedMonth.year
    )
  })

  const chartData = filtered.reduce((acc, t) => {
    const date = new Date(t.date)
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`

    if (!acc[formattedDate]) {
      acc[formattedDate] = { date: formattedDate, income: 0, expense: 0 }
    }

    if (t.type === "income") {
      acc[formattedDate].income += t.amount;
    } else {
      acc[formattedDate].expense += t.amount;
    }

    return acc
  }, {} as Record<string, { date: string; income: number; expense: number }>)

  return Object.values(chartData).sort((a, b) => {
    const [dA, mA, yA] = a.date.split("/")
    const [dB, mB, yB] = b.date.split("/")
    return new Date(`${yA}-${mA}-${dA}`).getTime() - new Date(`${yB}-${mB}-${dB}`).getTime()
  })
}