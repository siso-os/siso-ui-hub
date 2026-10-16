import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Compass,
  FileText,
  LifeBuoy,
  Lightbulb,
  Rocket,
  Settings,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface FeatureCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  expandedDescription: string;
  benefits: string[];
  color: string;
}

export default function ExpandableIconCards() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const features: FeatureCard[] = [
    {
      id: 'security',
      icon: <ShieldCheck className="h-6 w-6" />,
      title: 'Enterprise Security',
      shortDescription: 'Bank-grade protection for your sensitive data.',
      expandedDescription:
        'Our comprehensive security approach uses multi-layered defenses, continuous monitoring, and regular third-party audits to keep your data protected at every level.',
      benefits: [
        'End-to-end encryption for all data transmission',
        'SOC 2 Type II and ISO 27001 certified',
        'Regular penetration testing',
        'Automated threat detection and response',
      ],
      color:
        'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900',
    },
    {
      id: 'ai',
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'AI-Powered Insights',
      shortDescription: 'Smart analytics that help guide better decisions.',
      expandedDescription:
        'Our artificial intelligence algorithms continuously analyze your data to provide actionable insights, predictive recommendations, and automated optimizations.',
      benefits: [
        'Predictive analytics and trend forecasting',
        'Anomaly detection for unusual patterns',
        'Automated recommendation engine',
        'Natural language processing for data queries',
      ],
      color:
        'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-900',
    },
    {
      id: 'scaling',
      icon: <Rocket className="h-6 w-6" />,
      title: 'Seamless Scaling',
      shortDescription: 'Grow without limits as your business expands.',
      expandedDescription:
        'Built on a modern cloud architecture, our platform dynamically scales to accommodate growing data volumes, user bases, and processing requirements without performance degradation.',
      benefits: [
        'Auto-scaling infrastructure',
        'Zero downtime deployments',
        'Global CDN for fast access worldwide',
        'Elastic resource allocation',
      ],
      color:
        'bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900',
    },
    {
      id: 'integration',
      icon: <Compass className="h-6 w-6" />,
      title: 'Universal Integration',
      shortDescription: 'Connect with all your essential tools and services.',
      expandedDescription:
        'We provide extensive integration capabilities through RESTful APIs, webhooks, and pre-built connectors for seamless data flow between your existing software ecosystem.',
      benefits: [
        '200+ pre-built integrations with popular tools',
        'Open API with comprehensive documentation',
        'Custom webhook support',
        'Bi-directional data synchronization',
      ],
      color:
        'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-900',
    },
    {
      id: 'customization',
      icon: <Settings className="h-6 w-6" />,
      title: 'Deep Customization',
      shortDescription: 'Tailor every aspect to match your unique workflows.',
      expandedDescription:
        'Every business is different, which is why our platform offers extensive customization options - from visual themes to complex business logic and workflow automation.',
      benefits: [
        'Drag-and-drop interface builder',
        'Custom fields and data models',
        'Workflow rule engine',
        'White-labeling options',
      ],
      color:
        'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-900',
    },
    {
      id: 'performance',
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Performance',
      shortDescription: 'Blazing fast response times for optimal productivity.',
      expandedDescription:
        'Our architecture is optimized for speed at every level - from the database layer to the frontend rendering - ensuring your team never waits for the software to catch up.',
      benefits: [
        'Sub-second response times',
        'Optimized database queries',
        'Efficient content delivery',
        'Background processing for heavy tasks',
      ],
      color:
        'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-900',
    },
    {
      id: 'support',
      icon: <LifeBuoy className="h-6 w-6" />,
      title: '24/7 Expert Support',
      shortDescription: 'Always available assistance when you need it most.',
      expandedDescription:
        'Our dedicated support team is available around the clock to help with any questions or issues you might encounter, with multiple communication channels to suit your preferences.',
      benefits: [
        'Live chat, email, and phone support',
        'Guaranteed response times',
        'Dedicated success manager',
        'Comprehensive knowledge base',
      ],
      color:
        'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-900',
    },
    {
      id: 'compliance',
      icon: <FileText className="h-6 w-6" />,
      title: 'Global Compliance',
      shortDescription: 'Meet regulatory requirements across jurisdictions.',
      expandedDescription:
        'Stay compliant with industry regulations and data privacy laws with our comprehensive compliance features, regular audits, and built-in controls for data governance.',
      benefits: [
        'GDPR, CCPA, HIPAA compliance controls',
        'Audit logging and reporting',
        'Data retention policies',
        'Role-based access control',
      ],
      color:
        'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-900',
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful capabilities, simplified
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore the comprehensive feature set that gives our platform a
            competitive edge. Click on any card to learn more about each
            feature.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                'relative flex flex-col rounded-lg transition-all duration-300',
                expandedCardId === feature.id
                  ? 'col-span-1 row-span-2 shadow-lg md:col-span-2'
                  : 'shadow-sm hover:shadow-md'
              )}
            >
              <div
                className={cn(
                  'flex-1 overflow-hidden rounded-lg border',
                  expandedCardId === feature.id
                    ? 'flex h-full flex-col'
                    : 'cursor-pointer',
                  feature.color
                )}
                onClick={() => toggleCard(feature.id)}
              >
                {/* Card Header - Always visible */}
                <div className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/80 dark:bg-black/20">
                    {feature.icon}
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="mb-2 text-xl font-semibold">
                        {feature.title}
                      </h3>
                      <div className="flex-shrink-0">
                        {expandedCardId === feature.id ? (
                          <ChevronUp className="text-muted-foreground h-5 w-5" />
                        ) : (
                          <ChevronDown className="text-muted-foreground h-5 w-5" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm">{feature.shortDescription}</p>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedCardId === feature.id && (
                  <div className="flex flex-grow flex-col p-6 pt-0">
                    <div className="mt-2 mb-4">
                      <p className="text-muted-foreground dark:text-muted-foreground">
                        {feature.expandedDescription}
                      </p>
                    </div>

                    <div className="mb-4 rounded-lg bg-white/60 p-4 dark:bg-gray-800/80">
                      <h4 className="mb-2 font-medium">Key Benefits</h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="flex-shrink-0">
                              <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                            </div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <Button
                        variant="outline"
                        className="group w-full justify-center dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        asChild
                      >
                        <a href="#">
                          Learn more about {feature.title}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild className="group dark:hover:bg-primary/90">
            <a href="#">
              View full feature list
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
