import { Slot } from "radix-ui";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
type GlowButtonVariant = "default" | "secondary" | "outline";

const variantGlow: Record<GlowButtonVariant, string> = {
  default:
    "shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(0,0,0,0.5)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]",
  secondary:
    "shadow-[0_0_12px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_12px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]",
  outline:
    "shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]",
};

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlowButtonVariant;
  asChild?: boolean;
}

export const GlowButton = ({
  children,
  variant = "default",
  asChild = false,
  className,
  ...props
}: GlowButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "transition-shadow duration-300",
        variantGlow[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
