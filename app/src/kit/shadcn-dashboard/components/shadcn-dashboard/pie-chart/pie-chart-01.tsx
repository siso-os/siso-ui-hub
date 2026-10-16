"use client";

import { Cell, Label, Pie, PieChart, Tooltip, TooltipContentProps } from "recharts";
import { ChartConfig, ChartContainer } from "../../../../shadcn/ui/chart";

const segments = [
    {
        name: "Website",
        count: 36,
        percentage: 60,
        color: "var(--primary)",
    },
    {
        name: "Marketplace",
        count: 12,
        percentage: 20,
        color: "color-mix(in srgb, var(--primary) 60%, transparent)",
    },
    {
        name: "Affiliate",
        count: 12,
        percentage: 20,
        color: "color-mix(in srgb, var(--primary) 20%, transparent)",
    },
];

const chartData = segments.flatMap(({ name, count, percentage, color }) =>
    Array.from({ length: count }, () => ({ value: 1, name, percentage, color }))
);

const chartConfig = {
    Website:     { label: "Website",     color: "var(--primary)" },
    Marketplace: { label: "Marketplace", color: "color-mix(in srgb, var(--primary) 60%, transparent)" },
    Affiliate:   { label: "Affiliate",   color: "color-mix(in srgb, var(--primary) 20%, transparent)" },
} satisfies ChartConfig;

function CustomTooltip({ active, payload }: Partial<TooltipContentProps<number, string>>) {
    if (!active || !payload?.length) return null;
    const { name, percentage, color } = payload[0].payload as {
        name: string;
        percentage: number;
        color: string;
    };
    return (
        <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-md">
            <div className="flex items-center gap-2 text-sm">
                <span
                    className="size-2.5 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: color }}
                />
                <span className="text-muted-foreground">{name}</span>
                <span className="ml-1 font-semibold text-foreground">{percentage}%</span>
            </div>
        </div>
    );
}

export default function PieChart01() {
    return (
        <ChartContainer config={chartConfig} className="aspect-square h-[265px] w-full">
            <PieChart>
                <Tooltip
                    cursor={false}
                    content={<CustomTooltip />}
                    isAnimationActive={false}
                />
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="65%"
                    outerRadius="88%"
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={450}
                    strokeWidth={0}
                    cornerRadius={3}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="none"
                        />
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
                                            Total
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 14}
                                            className="fill-foreground text-xl font-semibold"
                                        >
                                            $27,850
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
