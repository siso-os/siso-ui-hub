import { Slot } from "radix-ui";
import { cn } from "@/arc-shims/kit-utils";

type ShimmerButtonVariant = "default" | "secondary" | "outline";

const variantStyles: Record<
  ShimmerButtonVariant,
  { bg: string; border: string; shimmerColor: string; text: string }
> = {
  default: {
    bg: "bg-primary",
    border: "",
    shimmerColor: "#ffaa40",
    text: "text-primary-foreground",
  },
  secondary: {
    bg: "bg-secondary",
    border: "",
    shimmerColor: "#a1a1aa",
    text: "text-secondary-foreground",
  },
  outline: {
    bg: "bg-background",
    border: "border border-input",
    shimmerColor: "#6366f1",
    text: "text-foreground",
  },
};

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ShimmerButtonVariant;
  asChild?: boolean;
}

export const ShimmerButton = ({
  children,
  variant = "default",
  asChild = false,
  className,
  ...props
}: ShimmerButtonProps) => {
  const styles = variantStyles[variant];
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      className={cn(
        "relative inline-flex h-9 cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
        styles.bg,
        styles.border,
        styles.text,
        className,
      )}
      {...props}
    >
      {/* Rotating border glow */}
      <span className="absolute inset-0 overflow-hidden rounded-md">
        <span
          className="absolute inset-[-200%] animate-[shimmer-spin_4s_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0 340deg, ${styles.shimmerColor} 360deg)`,
          }}
        />
      </span>

      {/* Inner fill to mask the border */}
      <span
        className={cn(
          "absolute inset-px rounded-[calc(0.375rem-1px)]",
          styles.bg,
        )}
      />

      {/* Surface shimmer sweep */}
      <span className="absolute inset-px overflow-hidden rounded-[calc(0.375rem-1px)]">
        <span
          className="absolute inset-0 animate-[shimmer-slide_3s_ease-in-out_infinite]"
          style={{
            background: `linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.15) 37%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 63%, transparent 75%)`,
            backgroundSize: "200% 100%",
          }}
        />
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style>{`
        @keyframes shimmer-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer-slide {
          0%, 100% { background-position: -200% 0; }
          50% { background-position: 200% 0; }
        }
      `}</style>
    </Comp>
  );
};
