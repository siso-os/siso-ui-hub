import { Slot } from "radix-ui";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
type ShineButtonVariant = "default" | "secondary" | "outline";

const variantShine: Record<ShineButtonVariant, string> = {
  default:
    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
  secondary:
    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
  outline:
    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.75) 50%, transparent 100%)",
};

export interface ShineButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ShineButtonVariant;
  duration?: string;
  asChild?: boolean;
}

export const ShineButton = ({
  children,
  variant = "default",
  duration = "3.5s",
  asChild = false,
  className,
  ...props
}: ShineButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "relative overflow-hidden",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="absolute -inset-y-full w-1/2 animate-[shine-sweep_ease-in-out_infinite]"
          style={{
            background: variantShine[variant],
            animationDuration: duration,
          }}
        />
      </span>

      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style>{`
        @keyframes shine-sweep {
          0% { transform: translateX(-200%) skewX(-20deg); }
          35% { transform: translateX(400%) skewX(-20deg); }
          100% { transform: translateX(400%) skewX(-20deg); }
        }
      `}</style>
    </Comp>
  );
};
