import { Button } from '../../../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';

const faqs = [
  {
    question: 'How do teams collaborate on the platform?',
    answer:
      'Teams can collaborate seamlessly through shared workspaces, real-time document editing, and integrated communication tools. Our platform makes it easy to assign tasks, track progress, and share feedback in one centralized location.',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    alt: 'Team collaboration meeting',
  },
  {
    question: 'How secure is the data stored on your platform?',
    answer:
      'We implement bank-level security measures including end-to-end encryption, two-factor authentication, and regular security audits. Your data is stored in SOC 2 compliant data centers with 24/7 monitoring and automatic backups.',
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    alt: 'Security shield and data protection',
  },
  {
    question: 'How can I integrate with my existing tools?',
    answer:
      'Our platform offers native integrations with over 100 popular tools and services. For custom integrations, you can use our API or Zapier connection. Our support team can also help set up specific integrations for enterprise customers.',
    image:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    alt: 'Connected app integrations',
  },
  {
    question: 'What support options are available?',
    answer:
      'We offer multiple support channels including 24/7 chat support, email, and an extensive knowledge base. Enterprise plans include dedicated account managers and priority phone support. Our community forum is also a great resource for connecting with other users.',
    image:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    alt: 'Customer support team',
  },
  {
    question: 'How does your pricing model work?',
    answer:
      'Our pricing is based on a tiered subscription model with options for monthly or annual billing. We offer plans for individuals, small teams, and enterprises with different feature sets. Custom plans are available for organizations with specific requirements.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    alt: 'Subscription pricing plans',
  },
];

export default function ImageIllustrated() {
  return (
    <div className="container mx-auto max-w-[85rem] px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground mt-4">
          Get answers to common questions about our platform
        </p>
      </div>
      {/* End Title */}

      <div className="space-y-16">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
              index % 2 === 1 ? 'md:grid-flow-dense' : ''
            }`}
          >
            {/* Image Section (swap order based on index) */}
            <div className={index % 2 === 1 ? 'md:col-start-1' : ''}>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <img
                  src={faq.image}
                  alt={faq.alt}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content Section */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground mb-6">{faq.answer}</p>
              <a href="#">
                <Button variant="outline" size="sm">
                  Learn more
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Additional FAQs */}
      <div className="bg-muted/30 mt-24 rounded-xl p-8 md:p-10">
        <h3 className="mb-6 text-center text-xl font-semibold">
          More Questions
        </h3>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Can I try before I subscribe?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 14-day free trial that includes all features. No
                credit card is required to start your trial.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How often do you release updates?
              </AccordionTrigger>
              <AccordionContent>
                We release major updates quarterly and smaller improvements
                weekly. All updates are automatically available to subscribers
                at no additional cost.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is there a limit on storage?</AccordionTrigger>
              <AccordionContent>
                Different plans come with different storage limits. Our basic
                plan includes 10GB, while our premium and enterprise plans offer
                100GB and unlimited storage respectively.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h3 className="mb-4 text-xl font-semibold">Still have questions?</h3>
        <p className="text-muted-foreground mx-auto mb-6 max-w-md">
          Our team is just an email away. We&apos;re always happy to help with
          any questions you might have.
        </p>
        <a href="#">
          <Button size="lg">Contact Support</Button>
        </a>
      </div>
    </div>
  );
}
