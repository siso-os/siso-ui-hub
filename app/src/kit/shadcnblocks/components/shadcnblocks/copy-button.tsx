"use client";

import { Check, Copy } from "lucide-react";
import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
type CopyButtonVariant = "default" | "secondary" | "outline" | "ghost";

export interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  variant?: CopyButtonVariant;
  label?: string;
  asChild?: boolean;
}

export const CopyButton = ({
  value,
  variant = "default",
  label = "Copy",
  asChild = false,
  children,
  className,
  onClick,
  ...props
}: CopyButtonProps) => {
  const [copied, setCopied] = React.useState(false);
  const Comp = asChild ? Slot.Root : "button";

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    onClick?.(e);
  };

  return (
    <Comp
      type={asChild ? undefined : "button"}
      onClick={asChild ? onClick : handleCopy}
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "gap-2",
        className,
      )}
      {...props}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {children ?? label}
    </Comp>
  );
};
