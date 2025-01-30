import { Transaction } from "@/lib/api"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface TransactionItemProps {
    transaction: Transaction
    formatRupiah: (amount: number) => string
  }
  
  export const TransactionItem = ({ transaction, formatRupiah }: TransactionItemProps) => (
    <div className="flex items-center justify-between p-3 hover:bg-slate-800/30 rounded-lg transition-all group">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${
          transaction.type === "income" 
            ? "bg-emerald-500/20 text-emerald-300" 
            : "bg-purple-500/20 text-purple-300"
        }`}>
          {transaction.type === "income" ? (
            <ArrowDownCircle className="h-5 w-5" />
          ) : (
            <ArrowUpCircle className="h-5 w-5" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-slate-200 group-hover:text-emerald-100 transition-colors">
            {transaction.description}
          </span>
          <span className="text-xs text-slate-400/80">
            {new Date(transaction.date).toLocaleDateString('en-US', { 
              day: 'numeric', 
              month: 'short', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
      <span className={`font-medium ${
        transaction.type === "income" 
          ? "text-emerald-400" 
          : "text-purple-400"
      }`}>
        {formatRupiah(Math.abs(transaction.amount))}
      </span>
    </div>
  );