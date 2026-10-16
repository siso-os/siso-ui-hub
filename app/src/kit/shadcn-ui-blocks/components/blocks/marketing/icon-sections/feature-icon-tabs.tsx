import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';

import {
  ArrowRight,
  BrainCircuit,
  Blocks,
  Fingerprint,
  MessageSquare,
  Merge,
  Server,
  Shield,
  ShieldCheck,
  Zap,
  Globe,
  CloudCog,
  Webhook,
  LineChart,
  Layers,
  Cpu,
  Users,
  Bot,
  Wand2,
  Code,
  Database,
  Settings,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

interface FeatureIcon {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefit: string;
  category: string;
}

export default function FeatureIconTabs() {
  const [activeTab, setActiveTab] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const featureIcons: FeatureIcon[] = [
    {
      id: 'ai-powered',
      icon: <BrainCircuit className="text-primary h-10 w-10" />,
      title: 'AI-Powered Analysis',
      description:
        'Leverage machine learning to automatically analyze large datasets and identify patterns.',
      benefit: 'Save countless hours on manual data processing',
      category: 'intelligence',
    },
    {
      id: 'advanced-security',
      icon: <ShieldCheck className="h-10 w-10 text-red-500" />,
      title: 'Advanced Security',
      description:
        'Enterprise-grade security with role-based access control and encryption at rest.',
      benefit: 'Protect sensitive information with military-grade protocols',
      category: 'security',
    },
    {
      id: 'real-time-collab',
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: 'Real-time Collaboration',
      description:
        'Work together with your team simultaneously on shared projects with live updates.',
      benefit: 'Boost team productivity with seamless coordination',
      category: 'collaboration',
    },
    {
      id: 'instant-deploy',
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      title: 'Instant Deployment',
      description:
        'One-click deployment to any environment with automatic rollback capabilities.',
      benefit: 'Go from development to production in seconds',
      category: 'performance',
    },
    {
      id: 'custom-workflows',
      icon: <Webhook className="h-10 w-10 text-green-500" />,
      title: 'Custom Workflows',
      description:
        'Build automated workflows with our visual editor to streamline your processes.',
      benefit: 'Automate repetitive tasks without coding knowledge',
      category: 'customization',
    },
    {
      id: 'smart-integrations',
      icon: <Merge className="h-10 w-10 text-indigo-500" />,
      title: 'Smart Integrations',
      description:
        'Connect with 200+ apps and services through our intelligent API platform.',
      benefit: 'Create a unified ecosystem of all your business tools',
      category: 'integration',
    },
    {
      id: 'global-cdn',
      icon: <Globe className="h-10 w-10 text-cyan-500" />,
      title: 'Global CDN',
      description:
        'Deliver content with blazing speed through our global content delivery network.',
      benefit: 'Provide fast experiences to users worldwide',
      category: 'performance',
    },
    {
      id: 'cloud-processing',
      icon: <CloudCog className="h-10 w-10 text-sky-500" />,
      title: 'Cloud Processing',
      description:
        'Offload intensive computing tasks to our scalable cloud infrastructure.',
      benefit: 'Handle massive workloads without hardware limitations',
      category: 'performance',
    },
    {
      id: 'predictive-analytics',
      icon: <LineChart className="h-10 w-10 text-violet-500" />,
      title: 'Predictive Analytics',
      description:
        'Anticipate trends and behaviors with forward-looking analytical models.',
      benefit: 'Make data-driven decisions before issues arise',
      category: 'intelligence',
    },
    {
      id: 'multi-tenancy',
      icon: <Layers className="h-10 w-10 text-rose-500" />,
      title: 'Multi-tenancy',
      description:
        'Isolate customer data while maintaining a single application instance.',
      benefit: 'Scale your SaaS business with optimal resource usage',
      category: 'architecture',
    },
    {
      id: 'edge-computing',
      icon: <Cpu className="h-10 w-10 text-amber-500" />,
      title: 'Edge Computing',
      description:
        'Process data closer to the source for reduced latency and bandwidth usage.',
      benefit: 'Achieve near real-time processing for critical operations',
      category: 'performance',
    },
    {
      id: 'biometric-auth',
      icon: <Fingerprint className="h-10 w-10 text-emerald-500" />,
      title: 'Biometric Authentication',
      description:
        'Secure access using fingerprint, face recognition, and other biometric methods.',
      benefit: 'Balance security and convenience for your users',
      category: 'security',
    },
    {
      id: 'chatbots',
      icon: <Bot className="h-10 w-10 text-pink-500" />,
      title: 'Intelligent Chatbots',
      description:
        'Deploy conversational AI to handle customer inquiries and support requests.',
      benefit: 'Provide 24/7 support without expanding your team',
      category: 'intelligence',
    },
    {
      id: 'low-code',
      icon: <Wand2 className="h-10 w-10 text-orange-500" />,
      title: 'Low-Code Builder',
      description:
        'Create custom features and extensions with minimal coding required.',
      benefit: 'Empower non-technical teams to build solutions',
      category: 'customization',
    },
    {
      id: 'api-management',
      icon: <Code className="h-10 w-10 text-neutral-500" />,
      title: 'API Management',
      description:
        'Comprehensive tools to create, publish, maintain, and secure your APIs.',
      benefit: 'Control and monitor all your API endpoints from one place',
      category: 'integration',
    },
    {
      id: 'data-warehouse',
      icon: <Database className="h-10 w-10 text-purple-500" />,
      title: 'Data Warehouse',
      description:
        'Centralized repository optimized for analysis of data from disparate sources.',
      benefit: 'Transform raw data into actionable business intelligence',
      category: 'architecture',
    },
    {
      id: 'advanced-config',
      icon: <Settings className="h-10 w-10 text-slate-500" />,
      title: 'Advanced Configuration',
      description:
        'Granular controls for customizing every aspect of the platform to your needs.',
      benefit: 'Create a perfectly tailored solution for your business',
      category: 'customization',
    },
    {
      id: 'adaptive-ai',
      icon: <SlidersHorizontal className="h-10 w-10 text-teal-500" />,
      title: 'Adaptive AI',
      description:
        'Self-learning systems that adapt to your specific business patterns over time.',
      benefit: 'Get increasingly accurate insights as you use the platform',
      category: 'intelligence',
    },
  ];

  const categories = [
    {
      value: 'all',
      label: 'All Features',
      icon: <Blocks className="h-4 w-4" />,
    },
    {
      value: 'intelligence',
      label: 'Intelligence',
      icon: <BrainCircuit className="h-4 w-4" />,
    },
    {
      value: 'security',
      label: 'Security',
      icon: <Shield className="h-4 w-4" />,
    },
    {
      value: 'performance',
      label: 'Performance',
      icon: <Zap className="h-4 w-4" />,
    },
    {
      value: 'collaboration',
      label: 'Collaboration',
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: 'customization',
      label: 'Customization',
      icon: <SlidersHorizontal className="h-4 w-4" />,
    },
    {
      value: 'integration',
      label: 'Integration',
      icon: <Webhook className="h-4 w-4" />,
    },
    {
      value: 'architecture',
      label: 'Architecture',
      icon: <Server className="h-4 w-4" />,
    },
  ];

  const filteredFeatures =
    activeTab === 'all'
      ? featureIcons
      : featureIcons.filter((feature) => feature.category === activeTab);

  const activeCategory = categories.find((cat) => cat.value === activeTab);

  return (
    <section className="bg-background w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            Discover the tools and capabilities that make our platform the
            choice of leading organizations
          </p>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Dropdown for small screens */}
          <div className="mb-8 flex justify-center lg:hidden">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex w-full max-w-[300px] items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {activeCategory?.icon}
                    <span>{activeCategory?.label}</span>
                  </div>
                  <ChevronDown className="text-muted-foreground ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.value}
                    className="flex items-center gap-2"
                    onClick={() => {
                      setActiveTab(category.value);
                      setDropdownOpen(false);
                    }}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tabs for medium and larger screens */}
          <div className="mb-8 hidden justify-center lg:flex">
            <TabsList className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  <span className="hidden md:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {filteredFeatures.map((feature) => (
                <Card
                  key={feature.id}
                  className="group overflow-hidden p-0 transition-all hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="bg-primary/5 flex h-16 w-16 items-center justify-center rounded-full">
                        {feature.icon}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          {feature.description}
                        </p>
                      </div>

                      <div className="border-border border-t pt-4">
                        <p className="text-primary text-sm font-medium">
                          <span className="font-bold">Key benefit:</span>{' '}
                          {feature.benefit}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFeatures.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  No features found in this category.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="group" asChild>
            <a href="#">
              Get started with all features
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#">
              Schedule a demo
              <MessageSquare className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
