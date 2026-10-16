import { Badge } from '../../../ui/badge';
import { Card, CardContent, CardFooter } from '../../../ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../ui/tooltip';
import { cn } from '@/arc-shims/kit-utils';
import {
  ArrowDownRight,
  ArrowUpRight,
  HelpCircle,
  InfoIcon,
} from 'lucide-react';

type Metric = {
  id: string;
  name: string;
  value: string;
  rawValue: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  status: 'good' | 'warning' | 'critical';
  period: string;
  description: string;
};

export default function MetricCards() {
  // Sample data for metrics
  const metrics: Metric[] = [
    {
      id: 'revenue',
      name: 'Monthly Revenue',
      value: '$48,283',
      rawValue: 48283,
      change: 12.6,
      trend: 'up',
      status: 'good',
      period: 'vs. last month',
      description:
        'Total revenue generated during the current month from all products and services.',
    },
    {
      id: 'new-users',
      name: 'New Users',
      value: '2,741',
      rawValue: 2741,
      change: 8.3,
      trend: 'up',
      status: 'good',
      period: 'vs. last month',
      description: 'Number of new user registrations within the past 30 days.',
    },
    {
      id: 'conversion',
      name: 'Conversion Rate',
      value: '3.6%',
      rawValue: 3.6,
      change: -0.8,
      trend: 'down',
      status: 'warning',
      period: 'vs. last month',
      description:
        'Percentage of visitors who completed a desired action (signup, purchase, etc).',
    },
    {
      id: 'churn',
      name: 'Monthly Churn',
      value: '1.2%',
      rawValue: 1.2,
      change: -0.3,
      trend: 'down',
      status: 'good',
      period: 'vs. last month',
      description:
        'Percentage of subscribers who canceled their subscription this month.',
    },
    {
      id: 'cac',
      name: 'Customer Acq. Cost',
      value: '$48.32',
      rawValue: 48.32,
      change: 5.7,
      trend: 'up',
      status: 'warning',
      period: 'vs. last month',
      description:
        'Average cost to acquire a new customer, including marketing and sales expenses.',
    },
    {
      id: 'ltv',
      name: 'Customer LTV',
      value: '$452',
      rawValue: 452,
      change: 3.2,
      trend: 'up',
      status: 'good',
      period: 'vs. last month',
      description: 'Predicted lifetime value of an average customer.',
    },
    {
      id: 'active-users',
      name: 'Weekly Active Users',
      value: '14,583',
      rawValue: 14583,
      change: -2.1,
      trend: 'down',
      status: 'warning',
      period: 'vs. last week',
      description:
        'Number of unique users who performed an action in the past 7 days.',
    },
    {
      id: 'engagement',
      name: 'Avg. Engagement',
      value: '4.2 min',
      rawValue: 4.2,
      change: 11.7,
      trend: 'up',
      status: 'good',
      period: 'vs. last month',
      description:
        'Average time users spend actively engaging with the product per session.',
    },
    {
      id: 'support',
      name: 'Support Response',
      value: '42 min',
      rawValue: 42,
      change: 14.3,
      trend: 'up',
      status: 'critical',
      period: 'vs. last month',
      description:
        'Average time to first response for customer support tickets.',
    },
  ];

  // Helper function to get appropriate styles based on status
  const getStatusStyles = (status: Metric['status']) => {
    switch (status) {
      case 'good':
        return 'border-emerald-200 dark:border-emerald-950 bg-emerald-50 dark:bg-emerald-950/30';
      case 'warning':
        return 'border-amber-200 dark:border-amber-950 bg-amber-50 dark:bg-amber-950/30';
      case 'critical':
        return 'border-rose-200 dark:border-rose-950 bg-rose-50 dark:bg-rose-950/30';
      default:
        return '';
    }
  };

  // Helper function to get trend styles
  const getTrendStyles = (trend: Metric['trend']) => {
    switch (trend) {
      case 'up':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'down':
        return 'text-rose-600 dark:text-rose-400';
      default:
        return 'text-muted-foreground';
    }
  };

  // Helper function to get trend icons
  const getTrendIcon = (trend: Metric['trend'], status: Metric['status']) => {
    // For metrics like "churn" where down is good
    const isInverseMetric = status === 'good' && trend === 'down';
    const isPositive =
      (trend === 'up' && status !== 'critical') || isInverseMetric;

    if (trend === 'up') {
      return (
        <ArrowUpRight
          className={cn(
            'h-4 w-4',
            isPositive ? 'text-emerald-500' : 'text-rose-500'
          )}
        />
      );
    } else if (trend === 'down') {
      return (
        <ArrowDownRight
          className={cn(
            'h-4 w-4',
            isPositive ? 'text-emerald-500' : 'text-rose-500'
          )}
        />
      );
    }
    return null;
  };

  // Calculate total percentages for the summary
  const getStatusSummary = () => {
    const total = metrics.length;
    const goodCount = metrics.filter((m) => m.status === 'good').length;
    const warningCount = metrics.filter((m) => m.status === 'warning').length;
    const criticalCount = metrics.filter((m) => m.status === 'critical').length;

    return {
      good: Math.round((goodCount / total) * 100),
      warning: Math.round((warningCount / total) * 100),
      critical: Math.round((criticalCount / total) * 100),
    };
  };

  const statusSummary = getStatusSummary();

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <Badge className="mb-2">Dashboard</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Business Metrics</h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
              Real-time overview of our key performance indicators
            </p>
          </div>

          {/* Status Summary */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center dark:border-emerald-950 dark:bg-emerald-950/30">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {statusSummary.good}%
              </div>
              <div className="text-muted-foreground text-sm">On Target</div>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center dark:border-amber-950 dark:bg-amber-950/30">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {statusSummary.warning}%
              </div>
              <div className="text-muted-foreground text-sm">
                Needs Attention
              </div>
            </div>
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-center dark:border-rose-950 dark:bg-rose-950/30">
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                {statusSummary.critical}%
              </div>
              <div className="text-muted-foreground text-sm">Critical</div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <Card
                key={metric.id}
                className={cn(
                  'overflow-hidden border p-0',
                  getStatusStyles(metric.status)
                )}
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="font-medium">{metric.name}</h3>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground ml-1.5">
                            <HelpCircle className="h-3.5 w-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-sm">
                            {metric.description}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          getTrendStyles(metric.trend)
                        )}
                      >
                        {metric.change > 0 ? '+' : ''}
                        {metric.change}%
                      </span>
                      <span className="ml-1">
                        {getTrendIcon(metric.trend, metric.status)}
                      </span>
                    </div>
                  </div>

                  <div className="text-muted-foreground mt-1 text-xs">
                    {metric.period}
                  </div>
                </CardContent>
                <CardFooter
                  className={cn(
                    'bg-background/50 border-t px-6 !pt-3 !pb-3 text-xs',
                    metric.status === 'good'
                      ? 'border-emerald-200 dark:border-emerald-950/50'
                      : metric.status === 'warning'
                        ? 'border-amber-200 dark:border-amber-950/50'
                        : 'border-rose-200 dark:border-rose-950/50'
                  )}
                >
                  <div className="text-muted-foreground flex items-center">
                    <InfoIcon className="mr-1 h-3 w-3" />
                    {metric.status === 'good' && 'On target'}
                    {metric.status === 'warning' && 'Needs attention'}
                    {metric.status === 'critical' &&
                      'Critical - action required'}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
