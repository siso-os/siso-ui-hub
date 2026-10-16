import { useState } from 'react';

import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Checkbox } from '../../../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import {
  MailIcon,
  CheckIcon,
  ChevronRightIcon,
  BellIcon,
  SettingsIcon,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

export default function HeroFormNewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState('weekly');
  const [topics, setTopics] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleTopicChange = (topic: string) => {
    setTopics(
      topics.includes(topic)
        ? topics.filter((t) => t !== topic)
        : [...topics, topic]
    );
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-slate-900">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-200 opacity-20 blur-3xl dark:bg-purple-900"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-200 opacity-20 blur-3xl dark:bg-indigo-900"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            {/* Left Content */}
            <div className="lg:col-span-3">
              <div className="mb-6 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                <MailIcon className="mr-1 h-4 w-4" />
                Newsletter
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
                Stay ahead with our weekly insights
              </h1>

              <p className="text-muted-foreground mb-8 text-xl">
                Join our newsletter and get the latest industry trends, tech
                news, and expert advice delivered right to your inbox.
              </p>

              <div className="mb-12 grid gap-6 sm:grid-cols-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                    <CheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold">Curated content</h3>
                    <p className="text-muted-foreground text-sm">
                      Handpicked articles and resources
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                    <CheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold">
                      Exclusive insights
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Analysis and perspectives from experts
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                    <CheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold">Customizable</h3>
                    <p className="text-muted-foreground text-sm">
                      Choose topics that matter to you
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                    <CheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold">Zero spam</h3>
                    <p className="text-muted-foreground text-sm">
                      Unsubscribe anytime with one click
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30">
                    <img
                      src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&auto=format&fit=crop&q=80"
                      alt="Testimonial author"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 italic">
                      &quot;This newsletter has become my go-to resource for
                      staying updated on industry trends. The curated content
                      saves me hours of research every week.&quot;
                    </p>
                    <p className="text-sm font-medium">Alex Thompson</p>
                    <p className="text-muted-foreground text-xs">
                      Product Manager @ Acme Inc
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border bg-white p-6 shadow-lg dark:bg-slate-800">
                {!submitted ? (
                  <>
                    <div className="mb-6 text-center">
                      <h2 className="text-2xl font-bold">Subscribe Now</h2>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {step === 1
                          ? 'Enter your details to get started'
                          : 'Customize your newsletter experience'}
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="mb-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium">
                          Step {step} of 2
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {step === 1 ? '50%' : '100%'}
                        </span>
                      </div>
                      <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                          style={{ width: step === 1 ? '50%' : '100%' }}
                        ></div>
                      </div>
                    </div>

                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                      <form className="space-y-4">
                        <div>
                          <Label htmlFor="firstName" className="mb-2">
                            First name
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="mb-2">
                            Email address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <Button
                          onClick={handleNext}
                          className="w-full"
                          disabled={!email}
                        >
                          Continue
                          <ChevronRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    )}

                    {/* Step 2: Preferences */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <Tabs defaultValue="topics">
                          <TabsList className="mb-4 grid w-full grid-cols-2">
                            <TabsTrigger value="topics">
                              <SettingsIcon className="mr-2 h-4 w-4" />
                              Topics
                            </TabsTrigger>
                            <TabsTrigger value="frequency">
                              <BellIcon className="mr-2 h-4 w-4" />
                              Frequency
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="topics" className="space-y-4">
                            <div>
                              <Label className="mb-2 block">
                                Choose your interests
                              </Label>
                              <p className="text-muted-foreground mb-3 text-xs">
                                Select topics you&apos;d like to receive content
                                about
                              </p>

                              <div className="grid grid-cols-2 gap-3">
                                {[
                                  { id: 'technology', label: 'Technology' },
                                  { id: 'business', label: 'Business' },
                                  { id: 'design', label: 'Design' },
                                  { id: 'marketing', label: 'Marketing' },
                                  { id: 'development', label: 'Development' },
                                  { id: 'productivity', label: 'Productivity' },
                                ].map((topic) => (
                                  <div
                                    key={topic.id}
                                    className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                                      topics.includes(topic.id)
                                        ? 'border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/20'
                                        : 'hover:bg-muted/50'
                                    }`}
                                    onClick={() => handleTopicChange(topic.id)}
                                  >
                                    <div className="flex items-center">
                                      <Checkbox
                                        id={`topic-${topic.id}`}
                                        checked={topics.includes(topic.id)}
                                        className="mr-2"
                                      />
                                      <Label
                                        htmlFor={`topic-${topic.id}`}
                                        className="cursor-pointer font-normal"
                                      >
                                        {topic.label}
                                      </Label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="frequency" className="space-y-4">
                            <div>
                              <Label className="mb-2 block">
                                Delivery frequency
                              </Label>
                              <p className="text-muted-foreground mb-3 text-xs">
                                How often would you like to hear from us?
                              </p>

                              <RadioGroup
                                value={frequency}
                                onValueChange={setFrequency}
                                className="space-y-3"
                              >
                                {[
                                  {
                                    value: 'daily',
                                    title: 'Daily',
                                    description: 'Get updates every weekday',
                                  },
                                  {
                                    value: 'weekly',
                                    title: 'Weekly',
                                    description:
                                      'Receive a weekly digest every Monday',
                                  },
                                  {
                                    value: 'monthly',
                                    title: 'Monthly',
                                    description: 'Get a summary once a month',
                                  },
                                ].map((option) => (
                                  <div
                                    key={option.value}
                                    className={`rounded-lg border p-3 transition-colors ${
                                      frequency === option.value
                                        ? 'border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/20'
                                        : 'hover:bg-muted/50'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value={option.value}
                                        id={option.value}
                                      />
                                      <div>
                                        <Label
                                          htmlFor={option.value}
                                          className="cursor-pointer font-medium"
                                        >
                                          {option.title}
                                        </Label>
                                        <p className="text-muted-foreground text-xs">
                                          {option.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </TabsContent>
                        </Tabs>

                        <div className="flex gap-3 pt-2">
                          <Button
                            variant="outline"
                            onClick={handleBack}
                            className="w-1/3"
                          >
                            Back
                          </Button>
                          <Button
                            onClick={handleNext}
                            className="w-2/3"
                            disabled={topics.length === 0}
                          >
                            Subscribe Now
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 text-center">
                      <p className="text-muted-foreground text-xs">
                        By subscribing, you agree to our{' '}
                        <a
                          href="#"
                          className="text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                          Terms
                        </a>{' '}
                        and{' '}
                        <a
                          href="#"
                          className="text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                      <CheckIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    </div>

                    <h2 className="mb-2 text-2xl font-bold">Thank You!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your subscription has been confirmed. You&apos;ve been
                      added to our newsletter list and will get the next issue
                      soon.
                    </p>

                    <div className="mb-6 rounded-lg bg-indigo-50 p-4 text-left dark:bg-indigo-900/20">
                      <h3 className="mb-2 text-sm font-medium">
                        Your preferences
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Frequency:
                          </span>
                          <span className="font-medium capitalize">
                            {frequency}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Topics:</span>
                          <span className="font-medium">
                            {topics
                              .map(
                                (t) => t.charAt(0).toUpperCase() + t.slice(1)
                              )
                              .join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm">
                        Want to manage your subscription preferences?
                      </p>
                      <Button variant="outline" className="w-full">
                        Manage Preferences
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
