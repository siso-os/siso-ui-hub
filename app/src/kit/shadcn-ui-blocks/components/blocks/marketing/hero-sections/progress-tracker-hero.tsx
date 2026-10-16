import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';
import { Badge } from '../../../ui/badge';

export default function HeroSectionProgressTracker() {
  const steps = [
    { id: 1, title: 'Sign Up', completed: true },
    { id: 2, title: 'Choose Plan', completed: true },
    { id: 3, title: 'Setup Profile', completed: false, current: true },
    { id: 4, title: 'Start Building', completed: false },
    { id: 5, title: 'Go Live', completed: false },
  ];

  return (
    <>
      {/* Hero */}
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
              href="#"
            >
              New feature - Progress tracking
              <span className="bg-muted-foreground/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
          {/* End Announcement Banner */}
          {/* Title */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="text-primary max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
              Track Your Journey to Success
            </h1>
          </div>
          {/* End Title */}
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-foreground max-w-4xl text-base text-balance sm:text-lg">
              Follow our guided setup process and see your progress every step
              of the way. From signup to launch, we'll guide you through each
              milestone.
            </p>
          </div>
          {/* Progress Tracker */}
          <div className="mt-12 flex justify-center">
            <Card className="w-full max-w-2xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary max-w-4xl text-2xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-3xl xl:tracking-tighter">
                      Setup Progress
                    </h3>
                    <Badge variant="secondary">Step 3 of 5</Badge>
                  </div>
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className="flex items-center space-x-4"
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            step.completed
                              ? 'bg-primary text-primary-foreground'
                              : step.current
                                ? 'border-primary bg-background text-primary border-2'
                                : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {step.completed ? (
                            <CheckIcon className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-medium">
                              {step.id}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div
                            className={`text-sm font-medium ${
                              step.completed || step.current
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {step.title}
                          </div>
                        </div>
                        {step.current && (
                          <Badge variant="outline">Current</Badge>
                        )}
                        {step.completed && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Complete
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="bg-secondary h-2 w-full rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: '40%' }}
                      ></div>
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">
                      40% Complete - Keep going!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* End Progress Tracker */}
          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Button size={'lg'}>Continue Setup</Button>
            <Button size={'lg'} variant={'outline'}>
              View Guide
            </Button>
          </div>
          {/* End Buttons */}
          <div className="mt-5 flex items-center justify-center gap-x-1 sm:gap-x-3">
            <span className="text-muted-foreground text-sm">
              Estimated time:
            </span>
            <span className="text-sm font-bold">5 minutes</span>
            <svg
              className="text-muted-foreground h-5 w-5"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <a
              className="inline-flex items-center gap-x-1 text-sm font-medium decoration-2 hover:underline"
              href="#"
            >
              Skip Tutorial
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
