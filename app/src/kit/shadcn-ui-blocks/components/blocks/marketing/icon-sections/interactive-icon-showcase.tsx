import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../ui/collapsible';
import { cn } from '@/arc-shims/kit-utils';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Rocket,
  Leaf,
  BarChart,
  ShieldCheck,
  Globe,
  Zap,
  Laptop,
  Smartphone,
  TabletSmartphone,
  Clock,
  LockKeyhole,
  Search,
  RefreshCcw,
  HeartHandshake,
  CreditCard,
  Radar,
  Network,
} from 'lucide-react';

interface IconFeature {
  id: string;
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
  benefits: string[];
  expanded?: boolean;
}

export default function InteractiveIconShowcase() {
  const [features, setFeatures] = useState<IconFeature[]>([
    {
      id: 'automation',
      icon: <Sparkles className="h-8 w-8" />,
      iconColor: 'bg-amber-100 text-amber-600',
      title: 'Smart Automation',
      description:
        'Automate repetitive tasks with intelligent workflows that adapt to your business processes.',
      benefits: [
        'Save up to 15 hours per week on manual tasks',
        'Reduce errors by 75% with automated validation',
        'Create custom workflows without coding',
        'Connect to 300+ external services and APIs',
      ],
      expanded: false,
    },
    {
      id: 'performance',
      icon: <Rocket className="h-8 w-8" />,
      iconColor: 'bg-blue-100 text-blue-600',
      title: 'Blazing Performance',
      description:
        'Experience unmatched speed with our optimized architecture and global edge network.',
      benefits: [
        '99.9% uptime guarantee with redundant systems',
        'Average page load under 1.2 seconds globally',
        'Automatic content optimization and caching',
        'Real-time monitoring and auto-scaling',
      ],
      expanded: false,
    },
    {
      id: 'sustainability',
      icon: <Leaf className="h-8 w-8" />,
      iconColor: 'bg-green-100 text-green-600',
      title: 'Eco-Friendly Cloud',
      description:
        'Our carbon-neutral infrastructure is powered by 100% renewable energy sources.',
      benefits: [
        'Reduce your digital carbon footprint by 40%',
        'Energy-efficient data centers worldwide',
        'Carbon offset programs for all operations',
        'Transparent sustainability reporting',
      ],
      expanded: false,
    },
    {
      id: 'analytics',
      icon: <BarChart className="h-8 w-8" />,
      iconColor: 'bg-violet-100 text-violet-600',
      title: 'Advanced Analytics',
      description:
        'Gain deep insights with our comprehensive analytics and reporting dashboard.',
      benefits: [
        'Real-time data visualization and reporting',
        'Customizable KPI tracking and alerts',
        'AI-powered pattern recognition and forecasting',
        'Export capabilities in multiple formats',
      ],
      expanded: false,
    },
    {
      id: 'security',
      icon: <ShieldCheck className="h-8 w-8" />,
      iconColor: 'bg-red-100 text-red-600',
      title: 'Enterprise Security',
      description:
        'Protect your data with military-grade encryption and advanced security protocols.',
      benefits: [
        'SOC 2 Type II, GDPR, and HIPAA compliant',
        'Multi-factor authentication and SSO integration',
        'End-to-end encryption for all data',
        'Regular penetration testing and security audits',
      ],
      expanded: false,
    },
    {
      id: 'global',
      icon: <Globe className="h-8 w-8" />,
      iconColor: 'bg-cyan-100 text-cyan-600',
      title: 'Global Reach',
      description:
        'Connect with users worldwide through our distributed infrastructure and localization tools.',
      benefits: [
        'Content delivery in 200+ countries and territories',
        'Automatic language detection and translation',
        'Regional compliance management',
        'Local payment methods for global commerce',
      ],
      expanded: false,
    },
    {
      id: 'speed',
      icon: <Zap className="h-8 w-8" />,
      iconColor: 'bg-yellow-100 text-yellow-600',
      title: 'Instant Deployment',
      description:
        'Deploy changes instantly with zero downtime using our continuous delivery pipeline.',
      benefits: [
        'One-click deployments to any environment',
        'Automated testing before deployment',
        'Instant rollback capabilities',
        'Canary and blue/green deployment options',
      ],
      expanded: false,
    },
    {
      id: 'responsive',
      icon: <Laptop className="h-8 w-8" />,
      iconColor: 'bg-indigo-100 text-indigo-600',
      title: 'Fully Responsive',
      description:
        'Deliver perfect experiences across all devices with our adaptive design system.',
      benefits: [
        'Optimized layouts for desktop, tablet, and mobile',
        'Accessibility compliant (WCAG 2.1 AA)',
        'Cross-browser compatibility',
        'Progressive web app capabilities',
      ],
      expanded: false,
    },
    {
      id: 'mobile',
      icon: <Smartphone className="h-8 w-8" />,
      iconColor: 'bg-pink-100 text-pink-600',
      title: 'Mobile-First Design',
      description:
        'Create exceptional mobile experiences with our touch-optimized components.',
      benefits: [
        'Native-like performance on mobile devices',
        'Optimized for touch and gesture interactions',
        'Offline capabilities and local storage',
        'Push notification support',
      ],
      expanded: false,
    },
    {
      id: 'multiplatform',
      icon: <TabletSmartphone className="h-8 w-8" />,
      iconColor: 'bg-orange-100 text-orange-600',
      title: 'Cross-Platform Support',
      description:
        'Build once and deploy everywhere with our unified development platform.',
      benefits: [
        'Single codebase for iOS, Android, and web',
        'Native API access on all platforms',
        'Consistent UI across operating systems',
        'Shared business logic with platform-specific UIs',
      ],
      expanded: false,
    },
    {
      id: 'realtime',
      icon: <Clock className="h-8 w-8" />,
      iconColor: 'bg-emerald-100 text-emerald-600',
      title: 'Real-Time Updates',
      description:
        'Keep users in sync with instant updates and live collaborative features.',
      benefits: [
        'WebSocket-based real-time data synchronization',
        'Collaborative editing with conflict resolution',
        'Live user presence indicators',
        'Event-driven architecture for immediate reactions',
      ],
      expanded: false,
    },
    {
      id: 'privacy',
      icon: <LockKeyhole className="h-8 w-8" />,
      iconColor: 'bg-slate-100 text-slate-600',
      title: 'Privacy Controls',
      description:
        'Give users complete control over their data with granular privacy settings.',
      benefits: [
        'User consent management system',
        'Data anonymization and pseudonymization',
        'Self-service data access and deletion',
        'Privacy by design architecture',
      ],
      expanded: false,
    },
    {
      id: 'search',
      icon: <Search className="h-8 w-8" />,
      iconColor: 'bg-purple-100 text-purple-600',
      title: 'Intelligent Search',
      description:
        'Find anything instantly with our powerful search engine and AI-powered recommendations.',
      benefits: [
        'Full-text search with typo tolerance',
        'Natural language processing capabilities',
        'Personalized search results based on user behavior',
        'Faceted search with dynamic filtering',
      ],
      expanded: false,
    },
    {
      id: 'sync',
      icon: <RefreshCcw className="h-8 w-8" />,
      iconColor: 'bg-teal-100 text-teal-600',
      title: 'Cross-Device Sync',
      description:
        'Seamlessly transition between devices with automatic data synchronization.',
      benefits: [
        'Real-time data sync across all devices',
        'Offline-first architecture with conflict resolution',
        'Bandwidth-efficient delta syncing',
        'Selective sync for large datasets',
      ],
      expanded: false,
    },
    {
      id: 'support',
      icon: <HeartHandshake className="h-8 w-8" />,
      iconColor: 'bg-rose-100 text-rose-600',
      title: 'Premium Support',
      description:
        'Get help when you need it from our dedicated support team and extensive knowledge base.',
      benefits: [
        '24/7 support via chat, email, and phone',
        'Dedicated account managers for enterprise plans',
        'Comprehensive documentation and tutorials',
        'Regular training sessions and webinars',
      ],
      expanded: false,
    },
    {
      id: 'payments',
      icon: <CreditCard className="h-8 w-8" />,
      iconColor: 'bg-neutral-100 text-neutral-600',
      title: 'Secure Payments',
      description:
        'Process payments securely with our PCI-compliant payment processing system.',
      benefits: [
        'Support for 50+ payment methods globally',
        'Anti-fraud detection and prevention',
        'Subscription billing and management',
        'Seamless checkout experience with one-click payments',
      ],
      expanded: false,
    },
    {
      id: 'monitoring',
      icon: <Radar className="h-8 w-8" />,
      iconColor: 'bg-fuchsia-100 text-fuchsia-600',
      title: 'Proactive Monitoring',
      description:
        'Stay ahead of issues with real-time monitoring and predictive maintenance.',
      benefits: [
        'Real-time performance and error monitoring',
        'Anomaly detection and predictive alerts',
        'Detailed logging and diagnostic tools',
        'Automated incident response workflows',
      ],
      expanded: false,
    },
    {
      id: 'integrations',
      icon: <Network className="h-8 w-8" />,
      iconColor: 'bg-sky-100 text-sky-600',
      title: 'Seamless Integrations',
      description:
        'Connect with your favorite tools through our extensive integration ecosystem.',
      benefits: [
        'One-click integration with popular platforms',
        'Custom webhook support for any service',
        'Bi-directional data synchronization',
        'No-code integration builder',
      ],
      expanded: false,
    },
  ]);

  const handleFeatureToggle = (id: string) => {
    setFeatures(
      features.map((feature) =>
        feature.id === id
          ? { ...feature, expanded: !feature.expanded }
          : feature
      )
    );
  };

  return (
    <section className="bg-background w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Features</Badge>
          <h2 className="max-w-[800px] text-3xl font-bold tracking-tighter sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            Explore our comprehensive suite of features designed to help your
            business thrive
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <Collapsible
              key={feature.id}
              open={feature.expanded}
              onOpenChange={() => handleFeatureToggle(feature.id)}
              className="w-full"
            >
              <Card
                className={cn(
                  'overflow-hidden p-0 transition-all duration-200',
                  feature.expanded ? 'shadow-md' : 'hover:shadow-sm'
                )}
              >
                <CollapsibleTrigger className="w-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            'flex h-12 w-12 items-center justify-center rounded-full',
                            feature.iconColor
                          )}
                        >
                          {feature.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-medium">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-1 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={cn(
                          'text-muted-foreground h-5 w-5 transition-transform duration-200',
                          feature.expanded && 'rotate-90'
                        )}
                      />
                    </div>
                  </CardContent>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-6 pt-0 pb-6">
                    <div className="border-t pt-4">
                      <p className="mb-3 text-sm">{feature.description}</p>
                      <h4 className="mb-2 text-sm font-medium">
                        Key Benefits:
                      </h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="outline" size="lg" className="group" asChild>
            <a href="#">
              Compare all features
              <ChevronDown className="ml-2 h-4 w-4" />
            </a>
          </Button>

          <Button size="lg" className="group" asChild>
            <a href="#">
              Start your free trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
