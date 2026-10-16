import { Slot } from "radix-ui";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
type GleamButtonVariant = "default" | "secondary" | "outline";

const gleamGradient: Record<GleamButtonVariant, string> = {
  default:
    "linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.7) 50%, transparent 58%)",
  secondary:
    "linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.9) 50%, transparent 58%)",
  outline:
    "linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.65) 50%, transparent 58%)",
};

export interface GleamButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GleamButtonVariant;
  asChild?: boolean;
}

export const GleamButton = ({
  children,
  variant = "default",
  asChild = false,
  className,
  ...props
}: GleamButtonProps) => {
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
          className="absolute -inset-y-full w-[35%] animate-[gleam-pass_2.5s_ease-in-out_infinite]"
          style={{ background: gleamGradient[variant] }}
        />
      </span>

      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style>{`
        @keyframes gleam-pass {
          0% { transform: translateX(-250%) skewX(-15deg); opacity: 0; }
          8% { opacity: 1; }
          28% { transform: translateX(450%) skewX(-15deg); opacity: 1; }
          35%, 100% { transform: translateX(450%) skewX(-15deg); opacity: 0; }
        }
      `}</style>
    </Comp>
  );
};
