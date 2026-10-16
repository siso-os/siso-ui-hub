import { useState } from 'react';
import { Button } from '../../../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';
import { ArrowRight, Check, Code2, LineChart, RefreshCw, Search, Settings, ShieldCheck, Users, Wand2, Zap } from 'lucide-react';

import { cn } from '@/arc-shims/kit-utils';

import type { ComponentType, SVGProps } from 'react';

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  image: string;
  imageAlt: string;
  status: 'New' | 'Popular' | 'Coming Soon' | null;
}

const features: Feature[] = [
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description:
      'Gain deep insights into your data with our comprehensive analytics suite.',
    icon: LineChart,
    benefits: [
      'Real-time reporting and dashboards',
      'Custom metrics and KPIs',
      'Data visualization tools',
      'Export capabilities',
      'Predictive analysis',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Analytics dashboard with charts and graphs',
    status: 'Popular',
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description:
      'Keep your data secure with our industry-leading security features.',
    icon: ShieldCheck,
    benefits: [
      'End-to-end encryption',
      'Two-factor authentication',
      'Role-based access control',
      'Security audit logs',
      'Compliance with industry standards',
    ],
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Security interface showing protection features',
    status: null,
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    description:
      'Automate repetitive tasks and streamline your business processes.',
    icon: RefreshCw,
    benefits: [
      'Visual workflow builder',
      'Trigger-based automations',
      'Integration with third-party services',
      'Scheduled tasks and reminders',
      'Custom automation rules',
    ],
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Automation workflow diagram',
    status: 'New',
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with tools designed for modern teams.',
    icon: Users,
    benefits: [
      'Real-time document editing',
      'Team chat and messaging',
      'Project management tools',
      'Task assignments and tracking',
      'Version history and control',
    ],
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Team collaborating around a table with laptops',
    status: null,
  },
  {
    id: 'ai',
    title: 'AI Assistant',
    description:
      'Leverage artificial intelligence to boost productivity and gain insights.',
    icon: Wand2,
    benefits: [
      'Smart content generation',
      'Data pattern recognition',
      'Automated recommendations',
      'Conversational interface',
      'Learning from your usage patterns',
    ],
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'AI visualization showing machine learning capabilities',
    status: 'Coming Soon',
  },
  {
    id: 'api',
    title: 'Developer API',
    description: 'Build custom integrations and extend platform functionality.',
    icon: Code2,
    benefits: [
      'Comprehensive documentation',
      'RESTful API endpoints',
      'Webhooks for real-time events',
      'SDKs for popular languages',
      'API request monitoring',
    ],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Developer writing code on multiple screens',
    status: null,
  },
  {
    id: 'customization',
    title: 'Advanced Customization',
    description:
      'Tailor the platform to your specific needs with extensive customization options.',
    icon: Settings,
    benefits: [
      'Custom fields and attributes',
      'Branding and white-labeling',
      'Layout and design options',
      'Workflow customization',
      'Module-based architecture',
    ],
    image:
      'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Customization interface with design options',
    status: null,
  },
];

export default function FeatureAccordion() {
  const [expandedFeature, setExpandedFeature] = useState<string>('analytics');
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);

  const activeFeature =
    features.find((f) => f.id === expandedFeature) || features[0]!;

  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mb-16 space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Comprehensive Features
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Explore our powerful tools and capabilities designed to help your
          business grow
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <Accordion
            type="single"
            value={expandedFeature}
            onValueChange={setExpandedFeature}
            collapsible
            className="w-full"
          >
            {features.map((feature) => (
              <AccordionItem
                key={feature.id}
                value={feature.id}
                className={cn(
                  'mb-3 rounded-lg border px-2',
                  expandedFeature === feature.id
                    ? 'border-primary shadow-sm'
                    : 'border-border'
                )}
              >
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div
                      className={cn(
                        'flex-shrink-0 rounded-md p-2',
                        expandedFeature === feature.id
                          ? 'bg-primary/10'
                          : 'bg-muted'
                      )}
                    >
                      <feature.icon
                        className={cn(
                          'h-5 w-5',
                          expandedFeature === feature.id
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        )}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{feature.title}</h3>
                        {feature.status && (
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-xs',
                              feature.status === 'New'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : feature.status === 'Popular'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                            )}
                          >
                            {feature.status}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground line-clamp-1 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pr-4 pb-4 pl-12">
                  <p className="text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm"
                        onMouseEnter={() => setHoveredBenefit(benefit)}
                        onMouseLeave={() => setHoveredBenefit(null)}
                      >
                        <div
                          className={cn(
                            'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                            hoveredBenefit === benefit
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-primary/10 text-primary'
                          )}
                        >
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6">
            <Button asChild size="lg" className="w-full">
              <a href="#">
                Explore all features <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-3">
          <div className="sticky top-24">
            <div className="from-muted/50 to-muted rounded-2xl bg-gradient-to-br p-6 lg:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-background rounded-full p-2">
                    <activeFeature.icon className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {activeFeature.title}
                  </h3>
                </div>
                {activeFeature.status && (
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs',
                      activeFeature.status === 'New'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : activeFeature.status === 'Popular'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    )}
                  >
                    {activeFeature.status}
                  </span>
                )}
              </div>

              <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src={activeFeature.image}
                  alt={activeFeature.imageAlt}
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {activeFeature.description}
                </p>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {activeFeature.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button variant="outline" asChild>
                    <a href="#">Learn more about {activeFeature.title}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 mt-24 rounded-xl p-8 lg:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              Ready to experience all features?
            </h3>
            <p className="text-muted-foreground">
              Start your free trial today. No credit card required.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" asChild>
              <a href="#">
                <Search className="mr-2 h-4 w-4" />
                Schedule a demo
              </a>
            </Button>
            <Button asChild>
              <a href="#">
                <Zap className="mr-2 h-4 w-4" />
                Start free trial
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
