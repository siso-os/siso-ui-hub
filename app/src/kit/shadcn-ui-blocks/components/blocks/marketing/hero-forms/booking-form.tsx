import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { Checkbox } from '../../../ui/checkbox';
import { Badge } from '../../../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { Separator } from '../../../ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../ui/popover';
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
  HeadphonesIcon,
  MapPinIcon,
  UserIcon,
} from 'lucide-react';
import { Calendar } from '../../../ui/calendar';
import { format } from 'date-fns';

export default function HeroFormBooking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    date: undefined as Date | undefined,
    timeSlot: '',
    message: '',
    agreeToTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dummy data
  const serviceTypes = [
    'Business Strategy',
    'Financial Planning',
    'Marketing Consultation',
    'Legal Advice',
    'IT Consultation',
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:30 AM - 11:30 AM',
    '1:00 PM - 2:00 PM',
    '2:30 PM - 3:30 PM',
    '4:00 PM - 5:00 PM',
  ];

  const expertDetails = {
    name: 'Dr. Sarah Johnson',
    title: 'Senior Business Strategist',
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&auto=format&fit=crop&q=80',
    experience: '15+ years',
    specialties: [
      'Strategic Planning',
      'Growth Optimization',
      'Business Transformation',
    ],
    ratings: 4.9,
    reviewCount: 237,
  };

  const testimonials = [
    {
      quote:
        'The consultation was incredibly valuable for our business. We implemented the strategies and saw a 40% increase in revenue within 3 months.',
      author: 'Michael Chen',
      company: 'TechStart Inc.',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&auto=format&fit=crop&q=80',
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleDateChange = (date?: Date) => {
    setFormData((prev) => ({
      ...prev,
      date,
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
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-slate-900">
      {/* Background elements */}
      <div className="bg-grid-slate-200 dark:bg-grid-slate-800/20 absolute inset-0 bg-[size:24px_24px] opacity-10"></div>
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500"></div>
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-200 opacity-20 blur-3xl dark:bg-purple-900"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-200 opacity-20 blur-3xl dark:bg-indigo-900"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          {/* Left column - Expert profile and value proposition */}
          <div>
            <Badge
              variant="outline"
              className="mb-6 border-purple-200 bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
            >
              <HeadphonesIcon className="mr-1 h-3.5 w-3.5" />
              Free 30-Minute Consultation
            </Badge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
              Book Your{' '}
              <span className="text-purple-600 dark:text-purple-400">
                Strategy Session
              </span>{' '}
              With Our Expert
            </h1>

            <p className="text-muted-foreground mb-8 text-xl">
              Get personalized advice and actionable insights to help your
              business grow and overcome challenges.
            </p>

            {/* Expert profile card */}
            <Card className="mb-8 overflow-hidden border p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative h-[200px] w-full md:h-auto md:w-1/3">
                  <img
                    src={expertDetails.imageUrl}
                    alt={expertDetails.name}
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold">{expertDetails.name}</h3>
                    <Badge className="border-yellow-200 bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Top Rated
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {expertDetails.title}
                  </p>

                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-muted-foreground text-sm">
                        {expertDetails.experience}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Rating</p>
                      <div className="flex items-center">
                        <span className="mr-1 text-sm">
                          {expertDetails.ratings}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(expertDetails.ratings)
                                  ? 'text-yellow-500'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <span className="text-muted-foreground ml-1 text-xs">
                          ({expertDetails.reviewCount})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {expertDetails.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Value propositions */}
            <div className="mb-10 space-y-6">
              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                  <CheckIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Personalized strategy</span>{' '}
                    tailored to your specific business needs
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                  <CheckIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Actionable insights</span> you
                    can implement immediately
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                  <CheckIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Expert guidance</span> from
                    industry professionals with proven success
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                  <CheckIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Flexible scheduling</span> to
                    fit your busy calendar
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg border bg-white p-6 shadow-sm dark:bg-zinc-800"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.author}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <p className="mt-2 text-sm font-medium">
                      {testimonial.author}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 lg:hidden">
              <Button
                onClick={() =>
                  document
                    .getElementById('booking-form')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
              >
                Book Your Free Consultation
              </Button>
            </div>
          </div>

          {/* Right column - Booking form */}
          <div id="booking-form">
            {!submitted ? (
              <Card className="overflow-hidden border p-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                  <CardTitle className="text-2xl">
                    Schedule Your Free Consultation
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    30 minutes that could transform your business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name*</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number*</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType">
                        What would you like to discuss?*
                      </Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) =>
                          handleSelectChange('serviceType', value)
                        }
                      >
                        <SelectTrigger id="serviceType">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date*</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.date ? (
                                format(formData.date, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.date}
                              onSelect={handleDateChange}
                              disabled={(date: Date) => {
                                // Disable past dates, Sundays, and Saturdays
                                return (
                                  date <
                                    new Date(new Date().setHours(0, 0, 0, 0)) ||
                                  date.getDay() === 0 ||
                                  date.getDay() === 6
                                );
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeSlot">Preferred Time*</Label>
                        <Select
                          value={formData.timeSlot}
                          onValueChange={(value) =>
                            handleSelectChange('timeSlot', value)
                          }
                          disabled={!formData.date}
                        >
                          <SelectTrigger id="timeSlot">
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Brief description of your needs (optional)
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please share any specific questions or challenges you'd like to discuss"
                        className="min-h-[100px]"
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
                        <div>
                          I agree to the{' '}
                          <a
                            href="#"
                            className="text-purple-600 hover:underline dark:text-purple-400"
                          >
                            terms of service
                          </a>{' '}
                          and understand that my information will be processed
                          in accordance with the{' '}
                          <a
                            href="#"
                            className="text-purple-600 hover:underline dark:text-purple-400"
                          >
                            privacy policy
                          </a>
                          .
                        </div>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-purple-600 text-white hover:bg-purple-700"
                      disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.serviceType ||
                        !formData.date ||
                        !formData.timeSlot ||
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
                          Processing...
                        </span>
                      ) : (
                        <span>Secure Your Spot</span>
                      )}
                    </Button>
                  </form>
                </CardContent>
                <div className="border-t bg-slate-50 px-6 py-4 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <ClockIcon className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">
                        30 min session
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <UserIcon className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">
                        1-on-1 video call
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPinIcon className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">Remote</span>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="overflow-hidden border p-0 shadow-md">
                <div className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <CheckIcon className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-2xl font-bold">
                    Consultation Booked!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We&apos;ve received your request and will confirm your
                    appointment shortly.
                  </p>

                  <div className="mb-6 rounded-lg bg-purple-50 p-6 text-left dark:bg-purple-900/20">
                    <h4 className="mb-4 font-medium">
                      Your appointment details:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon className="h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                        <div>
                          <span className="font-medium">Date:</span>{' '}
                          {formData.date ? format(formData.date, 'PPPP') : ''}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                        <div>
                          <span className="font-medium">Time:</span>{' '}
                          {formData.timeSlot}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <HeadphonesIcon className="h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                        <div>
                          <span className="font-medium">Topic:</span>{' '}
                          {formData.serviceType}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <UserIcon className="h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                        <div>
                          <span className="font-medium">Consultant:</span>{' '}
                          {expertDetails.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4 text-left">
                    <h4 className="font-medium">What happens next?</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-medium dark:bg-purple-900/30">
                          1
                        </div>
                        <p className="text-sm">
                          You&apos;ll receive a confirmation email with a
                          calendar invite and details to join the video call.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-medium dark:bg-purple-900/30">
                          2
                        </div>
                        <p className="text-sm">
                          Our consultant will review your information before the
                          call to prepare personalized advice.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-medium dark:bg-purple-900/30">
                          3
                        </div>
                        <p className="text-sm">
                          Join the video call at the scheduled time using the
                          link provided in your email.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="bg-purple-600 text-white hover:bg-purple-700">
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Additional info */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Need to reschedule? Contact us at{' '}
                <a
                  href="mailto:support@company.com"
                  className="text-purple-600 hover:underline dark:text-purple-400"
                >
                  support@company.com
                </a>{' '}
                or call{' '}
                <a
                  href="tel:+18001234567"
                  className="text-purple-600 hover:underline dark:text-purple-400"
                >
                  1-800-123-4567
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
