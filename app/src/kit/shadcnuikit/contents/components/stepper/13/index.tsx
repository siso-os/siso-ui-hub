"use client";

import { CheckIcon, LoaderCircleIcon } from "lucide-react";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTrigger,
} from "../../../../components/ui/stepper";

const steps = [1, 2, 3];

export default function StepperDemo() {
  return (
    <Stepper
      defaultValue={2}
      orientation="vertical"
      className="flex w-auto flex-col items-center gap-8"
      indicators={{
        completed: <CheckIcon className="size-3.5" />,
        loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
      }}
    >
      <StepperNav>
        {steps.map((step) => (
          <StepperItem key={step} step={step} loading={step === 2}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
            </StepperTrigger>
            {steps.length > step && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="w-56 text-center text-sm">
        {steps.map((step) => (
          <StepperContent
            key={step}
            value={step}
            className="text-muted-foreground"
          >
            Step {step} content
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
