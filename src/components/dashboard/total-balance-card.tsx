import React, { useState } from 'react';
import { Eye, EyeOff, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Summary {
    totalBalance: number;
    cumulativeBalanceDifference: number;
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
    <Card className="bg-green-dark border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-gray-400">
          Lifetime
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 md:p-6 rounded-xl h-40 md:h-48">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col justify-between">
              <p className="text-sm opacity-80">Total Balance</p>
              <div className="flex justify-between">
                <p className="text-white text-2xl md:text-3xl font-bold mt-1">
                  {showBalance
                    ? formatRupiah(summary.totalBalance)
                    : "*** *** ***"}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleBalance}
                  className="text-white"
                >
                  {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </div>
            <div>
              <div className='flex rounded-lg bg-slate-600/30 justify-center'>

              <p className="text-sm md:text-base tracking-wider text-white/80">
                {formatRupiah(summary.cumulativeBalanceDifference,{abbreviate: true})}
              </p>
              {summary.cumulativeBalanceDifference > 0 && <TrendingUp className='text-green-button' />}
              {summary.cumulativeBalanceDifference < 0 && <TrendingDown className='text-red' />}
              </div>
              <p className="text-sm opacity-80 mt-1 text-end">{new Date().toLocaleDateString('id-ID', {month:'2-digit', year:'2-digit'})}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;