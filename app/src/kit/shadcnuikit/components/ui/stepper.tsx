"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";

import { cn } from "@/arc-shims/kit-utils";

type StepperOrientation = "horizontal" | "vertical";
type StepState = "active" | "completed" | "inactive" | "loading";
type StepIndicators = {
  active?: React.ReactNode;
  completed?: React.ReactNode;
  inactive?: React.ReactNode;
  loading?: React.ReactNode;
};

type StepperContextValue = {
  id: string;
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: StepperOrientation;
  indicators: StepIndicators;
  registerTrigger: (node: HTMLButtonElement | null) => void;
  triggerNodes: HTMLButtonElement[];
};

type StepItemContextValue = {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
};

const StepperContext = React.createContext<StepperContextValue | undefined>(
  undefined,
);
const StepItemContext = React.createContext<StepItemContextValue | undefined>(
  undefined,
);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
}

function useStepItem() {
  const context = React.useContext(StepItemContext);
  if (!context) {
    throw new Error("useStepItem must be used within a StepperItem");
  }
  return context;
}

interface StepperProps extends React.ComponentProps<"div"> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: StepperOrientation;
  indicators?: StepIndicators;
}

function Stepper({
  defaultValue = 1,
  value,
  onValueChange,
  orientation = "horizontal",
  indicators = {},
  className,
  ...props
}: StepperProps) {
  const [internalStep, setInternalStep] = React.useState(defaultValue);
  const [triggerNodes, setTriggerNodes] = React.useState<HTMLButtonElement[]>(
    [],
  );

  const registerTrigger = React.useCallback(
    (node: HTMLButtonElement | null) => {
      if (!node) return;
      setTriggerNodes((prev) => {
        if (prev.includes(node)) return prev;
        // Keep DOM order so arrow keys move to the visually next step.
        return [...prev, node].sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1,
        );
      });
    },
    [],
  );

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step);
      }
      onValueChange?.(step);
    },
    [value, onValueChange],
  );

  const id = React.useId();
  const activeStep = value ?? internalStep;

  const contextValue = React.useMemo<StepperContextValue>(
    () => ({
      id,
      activeStep,
      setActiveStep,
      orientation,
      indicators,
      registerTrigger,
      triggerNodes,
    }),
    [
      id,
      activeStep,
      setActiveStep,
      orientation,
      indicators,
      registerTrigger,
      triggerNodes,
    ],
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        data-slot="stepper"
        data-orientation={orientation}
        className={cn("w-full", className)}
        {...props}
      />
    </StepperContext.Provider>
  );
}

interface StepperItemProps extends React.ComponentProps<"div"> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

function StepperItem({
  step,
  completed = false,
  disabled = false,
  loading = false,
  className,
  ...props
}: StepperItemProps) {
  const { activeStep } = useStepper();

  const state: StepState =
    completed || step < activeStep
      ? "completed"
      : activeStep === step
        ? "active"
        : "inactive";

  const isLoading = loading && step === activeStep;

  return (
    <StepItemContext.Provider
      value={{ step, state, isDisabled: disabled, isLoading }}
    >
      <div
        data-slot="stepper-item"
        data-state={state}
        data-loading={isLoading || undefined}
        className={cn(
          "group/step flex items-center justify-center not-last:flex-1 group-data-[orientation=horizontal]/stepper-nav:flex-row group-data-[orientation=vertical]/stepper-nav:flex-col",
          className,
        )}
        {...props}
      />
    </StepItemContext.Provider>
  );
}

type StepperTriggerProps = useRender.ComponentProps<"button">;

function StepperTrigger({ className, render, ...props }: StepperTriggerProps) {
  const { id, activeStep, setActiveStep, registerTrigger, triggerNodes } =
    useStepper();
  const { step, state, isDisabled, isLoading } = useStepItem();
  const ref = React.useRef<HTMLButtonElement>(null);
  const isSelected = activeStep === step;

  React.useEffect(() => {
    registerTrigger(ref.current);
  }, [registerTrigger]);

  const focusAt = (index: number) => {
    const count = triggerNodes.length;
    if (count) triggerNodes[(index + count) % count]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const index = triggerNodes.findIndex((node) => node === ref.current);
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusAt(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusAt(0);
        break;
      case "End":
        event.preventDefault();
        focusAt(triggerNodes.length - 1);
        break;
    }
  };

  return useRender({
    defaultTagName: "button",
    render,
    ref,
    props: mergeProps<"button">(
      {
        type: "button",
        role: "tab",
        id: `${id}-tab-${step}`,
        "aria-selected": isSelected,
        "aria-controls": `${id}-panel-${step}`,
        tabIndex: isSelected ? 0 : -1,
        disabled: isDisabled,
        onClick: () => setActiveStep(step),
        onKeyDown: handleKeyDown,
        className: cn(
          "inline-flex cursor-pointer items-center gap-2.5 rounded-full outline-none focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-60",
          className,
        ),
      },
      {
        "data-slot": "stepper-trigger",
        "data-state": state,
        "data-loading": isLoading || undefined,
        ...props,
      } as React.ComponentProps<"button">,
    ),
  });
}

function StepperIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { indicators } = useStepper();
  const { state, isLoading } = useStepItem();

  const indicator =
    (isLoading && indicators.loading) ||
    (state === "completed" && indicators.completed) ||
    (state === "active" && indicators.active) ||
    (state === "inactive" && indicators.inactive) ||
    children;

  return (
    <div
      data-slot="stepper-indicator"
      data-state={state}
      className={cn(
        "bg-muted text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-medium",
        className,
      )}
      {...props}
    >
      <div className="absolute flex items-center justify-center">
        {indicator}
      </div>
    </div>
  );
}

function StepperSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { state } = useStepItem();

  return (
    <div
      data-slot="stepper-separator"
      data-state={state}
      className={cn(
        "bg-muted m-0.5 rounded-full group-data-[orientation=horizontal]/stepper-nav:h-0.5 group-data-[orientation=horizontal]/stepper-nav:flex-1 group-data-[orientation=vertical]/stepper-nav:h-12 group-data-[orientation=vertical]/stepper-nav:w-0.5",
        className,
      )}
      {...props}
    />
  );
}

function StepperTitle({ className, ...props }: React.ComponentProps<"h3">) {
  const { state } = useStepItem();

  return (
    <h3
      data-slot="stepper-title"
      data-state={state}
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  );
}

function StepperDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { state } = useStepItem();

  return (
    <p
      data-slot="stepper-description"
      data-state={state}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function StepperNav({ className, ...props }: React.ComponentProps<"nav">) {
  const { activeStep, orientation } = useStepper();

  return (
    <nav
      role="tablist"
      aria-orientation={orientation}
      data-slot="stepper-nav"
      data-state={activeStep}
      data-orientation={orientation}
      className={cn(
        "group/stepper-nav inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function StepperPanel({ className, ...props }: React.ComponentProps<"div">) {
  const { activeStep } = useStepper();

  return (
    <div
      data-slot="stepper-panel"
      data-state={activeStep}
      className={cn("w-full", className)}
      {...props}
    />
  );
}

interface StepperContentProps extends React.ComponentProps<"div"> {
  value: number;
  forceMount?: boolean;
}

function StepperContent({
  value,
  forceMount = false,
  className,
  ...props
}: StepperContentProps) {
  const { id, activeStep } = useStepper();
  const isActive = value === activeStep;

  if (!forceMount && !isActive) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`${id}-panel-${value}`}
      aria-labelledby={`${id}-tab-${value}`}
      data-slot="stepper-content"
      data-state={isActive ? "active" : "inactive"}
      hidden={!isActive}
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export {
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
  useStepItem,
  useStepper,
  type StepperContentProps,
  type StepperItemProps,
  type StepperProps,
  type StepperTriggerProps,
};
