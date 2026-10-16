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
  { title: "Upload", description: "Add your files" },
  { title: "Map", description: "Match columns" },
  { title: "Import", description: "Save records" },
];

export default function StepperDemo() {
  return (
    <Stepper
      defaultValue={2}
      className="w-full max-w-lg space-y-8"
      indicators={{ completed: <CheckIcon className="size-3.5" /> }}
    >
      <StepperNav>
        {steps.map((step, index) => (
          <StepperItem key={step.title} step={index + 1}>
            <StepperTrigger className="gap-2.5 rounded-md">
              <StepperIndicator>{index + 1}</StepperIndicator>
              <div className="flex flex-col items-start gap-1 max-sm:hidden">
                <StepperTitle>{step.title}</StepperTitle>
                <StepperDescription className="text-xs">
                  {step.description}
                </StepperDescription>
              </div>
            </StepperTrigger>

            {steps.length > index + 1 && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary mx-3" />
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
