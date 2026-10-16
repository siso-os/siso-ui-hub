"use client";
import { useState } from "react";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../../../../shadcn/ui/chart";
import { Bar, ComposedChart, Line, XAxis, YAxis } from "recharts";


export default function ChartAreaGradientCode({ className }: { className?: string }) {
  const dropdownItems = ["2026", "2025"];
  const [selectedYear, setSelectedYear] = useState(dropdownItems[0]);

  const statsData: Record<
    string,
    {
      total: string;
      percent: string;
      online: string;
      onlinePercent: string;
      offline: string;
      offlinePercent: string;
      isOfflinePositive: boolean;
      series: { name: string; type: string; data: number[] }[];
    }
  > = {
    "2026": {
      total: "$12,150.00",
      percent: "+22%",
      online: "$8,450.00",
      onlinePercent: "+10%",
      offline: "$3,700.00",
      offlinePercent: "-5%",
      isOfflinePositive: false,
      series: [
        {
          name: "Online store",
          type: "column",
          data: [
            71, 71, 43, 72, 71, 82, 108, 108, 144, 142, 126, 108, 93, 79, 79,
            79, 64, 98, 102, 125, 137, 137, 102, 102, 74,
          ],
        },
        {
          name: "Offline store",
          type: "line",
          data: [
            71, 71, 43, 72, 71, 82, 108, 108, 144, 142, 126, 108, 93, 79, 79,
            79, 64, 98, 102, 125, 137, 137, 102, 102, 74,
          ],
        },
      ],
    },
    "2025": {
      total: "$10,240.00",
      percent: "+18%",
      online: "$7,120.00",
      onlinePercent: "+12%",
      offline: "$3,120.00",
      offlinePercent: "+5%",
      isOfflinePositive: true,
      series: [
        {
          name: "Online store",
          type: "column",
          data: [
            50, 60, 30, 55, 65, 70, 90, 85, 120, 110, 100, 95, 80, 70, 65, 60,
            55, 80, 95, 110, 120, 115, 90, 85, 70,
          ],
        },
        {
          name: "Offline store",
          type: "line",
          data: [
            40, 50, 25, 45, 55, 60, 80, 75, 110, 100, 90, 85, 70, 60, 55, 50,
            45, 70, 85, 100, 110, 105, 80, 75, 60,
          ],
        },
      ],
    },
  };

  const xCategories = [
    "",
    "Jan",
    "",
    "",
    "Feb",
    "",
    "",
    "Mar",
    "",
    "",
    "Apr",
    "",
    "",
    "May",
    "",
    "",
    "Jun",
    "",
    "",
    "Jul",
    "",
    "",
    "Aug",
    "",
    "",
  ];

  const currentData = statsData[selectedYear] || statsData["2026"];

  // Prepare Recharts data keeping same 25 points
  const chartData = xCategories.map((month, i) => ({
    month: month || "",
    online: currentData.series[0].data[i],
    offline: currentData.series[1].data[i],
  }));

  return (
    <div className="h-80">
      <ChartContainer
        className="h-full w-full"
        config={{
          online: {
            label: "Online store",
            color: "var(--primary)",
          },
          offline: {
            label: "Offline store",
            color: "var(--primary)",
          },
        }}
      >
        <ComposedChart
          data={chartData}
          barCategoryGap={0}
          margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
        >
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            interval={0}
            tickMargin={8}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <YAxis hide />

          <Bar
            dataKey="online"
            fill="color-mix(in oklch, var(--primary) 10%, transparent)"
          />
          <Line
            type="linear"
            dataKey="offline"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={false}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
