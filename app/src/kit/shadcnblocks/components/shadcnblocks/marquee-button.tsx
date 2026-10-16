import { cn } from "@/arc-shims/kit-utils";
import { buttonVariants } from "../../../shadcn/ui/button";

type MarqueeButtonVariant = "default" | "outline" | "secondary";
type MarqueeButtonPlayOn = "hover" | "auto";

export interface MarqueeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: MarqueeButtonVariant;
  playOn?: MarqueeButtonPlayOn;
}

export const MarqueeButton = ({
  text,
  variant = "default",
  playOn = "hover",
  className,
  ...props
}: MarqueeButtonProps) => {
  const segment = `${text} · `;
  const track = segment.repeat(6);

  const marqueeTrack = (
    <span
      className={cn(
        "inline-flex w-max whitespace-nowrap will-change-transform",
        playOn === "auto"
          ? "animate-[marquee-scroll-auto_24s_linear_infinite]"
          : "group-hover/btn:animate-[marquee-scroll-hover_16s_linear_infinite]",
      )}
    >
      <span>{track}</span>
      <span aria-hidden>{track}</span>
    </span>
  );

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "group/btn relative max-w-[200px] overflow-hidden",
        className,
      )}
      {...props}
    >
      {playOn === "auto" ? (
        marqueeTrack
      ) : (
        <>
          <span className="flex w-full items-center justify-center transition-opacity duration-200 group-hover/btn:opacity-0">
            {text}
          </span>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100">
            {marqueeTrack}
          </span>
        </>
      )}
      <style>{`
        @keyframes marquee-scroll-auto {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-hover {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </button>
  );
};
