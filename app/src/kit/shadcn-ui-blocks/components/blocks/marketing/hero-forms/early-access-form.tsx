import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Checkbox } from '../../../ui/checkbox';
import { Badge } from '../../../ui/badge';
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
  RocketIcon,
  UsersIcon,
  ZapIcon,
} from 'lucide-react';

export default function HeroFormEarlyAccess() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [position] = useState(148); // Random waitlist position
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

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
      <div className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white dark:from-violet-950 dark:to-slate-900">
        {/* Background elements */}
        <div className="bg-grid-slate-200 dark:bg-grid-slate-800/20 absolute inset-0 bg-[size:24px_24px] opacity-10"></div>
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500"></div>
        <div className="absolute -top-80 -right-40 h-[500px] w-[500px] rounded-full bg-violet-200 opacity-20 blur-3xl dark:bg-violet-900"></div>
        <div className="absolute -bottom-80 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-200 opacity-20 blur-3xl dark:bg-indigo-900"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            {/* Left column - Content */}
            <div className="text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-6 border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-600 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-300"
              >
                <RocketIcon className="mr-1 h-3.5 w-3.5" />
                Coming Soon
              </Badge>

              <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
                Get{' '}
                <span className="text-violet-600 dark:text-violet-400">
                  Early Access
                </span>{' '}
                to Our Revolutionary Platform
              </h1>

              <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-xl lg:mx-0">
                Join our exclusive waitlist to be among the first to experience
                our game-changing product before it launches to the public.
              </p>

              <div className="mb-10 grid gap-8">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0 rounded-full bg-violet-100 p-2 dark:bg-violet-900/30">
                    <ZapIcon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold">Priority Access</h3>
                    <p className="text-muted-foreground text-sm">
                      Early users get premium features free for the first six
                      months
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0 rounded-full bg-violet-100 p-2 dark:bg-violet-900/30">
                    <UsersIcon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold">
                      Exclusive Community
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Join our founders circle with direct access to our team
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0 rounded-full bg-violet-100 p-2 dark:bg-violet-900/30">
                    <CheckIcon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold">
                      Shape the Future
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Your feedback will directly influence product development
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="mb-6 flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&auto=format&fit=crop&q=80',
                    ].map((src, index) => (
                      <div
                        key={index}
                        className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-slate-900"
                      >
                        <img
                          src={src}
                          alt={`User ${index + 1}`}
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-medium dark:border-slate-900 dark:bg-slate-800">
                      +2k
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Join over{' '}
                    <span className="text-foreground font-medium">2,000</span>{' '}
                    people already on the waitlist
                  </p>
                </div>

                <div className="flex max-w-md flex-col gap-3 sm:flex-row">
                  <div className="inline-flex items-center gap-2 rounded-lg border bg-white p-2 text-sm dark:bg-slate-800">
                    <div className="rounded bg-violet-100 p-1 dark:bg-violet-900/30">
                      <CheckIcon className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span className="text-muted-foreground">
                      Launching in{' '}
                      <span className="text-foreground font-medium">
                        23 days
                      </span>
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-lg border bg-white p-2 text-sm dark:bg-slate-800">
                    <div className="rounded bg-violet-100 p-1 dark:bg-violet-900/30">
                      <CheckIcon className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span className="text-muted-foreground">
                      No credit card required
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Form */}
            <div>
              <Card className="overflow-hidden border pb-0 shadow-lg dark:shadow-violet-900/5">
                {!submitted ? (
                  <>
                    <CardHeader className="space-y-1 pb-4">
                      <CardTitle className="text-2xl font-bold">
                        Join the Waitlist
                      </CardTitle>
                      <CardDescription>
                        Enter your email to secure your spot
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12"
                          />
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox
                            id="terms"
                            checked={acceptTerms}
                            onCheckedChange={(checked) =>
                              setAcceptTerms(!!checked)
                            }
                            className="mt-1"
                          />
                          <Label
                            htmlFor="terms"
                            className="text-sm leading-tight font-normal"
                          >
                            I agree to receive emails about product updates. You
                            can unsubscribe at any time.
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          className="h-12 w-full bg-violet-600 text-white hover:bg-violet-700"
                          disabled={!email || !acceptTerms || loading}
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
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Join Waitlist
                              <ArrowRightIcon className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                    <div className="border-t bg-slate-50 px-6 py-4 dark:bg-slate-900/50">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-24 overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1661956602868-6ae368943878?w=500&auto=format&fit=crop&q=80"
                            alt="Product preview"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            &quot;This product has transformed how we operate.
                            Wish I had joined earlier!&quot;
                          </p>
                          <p className="text-muted-foreground mt-1 text-xs">
                            Sarah Chen, Early Beta User
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                          <CheckIcon className="h-12 w-12 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div className="absolute -top-1 -right-1 rounded-full border-2 border-white bg-white p-1 dark:border-slate-900 dark:bg-slate-900">
                          <RocketIcon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-2 text-2xl font-bold">
                      You&apos;re on the List!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thanks for joining our waitlist. We&apos;re thrilled to
                      have you!
                    </p>

                    <div className="mb-6 inline-block rounded-lg bg-violet-50 p-6 dark:bg-violet-900/20">
                      <div className="text-center">
                        <div className="text-muted-foreground mb-1 text-sm">
                          Your position
                        </div>
                        <div className="mb-1 text-4xl font-bold text-violet-600 dark:text-violet-400">
                          #{position}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          out of 2,183 people
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm">
                        Want to move up in line? Share with your friends!
                      </p>
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm">
                          <svg
                            className="mr-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <svg
                            className="mr-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                          Tweet
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Mobile stats */}
              <div className="mt-8 lg:hidden">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg border bg-white p-4 text-center dark:bg-slate-800">
                    <p className="text-muted-foreground text-sm">
                      People on waitlist
                    </p>
                    <p className="text-2xl font-bold">2,183</p>
                  </div>
                  <div className="rounded-lg border bg-white p-4 text-center dark:bg-slate-800">
                    <p className="text-muted-foreground text-sm">
                      Days until launch
                    </p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-lg border bg-white p-2 text-sm dark:bg-slate-800">
                  <div className="rounded bg-violet-100 p-1 dark:bg-violet-900/30">
                    <CheckIcon className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                  </div>
                  <span className="text-muted-foreground">
                    No credit card required
                  </span>
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
