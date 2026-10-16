import { type ComponentProps, splitProps } from "solid-js";

import { cn } from "@/arc-shims/kit-utils";

type TextareaProps = ComponentProps<"textarea">;

const Textarea = (props: TextareaProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <textarea
      data-slot="textarea"
      class={cn(
        "z-textarea placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...others}
    />
  );
};

export { Textarea, type TextareaProps };
