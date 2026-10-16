import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

import {
  ArrowRight,
  CheckCircle2,
  Code,
  FileText,
  Gauge,
  Heart,
  Lightbulb,
  Monitor,
  Rocket,
} from 'lucide-react';

interface TimelineStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  timeframe: string;
  highlights: string[];
  color: string;
}

export default function IconTimeline() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps: TimelineStep[] = [
    {
      id: 'discovery',
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Discovery',
      description:
        'Begin with understanding your requirements and project scope through collaborative sessions.',
      timeframe: 'Week 1',
      highlights: [
        'Requirement gathering workshops',
        'User journey mapping',
        'Business process analysis',
        'Technical feasibility assessment',
      ],
      color: 'text-blue-500 border-blue-200 bg-blue-50',
    },
    {
      id: 'planning',
      icon: <FileText className="h-6 w-6" />,
      title: 'Planning',
      description:
        'Create a detailed project roadmap with specific milestones and resource allocation.',
      timeframe: 'Week 2-3',
      highlights: [
        'Architecture planning',
        'Technology stack selection',
        'Sprint planning',
        'Risk assessment',
      ],
      color: 'text-purple-500 border-purple-200 bg-purple-50',
    },
    {
      id: 'design',
      icon: <Monitor className="h-6 w-6" />,
      title: 'Design',
      description:
        'Develop intuitive user interfaces and experiences based on user research and best practices.',
      timeframe: 'Week 4-6',
      highlights: [
        'Wireframe creation',
        'UI/UX prototyping',
        'Design system implementation',
        'Accessibility compliance',
      ],
      color: 'text-pink-500 border-pink-200 bg-pink-50',
    },
    {
      id: 'development',
      icon: <Code className="h-6 w-6" />,
      title: 'Development',
      description:
        'Write clean, maintainable code following industry standards and architectural patterns.',
      timeframe: 'Week 7-14',
      highlights: [
        'Frontend development',
        'Backend API implementation',
        'Database modeling',
        'Continuous integration setup',
      ],
      color: 'text-amber-500 border-amber-200 bg-amber-50',
    },
    {
      id: 'testing',
      icon: <Gauge className="h-6 w-6" />,
      title: 'Testing',
      description:
        'Rigorous quality assurance to ensure the solution meets all functional and performance requirements.',
      timeframe: 'Week 15-16',
      highlights: [
        'Automated unit testing',
        'Integration testing',
        'Performance optimization',
        'User acceptance testing',
      ],
      color: 'text-green-500 border-green-200 bg-green-50',
    },
    {
      id: 'deployment',
      icon: <Rocket className="h-6 w-6" />,
      title: 'Deployment',
      description:
        'Seamless deployment with zero downtime using modern DevOps practices.',
      timeframe: 'Week 17',
      highlights: [
        'Infrastructure provisioning',
        'CI/CD pipeline execution',
        'Database migration',
        'Environment configuration',
      ],
      color: 'text-red-500 border-red-200 bg-red-50',
    },
    {
      id: 'support',
      icon: <Heart className="h-6 w-6" />,
      title: 'Support & Maintenance',
      description:
        'Ongoing technical support, feature enhancements, and proactive monitoring.',
      timeframe: 'Ongoing',
      highlights: [
        '24/7 technical support',
        'Regular security updates',
        'Performance monitoring',
        'Scheduled feature releases',
      ],
      color: 'text-indigo-500 border-indigo-200 bg-indigo-50',
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Process</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our proven approach
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We follow a transparent, systematic process to deliver exceptional
            results. Here&apos;s how we turn your vision into reality.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Timeline Line */}
          <div className="bg-muted absolute top-0 bottom-0 left-[27px] w-[2px]" />

          {/* Timeline Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step Number with Icon */}
                <div
                  className={cn(
                    'absolute left-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2',
                    step.color,
                    activeStep === step.id
                      ? 'ring-primary ring-2 ring-offset-2'
                      : ''
                  )}
                  onClick={() =>
                    setActiveStep(activeStep === step.id ? null : step.id)
                  }
                >
                  {step.icon}
                </div>

                {/* Content Card */}
                <div className="relative ml-20">
                  <div
                    className={cn(
                      'relative rounded-lg border p-6 transition-all',
                      step.color,
                      activeStep === step.id ? 'shadow-md' : 'shadow-sm',
                      'cursor-pointer hover:shadow-md'
                    )}
                    onClick={() =>
                      setActiveStep(activeStep === step.id ? null : step.id)
                    }
                  >
                    {/* Corner Connector */}
                    <div className="bg-muted absolute top-1/2 -left-6 h-[2px] w-6 -translate-y-1/2 transform" />

                    {/* Header Row */}
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-xl font-bold">{step.title}</h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2 flex-shrink-0">
                        {step.timeframe}
                      </Badge>
                    </div>

                    {/* Expanded Content */}
                    {activeStep === step.id && (
                      <div className="animate-in fade-in slide-in-from-top-5 mt-6 space-y-4 duration-300">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          {step.highlights.map((highlight, hIndex) => (
                            <div
                              key={hIndex}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Completion Indicator for all but the last item */}
                {index < steps.length - 1 && (
                  <div className="absolute top-14 left-[27px] flex h-[calc(100%-3.5rem)] flex-col items-center justify-evenly">
                    <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full" />
                    <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full" />
                    <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Project Complete Indicator */}
          <div className="mt-8 flex items-center justify-center">
            <div className="bg-primary/10 text-primary flex items-center rounded-full px-4 py-2 font-medium">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Project Successfully Delivered
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-muted/50 mx-auto max-w-2xl rounded-xl border p-8">
            <h3 className="mb-4 text-2xl font-bold">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Let us guide you through our proven process and help turn your
              vision into reality. Our expert team is ready to assist you at
              every step.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="group">
                <a href="#">
                  Schedule a consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg">
                View case studies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
