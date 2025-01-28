import { useEffect, useState } from "react"
import { transactionsApi, type Transaction } from "@/lib/api"

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionsApi.getAll()
        setTransactions(response.data.transactions)
      } catch (error) {
        console.error("Failed to fetch transactions:", error)
      }
    }
    fetchTransactions()
  }, [])

  return { transactions }
}