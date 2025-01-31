"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { cn, formatRupiah } from "@/lib/utils"

interface SpendingOverviewProps {
  data: { date: string; income: number; expense: number }[]
  className?: string
  filterType: 'all' | 'income' | 'expense'
}

export function SpendingOverview({ data, className, filterType }: SpendingOverviewProps) {
  const chartConfig = {
    ...((filterType === 'all' || filterType === 'income') ? { 
      income: {
        label: "Income",
        color: "hsl(var(--chart-2))",
      } 
    } : {}),
    ...((filterType === 'all' || filterType === 'expense') ? { 
      expense: {
        label: "Expense",
        color: "hsl(var(--chart-1))",
      } 
    } : {}),
  };

  return (
    <Card className={cn("shadow-lg overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Spending Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 ">
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 0 }}
          >
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                `${formatRupiah(value, { abbreviate: true })}`
              }
              width={60}
            />
            {(filterType === "all" || filterType === "income") && (
              <Line
                type="monotone"
                dataKey="income"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "var(--color-income)",
                  strokeWidth: 2,
                  stroke: "white",
                }}
              />
            )}
            {(filterType === "all" || filterType === "expense") && (
              <Line
                type="monotone"
                dataKey="expense"
                stroke="var(--color-expense)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "var(--color-expense)",
                  strokeWidth: 2,
                  stroke: "white",
                }}
              />
            )}
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

