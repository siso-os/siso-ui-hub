"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../../../../shadcn/ui/chart";

const ChartBarLabelCustomCode = ({ className }: { className?: string }) => {
  const [selectedMonth, setSelectedMonth] = useState("March 2026");

  const chartDataByMonth: Record<string, any[]> = {
    "March 2026": [
      { month: "16/08", Earnings: 1500, Expense: -1800, },
      { month: "17/08", Earnings: 2700, Expense: -1100, },
      { month: "18/08", Earnings: 2200, Expense: -2500 },
      { month: "19/08", Earnings: 3000, Expense: -1500 },
      { month: "20/08", Earnings: 1500, Expense: -600 },
      { month: "21/08", Earnings: 1000, Expense: -1800 },
      { month: "22/08", Earnings: 1400, Expense: -1200 },
    ],
    "March 2025": [
      { month: "16/08", Earnings: 2000, Expense: -1200 },
      { month: "17/08", Earnings: 2500, Expense: -1500 },
      { month: "18/08", Earnings: 2800, Expense: -2000 },
      { month: "19/08", Earnings: 3000, Expense: -1000 },
      { month: "20/08", Earnings: 2000, Expense: -800 },
      { month: "21/08", Earnings: 1500, Expense: -1300 },
      { month: "22/08", Earnings: 2700, Expense: -1500 },
    ],
    "March 2024": [
      { month: "16/08", Earnings: 1800, Expense: -1500 },
      { month: "17/08", Earnings: 2200, Expense: -1300 },
      { month: "18/08", Earnings: 2600, Expense: -2200 },
      { month: "19/08", Earnings: 3000, Expense: -1200 },
      { month: "20/08", Earnings: 1700, Expense: -700 },
      { month: "21/08", Earnings: 1200, Expense: -1600 },
      { month: "22/08", Earnings: 2000, Expense: -1200 },
    ],
  };

  const chartConfig = {
    Earnings: {
      label: "Earnings",
      color: "color-mix(in oklch, var(--primary) 30%, transparent)",
    },
    Expense: {
      label: "Expense",
      color: "var(--color-primary)",
    },
  } satisfies ChartConfig;

  return (
    <div className="h-80">
      <ChartContainer config={chartConfig} className="h-full max-w-lg">
        <BarChart
          accessibilityLayer
          data={chartDataByMonth[selectedMonth]}
          stackOffset="sign"
          margin={{ left: -30 }}

        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={15}
            axisLine={false}


          />
          <YAxis
            tickFormatter={(val) => `${val / 1000}k`}
            tickLine={false}
            axisLine={false}
            domain={[-3000, 3000]}

            ticks={[-3000, -2000, -1000, 0, 1000, 2000, 3000]}
          />

          <ChartTooltip content={<ChartTooltipContent />} />


          <Bar
            dataKey="Earnings"
            stackId="a"
            fill="var(--color-Earnings)"
            radius={[0, 0, 0, 0]}
            barSize={30}
            stroke="var(--background)"
            strokeWidth={2}
          />

          <Bar
            dataKey="Expense"
            stackId="a"
            fill="var(--color-Expense)"
            radius={[0, 0, 0, 0]}
            barSize={30}
            stroke="var(--background)"
            strokeWidth={2}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
export default ChartBarLabelCustomCode;
