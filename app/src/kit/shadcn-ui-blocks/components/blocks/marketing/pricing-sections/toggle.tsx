import { useState } from 'react';

import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Label } from '../../../ui/label';
import { CheckIcon } from 'lucide-react';

const plans = [
  {
    name: 'Hobby',
    monthlyPrice: '$15',
    yearlyPrice: '$144',
    description: 'Perfect for side projects and hobbies',
    features: [
      'Up to 3 projects',
      'Basic analytics',
      'Community support',
      '2GB storage',
      'API access',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    monthlyPrice: '$29',
    yearlyPrice: '$288',
    description: 'Best for growing businesses and teams',
    features: [
      'Up to 10 projects',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      'API access',
      'Team collaboration',
      'Custom domains',
    ],
    popular: true,
  },
  {
    name: 'Scale',
    monthlyPrice: '$99',
    yearlyPrice: '$948',
    description: 'For large teams and organizations',
    features: [
      'Unlimited projects',
      'Enterprise analytics',
      '24/7 phone support',
      '100GB storage',
      'Advanced API access',
      'SSO & security features',
      'Custom integrations',
      'Dedicated account manager',
    ],
    popular: false,
  },
];

export default function PricingSectionToggle() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="bg-muted/50 w-full py-12">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-col items-center space-y-8">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl leading-[1.1] font-bold sm:text-3xl md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
              Choose the perfect plan for your needs. Save up to 20% with annual
              billing.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="billing-toggle">Monthly</Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <div className="relative">
              <Label htmlFor="billing-toggle">Annual</Label>
              <Badge variant="secondary" className="absolute -top-8 -right-12">
                Save 20%
              </Badge>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular ? 'border-primary shadow-lg' : ''
                }`}
              >
                {plan.popular && (
                  <Badge
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    variant="default"
                  >
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                    <span className="text-muted-foreground ml-1 text-sm font-medium">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                  <CardDescription className="mt-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon className="text-primary mr-2 h-4 w-4" />
                        <span className="text-muted-foreground text-sm">
                          {feature}
                        </span>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
