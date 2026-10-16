import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Checkbox } from '../../../ui/checkbox';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  CreditCardIcon,
  LockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ZapIcon,
} from 'lucide-react';

export default function HeroFormFreeTrialSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    agreeToTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeToTerms: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white dark:from-sky-950 dark:to-slate-900">
        {/* Background elements */}
        <div className="bg-grid-slate-200 dark:bg-grid-slate-800/20 absolute inset-0 bg-[size:24px_24px] opacity-10"></div>
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-sky-200 opacity-20 blur-3xl dark:bg-sky-900"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-200 opacity-20 blur-3xl dark:bg-blue-900"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            {/* Left column - Content */}
            <div className="text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-6 border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-600 dark:border-sky-800 dark:bg-sky-900/20 dark:text-sky-300"
              >
                <ZapIcon className="mr-1 h-3.5 w-3.5" />
                14-Day Free Trial
              </Badge>

              <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
                Supercharge Your Workflow with{' '}
                <span className="text-sky-600 dark:text-sky-400">
                  ProductName
                </span>
              </h1>

              <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-xl lg:mx-0">
                Start your free 14-day trial today. No credit card required, no
                commitments, cancel anytime.
              </p>

              <div className="mb-10 grid gap-8">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0 rounded-full bg-sky-100 p-2 dark:bg-sky-900/30">
                    <SparklesIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold">
                      Full Feature Access
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Get access to all premium features during your trial
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0 rounded-full bg-sky-100 p-2 dark:bg-sky-900/30">
                    <ClockIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold">Quick Setup</h3>
                    <p className="text-muted-foreground text-sm">
                      Be up and running in less than 5 minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0 rounded-full bg-sky-100 p-2 dark:bg-sky-900/30">
                    <CreditCardIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold">No Credit Card</h3>
                    <p className="text-muted-foreground text-sm">
                      We don&apos;t ask for payment details until you&apos;re
                      ready
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800">
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&auto=format&fit=crop&q=80"
                      alt="Testimonial author"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground italic">
                      &quot;We tried several similar tools but none were as
                      intuitive and powerful as ProductName. Our team
                      productivity increased by 35% in the first month
                      alone.&quot;
                    </p>
                    <p className="mt-2 text-sm font-medium">
                      Alex Morgan, CTO at TechStartup
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <div className="inline-flex items-center gap-2 rounded-lg border bg-white p-2 text-sm dark:bg-slate-800">
                  <div className="rounded bg-sky-100 p-1 dark:bg-sky-900/30">
                    <CheckIcon className="h-3 w-3 text-sky-600 dark:text-sky-400" />
                  </div>
                  <span className="text-muted-foreground">
                    5,000+ active users
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-lg border bg-white p-2 text-sm dark:bg-slate-800">
                  <div className="rounded bg-sky-100 p-1 dark:bg-sky-900/30">
                    <CheckIcon className="h-3 w-3 text-sky-600 dark:text-sky-400" />
                  </div>
                  <span className="text-muted-foreground">
                    4.8/5 average rating
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-lg border bg-white p-2 text-sm dark:bg-slate-800">
                  <div className="rounded bg-sky-100 p-1 dark:bg-sky-900/30">
                    <CheckIcon className="h-3 w-3 text-sky-600 dark:text-sky-400" />
                  </div>
                  <span className="text-muted-foreground">24/7 support</span>
                </div>
              </div>
            </div>

            {/* Right column - Form */}
            <div>
              <Card className="overflow-hidden border pb-0 shadow-lg dark:shadow-sky-900/5">
                {!submitted ? (
                  <>
                    <CardHeader className="space-y-1 pb-4">
                      <CardTitle className="text-2xl font-bold">
                        Start Your Free Trial
                      </CardTitle>
                      <CardDescription>
                        Create your account to begin your 14-day trial
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Work email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <span className="text-muted-foreground text-xs">
                              Min. 8 characters
                            </span>
                          </div>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="•••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company name</Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            placeholder="ACME Inc."
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox
                            id="terms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(!!checked)
                            }
                            className="mt-1"
                          />
                          <Label
                            htmlFor="terms"
                            className="text-sm leading-tight font-normal"
                          >
                            I agree to the{' '}
                            <a
                              href="#"
                              className="text-sky-600 underline hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                            >
                              Terms of Service
                            </a>{' '}
                            and{' '}
                            <a
                              href="#"
                              className="text-sky-600 underline hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                            >
                              Privacy Policy
                            </a>
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          className="h-11 w-full bg-sky-600 text-white hover:bg-sky-700"
                          disabled={
                            !formData.email ||
                            !formData.firstName ||
                            !formData.lastName ||
                            !formData.password ||
                            !formData.companyName ||
                            !formData.agreeToTerms ||
                            loading
                          }
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Creating account...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Create Free Account
                              <ArrowRightIcon className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                    <div className="border-t bg-slate-50 px-6 py-4 dark:bg-slate-900/50">
                      <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                        <LockIcon className="h-4 w-4" />
                        <span>
                          Your data is secure and will never be shared
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
                        <CheckIcon className="h-10 w-10 text-sky-600 dark:text-sky-400" />
                      </div>
                    </div>

                    <h3 className="mb-2 text-2xl font-bold">
                      Account Created!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Your 14-day free trial has started. Check your inbox to
                      activate your account.
                    </p>

                    <div className="mb-6 rounded-lg bg-sky-50 p-6 text-left dark:bg-sky-900/20">
                      <h4 className="mb-2 flex items-center gap-2 font-medium">
                        <SparklesIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                        <span>What&apos;s included in your trial:</span>
                      </h4>
                      <ul className="mt-3 space-y-2">
                        <li className="flex gap-2 text-sm">
                          <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Full access to all premium features</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                          <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Unlimited projects and collaborators</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                          <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Priority support from our team</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                          <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Onboarding assistance to get started</span>
                        </li>
                      </ul>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <p className="text-sm">
                        We&apos;ve sent an activation email to{' '}
                        <span className="font-medium">{formData.email}</span>
                      </p>
                      <div className="flex flex-col justify-center gap-3 sm:flex-row">
                        <Button className="bg-sky-600 text-white hover:bg-sky-700">
                          Continue to Dashboard
                        </Button>
                        <Button variant="outline">Resend Email</Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Trust signals */}
              <div className="mt-6">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheckIcon className="text-muted-foreground h-4 w-4" />
                  <p className="text-muted-foreground text-xs">
                    SSL Secured | GDPR Compliant | SOC 2 Certified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
