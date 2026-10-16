import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  CalendarIcon,
  Clock10Icon,
  PhoneIcon,
  MonitorIcon,
  Users2Icon,
  ZapIcon,
  CheckCircle2Icon,
} from 'lucide-react';

export default function HeroFormScheduleDemo() {
  const [step, setStep] = useState(1);
  const [demoType, setDemoType] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

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

  const availableDates = [
    {
      date: 'Mon, Jun 10',
      slots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'],
    },
    { date: 'Tue, Jun 11', slots: ['10:00 AM', '1:00 PM', '3:30 PM'] },
    {
      date: 'Wed, Jun 12',
      slots: ['9:30 AM', '12:00 PM', '3:00 PM', '5:00 PM'],
    },
    { date: 'Thu, Jun 13', slots: ['8:00 AM', '10:30 AM', '2:30 PM'] },
    { date: 'Fri, Jun 14', slots: ['11:00 AM', '1:30 PM', '4:00 PM'] },
  ];

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <>
      {/* Hero */}
      <div className="bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 hidden h-40 w-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 lg:block"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="bg-primary/10 text-primary mb-6 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                <ZapIcon className="mr-1 h-4 w-4" />
                Personalized Experience
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
                Schedule a personalized product demo
              </h1>

              <p className="text-muted-foreground mb-8 text-xl">
                See how our platform can transform your workflow with a live
                demonstration tailored to your needs.
              </p>

              <div className="mb-10 space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 flex-shrink-0 rounded-full p-2">
                    <MonitorIcon className="text-primary h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold">Customized demo</h3>
                    <p className="text-muted-foreground text-sm">
                      Tailored to your specific industry and needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 flex-shrink-0 rounded-full p-2">
                    <Clock10Icon className="text-primary h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold">
                      30-minute session
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Brief but comprehensive overview of key features
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 flex-shrink-0 rounded-full p-2">
                    <Users2Icon className="text-primary h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold">Bring your team</h3>
                    <p className="text-muted-foreground text-sm">
                      Invite colleagues to join your demo session
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border-border/50 mt-12 rounded-lg border p-6">
                <div className="flex items-start">
                  <div className="mt-1 flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
                      alt="Customer success manager"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-muted-foreground mb-2 italic">
                      &quot;Our product specialist will guide you through the
                      platform and answer any questions specific to your use
                      case.&quot;
                    </p>
                    <p className="text-sm font-medium">Michael Roberts</p>
                    <p className="text-muted-foreground text-xs">
                      Customer Success Manager
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-background rounded-xl border p-8 shadow-lg">
              {!submitted ? (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Schedule Your Demo</h2>
                    <div className="text-muted-foreground flex items-center text-sm">
                      Step {step} of 2
                    </div>
                  </div>

                  {/* Step 1: Contact Info */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="mb-2">
                            First name
                          </Label>
                          <Input id="firstName" placeholder="John" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="mb-2">
                            Last name
                          </Label>
                          <Input id="lastName" placeholder="Doe" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="mb-2">
                          Work email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="mb-2">
                          Phone number
                        </Label>
                        <Input id="phone" placeholder="+1 (555) 000-0000" />
                      </div>

                      <div>
                        <Label htmlFor="company" className="mb-2">
                          Company
                        </Label>
                        <Input id="company" placeholder="Acme Inc." />
                      </div>

                      <div>
                        <Label htmlFor="role" className="mb-2">
                          Job title
                        </Label>
                        <Input id="role" placeholder="Product Manager" />
                      </div>

                      <div>
                        <Label htmlFor="team-size" className="mb-2">
                          Team size
                        </Label>
                        <Select>
                          <SelectTrigger id="team-size">
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">
                              11-50 employees
                            </SelectItem>
                            <SelectItem value="51-200">
                              51-200 employees
                            </SelectItem>
                            <SelectItem value="201-500">
                              201-500 employees
                            </SelectItem>
                            <SelectItem value="501+">501+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="mb-2">
                          What are you interested in?
                        </Label>
                        <RadioGroup
                          value={demoType}
                          onValueChange={setDemoType}
                          className="mt-4 space-y-2"
                        >
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem
                              value="product-overview"
                              id="product-overview"
                              className="mt-1"
                            />
                            <Label
                              htmlFor="product-overview"
                              className="cursor-pointer font-normal"
                            >
                              <span className="font-medium">
                                Product Overview
                              </span>
                              <p className="text-muted-foreground text-xs">
                                Complete walkthrough of all features
                              </p>
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem
                              value="specific-features"
                              id="specific-features"
                              className="mt-1"
                            />
                            <Label
                              htmlFor="specific-features"
                              className="cursor-pointer font-normal"
                            >
                              <span className="font-medium">
                                Specific Features
                              </span>
                              <p className="text-muted-foreground text-xs">
                                Focus on particular tools or capabilities
                              </p>
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem
                              value="pricing-options"
                              id="pricing-options"
                              className="mt-1"
                            />
                            <Label
                              htmlFor="pricing-options"
                              className="cursor-pointer font-normal"
                            >
                              <span className="font-medium">
                                Pricing & Options
                              </span>
                              <p className="text-muted-foreground text-xs">
                                Learn about plans and pricing structures
                              </p>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button
                        onClick={handleNext}
                        className="mt-2 w-full"
                        disabled={!demoType}
                      >
                        Continue to Schedule
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Schedule */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="mb-2 block">Select a date</Label>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                          {availableDates.map((dateOption) => (
                            <button
                              key={dateOption.date}
                              type="button"
                              onClick={() => setSelectedDate(dateOption.date)}
                              className={`hover:border-primary rounded-md border p-2 text-center text-sm transition-colors ${
                                selectedDate === dateOption.date
                                  ? 'bg-primary/10 border-primary'
                                  : ''
                              }`}
                            >
                              {dateOption.date}
                            </button>
                          ))}
                        </div>
                      </div>

                      {selectedDate && (
                        <div>
                          <Label className="mb-2 block">Select a time</Label>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {availableDates
                              .find((d) => d.date === selectedDate)
                              ?.slots.map((timeSlot) => (
                                <button
                                  key={timeSlot}
                                  type="button"
                                  onClick={() => setSelectedTime(timeSlot)}
                                  className={`hover:border-primary rounded-md border p-2 text-center text-sm transition-colors ${
                                    selectedTime === timeSlot
                                      ? 'bg-primary/10 border-primary'
                                      : ''
                                  }`}
                                >
                                  <span className="flex items-center justify-center">
                                    <Clock10Icon className="mr-1 h-3 w-3" />
                                    {timeSlot}
                                  </span>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="notes" className="mb-2">
                          Additional notes (optional)
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Let us know about any specific features you're interested in..."
                          rows={3}
                        />
                      </div>

                      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
                        <Button
                          variant="outline"
                          onClick={handleBack}
                          className="sm:w-1/3"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleNext}
                          disabled={!selectedDate || !selectedTime}
                          className="sm:w-2/3"
                        >
                          Confirm Demo
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2Icon className="h-8 w-8 text-green-600" />
                  </div>

                  <h2 className="mb-2 text-2xl font-bold">Demo Scheduled!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your demo has been confirmed. We&apos;ve sent you a calendar
                    invite.
                  </p>

                  <div className="bg-muted mb-6 rounded-lg p-4">
                    <div className="mb-2 flex items-center">
                      <CalendarIcon className="text-muted-foreground mr-2 h-4 w-4" />
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="mb-2 flex items-center">
                      <Clock10Icon className="text-muted-foreground mr-2 h-4 w-4" />
                      <span className="font-medium">{selectedTime} EST</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="text-muted-foreground mr-2 h-4 w-4" />
                      <span className="text-sm">
                        You&apos;ll receive a calendar invite with meeting
                        details
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full">Add to Calendar</Button>
                    <Button variant="outline" className="w-full">
                      Invite a Colleague
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
