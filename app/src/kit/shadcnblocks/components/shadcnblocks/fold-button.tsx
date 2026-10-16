"use client";

import { Loader2 } from "lucide-react";
import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "@/arc-shims/kit-utils";

type FoldButtonVariant = "default" | "secondary" | "outline" | "ghost";

const variantStyles: Record<
  FoldButtonVariant,
  { button: string; fold: string; label: string; labelHover: string }
> = {
  default: {
    button: "border border-primary bg-primary",
    fold: "bg-primary-foreground",
    label: "text-primary-foreground",
    labelHover: "group-hover/fold:text-primary",
  },
  secondary: {
    button: "border border-secondary bg-secondary",
    fold: "bg-secondary-foreground",
    label: "text-secondary-foreground",
    labelHover: "group-hover/fold:text-secondary",
  },
  outline: {
    button: "border border-input bg-background",
    fold: "bg-primary",
    label: "text-foreground",
    labelHover: "group-hover/fold:text-primary-foreground",
  },
  ghost: {
    button: "border border-transparent bg-transparent",
    fold: "bg-accent",
    label: "text-foreground",
    labelHover: "group-hover/fold:text-accent-foreground",
  },
};

export interface FoldButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FoldButtonVariant;
  isLoading?: boolean;
  asChild?: boolean;
}

export const FoldButton = ({
  children,
  variant = "default",
  isLoading = false,
  asChild = false,
  className,
  disabled,
  ...props
}: FoldButtonProps) => {
  const styles = variantStyles[variant];
  const isDisabled = disabled || isLoading;
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      disabled={isDisabled}
      className={cn(
        "group/fold relative inline-flex h-9 cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
        styles.button,
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/fold:scale-y-100",
          styles.fold,
          isDisabled && "group-hover/fold:scale-y-0",
        )}
      />
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 transition-colors duration-300",
          styles.label,
          !isDisabled && styles.labelHover,
        )}
      >
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : children}
      </span>
    </Comp>
  );
};
