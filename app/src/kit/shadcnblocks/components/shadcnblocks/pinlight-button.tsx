"use client";

import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
type PinlightButtonVariant = "default" | "secondary" | "outline";

export interface PinlightButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PinlightButtonVariant;
  asChild?: boolean;
}

export const PinlightButton = ({
  children,
  variant = "default",
  asChild = false,
  className,
  onMouseMove,
  onMouseLeave,
  ...props
}: PinlightButtonProps) => {
  const [position, setPosition] = React.useState({ x: 50, y: 50 });
  const [active, setActive] = React.useState(false);
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "relative overflow-hidden",
        className,
      )}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
        setActive(true);
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        setActive(false);
        onMouseLeave?.(e);
      }}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(circle 80px at ${position.x}% ${position.y}%, rgba(255,255,255,0.35), transparent 70%)`,
        }}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Comp>
  );
};
