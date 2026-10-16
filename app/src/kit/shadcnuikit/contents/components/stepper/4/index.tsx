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
  StepperTitle,
  StepperTrigger,
} from "../../../../components/ui/stepper";

const steps = [{ title: "Cart" }, { title: "Shipping" }, { title: "Payment" }];

export default function StepperDemo() {
  return (
    <Stepper
      defaultValue={2}
      className="w-full max-w-md space-y-8"
      indicators={{
        completed: <CheckIcon className="size-3.5" />,
        loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
      }}
    >
      <StepperNav>
        {steps.map((step, index) => (
          <StepperItem
            key={step.title}
            step={index + 1}
            className="relative flex-1 items-start"
          >
            <StepperTrigger className="flex grow flex-col gap-2.5">
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground">
                {step.title}
              </StepperTitle>
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
            {step.title} details
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
