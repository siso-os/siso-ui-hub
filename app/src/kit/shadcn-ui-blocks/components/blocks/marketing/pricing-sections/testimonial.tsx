import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { CheckIcon, StarIcon } from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

const plans = [
  {
    name: 'Basic',
    price: '$19',
    description: 'Perfect for individuals and freelancers',
    features: [
      'Up to 5 projects',
      'Basic analytics',
      '24/7 email support',
      '10GB storage',
    ],
    testimonial: {
      quote:
        'As a freelancer, this plan gives me everything I need to manage my clients and projects efficiently.',
      author: 'Alex Morgan',
      role: 'Freelance Designer',
      avatar: '/avatars/alex-morgan.jpg',
    },
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'Ideal for small teams and growing businesses',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      '50GB storage',
      'API access',
      'Team collaboration',
      'Custom domains',
    ],
    popular: true,
    testimonial: {
      quote:
        "We've grown our business by 40% since switching to the Pro plan. The team collaboration features are game-changing.",
      author: 'Sarah Chen',
      role: 'Marketing Director, GrowthLabs',
      avatar: '/avatars/sarah-chen.jpg',
    },
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited projects',
      'Enterprise analytics',
      '24/7 phone support',
      '500GB storage',
      'Advanced API access',
      'Team collaboration',
      'Custom domains',
      'SSO authentication',
      'Custom integrations',
    ],
    testimonial: {
      quote:
        'The enterprise features have helped us maintain compliance while scaling our operations across multiple departments.',
      author: 'Michael Johnson',
      role: 'CTO, Enterprise Solutions Inc.',
      avatar: '/avatars/michael-johnson.jpg',
    },
  },
];

export default function PricingSectionTestimonial() {
  return (
    <section className="bg-muted/30 w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Pricing Plans Trusted by Thousands
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed">
              Choose the perfect plan for your needs and join our satisfied
              customers.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="flex flex-col gap-8">
              <Card
                className={cn(
                  'relative flex flex-1 flex-col',
                  plan.popular && 'border-primary shadow-md'
                )}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-tr-lg rounded-bl-lg px-3 py-1 text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 text-sm">
                      /month
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {plan.description}
                  </p>
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

              <Card className="bg-background/50 pt-0">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="space-y-4">
                      <p className="text-muted-foreground italic">
                        &quot;{plan.testimonial.quote}&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {plan.testimonial.author
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                          <AvatarImage
                            src={plan.testimonial.avatar}
                            alt={plan.testimonial.author}
                          />
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {plan.testimonial.author}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {plan.testimonial.role}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="fill-primary text-primary h-4 w-4"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="bg-card mx-auto mt-16 max-w-3xl rounded-lg border p-8 text-center">
          <h3 className="text-xl font-medium">
            Not sure which plan is right for you?
          </h3>
          <p className="text-muted-foreground mt-2">
            Our team can help you find the perfect plan for your specific needs.
          </p>
          <Button className="mt-6" asChild>
            <a href="#">Talk to Sales</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
