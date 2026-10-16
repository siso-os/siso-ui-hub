"use client";

import { Cell, Label, Pie, PieChart, Tooltip, TooltipContentProps } from "recharts";
import { ChartConfig, ChartContainer } from "../../../../shadcn/ui/chart";

const segments = [
    { name: "Segment 1", count: 11, color: "var(--primary)" },
    { name: "Segment 2", count: 11, color: "color-mix(in srgb, var(--primary) 80%, transparent)" },
    { name: "Segment 3", count: 11, color: "color-mix(in srgb, var(--primary) 60%, transparent)" },
    { name: "Segment 4", count: 11, color: "color-mix(in srgb, var(--primary) 40%, transparent)" },
    { name: "Segment 5", count: 11, color: "color-mix(in srgb, var(--primary) 20%, transparent)" },
];

const chartData = segments.flatMap(({ name, count, color }) =>
    Array.from({ length: count }, () => ({ value: 1, name, color }))
);

const chartConfig = {
    "Segment 1": { label: "Segment 1", color: "var(--primary)" },
    "Segment 2": { label: "Segment 2", color: "color-mix(in srgb, var(--primary) 80%, transparent)" },
    "Segment 3": { label: "Segment 3", color: "color-mix(in srgb, var(--primary) 60%, transparent)" },
    "Segment 4": { label: "Segment 4", color: "color-mix(in srgb, var(--primary) 40%, transparent)" },
    "Segment 5": { label: "Segment 5", color: "color-mix(in srgb, var(--primary) 20%, transparent)" },
} satisfies ChartConfig;

function CustomTooltip({ active, payload }: Partial<TooltipContentProps<number, string>>) {
    if (!active || !payload?.length) return null;
    const { name, color } = payload[0].payload as { name: string; color: string };
    return (
        <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-md">
            <div className="flex items-center gap-2 text-sm">
                <span
                    className="size-2.5 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: color }}
                />
                <span className="text-muted-foreground">{name}</span>
            </div>
        </div>
    );
}

export default function PieChart02() {
    return (
        <div className="w-full overflow-hidden h-30">
            <ChartContainer config={chartConfig} className="h-65 w-full">
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
                        startAngle={180}
                        endAngle={0}
                        innerRadius="60%"
                        outerRadius="88%"
                        paddingAngle={1.5}
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
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) - 10}
                                                className="fill-foreground text-3xl font-semibold tracking-tight"
                                            >
                                                8364
                                            </tspan>
                                        </text>
                                    );
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    );
}
