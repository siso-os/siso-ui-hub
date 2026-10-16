'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../../shadcn/ui/chart'

export const description = 'A stacked area chart with expand stacking'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80, other: 45 },
  { month: 'February', desktop: 305, mobile: 200, other: 100 },
  { month: 'March', desktop: 237, mobile: 120, other: 150 },
  { month: 'April', desktop: 73, mobile: 190, other: 50 },
  { month: 'May', desktop: 209, mobile: 130, other: 100 },
  { month: 'June', desktop: 214, mobile: 140, other: 160 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'color-mix(in oklch, var(--primary) 10%, transparent)',
  },
  mobile: {
    label: 'Tablet',
    color: 'color-mix(in oklch, var(--primary) 20%, transparent)',
  },
  other: {
    label: 'Mobile',
    color: 'color-mix(in oklch, var(--primary) 40%, transparent)',
  },
} satisfies ChartConfig

export default function ChartAreaStackedExpandCode() {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-80">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
            top: 12,
          }}
          stackOffset='expand'>
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
            content={<ChartTooltipContent indicator='line' />}
          />
          <Area
            dataKey='other'
            type='natural'
            fill='var(--color-other)'
            stroke='var(--color-other)'
            stackId='a'
          />
          <Area
            dataKey='mobile'
            type='natural'
            fill='var(--color-mobile)'
            stroke='var(--color-mobile)'
            stackId='a'
          />
          <Area
            dataKey='desktop'
            type='natural'
            fill='var(--color-desktop)'
            stroke='var(--color-desktop)'
            stackId='a'
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </>
  )
}
