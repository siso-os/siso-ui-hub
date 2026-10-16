"use client";

import { cn } from "@/arc-shims/kit-utils";
import { buttonVariants } from "../../../shadcn/ui/button";

type TraceButtonVariant = "default" | "outline" | "secondary";
type TraceEffect = "draw" | "loop" | "dual" | "dash" | "glow" | "partial";

export interface TraceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TraceButtonVariant;
  effect?: TraceEffect;
}

const rectProps = {
  x: "0.5",
  y: "0.5",
  width: "calc(100% - 1px)",
  height: "calc(100% - 1px)",
  rx: "calc(var(--radius) - 2px)",
  fill: "none" as const,
  stroke: "currentColor",
  pathLength: 100,
};

const hiddenStroke =
  "pointer-events-none opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100";

const drawStroke = `${hiddenStroke} [stroke-dasharray:100] [stroke-dashoffset:100] group-hover/btn:animate-[trace-draw_0.6s_ease-out_forwards]`;

const halfStroke = `${hiddenStroke} [stroke-dasharray:50_50] [stroke-dashoffset:50] group-hover/btn:animate-[trace-draw_0.55s_ease-out_forwards]`;

const halfStrokeReverse = `${hiddenStroke} [stroke-dasharray:50_50] [stroke-dashoffset:100] group-hover/btn:animate-[trace-draw-back_0.55s_ease-out_forwards]`;

const TraceRect = ({
  className,
  strokeWidth = 1.5,
  strokeLinecap,
}: {
  className?: string;
  strokeWidth?: number;
  strokeLinecap?: "butt" | "round" | "square";
}) => (
  <rect
    {...rectProps}
    strokeWidth={strokeWidth}
    strokeLinecap={strokeLinecap}
    className={className}
  />
);

const TraceEffectSvg = ({ effect }: { effect: TraceEffect }) => {
  switch (effect) {
    case "draw":
      return (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <TraceRect className={drawStroke} />
        </svg>
      );

    case "loop":
      return (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <TraceRect
            className={`${hiddenStroke} [stroke-dasharray:100] [stroke-dashoffset:100] group-hover/btn:animate-[trace-loop_2.4s_ease-in-out_infinite]`}
          />
        </svg>
      );

    case "dual":
      return (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <TraceRect className={halfStroke} />
          <TraceRect className={halfStrokeReverse} />
        </svg>
      );

    case "dash":
      return (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <TraceRect
            strokeLinecap="round"
            className={`${hiddenStroke} [stroke-dasharray:5_5] [stroke-dashoffset:100] group-hover/btn:animate-[trace-draw_0.8s_ease-out_forwards]`}
          />
        </svg>
      );

    case "glow":
      return (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <TraceRect
            strokeWidth={4}
            className={`${hiddenStroke} opacity-0 group-hover/btn:opacity-30 [stroke-dasharray:100] [stroke-dashoffset:100] group-hover/btn:animate-[trace-draw_0.6s_ease-out_forwards]`}
          />
          <TraceRect className={drawStroke} />
        </svg>
      );

    case "partial":
      return (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <TraceRect className={halfStroke} />
        </svg>
      );
  }
};

export const TraceButton = ({
  children,
  variant = "default",
  effect = "draw",
  className,
  ...props
}: TraceButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "group/btn relative overflow-visible",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <TraceEffectSvg effect={effect} />
      <style>{`
        @keyframes trace-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes trace-draw-back {
          to { stroke-dashoffset: 50; }
        }
        @keyframes trace-loop {
          0% { stroke-dashoffset: 100; }
          30% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -100; }
        }
      `}</style>
    </button>
  );
};
