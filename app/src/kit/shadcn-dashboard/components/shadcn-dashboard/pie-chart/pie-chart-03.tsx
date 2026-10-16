"use client";

import { Cell, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../../shadcn/ui/chart";

const rings = [
    { key: "outer",  value: 80, color: "var(--primary)",                                        ir: "83%", or: "95%" },
    { key: "middle", value: 62, color: "color-mix(in srgb, var(--primary) 60%, transparent)",   ir: "58%", or: "70%" },
    { key: "inner",  value: 45, color: "color-mix(in srgb, var(--primary) 20%, transparent)",   ir: "33%", or: "45%" },
];

const chartConfig = {
    outer:  { label: "Outer",  color: "var(--primary)" },
    middle: { label: "Middle", color: "color-mix(in srgb, var(--primary) 60%, transparent)" },
    inner:  { label: "Inner",  color: "color-mix(in srgb, var(--primary) 20%, transparent)" },
} satisfies ChartConfig;

export default function PieChart03() {
    return (
        <div className="relative aspect-square w-full max-w-70 mx-auto">
            <ChartContainer config={chartConfig} className="size-full">
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    {rings.flatMap((ring) => [
                        <Pie
                            key={`${ring.key}-bg`}
                            data={[{ value: 100 }]}
                            dataKey="value"
                            innerRadius={ring.ir}
                            outerRadius={ring.or}
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                            isAnimationActive={false}
                        >
                            <Cell fill={ring.color} fillOpacity={0.15} />
                        </Pie>,
                        <Pie
                            key={`${ring.key}-fg`}
                            data={[
                                { value: ring.value, name: ring.key },
                                { value: 100 - ring.value },
                            ]}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={ring.ir}
                            outerRadius={ring.or}
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                            isAnimationActive={false}
                        >
                            <Cell fill={ring.color} />
                            <Cell fillOpacity={0} />
                        </Pie>,
                    ])}
                </PieChart>
            </ChartContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0">
                <span className="text-sm font-normal leading-5 text-muted-foreground">
                    Avg score
                </span>
                <span className="text-xl font-semibold tracking-tight text-foreground">
                    62%
                </span>
            </div>
        </div>
    );
}
