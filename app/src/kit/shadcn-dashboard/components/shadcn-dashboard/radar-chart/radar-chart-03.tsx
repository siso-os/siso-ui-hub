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
    { skill: "JS", teamA: 88, teamB: 72, teamC: 60 },
    { skill: "TS", teamA: 65, teamB: 80, teamC: 90 },
    { skill: "Java", teamA: 78, teamB: 55, teamC: 82 },
    { skill: "CSS", teamA: 60, teamB: 90, teamC: 70 },
    { skill: "SQL", teamA: 82, teamB: 68, teamC: 75 },
    { skill: "NextJS", teamA: 82, teamB: 68, teamC: 75 },
];

const chartConfig = {
    teamA: { label: "Team A", color: "color-mix(in srgb, var(--primary) 50%, transparent)" },
    teamB: { label: "Team B", color: "color-mix(in srgb, var(--primary) 10%, transparent)" },
    teamC: { label: "Team C", color: "color-mix(in srgb, var(--primary) 5%, transparent)" },
} satisfies ChartConfig;

export default function RadarChart03() {
    return (
        <ChartContainer config={chartConfig} className="aspect-square h-72">
            <RadarChart data={chartData} outerRadius="72%">
                <PolarGrid gridType="polygon" radialLines={false} />
                <PolarAngleAxis dataKey="skill" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar
                    dataKey="teamA"
                    stroke="var(--color-teamA)"
                    fill="var(--color-teamA)"
                    strokeWidth={0}
                    dot={false}
                />
                <Radar
                    dataKey="teamB"
                    stroke="var(--color-teamB)"
                    fill="var(--color-teamB)"
                    strokeWidth={0}
                    dot={false}
                />
                <Radar
                    dataKey="teamC"
                    stroke="var(--color-teamC)"
                    fill="var(--color-teamC)"
                    strokeWidth={0}
                    dot={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
            </RadarChart>
        </ChartContainer>
    );
}
