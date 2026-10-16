import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';
import {
  ArrowUpIcon,
  PlayIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroSectionWithInteractiveMetrics() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <Badge variant="outline" className="mb-4">
              <TrendingUpIcon className="mr-1 h-3 w-3" />
              Now Live
            </Badge>

            <h1 className="text-primary mb-6 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
              Transform your business with data-driven insights
            </h1>

            <p className="text-foreground mb-8 max-w-4xl text-base text-balance sm:text-lg">
              Join thousands of companies using our platform to make smarter
              decisions, accelerate growth, and achieve measurable results
              across all business metrics.
            </p>

            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowUpIcon className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                <PlayIcon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Watch Demo
              </Button>
            </div>

            <div className="text-muted-foreground flex items-center justify-center gap-6 text-sm lg:justify-start">
              <div className="flex items-center gap-2">
                <ZapIcon className="h-4 w-4 text-green-500" />
                Setup in 5 minutes
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-blue-500" />
                No credit card required
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Metrics */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <InteractiveMetricCard
                title="Active Users"
                value={127500}
                suffix=""
                trend={12.5}
                color="blue"
                icon={<UsersIcon className="h-5 w-5" />}
                delay={0}
              />
              <InteractiveMetricCard
                title="Revenue Growth"
                value={342}
                suffix="%"
                trend={23.1}
                color="green"
                icon={<TrendingUpIcon className="h-5 w-5" />}
                delay={200}
              />
              <InteractiveMetricCard
                title="Conversion Rate"
                value={89.7}
                suffix="%"
                trend={8.3}
                color="purple"
                icon={<ZapIcon className="h-5 w-5" />}
                delay={400}
              />
              <InteractiveMetricCard
                title="Time Saved"
                value={4.2}
                suffix="hrs"
                trend={15.2}
                color="orange"
                icon={<ArrowUpIcon className="h-5 w-5" />}
                delay={600}
              />
            </div>

            {/* Floating Elements */}
            <div className="bg-primary/10 absolute -top-4 -right-4 h-24 w-24 animate-pulse rounded-full blur-xl"></div>
            <div className="bg-secondary/10 absolute -bottom-4 -left-4 h-32 w-32 animate-pulse rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Bottom Section - Social Proof */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-8 text-sm">
            TRUSTED BY LEADING COMPANIES WORLDWIDE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="bg-muted h-8 w-24 animate-pulse rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

interface InteractiveMetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  trend: number;
  color: 'blue' | 'green' | 'purple' | 'orange';
  icon: React.ReactNode;
  delay?: number;
}

function InteractiveMetricCard({
  title,
  value,
  suffix = '',
  trend,
  color,
  icon,
  delay = 0,
}: InteractiveMetricCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const increment = value / (duration / 16);
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(interval);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const colorClasses = {
    blue: {
      bg: 'hover:bg-blue-50 dark:hover:bg-blue-950/30',
      icon: 'text-blue-500',
      trend: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30',
      border: 'hover:border-blue-200 dark:hover:border-blue-800',
    },
    green: {
      bg: 'hover:bg-green-50 dark:hover:bg-green-950/30',
      icon: 'text-green-500',
      trend: 'text-green-600 bg-green-50 dark:bg-green-950/30',
      border: 'hover:border-green-200 dark:hover:border-green-800',
    },
    purple: {
      bg: 'hover:bg-purple-50 dark:hover:bg-purple-950/30',
      icon: 'text-purple-500',
      trend: 'text-purple-600 bg-purple-50 dark:bg-purple-950/30',
      border: 'hover:border-purple-200 dark:hover:border-purple-800',
    },
    orange: {
      bg: 'hover:bg-orange-50 dark:hover:bg-orange-950/30',
      icon: 'text-orange-500',
      trend: 'text-orange-600 bg-orange-50 dark:bg-orange-950/30',
      border: 'hover:border-orange-200 dark:hover:border-orange-800',
    },
  };

  const colorClass = colorClasses[color];

  return (
    <Card
      className={`transform cursor-pointer transition-all duration-300 ${
        isHovered ? 'scale-105 shadow-lg' : 'hover:scale-102'
      } ${colorClass.bg} ${colorClass.border}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className={`rounded-lg p-2 ${colorClass.trend}`}>
            <div className={colorClass.icon}>{icon}</div>
          </div>
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${colorClass.trend}`}
          >
            <ArrowUpIcon className="h-3 w-3" />+{trend}%
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-2xl font-bold tracking-tight">
            {animatedValue.toLocaleString()}
            {suffix}
          </p>
          <p className="text-muted-foreground text-sm">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
