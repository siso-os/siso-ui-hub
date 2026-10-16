import { useState } from 'react';

import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Slider } from '../../../ui/slider';
import { Tabs, TabsList, TabsTrigger } from '../../../ui/tabs';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';

// Usage tiers
const usageTiers = [
  { min: 0, max: 10000, rate: 0.01 },
  { min: 10000, max: 100000, rate: 0.008 },
  { min: 100000, max: 1000000, rate: 0.006 },
  { min: 1000000, max: Infinity, rate: 0.004 },
];

// Plans
const plans = [
  {
    name: 'Starter',
    basePrice: 0,
    features: [
      'Up to 10,000 API calls/month',
      'Basic analytics',
      'Community support',
      'Standard rate limiting',
    ],
  },
  {
    name: 'Growth',
    basePrice: 49,
    features: [
      'Up to 100,000 API calls/month',
      'Advanced analytics',
      'Priority support',
      'Higher rate limits',
      'Team access',
      'Custom domains',
    ],
    popular: true,
  },
  {
    name: 'Scale',
    basePrice: 199,
    features: [
      'Up to 1,000,000 API calls/month',
      'Enterprise analytics',
      '24/7 support',
      'Highest rate limits',
      'Team access',
      'Custom domains',
      'SLA guarantee',
      'Dedicated account manager',
    ],
  },
];

// Calculate price based on usage
function calculatePrice(basePrice: number, usage: number) {
  let additionalCost = 0;
  let remainingUsage = usage;

  for (const tier of usageTiers) {
    if (remainingUsage <= 0) break;

    const usageInTier = Math.min(remainingUsage, tier.max - tier.min);
    if (usageInTier > 0) {
      additionalCost += usageInTier * tier.rate;
      remainingUsage -= usageInTier;
    }
  }

  return basePrice + additionalCost;
}

// Format number with commas
function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function PricingSectionCalculator() {
  const [usage, setUsage] = useState(5000);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>(
    'monthly'
  );

  // Calculate annual discount
  const annualDiscount = 0.2; // 20% discount
  const annualMultiplier =
    billingPeriod === 'annually' ? 12 * (1 - annualDiscount) : 1;

  return (
    <section className="from-muted/50 to-background w-full bg-gradient-to-b py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Pay only for what you use
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed">
              Transparent, usage-based pricing that scales with your business.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <Tabs
            defaultValue="monthly"
            className="w-full"
            onValueChange={(value) =>
              setBillingPeriod(value as 'monthly' | 'annually')
            }
          >
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annually">Annually (Save 20%)</TabsTrigger>
              </TabsList>
            </div>

            <div className="mx-auto mb-12 max-w-3xl">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Estimate your cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-medium">
                          Monthly API calls
                        </h3>
                        <div className="bg-primary/10 rounded-full px-3 py-1 text-sm font-medium">
                          {formatNumber(usage)}
                        </div>
                      </div>
                      <Slider
                        value={[usage]}
                        min={1000}
                        max={1000000}
                        step={1000}
                        onValueChange={(value) => setUsage(value[0]!)}
                      />
                      <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                        <span>1,000</span>
                        <span>100,000</span>
                        <span>1,000,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => {
                // Calculate price based on usage and billing period
                const basePrice = plan.basePrice * annualMultiplier;
                const price = calculatePrice(
                  basePrice,
                  Math.max(
                    0,
                    usage -
                      (plan.name === 'Starter'
                        ? 10000
                        : plan.name === 'Growth'
                          ? 100000
                          : 1000000)
                  )
                );

                return (
                  <Card
                    key={plan.name}
                    className={cn(
                      'flex flex-col',
                      plan.popular && 'border-primary shadow-md'
                    )}
                  >
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="mt-4 flex items-baseline">
                        <span className="text-4xl font-bold">
                          ${price.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground ml-1 text-sm">
                          /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                      {plan.basePrice > 0 && (
                        <div className="text-muted-foreground mt-1 text-xs">
                          ${plan.basePrice * annualMultiplier} base + usage
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <CheckIcon className="text-primary mr-2 h-4 w-4" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.popular ? 'default' : 'outline'}
                        asChild
                      >
                        <a href="#">Get Started</a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </Tabs>
        </div>

        <div className="bg-card mx-auto mt-16 max-w-3xl rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium">Usage-based pricing details</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">
                    Monthly API calls
                  </th>
                  <th className="pb-2 text-right font-medium">Rate per call</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">First 10,000</td>
                  <td className="py-2 text-right">$0.01</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">10,001 - 100,000</td>
                  <td className="py-2 text-right">$0.008</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">100,001 - 1,000,000</td>
                  <td className="py-2 text-right">$0.006</td>
                </tr>
                <tr>
                  <td className="py-2">1,000,001+</td>
                  <td className="py-2 text-right">$0.004</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            Each plan includes a certain number of free API calls. Additional
            usage is billed at the rates above.
          </p>
        </div>

        <div className="text-muted-foreground mt-12 text-center text-sm">
          Need a custom plan?{' '}
          <a
            href="#"
            className="text-primary underline underline-offset-4"
          >
            Contact our sales team
          </a>{' '}
          for volume discounts.
        </div>
      </div>
    </section>
  );
}
