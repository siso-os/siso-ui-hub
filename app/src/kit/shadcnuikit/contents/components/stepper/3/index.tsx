"use client";

import { useState } from "react";

import { Button } from "../../../../../shadcn/ui/button";
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
  { step: 1, content: "Pick a workspace name" },
  { step: 2, content: "Invite your teammates" },
  { step: 3, content: "Connect your calendar" },
  { step: 4, content: "Choose a starter template" },
];

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <Stepper
      value={currentStep}
      onValueChange={setCurrentStep}
      className="w-full max-w-md space-y-8"
    >
      <StepperNav>
        {steps.map(({ step }) => (
          <StepperItem key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
            </StepperTrigger>
            {steps.length > step && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm">
        {steps.map(({ step, content }) => (
          <StepperContent
            key={step}
            value={step}
            className="text-muted-foreground flex items-center justify-center"
          >
            {content}
          </StepperContent>
        ))}
      </StepperPanel>

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === steps.length}
        >
          Next
        </Button>
      </div>
    </Stepper>
  );
}
