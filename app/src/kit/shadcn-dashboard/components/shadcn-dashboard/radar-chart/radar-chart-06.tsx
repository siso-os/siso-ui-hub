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
    { skill: "JavaScript", desktop: 186, mobile: 80 },
    { skill: "TypeScript", desktop: 305, mobile: 200 },
    { skill: "React", desktop: 237, mobile: 120 },
    { skill: "Node.js", desktop: 173, mobile: 190 },
    { skill: "CSS", desktop: 209, mobile: 130 },
    { skill: "Python", desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: { label: "Desktop", color: "var(--primary)" },
    mobile: { label: "Mobile", color: "color-mix(in srgb, var(--primary) 50%, transparent)" },
} satisfies ChartConfig;

const makeBorderDot = (color: string) => (props: { cx?: number; cy?: number }) => {
    const { cx, cy } = props;
    if (cx === undefined || cy === undefined) return null;
    return <circle cx={cx} cy={cy} r={4} fill="var(--background)" stroke={color} strokeWidth={2} />;
};

export default function RadarChart06() {
    return (
        <ChartContainer config={chartConfig} className="aspect-square h-72">
            <RadarChart data={chartData} outerRadius="72%">
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <ChartTooltip content={<ChartTooltipContent />} />

                {/* Glow layer for desktop */}
                <Radar
                    dataKey="desktop"
                    stroke="var(--color-desktop)"
                    fill="none"
                    strokeWidth={10}
                    strokeOpacity={0.15}
                    dot={false}
                    legendType="none"
                    tooltipType="none"
                />
                {/* Desktop */}
                <Radar
                    dataKey="desktop"
                    stroke="var(--color-desktop)"
                    fill="var(--color-desktop)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={makeBorderDot("var(--color-desktop)")}
                    activeDot={{ r: 5 }}
                />

                {/* Mobile */}
                <Radar
                    dataKey="mobile"
                    stroke="var(--color-mobile)"
                    fill="var(--color-mobile)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={makeBorderDot("var(--color-mobile)")}
                    activeDot={{ r: 5 }}
                />

                <ChartLegend content={<ChartLegendContent />} />
            </RadarChart>
        </ChartContainer>
    );
}
