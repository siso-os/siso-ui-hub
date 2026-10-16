"use client";

import { Area, ComposedChart, Line, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../shadcn/ui/chart";

const chartConfig = {
  offline: {
    label: "Offline store",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const rawData = [
  { month: "Jan", v: 42 },
  { month: "", v: 48 },
  { month: "", v: 40 },
  { month: "", v: 56 },
  { month: "", v: 54 },
  { month: "Feb", v: 72 },
  { month: "", v: 28 },
  { month: "", v: 54 },
  { month: "", v: 49 },
  { month: "", v: 64 },
  { month: "Mar", v: 58 },
  { month: "", v: 82 },
  { month: "", v: 51 },
  { month: "", v: 51 },
  { month: "", v: 41 },
  { month: "Apr", v: 57 },
  { month: "", v: 54 },
  { month: "", v: 71 },
  { month: "", v: 66 },
  { month: "", v: 67 },
  { month: "May", v: 49 },
  { month: "", v: 72 },
  { month: "", v: 60 },
  { month: "", v: 89 },
  { month: "", v: 67 },
  { month: "Jun", v: 69 },
  { month: "", v: 49 },
  { month: "", v: 56 },
  { month: "", v: 46 },
  { month: "", v: 68 },
  { month: "Jul", v: 67 },
  { month: "", v: 87 },
  { month: "", v: 48 },
  { month: "", v: 72 },
  { month: "", v: 60 },
  { month: "Aug", v: 72 },
  { month: "", v: 56 },
];

const chartData = rawData.map((d) => ({ month: d.month, offline: d.v, online: d.v }));

export default function SalesTrendChart() {
  return (
    <ChartContainer config={chartConfig} className="h-80">
      <ComposedChart
        data={chartData}
        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
      >
        <defs>
          <linearGradient id="areaGradient03" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tickMargin={16}
          interval={0}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />

        <Area
          type="linear"
          dataKey="online"
          fill="url(#areaGradient03)"
          stroke="none"
          strokeWidth={0}
          opacity={0.3}
        />

        <Line
          type="linear"
          dataKey="offline"
          stroke="var(--primary)"
          strokeWidth={1.5}
          dot={{ r: 2, fill: "var(--primary)", strokeWidth: 0 }}
          activeDot={{ r: 4 }}
        />

        <ChartLegend verticalAlign="bottom" content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  );
}
