import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

import {
  ArrowRight,
  BookOpen,
  CreditCard,
  DollarSign,
  Globe,
  LayoutGrid,
  Settings,
  Shield,
  Smartphone,
  Star,
  Truck,
  Users,
  Zap,
} from 'lucide-react';

interface IconFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function AnimatedIconGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features: IconFeature[] = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Secure Storage',
      description:
        'Keep your data safe with enterprise-grade security and encryption protocols.',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Lightning Fast',
      description:
        'Optimized for speed with minimal loading times across all devices.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Responsive Design',
      description:
        'Fully responsive interfaces that work seamlessly on any screen size.',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: 'Global CDN',
      description:
        'Content delivery network ensures fast access from anywhere in the world.',
      color: 'from-purple-500 to-violet-600',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: 'Customizable',
      description:
        'Easily adjust and modify components to match your specific requirements.',
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Team Collaboration',
      description:
        'Work together efficiently with intuitive sharing and permission controls.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: 'Cost Effective',
      description:
        'Maximize value with competitive pricing and flexible subscription options.',
      color: 'from-lime-500 to-green-600',
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: 'Premium Support',
      description:
        'Get direct access to our expert support team whenever you need assistance.',
      color: 'from-red-500 to-rose-600',
    },
    {
      icon: <LayoutGrid className="h-5 w-5" />,
      title: 'Modular System',
      description:
        'Build exactly what you need with our library of composable components.',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: 'Documentation',
      description:
        'Comprehensive guides and examples to help you implement quickly.',
      color: 'from-teal-500 to-green-600',
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Secure Payments',
      description:
        'Process transactions with confidence using our secure payment system.',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: <Truck className="h-5 w-5" />,
      title: 'Fast Delivery',
      description:
        'Reliable and quick deployment processes to get you up and running.',
      color: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything you need
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed">
            Our platform provides all the essential tools and features to help
            you succeed. Discover what makes our solution stand out from the
            rest.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  'absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 blur-xl transition-all duration-500 group-hover:opacity-70',
                  feature.color
                )}
                style={{
                  opacity: hoveredIndex === index ? 0.15 : 0,
                  transform:
                    hoveredIndex === index ? 'scale(1.05)' : 'scale(0.95)',
                }}
              />

              <div className="bg-card relative h-full rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div
                  className={cn(
                    'text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r',
                    feature.color
                  )}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {feature.description}
                </p>
                <div
                  className={cn(
                    'absolute right-6 bottom-3 left-6 h-px bg-gradient-to-r opacity-0 transition-all duration-300 group-hover:opacity-100',
                    feature.color
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild className="group">
            <a href="#">
              Explore all features
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
