import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';

const timelineFaqs = [
  {
    title: 'Getting Started',
    description: 'How does the onboarding process work?',
    steps: [
      {
        title: 'Create an account',
        description:
          'Start by signing up for an account using your email address or by connecting with Google, Microsoft, or Apple accounts for faster registration.',
        additionalInfo:
          "We'll send a verification email to confirm your email address. Personal information is only used to identify your account and is never shared with third parties.",
      },
      {
        title: 'Complete your profile',
        description:
          'Add your basic information including your name, organization, role, and profile picture to help others identify you on the platform.',
        additionalInfo:
          'Your profile information helps us personalize your experience and provide relevant recommendations. You can update your profile at any time from your account settings.',
      },
      {
        title: 'Set up your workspace',
        description:
          'Create or join a workspace for your organization. This is where all your projects, tasks, and team collaborations will live.',
        additionalInfo:
          'Workspaces allow you to organize different areas of work. You can be part of multiple workspaces and switch between them easily.',
      },
      {
        title: 'Invite team members',
        description:
          'Add colleagues to your workspace by sending invitation emails. Set appropriate permission levels for each team member.',
        additionalInfo:
          'Team members can have different roles including Admin, Editor, and Viewer. Only workspace admins can invite new members and manage permissions.',
      },
      {
        title: 'Start your first project',
        description:
          'Create a new project, set goals and deadlines, and assign team members to specific tasks within the project.',
        additionalInfo:
          'Projects can be organized using boards, lists, or timelines depending on your preferred workflow. You can also import existing projects from other tools.',
      },
    ],
  },
  {
    title: 'Billing Cycle',
    description: 'How does your subscription and billing process work?',
    steps: [
      {
        title: 'Choose a plan',
        description:
          'Select from our Free, Pro, or Enterprise plans based on your needs. Each plan includes different features and user limits.',
        additionalInfo:
          'You can start with our 14-day free trial of any paid plan to explore all features before committing. No credit card required for the trial.',
      },
      {
        title: 'Enter payment details',
        description:
          'Provide your credit card or PayPal information. We use industry-standard encryption to protect your payment information.',
        additionalInfo:
          'We accept all major credit cards including Visa, Mastercard, American Express, and Discover. Enterprise plans can also pay via invoice.',
      },
      {
        title: 'Billing cycle begins',
        description:
          "Your subscription starts immediately, and you'll be charged according to your chosen billing cycle (monthly or annual).",
        additionalInfo:
          'Annual plans come with a significant discount compared to monthly billing. You can change your billing cycle at any time.',
      },
      {
        title: 'Receive invoices',
        description:
          "After each payment, we'll email you a receipt and you can access all invoices from your billing dashboard.",
        additionalInfo:
          'Invoices include detailed information about your plan, any add-ons, applicable taxes, and payment method used.',
      },
      {
        title: 'Renewal or cancellation',
        description:
          'Subscriptions automatically renew at the end of each billing cycle. You can cancel anytime from your account settings.',
        additionalInfo:
          "If you cancel, you'll maintain access until the end of your current billing period. We don't offer prorated refunds for unused time.",
      },
    ],
  },
];

export default function TimelineFAQ() {
  return (
    <div className="container mx-auto max-w-[85rem] px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-16">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          How It Works
        </h2>
        <p className="text-muted-foreground mt-4">
          Step-by-step guides to common processes
        </p>
      </div>
      {/* End Title */}

      <div className="space-y-20">
        {timelineFaqs.map((faq, faqIndex) => (
          <div key={faqIndex}>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h3 className="mb-2 text-xl font-semibold md:text-2xl">
                {faq.title}
              </h3>
              <p className="text-muted-foreground">{faq.description}</p>
            </div>

            <div className="relative mx-auto max-w-4xl">
              {/* Timeline line */}
              <div className="bg-border absolute top-0 bottom-0 left-12 z-0 hidden w-0.5 md:block" />

              {/* Timeline steps */}
              <div className="relative space-y-8">
                {faq.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="relative">
                    <div className="grid gap-6 md:grid-cols-[96px_1fr]">
                      {/* Timeline marker */}
                      <div className="flex md:justify-center">
                        <div className="bg-primary text-primary-foreground border-background z-20 flex h-12 w-12 items-center justify-center rounded-full border-4">
                          <span className="font-semibold">{stepIndex + 1}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <Card>
                        <CardHeader>
                          <CardTitle>{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-muted-foreground text-sm">
                            {step.additionalInfo}
                          </div>
                        </CardContent>
                        {stepIndex === faq.steps.length - 1 && (
                          <CardFooter className="flex items-center justify-between border-t pt-4">
                            <div className="text-primary flex items-center text-sm font-medium">
                              <CheckCircle className="mr-1.5 h-4 w-4" />
                              <span>Process complete</span>
                            </div>
                            <a href="#">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1"
                              >
                                <span>Learn more</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
                            </a>
                          </CardFooter>
                        )}
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Help */}
      <div className="mx-auto mt-20 max-w-xl text-center">
        <h3 className="mb-2 text-lg font-semibold">Still have questions?</h3>
        <p className="text-muted-foreground mb-6">
          Our support team is here to help with any specific questions you might
          have about our services or processes.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#">
            <Button variant="outline">Browse FAQs</Button>
          </a>
          <a href="#">
            <Button>Contact Support</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
