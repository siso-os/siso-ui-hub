import { Button } from '../../../ui/button';
import { Separator } from '../../../ui/separator';
import { CheckIcon } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$9',
    description: 'Essential features for individuals',
    features: ['1 user', '5 projects', '5GB storage', 'Basic support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Advanced features for professionals',
    features: [
      '5 users',
      'Unlimited projects',
      '50GB storage',
      'Priority support',
      'Advanced analytics',
      'API access',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Team',
    price: '$79',
    description: 'Everything a growing team needs',
    features: [
      'Unlimited users',
      'Unlimited projects',
      '500GB storage',
      '24/7 support',
      'Advanced analytics',
      'API access',
      'SSO authentication',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingSectionMinimalist() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed">
              Choose the plan that works best for you and your team.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-6 ${
                plan.popular ? 'border-primary' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground absolute -top-3 right-0 left-0 mx-auto w-fit rounded-full px-3 py-1 text-xs font-medium">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>
              <div className="mb-4 flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1 text-sm">
                  /month
                </span>
              </div>
              <Separator className="my-4" />
              <ul className="mb-8 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckIcon className="text-primary mr-2 h-4 w-4" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  asChild
                >
                  <a href="#">{plan.cta}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-muted-foreground mt-12 text-center text-sm">
          All plans include a 14-day free trial. No credit card required.{' '}
          <a href="#" className="underline underline-offset-4">
            View full pricing details
          </a>
        </div>
      </div>
    </section>
  );
}
