import { Transaction } from "@/lib/api"

interface TransactionItemProps {
    transaction: Transaction
    formatRupiah: (amount: number) => string
  }
  
export const TransactionItem = ({ transaction, formatRupiah }: TransactionItemProps) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center text-sm md:text-base">
          {transaction.type === "income" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-gray-400">
            {transaction.description}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(transaction.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
          </span>
        </div>
      </div>
      <span className={`text-${transaction.type === "income" ? "green" : "red"}-500 text-sm md:text-base`}>
        {formatRupiah(Math.abs(transaction.amount))}
      </span>
    </div>
  )