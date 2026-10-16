import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Checkbox } from '../../../ui/checkbox';
import { Separator } from '../../../ui/separator';
import { Badge } from '../../../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  LaptopIcon,
  PlayCircleIcon,
  UsersIcon,
} from 'lucide-react';

export default function HeroFormWebinarRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    companySize: '',
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

  const handleSelectChange = (name: string, value: string) => {
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

  // Webinar details
  const webinarDate = 'June 15, 2024';
  const webinarTime = '11:00 AM EST';
  const webinarDuration = '60 minutes';
  const webinarSpeakers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Data Scientist',
      company: 'TechGrowth Inc.',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'VP of Product',
      company: 'Innovate Solutions',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-slate-900">
        {/* Background elements */}
        <div className="bg-grid-slate-200 dark:bg-grid-slate-800/20 absolute inset-0 bg-[size:24px_24px] opacity-10"></div>
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-500"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200 opacity-20 blur-3xl dark:bg-blue-900"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-200 opacity-20 blur-3xl dark:bg-indigo-900"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            {/* Left column - Content */}
            <div>
              <Badge
                variant="outline"
                className="mb-6 border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
              >
                <LaptopIcon className="mr-1 h-3.5 w-3.5" />
                Free Webinar
              </Badge>

              <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
                <span className="text-blue-600 dark:text-blue-400">
                  2024 AI Trends
                </span>
                : How to Leverage AI for Business Growth
              </h1>

              <div className="mb-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm dark:bg-slate-800">
                  <CalendarIcon className="h-4 w-4 text-blue-500" />
                  <span>{webinarDate}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm dark:bg-slate-800">
                  <ClockIcon className="h-4 w-4 text-blue-500" />
                  <span>{webinarTime}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm dark:bg-slate-800">
                  <PlayCircleIcon className="h-4 w-4 text-blue-500" />
                  <span>{webinarDuration}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 text-xl">
                Join our expert panel as they discuss the latest AI trends and
                practical strategies for implementing AI solutions in your
                business to drive growth and efficiency.
              </p>

              <div className="mb-10 space-y-6">
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 rounded-full bg-blue-100 p-1 dark:bg-blue-900/30">
                    <CheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">
                        Real-world case studies
                      </span>{' '}
                      of successful AI implementations
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 rounded-full bg-blue-100 p-1 dark:bg-blue-900/30">
                    <CheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">
                        Cost-effective strategies
                      </span>{' '}
                      for businesses of all sizes
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 rounded-full bg-blue-100 p-1 dark:bg-blue-900/30">
                    <CheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Live Q&A session</span> with
                      industry-leading experts
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 rounded-full bg-blue-100 p-1 dark:bg-blue-900/30">
                    <CheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Exclusive resources</span>{' '}
                      for all registrants, including the webinar recording
                    </p>
                  </div>
                </div>
              </div>

              {/* Speakers */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">
                  Meet Our Speakers
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {webinarSpeakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-lg border bg-white p-4 dark:bg-slate-800"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{speaker.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {speaker.role}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {speaker.company}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:hidden">
                <Button
                  onClick={() =>
                    document
                      .getElementById('registration-form')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Register Now - It&apos;s Free
                </Button>
              </div>
            </div>

            {/* Right column - Form */}
            <div id="registration-form">
              {!submitted ? (
                <Card className="overflow-hidden border p-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <CardTitle className="text-2xl">
                      Reserve Your Spot
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Limited seats available - Register today!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="firstName" className="mb-2">
                            First Name*
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
                          <Label htmlFor="lastName" className="mb-2">
                            Last Name*
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="mb-2">
                          Work Email*
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jane@company.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="company" className="mb-2">
                          Company Name*
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="ACME Inc."
                          required
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="jobTitle" className="mb-2">
                            Job Title*
                          </Label>
                          <Input
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="Marketing Manager"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="companySize" className="mb-2">
                            Company Size*
                          </Label>
                          <Select
                            value={formData.companySize}
                            onValueChange={(value) =>
                              handleSelectChange('companySize', value)
                            }
                          >
                            <SelectTrigger id="companySize">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">
                                1-10 employees
                              </SelectItem>
                              <SelectItem value="11-50">
                                11-50 employees
                              </SelectItem>
                              <SelectItem value="51-200">
                                51-200 employees
                              </SelectItem>
                              <SelectItem value="201-500">
                                201-500 employees
                              </SelectItem>
                              <SelectItem value="501+">
                                501+ employees
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
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
                          <div>
                            I agree to receive communications about products,
                            services, and events. You can unsubscribe anytime.
                            View our{' '}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Privacy Policy
                            </a>
                          </div>
                          .
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                        disabled={
                          !formData.email ||
                          !formData.agreeToTerms ||
                          loading ||
                          !formData.firstName ||
                          !formData.lastName ||
                          !formData.company ||
                          !formData.jobTitle ||
                          !formData.companySize
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
                          <span>Register for Webinar</span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                  <div className="border-t bg-slate-50 px-6 py-4 dark:bg-slate-900/50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <UsersIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">874 people</span> have
                          already registered
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="overflow-hidden border shadow-md">
                  <div className="p-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <CheckIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>

                    <h3 className="mb-2 text-2xl font-bold">
                      You&apos;re Registered!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for registering for our webinar on AI Trends.
                    </p>

                    <div className="mb-6 rounded-lg bg-blue-50 p-6 text-left dark:bg-blue-900/20">
                      <h4 className="mb-2 font-medium">Webinar Details</h4>
                      <div className="space-y-2">
                        <div className="flex gap-2 text-sm">
                          <CalendarIcon className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                          <span>
                            <span className="font-medium">Date:</span>{' '}
                            {webinarDate}
                          </span>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <ClockIcon className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                          <span>
                            <span className="font-medium">Time:</span>{' '}
                            {webinarTime} ({webinarDuration})
                          </span>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <LaptopIcon className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                          <span>
                            <span className="font-medium">Where:</span>{' '}
                            We&apos;ll send a Zoom link to {formData.email} 24
                            hours before the event
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4 text-left">
                      <h4 className="font-medium">Next Steps</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium dark:bg-blue-900/30">
                            1
                          </div>
                          <p className="text-sm">
                            Add this event to your calendar. You&apos;ll also
                            receive a calendar invitation by email.
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium dark:bg-blue-900/30">
                            2
                          </div>
                          <p className="text-sm">
                            Check your inbox for a confirmation email with more
                            details about the webinar.
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium dark:bg-blue-900/30">
                            3
                          </div>
                          <p className="text-sm">
                            Prepare any questions you&apos;d like our speakers
                            to address during the Q&A session.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Additional info */}
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Can&apos;t make it? Register anyway and we&apos;ll send you
                  the recording.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
