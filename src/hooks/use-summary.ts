import { Transaction } from "@/lib/api"
import { SelectedMonthType, months } from "@/hooks/month-context"

export const useSummary = (transactions: Transaction[], selectedMonth: SelectedMonthType) => {
  const calculateSummary = () => {
    const currentMonthIndex = months.flat().indexOf(selectedMonth.month)
    const currentYear = selectedMonth.year

    let prevMonthIndex = currentMonthIndex - 1
    let prevYear = currentYear
    if (prevMonthIndex < 0) {
      prevMonthIndex = 11
      prevYear -= 1
    }

    const getMonthSummary = (monthIndex: number, year: number) => {
      const filtered = transactions.filter(transaction => {
        const date = new Date(transaction.date)
        return date.getMonth() === monthIndex && date.getFullYear() === year
      })

      return filtered.reduce(
        (acc, transaction) => {
          if (transaction.type === "income") {
            acc.totalIncome += transaction.amount
          } else {
            acc.totalExpenses += transaction.amount
          }
          acc.balance = acc.totalIncome - acc.totalExpenses
          return acc
        },
        { totalIncome: 0, totalExpenses: 0, balance: 0 }
      )
    }

    const currentSummary = getMonthSummary(currentMonthIndex, currentYear)
    const prevSummary = getMonthSummary(prevMonthIndex, prevYear)

    const totalBalance = transactions.reduce((acc, transaction) => {
      return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount
    }, 0)

    const calculatePercentage = (current: number, previous: number): number => {
      if (previous === 0) {
        if (current === 0) return 0
        return current > 0 ? 100 : -100
      }
      return ((current - previous) / previous) * 100
    }

    return {
      ...currentSummary,
      percentageIncome: calculatePercentage(currentSummary.totalIncome, prevSummary.totalIncome),
      percentageExpenses: calculatePercentage(currentSummary.totalExpenses, prevSummary.totalExpenses),
      percentageBalance: calculatePercentage(currentSummary.balance, prevSummary.balance),
      differenceIncome: currentSummary.totalIncome - prevSummary.totalIncome,
      differenceExpenses: currentSummary.totalExpenses - prevSummary.totalExpenses,
      totalBalance
    }
  }

  return { summary: calculateSummary() }
}