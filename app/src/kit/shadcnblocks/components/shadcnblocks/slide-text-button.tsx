import { cn } from "@/arc-shims/kit-utils";
import { buttonVariants } from "../../../shadcn/ui/button";

type SlideTextButtonVariant = "default" | "secondary" | "outline";
type SlideTextDirection = "up" | "left" | "right";

export interface SlideTextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  hoverText?: string;
  direction?: SlideTextDirection;
  variant?: SlideTextButtonVariant;
}

const slideTransforms: Record<
  SlideTextDirection,
  { exit: string; enter: string }
> = {
  up: {
    exit: "translate-y-0 group-hover/btn:-translate-y-full",
    enter: "translate-y-full group-hover/btn:translate-y-0",
  },
  left: {
    exit: "translate-x-0 group-hover/btn:-translate-x-full",
    enter: "translate-x-full group-hover/btn:translate-x-0",
  },
  right: {
    exit: "translate-x-0 group-hover/btn:translate-x-full",
    enter: "-translate-x-full group-hover/btn:translate-x-0",
  },
};

export const SlideTextButton = ({
  text,
  hoverText,
  direction = "up",
  variant = "default",
  className,
  ...props
}: SlideTextButtonProps) => {
  const label = hoverText ?? text;
  const motion = slideTransforms[direction];

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "group/btn relative overflow-hidden",
        className,
      )}
      {...props}
    >
      <span className="inline-grid overflow-hidden whitespace-nowrap [grid-template-areas:'stack']">
        <span
          className={cn(
            "[grid-area:stack] transition-transform duration-300 ease-out",
            motion.exit,
          )}
        >
          {text}
        </span>
        <span
          className={cn(
            "[grid-area:stack] transition-transform duration-300 ease-out",
            motion.enter,
          )}
          aria-hidden
        >
          {label}
        </span>
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
};
