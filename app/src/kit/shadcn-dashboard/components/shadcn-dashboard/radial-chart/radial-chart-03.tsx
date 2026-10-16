"use client";

import { RadialBar, RadialBarChart } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../../../shadcn/ui/chart";

const gradients = [
    { id: "rc3-chrome",  startOpacity: 1.0, endOpacity: 0.5  },
    { id: "rc3-safari",  startOpacity: 0.8, endOpacity: 0.4  },
    { id: "rc3-firefox", startOpacity: 0.6, endOpacity: 0.3  },
    { id: "rc3-edge",    startOpacity: 0.4, endOpacity: 0.2  },
    { id: "rc3-other",   startOpacity: 0.2, endOpacity: 0.1  },
];

const chartData = [
    { browser: "chrome",  label: "Chrome",  visitors: 275, fill: "url(#rc3-chrome)"  },
    { browser: "safari",  label: "Safari",  visitors: 200, fill: "url(#rc3-safari)"  },
    { browser: "firefox", label: "Firefox", visitors: 187, fill: "url(#rc3-firefox)" },
    { browser: "edge",    label: "Edge",    visitors: 173, fill: "url(#rc3-edge)"    },
    { browser: "other",   label: "Other",   visitors: 90,  fill: "url(#rc3-other)"   },
];

const chartConfig = {
    visitors: { label: "Visitors" },
    chrome:   { label: "Chrome"  },
    safari:   { label: "Safari"  },
    firefox:  { label: "Firefox" },
    edge:     { label: "Edge"    },
    other:    { label: "Other"   },
} satisfies ChartConfig;

export default function RadialChart03() {
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
                    <defs>
                        {gradients.map((g) => (
                            <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%"   stopColor="#0A0A0A" stopOpacity={g.startOpacity} />
                                <stop offset="100%" stopColor="#0A0A0A" stopOpacity={g.endOpacity} />
                            </linearGradient>
                        ))}
                    </defs>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent nameKey="browser" hideLabel />}
                    />
                    <RadialBar
                        dataKey="visitors"
                        background={{ fill: "rgba(10, 10, 10, 0.05)" }}
                        cornerRadius={0}
                    />
                </RadialBarChart>
            </ChartContainer>

            {/* Legend */}
            <div className="flex gap-4 flex-wrap justify-center">
                {chartData.map((item, index) => (
                    <div key={item.browser} className="flex items-center gap-1.5">
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                                background: `rgba(10, 10, 10, ${(gradients[index].startOpacity + gradients[index].endOpacity) / 2})`,
                            }}
                        />
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
