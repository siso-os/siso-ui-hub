import { useState } from 'react';
import { Input } from '../../../ui/input';
import { Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';

const faqs = [
  {
    question: 'How do I reset my password?',
    answer:
      "You can reset your password by clicking on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
    tags: ['account', 'security'],
  },
  {
    question: 'Can I change my subscription plan?',
    answer:
      'Yes, you can upgrade or downgrade your subscription plan at any time from your account settings. Changes to your plan will take effect immediately.',
    tags: ['billing', 'subscription'],
  },
  {
    question: 'How do I download my invoices?',
    answer:
      'All invoices are available in the Billing section of your account dashboard. You can download them as PDF files or have them emailed to you.',
    tags: ['billing', 'invoice'],
  },
  {
    question: 'Is there a mobile app available?',
    answer:
      'Yes, we offer mobile apps for both iOS and Android devices. You can download them from the respective app stores and sign in with your existing account.',
    tags: ['platform', 'mobile'],
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual enterprise plans.',
    tags: ['billing', 'payment'],
  },
  {
    question: 'Can I share my account with others?',
    answer:
      'Individual accounts are for single-user use only. For team usage, please consider our team plans which allow multiple users with custom permission settings.',
    tags: ['account', 'teams'],
  },
  {
    question: 'How secure is my data?',
    answer:
      'Your data is encrypted both in transit and at rest. We use industry-standard security measures and regularly undergo security audits to ensure your information remains protected.',
    tags: ['security', 'privacy'],
  },
  {
    question: 'Do you offer discounts for non-profits?',
    answer:
      'Yes, we offer special pricing for registered non-profit organizations. Please contact our sales team with proof of your non-profit status to apply for the discount.',
    tags: ['billing', 'discount'],
  },
];

export default function SearchFilter() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto max-w-[85rem] px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground mt-4">
          Find answers to your questions or search for specific topics
        </p>
      </div>
      {/* End Title */}

      {/* Search */}
      <div className="mx-auto mb-10 max-w-2xl">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search questions, answers, or topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <p className="text-muted-foreground mt-2 text-sm">
            Showing {filteredFaqs.length}{' '}
            {filteredFaqs.length === 1 ? 'result' : 'results'} for &quot;
            {searchQuery}&quot;
          </p>
        )}
      </div>
      {/* End Search */}

      {/* FAQs */}
      <div className="mx-auto max-w-2xl">
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>{faq.answer}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {faq.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery(tag);
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">
              No results found for your search. Try a different term.
            </p>
          </div>
        )}
      </div>
      {/* End FAQs */}
    </div>
  );
}
