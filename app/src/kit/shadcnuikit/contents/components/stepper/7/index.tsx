"use client";

import { CheckIcon } from "lucide-react";

import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "../../../../components/ui/stepper";

const steps = [
  { title: "Account", description: "Create your login" },
  { title: "Team", description: "Invite your people" },
  { title: "Finish", description: "Review and launch" },
];

export default function StepperDemo() {
  return (
    <Stepper
      defaultValue={2}
      className="w-full max-w-md space-y-8"
      indicators={{ completed: <CheckIcon className="size-3.5" /> }}
    >
      <StepperNav>
        {steps.map((step, index) => (
          <StepperItem
            key={step.title}
            step={index + 1}
            className="relative flex-1 items-start"
          >
            <StepperTrigger className="flex grow flex-col gap-2 rounded-md">
              <StepperIndicator>{index + 1}</StepperIndicator>
              <div className="flex flex-col items-center gap-1 text-center">
                <StepperTitle>{step.title}</StepperTitle>
                <StepperDescription className="text-xs max-sm:hidden">
                  {step.description}
                </StepperDescription>
              </div>
            </StepperTrigger>

            {steps.length > index + 1 && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute top-3 left-[calc(50%+1.25rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2.5rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm">
        {steps.map((step, index) => (
          <StepperContent
            key={step.title}
            value={index + 1}
            className="text-muted-foreground flex items-center justify-center"
          >
            {step.description}
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
