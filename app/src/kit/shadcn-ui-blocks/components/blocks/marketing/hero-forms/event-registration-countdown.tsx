import { useState, useEffect } from 'react';

import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { Separator } from '../../../ui/separator';
import { CalendarIcon, MapPinIcon, TicketIcon } from 'lucide-react';

export default function HeroFormEventRegistrationCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set the event date (1 month from now)
  const [eventDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(eventDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
            alt="Conference hall"
            className="object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="bg-primary/10 text-primary mb-6 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {eventDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
                Annual Developer Conference 2024
              </h1>

              <p className="text-muted-foreground mb-8 text-xl">
                Join industry leaders and developers from around the world for
                our biggest event of the year.
              </p>

              <div className="mb-8 flex items-center">
                <MapPinIcon className="text-muted-foreground mr-2 h-5 w-5" />
                <span>Tech Conference Center, San Francisco, CA</span>
              </div>

              {/* Countdown Timer */}
              <div className="my-8 grid max-w-md grid-cols-4 gap-2 md:gap-4">
                <div className="bg-primary/5 border-primary/10 rounded-lg border p-2 text-center md:p-4">
                  <div className="text-primary text-2xl font-bold md:text-3xl">
                    {timeLeft.days}
                  </div>
                  <div className="text-muted-foreground text-xs tracking-wider uppercase">
                    Days
                  </div>
                </div>
                <div className="bg-primary/5 border-primary/10 rounded-lg border p-2 text-center md:p-4">
                  <div className="text-primary text-2xl font-bold md:text-3xl">
                    {timeLeft.hours}
                  </div>
                  <div className="text-muted-foreground text-xs tracking-wider uppercase">
                    Hours
                  </div>
                </div>
                <div className="bg-primary/5 border-primary/10 rounded-lg border p-2 text-center md:p-4">
                  <div className="text-primary text-2xl font-bold md:text-3xl">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-muted-foreground text-xs tracking-wider uppercase">
                    Minutes
                  </div>
                </div>
                <div className="bg-primary/5 border-primary/10 rounded-lg border p-2 text-center md:p-4">
                  <div className="text-primary text-2xl font-bold md:text-3xl">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-muted-foreground text-xs tracking-wider uppercase">
                    Seconds
                  </div>
                </div>
              </div>

              {/* Event Highlights */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-green-500"></div>
                  <div className="ml-3">
                    <h3 className="font-medium">Keynote Speakers</h3>
                    <p className="text-muted-foreground text-sm">
                      Hear from tech leaders about the future of development
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-blue-500"></div>
                  <div className="ml-3">
                    <h3 className="font-medium">Hands-on Workshops</h3>
                    <p className="text-muted-foreground text-sm">
                      Practical sessions on the latest tech and frameworks
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-purple-500"></div>
                  <div className="ml-3">
                    <h3 className="font-medium">Networking Opportunities</h3>
                    <p className="text-muted-foreground text-sm">
                      Connect with peers and potential collaborators
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-background/95 rounded-xl border p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-6 flex items-center">
                <TicketIcon className="text-primary mr-2 h-6 w-6" />
                <h2 className="text-2xl font-bold">Register Now</h2>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="mb-2">
                      First name
                    </Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="mb-2">
                      Last name
                    </Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="mb-2">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="mb-2">
                    Company/Organization
                  </Label>
                  <Input id="company" placeholder="Acme Inc." />
                </div>

                <div>
                  <Label htmlFor="ticket" className="mb-2">
                    Ticket type
                  </Label>
                  <Select>
                    <SelectTrigger id="ticket">
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        Standard Pass ($299)
                      </SelectItem>
                      <SelectItem value="vip">VIP Pass ($499)</SelectItem>
                      <SelectItem value="virtual">
                        Virtual Pass ($99)
                      </SelectItem>
                      <SelectItem value="student">
                        Student Pass ($79)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="pt-2">
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Early Bird Discount</span>
                    <span className="font-medium text-green-600">-$50.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>$249.00</span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Early bird pricing ends in 7 days
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Secure Your Spot
                </Button>
              </form>

              <p className="text-muted-foreground mt-4 text-center text-xs">
                By registering, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">
                  Event Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
