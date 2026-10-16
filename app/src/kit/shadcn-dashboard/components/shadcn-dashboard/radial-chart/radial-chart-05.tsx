"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartConfig, ChartContainer } from "../../../../shadcn/ui/chart";

const score = 76;
const chartData = [{ name: "score", value: score, fill: "var(--primary)" }];

const chartConfig = {
    score: { label: "Performance" },
} satisfies ChartConfig;

export default function RadialChart05() {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="relative w-full">
                <div className="overflow-hidden h-36 w-full">
                    <ChartContainer config={chartConfig} className="aspect-square h-64">
                        <RadialBarChart
                            data={chartData}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={84}
                            outerRadius={110}
                        >
                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                tick={false}
                            />
                            <RadialBar
                                dataKey="value"
                                background={{ fill: "var(--muted)" }}
                                cornerRadius={0}
                            />
                        </RadialBarChart>
                    </ChartContainer>
                </div>

                {/* Center value label */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 pointer-events-none">
                    <span className="text-xs text-muted-foreground">Performance Score</span>
                    <span className="text-xl font-semibold text-foreground">{score}%</span>
                </div>
            </div>

            {/* Min / Max labels */}
            <div className="flex justify-between w-full px-6">
                <span className="text-xs text-muted-foreground">0%</span>
                <span className="text-xs text-muted-foreground">100%</span>
            </div>
        </div>
    );
}
