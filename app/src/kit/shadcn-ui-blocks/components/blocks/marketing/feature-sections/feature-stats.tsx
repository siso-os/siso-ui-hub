import { useEffect, useState, useRef } from 'react';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { ArrowRight, BarChart3, Clock, Percent, Rocket, TimerReset, TrendingUp, Users, Zap } from 'lucide-react';

import { cn } from '@/arc-shims/kit-utils';

import type { ComponentType, SVGProps } from 'react';

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
interface Stat {
  id: string;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
}

interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  metrics: {
    title: string;
    description: string;
    stats: Stat[];
  };
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    image: string;
  };
  image: string;
  color: string;
}

const featureCategories: FeatureCategory[] = [
  {
    id: 'performance',
    title: 'Performance Optimization',
    description:
      'Our platform is built for speed and efficiency, delivering exceptional performance metrics that drive business growth.',
    metrics: {
      title: 'Performance Impact',
      description:
        'Customers experience significant performance improvements after implementation:',
      stats: [
        {
          id: 'speed',
          value: 10,
          label: 'Faster Load Times',
          suffix: 'x',
          icon: Zap,
          change: {
            value: 15,
            trend: 'up',
          },
        },
        {
          id: 'response',
          value: 50,
          label: 'Response Time Reduction',
          suffix: '%',
          icon: Clock,
          change: {
            value: 12,
            trend: 'up',
          },
        },
        {
          id: 'uptime',
          value: 99.99,
          label: 'System Uptime',
          suffix: '%',
          icon: TimerReset,
        },
        {
          id: 'scalability',
          value: 5,
          label: 'Scalability Improvement',
          suffix: 'x',
          icon: TrendingUp,
          change: {
            value: 20,
            trend: 'up',
          },
        },
      ],
    },
    testimonial: {
      quote:
        'Since implementing the platform, our page load times decreased by 70% and user retention improved dramatically.',
      author: 'Sarah Johnson',
      company: 'TechCorp CTO',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    color: 'blue',
  },
  {
    id: 'roi',
    title: 'Return on Investment',
    description:
      'Our platform delivers measurable business impact with proven ROI across various operational metrics.',
    metrics: {
      title: 'Business Impact',
      description:
        'Average metrics reported by customers after 6 months of implementation:',
      stats: [
        {
          id: 'conversion',
          value: 40,
          label: 'Conversion Rate Increase',
          suffix: '%',
          icon: Percent,
          change: {
            value: 8,
            trend: 'up',
          },
        },
        {
          id: 'costs',
          value: 30,
          label: 'Operational Cost Reduction',
          suffix: '%',
          icon: TrendingUp,
          change: {
            value: 5,
            trend: 'up',
          },
        },
        {
          id: 'revenue',
          value: 25,
          label: 'Revenue Growth',
          suffix: '%',
          icon: BarChart3,
          change: {
            value: 10,
            trend: 'up',
          },
        },
        {
          id: 'productivity',
          value: 60,
          label: 'Team Productivity Boost',
          suffix: '%',
          icon: Rocket,
          change: {
            value: 12,
            trend: 'up',
          },
        },
      ],
    },
    testimonial: {
      quote:
        "We've seen a 40% increase in conversions and 30% reduction in operational costs since deploying this solution.",
      author: 'Michael Chen',
      company: 'GrowthMetrics CEO',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    image:
      'https://images.unsplash.com/photo-1553484771-689277e6fa16?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    color: 'green',
  },
  {
    id: 'adoption',
    title: 'User Adoption',
    description:
      'Our intuitive platform drives exceptional user adoption rates with minimal onboarding friction.',
    metrics: {
      title: 'Adoption Metrics',
      description:
        'Customer adoption statistics compared to industry averages:',
      stats: [
        {
          id: 'onboarding',
          value: 85,
          label: 'Completed Onboarding',
          suffix: '%',
          icon: Users,
          change: {
            value: 15,
            trend: 'up',
          },
        },
        {
          id: 'retention',
          value: 95,
          label: 'User Retention Rate',
          suffix: '%',
          icon: Users,
          change: {
            value: 23,
            trend: 'up',
          },
        },
        {
          id: 'engagement',
          value: 3.5,
          label: 'Daily User Sessions',
          prefix: '',
          icon: Clock,
          change: {
            value: 30,
            trend: 'up',
          },
        },
        {
          id: 'referral',
          value: 40,
          label: 'User Referral Rate',
          suffix: '%',
          icon: Users,
          change: {
            value: 18,
            trend: 'up',
          },
        },
      ],
    },
    testimonial: {
      quote:
        "The platform's intuitive design led to a 95% adoption rate within our organization, far exceeding our expectations.",
      author: 'Emily Rodriguez',
      company: 'InnovateCorp Director',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    color: 'purple',
  },
];

export default function FeatureStats() {
  const [activeCategory, setActiveCategory] = useState(featureCategories[0]!.id);
  const [animatedStats, setAnimatedStats] = useState<{ [key: string]: number }>(
    {}
  );
  const [inViewport, setInViewport] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const currentCategory =
    featureCategories.find((category) => category.id === activeCategory) ||
    featureCategories[0]!;

  // Animate stats when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]!.isIntersecting) {
          setInViewport(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate the stats when category changes or comes into viewport
  useEffect(() => {
    if (!inViewport) return;

    // Reset animation values
    const initialValues: { [key: string]: number } = {};
    currentCategory.metrics.stats.forEach((stat) => {
      initialValues[stat.id] = 0;
    });
    setAnimatedStats(initialValues);

    // Animate to target values
    const animationDuration = 1500; // 1.5 seconds
    const frameDuration = 16; // ~60fps
    const totalFrames = Math.round(animationDuration / frameDuration);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const updatedValues: { [key: string]: number } = {};

      currentCategory.metrics.stats.forEach((stat) => {
        // Easing function for smoother animation
        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);

        updatedValues[stat.id] = Number(
          (easedProgress * stat.value).toFixed(stat.value % 1 === 0 ? 0 : 2)
        );
      });

      setAnimatedStats(updatedValues);

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [currentCategory, inViewport]);

  // Handle dropdown change
  const handleSelectChange = (value: string) => {
    setActiveCategory(value);
  };

  return (
    <section
      ref={sectionRef}
      className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]"
    >
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Measurable Impact
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          See the real-world impact our features have on businesses like yours
        </p>
      </div>

      {/* Mobile Dropdown (visible on small screens) */}
      <div className="mb-6 w-full md:hidden">
        <Select value={activeCategory} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select feature category" />
          </SelectTrigger>
          <SelectContent>
            {featureCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs
        defaultValue={activeCategory}
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        {/* Desktop Tabs (hidden on small screens) */}
        <div className="hidden justify-center md:flex">
          <TabsList className="mx-auto">
            {featureCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-6"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {featureCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-2xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium">
                    {category.metrics.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {category.metrics.description}
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {category.metrics.stats.map((stat) => (
                      <Card key={stat.id} className="overflow-hidden p-0">
                        <CardContent className="p-6">
                          <div className="mb-2 flex items-center justify-between">
                            <div
                              className={`rounded-md p-2 bg-${category.color}-100 text-${category.color}-600 dark:bg-${category.color}-950 dark:text-${category.color}-400`}
                            >
                              <stat.icon className="h-5 w-5" />
                            </div>
                            {stat.change && (
                              <div
                                className={cn(
                                  'flex items-center rounded-full px-2 py-1 text-xs font-medium',
                                  stat.change.trend === 'up'
                                    ? 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400'
                                    : 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400'
                                )}
                              >
                                {stat.change.trend === 'up' ? '+' : '-'}
                                {stat.change.value}%
                                <TrendingUp
                                  className={cn(
                                    'ml-1 h-3 w-3',
                                    stat.change.trend === 'down' && 'rotate-180'
                                  )}
                                />
                              </div>
                            )}
                          </div>
                          <div className="mt-4 mb-1">
                            <span className="text-3xl font-bold tabular-nums">
                              {stat.prefix}
                              {animatedStats[stat.id]?.toLocaleString() || 0}
                              {stat.suffix}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {stat.label}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {category.testimonial && (
                  <div
                    className={`rounded-xl border-l-4 p-6 border-${category.color}-500 bg-${category.color}-50 dark:bg-${category.color}-950/20`}
                  >
                    <div className="space-y-4">
                      <p className="text-muted-foreground italic">
                        &ldquo;{category.testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <img
                            src={category.testimonial.image}
                            alt={category.testimonial.author}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">
                            {category.testimonial.author}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {category.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={category.image}
                  alt={category.title}
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-tl from-${category.color}-500/20 via-transparent to-transparent`}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="from-muted/80 via-muted to-muted/80 relative mt-16 rounded-xl bg-gradient-to-r p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="max-w-lg space-y-2">
            <h3 className="text-2xl font-bold">Ready to see the impact?</h3>
            <p className="text-muted-foreground">
              Book a demo to see how our platform can deliver measurable results
              for your business.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row md:items-center">
            <Button variant="outline" asChild>
              <a href="#">Explore case studies</a>
            </Button>
            <Button asChild>
              <a href="#">
                Schedule a demo <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
