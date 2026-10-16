import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { cn } from '@/arc-shims/kit-utils';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

import {
  Clock,
  CreditCard,
  Download,
  FileCheck,
  Globe,
  LayoutGrid,
  MessageSquare,
  Server,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

interface IconStat {
  id: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  changePercentage?: number;
  trend?: 'up' | 'down' | 'neutral';
  description: string;
  color: string;
}

export default function IconStatsGrid() {
  const iconStats: IconStat[] = [
    {
      id: 'downloads',
      icon: <Download className="h-8 w-8" />,
      title: 'Downloads',
      value: '145K+',
      changePercentage: 32.5,
      trend: 'up',
      description: 'Total application downloads across all platforms',
      color: 'blue',
    },
    {
      id: 'active-users',
      icon: <Users className="h-8 w-8" />,
      title: 'Active Users',
      value: '45.2K',
      changePercentage: 12.7,
      trend: 'up',
      description: 'Users active on the platform daily',
      color: 'indigo',
    },
    {
      id: 'files-processed',
      icon: <FileCheck className="h-8 w-8" />,
      title: 'Files Processed',
      value: '3.7M',
      changePercentage: 28.4,
      trend: 'up',
      description: 'Documents successfully processed monthly',
      color: 'green',
    },
    {
      id: 'server-uptime',
      icon: <Server className="h-8 w-8" />,
      title: 'Uptime',
      value: '99.9%',
      trend: 'neutral',
      description: 'Server availability over the past 30 days',
      color: 'emerald',
    },
    {
      id: 'response-time',
      icon: <Zap className="h-8 w-8" />,
      title: 'Response Time',
      value: '45ms',
      changePercentage: -18.2,
      trend: 'down',
      description: 'Average API response time across endpoints',
      color: 'amber',
    },
    {
      id: 'global-coverage',
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Reach',
      value: '150+',
      changePercentage: 10.3,
      trend: 'up',
      description: 'Countries with active platform usage',
      color: 'cyan',
    },
    {
      id: 'security-score',
      icon: <Shield className="h-8 w-8" />,
      title: 'Security Score',
      value: 'A+',
      trend: 'neutral',
      description: 'Industry-standard security rating',
      color: 'red',
    },
    {
      id: 'avg-rating',
      icon: <Star className="h-8 w-8" />,
      title: 'User Rating',
      value: '4.92/5',
      changePercentage: 3.2,
      trend: 'up',
      description: 'Average user satisfaction rating',
      color: 'yellow',
    },
    {
      id: 'processing-time',
      icon: <Clock className="h-8 w-8" />,
      title: 'Processing Time',
      value: '< 2s',
      changePercentage: -35.8,
      trend: 'down',
      description: 'Average time to process a customer request',
      color: 'orange',
    },
    {
      id: 'transactions',
      icon: <CreditCard className="h-8 w-8" />,
      title: 'Transactions',
      value: '$14.2M',
      changePercentage: 22.3,
      trend: 'up',
      description: 'Monthly transaction volume processed',
      color: 'purple',
    },
    {
      id: 'messages',
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Messages',
      value: '925K',
      changePercentage: 45.6,
      trend: 'up',
      description: 'Monthly messages sent through platform',
      color: 'pink',
    },
    {
      id: 'integrations',
      icon: <LayoutGrid className="h-8 w-8" />,
      title: 'Integrations',
      value: '250+',
      changePercentage: 16.3,
      trend: 'up',
      description: '3rd party services and APIs integrated',
      color: 'slate',
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Platform Metrics</Badge>
          <h2 className="max-w-[800px] text-3xl font-bold tracking-tighter sm:text-4xl">
            Our Platform by the Numbers
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            Key statistics and metrics showcasing our global reach and
            performance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {iconStats.map((stat) => (
            <Card
              key={stat.id}
              className="overflow-hidden p-0 transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        'mb-3 flex h-16 w-16 items-center justify-center rounded-lg',
                        `bg-${stat.color}-100`,
                        `text-${stat.color}-600`
                      )}
                    >
                      {stat.icon}
                    </div>

                    <h3 className="text-lg font-medium">{stat.title}</h3>

                    <div className="mt-1 flex items-baseline justify-center gap-x-2">
                      <span className="text-3xl font-bold tracking-tight">
                        {stat.value}
                      </span>

                      {stat.changePercentage !== undefined && (
                        <div
                          className={cn(
                            'flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                            (stat.trend === 'up' &&
                              stat.title === 'Response Time') ||
                              stat.title === 'Processing Time'
                              ? 'bg-red-100 text-red-600'
                              : (stat.trend === 'down' &&
                                    stat.title === 'Response Time') ||
                                  stat.title === 'Processing Time'
                                ? 'bg-green-100 text-green-600'
                                : stat.trend === 'up'
                                  ? 'bg-green-100 text-green-600'
                                  : stat.trend === 'down'
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-blue-100 text-blue-600'
                          )}
                        >
                          {stat.trend === 'up' ? (
                            <ChevronUp className="mr-0.5 h-3 w-3" />
                          ) : stat.trend === 'down' ? (
                            <ChevronDown className="mr-0.5 h-3 w-3" />
                          ) : null}
                          {Math.abs(stat.changePercentage)}%
                        </div>
                      )}
                    </div>

                    <p className="text-muted-foreground mt-2 text-sm">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="outline" size="lg" className="group" asChild>
            <a href="#">
              Explore all metrics
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>

          <Button size="lg" className="group" asChild>
            <a href="#">
              View live dashboard
              <TrendingUp className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
