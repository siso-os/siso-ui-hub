"use client";

import { RadialBar, RadialBarChart } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../../../shadcn/ui/chart";

const chartData = [
    { browser: "chrome",  label: "Chrome",  visitors: 275, fill: "var(--color-chrome)",  color: "color-mix(in srgb, var(--primary) 20%, transparent)"    },
    { browser: "safari",  label: "Safari",  visitors: 200, fill: "var(--color-safari)",  color: "color-mix(in srgb, var(--primary) 40%, transparent)" },
    { browser: "firefox", label: "Firefox", visitors: 187, fill: "var(--color-firefox)", color: "color-mix(in srgb, var(--primary) 60%, transparent)"   },
    { browser: "edge",    label: "Edge",    visitors: 173, fill: "var(--color-edge)",    color: "color-mix(in srgb, var(--primary) 80%, transparent)"  },
    { browser: "other",   label: "Other",   visitors: 90,  fill: "var(--color-other)",   color: "var(--primary)"    },
];

const chartConfig = {
    visitors: { label: "Visitors" },
    chrome:   { label: "Chrome",  color: "color-mix(in srgb, var(--primary) 20%, transparent)"    },
    safari:   { label: "Safari",  color: "color-mix(in srgb, var(--primary) 40%, transparent)" },
    firefox:  { label: "Firefox", color: "color-mix(in srgb, var(--primary) 60%, transparent)"   },
    edge:     { label: "Edge",    color: "color-mix(in srgb, var(--primary) 80%, transparent)"  },
    other:    { label: "Other",   color: "var(--primary)"    },
} satisfies ChartConfig;

export default function RadialChart01() {
    return (
        <div className="flex flex-col items-center gap-4">
            <ChartContainer config={chartConfig} className="aspect-square h-64">
                <RadialBarChart
                    data={chartData}
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={28}
                    outerRadius={105}
                >
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent nameKey="browser" hideLabel />}
                    />
                    <RadialBar
                        dataKey="visitors"
                        background={{ fill: "var(--muted)" }}
                        cornerRadius={0}
                    />
                </RadialBarChart>
            </ChartContainer>

            {/* Legend */}
            <div className="flex gap-4 flex-wrap justify-center">
                {chartData.map((item) => (
                    <div key={item.browser} className="flex items-center gap-1.5">
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
