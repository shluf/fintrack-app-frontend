import React, { useState } from 'react';
import { CalendarDays, Eye, EyeOff, Sparkles, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Summary {
    totalBalance: number;
    cumulativeBalanceDifference: number;
    percentageCumulativeBalanceDifference: number
  }
  
interface BalanceCardProps {
    summary: Summary;
    formatRupiah: (amount: number, options?: { abbreviate?: boolean }) => string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ summary, formatRupiah }) => {
    const [showBalance, setShowBalance] = useState<boolean>(true);
  
    const toggleBalance = (): void => {
      setShowBalance(!showBalance);
    };

      return (
        <Card className="bg-[#0F172A] border border-slate-800/50 hover:border-emerald-500/30 transition-all hover:scale-[101%] group relative overflow-hidden">

          <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <CardTitle className="text-lg font-semibold bg-emerald-400 bg-clip-text text-transparent">
                Lifetime Wealth
              </CardTitle>
            </div>
          </CardHeader>
    
          <CardContent className="mt-5">
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/30 p-6 rounded-xl border border-slate-800/50 shadow-inner">

              <Wallet className="h-16 w-16 absolute -top-2 right-2 text-slate-800/40" />
              
              <div className="flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-emerald-300/80 font-medium">Total Balance</span>
                    <div className="h-[2px] w-4 bg-emerald-400/30" />
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <p className="text-white text-3xl font-bold tracking-tight drop-shadow-md">
                      {showBalance
                        ? formatRupiah(summary.totalBalance)
                        : "••• ••• •••"}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleBalance}
                      className="text-emerald-400/80 hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                      {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
                </div>
    
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm ${
                    summary.cumulativeBalanceDifference > 0 
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "bg-rose-500/10 border border-rose-500/20"
                  }`}>
                    <div className={`p-1 rounded-full ${
                      summary.cumulativeBalanceDifference > 0 
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}>
                      {summary.cumulativeBalanceDifference > 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </div>
                    <p className="text-sm font-medium tracking-wider text-slate-200">
                      {formatRupiah(summary.cumulativeBalanceDifference, { abbreviate: true })}
                    </p>
                    {summary.cumulativeBalanceDifference > 0 && (
                      <div className="ml-auto animate-pulse bg-emerald-500/10 px-2 py-1 rounded-full text-xs text-emerald-300">
                        +{summary.percentageCumulativeBalanceDifference.toFixed(1)}%
                      </div>
                    )}
                  </div>
    
                  <div className="flex items-center gap-2 justify-end text-slate-400/80">
                    <CalendarDays className="h-4 w-4" />
                    <p className="text-xs">
                      {new Date().toLocaleDateString('id-ID', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    };

export default BalanceCard;