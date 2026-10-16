import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Separator as SeparatorPrimitive, type SeparatorRootProps } from "@kobalte/core/separator";
import { type ComponentProps, mergeProps, splitProps, type ValidComponent } from "solid-js";

import { cn } from "@/arc-shims/kit-utils";

type SeparatorProps<T extends ValidComponent = "div"> = PolymorphicProps<T, SeparatorRootProps<T>> &
  Pick<ComponentProps<T>, "class">;

const Separator = <T extends ValidComponent = "div">(props: SeparatorProps<T>) => {
  const mergedProps = mergeProps({ as: "div", orientation: "horizontal" } as const, props);
  const [local, others] = splitProps(mergedProps as SeparatorProps, ["class", "orientation"]);

  return (
    <SeparatorPrimitive
      data-slot="separator"
      role="separator"
      aria-orientation={local.orientation}
      orientation={local.orientation}
      class={cn(
        "z-separator bg-border shrink-0",
        local.orientation === "horizontal"
          ? "z-separator-horizontal h-px w-full"
          : "z-separator-vertical w-px self-stretch",
        local.class,
      )}
      {...others}
    />
  );
};

export { Separator, type SeparatorProps };
