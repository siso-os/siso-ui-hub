"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "../../../../shadcn/ui/chart";

const chartData = [
    { skill: "Problem Solving", desktop: 80, mobile: 90 },
    { skill: "Creativity", desktop: 88, mobile: 72 },
    { skill: "Leadership", desktop: 68, mobile: 84 },
    { skill: "Communication", desktop: 74, mobile: 80 },
    { skill: "Technical", desktop: 84, mobile: 68 },
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "color-mix(in srgb, var(--primary) 40%, transparent)",
    },
} satisfies ChartConfig;

const makeSolidDot = (color: string) => (props: { cx?: number; cy?: number }) => {
    const { cx, cy } = props;
    if (cx === undefined || cy === undefined) return null;
    return <circle cx={cx} cy={cy} r={4} fill={color} />;
};

export default function RadarChart05() {
    return (
        <ChartContainer config={chartConfig} className="aspect-square h-72">
            <RadarChart data={chartData} outerRadius="72%">
                <PolarGrid gridType="polygon" />
                <PolarAngleAxis dataKey="skill" />
                <Radar
                    dataKey="mobile"
                    stroke="var(--color-mobile)"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    strokeWidth={1.5}
                    dot={makeSolidDot("var(--color-mobile)")}
                />
                <Radar
                    dataKey="desktop"
                    stroke="var(--color-desktop)"
                    fill="var(--color-desktop)"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                    dot={makeSolidDot("var(--color-desktop)")}
                />
                <ChartLegend content={<ChartLegendContent />} />
            </RadarChart>
        </ChartContainer>
    );
}
