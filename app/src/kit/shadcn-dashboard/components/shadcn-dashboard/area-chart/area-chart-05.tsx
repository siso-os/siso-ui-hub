'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from '../../../../shadcn/ui/chart'

export const description = 'A step area chart with two series'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'color-mix(in oklch, var(--primary) 20%, transparent)',
  },
} satisfies ChartConfig

export default function ChartAreaStepCode() {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-80">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id='fillDesktopStep' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%'  stopColor='var(--primary)' stopOpacity={0.8} />
              <stop offset='95%' stopColor='var(--primary)' stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id='fillMobileStep' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%'  stopColor='color-mix(in oklch, var(--primary) 20%, transparent)' stopOpacity={0.8} />
              <stop offset='95%' stopColor='color-mix(in oklch, var(--primary) 20%, transparent)' stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey='mobile'
            type='step'
            fill='url(#fillMobileStep)'
            fillOpacity={0.4}
            stroke='color-mix(in oklch, var(--primary) 20%, transparent)'
            stackId='a'
            isAnimationActive={true}
            animationDuration={1200}
            animationEasing='ease-in-out'
          />
          <Area
            dataKey='desktop'
            type='step'
            fill='url(#fillDesktopStep)'
            fillOpacity={0.4}
            stroke='var(--primary)'
            stackId='a'
            isAnimationActive={true}
            animationDuration={1200}
            animationEasing='ease-in-out'
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </>
  )
}
