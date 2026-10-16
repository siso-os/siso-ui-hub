import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';
import {
  Calendar,
  CheckCircle2,
  FileText,
  MessageSquare,
  Users,
  VideoIcon,
} from 'lucide-react';

interface InterviewStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  tips: string[];
}

export default function InterviewProcess() {
  const steps: InterviewStep[] = [
    {
      id: 1,
      title: 'Application Review',
      description:
        'Our recruiting team reviews your resume, portfolio, and cover letter to assess your qualifications and experience.',
      icon: <FileText className="h-6 w-6" />,
      duration: '1-2 weeks',
      tips: [
        'Tailor your resume to highlight relevant experience',
        'Include a link to your portfolio if applicable',
        'Demonstrate how your skills align with the job requirements',
      ],
    },
    {
      id: 2,
      title: 'Initial Screening',
      description:
        'A 30-minute call with a recruiter to discuss your background, assess basic qualifications, and answer any questions about the role.',
      icon: <MessageSquare className="h-6 w-6" />,
      duration: '30 minutes',
      tips: [
        'Research our company before the call',
        'Prepare questions about the role and company culture',
        'Be ready to explain your interest in the position',
      ],
    },
    {
      id: 3,
      title: 'Technical Assessment',
      description:
        'Complete a take-home assignment or online assessment to demonstrate your technical skills relevant to the position.',
      icon: <CheckCircle2 className="h-6 w-6" />,
      duration: '3-5 days',
      tips: [
        'Read all instructions carefully before starting',
        'Focus on quality over complexity',
        'Document your thought process and decisions',
      ],
    },
    {
      id: 4,
      title: 'Team Interview',
      description:
        'A virtual panel interview with potential teammates and your direct manager to assess cultural fit and technical expertise.',
      icon: <VideoIcon className="h-6 w-6" />,
      duration: '1-2 hours',
      tips: [
        'Test your video and audio setup beforehand',
        'Prepare specific examples of past work and challenges',
        "Ask thoughtful questions about the team's workflow and challenges",
      ],
    },
    {
      id: 5,
      title: 'Final Round',
      description:
        'Meet with senior leadership to discuss your long-term career goals and how you can contribute to our company vision.',
      icon: <Users className="h-6 w-6" />,
      duration: '1 hour',
      tips: [
        'Reflect on how your values align with our company mission',
        'Be prepared to discuss your career aspirations',
        "Consider how you'd contribute beyond your immediate role",
      ],
    },
    {
      id: 6,
      title: 'Offer & Onboarding',
      description:
        "If successful, we'll extend an offer and begin the onboarding process to welcome you to the team.",
      icon: <Calendar className="h-6 w-6" />,
      duration: '1-2 weeks',
      tips: [
        'Review the offer details carefully',
        "Don't hesitate to ask questions about benefits or terms",
        'Prepare necessary documentation for a smooth onboarding',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight">
          Our Interview Process
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          We&apos;ve designed a transparent and efficient interview process to
          find the best talent while giving you a clear understanding of our
          company and the role.
        </p>
      </div>

      <div className="relative">
        {/* Timeline connector line */}
        <div className="bg-border absolute top-0 bottom-0 left-4 w-0.5 md:left-1/2 md:-ml-0.5"></div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'relative flex items-start gap-6 md:gap-10',
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              )}
            >
              {/* Timeline node */}
              <div className="bg-background absolute top-0 left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border md:left-1/2">
                <span className="font-medium">{step.id}</span>
              </div>

              {/* Content */}
              <div
                className={cn(
                  'ml-12 w-full md:ml-0 md:w-[calc(50%-24px)]',
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                )}
              >
                <Card>
                  <CardHeader>
                    <div
                      className={cn(
                        'flex items-center gap-3',
                        index % 2 === 0 ? 'md:justify-end' : ''
                      )}
                    >
                      <div
                        className={cn(
                          'bg-primary/10 text-primary rounded-full p-2',
                          index % 2 === 0 ? 'md:order-last' : ''
                        )}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <CardTitle>{step.title}</CardTitle>
                        <CardDescription>{step.duration}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{step.description}</p>
                    <div>
                      <h4 className="font-medium">Tips for Success:</h4>
                      <ul
                        className={cn(
                          'text-muted-foreground mt-2 list-none space-y-1 text-sm'
                        )}
                      >
                        {step.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <h3 className="mb-4 text-xl font-semibold">Ready to Apply?</h3>
        <p className="text-muted-foreground mb-6 max-w-lg text-center">
          We&apos;re looking forward to learning more about you. Check out our
          open positions and start your journey with us today.
        </p>
        <Button size="lg">View Open Positions</Button>
      </div>
    </div>
  );
}
