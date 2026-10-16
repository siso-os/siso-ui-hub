"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../../../../shadcn/ui/chart";

const chartData = [
    { subject: "Attack", magic: 30, attack: 85, defense: 65 },
    { subject: "Defense", magic: 25, attack: 60, defense: 90 },
    { subject: "Magic", magic: 90, attack: 25, defense: 45 },
];

const chartConfig = {
    magic: { label: "Magic" },
    attack: { label: "Attack" },
    defense: { label: "Defense"},
} satisfies ChartConfig;

export default function RadarChart02() {
    return (
        <ChartContainer config={chartConfig} className="aspect-square h-72">
            <RadarChart data={chartData} outerRadius="72%">
                <PolarGrid gridType="polygon" />
                <PolarAngleAxis dataKey="subject" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar
                    dataKey="defense"
                    stroke="color-mix(in srgb, var(--primary) 20%, transparent)"
                    fill="color-mix(in srgb, var(--primary) 5%, transparent)"
                />
                <Radar
                    dataKey="attack"
                    stroke="color-mix(in srgb, var(--primary) 50%, transparent)"
                    fill="color-mix(in srgb, var(--primary) 10%, transparent)"
                />
                <Radar
                    dataKey="magic"
                    stroke="var(--primary)"
                    fill="color-mix(in srgb, var(--primary) 50%, transparent)"
                />
                <ChartLegend content={<ChartLegendContent />} />
            </RadarChart>
        </ChartContainer>
    );
}
