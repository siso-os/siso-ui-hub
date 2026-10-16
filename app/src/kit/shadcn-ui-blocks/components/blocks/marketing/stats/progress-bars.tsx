import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../../ui/tabs';
import { cn } from '@/arc-shims/kit-utils';
import { useState } from 'react';

type ProgressCategory = 'performance' | 'satisfaction' | 'engagement';

type ProgressData = {
  id: string;
  name: string;
  value: number;
  target: number;
  change: number;
  info: string;
};

type ProgressDataRecord = {
  [key in ProgressCategory]: ProgressData[];
};

export default function ProgressBars() {
  const [category, setCategory] = useState<ProgressCategory>('performance');

  // Sample data for progress bars
  const progressData: ProgressDataRecord = {
    performance: [
      {
        id: 'page-speed',
        name: 'Page Speed Score',
        value: 87,
        target: 95,
        change: 12,
        info: 'Avg. page load time: 1.7s',
      },
      {
        id: 'api-response',
        name: 'API Response Time',
        value: 92,
        target: 99,
        change: 8,
        info: 'Avg. response: 120ms',
      },
      {
        id: 'error-rate',
        name: 'Error Rate',
        value: 96,
        target: 99,
        change: 4,
        info: 'Down from 8% last month',
      },
      {
        id: 'uptime',
        name: 'Service Uptime',
        value: 99.94,
        target: 99.99,
        change: 0.04,
        info: 'Monthly availability',
      },
      {
        id: 'ci-cd',
        name: 'CI/CD Success Rate',
        value: 91,
        target: 100,
        change: 7,
        info: 'Build/deploy success rate',
      },
    ],
    satisfaction: [
      {
        id: 'nps',
        name: 'Net Promoter Score',
        value: 72,
        target: 80,
        change: 14,
        info: 'Industry avg: 65',
      },
      {
        id: 'csat',
        name: 'Customer Satisfaction',
        value: 88,
        target: 95,
        change: 6,
        info: 'Based on post-purchase surveys',
      },
      {
        id: 'frt',
        name: 'First Response Time',
        value: 79,
        target: 90,
        change: 11,
        info: 'Avg. response: 2.4 hours',
      },
      {
        id: 'resolution',
        name: 'Resolution Rate',
        value: 93,
        target: 98,
        change: 5,
        info: 'Issues resolved first contact',
      },
      {
        id: 'reviews',
        name: 'Positive Reviews',
        value: 81,
        target: 90,
        change: 3,
        info: 'Across major platforms',
      },
    ],
    engagement: [
      {
        id: 'active-users',
        name: 'Daily Active Users',
        value: 84,
        target: 90,
        change: 17,
        info: '% of monthly users active daily',
      },
      {
        id: 'session-duration',
        name: 'Avg. Session Duration',
        value: 76,
        target: 85,
        change: 9,
        info: 'Current: 4.2 minutes',
      },
      {
        id: 'retention',
        name: '30-Day Retention',
        value: 68,
        target: 80,
        change: 12,
        info: 'Users returning after 30 days',
      },
      {
        id: 'feature-adoption',
        name: 'Feature Adoption',
        value: 65,
        target: 85,
        change: 15,
        info: 'Premium features usage',
      },
      {
        id: 'conversion',
        name: 'Trial Conversion',
        value: 58,
        target: 70,
        change: 18,
        info: 'Free to paid conversion',
      },
    ],
  };

  const categories = [
    { id: 'performance' as ProgressCategory, name: 'Performance' },
    { id: 'satisfaction' as ProgressCategory, name: 'Satisfaction' },
    { id: 'engagement' as ProgressCategory, name: 'Engagement' },
  ];

  // Helper to get color based on performance relative to target
  const getProgressColor = (current: number, target: number): string => {
    const ratio = current / target;
    if (ratio >= 0.9) return 'bg-emerald-500 dark:bg-emerald-500';
    if (ratio >= 0.7) return 'bg-amber-500 dark:bg-amber-500';
    return 'bg-rose-500 dark:bg-rose-500';
  };

  // Calculate average for current category
  const categoryAverage = Math.round(
    progressData[category].reduce((sum, item) => sum + item.value, 0) /
      progressData[category].length
  );

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge className="mb-2">Metrics</Badge>
          <h2 className="text-3xl font-bold md:text-4xl">
            Performance Dashboard
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
            Track our progress toward key business objectives
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <Tabs
            defaultValue="performance"
            value={category}
            onValueChange={(value) => setCategory(value as ProgressCategory)}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-3">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Summary Card */}
          <Card className="border pt-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    {categories.find((c) => c.id === category)?.name} Metrics
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Current progress toward targets
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{categoryAverage}%</div>
                  <div className="text-muted-foreground text-sm">
                    Category Average
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-6">
                {progressData[category].map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-muted-foreground text-xs">
                          {item.info}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">{item.value}%</span>
                          <span className="text-muted-foreground text-xs">
                            / {item.target}%
                          </span>
                          <span
                            className={cn(
                              'ml-2 inline-flex items-center text-xs font-medium',
                              item.change > 0
                                ? 'text-emerald-500'
                                : 'text-rose-500'
                            )}
                          >
                            {item.change > 0 ? '+' : ''}
                            {item.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          getProgressColor(item.value, item.target)
                        )}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional summary info */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border pt-0 shadow-sm">
              <CardContent className="pt-6">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Overall Progress
                </h4>
                <div className="mt-2 flex items-baseline">
                  <span className="mr-2 text-2xl font-bold">78%</span>
                  <span className="text-sm text-emerald-500">↑ 9%</span>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  Across all categories
                </p>
              </CardContent>
            </Card>
            <Card className="border pt-0 shadow-sm">
              <CardContent className="pt-6">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Highest Growth
                </h4>
                <div className="mt-2 flex items-baseline">
                  <span className="mr-2 text-2xl font-bold">Active Users</span>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  Improved by 17% this quarter
                </p>
              </CardContent>
            </Card>
            <Card className="border pt-0 shadow-sm">
              <CardContent className="pt-6">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Needs Attention
                </h4>
                <div className="mt-2 flex items-baseline">
                  <span className="mr-2 text-2xl font-bold">
                    Trial Conversion
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  Currently at 58% of target
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
