import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../ui/tooltip';
import { cn } from '@/arc-shims/kit-utils';
import { useEffect, useState } from 'react';

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BellRing,
  BookOpen,
  Building2,
  CheckCircle2,
  CloudCog,
  Code2,
  Cog,
  Computer,
  Database,
  Fingerprint,
  Gauge,
  Highlighter,
  Image,
  Layers,
  LineChart,
  Lock,
  Microscope,
  Network,
  Palette,
  RefreshCcw,
  Rocket,
  Search,
  Shield,
  Smartphone,
  Stars,
  Tablet,
  Upload,
  Users,
  Wand2,
  Zap,
} from 'lucide-react';

interface IconFeature {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  highlight?: string;
  info?: string[];
  color: string;
}

export default function IconsWithTooltips() {
  const setMounted = useState(false)[1];

  // Ensure tooltips work only on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const iconFeatures: IconFeature[] = [
    {
      id: 'security',
      name: 'Enterprise Security',
      icon: <Shield className="h-6 w-6" />,
      description: 'Military-grade protection for your most sensitive data',
      highlight: 'SOC 2 Type II and GDPR compliant',
      info: [
        'End-to-end encryption for all data',
        'Advanced threat detection',
        'Regular security audits and penetration testing',
        'Role-based access controls',
      ],
      color: 'red',
    },
    {
      id: 'performance',
      name: 'Lightning Fast',
      icon: <Zap className="h-6 w-6" />,
      description: 'Blazing fast performance with optimized algorithms',
      highlight: '100ms average response time',
      info: [
        'Global edge network for minimal latency',
        'Automatic caching mechanisms',
        'Optimized database queries',
        'Performance monitoring and alerts',
      ],
      color: 'amber',
    },
    {
      id: 'responsive',
      name: 'Fully Responsive',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Perfect user experiences across all devices',
      highlight: 'Mobile-first design approach',
      info: [
        'Adaptive layouts for any screen size',
        'Touch-optimized interactions',
        'Responsive images and media',
        'Consistent performance on all devices',
      ],
      color: 'blue',
    },
    {
      id: 'analytics',
      name: 'Advanced Analytics',
      icon: <LineChart className="h-6 w-6" />,
      description: 'Gain deep insights into your business performance',
      highlight: 'Real-time data visualization',
      info: [
        'Custom dashboard creation',
        'Predictive analytics powered by AI',
        'Goal tracking and conversion funnels',
        'Exportable reports in multiple formats',
      ],
      color: 'violet',
    },
    {
      id: 'payments',
      name: 'Secure Payments',
      icon: <Lock className="h-6 w-6" />,
      description: 'Accept payments securely with our payment gateway',
      highlight: 'PCI DSS Level 1 compliance',
      info: [
        'Support for 50+ payment methods',
        'Anti-fraud detection systems',
        'Subscription billing management',
        'Split payments and marketplace capabilities',
      ],
      color: 'green',
    },
    {
      id: 'uploads',
      name: 'Fast File Uploads',
      icon: <Upload className="h-6 w-6" />,
      description: 'Upload and process files with ease',
      highlight: 'Drag-and-drop interface',
      info: [
        'Multi-file upload support',
        'Auto-compression for images',
        'Progress tracking and resumable uploads',
        'Virus scanning and file validation',
      ],
      color: 'cyan',
    },
    {
      id: 'search',
      name: 'Intelligent Search',
      icon: <Search className="h-6 w-6" />,
      description: 'Find what you need with our powerful search engine',
      highlight: 'Natural language processing',
      info: [
        'Typo-tolerant search algorithm',
        'Contextual result ranking',
        'Faceted search with filters',
        'Search analytics to improve results',
      ],
      color: 'purple',
    },
    {
      id: 'scaling',
      name: 'Infinite Scaling',
      icon: <Layers className="h-6 w-6" />,
      description: 'Scale seamlessly as your business grows',
      highlight: 'Horizontal and vertical scaling',
      info: [
        'Auto-scaling infrastructure',
        'Load balancing across regions',
        'Database sharding for high volume',
        'Performance maintained at any scale',
      ],
      color: 'indigo',
    },
    {
      id: 'notifications',
      name: 'Smart Alerts',
      icon: <BellRing className="h-6 w-6" />,
      description: 'Stay informed with intelligent notifications',
      highlight: 'Customizable alert preferences',
      info: [
        'Real-time notifications across devices',
        'Priority-based alert system',
        'Scheduled and digest notifications',
        'In-app and email delivery options',
      ],
      color: 'pink',
    },
    {
      id: 'collaboration',
      name: 'Team Collaboration',
      icon: <Users className="h-6 w-6" />,
      description: 'Work together seamlessly with your team',
      highlight: 'Real-time document editing',
      info: [
        'Comment and feedback tools',
        'Task assignment and tracking',
        'Version history and change logs',
        'Team activity dashboard',
      ],
      color: 'blue',
    },
    {
      id: 'monitoring',
      name: 'System Monitoring',
      icon: <Activity className="h-6 w-6" />,
      description: "Keep track of your system's health and performance",
      highlight: '24/7 automated monitoring',
      info: [
        'Custom alert thresholds',
        'Incident response automation',
        'Historical performance data',
        'Root cause analysis tools',
      ],
      color: 'emerald',
    },
    {
      id: 'biometric',
      name: 'Biometric Auth',
      icon: <Fingerprint className="h-6 w-6" />,
      description: 'Secure access with advanced biometric authentication',
      highlight: 'Facial and fingerprint recognition',
      info: [
        'Multi-factor authentication options',
        'Liveness detection to prevent spoofing',
        'Secure biometric data storage',
        'Fallback authentication methods',
      ],
      color: 'orange',
    },
    {
      id: 'ai',
      name: 'AI-Powered',
      icon: <Microscope className="h-6 w-6" />,
      description: 'Leverage artificial intelligence throughout the platform',
      highlight: 'Machine learning models',
      info: [
        'Predictive text and suggestions',
        'Content moderation and filtering',
        'Automated data categorization',
        'Personalized user experiences',
      ],
      color: 'fuchsia',
    },
    {
      id: 'customization',
      name: 'Deep Customization',
      icon: <Cog className="h-6 w-6" />,
      description: 'Tailor the platform to your specific needs',
      highlight: 'No-code customization tools',
      info: [
        'Custom fields and data models',
        'Workflow and automation builder',
        'White-label branding options',
        'Custom CSS and styling support',
      ],
      color: 'slate',
    },
    {
      id: 'integrations',
      name: 'Seamless Integration',
      icon: <RefreshCcw className="h-6 w-6" />,
      description: 'Connect with your favorite tools and services',
      highlight: '200+ pre-built integrations',
      info: [
        'Open API and webhook support',
        'OAuth and SSO capabilities',
        'Data sync across platforms',
        'Custom integration development',
      ],
      color: 'sky',
    },
    {
      id: 'backup',
      name: 'Automated Backups',
      icon: <Database className="h-6 w-6" />,
      description: 'Never lose your data with automatic backups',
      highlight: 'Point-in-time recovery',
      info: [
        'Daily automated backups',
        'Geo-redundant storage',
        'Encrypted backup files',
        'One-click restoration process',
      ],
      color: 'rose',
    },
    {
      id: 'documentation',
      name: 'Comprehensive Docs',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Detailed documentation for all features',
      highlight: 'Interactive code examples',
      info: [
        'Step-by-step tutorials',
        'Searchable knowledge base',
        'API reference documentation',
        'Video walkthroughs and demos',
      ],
      color: 'yellow',
    },
    {
      id: 'media',
      name: 'Rich Media Support',
      icon: <img className="h-6 w-6" />,
      description: 'Handle images, videos, and other media with ease',
      highlight: 'Automatic optimization',
      info: [
        'Image cropping and resizing',
        'Video transcoding and streaming',
        'Media CDN for fast delivery',
        'Audio processing and captioning',
      ],
      color: 'lime',
    },
    {
      id: 'speed',
      name: 'Performance Metrics',
      icon: <Gauge className="h-6 w-6" />,
      description: "Monitor and optimize your site's performance",
      highlight: 'Core Web Vitals tracking',
      info: [
        'Page load speed analysis',
        'Resource utilization monitoring',
        'Performance improvement suggestions',
        'Lighthouse score integration',
      ],
      color: 'red',
    },
    {
      id: 'multiplatform',
      name: 'Cross-Platform',
      icon: <Tablet className="h-6 w-6" />,
      description: 'Use on any device or operating system',
      highlight: 'Native apps for all platforms',
      info: [
        'iOS and Android mobile apps',
        'Desktop applications',
        'Progressive web app support',
        'Offline functionality',
      ],
      color: 'teal',
    },
    {
      id: 'seo',
      name: 'SEO Optimization',
      icon: <Highlighter className="h-6 w-6" />,
      description: 'Improve your search engine rankings',
      highlight: 'Automated SEO suggestions',
      info: [
        'Metadata and schema markup',
        'Semantic HTML structure',
        'Performance optimization for ranking',
        'SEO audit and reporting tools',
      ],
      color: 'blue',
    },
    {
      id: 'support',
      name: '24/7 Support',
      icon: <Rocket className="h-6 w-6" />,
      description: 'Get help when you need it from our expert team',
      highlight: '10 minute average response time',
      info: [
        'Chat, email, and phone support',
        'Dedicated customer success manager',
        'Priority support for enterprise plans',
        'Comprehensive help center',
      ],
      color: 'green',
    },
    {
      id: 'designtools',
      name: 'Design Tools',
      icon: <Palette className="h-6 w-6" />,
      description: 'Create beautiful interfaces with our design tools',
      highlight: 'Built-in design system',
      info: [
        'Component library and templates',
        'Visual design editor',
        'Theme customization',
        'Accessibility compliance tools',
      ],
      color: 'pink',
    },
    {
      id: 'devtools',
      name: 'Developer Tools',
      icon: <Code2 className="h-6 w-6" />,
      description: 'Powerful tools for developers to extend functionality',
      highlight: 'Comprehensive API access',
      info: [
        'SDK for multiple languages',
        'CLI for automation tasks',
        'Webhook management',
        'Custom plugin development',
      ],
      color: 'indigo',
    },
    {
      id: 'cloud',
      name: 'Cloud Infrastructure',
      icon: <CloudCog className="h-6 w-6" />,
      description: 'Reliable and secure cloud hosting for your applications',
      highlight: '99.99% uptime guarantee',
      info: [
        'Distributed infrastructure',
        'Automatic failover systems',
        'Regional data compliance',
        'Scalable compute resources',
      ],
      color: 'cyan',
    },
    {
      id: 'errors',
      name: 'Error Monitoring',
      icon: <AlertTriangle className="h-6 w-6" />,
      description: 'Catch and fix errors before they impact users',
      highlight: 'Real-time error tracking',
      info: [
        'Detailed error context',
        'Error grouping and prioritization',
        'Performance impact analysis',
        'Integration with issue trackers',
      ],
      color: 'amber',
    },
    {
      id: 'enterprise',
      name: 'Enterprise Ready',
      icon: <Building2 className="h-6 w-6" />,
      description: 'Features designed for large organization needs',
      highlight: 'SSO and SCIM provisioning',
      info: [
        'Enterprise legal agreements',
        'Compliance certifications',
        'Custom SLAs and support plans',
        'Dedicated environment options',
      ],
      color: 'slate',
    },
    {
      id: 'network',
      name: 'Global Network',
      icon: <Network className="h-6 w-6" />,
      description: 'Worldwide infrastructure for optimal performance',
      highlight: '30+ data centers globally',
      info: [
        'Regional routing optimization',
        'DDoS protection included',
        'Anycast DNS infrastructure',
        'Low-latency global connectivity',
      ],
      color: 'violet',
    },
    {
      id: 'automation',
      name: 'Workflow Automation',
      icon: <Wand2 className="h-6 w-6" />,
      description: 'Automate routine tasks and business processes',
      highlight: 'Visual workflow builder',
      info: [
        'Trigger-based automation',
        'Conditional logic and branching',
        'Scheduled tasks and batching',
        'Integration with external services',
      ],
      color: 'purple',
    },
    {
      id: 'certified',
      name: 'Certified Quality',
      icon: <CheckCircle2 className="h-6 w-6" />,
      description: 'Industry-recognized quality and reliability',
      highlight: 'ISO 27001 certified',
      info: [
        'Regular quality audits',
        'Comprehensive test coverage',
        'Release quality metrics',
        'Strict quality standards',
      ],
      color: 'green',
    },
    {
      id: 'compatibility',
      name: 'Browser Compatibility',
      icon: <Computer className="h-6 w-6" />,
      description: 'Works flawlessly across all modern browsers',
      highlight: 'IE11+ and all modern browsers',
      info: [
        'Cross-browser testing',
        'Degradation graceful handling',
        'Performance optimization for each browser',
        'Mobile browser support',
      ],
      color: 'blue',
    },
    {
      id: 'aifeatures',
      name: 'AI Features',
      icon: <Stars className="h-6 w-6" />,
      description: 'Cutting-edge AI capabilities throughout the platform',
      highlight: 'GPT-4 powered assistance',
      info: [
        'Natural language processing',
        'Image recognition and analysis',
        'Predictive analytics',
        'Automated content generation',
      ],
      color: 'fuchsia',
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Capabilities at Your Fingertips
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            Discover all the features that make our platform stand out from the
            competition
          </p>
        </div>

        <TooltipProvider delayDuration={300}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-6">
            {iconFeatures.map((feature) => (
              <Tooltip key={feature.id}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'flex flex-col items-center rounded-lg p-4 text-center transition-all duration-200',
                      'hover:bg-muted cursor-pointer'
                    )}
                  >
                    <div
                      className={cn(
                        'mb-3 flex h-14 w-14 items-center justify-center rounded-full',
                        `bg-${feature.color}-100`,
                        `text-${feature.color}-600`
                      )}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-sm font-medium">{feature.name}</h3>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-[250px] space-y-2 p-4"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-semibold">{feature.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                    {feature.highlight && (
                      <p className="text-primary text-xs font-medium">
                        {feature.highlight}
                      </p>
                    )}
                  </div>
                  {feature.info && feature.info.length > 0 && (
                    <div className="border-border border-t pt-2">
                      <ul className="space-y-1 text-xs">
                        {feature.info.map((item, index) => (
                          <li key={index} className="flex items-start gap-1.5">
                            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        <div className="mt-16 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="group" asChild>
            <a href="#">
              Explore all features in detail
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#">
              Schedule a demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
