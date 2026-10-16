import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  LineChart,
  Users,
  ShoppingCart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';

export default function InteractiveHover() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      change: '+18.2%',
      trend: 'up',
      icon: BarChart3,
      mainStat: '$2.4M this quarter',
      secondaryStat: '$1.96M last quarter',
      additionalInfo: [
        { label: 'Quarter over Quarter', value: '+18.2%' },
        { label: 'Year over Year', value: '+42.5%' },
        { label: 'Highest Month', value: 'September' },
      ],
    },
    {
      title: 'Average Order Value',
      value: '$124.32',
      change: '+5.4%',
      trend: 'up',
      icon: ShoppingCart,
      mainStat: '$124.32 per order',
      secondaryStat: '$117.92 last quarter',
      additionalInfo: [
        { label: 'Quarter over Quarter', value: '+5.4%' },
        { label: 'Year over Year', value: '+12.8%' },
        { label: 'Highest Category', value: 'Electronics' },
      ],
    },
    {
      title: 'Conversion Rate',
      value: '6.2%',
      change: '+1.8%',
      trend: 'up',
      icon: LineChart,
      mainStat: '6.2% of visitors convert',
      secondaryStat: '4.4% last quarter',
      additionalInfo: [
        { label: 'Quarter over Quarter', value: '+1.8%' },
        { label: 'Year over Year', value: '+3.2%' },
        { label: 'Top Traffic Source', value: 'Organic Search' },
      ],
    },
    {
      title: 'Monthly Active Users',
      value: '84.7K',
      change: '-2.3%',
      trend: 'down',
      icon: Users,
      mainStat: '84,723 active users',
      secondaryStat: '86,721 last quarter',
      additionalInfo: [
        { label: 'Quarter over Quarter', value: '-2.3%' },
        { label: 'Year over Year', value: '+15.7%' },
        { label: 'User Retention', value: '78.4%' },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Badge className="mb-2">Interactive Stats</Badge>
          <h2 className="text-3xl font-bold md:text-4xl">
            Key Performance Metrics
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
            Hover over each card to reveal detailed insights about our business
            metrics
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const isHovered = hoveredCard === index;
            const IconComponent = stat.icon;

            return (
              <Card
                key={index}
                className={cn(
                  'relative overflow-hidden pb-0 shadow-sm transition-all duration-300',
                  isHovered ? 'shadow-md' : ''
                )}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={cn(
                    'from-primary/10 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300',
                    isHovered ? 'opacity-100' : ''
                  )}
                >
                  <div className="bg-primary/10 absolute top-0 right-0 -mt-5 -mr-5 h-20 w-20 rounded-full blur-xl"></div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary/10 mr-2 rounded-md p-1.5">
                        <IconComponent className="text-primary h-4 w-4" />
                      </div>
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                    </div>
                    <div
                      className={cn(
                        'flex items-center text-xs font-medium',
                        stat.trend === 'up'
                          ? 'text-emerald-500'
                          : 'text-rose-500'
                      )}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="mr-0.5 h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="mr-0.5 h-3 w-3" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pb-2">
                  <div className="text-3xl font-bold">{stat.value}</div>

                  <div
                    className={cn(
                      'mt-2 max-h-0 space-y-3 overflow-hidden opacity-0 transition-all duration-300',
                      isHovered ? 'max-h-40 opacity-100' : ''
                    )}
                  >
                    <div className="text-sm">
                      <div className="font-medium">{stat.mainStat}</div>
                      <div className="text-muted-foreground">
                        {stat.secondaryStat}
                      </div>
                    </div>

                    <div className="border-border space-y-1.5 border-t pt-2">
                      {stat.additionalInfo.map((info, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-muted-foreground">
                            {info.label}
                          </span>
                          <span className="font-medium">{info.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter
                  className={cn(
                    'text-muted-foreground text-xs transition-all duration-300',
                    isHovered ? 'pb-3' : 'pb-4'
                  )}
                >
                  <div className="flex w-full justify-between">
                    <span>Last Updated</span>
                    <span>Today, 8:23 AM</span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
