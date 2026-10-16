import { Slot } from "radix-ui";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
type AuroraButtonVariant = "default" | "secondary" | "outline";

const auroraGradient =
  "linear-gradient(115deg, var(--chart-1), var(--chart-2), var(--chart-3), var(--chart-4), var(--chart-5), var(--chart-1))";

export interface AuroraButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AuroraButtonVariant;
  asChild?: boolean;
}

export const AuroraButton = ({
  children,
  variant = "default",
  asChild = false,
  className,
  ...props
}: AuroraButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";
  const isOutline = variant === "outline";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "relative overflow-hidden",
        !isOutline && "border-transparent bg-transparent text-primary-foreground",
        className,
      )}
      {...props}
    >
      {!isOutline && (
        <span
          className="absolute inset-0 animate-[aurora-flow_8s_ease-in-out_infinite]"
          style={{
            background: auroraGradient,
            backgroundSize: "300% 300%",
          }}
        />
      )}

      {isOutline && (
        <>
          <span
            className="absolute inset-0 animate-[aurora-flow_8s_ease-in-out_infinite] opacity-80"
            style={{
              background: auroraGradient,
              backgroundSize: "300% 300%",
            }}
          />
          <span className="absolute inset-px rounded-[calc(0.375rem-1px)] bg-background" />
        </>
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style>{`
        @keyframes aurora-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </Comp>
  );
};
