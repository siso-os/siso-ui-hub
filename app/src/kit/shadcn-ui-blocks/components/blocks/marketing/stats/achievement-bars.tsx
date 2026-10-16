import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { CheckCircle2, AlertCircle, Target } from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';

export default function AchievementBars() {
  const achievements = [
    {
      title: 'Q3 Sales Target',
      currentValue: 1842350,
      targetValue: 2000000,
      format: 'currency',
      progress: 92.1, // pre-calculated for demo
      status: 'on-track', // on-track, at-risk, completed
      timeRemaining: '14 days remaining',
    },
    {
      title: 'Customer Acquisition',
      currentValue: 2427,
      targetValue: 3000,
      format: 'number',
      progress: 80.9,
      status: 'on-track',
      timeRemaining: '14 days remaining',
    },
    {
      title: 'Retention Rate',
      currentValue: 78.5,
      targetValue: 75,
      format: 'percent',
      progress: 104.7, // can exceed 100%
      status: 'completed',
      timeRemaining: 'Goal exceeded',
    },
    {
      title: 'Support Response Time',
      currentValue: 4.2,
      targetValue: 3,
      format: 'time',
      progress: 71.4, // inverse: lower is better, so 71.4% to goal
      status: 'at-risk',
      timeRemaining: '14 days remaining',
    },
  ];

  // Format functions for different value types
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(value);
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      case 'percent':
        return `${value}%`;
      case 'time':
        return `${value} hours`;
      default:
        return value.toString();
    }
  };

  // Status indicator component
  const StatusIndicator = ({ status }: { status: string }) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center text-emerald-500">
            <CheckCircle2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-[10px] font-medium sm:text-xs">
              Completed
            </span>
          </div>
        );
      case 'at-risk':
        return (
          <div className="flex items-center text-amber-500">
            <AlertCircle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-[10px] font-medium sm:text-xs">At Risk</span>
          </div>
        );
      case 'on-track':
      default:
        return (
          <div className="flex items-center text-blue-500">
            <Target className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-[10px] font-medium sm:text-xs">On Track</span>
          </div>
        );
    }
  };

  // Helper function to get progress bar color class based on status
  const getProgressClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500';
      case 'at-risk':
        return 'bg-amber-500';
      case 'on-track':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge className="mb-2">Q3 Progress</Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Goal Tracking</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
            Monitor our progress toward key business objectives
          </p>
        </div>

        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-card rounded-xl border p-4 sm:p-6">
              <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                <h3 className="text-base font-semibold sm:text-lg">
                  {achievement.title}
                </h3>
                <StatusIndicator status={achievement.status} />
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-0">
                <div className="text-xl font-bold sm:text-2xl md:text-3xl">
                  {formatValue(achievement.currentValue, achievement.format)}
                </div>
                <div className="text-muted-foreground text-sm">
                  Target:{' '}
                  {formatValue(achievement.targetValue, achievement.format)}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium sm:text-sm">
                    {achievement.progress}%
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    {achievement.timeRemaining}
                  </span>
                </div>
                <Progress
                  value={Math.min(achievement.progress, 100)}
                  className={cn(
                    'h-2',
                    achievement.status === 'completed'
                      ? 'bg-emerald-100 dark:bg-emerald-950'
                      : achievement.status === 'at-risk'
                        ? 'bg-amber-100 dark:bg-amber-950'
                        : 'bg-blue-100 dark:bg-blue-950',
                    '[&>div]:' + getProgressClass(achievement.status)
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
