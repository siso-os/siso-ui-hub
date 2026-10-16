"use client";

import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as React from "react";
import { cn } from "@/arc-shims/kit-utils";

export interface CounterButtonProps {
  initialCount?: number;
  min?: number;
  max?: number;
  onChange?: (count: number) => void;
  className?: string;
}

export const CounterButton = ({
  initialCount = 0,
  min = 0,
  max = 99,
  onChange,
  className,
}: CounterButtonProps) => {
  const [count, setCount] = React.useState(initialCount);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const increment = () => {
    if (count >= max) return;
    setDirection(1);
    const next = count + 1;
    setCount(next);
    onChange?.(next);
  };

  const decrement = () => {
    if (count <= min) return;
    setDirection(-1);
    const next = count - 1;
    setCount(next);
    onChange?.(next);
  };

  return (
    <div
      className={cn(
        "inline-flex h-9 items-center rounded-md border border-input bg-background",
        className,
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={count <= min}
        className="flex h-full w-9 items-center justify-center rounded-l-md transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
      >
        <Minus className="size-3.5" />
      </button>
      <div className="flex h-full w-10 items-center justify-center overflow-hidden border-x border-input text-sm font-medium">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count}
            initial={{ y: direction * 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction * -20, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={increment}
        disabled={count >= max}
        className="flex h-full w-9 items-center justify-center rounded-r-md transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
};
