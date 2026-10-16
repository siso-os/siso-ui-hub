import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

import {
  Banknote,
  Clock,
  CreditCard,
  Globe,
  HeartPulse,
  Star,
  ThumbsUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

interface MinimalStat {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: {
    value: number;
    direction: 'up' | 'down';
  };
  color:
    | 'blue'
    | 'green'
    | 'amber'
    | 'purple'
    | 'red'
    | 'cyan'
    | 'indigo'
    | 'pink'
    | 'orange';
}

export default function MinimalStatsTiles() {
  const stats: MinimalStat[] = [
    {
      id: 'customers',
      icon: <Users className="h-4 w-4" />,
      label: 'Customers',
      value: '2.4M+',
      change: {
        value: 12.5,
        direction: 'up',
      },
      color: 'blue',
    },
    {
      id: 'revenue',
      icon: <Banknote className="h-4 w-4" />,
      label: 'Revenue',
      value: '$12.7M',
      change: {
        value: 8.2,
        direction: 'up',
      },
      color: 'green',
    },
    {
      id: 'uptime',
      icon: <Clock className="h-4 w-4" />,
      label: 'Uptime',
      value: '99.99%',
      color: 'amber',
    },
    {
      id: 'transactions',
      icon: <CreditCard className="h-4 w-4" />,
      label: 'Transactions',
      value: '1.2M',
      change: {
        value: 9.3,
        direction: 'up',
      },
      color: 'purple',
    },
    {
      id: 'satisfaction',
      icon: <ThumbsUp className="h-4 w-4" />,
      label: 'Satisfaction',
      value: '94%',
      change: {
        value: 2.1,
        direction: 'up',
      },
      color: 'cyan',
    },
    {
      id: 'response-time',
      icon: <Zap className="h-4 w-4" />,
      label: 'Response Time',
      value: '28ms',
      change: {
        value: 15.3,
        direction: 'down',
      },
      color: 'green',
    },
    {
      id: 'global-reach',
      icon: <Globe className="h-4 w-4" />,
      label: 'Countries',
      value: '120+',
      change: {
        value: 4.8,
        direction: 'up',
      },
      color: 'indigo',
    },
    {
      id: 'rating',
      icon: <Star className="h-4 w-4" />,
      label: 'Avg. Rating',
      value: '4.8/5',
      color: 'orange',
    },
    {
      id: 'awards',
      icon: <Trophy className="h-4 w-4" />,
      label: 'Awards',
      value: '25',
      change: {
        value: 26.7,
        direction: 'up',
      },
      color: 'pink',
    },
    {
      id: 'retention',
      icon: <HeartPulse className="h-4 w-4" />,
      label: 'Retention',
      value: '92%',
      change: {
        value: 3.5,
        direction: 'up',
      },
      color: 'red',
    },
  ];

  // Color mapper for background and text
  const colorMap: Record<MinimalStat['color'], { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-700' },
    green: { bg: 'bg-green-50', text: 'text-green-700' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-700' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-700' },
    red: { bg: 'bg-red-50', text: 'text-red-700' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-700' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-700' },
  };

  return (
    <section className="bg-background w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Key Metrics</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Platform Performance
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Essential metrics showcasing our growth and success.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-background rounded-lg border p-4 transition-all duration-200 hover:shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full',
                    colorMap[stat.color].bg,
                    colorMap[stat.color].text
                  )}
                >
                  {stat.icon}
                </div>

                {stat.change && (
                  <div
                    className={cn(
                      'flex items-center text-xs font-medium',
                      stat.change.direction === 'up'
                        ? 'text-green-600'
                        : stat.id === 'response-time'
                          ? 'text-green-600'
                          : 'text-red-600'
                    )}
                  >
                    {stat.change.direction === 'up' ? (
                      <ChevronUp className="mr-0.5 h-3 w-3" />
                    ) : (
                      <ChevronDown className="mr-0.5 h-3 w-3" />
                    )}
                    {stat.change.value}%
                  </div>
                )}
              </div>

              <div className="space-y-0.5">
                <p className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center space-x-4">
          <Button variant="outline" size="sm" className="group" asChild>
            <a href="#">
              View all metrics
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>

          <Button size="sm" className="group" asChild>
            <a href="#">Generate report</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
