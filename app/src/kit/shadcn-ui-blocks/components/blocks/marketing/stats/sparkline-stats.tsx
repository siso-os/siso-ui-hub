import { Badge } from '../../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { cn } from '@/arc-shims/kit-utils';
import { useState } from 'react';

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'quarterly';

type SparklineData = {
  id: string;
  name: string;
  value: string;
  secondaryValue: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  sparklineData: number[];
};

type SparklineStats = {
  [key in TimeRange]: SparklineData[];
};

export default function SparklineStats() {
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');

  // Sample data for different time ranges
  const stats: SparklineStats = {
    daily: [
      {
        id: 'visitors',
        name: 'Unique Visitors',
        value: '8,492',
        secondaryValue: '+1,204',
        change: 16.5,
        trend: 'up',
        sparklineData: [32, 38, 28, 43, 36, 42, 39, 37, 41, 38, 42, 48, 52, 47],
      },
      {
        id: 'page-views',
        name: 'Page Views',
        value: '32,591',
        secondaryValue: '+4,882',
        change: 17.6,
        trend: 'up',
        sparklineData: [
          142, 128, 132, 156, 148, 163, 157, 152, 166, 171, 168, 182, 190, 196,
        ],
      },
      {
        id: 'bounce-rate',
        name: 'Bounce Rate',
        value: '36.4%',
        secondaryValue: '-2.3%',
        change: -5.9,
        trend: 'down',
        sparklineData: [42, 40, 41, 39, 38, 40, 37, 36, 35, 38, 37, 34, 36, 35],
      },
      {
        id: 'orders',
        name: 'Orders',
        value: '284',
        secondaryValue: '+42',
        change: 17.4,
        trend: 'up',
        sparklineData: [18, 22, 19, 24, 21, 20, 25, 18, 24, 22, 26, 28, 27, 32],
      },
    ],
    weekly: [
      {
        id: 'visitors',
        name: 'Unique Visitors',
        value: '52,846',
        secondaryValue: '+8,294',
        change: 18.6,
        trend: 'up',
        sparklineData: [321, 384, 428, 461, 423, 462, 478, 512],
      },
      {
        id: 'page-views',
        name: 'Page Views',
        value: '198,432',
        secondaryValue: '+24,781',
        change: 14.3,
        trend: 'up',
        sparklineData: [1428, 1562, 1679, 1781, 1823, 1942, 2018, 2156],
      },
      {
        id: 'bounce-rate',
        name: 'Bounce Rate',
        value: '38.2%',
        secondaryValue: '-1.7%',
        change: -4.3,
        trend: 'down',
        sparklineData: [42, 41, 40, 39, 38, 37, 37, 36],
      },
      {
        id: 'orders',
        name: 'Orders',
        value: '1,784',
        secondaryValue: '+286',
        change: 19.1,
        trend: 'up',
        sparklineData: [176, 186, 204, 211, 234, 242, 262, 281],
      },
    ],
    monthly: [
      {
        id: 'visitors',
        name: 'Unique Visitors',
        value: '214,283',
        secondaryValue: '+32,941',
        change: 18.2,
        trend: 'up',
        sparklineData: [
          14283, 16421, 18642, 19846, 21256, 23841, 25174, 27428, 29152, 30841,
          32145, 35462,
        ],
      },
      {
        id: 'page-views',
        name: 'Page Views',
        value: '842,156',
        secondaryValue: '+72,184',
        change: 9.4,
        trend: 'up',
        sparklineData: [
          64215, 68420, 70156, 72841, 75621, 79421, 82156, 85214, 87951, 89214,
          92451, 96214,
        ],
      },
      {
        id: 'bounce-rate',
        name: 'Bounce Rate',
        value: '41.2%',
        secondaryValue: '-3.8%',
        change: -8.4,
        trend: 'down',
        sparklineData: [48, 47, 46, 46, 45, 44, 44, 43, 42, 42, 41, 40],
      },
      {
        id: 'orders',
        name: 'Orders',
        value: '7,842',
        secondaryValue: '+1,241',
        change: 18.8,
        trend: 'up',
        sparklineData: [
          524, 584, 612, 645, 687, 721, 764, 802, 852, 894, 932, 984,
        ],
      },
    ],
    quarterly: [
      {
        id: 'visitors',
        name: 'Unique Visitors',
        value: '643,294',
        secondaryValue: '+89,214',
        change: 16.1,
        trend: 'up',
        sparklineData: [154283, 182846, 214283, 246512],
      },
      {
        id: 'page-views',
        name: 'Page Views',
        value: '2,471,582',
        secondaryValue: '+210,452',
        change: 9.3,
        trend: 'up',
        sparklineData: [582416, 624185, 742156, 824582],
      },
      {
        id: 'bounce-rate',
        name: 'Bounce Rate',
        value: '43.7%',
        secondaryValue: '-5.2%',
        change: -10.6,
        trend: 'down',
        sparklineData: [52, 49, 47, 44],
      },
      {
        id: 'orders',
        name: 'Orders',
        value: '23,485',
        secondaryValue: '+3,624',
        change: 18.2,
        trend: 'up',
        sparklineData: [4856, 5742, 6254, 7412],
      },
    ],
  };

  // Function to normalize sparkline data for rendering
  const normalizeSparklineData = (data: number[]) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    if (range === 0) return data.map(() => 50); // Handle flat data

    // Normalize to 0-100 range for SVG path
    return data.map((value) => Math.round(((value - min) / range) * 100));
  };

  // Create SVG path for sparkline
  const createSparklinePath = (data: number[]) => {
    if (data.length < 2) return '';

    const normalizedData = normalizeSparklineData(data);
    const height = 40; // SVG height
    const width = 120; // SVG width
    const points = normalizedData.map((value, index) => {
      const x = (index / (normalizedData.length - 1)) * width;
      const y = height - (value / 100) * height;
      return `${x},${y}`;
    });

    // Start from the bottom left for fill effect
    return `M0,${height} ${points
      .map((point) => `L${point}`)
      .join(' ')} L${width},${height} Z`;
  };

  // Get appropriate color for trend
  const getTrendColor = (
    trend: 'up' | 'down' | 'neutral',
    negative: boolean = false
  ) => {
    if (trend === 'up') {
      return negative
        ? 'text-rose-500 fill-rose-100 dark:fill-rose-950'
        : 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950';
    } else if (trend === 'down') {
      return negative
        ? 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950'
        : 'text-rose-500 fill-rose-100 dark:fill-rose-950';
    }
    return 'text-gray-500 fill-gray-100 dark:fill-gray-900';
  };

  // Bounce rate is inverted (down is good)
  const isInverseMetric = (id: string) => {
    return ['bounce-rate'].includes(id);
  };

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Badge className="mb-2">Analytics</Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Performance Trends</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
            Track how our key metrics are trending over time
          </p>
        </div>

        {/* Time Range Selector - Tabs for md+ screens */}
        <div className="mb-10 flex justify-center">
          {/* Tabs for md+ screens */}
          <div className="bg-card hidden overflow-hidden rounded-lg border p-1 md:inline-flex">
            {(['daily', 'weekly', 'monthly', 'quarterly'] as TimeRange[]).map(
              (range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    timeRange === range
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Dropdown for small screens */}
          <div className="w-full max-w-xs md:hidden">
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value as TimeRange)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time range">
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {(
                  ['daily', 'weekly', 'monthly', 'quarterly'] as TimeRange[]
                ).map((range) => (
                  <SelectItem key={range} value={range}>
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sparkline Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats[timeRange].map((stat) => {
            const inverse = isInverseMetric(stat.id);
            return (
              <Card key={stat.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">
                    {stat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-1 flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div
                      className={cn(
                        'text-sm font-medium',
                        getTrendColor(stat.trend, inverse)
                      )}
                    >
                      {stat.secondaryValue}
                    </div>
                  </div>

                  <div className="text-muted-foreground mb-4 text-xs">
                    <span className={cn(getTrendColor(stat.trend, inverse))}>
                      {stat.trend === 'up' ? '↑' : '↓'} {Math.abs(stat.change)}%
                    </span>
                    {' vs '}
                    {timeRange === 'daily' && 'yesterday'}
                    {timeRange === 'weekly' && 'last week'}
                    {timeRange === 'monthly' && 'last month'}
                    {timeRange === 'quarterly' && 'last quarter'}
                  </div>

                  {/* Sparkline */}
                  <div className="h-10 w-full">
                    <svg
                      width="100%"
                      height="40"
                      viewBox="0 0 120 40"
                      preserveAspectRatio="none"
                      className="overflow-visible"
                    >
                      <path
                        d={createSparklinePath(stat.sparklineData)}
                        className={cn(
                          'fill-current stroke-current stroke-2 opacity-10',
                          getTrendColor(stat.trend, inverse)
                        )}
                      />
                      <path
                        d={
                          createSparklinePath(stat.sparklineData).split(' Z')[0]
                        }
                        className={cn(
                          'fill-none stroke-current stroke-2',
                          getTrendColor(stat.trend, inverse)
                        )}
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
