import { Slot } from "radix-ui";
import { LogIn } from "lucide-react";
import { cn } from "@/arc-shims/kit-utils";

import { buttonVariants } from "../../../shadcn/ui/button";
type LoginButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "link";

export interface LoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: LoginButtonVariant;
  showIcon?: boolean;
  asChild?: boolean;
}

export const LoginButton = ({
  variant = "default",
  showIcon = true,
  asChild = false,
  children = "Log in",
  className,
  ...props
}: LoginButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      className={cn(buttonVariants({ variant, size: "default" }), "gap-2", className)}
      {...props}
    >
      {showIcon && <LogIn className="size-4" />}
      {children}
    </Comp>
  );
};
