"use client";

import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "@/arc-shims/kit-utils";

type MovingBorderButtonVariant = "default" | "outline" | "secondary";
type MovingBorderEffect =
  | "spin"
  | "beam"
  | "pulse"
  | "shimmer"
  | "dash"
  | "hover-spin"
  | "reverse"
  | "meteor"
  | "glow"
  | "ping"
  | "dual-beam"
  | "wave";

const variantStyles: Record<
  MovingBorderButtonVariant,
  { bg: string; border: string; text: string }
> = {
  default: {
    bg: "bg-primary",
    border: "",
    text: "text-primary-foreground",
  },
  secondary: {
    bg: "bg-secondary",
    border: "",
    text: "text-secondary-foreground",
  },
  outline: {
    bg: "bg-background",
    border: "border border-input",
    text: "text-foreground",
  },
};

const gradients = {
  rainbow:
    "conic-gradient(from 0deg, var(--chart-1), var(--chart-3), var(--chart-5), var(--chart-2), var(--chart-4), var(--chart-1))",
  beam: "conic-gradient(from 0deg, transparent 0deg, transparent 285deg, var(--chart-1) 310deg, var(--chart-3) 330deg, var(--chart-5) 350deg, transparent 360deg)",
  shimmer:
    "linear-gradient(110deg, transparent 25%, var(--chart-1) 42%, var(--chart-3) 50%, var(--chart-5) 58%, transparent 75%)",
  meteor:
    "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, var(--chart-1) 270deg, var(--chart-3) 295deg, var(--chart-5) 315deg, transparent 345deg, transparent 360deg)",
  dualBeam:
    "conic-gradient(from 0deg, transparent 0deg, var(--chart-1) 18deg, transparent 36deg, transparent 180deg, var(--chart-3) 198deg, transparent 216deg, transparent 360deg)",
  wave: "conic-gradient(from var(--moving-border-angle, 0deg), var(--chart-1), var(--chart-3), var(--chart-5), var(--chart-2), var(--chart-4), var(--chart-1))",
};

type MaskedEffect = {
  kind: "mask";
  layer: string;
  gradient: keyof typeof gradients;
};

type CustomEffect = {
  kind: "custom";
  id: "dash" | "ping";
};

const effectConfig: Record<MovingBorderEffect, MaskedEffect | CustomEffect> = {
  spin: {
    kind: "mask",
    layer: "absolute inset-[-150%] animate-[moving-border-spin_4s_linear_infinite]",
    gradient: "rainbow",
  },
  beam: {
    kind: "mask",
    layer: "absolute inset-[-120%] animate-[moving-border-spin_3s_linear_infinite]",
    gradient: "beam",
  },
  pulse: {
    kind: "mask",
    layer:
      "absolute inset-0 rounded-[inherit] animate-[moving-border-pulse_2s_ease-in-out_infinite]",
    gradient: "rainbow",
  },
  shimmer: {
    kind: "mask",
    layer:
      "absolute inset-[-50%] animate-[moving-border-shimmer_2.5s_linear_infinite] bg-[length:200%_200%]",
    gradient: "shimmer",
  },
  dash: { kind: "custom", id: "dash" },
  "hover-spin": {
    kind: "mask",
    layer:
      "absolute inset-[-150%] opacity-30 transition-opacity duration-300 group-hover/btn:opacity-100 group-hover/btn:animate-[moving-border-spin_3s_linear_infinite]",
    gradient: "rainbow",
  },
  reverse: {
    kind: "mask",
    layer:
      "absolute inset-[-150%] animate-[moving-border-spin-reverse_4s_linear_infinite]",
    gradient: "rainbow",
  },
  meteor: {
    kind: "mask",
    layer: "absolute inset-[-130%] animate-[moving-border-spin_6s_linear_infinite]",
    gradient: "meteor",
  },
  glow: {
    kind: "mask",
    layer:
      "absolute inset-[-100%] blur-sm animate-[moving-border-glow_3s_ease-in-out_infinite]",
    gradient: "rainbow",
  },
  ping: { kind: "custom", id: "ping" },
  "dual-beam": {
    kind: "mask",
    layer: "absolute inset-[-120%] animate-[moving-border-spin_5s_linear_infinite]",
    gradient: "dualBeam",
  },
  wave: {
    kind: "mask",
    layer:
      "absolute inset-[-150%] animate-[moving-border-wave_5s_linear_infinite]",
    gradient: "wave",
  },
};

export interface MovingBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MovingBorderButtonVariant;
  effect?: MovingBorderEffect;
  asChild?: boolean;
}

export const MovingBorderButton = ({
  children,
  variant = "outline",
  effect = "spin",
  asChild = false,
  className,
  ...props
}: MovingBorderButtonProps) => {
  const styles = variantStyles[variant];
  const Comp = asChild ? Slot.Root : "button";
  const config = effectConfig[effect];
  const dashGradientId = React.useId();

  return (
    <Comp
      type={asChild ? undefined : "button"}
      className={cn(
        "group/btn relative inline-flex h-9 cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
        styles.bg,
        styles.border,
        styles.text,
        className,
      )}
      {...props}
    >
      {config.kind === "mask" ? (
        <span className="absolute inset-0 overflow-hidden rounded-md p-px">
          <span
            className={config.layer}
            style={{ background: gradients[config.gradient] }}
          />
        </span>
      ) : null}

      {config.kind === "custom" && config.id === "dash" ? (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <defs>
            <linearGradient
              id={dashGradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--chart-1)" />
              <stop offset="50%" stopColor="var(--chart-3)" />
              <stop offset="100%" stopColor="var(--chart-5)" />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="calc(var(--radius) - 2px)"
            fill="none"
            stroke={`url(#${dashGradientId})`}
            strokeWidth="2"
            pathLength="100"
            strokeDasharray="14 10"
            className="animate-[moving-border-dash_4s_linear_infinite]"
          />
        </svg>
      ) : null}

      {config.kind === "custom" && config.id === "ping" ? (
        <>
          <span className="pointer-events-none absolute inset-0 rounded-md border-2 border-[var(--chart-3)] opacity-75 animate-[moving-border-ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <span className="pointer-events-none absolute inset-0 rounded-md border-2 border-[var(--chart-1)] opacity-50 animate-[moving-border-ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_1.25s]" />
        </>
      ) : null}

      <span
        className={cn(
          "absolute inset-px rounded-[calc(0.375rem-1px)]",
          styles.bg,
        )}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style>{`
        @property --moving-border-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes moving-border-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes moving-border-spin-reverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes moving-border-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes moving-border-shimmer {
          0% { transform: translateX(-35%) translateY(-35%); }
          100% { transform: translateX(35%) translateY(35%); }
        }
        @keyframes moving-border-dash {
          to { stroke-dashoffset: -100; }
        }
        @keyframes moving-border-glow {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes moving-border-ping {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes moving-border-wave {
          to {
            --moving-border-angle: 360deg;
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Comp>
  );
};
