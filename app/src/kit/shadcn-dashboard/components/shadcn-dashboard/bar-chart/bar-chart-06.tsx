'use client'

import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../../../../shadcn/ui/chart'

export const description = 'A bar chart with negative values'

const chartData = [
  { month: 'Jan', visitors: 186 },
  { month: 'Feb', visitors: 230 },
  { month: 'Mar', visitors: -207 },
  { month: 'Apr', visitors: 173 },
  { month: 'May', visitors: -209 },
  { month: 'Jun', visitors: 214 },
  { month: 'Jul', visitors: -180 },
  { month: 'Aug', visitors: 270 },
  { month: 'Sep', visitors: -160 },
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
} satisfies ChartConfig

export default function ChartBarNegativeCode() {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-72">
        <BarChart accessibilityLayer data={chartData} barSize={30}>
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel hideIndicator />}
          />
          <Bar barSize={30} dataKey='visitors'>
            <LabelList position='top' dataKey='month' fillOpacity={1} />
            {chartData.map((item) => (
              <Cell
                key={item.month}
                fill={
                  item.visitors > 0
                    ? 'var(--primary)'
                    : 'color-mix(in oklch, var(--primary) 20%, transparent)'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </>
  )
}
