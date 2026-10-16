"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../../../../shadcn/ui/chart";

const chartData = [
    { year: "2019", JavaScript: 33, Python: 38, Rust: 58, TypeScript: 53 },
    { year: "2020", JavaScript: 52, Python: 49, Rust: 35, TypeScript: 50 },
    { year: "2021", JavaScript: 60, Python: 48, Rust: 25, TypeScript: 30 },
    { year: "2022", JavaScript: 53, Python: 30, Rust: 35, TypeScript: 16 },
    { year: "2023", JavaScript: 32, Python: 22, Rust: 58, TypeScript: 22 },
    { year: "2024", JavaScript: 27, Python: 28, Rust: 66, TypeScript: 46 },
];

const chartConfig = {
    JavaScript: { label: "JavaScript", color: "var(--primary)" },
    Python: { label: "Python", color: "color-mix(in oklch, var(--primary) 80%, transparent)" },
    Rust: { label: "Rust", color: "color-mix(in oklch, var(--primary) 60%, transparent)" },
    TypeScript: { label: "TypeScript", color: "color-mix(in oklch, var(--primary) 20%, transparent)" },
} satisfies ChartConfig;

const ChartLine04 = () => {
    return (
        <ChartContainer config={chartConfig} className="h-72 w-full max-w-2xl">
            <LineChart
                data={chartData}
                accessibilityLayer
                margin={{ left: 8, right: 20, top: 10, bottom: 0 }}
            >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(144,164,174,0.2)" />
                <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    interval={0}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(v) => `${v}%`}
                    domain={[0, 80]}
                    ticks={[0, 20, 40, 60, 80]}
                    fontSize={11}
                />
                <ChartTooltip
                    cursor={{ stroke: "#a3a3a3", strokeDasharray: "4 4", strokeWidth: 1 }}
                    content={<ChartTooltipContent />}
                />
                <ChartLegend content={<ChartLegendContent />} />

                <Line type="monotone" dataKey="JavaScript" stroke="var(--color-JavaScript)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "var(--color-JavaScript)", strokeWidth: 0 }} />
                <Line type="monotone" dataKey="Python" stroke="var(--color-Python)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "var(--color-Python)", strokeWidth: 0 }} />
                <Line type="monotone" dataKey="Rust" stroke="var(--color-Rust)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "var(--color-Rust)", strokeWidth: 0 }} />
                <Line type="monotone" dataKey="TypeScript" stroke="var(--color-TypeScript)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "var(--color-TypeScript)", strokeWidth: 0 }} />
            </LineChart>
        </ChartContainer>
    );
};

export default ChartLine04;
