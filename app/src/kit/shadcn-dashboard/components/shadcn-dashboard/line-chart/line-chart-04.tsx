"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "../../../../shadcn/ui/chart";


const chartData = [
  { day: "Mon", thisWeek: 25, lastWeek: 45 },
  { day: "Tue", thisWeek: 62, lastWeek: 20 },
  { day: "Wed", thisWeek: 48, lastWeek: 45 },
  { day: "Thu", thisWeek: 88, lastWeek: 28 },
  { day: "Fri", thisWeek: 38, lastWeek: 30 },
  { day: "Sat", thisWeek: 36, lastWeek: 62 },
  { day: "Sun", thisWeek: 18, lastWeek: 45 },
];

const chartConfig = {
    thisWeek: { label: "This Week", color: "var(--primary)" },
    lastWeek: { label: "Last Week", color: "var(--muted-foreground)" },
} satisfies ChartConfig;

const ChartLine05 = () => {
    return (
        <ChartContainer config={chartConfig} className="h-72 w-full max-w-2xl">
            <AreaChart
                data={chartData}
                accessibilityLayer
                margin={{ left: 16, right: 16, top: 12, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="gradThisWeek" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#737373" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#737373" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(144,164,174,0.2)" />

                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    fontSize={12}
                />

                <ChartTooltip
                    cursor={{ stroke: "#a3a3a3", strokeWidth: 1, strokeDasharray: "4 3" }}
                    content={<ChartTooltipContent />}
                />
                <ChartLegend content={<ChartLegendContent />} />

                <Area
                    type="natural"
                    dataKey="lastWeek"
                    stroke="var(--color-lastWeek)"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    strokeOpacity={0.6}
                    fill="none"
                    dot={false}
                    activeDot={{ r: 4, fill: "#a3a3a3", strokeWidth: 0 }}
                />

                <Area
                    type="natural"
                    dataKey="thisWeek"
                    stroke="var(--color-thisWeek)"
                    strokeWidth={2}
                    fill="url(#gradThisWeek)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#0a0a0a", stroke: "var(--background)", strokeWidth: 2 }}
                />
            </AreaChart>
        </ChartContainer>
    );
};

export default ChartLine05;
