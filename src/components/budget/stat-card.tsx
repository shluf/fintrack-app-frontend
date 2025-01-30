import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleDollarSign, PiggyBank, Receipt, Wallet } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
};

export const StatCard = ({ title, value }: StatCardProps) => {
  const iconMap = {
    "Budget Limit": <Wallet className="h-6 w-6 text-emerald-400" />,
    "Total Used": <Receipt className="h-6 w-6 text-red-400" />,
    "Remaining": <PiggyBank className="h-6 w-6 text-cyan-400" />
  };

  return (
    <Card className="bg-[#0F172A] border border-slate-800/50 hover:border-emerald-500/30 transition-all group">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          {iconMap[title as keyof typeof iconMap] || <CircleDollarSign className="h-4 w-4" />}
          {title}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold 
            ${title === "Total Used" ? "text-red-400" : title === "Budget Limit" ? "text-emerald-400" : "text-cyan-400"}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
};