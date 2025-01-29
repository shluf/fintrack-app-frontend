import TransactionsContent from "@/components/transactions/transaction-content";
import { Suspense } from "react";

export default function TransactionsPage() {
    return (
      <Suspense fallback={<div>Loading transactions...</div>}>
        <TransactionsContent />
      </Suspense>
    );
  }