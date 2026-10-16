import { Button } from '../../../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { ScrollArea } from '../../../ui/scroll-area';

type Feature = {
  name: string;
  basic: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
  [key: string]: string | boolean;
};

const features: Feature[] = [
  {
    name: 'Users',
    basic: '1 user',
    pro: '5 users',
    enterprise: 'Unlimited',
  },
  {
    name: 'Storage',
    basic: '10GB',
    pro: '50GB',
    enterprise: '500GB',
  },
  {
    name: 'Support',
    basic: 'Email',
    pro: 'Priority',
    enterprise: '24/7 Phone & Email',
  },
  {
    name: 'Analytics',
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    name: 'API Access',
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    name: 'Custom Domain',
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    name: 'White Labeling',
    basic: false,
    pro: false,
    enterprise: true,
  },
  {
    name: 'Custom Integrations',
    basic: false,
    pro: false,
    enterprise: true,
  },
];

type Plan = {
  name: string;
  price: string;
  description: string;
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: 'Basic',
    price: '$9',
    description: 'For individuals and small projects',
  },
  {
    name: 'Pro',
    price: '$19',
    description: 'For growing teams and businesses',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    description: 'For large organizations',
  },
];

export default function PricingSectionHorizontal() {
  // Helper function to safely access feature properties
  const getFeatureValue = (
    feature: Feature,
    planName: string
  ): string | boolean => {
    const key = planName.toLowerCase();
    return feature[key] || false;
  };

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing for everyone
          </h2>
          <p className="text-muted-foreground mt-4">
            Choose the plan that best suits your needs.
          </p>
        </div>

        {/* Mobile pricing cards (visible on small screens) */}
        <div className="mt-12 grid gap-6 md:hidden">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? 'border-primary' : ''}
            >
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1 text-sm">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature.name} className="flex justify-between">
                      <span className="text-sm">{feature.name}</span>
                      <span className="text-sm">
                        {typeof getFeatureValue(feature, plan.name) ===
                        'boolean' ? (
                          getFeatureValue(feature, plan.name) ? (
                            <CheckIcon className="text-primary h-5 w-5" />
                          ) : (
                            <MinusIcon className="text-muted-foreground h-5 w-5" />
                          )
                        ) : (
                          getFeatureValue(feature, plan.name)
                        )}
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

        {/* Desktop pricing table (hidden on small screens) */}
        <div className="mt-12 hidden md:block">
          <div className="grid grid-cols-4 items-end gap-8">
            <div className="col-span-1">
              <h3 className="text-lg font-medium">Features</h3>
            </div>
            {plans.map((plan) => (
              <div key={plan.name} className="col-span-1 text-center">
                <div
                  className={`rounded-lg border p-4 ${
                    plan.popular ? 'border-primary' : ''
                  }`}
                >
                  <div className="text-xl font-bold">{plan.name}</div>
                  <div className="mt-2 text-3xl font-bold">{plan.price}</div>
                  <div className="text-muted-foreground mt-1 text-sm">
                    /month
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {plan.description}
                  </p>
                  <Button
                    className="mt-6 w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <a href="#">Get Started</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <ScrollArea className="mt-8 rounded-lg border">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Features</TableHead>
                    <TableHead className="text-center">Basic</TableHead>
                    <TableHead className="text-center">Pro</TableHead>
                    <TableHead className="text-center">Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature) => (
                    <TableRow key={feature.name}>
                      <TableCell className="font-medium">
                        {feature.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? (
                            <CheckIcon className="text-primary mx-auto h-5 w-5" />
                          ) : (
                            <MinusIcon className="text-muted-foreground mx-auto h-5 w-5" />
                          )
                        ) : (
                          feature.basic
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? (
                            <CheckIcon className="text-primary mx-auto h-5 w-5" />
                          ) : (
                            <MinusIcon className="text-muted-foreground mx-auto h-5 w-5" />
                          )
                        ) : (
                          feature.pro
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof feature.enterprise === 'boolean' ? (
                          feature.enterprise ? (
                            <CheckIcon className="text-primary mx-auto h-5 w-5" />
                          ) : (
                            <MinusIcon className="text-muted-foreground mx-auto h-5 w-5" />
                          )
                        ) : (
                          feature.enterprise
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}
