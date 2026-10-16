import { useState } from 'react';

import { cn } from '@/arc-shims/kit-utils';
import { Button } from '../../../ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';

const categories = [
  {
    name: 'Getting Started',
    slug: 'getting-started',
    questions: [
      {
        question: 'How do I create an account?',
        answer:
          "Creating an account is simple. Click the 'Sign Up' button in the top-right corner of our website, fill in your details, and follow the on-screen instructions to complete your registration.",
      },
      {
        question: 'What are the system requirements?',
        answer:
          'Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated to the latest version.',
      },
      {
        question: 'How do I install the desktop app?',
        answer:
          'You can download our desktop app from the Downloads section of your account dashboard. We provide installers for Windows, MacOS, and Linux.',
      },
    ],
  },
  {
    name: 'Account & Settings',
    slug: 'account',
    questions: [
      {
        question: 'How do I change my email address?',
        answer:
          "You can change your email address in your Account Settings. After updating, we'll send a verification link to your new email to confirm the change.",
      },
      {
        question: 'Can I have multiple profiles?',
        answer:
          'No, each user account is limited to one profile. However, our team plans allow you to switch between different workspaces.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'You can request account deletion from your Account Settings. Please note that this action is permanent and all your data will be removed from our systems.',
      },
    ],
  },
  {
    name: 'Billing & Payments',
    slug: 'billing',
    questions: [
      {
        question: 'When will I be charged?',
        answer:
          "For monthly subscriptions, you'll be charged on the same date each month. For annual plans, you'll be charged once per year on your subscription anniversary.",
      },
      {
        question: 'How do I update my payment method?',
        answer:
          'You can update your payment method in the Billing section of your account. We securely store your payment information using industry-standard encryption.',
      },
      {
        question: 'Can I get a refund?',
        answer:
          'We offer a 30-day money-back guarantee for all new subscriptions. After this period, refunds are handled on a case-by-case basis.',
      },
    ],
  },
  {
    name: 'Troubleshooting',
    slug: 'troubleshooting',
    questions: [
      {
        question: 'The app is running slow, what can I do?',
        answer:
          'Try clearing your browser cache, restarting the app, or checking your internet connection. If problems persist, our support team can help troubleshoot specific issues.',
      },
      {
        question: 'I forgot my password, how do I reset it?',
        answer:
          "Click the 'Forgot Password' link on the login page, enter your email address, and follow the instructions sent to your email to create a new password.",
      },
      {
        question: 'Why am I seeing error messages?',
        answer:
          "Error messages typically indicate a temporary issue or missing information. The message should provide specific guidance, but if you're stuck, please contact our support team.",
      },
    ],
  },
];

export default function SidebarNavigation() {
  const [activeCategory, setActiveCategory] = useState(categories[0]!.slug);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const currentCategory = categories.find((cat) => cat.slug === activeCategory);

  const toggleQuestion = (question: string) => {
    if (expandedQuestion === question) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(question);
    }
  };

  return (
    <div className="container mx-auto max-w-[85rem] px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Help & Resources
        </h2>
        <p className="text-muted-foreground mt-4">
          Browse our comprehensive FAQ or get in touch with support
        </p>
      </div>
      {/* End Title */}

      {/* Mobile Dropdown */}
      <div className="mb-6 lg:hidden">
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-10 lg:grid-cols-4">
        {/* Sidebar Navigation (Desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-8 space-y-1">
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant="ghost"
                className={cn(
                  'w-full justify-start text-left',
                  activeCategory === category.slug ? 'bg-muted' : ''
                )}
                onClick={() => setActiveCategory(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="lg:col-span-3">
          <div className="bg-muted/30 rounded-lg p-6 md:p-8">
            <h3 className="mb-6 text-xl font-semibold">
              {currentCategory?.name}
            </h3>
            <div className="space-y-4">
              {currentCategory?.questions.map((item, index) => (
                <div key={index} className="bg-background rounded-lg border">
                  <button
                    className="flex w-full items-center justify-between p-4 text-left font-medium"
                    onClick={() => toggleQuestion(item.question)}
                  >
                    {item.question}
                    {expandedQuestion === item.question ? (
                      <ChevronUp className="text-muted-foreground h-4 w-4 shrink-0" />
                    ) : (
                      <ChevronDown className="text-muted-foreground h-4 w-4 shrink-0" />
                    )}
                  </button>
                  {expandedQuestion === item.question && (
                    <div className="text-muted-foreground p-4 pt-0">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-muted/30 mt-8 rounded-lg p-6 text-center md:p-8">
            <h3 className="mb-2 text-lg font-semibold">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is just a click away
            </p>
            <a href="#">
              <Button>Contact Support</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
