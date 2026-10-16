"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, FileText, Flag, Info } from "lucide-react";
import { Button } from "../../../../../../shadcn/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../../../../../shadcn/ui/card";
import { Field, FieldGroup, FieldLabel } from "../../../../../../shadcn/ui/field";
import { Input } from "../../../../../../shadcn/ui/input";
import { Checkbox } from "../../../../../../shadcn/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../shadcn/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../../../../shadcn/ui/tooltip";
import { cn } from "@/arc-shims/kit-utils";

const steps = [
  { id: 1, title: "Patient Details" },
  { id: 2, title: "Visit Details" },
  { id: 3, title: "Confirm" },
];

type AppointmentForm = {
  fullName: string;
  existingPatient: string;
  department: string;
  location: string;
  phone: string;
  email: string;
  reason: string;
  insuranceProvider: string;
  doctor: string;
  visitType: string;
  preferredDate: string;
  preferredTime: string;
  confirmed: boolean;
};

const initialForm: AppointmentForm = {
  fullName: "Ava Thompson",
  existingPatient: "Yes",
  department: "General Medicine",
  location: "Downtown Clinic",
  phone: "(555) 019-2834",
  email: "ava.thompson@example.com",
  reason: "",
  insuranceProvider: "",
  doctor: "No preference",
  visitType: "In-person",
  preferredDate: "",
  preferredTime: "Morning",
  confirmed: false,
};

const InfoHint = ({ label }: { label: string }) => (
  <Tooltip>
    <TooltipTrigger
      render={
        <button type="button" className="cursor-pointer text-muted-foreground">
          <Info className="size-3.5" />
        </button>
      }
    />
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
);

const stepVariants = {
  initial: (direction: number) => ({
    x: direction >= 0 ? 24 : -24,
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction >= 0 ? -24 : 24,
    opacity: 0,
  }),
};

const AppointmentBookingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<AppointmentForm>(initialForm);

  const update = <K extends keyof AppointmentForm>(key: K, value: AppointmentForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const goNext = () => {
    setDirection(1);
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const goBack = () => {
    setDirection(-1);
    if (submitted) {
      setSubmitted(false);
      return;
    }
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const goToStep = (stepId: number) => {
    if (submitted) {
      setDirection(-1);
      setSubmitted(false);
      setCurrentStep(stepId);
      return;
    }
    if (stepId === currentStep || stepId > currentStep) return;
    setDirection(-1);
    setCurrentStep(stepId);
  };

  const footerCopy =
    currentStep === 1
      ? "Patient identity and visit basics."
      : "Visit reason and scheduling preferences.";

  return (
    <section className="w-full p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Card className="w-full overflow-hidden pt-0">
          <CardHeader className="flex items-start justify-between gap-4 px-6 pt-6 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Book a Medical Appointment
              </h2>
              <p className="text-sm text-muted-foreground">
                APT-2048 • {form.department}
              </p>
            </div>
            <Button variant="outline" size="sm" className="cursor-pointer">
              <FileText className="size-3.5" />
              Patient history
            </Button>
          </CardHeader>

          <div className="px-6">
            <div className="flex items-center">
              {steps.map((step, index) => {
                const isCompleted = submitted || currentStep > step.id;
                const isActive = !submitted && currentStep === step.id;
                const isLast = index === steps.length - 1;
                const isClickable = isCompleted || isActive;
                return (
                  <div
                    key={step.id}
                    className={cn("flex items-center", !isLast && "flex-1")}
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        onClick={() => goToStep(step.id)}
                        disabled={!isClickable}
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center border text-xs font-medium transition-colors",
                          isClickable && "cursor-pointer",
                          isCompleted && "bg-primary text-background border-primary/10",
                          isActive && "bg-primary text-background border-primary/10",
                          !isActive && !isCompleted && "bg-background text-muted-foreground border-border",
                        )}
                      >
                        {isCompleted ? <Check className="size-3.5" /> : step.id}
                      </Button>
                      <span
                        className={cn(
                          "hidden sm:inline text-sm font-medium",
                          isActive || isCompleted ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                    {!isLast && (
                      <div className="relative mx-3 h-px flex-1 bg-border">
                        <div
                          className={cn(
                            "absolute inset-y-0 left-0 h-px bg-foreground transition-all duration-300",
                            isCompleted ? "w-full" : "w-0",
                          )}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <CardContent className="relative overflow-hidden px-6 pt-4 border-t border-border">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={submitted ? "submitted" : currentStep}
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Appointment request received
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    APT-2048 has been sent to the front desk for confirmation.
                  </p>
                </div>
              </div>
            ) : currentStep === 1 ? (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Patient Details
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tell us who this appointment is for.
                  </p>
                </div>

                <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <Field>
                    <FieldLabel htmlFor="fullName" className="gap-1 text-sm text-foreground">
                      Patient Full Name <span className="text-destructive">*</span>
                      <InfoHint label="Name as it appears on your insurance card." />
                    </FieldLabel>
                    <Input
                      id="fullName"
                      required
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="existingPatient" className="gap-1 text-sm text-foreground">
                      Existing Patient
                      <InfoHint label="Whether you've visited this clinic before." />
                    </FieldLabel>
                    <Select
                      value={form.existingPatient}
                      onValueChange={(value) => value && update("existingPatient", value as string)}
                    >
                      <SelectTrigger id="existingPatient" className="w-full cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes" className="cursor-pointer">Yes</SelectItem>
                        <SelectItem value="No" className="cursor-pointer">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="department" className=" text-sm text-foreground">Department</FieldLabel>
                    <Select
                      value={form.department}
                      onValueChange={(value) => value && update("department", value as string)}
                    >
                      <SelectTrigger id="department" className="w-full cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Medicine" className="cursor-pointer">General Medicine</SelectItem>
                        <SelectItem value="Cardiology" className="cursor-pointer">Cardiology</SelectItem>
                        <SelectItem value="Dermatology" className="cursor-pointer">Dermatology</SelectItem>
                        <SelectItem value="Pediatrics" className="cursor-pointer">Pediatrics</SelectItem>
                        <SelectItem value="Orthopedics" className="cursor-pointer">Orthopedics</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="location" className=" text-sm text-foreground">Preferred Location</FieldLabel>
                    <Select
                      value={form.location}
                      onValueChange={(value) => value && update("location", value as string)}
                    >
                      <SelectTrigger id="location" className="w-full cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Downtown Clinic" className="cursor-pointer">Downtown Clinic</SelectItem>
                        <SelectItem value="Westside Clinic" className="cursor-pointer">Westside Clinic</SelectItem>
                        <SelectItem value="North Medical Center" className="cursor-pointer">North Medical Center</SelectItem>
                        <SelectItem value="Telehealth" className="cursor-pointer">Telehealth</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone" className=" text-sm text-foreground">
                      Phone Number <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email" className=" text-sm text-foreground">
                      Email <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </Field>
                </FieldGroup>
              </div>
            ) : currentStep === 2 ? (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Visit Details
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Share the reason for your visit and when works best.
                  </p>
                </div>

                <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <Field>
                    <FieldLabel htmlFor="reason" className=" text-sm text-foreground">
                      Reason for Visit <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="reason"
                      placeholder="e.g. Annual check-up"
                      required
                      value={form.reason}
                      onChange={(e) => update("reason", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="insuranceProvider" className=" text-sm text-foreground">Insurance Provider</FieldLabel>
                    <Input
                      id="insuranceProvider"
                      placeholder="e.g. Blue Shield"
                      value={form.insuranceProvider}
                      onChange={(e) => update("insuranceProvider", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="doctor" className="gap-1 text-sm text-foreground">
                      Preferred Doctor
                      <InfoHint label="We'll try to match you, subject to availability." />
                    </FieldLabel>
                    <Select
                      value={form.doctor}
                      onValueChange={(value) => value && update("doctor", value as string)}
                    >
                      <SelectTrigger id="doctor" className="w-full cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No preference" className="cursor-pointer">No preference</SelectItem>
                        <SelectItem value="Dr. Patel" className="cursor-pointer">Dr. Patel</SelectItem>
                        <SelectItem value="Dr. Nguyen" className="cursor-pointer">Dr. Nguyen</SelectItem>
                        <SelectItem value="Dr. Reyes" className="cursor-pointer">Dr. Reyes</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="visitType" className=" text-sm text-foreground">Visit Type</FieldLabel>
                    <Select
                      value={form.visitType}
                      onValueChange={(value) => value && update("visitType", value as string)}
                    >
                      <SelectTrigger id="visitType" className="w-full cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In-person" className="cursor-pointer">In-person</SelectItem>
                        <SelectItem value="Telehealth" className="cursor-pointer">Telehealth</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="preferredDate" className=" text-sm text-foreground">Preferred Date</FieldLabel>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={form.preferredDate}
                      onChange={(e) => update("preferredDate", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="preferredTime" className=" text-sm text-foreground">Preferred Time</FieldLabel>
                    <Select
                      value={form.preferredTime}
                      onValueChange={(value) => value && update("preferredTime", value as string)}
                    >
                      <SelectTrigger id="preferredTime" className="w-full cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning" className="cursor-pointer">Morning</SelectItem>
                        <SelectItem value="Afternoon" className="cursor-pointer">Afternoon</SelectItem>
                        <SelectItem value="Evening" className="cursor-pointer">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Review &amp; Confirm
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Double check the details below before booking.
                  </p>
                </div>

                <Card className="py-0 ring-0 gap-0 border divide-y">
                  {[
                    ["Patient Full Name", form.fullName],
                    ["Email", form.email],
                    ["Department", form.department],
                    ["Location", form.location],
                    ["Reason for Visit", form.reason || "—"],
                    ["Preferred Doctor", form.doctor],
                    ["Visit Type", form.visitType],
                    ["Preferred Date", form.preferredDate || "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 px-4 py-2.5">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-medium text-foreground text-right">{value}</span>
                    </div>
                  ))}
                </Card>

                <Field orientation="horizontal" className="items-start gap-2">
                  <Checkbox
                    id="confirmed"
                    className="cursor-pointer"
                    checked={form.confirmed}
                    onCheckedChange={(checked) => update("confirmed", checked === true)}
                  />
                  <FieldLabel htmlFor="confirmed" className="cursor-pointer font-normal text-foreground">
                    I confirm the information above is accurate and consent to being contacted to confirm this appointment.
                  </FieldLabel>
                </Field>
              </div>
            )}
            </motion.div>
          </AnimatePresence>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-4 border-t bg-card! px-6 py-4">
            {submitted ? (
              <>
                <span className="text-sm text-muted-foreground inline-flex items-center gap-2">
                  <Flag className="size-3.5" />
                  Patient identity and visit basics.
                </span>
                <Button variant="outline" className="cursor-pointer" onClick={goBack}>
                  <ArrowLeft className="size-4" />
                  Back to review
                </Button>
              </>
            ) : (
              <>
                <span className="text-sm text-muted-foreground inline-flex items-center gap-2">
                  <Flag className="size-3.5" />
                  {footerCopy}
                </span>
                <div className="flex items-center gap-2">
                  {currentStep > 1 && (
                    <Button variant="outline" className="cursor-pointer" onClick={goBack}>
                      <ArrowLeft className="size-4" />
                      Back
                    </Button>
                  )}
                  <Button
                    className="cursor-pointer"
                    onClick={goNext}
                    disabled={currentStep === steps.length && !form.confirmed}
                  >
                    {currentStep === steps.length ? "Confirm Booking" : "Next Step"}
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default AppointmentBookingWizard;
