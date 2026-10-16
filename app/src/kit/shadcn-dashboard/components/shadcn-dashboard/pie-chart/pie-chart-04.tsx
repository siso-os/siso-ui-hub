"use client";

import { Cell, Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../../shadcn/ui/chart";

const chartData = [
    { name: "Segment A", value: 45, color: "var(--primary)" },
    { name: "Segment B", value: 25, color: "color-mix(in srgb, var(--primary) 60%, transparent)" },
    { name: "Segment C", value: 20, color: "color-mix(in srgb, var(--primary) 40%, transparent)" },
    { name: "Segment D", value: 10, color: "color-mix(in srgb, var(--primary) 20%, transparent)" },
];

const chartConfig = {
    "Segment A": { label: "Segment A", color: "var(--primary)" },
    "Segment B": { label: "Segment B", color: "color-mix(in srgb, var(--primary) 60%, transparent)" },
    "Segment C": { label: "Segment C", color: "color-mix(in srgb, var(--primary) 40%, transparent)" },
    "Segment D": { label: "Segment D", color: "color-mix(in srgb, var(--primary) 20%, transparent)" },
} satisfies ChartConfig;

export default function PieChart04() {
    return (
        <ChartContainer config={chartConfig} className="aspect-square h-65 w-full">
            <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="72%"
                    outerRadius="88%"
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={-270}
                    strokeWidth={0}
                    cornerRadius={0}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) - 12}
                                            className="fill-muted-foreground text-sm font-normal"
                                        >
                                            Avg score
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 14}
                                            className="fill-foreground text-xl font-semibold"
                                        >
                                            62%
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    );
}
