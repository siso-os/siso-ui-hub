"use client";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../../../shadcn/ui/chart";


const RadarChart01 = () => {
    const ChartData = [
        { month: "Jan", sales: 32, visits: 25, revenue: 36 },
        { month: "Feb", sales: 27, visits: 35, revenue: 30 },
        { month: "Mar", sales: 27, visits: 20, revenue: 30 },
        { month: "Apr", sales: 30, visits: 20, revenue: 35 },
        { month: "May", sales: 25, visits: 20, revenue: 30 },
        { month: "Jun", sales: 25, visits: 20, revenue: 30 },
    ];

    const chartConfig = {
        revenue: {
            label: "Revenue",
            color: "color-mix(in srgb, var(--primary) 50%, transparent)",
        },

        sales: {
            label: "Sales",
            color: "color-mix(in srgb, var(--primary) 10%, transparent)",
        },
        visits: {
            label: "Visits",
            color: "color-mix(in srgb, var(--primary) 5%, transparent)",
        },
    } satisfies ChartConfig;

    return (
        <>
            <ChartContainer className="h-72" config={chartConfig}>
                <RadarChart data={ChartData} >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="month" />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />

                    <Radar
                        name="Revenue"
                        dataKey="revenue"
                        stroke="color-mix(in srgb, var(--primary) 20%, transparent)"
                        fill="color-mix(in srgb, var(--primary) 5%, transparent)"
                    />

                    <Radar
                        name="Sales"
                        dataKey="sales"
                        stroke="color-mix(in srgb, var(--primary) 50%, transparent)"
                        fill="color-mix(in srgb, var(--primary) 10%, transparent)"
                    />

                    <Radar
                        name="Visits"
                        dataKey="visits"
                        stroke="var(--primary)"
                        fill="color-mix(in srgb, var(--primary) 50%, transparent)"
                    />
                </RadarChart>
            </ChartContainer>

        </>
    );
};

export default RadarChart01;
