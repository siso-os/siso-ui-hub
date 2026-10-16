"use client";

import { Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../../shadcn/ui/chart";

const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
    visitors: { label: "Visitors" },
    chrome: { label: "Chrome", color: "var(--primary)" },
    safari: { label: "Safari", color: "color-mix(in srgb, var(--primary) 80%, transparent)" },
    firefox: { label: "Firefox", color: "color-mix(in srgb, var(--primary) 60%, transparent)" },
    edge: { label: "Edge", color: "color-mix(in srgb, var(--primary) 40%, transparent)" },
    other: { label: "Other", color: "color-mix(in srgb, var(--primary) 20%, transparent)" },
} satisfies ChartConfig;

export default function PieChart05() {
    return (
        <ChartContainer config={chartConfig} className="aspect-square h-72">
            <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                    data={chartData}
                    dataKey="visitors"
                    nameKey="browser"
                    stroke="none"
                />
            </PieChart>
        </ChartContainer>
    );
}
