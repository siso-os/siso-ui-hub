"use client";

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
  { title: "Brief" },
  { title: "Design" },
  { title: "Review" },
  { title: "Deliver" },
];

export default function StepperDemo() {
  return (
    <Stepper defaultValue={2} className="w-full max-w-lg space-y-8">
      <StepperNav className="gap-4">
        {steps.map((step, index) => (
          <StepperItem
            key={step.title}
            step={index + 1}
            className="flex-1 items-start"
          >
            <StepperTrigger className="flex grow flex-col items-start gap-3 rounded-md">
              <StepperIndicator className="bg-border h-1 w-full rounded-full">
                <span className="sr-only">{index + 1}</span>
              </StepperIndicator>
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
            {step.title} phase
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
