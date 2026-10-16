import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { CheckIcon } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$9',
    description: [
      '1 user',
      'Up to 10 projects',
      '5GB storage',
      'Basic support',
      'Basic analytics',
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    description: [
      '5 users',
      'Up to 50 projects',
      '20GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
    ],
  },
  {
    name: 'Enterprise',
    price: '$49',
    description: [
      'Unlimited users',
      'Unlimited projects',
      '500GB storage',
      '24/7 support',
      'Advanced analytics',
      'Custom domains',
      'Custom integrations',
    ],
  },
];

export default function PricingSectionSimple() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4 text-4xl font-bold">
                  {plan.price}
                  <span className="text-muted-foreground text-sm font-normal">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="text-muted-foreground grid gap-3 text-sm">
                  {plan.description.map((item) => (
                    <li key={item} className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="#">Get Started</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
