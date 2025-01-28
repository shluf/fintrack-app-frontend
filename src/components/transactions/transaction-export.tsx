'use client';

import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Transaction } from '@/lib/api';
import { formatRupiah } from '@/lib/utils';
import { Download } from 'lucide-react';

interface ExportPDFButtonProps {
  filteredTransactions: Transaction[];
  selectedMonth: {
    month: string;
    year: number;
  };
  className?: string;
}

export function ExportPDFButton({ 
  filteredTransactions,
  selectedMonth,
  className 
}: ExportPDFButtonProps) {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const title = `Transactions for ${selectedMonth.month}, ${selectedMonth.year}`;
    
    doc.setFontSize(16);
    doc.text(title, 14, 15);

    const columns = ['Date', 'Description', 'Type', 'Amount'];
    const rows = filteredTransactions.map(transaction => [
      format(new Date(transaction.date), 'MMM d, yyyy'),
      transaction.description,
      transaction.type.toUpperCase(),
      formatRupiah(transaction.amount)
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 25,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { 
        fillColor: [41, 128, 185],
        textColor: 255 
      },
      columnStyles: {
        3: { cellWidth: 40 }
      }
    });

    doc.save(`transactions-${selectedMonth.year}-${selectedMonth.month}.pdf`);
  };

  return (
    <Button 
      onClick={handleExportPDF}
      className={`bg-green-bar ${className}`}
    >
      <Download className="mr-2 h-4 w-4" />
      Export PDF
    </Button>
  );
}