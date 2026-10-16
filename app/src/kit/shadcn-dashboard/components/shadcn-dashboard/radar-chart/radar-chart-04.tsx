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
  { skill: "JavaScript", desktop: 75, mobile: 90 },
  { skill: "TypeScript", desktop: 95, mobile: 80 },
  { skill: "React", desktop: 60, mobile: 75 },
  { skill: "Node.js", desktop: 80, mobile: 100 },
  { skill: "CSS", desktop: 70, mobile: 90 },
  { skill: "Python", desktop: 55, mobile: 70 },
];

const chartConfig = {
    desktop: { label: "Desktop", color: "color-mix(in srgb, var(--primary) 50%, transparent)" },
    mobile: { label: "Mobile", color: "color-mix(in srgb, var(--primary) 20%, transparent)" },
} satisfies ChartConfig;

export default function RadarChart04() {
    return (
        <ChartContainer config={chartConfig} className="aspect-square h-72">
            <RadarChart data={chartData} outerRadius="72%">
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="skill" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar
                    dataKey="desktop"
                    stroke="var(--color-desktop)"
                    fill="var(--color-desktop)"
                    strokeWidth={1}
                    activeDot={{ r: 5 }}
                />
                <Radar
                    dataKey="mobile"
                    stroke="var(--color-mobile)"
                    fill="var(--color-mobile)"
                    strokeWidth={1}
                    activeDot={{ r: 5 }}
                />
                <ChartLegend content={<ChartLegendContent />} />
            </RadarChart>
        </ChartContainer>
    );
}
