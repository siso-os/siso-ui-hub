"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../shadcn/ui/chart";

const chartConfig = {
  orders: {
    label: "Total Order",
    color: "var(--primary)",
  },
  sales: {
    label: "Total Sale",
    color: "color-mix(in oklch, var(--primary) 20%, transparent)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "Jan", orders: 5.5, sales: 4.2 },
  { month: "Feb", orders: 3.5, sales: 5.4 },
  { month: "Mar", orders: 4.2, sales: 0.8 },
  { month: "Apr", orders: 6.0, sales: 0.6 },
  { month: "May", orders: 2.0, sales: 3.2 },
  { month: "Jun", orders: 1.5, sales: 3.8 },
  { month: "Jul", orders: 3.6, sales: 2.0 },
  { month: "Aug", orders: 3.2, sales: 1.8 },
  { month: "Sep", orders: 0.8, sales: 5.5 },
  { month: "Oct", orders: 1.0, sales: 5.8 },
  { month: "Nov", orders: 5.3, sales: 3.5 },
  { month: "Dec", orders: 4.0, sales: 5.5 },
];

function ChartAreaDefaultCode() {
  return (
    <ChartContainer config={chartConfig} className="h-80">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ left: -20, right: 12 }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke="var(--color-border)"
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[0, 8]}
          ticks={[0, 2, 4, 6, 8]}
          tickFormatter={(value) => `${value}k`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel indicator="dot" />}
        />
        <defs>
          <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.18} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.01} />
          </linearGradient>
          <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <Area
          dataKey="sales"
          type="natural"
          fill="url(#fillSales)"
          fillOpacity={1}
          stroke="var(--color-sales)"
          strokeWidth={1.5}
        />
        <Area
          dataKey="orders"
          type="natural"
          fill="url(#fillOrders)"
          fillOpacity={1}
          stroke="var(--color-orders)"
          strokeWidth={1.5}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}

export default ChartAreaDefaultCode;
