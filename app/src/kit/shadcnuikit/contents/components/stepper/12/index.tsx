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
  {
    title: "Order placed",
    description: "We received your order",
    detail: "Order #4821 was confirmed on Oct 2 at 10:24 AM.",
  },
  {
    title: "Packed",
    description: "Your items are boxed",
    detail: "Your package is ready at the Austin warehouse.",
  },
  {
    title: "Shipped",
    description: "On the way to you",
    detail: "Estimated delivery is Friday, Oct 6.",
  },
];

export default function StepperDemo() {
  return (
    <Stepper
      defaultValue={2}
      orientation="vertical"
      className="flex w-auto flex-col items-center gap-10 sm:flex-row sm:items-start"
      indicators={{ completed: <CheckIcon className="size-3.5" /> }}
    >
      <StepperNav>
        {steps.map((step, index) => (
          <StepperItem
            key={step.title}
            step={index + 1}
            className="relative items-start"
          >
            <StepperTrigger className="items-start gap-3 rounded-md pb-10 text-left group-last/step:pb-0">
              <StepperIndicator>{index + 1}</StepperIndicator>
              <div className="mt-0.5 flex flex-col gap-1">
                <StepperTitle>{step.title}</StepperTitle>
                <StepperDescription className="text-xs">
                  {step.description}
                </StepperDescription>
              </div>
            </StepperTrigger>
            {steps.length > index + 1 && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute top-7 left-3 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)]" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="w-56 text-center text-sm sm:text-left">
        {steps.map((step, index) => (
          <StepperContent
            key={step.title}
            value={index + 1}
            className="text-muted-foreground"
          >
            {step.detail}
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
