"use client";

import { useState } from "react";
import {
  CheckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  UserRoundIcon,
} from "lucide-react";

import { Badge } from "../../../../../shadcn/ui/badge";
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
  { title: "Profile", icon: UserRoundIcon },
  { title: "Payment", icon: CreditCardIcon },
  { title: "Security", icon: ShieldCheckIcon },
];

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <Stepper
      value={currentStep}
      onValueChange={setCurrentStep}
      className="w-full max-w-xl space-y-8"
      indicators={{ completed: <CheckIcon className="size-4" /> }}
    >
      <StepperNav className="gap-3">
        {steps.map((step, index) => (
          <StepperItem
            key={step.title}
            step={index + 1}
            className="relative flex-1 items-start"
          >
            <StepperTrigger className="flex grow flex-col items-start gap-2.5 rounded-md">
              <StepperIndicator className="data-[state=inactive]:border-border size-8 data-[state=inactive]:border data-[state=inactive]:bg-transparent">
                <step.icon className="size-4" />
              </StepperIndicator>
              <div className="flex flex-col items-start gap-1.5">
                <span className="text-muted-foreground text-xs">
                  Step {index + 1}
                </span>
                <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start">
                  {step.title}
                </StepperTitle>
                <Badge className="hidden group-data-[state=active]/step:inline-flex">
                  In progress
                </Badge>
                <Badge
                  variant="secondary"
                  className="hidden group-data-[state=completed]/step:inline-flex"
                >
                  Completed
                </Badge>
                <Badge
                  variant="outline"
                  className="text-muted-foreground hidden group-data-[state=inactive]/step:inline-flex"
                >
                  Pending
                </Badge>
              </div>
            </StepperTrigger>

            {steps.length > index + 1 && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute start-10 top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2.75rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
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
            {step.title} information
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
