"use client";

import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "../../../../../shadcn/ui/button";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTrigger,
} from "../../../../components/ui/stepper";
import { cn } from "@/arc-shims/kit-utils";

const questions = [
  "What is your main goal?",
  "How big is your team?",
  "Which tools do you use today?",
  "When do you want to start?",
];

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Stepper
      value={currentStep}
      onValueChange={setCurrentStep}
      className="w-full max-w-md"
    >
      <StepperNav className="gap-1">
        {questions.map((question, index) => (
          <StepperItem
            key={question}
            step={index + 1}
            className="flex-1 overflow-hidden first:rounded-s-full last:rounded-e-full"
          >
            <StepperTrigger className="w-full rounded-none">
              <StepperIndicator className="bg-border h-1.5 w-full rounded-none">
                <span className="sr-only">{index + 1}</span>
              </StepperIndicator>
            </StepperTrigger>
          </StepperItem>
        ))}
      </StepperNav>

      <div className="flex items-center justify-between gap-2 py-1">
        <Button
          variant="link"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          className={cn(
            "text-foreground px-0",
            currentStep === 1 && "pointer-events-none opacity-0",
          )}
        >
          <ArrowLeftIcon />
          Back
        </Button>
        <div className="text-sm font-medium">
          {currentStep}{" "}
          <span className="text-muted-foreground">/ {questions.length}</span>
        </div>
      </div>

      <StepperPanel className="py-6 text-sm">
        {questions.map((question, index) => (
          <StepperContent
            key={question}
            value={index + 1}
            className="flex items-center justify-center font-medium"
          >
            {question}
          </StepperContent>
        ))}
      </StepperPanel>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === questions.length}
        >
          Next
        </Button>
      </div>
    </Stepper>
  );
}
