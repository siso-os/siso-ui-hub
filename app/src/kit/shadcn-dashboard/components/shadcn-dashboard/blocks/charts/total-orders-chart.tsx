"use client";

import { Card, CardContent, CardHeader } from "../../../../../shadcn/ui/card";
import { Badge } from "../../../../../shadcn/ui/badge";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../../shadcn/ui/chart";

function TotalOrdersCode() {
  const chartData = [
    { month: "1", salesA: 110, salesB: 60 },
    { month: "2", salesA: 120, salesB: 90 },
    { month: "3", salesA: 119, salesB: 80 },
    { month: "4", salesA: 139, salesB: 70 },
    { month: "5", salesA: 149, salesB: 100 },
    { month: "6", salesA: 170, salesB: 80 },
    { month: "7", salesA: 200, salesB: 150 },
    { month: "8", salesA: 190, salesB: 130 },
    { month: "9", salesA: 170, salesB: 130 },
    { month: "10", salesA: 165, salesB: 110 },
  ];

  const chartConfig = {
    salesA: {
      label: "salesA",
      color: "var(--color-primary)",
    },
    salesB: {
      label: "salesB",
      color: "var(--color-primary)",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full max-w-lg ">
      <Card className="">
        <CardContent className="flex flex-col gap-4  sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-normal text-muted-foreground">
              Total sales
            </p>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-2xl font-semibold">$45,320.75</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm font-normal text-muted-foreground">
                  -$1,470
                </p>
                <Badge className="bg-chart-2/10 text-chart-2">-18%</Badge>
              </div>
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className="h-20 w-full min-w-0 sm:max-w-50"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              barGap={-6}
            
            >
              <XAxis dataKey="month" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="salesA"
                fill="var(--color-salesA)"
                opacity={0.4}
                radius={[10, 10, 10, 10]}
                barSize={6}
              />
              <Bar
                dataKey="salesB"
                fill="var(--color-salesA)"
                radius={[10, 10, 10, 10]}
                barSize={6}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default TotalOrdersCode;
