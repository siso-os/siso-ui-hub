"use client";

import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
type MorphButtonVariant = "default" | "secondary" | "ghost";

export interface MorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: MorphButtonVariant;
  asChild?: boolean;
}

export const MorphButton = ({
  children,
  isLoading = false,
  variant = "default",
  asChild = false,
  className,
  disabled,
  ...props
}: MorphButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <motion.div
      animate={{ width: isLoading ? 36 : "auto" }}
      initial={false}
      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      className="inline-block"
    >
      <Comp
        type={asChild ? undefined : "button"}
        disabled={disabled || isLoading}
        className={cn(
          buttonVariants({ variant, size: "default" }),
          "w-full min-w-9 overflow-hidden",
          className,
        )}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Loader2 className="size-4 animate-spin" />
            </motion.span>
          ) : (
            <motion.span
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </Comp>
    </motion.div>
  );
};
