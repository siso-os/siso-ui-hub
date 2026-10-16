"use client";

import { CheckIcon } from "lucide-react";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTitle,
  StepperTrigger,
} from "../../../../components/ui/stepper";

const steps = [
  { title: "Company" },
  { title: "Billing" },
  { title: "Verify" },
  { title: "Launch" },
];

export default function StepperDemo() {
  return (
    <Stepper
      defaultValue={2}
      className="w-full max-w-lg space-y-8"
      indicators={{ completed: <CheckIcon className="size-3.5" /> }}
    >
      <StepperNav className="gap-3">
        {steps.map((step, index) => (
          <StepperItem
            key={step.title}
            step={index + 1}
            className="relative flex-1 items-start"
          >
            <StepperTrigger className="flex grow flex-col items-start gap-3 rounded-md">
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start">
                {step.title}
              </StepperTitle>
            </StepperTrigger>
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
            {step.title} settings
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
