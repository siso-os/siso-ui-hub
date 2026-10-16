"use client";

import * as React from "react";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
type TypewriterButtonVariant = "default" | "outline" | "secondary";
type TypewriterButtonPlayOn = "hover" | "auto";

export interface TypewriterButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  text: string;
  variant?: TypewriterButtonVariant;
  speed?: number;
  playOn?: TypewriterButtonPlayOn;
}

export const TypewriterButton = ({
  text,
  variant = "default",
  speed = 50,
  playOn = "hover",
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: TypewriterButtonProps) => {
  const [display, setDisplay] = React.useState(playOn === "auto" ? "" : text);
  const [isTyping, setIsTyping] = React.useState(false);
  const intervalRef = React.useRef<number | null>(null);
  const isHoveredRef = React.useRef(false);

  const clearTimer = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTyping = React.useCallback(() => {
    clearTimer();
    setIsTyping(true);
    setDisplay("");
    let i = 0;
    intervalRef.current = window.setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearTimer();
      }
    }, speed);
  }, [text, speed]);

  const reset = React.useCallback(() => {
    clearTimer();
    setIsTyping(false);
    setDisplay(text);
  }, [text]);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(event);
    if (playOn !== "hover" || isHoveredRef.current) return;
    isHoveredRef.current = true;
    startTyping();
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(event);
    if (playOn !== "hover") return;
    isHoveredRef.current = false;
    reset();
  };

  React.useEffect(() => {
    if (playOn === "auto") startTyping();
  }, [playOn, startTyping]);

  React.useEffect(
    () => () => {
      clearTimer();
    },
    [],
  );

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "group/btn font-mono",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="inline-grid whitespace-nowrap [grid-template-areas:'stack']">
        <span className="invisible [grid-area:stack]" aria-hidden>
          {text}|
        </span>
        <span className="[grid-area:stack]">
          {display}
          {isTyping ? <span className="animate-pulse">|</span> : null}
        </span>
      </span>
    </button>
  );
};
