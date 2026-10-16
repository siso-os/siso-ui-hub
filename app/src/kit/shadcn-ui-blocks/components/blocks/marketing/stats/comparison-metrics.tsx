import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { cn } from '@/arc-shims/kit-utils';
import {
  ArrowRight,
  Clock,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';

type ComparisonMetric = {
  id: string;
  label: string;
  description: string;
  before: {
    value: string;
    label: string;
  };
  after: {
    value: string;
    label: string;
  };
  improvement: string;
  icon: React.ReactNode;
  isPositiveUpward: boolean;
};

const metrics: ComparisonMetric[] = [
  {
    id: 'conversion',
    label: 'Conversion Rate',
    description: 'Website visitor to customer conversion percentage',
    before: {
      value: '1.8%',
      label: 'Industry Average',
    },
    after: {
      value: '5.2%',
      label: 'With Our Platform',
    },
    improvement: '189% increase',
    icon: <TrendingUp className="h-6 w-6" />,
    isPositiveUpward: true,
  },
  {
    id: 'sales-cycle',
    label: 'Sales Cycle',
    description: 'Average time from lead to closed deal',
    before: {
      value: '48 days',
      label: 'Before',
    },
    after: {
      value: '29 days',
      label: 'After',
    },
    improvement: '40% reduction',
    icon: <Clock className="h-6 w-6" />,
    isPositiveUpward: false,
  },
  {
    id: 'cac',
    label: 'Customer Acquisition Cost',
    description: 'Average cost to acquire a new customer',
    before: {
      value: '$320',
      label: 'Before',
    },
    after: {
      value: '$180',
      label: 'After',
    },
    improvement: '44% reduction',
    icon: <DollarSign className="h-6 w-6" />,
    isPositiveUpward: false,
  },
  {
    id: 'retention',
    label: 'Customer Retention',
    description: 'Percentage of customers remaining after one year',
    before: {
      value: '65%',
      label: 'Industry Average',
    },
    after: {
      value: '92%',
      label: 'With Our Platform',
    },
    improvement: '42% increase',
    icon: <Users className="h-6 w-6" />,
    isPositiveUpward: true,
  },
];

export default function ComparisonMetrics() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Badge className="mb-4">Before & After</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            The Difference Is Clear
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            See the transformative impact our platform has on key business
            metrics compared to industry standards or your current approach.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {metrics.map((metric) => (
            <Card key={metric.id} className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="border-b p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        metric.isPositiveUpward
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-blue-100 text-blue-600',
                        'dark:bg-background/10'
                      )}
                    >
                      {metric.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{metric.label}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {metric.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 divide-x">
                  {/* Before */}
                  <div className="bg-muted/30 p-6">
                    <div className="text-muted-foreground mb-1 text-sm font-medium">
                      {metric.before.label}
                    </div>
                    <div className="text-3xl font-bold">
                      {metric.before.value}
                    </div>
                  </div>

                  {/* After */}
                  <div className="bg-primary/5 p-6">
                    <div className="text-primary/80 mb-1 text-sm font-medium">
                      {metric.after.label}
                    </div>
                    <div className="text-primary text-3xl font-bold">
                      {metric.after.value}
                    </div>
                  </div>
                </div>

                {/* Improvement */}
                <div className="bg-muted/10 flex items-center justify-center border-t p-4">
                  <div className="flex items-center gap-2">
                    {metric.isPositiveUpward ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-emerald-500" />
                    )}
                    <span className="font-medium text-emerald-500">
                      {metric.improvement}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Case Study */}
        <div className="bg-muted mb-16 rounded-xl p-8">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="md:w-1/3">
              <div className="bg-primary/10 mx-auto flex h-48 w-48 items-center justify-center rounded-full md:h-40 md:w-40">
                {/* Placeholder for customer logo/image */}
                <span className="text-xl font-semibold">Acme Inc</span>
              </div>
            </div>
            <div className="text-center md:w-2/3 md:text-left">
              <Badge variant="outline" className="mb-4">
                Case Study
              </Badge>
              <blockquote className="mb-4 text-xl font-medium">
                &ldquo;After implementing this platform, we saw our customer
                acquisition costs drop by 44% while increasing conversion rates
                by nearly 3x.&rdquo;
              </blockquote>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-muted-foreground text-sm">
                VP of Marketing, Acme Inc
              </div>
            </div>
          </div>
        </div>

        {/* ROI Calculator Prompt */}
        <div className="bg-card rounded-xl border p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold">
            Calculate Your Potential Impact
          </h3>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            See exactly how our platform can transform your specific business
            metrics with our ROI calculator.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a href="#">
                Calculate Your ROI
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#">View All Case Studies</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
