import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { CheckIcon, XIcon, HelpCircleIcon } from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../ui/tooltip';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

const plans = [
  {
    name: 'Free',
    key: 'free',
    price: '$0',
    description: 'For personal projects',
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    key: 'pro',
    price: '$29',
    description: 'For professionals and small teams',
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    key: 'enterprise',
    price: '$99',
    description: 'For large organizations',
    cta: 'Contact Sales',
    popular: false,
  },
];

const featureGroups = [
  {
    name: 'Core Features',
    features: [
      {
        name: 'Projects',
        description: 'Number of projects you can create',
        free: '3 projects',
        pro: 'Unlimited',
        enterprise: 'Unlimited',
      },
      {
        name: 'Team members',
        description: 'Number of team members you can invite',
        free: '1 member',
        pro: '10 members',
        enterprise: 'Unlimited',
      },
      {
        name: 'Storage',
        description: 'Total storage for all your projects',
        free: '5GB',
        pro: '50GB',
        enterprise: 'Unlimited',
      },
    ],
  },
  {
    name: 'Collaboration',
    features: [
      {
        name: 'Shared workspaces',
        description: 'Create shared workspaces for team collaboration',
        free: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'User permissions',
        description: 'Control access with user permissions',
        free: 'Basic',
        pro: 'Advanced',
        enterprise: 'Custom',
      },
      {
        name: 'Version history',
        description: 'Track changes with version history',
        free: '7 days',
        pro: '30 days',
        enterprise: 'Unlimited',
      },
    ],
  },
  {
    name: 'Security & Support',
    features: [
      {
        name: 'Two-factor authentication',
        description: 'Secure your account with 2FA',
        free: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Priority support',
        description: 'Get faster responses from our support team',
        free: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'SLA guarantee',
        description: 'Service level agreement for uptime and support',
        free: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
];

export default function PricingSectionFeatureGrid() {
  return (
    <TooltipProvider>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Choose the Right Plan for You
              </h2>
              <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed">
                Compare our plans to find the perfect fit for your needs.
              </p>
            </div>
          </div>

          {/* Mobile View (Tabs) */}
          <div className="mt-8 md:hidden">
            <Tabs defaultValue="free" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {plans.map((plan) => (
                  <TabsTrigger
                    key={plan.key}
                    value={plan.key}
                    className="relative"
                  >
                    {plan.popular && (
                      <Badge
                        className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        variant="default"
                      >
                        Popular
                      </Badge>
                    )}
                    {plan.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {plans.map((plan) => (
                <TabsContent key={plan.key} value={plan.key} className="mt-4">
                  <Card
                    className={cn(
                      'overflow-hidden',
                      plan.popular && 'border-primary'
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="mb-6 text-center">
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <div className="mt-2 flex items-baseline justify-center">
                          <span className="text-3xl font-bold">
                            {plan.price}
                          </span>
                          {plan.price !== '$0' && (
                            <span className="text-muted-foreground ml-1 text-sm">
                              /month
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {plan.description}
                        </p>
                        <Button
                          className="mt-4 w-full"
                          variant={plan.popular ? 'default' : 'outline'}
                          asChild
                        >
                          <a href="#">{plan.cta}</a>
                        </Button>
                      </div>

                      {featureGroups.map((group) => (
                        <div key={group.name} className="mt-6">
                          <h4 className="mb-2 font-medium">{group.name}</h4>
                          <ul className="space-y-2">
                            {group.features.map((feature) => (
                              <li
                                key={feature.name}
                                className="flex items-start gap-2"
                              >
                                <div className="mt-1">
                                  {typeof feature[
                                    plan.key as keyof typeof feature
                                  ] === 'boolean' ? (
                                    feature[
                                      plan.key as keyof typeof feature
                                    ] ? (
                                      <CheckIcon className="text-primary h-5 w-5" />
                                    ) : (
                                      <XIcon className="text-muted-foreground h-5 w-5" />
                                    )
                                  ) : (
                                    <CheckIcon className="text-primary h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium">
                                      {feature.name}
                                    </span>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircleIcon className="text-muted-foreground h-4 w-4" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">
                                          {feature.description}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                  {typeof feature[
                                    plan.key as keyof typeof feature
                                  ] !== 'boolean' && (
                                    <span className="text-muted-foreground text-sm">
                                      {
                                        feature[
                                          plan.key as keyof typeof feature
                                        ]
                                      }
                                    </span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Desktop View (Grid) */}
          <div className="mx-auto mt-12 hidden max-w-6xl md:block">
            {/* Plan headers */}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1"></div>
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    'col-span-1 rounded-t-lg p-4 text-center',
                    plan.popular && 'bg-accent/50'
                  )}
                >
                  <div className="relative">
                    {plan.popular && (
                      <Badge
                        className="absolute -top-8 left-1/2 -translate-x-1/2"
                        variant="default"
                      >
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline justify-center">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.price !== '$0' && (
                        <span className="text-muted-foreground ml-1 text-sm">
                          /month
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {plan.description}
                    </p>
                    <Button
                      className="mt-4 w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <a href="#">{plan.cta}</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature groups */}
            {featureGroups.map((group) => (
              <div key={group.name} className="mt-8">
                <div className="mb-4 text-lg font-medium">{group.name}</div>
                <Card className="p-0">
                  <CardContent className="p-0">
                    {group.features.map((feature, index) => (
                      <div
                        key={feature.name}
                        className={cn(
                          'grid grid-cols-4 gap-4 p-4',
                          index !== group.features.length - 1 && 'border-b'
                        )}
                      >
                        <div className="col-span-1 flex items-center gap-2">
                          <span>{feature.name}</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircleIcon className="text-muted-foreground h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{feature.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        {['free', 'pro', 'enterprise'].map((planKey) => (
                          <div
                            key={planKey}
                            className={cn(
                              'col-span-1 flex items-center justify-center',
                              planKey === 'pro' && 'bg-accent/50'
                            )}
                          >
                            {typeof feature[planKey as keyof typeof feature] ===
                            'boolean' ? (
                              feature[planKey as keyof typeof feature] ? (
                                <CheckIcon className="text-primary h-5 w-5" />
                              ) : (
                                <XIcon className="text-muted-foreground h-5 w-5" />
                              )
                            ) : (
                              <span>
                                {feature[planKey as keyof typeof feature]}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 mx-auto mt-16 max-w-3xl rounded-lg border p-8 text-center">
            <h3 className="text-xl font-medium">Need help choosing?</h3>
            <p className="text-muted-foreground mt-2">
              Our team can help you find the perfect plan for your specific
              needs.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button variant="outline" asChild>
                <a href="#">Schedule a Demo</a>
              </Button>
              <Button asChild>
                <a href="#">Talk to Sales</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
