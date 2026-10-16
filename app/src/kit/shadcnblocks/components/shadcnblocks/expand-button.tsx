"use client";

import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
const COLLAPSED = 36;
const spring = { type: "spring" as const, stiffness: 500, damping: 32 };

type ExpandButtonVariant = "default" | "secondary" | "outline" | "ghost";

export interface ExpandButtonProps {
  children: React.ReactNode;
  expandText: string;
  variant?: ExpandButtonVariant;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

export const ExpandButton = ({
  children,
  expandText,
  variant = "default",
  isLoading = false,
  className,
  disabled,
  asChild = false,
}: ExpandButtonProps) => {
  const [hovered, setHovered] = React.useState(false);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [fullWidth, setFullWidth] = React.useState(COLLAPSED);

  React.useLayoutEffect(() => {
    if (measureRef.current) {
      setFullWidth(measureRef.current.offsetWidth);
    }
  }, [expandText]);

  const expanded = hovered && !isLoading && !disabled;
  const Comp = asChild ? Slot.Root : "button";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ width: expanded ? fullWidth : COLLAPSED }}
      initial={false}
      transition={spring}
      className="inline-block"
    >
      <Comp
        type={asChild ? undefined : "button"}
        disabled={disabled || isLoading}
        className={cn(
          buttonVariants({ variant, size: "default" }),
          "relative h-9 w-full overflow-hidden p-0",
          className,
        )}
      >
        {/* Hidden measurement span */}
        <span
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 flex h-9 items-center gap-2 whitespace-nowrap px-3"
        >
          {children}
          {expandText}
        </span>

        {isLoading ? (
          <span className="flex h-full w-full items-center justify-center">
            <Loader2 className="size-4 animate-spin" />
          </span>
        ) : (
          <span
            className={cn(
              "flex h-full w-full items-center whitespace-nowrap",
              expanded ? "gap-2 px-3" : "justify-center",
            )}
          >
            <span className="shrink-0">{children}</span>
            <span
              className={cn(
                "overflow-hidden transition-all duration-150",
                expanded ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0",
              )}
            >
              {expandText}
            </span>
          </span>
        )}
      </Comp>
    </motion.div>
  );
};
