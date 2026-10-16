"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../shadcn/ui/chart";

const chartData = [
  { name: "1W", value: 40 },
  { name: "2W", value: 40 },
  { name: "3W", value: 80 },
  { name: "4W", value: 80 },
  { name: "5W", value: 30 },
  { name: "6W", value: 30 },
  { name: "7W", value: 20 },
  { name: "8W", value: 20 },
  { name: "9W", value: 30 },
  { name: "10W", value: 30 },
  { name: "11W", value: 100 },
  { name: "12W", value: 100 },
  { name: "13W", value: 20 },
  { name: "14W", value: 20 },
  { name: "15W", value: 140 },
  { name: "16W", value: 140 },
];

const chartConfig = {
  value: {
    label: "Settlements",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const ChartAreaLegendCode = () => {
  return (
    <ChartContainer className="h-80" config={chartConfig}>
        <AreaChart data={chartData} margin={{ left: -30 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--primary)" strokeOpacity={0.3} />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            interval={1}
            minTickGap={0}
            tick={{
              fontSize: 12,
              fontWeight: 400,
            }}
            tickMargin={14}

          />

          <YAxis hide />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          <defs>
            <linearGradient
              id="fillSettlements"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="var(--color-value)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="var(--color-value)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            fill="var(--primary)"
            strokeWidth={2}
            fillOpacity={0.1}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "var(--color-value)",
              fill: "#fff",
            }}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
    </ChartContainer>
  );
};

export default ChartAreaLegendCode;
