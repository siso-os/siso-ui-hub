"use client";

import { Line, LineChart, YAxis } from "recharts";
import { Card, CardContent } from "../../../../../shadcn/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../../../shadcn/ui/chart";

const sparklineData = [
  { v: 9 },
  { v: 26 },
  { v: 50 },
  { v: 30 },
  { v: 71 },
  { v: 51 },
  { v: 43 },
  { v: 69 },
];

const chartConfig = {
  v: { label: "Sales", color: "var(--foreground)" },
} satisfies ChartConfig;

export default function SalesTrendCard() {
  return (
    <div className="w-full max-w-lg ">
      <Card className="">
        <CardContent className="flex flex-col justify-center gap-4 h-full">
          <div className="flex flex-col">
            <p className="text-sm font-normal leading-5 text-muted-foreground">
              Total Sales
            </p>
            <p className="text-base font-semibold leading-6 text-card-foreground">
              Shadcn dashboard
            </p>
          </div>

          <div className="flex items-end gap-4">
            <div className="flex flex-col gap-1 shrink-0 max-w-fit sm:max-w-xs w-full">
              <p className="text-2xl font-semibold text-card-foreground leading-8 tracking-[-0.3px] whitespace-nowrap">
                $98,452.76
              </p>
              <div className="flex items-center gap-2 text-sm leading-5">
                <span className="text-emerald-600">+32.8%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </div>

            <div className="flex-1 min-w-0" style={{ height: 80 }}>
              <ChartContainer
                config={chartConfig}
                className="w-full! h-full! [aspect-ratio:unset]!"
              >
                <LineChart
                  data={sparklineData}
                  margin={{ top: 4, right: 2, bottom: 4, left: 2 }}
                >
                  <YAxis domain={[0, 80]} hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-v)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                    strokeLinecap="round"
                    activeDot={{ r: 4, fill: "var(--color-v)", strokeWidth: 0 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
