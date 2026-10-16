import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Checkbox } from '../../../ui/checkbox';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircle2Icon } from 'lucide-react';

export default function HeroFormSplitScreenMultiStep() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      {/* Hero */}
      <div className="bg-background relative grid min-h-[600px] overflow-hidden md:min-h-screen md:grid-cols-2">
        {/* Left Image */}
        <div className="relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
            alt="Workspace with laptop and notebook"
            className="object-cover"
          />
          <div className="bg-primary/20 absolute inset-0 flex items-center justify-center p-10 backdrop-blur-sm">
            <div className="bg-background/80 max-w-md rounded-lg p-8 shadow-lg backdrop-blur-md">
              <h2 className="mb-4 text-2xl font-bold">
                Why join our platform?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2Icon className="text-primary mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                  <span>Access to exclusive resources and templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2Icon className="text-primary mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                  <span>Join a community of like-minded professionals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2Icon className="text-primary mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                  <span>Weekly live workshops and training sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2Icon className="text-primary mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                  <span>Direct access to industry experts and mentors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h1 className="mb-2 scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl">
              Create your account
            </h1>
            <p className="text-muted-foreground mb-8">
              Complete the steps below to get started.
            </p>

            {/* Step Counter */}
            <div className="mb-8 flex items-center">
              <div className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm font-medium">
                Step {step} of {totalSteps}
              </span>
            </div>

            {/* Step 1 - Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="mb-4 text-xl font-semibold">
                  Basic Information
                </h2>
                <div>
                  <Label htmlFor="name" className="mb-2">
                    Full name
                  </Label>
                  <Input id="name" placeholder="John Doe" />
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
                  <Label htmlFor="password" className="mb-2">
                    Create password
                  </Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="pt-4">
                  <Button className="w-full" onClick={nextStep}>
                    Continue <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2 - Profile */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="mb-4 text-xl font-semibold">Profile Details</h2>
                <div>
                  <Label htmlFor="profession" className="mb-2">
                    Profession
                  </Label>
                  <Input id="profession" placeholder="Software Developer" />
                </div>
                <div>
                  <Label htmlFor="company" className="mb-2">
                    Company (optional)
                  </Label>
                  <Input id="company" placeholder="Acme Inc." />
                </div>
                <div>
                  <Label htmlFor="experience" className="mb-2">
                    Years of experience
                  </Label>
                  <Input id="experience" type="number" placeholder="5" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button className="flex-1" onClick={nextStep}>
                    Continue <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 - Preferences */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="mb-4 text-xl font-semibold">Preferences</h2>
                <p className="text-muted-foreground mb-4 text-sm">
                  Select the topics you&apos;re interested in:
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="programming" />
                    <Label htmlFor="programming" className="cursor-pointer">
                      Programming & Development
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="design" />
                    <Label htmlFor="design" className="cursor-pointer">
                      UI/UX Design
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" />
                    <Label htmlFor="marketing" className="cursor-pointer">
                      Digital Marketing
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="business" />
                    <Label htmlFor="business" className="cursor-pointer">
                      Business & Entrepreneurship
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="data" />
                    <Label htmlFor="data" className="cursor-pointer">
                      Data Science & Analytics
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3 pt-8">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button className="flex-1">Complete Setup</Button>
                </div>
              </div>
            )}

            <p className="text-muted-foreground mt-8 text-center text-xs">
              By creating an account, you agree to our{' '}
              <a href="#" className="hover:text-foreground underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="hover:text-foreground underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
