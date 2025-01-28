import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Summary {
    totalBalance: number;
  }
  
interface BalanceCardProps {
    summary: Summary;
    formatRupiah: (amount: number) => string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ summary, formatRupiah }) => {
    const [showBalance, setShowBalance] = useState<boolean>(true);
  
    const toggleBalance = (): void => {
      setShowBalance(!showBalance);
    };

  return (
    <Card className="bg-[#1e2e2e] border-none">
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
              <p className="text-base md:text-lg tracking-wider">
                4358 4445 0968 2323
              </p>
              <p className="text-sm opacity-80 mt-1">08/24</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;