import { useState } from 'react';
import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle2, Star, MousePointerClick, BarChart4, Lightbulb, RotateCcw, ArrowRight, Database } from 'lucide-react';

import { cn } from '@/arc-shims/kit-utils';

import type { ComponentType, SVGProps } from 'react';

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
interface Feature {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  benefits: string[];
  image: string;
  cta: {
    text: string;
    href: string;
  };
  color: string;
}

const features: Feature[] = [
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    shortDescription: 'Powerful data insights',
    fullDescription:
      'Our advanced analytics platform provides real-time insights into your business performance, enabling data-driven decisions with custom dashboards, alerts, and reports.',
    icon: BarChart4,
    benefits: [
      'Real-time performance dashboards',
      'Custom reporting tools',
      'Predictive analytics',
      'Data visualization',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    cta: {
      text: 'See analytics in action',
      href: '#',
    },
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    shortDescription: 'Automate repetitive tasks',
    fullDescription:
      'Build powerful automation workflows that save time and reduce errors. Connect your tools and processes with our visual automation builder.',
    icon: RotateCcw,
    benefits: [
      'Visual workflow builder',
      'Trigger-based automations',
      'Cross-platform integration',
      'Error handling and recovery',
    ],
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
    cta: {
      text: 'Start automating',
      href: '#',
    },
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    id: 'ai',
    title: 'AI Recommendations',
    shortDescription: 'Smart suggestions',
    fullDescription:
      'Leverage the power of artificial intelligence to receive personalized recommendations, predict outcomes, and optimize your business operations.',
    icon: Lightbulb,
    benefits: [
      'Personalized insights',
      'Predictive recommendations',
      'Anomaly detection',
      'Decision support',
    ],
    image:
      'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1000&auto=format&fit=crop',
    cta: {
      text: 'Explore AI features',
      href: '#',
    },
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    id: 'ux',
    title: 'User Experience',
    shortDescription: 'Intuitive interfaces',
    fullDescription:
      'Create delightful user experiences with our design tools and components. Build interfaces that users love with minimal effort.',
    icon: MousePointerClick,
    benefits: [
      'Drag-and-drop UI builder',
      'Responsive design templates',
      'User behavior analytics',
      'A/B testing capabilities',
    ],
    image:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop',
    cta: {
      text: 'Design better UX',
      href: '#',
    },
    color: 'bg-green-500/10 text-green-600',
  },
  {
    id: 'data',
    title: 'Data Management',
    shortDescription: 'Organize your information',
    fullDescription:
      'Centralize and manage all your data with powerful organization tools, versioning, and secure sharing capabilities.',
    icon: Database,
    benefits: [
      'Unified data storage',
      'Automated backups',
      'Version control',
      'Robust search capabilities',
    ],
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
    cta: {
      text: 'Organize your data',
      href: '#',
    },
    color: 'bg-indigo-500/10 text-indigo-600',
  },
];

export default function FeatureWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<string[]>(['analytics']);
  const totalSteps = features.length;
  const progress = (currentStep / (totalSteps - 1)) * 100;

  const currentFeature = features[currentStep]!;

  const handleNext = () => {
    if (!completed.includes(currentFeature.id)) {
      setCompleted([...completed, currentFeature.id]);
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (!completed.includes(features[index]!.id)) {
      setCompleted([...completed, features[index]!.id]);
    }

    setCurrentStep(index);
  };

  const isFeatureCompleted = (id: string) => {
    return completed.includes(id);
  };

  return (
    <section className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Explore our platform features
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Take a guided tour through our key features and see how they can help
          your business
        </p>
      </div>

      {/* Wizard progress */}
      <div className="mx-auto w-full space-y-4 lg:max-w-3xl">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Step {currentStep + 1} of {totalSteps}
          </p>
          <Badge variant="outline">
            {completed.length} of {totalSteps} features explored
          </Badge>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex flex-wrap justify-center gap-2">
          {features.map((feature, index) => (
            <Button
              key={feature.id}
              variant={index === currentStep ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'gap-1 transition-all',
                isFeatureCompleted(feature.id) &&
                  index !== currentStep &&
                  'bg-primary/10'
              )}
              onClick={() => handleStepClick(index)}
            >
              {isFeatureCompleted(feature.id) && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
              <span>{feature.shortDescription}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Current feature */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-start justify-between">
                <div className={cn('rounded-md p-2', currentFeature.color)}>
                  <currentFeature.icon className="h-6 w-6" />
                </div>
                {isFeatureCompleted(currentFeature.id) && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-green-600"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Explored
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{currentFeature.title}</CardTitle>
              <CardDescription className="text-base">
                {currentFeature.fullDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="flex items-center gap-2 font-medium">
                <Star className="h-4 w-4 text-amber-500" />
                Key Benefits
              </h4>
              <ul className="space-y-2">
                {currentFeature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="justify-between">
              <Button asChild variant="outline">
                <a href={currentFeature.cta.href}>{currentFeature.cta.text}</a>
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  disabled={currentStep === totalSteps - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="relative order-1 min-h-[300px] overflow-hidden rounded-xl lg:order-2">
          <img
            src={currentFeature.image}
            alt={currentFeature.title}
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold">{currentFeature.title}</h3>
              <p className="text-white/80">{currentFeature.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-xl border p-8 lg:flex-row">
        <div>
          <h3 className="text-xl font-bold">
            Ready to explore all our features?
          </h3>
          <p className="text-muted-foreground max-w-[600px]">
            See how our complete platform can transform your business with a
            personalized demo.
          </p>
        </div>
        <Button asChild size="lg">
          <a href="#">
            Schedule a demo <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}
