import { cn } from "@/arc-shims/kit-utils";

import { PatternPlaceholder } from "../../components/shadcnblocks/pattern-placeholder";
interface BackgroundPattern2Props {
  className?: string;
}

const BackgroundPattern2 = ({ className }: BackgroundPattern2Props) => {
  return (
    <section
      className={cn(
        "relative h-svh max-h-[1200px] min-h-[600px] w-full",
        className,
      )}
    >
      <PatternPlaceholder />
      {/* Background Pattern */}
      {/* Bottom Primary Radial Background Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, var(--background) 40%, var(--primary) 100%)",
        }}
      />
    </section>
  );
};

export { BackgroundPattern2 };
