'use client';
import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpendingOverview } from '@/components/charts/spending-overview';
import { transactionsApi, type Transaction } from '@/lib/api';
import { Download, FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionsApi.getAll();
        setTransactions(response.data.transactions);
        const summary = response.data.transactions.reduce(
          (acc: { totalIncome: number; totalExpenses: number }, transaction: Transaction) => {
            if (transaction.type === 'income') {
              acc.totalIncome += transaction.amount;
            } else {
              acc.totalExpenses += transaction.amount;
            }
            return acc;
          },
          { totalIncome: 0, totalExpenses: 0 }
        );
       
        setSummary({
          ...summary,
          balance: summary.totalIncome - summary.totalExpenses,
        });
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const chartData = transactions.map((transaction) => ({
    date: new Date(transaction.date).toLocaleDateString(),
    amount: transaction.type === 'income' ? transaction.amount : -transaction.amount,
  }));

  const formatDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const exportAsPNG = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `financial-report-${formatDate()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to export as PNG:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
      });
      
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`financial-report-${formatDate()}.pdf`);
    } catch (error) {
      console.error('Failed to export as PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Dashboard</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={isExporting}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={exportAsPNG}>
              <FileDown className="mr-2 h-4 w-4" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportAsPDF}>
              <FileDown className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div ref={reportRef}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                ${summary.totalIncome.toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">
                ${summary.totalExpenses.toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                ${summary.balance.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingOverview data={chartData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}