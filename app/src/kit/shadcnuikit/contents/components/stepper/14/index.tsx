"use client";

import { useState } from "react";
import { CheckIcon, PartyPopperIcon } from "lucide-react";

import { Button } from "../../../../../shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../shadcn/ui/card";
import { Field, FieldGroup, FieldLabel } from "../../../../../shadcn/ui/field";
import { Input } from "../../../../../shadcn/ui/input";
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
  {
    title: "Account",
    description: "Tell us who you are.",
    fields: [
      { id: "name", label: "Full name", placeholder: "Alex Morgan" },
      {
        id: "email",
        label: "Email",
        placeholder: "alex@acme.com",
        type: "email",
      },
    ],
  },
  {
    title: "Workspace",
    description: "Set up a home for your team.",
    fields: [
      { id: "workspace", label: "Workspace name", placeholder: "Acme Inc." },
      { id: "url", label: "Workspace URL", placeholder: "acme" },
    ],
  },
  {
    title: "Invite",
    description: "Bring your teammates along.",
    fields: [
      {
        id: "invite",
        label: "Teammate email",
        placeholder: "sam@acme.com",
        type: "email",
      },
    ],
  },
];

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const isDone = currentStep > steps.length;
  const isLast = currentStep === steps.length;
  const step = steps[currentStep - 1] ?? {
    title: "You are all set",
    description: "Your workspace is ready to use.",
  };

  return (
    <Card className="w-full max-w-md">
      <Stepper
        value={currentStep}
        onValueChange={setCurrentStep}
        className="flex flex-col gap-6"
        indicators={{ completed: <CheckIcon className="size-3.5" /> }}
      >
        <CardHeader className="gap-6">
          <StepperNav>
            {steps.map((item, index) => (
              <StepperItem key={item.title} step={index + 1}>
                <StepperTrigger className="gap-2 rounded-md">
                  <StepperIndicator>{index + 1}</StepperIndicator>
                  <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground max-sm:hidden">
                    {item.title}
                  </StepperTitle>
                </StepperTrigger>
                {steps.length > index + 1 && (
                  <StepperSeparator className="group-data-[state=completed]/step:bg-primary mx-2.5" />
                )}
              </StepperItem>
            ))}
          </StepperNav>
          <div className="flex flex-col gap-1.5">
            <CardTitle>{step.title}</CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <StepperPanel>
            {steps.map((item, index) => (
              <StepperContent key={item.title} value={index + 1}>
                <FieldGroup>
                  {item.fields.map((field) => (
                    <Field key={field.id}>
                      <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
                      <Input
                        id={field.id}
                        type={field.type ?? "text"}
                        placeholder={field.placeholder}
                      />
                    </Field>
                  ))}
                </FieldGroup>
              </StepperContent>
            ))}
            <StepperContent
              value={steps.length + 1}
              className="flex flex-col items-center gap-3 py-6 text-center"
            >
              <div className="bg-muted flex size-12 items-center justify-center rounded-full">
                <PartyPopperIcon className="size-5" />
              </div>
              <p className="text-muted-foreground text-sm">
                We sent the invites. Your teammates will get an email shortly.
              </p>
            </StepperContent>
          </StepperPanel>
        </CardContent>

        <CardFooter className="justify-between gap-2">
          {isDone ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setCurrentStep(1)}
            >
              Start over
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <Button onClick={() => setCurrentStep((prev) => prev + 1)}>
                {isLast ? "Create workspace" : "Continue"}
              </Button>
            </>
          )}
        </CardFooter>
      </Stepper>
    </Card>
  );
}
