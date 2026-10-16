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
  ArrowDownIcon,
  BookOpenIcon,
  CheckIcon,
  DownloadIcon,
  FileTextIcon,
} from 'lucide-react';

export default function HeroFormFreeEbook() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
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
      <div className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-900">
        {/* Background elements */}
        <div className="bg-grid-slate-200 dark:bg-grid-slate-800/20 absolute inset-0 bg-[size:24px_24px] opacity-10"></div>
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-green-200 opacity-20 blur-3xl dark:bg-green-900"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-200 opacity-20 blur-3xl dark:bg-teal-900"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            {/* Left column - Content */}
            <div className="lg:order-2 lg:pl-8">
              <Badge
                variant="outline"
                className="mb-6 border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-600 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300"
              >
                <FileTextIcon className="mr-1 h-3.5 w-3.5" />
                Free Guide
              </Badge>

              <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
                Download Our{' '}
                <span className="text-green-600 dark:text-green-400">
                  Ultimate Guide
                </span>{' '}
                to Growth Marketing
              </h1>

              <p className="text-muted-foreground mb-8 text-xl">
                Learn proven strategies to acquire, convert, and retain
                customers with our comprehensive 50-page ebook.
              </p>

              <div className="mb-10 space-y-6">
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                    <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">50+ pages</span> of
                      actionable strategies and frameworks
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                    <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">
                        Real-world case studies
                      </span>{' '}
                      from top-performing companies
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                    <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">
                        Step-by-step frameworks
                      </span>{' '}
                      you can implement immediately
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                    <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Expert insights</span> from
                      industry-leading marketers
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-800">
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1548142813-c348350df52b?w=300&h=300&auto=format&fit=crop&q=80"
                      alt="Testimonial author"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm italic">
                      &quot;This guide helped us increase our conversion rate by
                      37% in just 45 days. The step-by-step approach made it
                      easy to implement the strategies right away.&quot;
                    </p>
                    <p className="mt-2 text-sm font-medium">
                      Jessica Miller, Marketing Director
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:hidden">
                <Button
                  onClick={() =>
                    document
                      .getElementById('download-form')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="w-full bg-green-600 text-white hover:bg-green-700"
                >
                  Get Your Free Copy
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right column - Form & Book Preview */}
            <div className="lg:order-1" id="download-form">
              <div className="relative">
                {/* Ebook Preview Image */}
                <div className="absolute -top-16 -right-16 z-10 hidden h-32 w-32 rotate-12 transform items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white shadow-xl lg:block">
                  <div className="flex h-full -rotate-12 transform flex-col items-center justify-center text-center">
                    <div className="text-xs">FREE</div>
                    <div>DOWNLOAD</div>
                  </div>
                </div>

                <div className="relative mx-auto mb-8 w-full max-w-xs lg:max-w-none">
                  <div className="relative z-10 mx-auto w-[240px] drop-shadow-xl transition-all duration-200 hover:rotate-1">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop&crop=focalpoint&fp-y=0.45"
                      alt="Ultimate Guide to Growth Marketing ebook cover"
                      width={240}
                      height={320}
                      className="h-[320px] w-[240px] rounded-lg border-8 border-white object-cover dark:border-slate-900"
                    />
                  </div>

                  <div className="absolute -bottom-4 left-1/2 z-0 h-[320px] w-[240px] -translate-x-1/2 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 opacity-25 blur-xl"></div>
                </div>

                {!submitted ? (
                  <Card className="overflow-hidden border pb-0 shadow-md">
                    <CardHeader className="pb-4">
                      <CardTitle>Get Your Free Copy</CardTitle>
                      <CardDescription>
                        Enter your details to download the ebook instantly
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="firstName" className="mb-2">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Jane"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="mb-2">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jane@example.com"
                            required
                          />
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox
                            id="terms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={handleCheckboxChange}
                            className="mt-1"
                          />
                          <Label
                            htmlFor="terms"
                            className="text-sm leading-tight font-normal"
                          >
                            I agree to receive marketing emails. You can
                            unsubscribe at any time. View our{' '}
                            <a
                              href="#"
                              className="text-green-600 hover:underline dark:text-green-400"
                            >
                              Privacy Policy
                            </a>
                            .
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-green-600 text-white hover:bg-green-700"
                          disabled={
                            !formData.email || !formData.agreeToTerms || loading
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
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Download Ebook
                              <DownloadIcon className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                    <div className="text-muted-foreground border-t bg-slate-50 px-6 py-4 text-center text-xs dark:bg-slate-900/50">
                      Your information is secure and will never be shared with
                      third parties.
                    </div>
                  </Card>
                ) : (
                  <Card className="overflow-hidden border shadow-md">
                    <div className="p-8 text-center">
                      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <DownloadIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>

                      <h3 className="mb-2 text-2xl font-bold">
                        Your Download is Ready!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for your interest in our ebook.
                      </p>

                      <Button className="mb-6 bg-green-600 text-white hover:bg-green-700">
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download Now (5.2 MB)
                      </Button>

                      <Separator className="my-6" />

                      <div className="text-left">
                        <h4 className="mb-2 font-medium">Check your inbox</h4>
                        <p className="text-muted-foreground mb-4 text-sm">
                          We&apos;ve also sent a download link to{' '}
                          <span className="font-medium">{formData.email}</span>{' '}
                          in case you want to access the ebook later.
                        </p>

                        <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm dark:border-green-900/30 dark:bg-green-900/20">
                          <p className="flex items-start">
                            <BookOpenIcon className="mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                            <span>
                              <span className="block font-medium">
                                Bonus tip:
                              </span>
                              Check out page 24 for our exclusive ROI calculator
                              template!
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
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
