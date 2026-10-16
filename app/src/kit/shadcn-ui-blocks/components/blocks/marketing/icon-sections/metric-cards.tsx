import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

import {
  CreditCard,
  LineChart,
  Lock,
  RefreshCw,
  Server,
  Shield,
  Users,
  Zap,
} from 'lucide-react';

interface MetricCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  changePercentage: number;
  description: string;
  details: string;
  links: Array<{ text: string; href: string }>;
  color: string;
}

// Custom component for the FileCheck icon since it's not available in lucide-react
const FileCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 15 2 2 4-4" />
  </svg>
);

export default function MetricCards() {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    'performance'
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const metrics: Record<string, MetricCard[]> = {
    performance: [
      {
        id: 'response-time',
        icon: <Zap className="h-6 w-6" />,
        title: 'Response Time',
        value: '32ms',
        changePercentage: -18,
        description: 'Average server response time',
        details:
          "Response time measures how quickly our servers respond to client requests. We've achieved an 18% improvement by implementing edge computing and optimizing database queries.",
        links: [
          { text: 'Performance Report', href: '#' },
          { text: 'Optimize Your App', href: '#' },
        ],
        color: 'from-amber-500 to-orange-600',
      },
      {
        id: 'uptime',
        icon: <Server className="h-6 w-6" />,
        title: 'Uptime',
        value: '99.99%',
        changePercentage: 0.02,
        description: 'Service availability last 30 days',
        details:
          'Our platform maintains a consistent 99.99% uptime, equivalent to less than 5 minutes of downtime per month. This is achieved through redundant systems and proactive monitoring.',
        links: [
          { text: 'Status Page', href: '#' },
          { text: 'SLA Details', href: '#' },
        ],
        color: 'from-green-500 to-emerald-600',
      },
      {
        id: 'requests',
        icon: <RefreshCw className="h-6 w-6" />,
        title: 'Requests/Sec',
        value: '45K',
        changePercentage: 32,
        description: 'Peak requests per second',
        details:
          'Our infrastructure handles up to 45,000 requests per second during peak hours. This represents a 32% increase in capacity from our previous quarter through horizontal scaling.',
        links: [
          { text: 'Scaling Solutions', href: '#' },
          { text: 'API Documentation', href: '#' },
        ],
        color: 'from-blue-500 to-indigo-600',
      },
    ],
    security: [
      {
        id: 'blocked-threats',
        icon: <Shield className="h-6 w-6" />,
        title: 'Threats Blocked',
        value: '1.2M+',
        changePercentage: 24,
        description: 'Malicious requests blocked monthly',
        details:
          'Our advanced security systems blocked over 1.2 million potential threats last month, including DDoS attempts, SQL injections, and cross-site scripting attacks.',
        links: [
          { text: 'Security Whitepaper', href: '#' },
          { text: 'Threat Protection', href: '#' },
        ],
        color: 'from-red-500 to-rose-600',
      },
      {
        id: 'encryption',
        icon: <Lock className="h-6 w-6" />,
        title: 'Encryption',
        value: '256-bit',
        changePercentage: 0,
        description: 'End-to-end data encryption',
        details:
          'All data is protected with 256-bit AES encryption in transit and at rest. We implement TLS 1.3 protocols and regular key rotation for maximum protection.',
        links: [
          { text: 'Compliance Info', href: '#' },
          { text: 'Privacy Policy', href: '#' },
        ],
        color: 'from-purple-500 to-violet-600',
      },
      {
        id: 'compliance',
        icon: <FileCheck className="h-6 w-6" />,
        title: 'Compliance',
        value: '100%',
        changePercentage: 0,
        description: 'SOC2, GDPR, HIPAA compliant',
        details:
          'Our platform maintains full compliance with major regulatory frameworks including SOC2, GDPR, HIPAA, and more. Annual audits ensure continuous adherence to these standards.',
        links: [
          { text: 'Certification Details', href: '#' },
          { text: 'Compliance Guide', href: '#' },
        ],
        color: 'from-cyan-500 to-teal-600',
      },
    ],
    usage: [
      {
        id: 'active-users',
        icon: <Users className="h-6 w-6" />,
        title: 'Active Users',
        value: '2.4M',
        changePercentage: 17,
        description: 'Monthly active users',
        details:
          'Our platform serves 2.4 million monthly active users, representing 17% growth from the previous quarter. User engagement metrics have improved across all key demographics.',
        links: [
          { text: 'User Analytics', href: '#' },
          { text: 'Growth Strategies', href: '#' },
        ],
        color: 'from-blue-400 to-blue-600',
      },
      {
        id: 'data-processed',
        icon: <LineChart className="h-6 w-6" />,
        title: 'Data Processed',
        value: '8.7 PB',
        changePercentage: 42,
        description: 'Petabytes processed monthly',
        details:
          'Our systems process 8.7 petabytes of data per month, enabling real-time analytics and insights for our customers while maintaining performance and cost efficiency.',
        links: [
          { text: 'Data Solutions', href: '#' },
          { text: 'Analytics Platform', href: '#' },
        ],
        color: 'from-emerald-400 to-emerald-600',
      },
      {
        id: 'transactions',
        icon: <CreditCard className="h-6 w-6" />,
        title: 'Transactions',
        value: '$740M',
        changePercentage: 28,
        description: 'Monthly transaction volume',
        details:
          'We securely process $740 million in transactions monthly with a 99.999% success rate. Our payment infrastructure supports 135+ currencies and all major payment methods.',
        links: [
          { text: 'Payment Solutions', href: '#' },
          { text: 'Integration Guide', href: '#' },
        ],
        color: 'from-purple-400 to-purple-600',
      },
    ],
  };

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Metrics Dashboard</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Key performance indicators
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Get a real-time view of our platform&apos;s performance metrics and
            success indicators.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {/* Performance Metrics */}
          <div className="overflow-hidden rounded-lg border">
            <button
              onClick={() => toggleSection('performance')}
              className="bg-muted/50 hover:bg-muted flex w-full items-center justify-between p-4 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-semibold">Performance Metrics</h3>
              </div>
              {expandedSection === 'performance' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSection === 'performance' && (
              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {metrics.performance!.map((metric) => (
                  <div
                    key={metric.id}
                    className="overflow-hidden rounded-lg border"
                  >
                    <div
                      className={`bg-gradient-to-r ${metric.color} p-4 text-white`}
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="rounded-md bg-white/20 p-2">
                          {metric.icon}
                        </div>
                        <div
                          className={cn(
                            'flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-medium',
                            metric.changePercentage > 0
                              ? 'bg-green-500/20'
                              : metric.changePercentage < 0
                                ? 'bg-amber-500/20'
                                : 'bg-blue-500/20'
                          )}
                        >
                          {metric.changePercentage > 0 ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : metric.changePercentage < 0 ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            ''
                          )}
                          {Math.abs(metric.changePercentage)}%
                        </div>
                      </div>

                      <h4 className="mb-1 text-sm font-medium">
                        {metric.title}
                      </h4>
                      <p className="text-3xl font-bold">{metric.value}</p>
                      <p className="mt-1 text-sm text-white/80">
                        {metric.description}
                      </p>
                    </div>

                    <div className="bg-background p-4">
                      <p className="text-muted-foreground mb-4 text-sm">
                        {metric.details}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {metric.links.map((link, i) => (
                          <Button key={i} variant="outline" size="sm" asChild>
                            <a href={link.href}>{link.text}</a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security Metrics */}
          <div className="overflow-hidden rounded-lg border">
            <button
              onClick={() => toggleSection('security')}
              className="bg-muted/50 hover:bg-muted flex w-full items-center justify-between p-4 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">Security & Compliance</h3>
              </div>
              {expandedSection === 'security' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSection === 'security' && (
              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {metrics.security!.map((metric) => (
                  <div
                    key={metric.id}
                    className="overflow-hidden rounded-lg border"
                  >
                    <div
                      className={`bg-gradient-to-r ${metric.color} p-4 text-white`}
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="rounded-md bg-white/20 p-2">
                          {metric.icon}
                        </div>
                        <div
                          className={cn(
                            'flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-medium',
                            metric.changePercentage > 0
                              ? 'bg-green-500/20'
                              : metric.changePercentage < 0
                                ? 'bg-amber-500/20'
                                : 'bg-blue-500/20'
                          )}
                        >
                          {metric.changePercentage > 0 ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : metric.changePercentage < 0 ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            ''
                          )}
                          {Math.abs(metric.changePercentage)}%
                        </div>
                      </div>

                      <h4 className="mb-1 text-sm font-medium">
                        {metric.title}
                      </h4>
                      <p className="text-3xl font-bold">{metric.value}</p>
                      <p className="mt-1 text-sm text-white/80">
                        {metric.description}
                      </p>
                    </div>

                    <div className="bg-background p-4">
                      <p className="text-muted-foreground mb-4 text-sm">
                        {metric.details}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {metric.links.map((link, i) => (
                          <Button key={i} variant="outline" size="sm" asChild>
                            <a href={link.href}>{link.text}</a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Usage Metrics */}
          <div className="overflow-hidden rounded-lg border">
            <button
              onClick={() => toggleSection('usage')}
              className="bg-muted/50 hover:bg-muted flex w-full items-center justify-between p-4 transition-colors"
            >
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Usage & Growth</h3>
              </div>
              {expandedSection === 'usage' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSection === 'usage' && (
              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {metrics.usage!.map((metric) => (
                  <div
                    key={metric.id}
                    className="overflow-hidden rounded-lg border"
                  >
                    <div
                      className={`bg-gradient-to-r ${metric.color} p-4 text-white`}
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="rounded-md bg-white/20 p-2">
                          {metric.icon}
                        </div>
                        <div
                          className={cn(
                            'flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-medium',
                            metric.changePercentage > 0
                              ? 'bg-green-500/20'
                              : metric.changePercentage < 0
                                ? 'bg-amber-500/20'
                                : 'bg-blue-500/20'
                          )}
                        >
                          {metric.changePercentage > 0 ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : metric.changePercentage < 0 ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            ''
                          )}
                          {Math.abs(metric.changePercentage)}%
                        </div>
                      </div>

                      <h4 className="mb-1 text-sm font-medium">
                        {metric.title}
                      </h4>
                      <p className="text-3xl font-bold">{metric.value}</p>
                      <p className="mt-1 text-sm text-white/80">
                        {metric.description}
                      </p>
                    </div>

                    <div className="bg-background p-4">
                      <p className="text-muted-foreground mb-4 text-sm">
                        {metric.details}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {metric.links.map((link, i) => (
                          <Button key={i} variant="outline" size="sm" asChild>
                            <a href={link.href}>{link.text}</a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-4 text-2xl font-bold">
              Ready to optimize your performance?
            </h3>
            <p className="text-muted-foreground mb-8">
              Our team of experts can help you analyze these metrics and
              identify opportunities for improvement.
            </p>
            <Button asChild size="lg" className="group">
              <a href="#">
                Schedule a consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
