"use client";

import { useState } from 'react';

import { Field, FieldGroup, FieldLabel } from '../../../ui/field';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { CheckCircle2 } from 'lucide-react';

const faqs = [
  {
    category: 'Account',
    items: [
      {
        question: 'How do I reset my password?',
        answer:
          "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll email you instructions to create a new password.",
      },
      {
        question: 'Can I change my username?',
        answer:
          'Yes, you can change your username in your account settings. Note that if you change your username, your profile URL will also change.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'You can request account deletion from your account settings page. Please note this action is permanent and all your data will be removed.',
      },
    ],
  },
  {
    category: 'Billing',
    items: [
      {
        question: 'How do I upgrade my plan?',
        answer:
          "You can upgrade your plan from your account settings under the 'Billing' section. Changes take effect immediately and you'll only be charged the prorated difference.",
      },
      {
        question: 'Do you offer refunds?',
        answer:
          "We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact our support team within 30 days of purchase for a full refund.",
      },
      {
        question: 'Can I get an invoice for my subscription?',
        answer:
          'Yes, you can download invoices for all your payments from the Billing section of your account. Invoices are also automatically emailed to you.',
      },
    ],
  },
  {
    category: 'Service',
    items: [
      {
        question: 'What are your support hours?',
        answer:
          'Our support team is available 24/7 for all paid plans. Free plan users can access support during business hours (9 AM - 5 PM EST, Monday to Friday).',
      },
      {
        question: 'How do I report a bug?',
        answer:
          'You can report bugs through the Help section in your dashboard or by emailing support directly. Please include as much detail as possible to help us reproduce the issue.',
      },
      {
        question: 'Do you offer phone support?',
        answer:
          'Phone support is available for Enterprise plan customers. All other plans can access support via email and chat.',
      },
    ],
  },
];

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState('Account');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <div className="container mx-auto max-w-[85rem] px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
        {/* FAQ Section */}
        <div>
          <div className="max-w-md">
            <h2 className="text-2xl font-bold md:text-3xl md:leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4">
              Find answers to common questions or contact our support team
            </p>
          </div>

          <div className="mt-8">
            <Tabs
              defaultValue="Account"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-6 grid grid-cols-3">
                {faqs.map((category) => (
                  <TabsTrigger
                    key={category.category}
                    value={category.category}
                  >
                    {category.category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqs.map((category) => (
                <TabsContent
                  key={category.category}
                  value={category.category}
                  className="space-y-6"
                >
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="border-border border-b pb-6 last:border-0"
                    >
                      <h3 className="mb-2 font-medium">{item.question}</h3>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="mt-10">
            <a href="#">
              <Button variant="outline" size="sm">
                View all FAQs
              </Button>
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-muted/40 rounded-xl p-6 md:p-8">
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-semibold">
                  Still have questions?
                </h3>
                <p className="text-muted-foreground">
                  Contact our support team and we&apos;ll get back to you as
                  soon as possible.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                      <Input id="contact-name" placeholder="Your name" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                      <Input id="contact-email" placeholder="Your email" />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
                    <Input
                      id="contact-subject"
                      placeholder="How can we help you?"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                    <Textarea
                      id="contact-message"
                      placeholder="Please provide as much detail as possible..."
                      className="min-h-[120px]"
                    />
                  </Field>
                </FieldGroup>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </>
          ) : (
            <div className="py-10 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Message Sent!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for reaching out. We&apos;ll get back to you as soon
                as possible.
              </p>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          )}

          <div className="border-border mt-8 border-t pt-6">
            <p className="text-muted-foreground text-center text-sm">
              Prefer direct contact? Email us at{' '}
              <a href="#" className="text-primary font-medium hover:underline">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
