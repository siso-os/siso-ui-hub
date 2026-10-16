import { Button } from '../../../ui/button';
import { useEffect, useState } from 'react';

export default function WithCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (
          current.hours === 0 &&
          current.minutes === 0 &&
          current.seconds === 0
        ) {
          clearInterval(timer);
          return current;
        }

        let newSeconds = current.seconds - 1;
        let newMinutes = current.minutes;
        let newHours = current.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-muted">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex items-center justify-between gap-x-6 p-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="text-sm font-medium">
              Flash Sale Ends in:{' '}
              <span className="font-mono">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </p>
            <Button size="sm" variant="default">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
