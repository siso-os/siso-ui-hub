"use client"

import { Area, AreaChart, Bar, BarChart, Line, LineChart } from "recharts"

import { type ChartConfig, ChartContainer } from "../../../shadcn/ui/chart"
import { cn } from "@/arc-shims/kit-utils"

const sparklineConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type SparklineProps = {
  data: number[]
  type?: "line" | "bar" | "area"
  className?: string
}

function Sparkline({ data, type = "line", className }: SparklineProps) {
  const points = data.map((value, index) => ({ index, value }))

  return (
    <ChartContainer
      config={sparklineConfig}
      className={cn("aspect-auto h-10 w-24", className)}
    >
      {type === "bar" ? (
        <BarChart data={points}>
          <Bar dataKey="value" fill="var(--color-value)" radius={2} />
        </BarChart>
      ) : type === "area" ? (
        <AreaChart data={points}>
          <Area
            dataKey="value"
            fill="var(--color-value)"
            stroke="var(--color-value)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      ) : (
        <LineChart data={points}>
          <Line
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      )}
    </ChartContainer>
  )
}

export { Sparkline }
