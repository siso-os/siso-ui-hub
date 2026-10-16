import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Switch } from '../../../ui/switch';
import { CheckIcon } from 'lucide-react';

export default function HeroFormSubscriptionWithToggle() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      {/* Hero */}
      <div className="bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Left Content */}
            <div>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Start your journey today
              </h1>
              <p className="text-muted-foreground mt-4 text-xl">
                Get unlimited access to all our premium features and save
                {isAnnual ? ' 20%' : ' with monthly plans'}.
              </p>

              <div className="mt-8 flex flex-col space-y-4">
                <div className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>Unlimited access to all templates</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>Priority customer support</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>Regular content updates</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>No attribution required</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-card rounded-lg border p-8 shadow-lg">
              <div className="mb-8 flex items-center justify-center space-x-2">
                <span
                  className={
                    !isAnnual ? 'font-semibold' : 'text-muted-foreground'
                  }
                >
                  Monthly
                </span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-green-500"
                />
                <span
                  className={
                    isAnnual ? 'font-semibold' : 'text-muted-foreground'
                  }
                >
                  Yearly
                </span>
                {isAnnual && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    Save 20%
                  </span>
                )}
              </div>

              <div className="mb-6 flex justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {isAnnual ? '$79' : '$9.99'}
                    <span className="text-muted-foreground text-lg">
                      {isAnnual ? '/year' : '/month'}
                    </span>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-2">
                    Full name
                  </Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="mb-2">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                  />
                </div>
                <Button className="mt-2 w-full">
                  {isAnnual ? 'Start Annual Plan' : 'Start Monthly Plan'}
                </Button>
              </form>
              <p className="text-muted-foreground mt-4 text-center text-xs">
                By signing up, you agree to our{' '}
                <a href="#" className="underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline">
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
