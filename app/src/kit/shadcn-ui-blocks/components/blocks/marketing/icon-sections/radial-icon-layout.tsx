import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

import {
  ArrowRight,
  Atom,
  Brain,
  ChartBar,
  Database,
  FileText,
  Layers,
  MessageSquare,
  Settings,
  ShieldCheck,
  Star,
} from 'lucide-react';

interface RadialFeature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function RadialIconLayout() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features: RadialFeature[] = [
    {
      id: 'security',
      icon: <ShieldCheck className="h-5 w-5" />,
      title: 'Advanced Security',
      description:
        'Multi-layered security protocols with end-to-end encryption and regular security audits.',
      color: 'bg-blue-500 text-white',
    },
    {
      id: 'analytics',
      icon: <ChartBar className="h-5 w-5" />,
      title: 'Powerful Analytics',
      description:
        'Gain insights with customizable dashboards and real-time metrics tracking.',
      color: 'bg-orange-500 text-white',
    },
    {
      id: 'intelligence',
      icon: <Brain className="h-5 w-5" />,
      title: 'AI Intelligence',
      description:
        'Smart automation and predictive algorithms that learn from your data patterns.',
      color: 'bg-purple-500 text-white',
    },
    {
      id: 'collaboration',
      icon: <MessageSquare className="h-5 w-5" />,
      title: 'Team Collaboration',
      description:
        'Seamless tools for teams to communicate, share, and work together efficiently.',
      color: 'bg-green-500 text-white',
    },
    {
      id: 'customization',
      icon: <Settings className="h-5 w-5" />,
      title: 'Deep Customization',
      description:
        'Tailor the platform to your specific needs with extensive configuration options.',
      color: 'bg-pink-500 text-white',
    },
    {
      id: 'integration',
      icon: <Layers className="h-5 w-5" />,
      title: 'Seamless Integration',
      description:
        'Connect with your favorite tools and services through our extensive API.',
      color: 'bg-cyan-500 text-white',
    },
    {
      id: 'scalability',
      icon: <Database className="h-5 w-5" />,
      title: 'Infinite Scalability',
      description:
        'Grows with your business from startup to enterprise without performance degradation.',
      color: 'bg-amber-500 text-white',
    },
    {
      id: 'reporting',
      icon: <FileText className="h-5 w-5" />,
      title: 'Detailed Reporting',
      description:
        'Generate comprehensive reports with just a few clicks for informed decision making.',
      color: 'bg-indigo-500 text-white',
    },
  ];

  // Calculate positions for features in a circle
  const calculatePosition = (index: number, total: number, radius: number) => {
    // Offset the starting angle to have the first item at the top
    const angleOffset = -Math.PI / 2;
    const angle = (2 * Math.PI * index) / total + angleOffset;

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return { x, y };
  };

  // Helper to handle feature click
  const handleFeatureClick = (id: string) => {
    setActiveFeature(activeFeature === id ? null : id);
  };

  return (
    <section className="bg-background w-full overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Platform</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            A comprehensive ecosystem
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our platform offers a connected suite of features that work together
            seamlessly to power your business growth.
          </p>
        </div>

        {/* Mobile View (Stacked) */}
        <div className="mb-16 grid grid-cols-2 gap-4 lg:hidden">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex cursor-pointer flex-col items-center rounded-lg border p-4 text-center transition-all hover:shadow-md"
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div
                className={cn(
                  'mb-3 flex h-12 w-12 items-center justify-center rounded-full',
                  feature.color
                )}
              >
                {feature.icon}
              </div>
              <h3 className="mb-2 text-base font-semibold">{feature.title}</h3>
              {activeFeature === feature.id && (
                <p className="text-muted-foreground animate-in fade-in slide-in-from-top-2 text-sm duration-300">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View (Radial) */}
        <div className="relative hidden lg:block">
          {/* Center Feature */}
          <div
            className="relative mx-auto"
            style={{ width: '800px', height: '800px' }}
          >
            {/* Center Platform Icon */}
            <div className="bg-primary/5 border-primary/20 absolute top-1/2 left-1/2 z-10 flex h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-full border-4 p-6 text-center shadow-lg">
              <div className="bg-primary/10 border-primary/20 mb-4 flex h-20 w-20 items-center justify-center rounded-full border">
                <Atom className="text-primary h-10 w-10" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Core Platform</h3>
              <p className="text-muted-foreground text-sm">
                The central hub that connects all features and ensures seamless
                functionality.
              </p>
            </div>

            {/* Radial Features */}
            {features.map((feature, index) => {
              const { x, y } = calculatePosition(index, features.length, 300);

              const isActive = activeFeature === feature.id;

              return (
                <div
                  key={feature.id}
                  className={cn(
                    'absolute -translate-x-1/2 -translate-y-1/2 transform cursor-pointer transition-all duration-300',
                    isActive
                      ? 'z-20 scale-110'
                      : 'z-10 scale-100 hover:scale-105'
                  )}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  {/* Feature Content */}
                  <div className="relative">
                    {/* Feature Icon */}
                    <div
                      className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-full transition-all',
                        feature.color,
                        isActive ? 'ring-primary/30 ring-4 ring-offset-2' : ''
                      )}
                    >
                      {feature.icon}
                    </div>

                    {/* Feature Info Card (only shown when active) */}
                    {isActive && (
                      <div
                        className={cn(
                          'animate-in fade-in zoom-in-95 absolute w-48 rounded-lg border p-3 shadow-lg duration-300',
                          x > 0 ? 'left-full ml-3' : 'right-full mr-3',
                          y > 0 ? 'top-0' : 'bottom-0'
                        )}
                      >
                        <h4 className="mb-1 text-sm font-semibold">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          {feature.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Orbit Circles */}
            <div className="border-muted absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-dashed" />
          </div>
        </div>

        {/* Feature Showcase Section */}
        <div className="mt-24">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">
                Designed to work together
              </h3>
              <p className="text-muted-foreground mb-6">
                Our platform&apos;s features are designed to integrate
                seamlessly with one another, creating a coherent and powerful
                ecosystem that enhances productivity and facilitates growth.
              </p>
              <ul className="space-y-3">
                {[
                  'Unified data across all platform features',
                  'Consistent user experience throughout',
                  'Automatic synchronization between components',
                  'Centralized control and administration',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild className="group">
                  <a href="#">
                    Learn more about our platform
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="bg-muted relative aspect-video overflow-hidden rounded-xl border shadow-md">
              <img
                src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1964&auto=format&fit=crop"
                alt="Platform overview dashboard"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
              <div className="bg-background/80 absolute right-4 bottom-4 left-4 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="mb-1 text-sm font-medium">Unified Dashboard</h4>
                <p className="text-muted-foreground text-xs">
                  Access all platform features from a single, intuitive
                  interface
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
