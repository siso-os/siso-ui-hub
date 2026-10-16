"use client";

import { useEffect, useRef, useState } from "react";
import { RadialBar, RadialBarChart } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../../../shadcn/ui/chart";

const chartData = [
    { label: "Income",     value: 4240, fill: "var(--primary)",    color: "var(--primary)"    },
    { label: "Expenses",   value: 3180, fill: "color-mix(in srgb, var(--primary) 80%, transparent)",    color: "color-mix(in srgb, var(--primary) 80%, transparent)"    },
    { label: "Savings",    value: 1820, fill: "color-mix(in srgb, var(--primary) 60%, transparent)", color: "color-mix(in srgb, var(--primary) 60%, transparent)" },
    { label: "Investment", value: 2640, fill: "color-mix(in srgb, var(--primary) 40%, transparent)",   color: "color-mix(in srgb, var(--primary) 40%, transparent)"   },
];

const chartConfig = {
    value: { label: "Amount" },
} satisfies ChartConfig;

const total = chartData.reduce((sum, d) => sum + d.value, 0);

const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

function AnimatedValue({ value, prefix = "" }: { value: number; prefix?: string }) {
    const [display, setDisplay] = useState(value);
    const prevRef = useRef(value);
    const frameRef = useRef(0);

    useEffect(() => {
        const from = prevRef.current;
        const to = value;
        const duration = 500;
        let startTime = 0;

        const tick = (ts: number) => {
            if (!startTime) startTime = ts;
            const t = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(from + (to - from) * eased));
            if (t < 1) {
                frameRef.current = requestAnimationFrame(tick);
            } else {
                prevRef.current = to;
            }
        };

        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameRef.current);
    }, [value]);

    return <>{prefix}{fmt(display)}</>;
}

export default function RadialChart04() {
    const [activeItem, setActiveItem] = useState<{ label: string; value: number } | null>(null);

    const displayValue = activeItem?.value ?? total;
    const displayLabel = activeItem?.label ?? "Total";

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative">
                <ChartContainer config={chartConfig} className="aspect-square h-64">
                    <RadialBarChart
                        data={chartData}
                        startAngle={90}
                        endAngle={-270}
                        innerRadius={60}
                        outerRadius={120}
                        barSize={12}
                        barCategoryGap={10}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent nameKey="label" hideLabel />}
                        />
                        <RadialBar
                            dataKey="value"
                            background={{ fill: "var(--muted)" }}
                            cornerRadius={0}
                            onMouseEnter={(data: any) =>
                                setActiveItem({ label: data.label, value: data.value })
                            }
                            onMouseLeave={() => setActiveItem(null)}
                        />
                    </RadialBarChart>
                </ChartContainer>

                {/* Center — animates on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-foreground">
                        <AnimatedValue value={displayValue} prefix="$" />
                    </span>
                    <span
                        key={displayLabel}
                        className="text-xs text-muted-foreground transition-all duration-200"
                    >
                        {displayLabel}
                    </span>
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 flex-wrap justify-center">
                {chartData.map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: item.color }}
                        />
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
