import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';
import { QuoteIcon } from 'lucide-react';

type CustomerTestimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  companyLogo: string;
  metric: {
    value: string;
    label: string;
  };
};

const testimonials: CustomerTestimonial[] = [
  {
    id: '1',
    quote:
      'Implementing this solution helped us improve our conversion rates dramatically while reducing our customer acquisition costs.',
    author: 'Sarah Johnson',
    role: 'VP of Marketing',
    company: 'TechNova',
    companyLogo: '/logos/technova.svg',
    metric: {
      value: '127%',
      label: 'conversion increase',
    },
  },
  {
    id: '2',
    quote:
      "We've seen unprecedented growth in our customer retention metrics since adopting this platform. The ROI has been extraordinary.",
    author: 'Michael Rodriguez',
    role: 'Customer Success Director',
    company: 'Evergreen Solutions',
    companyLogo: '/logos/evergreen.svg',
    metric: {
      value: '3.5x',
      label: 'customer retention',
    },
  },
  {
    id: '3',
    quote:
      'This platform streamlined our entire marketing workflow. What used to take us days now takes just hours, with better results.',
    author: 'Emily Chen',
    role: 'CMO',
    company: 'StratoScale',
    companyLogo: '/logos/stratoscale.svg',
    metric: {
      value: '68%',
      label: 'time saved',
    },
  },
];

const globalStats = [
  { value: '10,000+', label: 'Businesses Trusting Us' },
  { value: '$320M', label: 'Revenue Generated' },
  { value: '94%', label: 'Customer Satisfaction' },
  { value: '150+', label: 'Countries Served' },
];

export default function CustomerTestimonial() {
  return (
    <div className="relative container mx-auto overflow-hidden px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Background decorative elements */}
      <div className="bg-primary/10 absolute top-0 right-0 h-96 w-96 translate-x-1/4 -translate-y-1/4 rounded-full opacity-50 blur-3xl" />
      <div className="bg-primary/10 absolute bottom-0 left-0 h-96 w-96 -translate-x-1/4 translate-y-1/4 rounded-full opacity-50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <Badge className="mb-4">Trusted Worldwide</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Real Results from Real Customers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Our platform doesn&apos;t just make promises — it delivers
            measurable impact for businesses across industries.
          </p>
        </div>

        {/* Global Stats */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {globalStats.map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                {stat.value}
              </h3>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Featured testimonials */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden p-0">
              <CardContent className="flex h-full flex-col p-6 md:p-8">
                {/* Company logo placeholder */}
                <div className="bg-muted/40 mb-4 flex h-8 w-auto items-center rounded px-3">
                  <span className="text-sm font-medium">
                    {testimonial.company}
                  </span>
                </div>

                {/* Key metric */}
                <div className="bg-primary/10 mb-6 rounded-lg p-4 text-center">
                  <div className="text-primary mb-1 text-3xl font-bold md:text-4xl">
                    {testimonial.metric.value}
                  </div>
                  <div className="text-primary/80 text-sm font-medium">
                    {testimonial.metric.label}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-6 flex-grow">
                  <QuoteIcon className="text-muted-foreground/20 absolute -top-1 -left-1 h-8 w-8" />
                  <blockquote className="text-muted-foreground relative pl-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author info */}
                <div className="mt-auto">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            Join thousands of forward-thinking businesses already transforming
            their marketing with our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-8 py-2 text-sm font-medium shadow">
              Start Free Trial
            </button>
            <button className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-8 py-2 text-sm font-medium shadow-sm">
              View Customer Stories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
