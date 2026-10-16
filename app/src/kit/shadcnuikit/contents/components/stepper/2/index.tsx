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

const steps = [
  { step: 1, label: "Files uploaded" },
  { step: 2, label: "Processing your import" },
  { step: 3, label: "Ready to review" },
];

export default function StepperDemo() {
  return (
    <Stepper
      defaultValue={2}
      className="w-full max-w-md space-y-6"
      indicators={{
        completed: <CheckIcon className="size-3" />,
        loading: <LoaderCircleIcon className="size-3 animate-spin" />,
      }}
    >
      <StepperNav>
        {steps.map(({ step }) => (
          <StepperItem key={step} step={step} loading={step === 2}>
            <StepperTrigger>
              <StepperIndicator className="data-[state=inactive]:border-border data-[state=active]:border-primary data-[state=completed]:border-primary size-5 border-2 data-[state=inactive]:bg-transparent">
                <span className="bg-primary-foreground hidden size-1.5 rounded-full group-data-[state=active]/step:block" />
              </StepperIndicator>
            </StepperTrigger>
            {steps.length > step && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm">
        {steps.map(({ step, label }) => (
          <StepperContent
            key={step}
            value={step}
            className="text-muted-foreground flex items-center justify-center"
          >
            {label}
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
