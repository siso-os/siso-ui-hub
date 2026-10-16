import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../../ui/tabs';
import { cn } from '@/arc-shims/kit-utils';
import { useState } from 'react';

type FunnelStage = {
  id: string;
  name: string;
  color: string;
  value: number;
  formatted: string;
  dropoff: number;
  dropoffFormatted: string;
};

type FunnelType = 'marketing' | 'onboarding' | 'checkout';

type FunnelData = {
  [key in FunnelType]: {
    title: string;
    description: string;
    stages: FunnelStage[];
    metrics: {
      conversionRate: string;
      dropoffPoint: string;
      totalOpportunity: string;
    };
  };
};

export default function FunnelStats() {
  const [funnelType, setFunnelType] = useState<FunnelType>('marketing');

  // Sample data for different funnel types
  const funnelData: FunnelData = {
    marketing: {
      title: 'Marketing Funnel',
      description: 'How visitors convert through our marketing pipeline',
      stages: [
        {
          id: 'visitors',
          name: 'Website Visitors',
          color: 'bg-blue-500',
          value: 124862,
          formatted: '124,862',
          dropoff: 0,
          dropoffFormatted: '0%',
        },
        {
          id: 'leads',
          name: 'Lead Capture',
          color: 'bg-indigo-500',
          value: 32845,
          formatted: '32,845',
          dropoff: 73.7,
          dropoffFormatted: '73.7%',
        },
        {
          id: 'mql',
          name: 'Marketing Qualified',
          color: 'bg-violet-500',
          value: 12462,
          formatted: '12,462',
          dropoff: 62.1,
          dropoffFormatted: '62.1%',
        },
        {
          id: 'sql',
          name: 'Sales Qualified',
          color: 'bg-purple-500',
          value: 4628,
          formatted: '4,628',
          dropoff: 62.9,
          dropoffFormatted: '62.9%',
        },
        {
          id: 'opportunities',
          name: 'Opportunities',
          color: 'bg-fuchsia-500',
          value: 1842,
          formatted: '1,842',
          dropoff: 60.2,
          dropoffFormatted: '60.2%',
        },
        {
          id: 'customers',
          name: 'Customers',
          color: 'bg-pink-500',
          value: 684,
          formatted: '684',
          dropoff: 62.9,
          dropoffFormatted: '62.9%',
        },
      ],
      metrics: {
        conversionRate: '0.55%',
        dropoffPoint: 'Lead Capture (73.7%)',
        totalOpportunity: '$1.24M',
      },
    },
    onboarding: {
      title: 'User Onboarding',
      description: 'How new users complete the onboarding process',
      stages: [
        {
          id: 'signups',
          name: 'New Sign-ups',
          color: 'bg-emerald-500',
          value: 8426,
          formatted: '8,426',
          dropoff: 0,
          dropoffFormatted: '0%',
        },
        {
          id: 'profile',
          name: 'Profile Completion',
          color: 'bg-green-500',
          value: 6842,
          formatted: '6,842',
          dropoff: 18.8,
          dropoffFormatted: '18.8%',
        },
        {
          id: 'education',
          name: 'Education Steps',
          color: 'bg-lime-500',
          value: 5124,
          formatted: '5,124',
          dropoff: 25.1,
          dropoffFormatted: '25.1%',
        },
        {
          id: 'integration',
          name: 'Integration Setup',
          color: 'bg-yellow-500',
          value: 3845,
          formatted: '3,845',
          dropoff: 25.0,
          dropoffFormatted: '25.0%',
        },
        {
          id: 'teammates',
          name: 'Team Invites',
          color: 'bg-amber-500',
          value: 2546,
          formatted: '2,546',
          dropoff: 33.8,
          dropoffFormatted: '33.8%',
        },
        {
          id: 'activated',
          name: 'Fully Activated',
          color: 'bg-orange-500',
          value: 1982,
          formatted: '1,982',
          dropoff: 22.2,
          dropoffFormatted: '22.2%',
        },
      ],
      metrics: {
        conversionRate: '23.5%',
        dropoffPoint: 'Team Invites (33.8%)',
        totalOpportunity: '6,444 users',
      },
    },
    checkout: {
      title: 'Checkout Process',
      description: 'How users navigate through our checkout flow',
      stages: [
        {
          id: 'cart',
          name: 'Add to Cart',
          color: 'bg-cyan-500',
          value: 15842,
          formatted: '15,842',
          dropoff: 0,
          dropoffFormatted: '0%',
        },
        {
          id: 'checkout',
          name: 'Begin Checkout',
          color: 'bg-sky-500',
          value: 8426,
          formatted: '8,426',
          dropoff: 46.8,
          dropoffFormatted: '46.8%',
        },
        {
          id: 'shipping',
          name: 'Shipping Info',
          color: 'bg-blue-500',
          value: 6284,
          formatted: '6,284',
          dropoff: 25.4,
          dropoffFormatted: '25.4%',
        },
        {
          id: 'payment',
          name: 'Payment Info',
          color: 'bg-indigo-500',
          value: 4624,
          formatted: '4,624',
          dropoff: 26.4,
          dropoffFormatted: '26.4%',
        },
        {
          id: 'review',
          name: 'Order Review',
          color: 'bg-violet-500',
          value: 3946,
          formatted: '3,946',
          dropoff: 14.7,
          dropoffFormatted: '14.7%',
        },
        {
          id: 'purchase',
          name: 'Purchase Complete',
          color: 'bg-purple-500',
          value: 3248,
          formatted: '3,248',
          dropoff: 17.7,
          dropoffFormatted: '17.7%',
        },
      ],
      metrics: {
        conversionRate: '20.5%',
        dropoffPoint: 'Begin Checkout (46.8%)',
        totalOpportunity: '$394,850',
      },
    },
  };

  const currentFunnel = funnelData[funnelType];

  // Calculate the max value for scaling
  const maxValue = Math.max(
    ...currentFunnel.stages.map((stage) => stage.value)
  );

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge className="mb-2">Analytics</Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Conversion Funnel</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
            Visualize how users progress through key business processes
          </p>
        </div>

        {/* Funnel Type Selector */}
        <div className="mb-10 flex justify-center">
          <Tabs
            defaultValue="marketing"
            value={funnelType}
            onValueChange={(value) => setFunnelType(value as FunnelType)}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
              <TabsTrigger value="checkout">Checkout</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Funnel Visualization */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{currentFunnel.title}</CardTitle>
              <p className="text-muted-foreground text-sm">
                {currentFunnel.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-2">
                {currentFunnel.stages.map((stage, index) => (
                  <div key={stage.id} className="w-full">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">{stage.name}</span>
                      <div className="text-sm tabular-nums">
                        <span className="font-medium">{stage.formatted}</span>
                        {index > 0 && (
                          <span className="text-muted-foreground ml-2 text-xs">
                            (-{stage.dropoffFormatted})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Funnel Bar */}
                    <div className="bg-muted h-8 w-full overflow-hidden rounded-md">
                      <div
                        className={cn('h-full rounded-md', stage.color)}
                        style={{
                          width: `${Math.max(
                            (stage.value / maxValue) * 100,
                            5
                          )}%`,
                          transition: 'width 0.5s ease-out',
                        }}
                      />
                    </div>

                    {/* Dropoff Arrow */}
                    {index < currentFunnel.stages.length - 1 && (
                      <div className="my-1 flex justify-center">
                        <svg
                          width="24"
                          height="14"
                          viewBox="0 0 24 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-muted-foreground"
                        >
                          <path
                            d="M12 14L23.1244 0.5H0.875645L12 14Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metrics Summary */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="gap-0">
            <CardHeader className="">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentFunnel.metrics.conversionRate}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                End-to-end conversion
              </p>
            </CardContent>
          </Card>

          <Card className="gap-0">
            <CardHeader className="">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Biggest Dropoff
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentFunnel.metrics.dropoffPoint}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                Stage with highest abandonment
              </p>
            </CardContent>
          </Card>

          <Card className="gap-0">
            <CardHeader className="">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Improvement Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentFunnel.metrics.totalOpportunity}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                Potential value from improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <Button>Analyze Funnel Performance</Button>
        </div>
      </div>
    </div>
  );
}
