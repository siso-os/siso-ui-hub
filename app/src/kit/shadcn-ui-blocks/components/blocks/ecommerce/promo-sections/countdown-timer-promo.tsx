import React, { useState, useEffect, JSX } from 'react';

import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card } from '../../../ui/card';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimerPromo() {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date('2025-12-31T23:59:59') - +new Date();
    let timeLeft: TimeLeft | null = null;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  if (timeLeft) {
    Object.keys(timeLeft).forEach((interval) => {
      const value = timeLeft[interval as keyof TimeLeft];
      if (value < 0) return; // Should not happen with current logic, but safe check

      timerComponents.push(
        <div key={interval} className="flex flex-col items-center">
          <span className="text-2xl font-semibold sm:text-3xl">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-muted-foreground text-xs uppercase">
            {interval}
          </span>
        </div>
      );
    });
  } else {
    timerComponents.push(
      <span key="ended" className="text-destructive text-xl font-semibold">
        Offer Ended!
      </span>
    );
  }

  return (
    <div className="bg-background relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="from-primary/10 absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative order-last lg:order-first">
            <Card className="overflow-hidden p-0 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1200&auto=format&fit=crop"
                alt="Flash sale product - Gaming Monitor"
                width={600}
                height={450}
                className="h-full w-full object-cover"
              />
            </Card>
            <div className="bg-accent/20 absolute -right-4 -bottom-4 -z-10 h-48 w-48 rounded-full blur-2xl" />
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left">
            <Badge variant="destructive" className="mb-4">
              Flash Sale
            </Badge>
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Don&apos;t Miss Out!
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Limited time offer on our best-selling gaming monitor. Get 40% off
              while stocks last. Sale ends soon!
            </p>

            {/* Countdown Timer */}
            <div className="mt-8">
              <h3 className="text-primary text-sm font-medium tracking-wider uppercase">
                Time Remaining
              </h3>
              <div className="mt-4 flex justify-center gap-4 sm:gap-6 lg:justify-start">
                {timerComponents.length ? (
                  timerComponents
                ) : (
                  <span>Loading timer...</span>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                disabled={!timeLeft}
                className="w-full sm:w-auto"
              >
                Shop the Sale
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <a href="#">View Product Details</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
