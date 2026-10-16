'use client'

import { Bar, BarChart, CartesianGrid, XAxis, Rectangle } from 'recharts'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../../../../shadcn/ui/chart'

export const description = 'A stacked bar chart with a legend'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
  { month: 'July', desktop: 190, mobile: 175 },
  { month: 'August', desktop: 250, mobile: 145 },
  { month: 'September', desktop: 198, mobile: 160 },
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

const BarWithBorderTop = (props: any) => {
  const { x, y, width, height, fill } = props
  if (!width || !height) return null
  return (
    <g>
      <Rectangle {...props} />
      <line
        x1={x}
        y1={y}
        x2={x + width}
        y2={y}
        stroke="color-mix(in oklch, var(--primary) 60%, transparent)"
        strokeWidth={1}
      />
    </g>
  )
}

export default function ChartBarMixedCode() {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-80">
        <BarChart accessibilityLayer data={chartData} barSize={20}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey='desktop'
            stackId='a'
            fill='var(--primary)'
            radius={[0, 0, 0, 0]}
            barSize={30}
            shape={<BarWithBorderTop />}
          />
          <Bar
            dataKey='mobile'
            stackId='a'
            fill='color-mix(in oklch, var(--primary) 20%, transparent)'
            radius={[0, 0, 0, 0]}
            barSize={30}
            shape={<BarWithBorderTop />}
          />
        </BarChart>
      </ChartContainer>
    </>
  )
}
