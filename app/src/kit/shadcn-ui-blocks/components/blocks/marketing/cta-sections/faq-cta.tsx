import { useState } from 'react';

import { Button } from '../../../ui/button';
import { Plus, Minus } from 'lucide-react';

export default function FAQCTA() {
  // State to track which FAQ item is expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does the 30-day free trial work?',
      answer:
        'Our free trial gives you full access to all premium features for 30 days with no credit card required. After your trial ends, you can choose to subscribe or continue with our basic free plan.',
    },
    {
      question: 'Can I cancel my subscription at any time?',
      answer:
        "Yes, you can cancel your subscription at any time with no questions asked. If you cancel, you'll still have access until the end of your current billing period.",
    },
    {
      question:
        'Do you offer discounts for non-profits or educational institutions?',
      answer:
        'Absolutely! We offer special pricing for non-profits, educational institutions, and open-source projects. Contact our sales team to learn more about our discount programs.',
    },
    {
      question: 'How do I get help if I have questions?',
      answer:
        'We provide 24/7 support through live chat, email, and our comprehensive knowledge base. Premium users also get access to priority phone support and dedicated account managers.',
    },
    {
      question: 'Do you offer custom solutions for enterprise clients?',
      answer:
        'Yes, we offer tailored enterprise solutions with dedicated support, custom integration options, and advanced security features. Our team will work with you to create the perfect solution for your organization.',
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      {/* FAQ CTA Section */}
      <div className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Got questions? We&apos;ve got answers. If you don&apos;t see
                what you&apos;re looking for, reach out to our team.
              </p>
              <div className="flex flex-col space-y-3 pt-4">
                <Button size="lg" asChild>
                  <a href="#">Sign Up Now</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#">Contact Sales</a>
                </Button>
              </div>
              <div className="text-muted-foreground pt-4 text-sm">
                &ldquo;The support team is incredibly responsive and helpful.
                Any questions I had were answered within minutes.&rdquo;
                <div className="text-foreground pt-2 font-medium">
                  — Alex Morgan, Product Manager
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="divide-y rounded-lg border">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-card">
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="hover:bg-muted/50 flex w-full items-center justify-between p-4 text-left font-medium transition-all"
                      aria-expanded={expandedIndex === index}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span>{faq.question}</span>
                      <div className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                        {expandedIndex === index ? (
                          <Minus className="h-3 w-3" />
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                      </div>
                    </button>
                    <div
                      id={`faq-content-${index}`}
                      className={`overflow-hidden transition-all ${
                        expandedIndex === index
                          ? 'max-h-96 p-4 pt-0'
                          : 'max-h-0'
                      }`}
                    >
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-muted-foreground mt-4 text-center text-sm">
                <span>Still have questions?</span>{' '}
                <a
                  href="#"
                  className="text-primary font-medium underline-offset-4 hover:underline"
                >
                  Chat with our support team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End FAQ CTA Section */}
    </>
  );
}
