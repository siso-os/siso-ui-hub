"use client";

import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../../../../shadcn/ui/chart";
import { ChartLine, Rocket } from "lucide-react";

const chartData = [
    { month: "Jan", Desktop: 2200 },
    { month: "Feb", Desktop: 2500 },
    { month: "Mar", Desktop: 4000 },
    { month: "Apr", Desktop: 2500 },
    { month: "May", Desktop: 5500 },
    { month: "Jun", Desktop: 3500 },
    { month: "Jul", Desktop: 2500 },
    { month: "Aug", Desktop: 3500 },
    { month: "Sep", Desktop: 4800 },
];

const chartConfig = {
    Desktop: { label: "Desktop", color: "var(--color-primary)" },
} satisfies ChartConfig;

const markers = [
    { month: "Mar", icon: Rocket },
    { month: "May", icon: ChartLine },
];

import type { LucideIcon } from "lucide-react";

const MarkerLabel = ({ viewBox, Icon }: { viewBox?: { x: number; y: number }; Icon: LucideIcon }) => {
    if (!viewBox) return null;
    const { x, y } = viewBox;
    const size = 30;
    const rectX = x - size / 2;
    const rectY = y - size - 8;

    return (
        <g>
            <rect
                x={rectX}
                y={rectY}
                width={size}
                height={size}
                rx={6}
                ry={6}
                fill="var(--background)"
            />
            <foreignObject x={rectX} y={rectY} width={size} height={size}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: size, height: size }}>
                    <Icon size={16} />
                </div>
            </foreignObject>
        </g>
    );
};

const ChartLine02 = () => {
    return (
        <ChartContainer config={chartConfig} className="h-72">
            <LineChart
                data={chartData}
                accessibilityLayer
                margin={{ left: 20, right: 20, top: 60, bottom: 0 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    interval={0}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {markers.map((marker) => (
                    <ReferenceLine
                        key={marker.month}
                        x={marker.month}
                        stroke="var(--border)"
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                        label={(props: Record<string, unknown>) => <MarkerLabel {...props} viewBox={props.viewBox as { x: number; y: number }} Icon={marker.icon} />}
                    />
                ))}
                <Line
                    type="monotone"
                    dataKey="Desktop"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    );
};

export default ChartLine02;
