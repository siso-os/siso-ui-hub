"use client";

import { useMemo, useState } from "react";
import { useFieldArray, useForm, FormProvider as Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { Building2, ChevronLeft, ChevronRight, Plus, Rocket,Trash2, UserPlus } from "lucide-react";
import {
  Field,
  FieldError,
  FieldLabel,
} from "../../../../../../shadcn/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../shadcn/ui/card";
import { Button } from "../../../../../../shadcn/ui/button";
import { Input } from "../../../../../../shadcn/ui/input";
import { Textarea } from "../../../../../../shadcn/ui/textarea";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../../../../../../shadcn/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../shadcn/ui/select";
import { RadioGroup, RadioGroupItem } from "../../../../../../shadcn/ui/radio-group";
import { Checkbox } from "../../../../../../shadcn/ui/checkbox";
import { Switch } from "../../../../../../shadcn/ui/switch";
import { Label } from "../../../../../../shadcn/ui/label";
import { Separator } from "../../../../../../shadcn/ui/separator";
import { cn } from "@/arc-shims/kit-utils";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Badge } from "../../../../../../shadcn/ui/badge";

const TEAM_SIZE_OPTIONS = [
  { label: "Just me", value: "1" },
  { label: "2-5 people", value: "2-5" },
  { label: "5-10 people", value: "5-10" },
  { label: "10+ people", value: "10+" },
];

const TIME_ZONE_OPTIONS = [
  { label: "UTC", value: "UTC" },
  { label: "Pacific Time (PT)", value: "PT" },
  { label: "Eastern Time (ET)", value: "ET" },
  { label: "Central European (CET)", value: "CET" },
  { label: "India Standard (IST)", value: "IST" },
];

const VISIBILITY_OPTIONS = [
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
  { label: "Invite only", value: "invite-only" },
];

const ROLE_OPTIONS = ["Admin", "Editor", "Viewer"];

const SectionHeading = ({
  title,
  badge,
  description,
}: {
  title: string;
  badge?: string;
  description: string;
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      {badge && (
        <Badge className="bg-teal-400/10 border border-teal-400/20 text-teal-400 py-1 px-1.5 text-xs">
          {badge}
        </Badge>
      )}
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const MOOD_OPTIONS = [
  { emoji: "😰", value: "anxious", label: "Anxious" },
  { emoji: "😟", value: "worried", label: "Worried" },
  { emoji: "😐", value: "neutral", label: "Neutral" },
  { emoji: "🙂", value: "good", label: "Good" },
  { emoji: "🤩", value: "excited", label: "Excited" },
];

const stepMeta = [
  {
    eyebrow: "Workspace",
    title: "Workspace Details",
    description: "The basics, plus access and notification defaults.",
    icon: Building2,
  },
  {
    eyebrow: "Team",
    title: "Invite Members",
    description: "Enter each teammate's email and starting role.",
    icon: UserPlus,
  },
  {
    eyebrow: "Kickoff",
    title: "Launch Confidence",
    description: "How ready does the team feel about this launch?",
    icon: Rocket,
  },
];

const memberSchema = z.object({
  email: z.string().optional(),
  role: z.string().optional(),
});

const formSchema = z.object({
  workspaceName: z.string().optional(),
  workspaceUrl: z.string().optional(),
  teamSize: z.string().nullable().optional(),
  timeZone: z.string().nullable().optional(),
  description: z.string().optional(),
  visibility: z.string().optional(),
  require2fa: z.boolean().optional(),
  allowSignupRequests: z.boolean().optional(),
  weeklyReports: z.boolean().optional(),
  notifyNewMembers: z.boolean().optional(),
  members: z.array(memberSchema),
  mood: z.string().optional(),
  comment: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function MultiStepFormDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<number>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: "Shadcn Dashboard",
      workspaceUrl: "shadcndashboard",
      teamSize: "5-10",
      timeZone: "UTC",
      description: "",
      visibility: "private",
      require2fa: true,
      allowSignupRequests: false,
      weeklyReports: true,
      notifyNewMembers: true,
      members: [
        { email: "nirav@shadcndashboard.dev", role: "Editor" },
        { email: "sunil@shadcndashboard.dev", role: "Viewer" },
      ],
      mood: "",
      comment: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  function onSubmit(values: FormValues) {
    try {
      const inviteCount = values.members.filter((member) => member.email).length;
      toast.add({
        title: `${values.workspaceName || "Your workspace"} is live`,
        description:
          inviteCount > 0
            ? `${inviteCount} invite${inviteCount === 1 ? "" : "s"} sent to your team.`
            : "You can invite teammates anytime from workspace settings.",
        type: "success",
      });
    } catch (error) {
      console.error("Workspace creation failed", error);
      toast.add({
        title: "Something went wrong",
        description: "Please try again.",
        type: "error",
      });
    }
  }

  const nextStep = () => {
    if (currentStep === stepMeta.length - 1) {
      form.handleSubmit(onSubmit)();
      return;
    }
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const watchedValues = form.watch();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 py-2">
            <div className="space-y-5">
              <SectionHeading
                title="Basics"
                badge="Required"
                description="Name your workspace and set its home time zone."
              />

              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <Field>
                  <FieldLabel className="text-sm text-foreground" htmlFor="workspaceName">
                    Workspace Name
                  </FieldLabel>
                  <Input
                    id="workspaceName"
                    placeholder="e.g. Shadcn Dashboard"
                    {...form.register("workspaceName")}
                  />
                  <FieldError>
                    {form.formState.errors.workspaceName?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel className="text-sm text-foreground" htmlFor="workspaceUrl">
                    Workspace URL
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <InputGroupText className="text-muted-foreground">
                        app.shadcndashboard.dev/
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id="workspaceUrl"
                      placeholder="shadcndashboard"
                      {...form.register("workspaceUrl")}
                    />
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel className="text-sm text-foreground" htmlFor="teamSize">
                    Team Size
                  </FieldLabel>
                  <Select
                    items={TEAM_SIZE_OPTIONS}
                    value={watchedValues.teamSize ?? null}
                    onValueChange={(val) => form.setValue("teamSize", val as string)}
                  >
                    <SelectTrigger id="teamSize" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAM_SIZE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel className="text-sm text-foreground" htmlFor="timeZone">
                    Time Zone
                  </FieldLabel>
                  <Select
                    items={TIME_ZONE_OPTIONS}
                    value={watchedValues.timeZone ?? null}
                    onValueChange={(val) => form.setValue("timeZone", val as string)}
                  >
                    <SelectTrigger id="timeZone" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_ZONE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field className="col-span-2">
                  <FieldLabel className="text-sm text-foreground" htmlFor="description">
                    Description
                  </FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="What's this workspace for?"
                    className="min-h-[90px] resize-none"
                    {...form.register("description")}
                  />
                </Field>
              </div>
            </div>

            <Separator />

            <div className="space-y-5">
              <SectionHeading
                title="Access & Notifications"
                badge={
                  VISIBILITY_OPTIONS.find((opt) => opt.value === watchedValues.visibility)
                    ?.label ?? "Private"
                }
                description="Control who can join and how the team stays updated."
              />

              <Field>
                <FieldLabel className="text-sm text-foreground">Visibility</FieldLabel>
                <RadioGroup
                  value={watchedValues.visibility ?? "private"}
                  onValueChange={(val) => form.setValue("visibility", val as string)}
                  className="flex flex-wrap gap-5 pt-1"
                >
                  {VISIBILITY_OPTIONS.map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={`visibility-${option.value}`}
                      className="flex cursor-pointer items-center gap-2 text-sm font-normal text-foreground"
                    >
                      <RadioGroupItem id={`visibility-${option.value}`} value={option.value} />
                      {option.label}
                    </Label>
                  ))}
                </RadioGroup>
              </Field>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <Label className="flex cursor-pointer items-start gap-2 text-sm font-normal text-foreground">
                  <Checkbox
                    checked={watchedValues.require2fa}
                    onCheckedChange={(checked) =>
                      form.setValue("require2fa", checked === true)
                    }
                  />
                  Require two-factor authentication
                </Label>
                <Label className="flex cursor-pointer items-start gap-2 text-sm font-normal text-foreground">
                  <Checkbox
                    checked={watchedValues.allowSignupRequests}
                    onCheckedChange={(checked) =>
                      form.setValue("allowSignupRequests", checked === true)
                    }
                  />
                  Allow public sign-up requests
                </Label>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Notify me when someone joins
                    </p>
                    <p className="text-sm text-muted-foreground">
                      A ping the moment a teammate accepts their invite.
                    </p>
                  </div>
                  <Switch
                    checked={watchedValues.notifyNewMembers}
                    onCheckedChange={(checked) =>
                      form.setValue("notifyNewMembers", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 py-2">
            <div className="overflow-hidden rounded-md border">
              <div className="grid grid-cols-[1fr_150px_92px_40px] gap-3 border-b bg-muted/40 px-4 py-2.5 text-sm font-medium text-foreground">
                <span>Email</span>
                <span>Role</span>
                <span>Status</span>
                <span className="sr-only">Remove</span>
              </div>
              <div className="divide-y">
                {fields.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No teammates added yet.
                  </div>
                )}
                {fields.map((field, index) => {
                  const email = watchedValues.members?.[index]?.email ?? "";
                  const isReady = /\S+@\S+\.\S+/.test(email);
                  return (
                    <div
                      key={field.id}
                      className="grid grid-cols-[1fr_150px_92px_40px] items-center gap-3 px-4 py-2.5"
                    >
                      <Input
                        placeholder="teammate@company.com"
                        className="h-9"
                        {...form.register(`members.${index}.email`)}
                      />
                      <Select
                        value={watchedValues.members?.[index]?.role ?? "Viewer"}
                        onValueChange={(val) =>
                          form.setValue(`members.${index}.role`, val as string)
                        }
                      >
                        <SelectTrigger className="h-9 w-full cursor-pointer">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLE_OPTIONS.map((role) => (
                            <SelectItem key={role} value={role} className="cursor-pointer">
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Badge
                        className={cn(
                          "inline-flex w-fit items-center justify-self-start border px-2 py-0.5 text-xs font-medium",
                          isReady
                            ? "border-teal-400/10 bg-teal-400/10 text-teal-400"
                            : "border-border bg-muted text-muted-foreground",
                        )}
                      >
                        {isReady ? "Ready" : "Incomplete"}
                      </Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="cursor-pointer text-muted-foreground hover:text-destructive hover:bg-transparent"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => append({ email: "", role: "Viewer" })}
              >
                <Plus className="size-3.5" />
                Add member
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5 py-2">
            <div className="grid grid-cols-5 gap-2">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => form.setValue("mood", option.value)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 border border-border py-3 text-2xl transition-all",
                    watchedValues.mood === option.value
                      ? "border-foreground bg-foreground/5"
                      : "grayscale border-border hover:grayscale-0 hover:border-foreground/30",
                  )}
                >
                  <span>{option.emoji}</span>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            <Field>
              <FieldLabel className="text-sm text-foreground" htmlFor="comment">Notes for the team (optional)</FieldLabel>
              <Textarea
                id="comment"
                placeholder="Anything the team should know before kickoff..."
                className="min-h-[110px] resize-none"
                {...form.register("comment")}
              />
            </Field>
          </div>
        );
      default:
        return null;
    }
  }, [currentStep, fields, form, watchedValues, append, remove]);

  const variants = {
    initial: (dir: number) => ({ x: `${110 * dir}%`, opacity: 0 }),
    animate: { x: "0%", opacity: 1 },
    exit: (dir: number) => ({ x: `${-110 * dir}%`, opacity: 0 }),
  };

  const StepIcon = stepMeta[currentStep].icon;

  return (
    <Form {...form}>
      <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
        <div className="flex w-full items-center justify-center bg-muted/10 p-4">
          <Card className="w-full max-w-2xl overflow-hidden shadow-none pt-0">
            <motion.div layout>
              <CardHeader className="gap-4 border-b px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Step {currentStep + 1} of {stepMeta.length}
                  </span>
                  <Badge className="text-xs bg-teal-400/10 border border-teal-400/20 text-teal-400 py-1 px-1.5">
                    {stepMeta[currentStep].eyebrow}
                  </Badge>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                    <StepIcon className="size-4.5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-xl">
                      {stepMeta[currentStep].title}
                    </CardTitle>
                    <CardDescription>
                      {stepMeta[currentStep].description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {stepMeta.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-colors duration-300",
                        index <= currentStep ? "bg-primary" : "bg-primary/10",
                      )}
                    />
                  ))}
                </div>
              </CardHeader>

              <div className="relative overflow-hidden">
                <CardContent className="relative px-6 py-4">
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.div
                      key={currentStep}
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="w-full"
                      custom={direction}
                    >
                      {content}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </div>

              <CardFooter className="flex items-center justify-between border-t py-4">
                <Button
                  variant="secondary"
                  type="button"
                  className="cursor-pointer"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="size-4" />
                  Back
                </Button>
                <Button type="button" className="cursor-pointer" onClick={nextStep}>
                  {currentStep === stepMeta.length - 1 ? (
                    <>
                      Create workspace <Rocket className="size-4" />
                    </>
                  ) : (
                    <>
                      Continue <ChevronRight className="size-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </motion.div>
          </Card>
        </div>
      </MotionConfig>
    </Form>
  );
}
