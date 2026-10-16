'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '../../../../shadcn/ui/chart'

export const description = 'A multiple bar chart'

const chartData = [
  { date: "Jan", group1: 28000, group2: 25000, group3: 15000, group4: 10000, group5: 8000 },
  { date: "Feb", group1: 35000, group2: 30000, group3: 22000, group4: 18000, group5: 14000 },
  { date: "Mar", group1: 32000, group2: 28000, group3: 24000, group4: 16000, group5: 12000 },
  { date: "Apr", group1: 22000, group2: 18000, group3: 14000, group4: 12000, group5: 10000 },
  { date: "May", group1: 26000, group2: 22000, group3: 16000, group4: 14000, group5: 11000 },
  { date: "Jun", group1: 28000, group2: 24000, group3: 20000, group4: 18000, group5: 15000 },
  { date: "Jul", group1: 30000, group2: 26000, group3: 22000, group4: 18000, group5: 14000 },
]

const chartConfig = {
  group1: { label: 'Group 1', color: 'var(--primary)' },
  group2: { label: 'Group 2', color: 'color-mix(in oklch, var(--primary) 80%, transparent)' },
  group3: { label: 'Group 3', color: 'color-mix(in oklch, var(--primary) 60%, transparent)' },
  group4: { label: 'Group 4', color: 'color-mix(in oklch, var(--primary) 40%, transparent)' },
  group5: { label: 'Group 5', color: 'color-mix(in oklch, var(--primary) 20%, transparent)' },
} satisfies ChartConfig

interface SegBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

function SegmentedBar({ x = 0, y = 0, width = 0, height = 0, fill }: SegBarProps) {
  if (!height || height <= 0 || !width || width <= 0) return null;
  const segH = 4;
  const gap = 4;
  const period = segH + gap;
  const count = Math.floor(height / period);
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => (
        <rect
          key={i}
          x={x}
          y={y + height - segH - i * period}
          width={width}
          height={segH}
          fill={fill}
          rx={0}
          ry={0}
        />
      ))}
    </g>
  );
}

export default function ChartBarInteractiveCode() {

  return (
    <>
      <ChartContainer config={chartConfig} className="h-64! max-w-2xl w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 4, right: 0, left: -8, bottom: 0 }}
          barSize={12}
          barGap={2}
          barCategoryGap="20%"
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
            domain={[0, 40000]}
            ticks={[0, 10000, 20000, 30000, 40000]}
            width={32}
          />
          <ChartTooltip
            cursor={{
              stroke: "var(--border)",
              strokeWidth: 1,
              strokeDasharray: "4 4",
              fill: "transparent",
            }}
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="group1"
            fill="var(--color-group1)"
            shape={(props: SegBarProps) => <SegmentedBar {...props} />}
            radius={0}
            isAnimationActive
            animationBegin={0}
            animationDuration={700}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="group2"
            fill="var(--color-group2)"
            shape={(props: SegBarProps) => <SegmentedBar {...props} />}
            radius={0}
            isAnimationActive
            animationBegin={80}
            animationDuration={700}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="group3"
            fill="var(--color-group3)"
            shape={(props: SegBarProps) => <SegmentedBar {...props} />}
            radius={0}
            isAnimationActive
            animationBegin={160}
            animationDuration={700}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="group4"
            fill="var(--color-group4)"
            shape={(props: SegBarProps) => <SegmentedBar {...props} />}
            radius={0}
            isAnimationActive
            animationBegin={240}
            animationDuration={700}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="group5"
            fill="var(--color-group5)"
            shape={(props: SegBarProps) => <SegmentedBar {...props} />}
            radius={0}
            isAnimationActive
            animationBegin={320}
            animationDuration={700}
            animationEasing="ease-out"
          />
        </BarChart>
      </ChartContainer>
    </>
  )
}
