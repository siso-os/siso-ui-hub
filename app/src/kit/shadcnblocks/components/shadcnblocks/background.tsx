import { useId } from "react";
import { cn } from "@/arc-shims/kit-utils";

// ============================================================================
// Types
// ============================================================================

export type BorderComponent =
  | "none"
  | "solid-line"
  | "dashed-line"
  | "diagonal-pattern"
  | "dots"
  | "gradient-fade";

export type PatternComponent = "none" | "plus-signs" | "dots" | "noise" | "grid";

export type MeshComponent = "none" | "plasma-gradient" | "subtle-gradient";

export interface BackgroundStyle {
  // Preset (applies a bundle of defaults)
  preset?:
    | "mainline"
    | "mainline-bordered"
    | "charter"
    | "scalar"
    | "plasma"
    | "none";

  // === Section-level (full viewport width) ===

  // Section wrapper styling
  gradient?: "top" | "bottom" | "both" | "none";
  rounded?: "none" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  margin?: "none" | "sm" | "md" | "lg";
  
  // Additional className (for padding, etc.)
  className?: string;

  // Section border components (full viewport width)
  sectionBorderTop?: BorderComponent;
  sectionBorderBottom?: BorderComponent;

  // Section background patterns (absolute positioned)
  pattern?: PatternComponent;
  patternMask?: "none" | "radial" | "left" | "right" | "top" | "bottom";
  mesh?: MeshComponent;

  // === Container-level (container width) ===

  // Container border components
  containerBorderLeft?: BorderComponent;
  containerBorderRight?: BorderComponent;
  containerBorderTop?: BorderComponent;
  containerBorderBottom?: BorderComponent;

  // Container padding (inside borders)
  containerPadding?: "none" | "sm" | "md" | "lg";

  // === Viewport fills (beyond container) ===

  // Decorations extending to viewport edges
  viewportFillLeft?: PatternComponent;
  viewportFillRight?: PatternComponent;
}

// ============================================================================
// Preset Definitions
// ============================================================================

const PRESETS: Record<string, Partial<BackgroundStyle>> = {
  none: {},
  mainline: {
    gradient: "top",
    rounded: "4xl",
    margin: "md",
  },
  "mainline-bordered": {
    gradient: "top",
    rounded: "4xl",
    margin: "md",
    sectionBorderTop: "dashed-line",
    sectionBorderBottom: "dashed-line",
    containerBorderLeft: "dashed-line",
    containerBorderRight: "dashed-line",
  },
  charter: {
    pattern: "plus-signs",
    patternMask: "radial",
  },
  scalar: {
    sectionBorderTop: "solid-line",
    sectionBorderBottom: "solid-line",
    containerBorderLeft: "solid-line",
    containerBorderRight: "solid-line",
    viewportFillLeft: "plus-signs",
    viewportFillRight: "plus-signs",
  },
  plasma: {
    mesh: "plasma-gradient",
  },
};

// ============================================================================
// Border Components (inline for portability)
// ============================================================================

interface BorderProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedLine = ({ orientation = "horizontal", className }: BorderProps) => {
  const isHorizontal = orientation === "horizontal";
  return (
    <div
      className={cn(
        "text-muted-foreground relative",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className
      )}
    >
      <div
        className={cn(
          isHorizontal
            ? [
                "h-px w-full",
                "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]",
              ]
            : [
                "h-full w-px",
                "bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]",
              ]
        )}
      />
    </div>
  );
};

const SolidLine = ({ orientation = "horizontal", className }: BorderProps) => (
  <div
    className={cn(
      "bg-border",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    )}
  />
);

const DiagonalPattern = ({
  orientation = "horizontal",
  className,
}: BorderProps) => (
  <div
    className={cn(
      "text-muted-foreground",
      orientation === "horizontal" ? "h-2 w-full" : "h-full w-2",
      className
    )}
    style={{
      backgroundImage: `repeating-linear-gradient(
        ${orientation === "horizontal" ? "45deg" : "135deg"},
        transparent,
        transparent 4px,
        currentColor 4px,
        currentColor 5px
      )`,
    }}
  />
);

const DottedBorder = ({
  orientation = "horizontal",
  className,
}: BorderProps) => (
  <div
    className={cn(
      "text-muted-foreground",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    )}
    style={{
      backgroundImage:
        "radial-gradient(circle, currentColor 1px, transparent 1px)",
      backgroundSize: orientation === "horizontal" ? "8px 1px" : "1px 8px",
    }}
  />
);

const GradientFade = ({
  orientation = "horizontal",
  className,
}: BorderProps) => (
  <div
    className={cn(
      orientation === "horizontal"
        ? "h-8 w-full bg-gradient-to-b from-primary/20 to-transparent"
        : "h-full w-8 bg-gradient-to-r from-primary/20 to-transparent",
      className
    )}
  />
);

// Border component lookup
const BORDER_COMPONENTS: Record<
  BorderComponent,
  React.FC<BorderProps> | null
> = {
  none: null,
  "solid-line": SolidLine,
  "dashed-line": DashedLine,
  "diagonal-pattern": DiagonalPattern,
  dots: DottedBorder,
  "gradient-fade": GradientFade,
};

// ============================================================================
// Pattern Components (inline for portability)
// ============================================================================

interface PatternProps {
  className?: string;
}

const PlusSigns = ({ className }: PatternProps) => {
  const GAP = 16;
  const STROKE_WIDTH = 1;
  const PLUS_SIZE = 6;
  const id = useId();
  const patternId = `plus-pattern-${id}`;

  return (
    <svg
      width="100%"
      height="100%"
      className={cn("text-foreground/5", className)}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

const DotsPattern = ({ className }: PatternProps) => (
  <div
    className={cn("size-full text-foreground/5", className)}
    style={{
      backgroundImage:
        "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
      backgroundSize: "20px 20px",
    }}
  />
);

const NoisePattern = ({ className }: PatternProps) => (
  <div
    className={cn("size-full text-foreground/10", className)}
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity: 0.4,
    }}
  />
);

const GridPattern = ({ className }: PatternProps) => {
  const id = useId();
  const patternId = `grid-pattern-${id}`;

  return (
    <svg
      width="100%"
      height="100%"
      className={cn("text-foreground/5", className)}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

// Pattern component lookup
const PATTERN_COMPONENTS: Record<
  PatternComponent,
  React.FC<PatternProps> | null
> = {
  none: null,
  "plus-signs": PlusSigns,
  dots: DotsPattern,
  noise: NoisePattern,
  grid: GridPattern,
};

// ============================================================================
// Mesh/Gradient Components (inline for portability)
// ============================================================================

const PlasmaGradient = ({ className }: PatternProps) => {
  const id = useId();

  return (
    <svg
      className={cn("size-full", className)}
      viewBox="0 0 1342 1199"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        fill={`url(#plasma-a-${id})`}
        d="M914.912 1197.77 747.793 808.811l115.698-221.478 334.239 73.826 109.08 196.135-391.898 340.476Z"
      />
      <path
        fill={`url(#plasma-c-${id})`}
        d="m875.715 420.318 203.405-357.96c50.52-10.487-50.57 96.246 0 186.332 80.45 143.304 298.36 312.903 256.86 419.243-67.58 173.19-306.7 49.523-396.529 0-71.863-39.618-72.434-181.585-63.736-247.615Z"
      />
      <path
        fill={`url(#plasma-d-${id})`}
        d="m46.623 746.37 908.336-619.388 130.381-66.714-46.89 196.709-156.685 413.622c-27.829 50.066-111.545 120.16-223.775 0-98.592-105.557-466.882-3.975-611.367 75.771L.814 777.607c10.115-9.59 25.82-20.205 45.809-31.237Z"
      />
      <defs>
        <linearGradient
          id={`plasma-a-${id}`}
          x1={1027.3}
          x2={1027.73}
          y1={587.333}
          y2={1198.11}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#9D83E7" />
          <stop offset={0.516} stopColor="#D445E7" />
        </linearGradient>
        <linearGradient
          id={`plasma-c-${id}`}
          x1={871.897}
          x2={1188.44}
          y1={575.509}
          y2={575.628}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9259ED" />
          <stop offset={0.514} stopColor="#CF54EE" />
          <stop offset={1} stopColor="#FB8684" />
        </linearGradient>
        <linearGradient
          id={`plasma-d-${id}`}
          x1={676.669}
          x2={677.051}
          y1={60.268}
          y2={757.516}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B956EE" />
          <stop offset={1} stopColor="#9672FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const SubtleGradient = ({ className }: PatternProps) => (
  <div
    className={cn(
      "size-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10",
      className
    )}
  />
);

// Mesh component lookup
const MESH_COMPONENTS: Record<MeshComponent, React.FC<PatternProps> | null> = {
  none: null,
  "plasma-gradient": PlasmaGradient,
  "subtle-gradient": SubtleGradient,
};

// ============================================================================
// Background Component
// ============================================================================

interface BackgroundProps {
  style?: BackgroundStyle;
  children: React.ReactNode;
  className?: string;
}

export const Background = ({ style, children, className }: BackgroundProps) => {
  // Resolve preset + overrides
  const resolved = { ...PRESETS[style?.preset ?? "none"], ...style };
  
  // Merge className from props and style
  const mergedClassName = cn(className, resolved.className);

  // Get border components
  const SectionBorderTop =
    BORDER_COMPONENTS[resolved.sectionBorderTop ?? "none"];
  const SectionBorderBottom =
    BORDER_COMPONENTS[resolved.sectionBorderBottom ?? "none"];
  const ContainerBorderLeft =
    BORDER_COMPONENTS[resolved.containerBorderLeft ?? "none"];
  const ContainerBorderRight =
    BORDER_COMPONENTS[resolved.containerBorderRight ?? "none"];
  const ContainerBorderTop =
    BORDER_COMPONENTS[resolved.containerBorderTop ?? "none"];
  const ContainerBorderBottom =
    BORDER_COMPONENTS[resolved.containerBorderBottom ?? "none"];

  // Get pattern components
  const PatternComp = PATTERN_COMPONENTS[resolved.pattern ?? "none"];
  const MeshComp = MESH_COMPONENTS[resolved.mesh ?? "none"];
  const ViewportFillLeftComp =
    PATTERN_COMPONENTS[resolved.viewportFillLeft ?? "none"];
  const ViewportFillRightComp =
    PATTERN_COMPONENTS[resolved.viewportFillRight ?? "none"];

  // If no styling is applied, just render children
  const hasAnyStyle =
    mergedClassName ||
    resolved.gradient ||
    resolved.rounded ||
    resolved.margin ||
    resolved.sectionBorderTop ||
    resolved.sectionBorderBottom ||
    resolved.containerBorderLeft ||
    resolved.containerBorderRight ||
    resolved.containerBorderTop ||
    resolved.containerBorderBottom ||
    resolved.pattern ||
    resolved.mesh ||
    resolved.viewportFillLeft ||
    resolved.viewportFillRight;

  if (!hasAnyStyle) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        // Margin
        resolved.margin === "sm" && "mx-1.5 mt-1.5 lg:mx-2",
        resolved.margin === "md" && "mx-2.5 mt-2.5 lg:mx-4",
        resolved.margin === "lg" && "mx-4 mt-4 lg:mx-6",
        // Rounded corners
        resolved.rounded === "md" && "rounded-md",
        resolved.rounded === "lg" && "rounded-lg",
        resolved.rounded === "xl" && "rounded-xl",
        resolved.rounded === "2xl" && "rounded-2xl",
        resolved.rounded === "3xl" && "rounded-3xl",
        resolved.rounded === "4xl" && "rounded-t-4xl rounded-b-2xl",
        // Gradient
        resolved.gradient === "top" &&
          "bg-linear-to-b from-primary/50 via-background to-background/80 via-20%",
        resolved.gradient === "bottom" &&
          "bg-linear-to-b from-background via-background to-primary/50",
        resolved.gradient === "both" &&
          "bg-linear-to-b from-primary/30 via-background to-primary/30",
        mergedClassName
      )}
    >
      {/* Section border top (full width) */}
      {SectionBorderTop && (
        <div className="absolute inset-x-0 top-0 z-10">
          <SectionBorderTop orientation="horizontal" />
        </div>
      )}

      {/* Section border bottom (full width) */}
      {SectionBorderBottom && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <SectionBorderBottom orientation="horizontal" />
        </div>
      )}

      {/* Background pattern layer */}
      {PatternComp && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            resolved.patternMask === "radial" &&
              "[mask-image:radial-gradient(circle_at_center,black_0%,black_20%,transparent_75%)]",
            resolved.patternMask === "left" &&
              "[mask-image:linear-gradient(to_right,black_0%,black_30%,transparent_70%)]",
            resolved.patternMask === "right" &&
              "[mask-image:linear-gradient(to_left,black_0%,black_30%,transparent_70%)]",
            resolved.patternMask === "top" &&
              "[mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_70%)]",
            resolved.patternMask === "bottom" &&
              "[mask-image:linear-gradient(to_top,black_0%,black_30%,transparent_70%)]"
          )}
        >
          <PatternComp className="size-full" />
        </div>
      )}

      {/* Mesh gradient layer */}
      {MeshComp && (
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <MeshComp className="size-full" />
        </div>
      )}

      {/* Content wrapper with container borders */}
      <div className="relative">
        {/* Container left border */}
        {ContainerBorderLeft && (
          <div className="absolute bottom-0 top-0 left-4 z-10 hidden lg:left-[max(1rem,calc((100%-1400px)/2+1rem))] lg:block">
            <ContainerBorderLeft orientation="vertical" className="h-full" />
          </div>
        )}

        {/* Container right border */}
        {ContainerBorderRight && (
          <div className="absolute bottom-0 top-0 right-4 z-10 hidden lg:right-[max(1rem,calc((100%-1400px)/2+1rem))] lg:block">
            <ContainerBorderRight orientation="vertical" className="h-full" />
          </div>
        )}

        {/* Container top border */}
        {ContainerBorderTop && (
          <div className="absolute inset-x-4 top-0 z-10 lg:inset-x-[max(1rem,calc((100%-1400px)/2+1rem))]">
            <ContainerBorderTop orientation="horizontal" />
          </div>
        )}

        {/* Container bottom border */}
        {ContainerBorderBottom && (
          <div className="absolute inset-x-4 bottom-0 z-10 lg:inset-x-[max(1rem,calc((100%-1400px)/2+1rem))]">
            <ContainerBorderBottom orientation="horizontal" />
          </div>
        )}

        {/* Viewport fill left */}
        {ViewportFillLeftComp && (
          <div className="pointer-events-none absolute bottom-0 top-0 right-full hidden w-screen border-y lg:block">
            <ViewportFillLeftComp className="size-full" />
          </div>
        )}

        {/* Viewport fill right */}
        {ViewportFillRightComp && (
          <div className="pointer-events-none absolute bottom-0 top-0 left-full hidden w-screen border-y lg:block">
            <ViewportFillRightComp className="size-full" />
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Background;
