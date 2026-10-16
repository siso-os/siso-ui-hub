import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  ArrowRight,
  BarChart,
  Users,
  Zap,
  Shield,
  CreditCard,
  HeartHandshake,
} from 'lucide-react';

const faqs = [
  {
    question: 'How do I get started?',
    answer:
      "Sign up for a free account and follow our quick onboarding process. You'll be up and running in less than 5 minutes.",
    icon: <Zap className="h-5 w-5" />,
    badge: 'Popular',
    link: '#',
  },
  {
    question: 'What security measures do you have?',
    answer:
      'We use bank-level encryption, two-factor authentication, and regular security audits to keep your data safe.',
    icon: <Shield className="h-5 w-5" />,
    link: '#',
  },
  {
    question: 'How does team collaboration work?',
    answer:
      'Invite team members via email, set permissions, and start collaborating in real-time on shared projects and documents.',
    icon: <Users className="h-5 w-5" />,
    link: '#',
  },
  {
    question: 'Do you offer analytics?',
    answer:
      'Yes, all plans include basic analytics. Premium plans offer advanced insights, custom reports, and data export options.',
    icon: <BarChart className="h-5 w-5" />,
    link: '#',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, PayPal, and wire transfers for enterprise plans. All payments are processed securely.',
    icon: <CreditCard className="h-5 w-5" />,
    link: '#',
  },
  {
    question: 'What is your refund policy?',
    answer:
      "We offer a 30-day money-back guarantee. If you're not satisfied, contact our support team for a full refund.",
    icon: <HeartHandshake className="h-5 w-5" />,
    badge: 'New',
    link: '#',
  },
];

export default function CardGrid() {
  return (
    <div className="relative container mx-auto max-w-[85rem] px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Questions? We&apos;ve got answers
        </h2>
        <p className="text-muted-foreground mt-4">
          Browse our most common questions or contact our support team for
          personalized help
        </p>
      </div>
      {/* End Title */}

      {/* Card Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className="bg-background/80 overflow-hidden border backdrop-blur-sm transition-shadow duration-200 hover:shadow-md"
          >
            <CardHeader className="space-y-0 pb-3">
              <div className="flex items-start justify-between">
                <div className="bg-muted inline-flex h-10 w-10 items-center justify-center rounded-lg">
                  {faq.icon}
                </div>
                {faq.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {faq.badge}
                  </Badge>
                )}
              </div>
              <CardTitle className="mt-4 text-xl">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
            <CardFooter>
              <a href={faq.link} className="w-full">
                <Button
                  variant="ghost"
                  className="group w-full justify-between"
                >
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* End Card Grid */}

      {/* CTA */}
      <div className="mt-14 text-center">
        <p className="text-muted-foreground mb-4">Still have questions?</p>
        <a href="#">
          <Button size="lg">Contact Support</Button>
        </a>
      </div>
      {/* End CTA */}
    </div>
  );
}
