import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';

export default function TimelineStats() {
  // Data for different time periods
  const periods = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' },
  ];

  // Stats data organized by time period
  const statsByPeriod = {
    weekly: [
      {
        label: 'New Sign-ups',
        value: '1,284',
        change: 12.3,
        trend: 'up',
        previousLabel: 'Previous week',
      },
      {
        label: 'Active Sessions',
        value: '32,891',
        change: 8.7,
        trend: 'up',
        previousLabel: 'Previous week',
      },
      {
        label: 'Conversion Rate',
        value: '5.2%',
        change: 0.8,
        trend: 'up',
        previousLabel: 'Previous week',
      },
      {
        label: 'Support Tickets',
        value: '187',
        change: -5.3,
        trend: 'down',
        previousLabel: 'Previous week',
        inversePositive: true, // Lower is better
      },
    ],
    monthly: [
      {
        label: 'New Sign-ups',
        value: '5,726',
        change: 15.8,
        trend: 'up',
        previousLabel: 'Previous month',
      },
      {
        label: 'Active Sessions',
        value: '142,308',
        change: 11.2,
        trend: 'up',
        previousLabel: 'Previous month',
      },
      {
        label: 'Conversion Rate',
        value: '6.7%',
        change: 1.4,
        trend: 'up',
        previousLabel: 'Previous month',
      },
      {
        label: 'Support Tickets',
        value: '834',
        change: -3.1,
        trend: 'down',
        previousLabel: 'Previous month',
        inversePositive: true,
      },
    ],
    quarterly: [
      {
        label: 'New Sign-ups',
        value: '18,492',
        change: 32.1,
        trend: 'up',
        previousLabel: 'Previous quarter',
      },
      {
        label: 'Active Sessions',
        value: '487,125',
        change: 24.3,
        trend: 'up',
        previousLabel: 'Previous quarter',
      },
      {
        label: 'Conversion Rate',
        value: '8.3%',
        change: 2.1,
        trend: 'up',
        previousLabel: 'Previous quarter',
      },
      {
        label: 'Support Tickets',
        value: '2,874',
        change: -8.5,
        trend: 'down',
        previousLabel: 'Previous quarter',
        inversePositive: true,
      },
    ],
    yearly: [
      {
        label: 'New Sign-ups',
        value: '76,542',
        change: 65.4,
        trend: 'up',
        previousLabel: 'Previous year',
      },
      {
        label: 'Active Sessions',
        value: '2.1M',
        change: 48.7,
        trend: 'up',
        previousLabel: 'Previous year',
      },
      {
        label: 'Conversion Rate',
        value: '9.2%',
        change: 3.5,
        trend: 'up',
        previousLabel: 'Previous year',
      },
      {
        label: 'Support Tickets',
        value: '12,458',
        change: -12.3,
        trend: 'down',
        previousLabel: 'Previous year',
        inversePositive: true,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2 text-center">
            <Badge className="mb-2">Performance Timeline</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Growth Progression
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Track our key metrics over different time periods to see our
              consistent growth and improvements
            </p>
          </div>

          <Tabs defaultValue="monthly" className="mt-8 w-full">
            <div className="mb-8 flex justify-center">
              <TabsList>
                {periods.map((period) => (
                  <TabsTrigger key={period.id} value={period.id}>
                    {period.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {periods.map((period) => (
              <TabsContent key={period.id} value={period.id} className="mt-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {statsByPeriod[period.id as keyof typeof statsByPeriod].map(
                    (stat, index) => (
                      <div
                        key={index}
                        className="bg-card rounded-lg border p-6 transition-shadow hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-lg font-medium">{stat.label}</p>
                          <div className="flex items-center">
                            <Clock className="text-muted-foreground mr-1 h-4 w-4" />
                            <span className="text-muted-foreground text-xs">
                              {period.label}
                            </span>
                          </div>
                        </div>

                        <h3 className="mt-4 text-3xl font-bold">
                          {stat.value}
                        </h3>

                        <div className="mt-2 flex items-center">
                          <div
                            className={cn(
                              'flex items-center rounded-full px-2 py-1 text-xs font-medium',
                              (stat.trend === 'up' && !stat.inversePositive) ||
                                (stat.trend === 'down' && stat.inversePositive)
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                                : 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                            )}
                          >
                            {stat.trend === 'up' ? (
                              <ArrowUpRight className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(stat.change)}%
                          </div>
                          <p className="text-muted-foreground ml-2 text-sm">
                            vs {stat.previousLabel}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
