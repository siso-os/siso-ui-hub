'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../../../../shadcn/ui/chart'

export const description = 'A linear area chart'

const chartData = [
  { month: 'January', desktop: 26 },
  { month: 'February', desktop: 35 },
  { month: 'March', desktop: 27 },
  { month: 'April', desktop: 20 },
  { month: 'May', desktop: 32 },
  { month: 'June', desktop: 20 },
]


const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export default function LinearCode() {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-80">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator='dot' hideLabel />}
          />
          <Area
            dataKey='desktop'
            type='linear'
            fill='var(--primary)'
            fillOpacity={0.1}
            stroke='var(--primary)'
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </>
  )
}
