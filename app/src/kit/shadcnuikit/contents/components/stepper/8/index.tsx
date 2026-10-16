"use client";

import { CheckIcon } from "lucide-react";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "../../../../components/ui/stepper";

const steps = [
  { title: "Details" },
  { title: "Schedule" },
  { title: "Confirm" },
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
          <StepperItem key={step.title} step={index + 1}>
            <StepperTrigger className="gap-2 rounded-md">
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground max-sm:hidden">
                {step.title}
              </StepperTitle>
            </StepperTrigger>

            {steps.length > index + 1 && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary mx-2.5" />
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
            {step.title} step
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
