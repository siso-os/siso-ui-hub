"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../shadcn/ui/chart";

const chartData = [
  { browser: "Chrome",  visitors: 275 },
  { browser: "Safari",  visitors: 200 },
  { browser: "Firefox", visitors: 187 },
  { browser: "Edge",    visitors: 173 },
  { browser: "Other",   visitors: 90  },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  Chrome:   { label: "Chrome"  },
  Safari:   { label: "Safari"  },
  Firefox:  { label: "Firefox" },
  Edge:     { label: "Edge"    },
  Other:    { label: "Other"   },
} satisfies ChartConfig;

function HorizontalSegmentedBar(props: any) {
  const { x, y, width, height } = props;
  if (!width || width <= 0) return null;

  const blockW = 4;
  const gap = 4;
  const pitch = blockW + gap;
  const numBlocks = Math.floor(width / pitch);

  return (
    <g>
      {Array.from({ length: numBlocks }).map((_, i) => (
        <rect
          key={i}
          x={x + i * pitch}
          y={y}
          width={blockW}
          height={height}
          fill="var(--primary)"
          rx={1}
        />
      ))}
    </g>
  );
}

export default function ChartBarHorizontalCode() {
  return (
    <ChartContainer config={chartConfig} className="h-56">
      <BarChart
        data={chartData}
        layout="vertical"
        barSize={16}
        barCategoryGap="30%"
        margin={{ top: 4, right: 16, bottom: 4, left: 10 }}
      >
        <YAxis
          dataKey="browser"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={52}
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
        />
        <XAxis dataKey="visitors" type="number" hide domain={[0, 300]} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="visitors"
          shape={(props: any) => <HorizontalSegmentedBar {...props} />}
          isAnimationActive
          animationBegin={0}
          animationDuration={700}
          animationEasing="ease-out"
        />
      </BarChart>
    </ChartContainer>
  );
}
