"use client";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "../../../../shadcn/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useEffect, useRef, useState } from "react";

const MAX_BLOCKS = 23;

const chartData = [
  { day: "M", activity: 11 },
  { day: "T", activity: 15 },
  { day: "W", activity: 19 },
  { day: "T", activity: 16 },
  { day: "F", activity: 18 },
  { day: "S", activity: 23 },
  { day: "S", activity: 14 },
];

const chartConfig = {
  activity: {
    label: "Activity",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

function SegmentedBar(props: any) {
  const { x, y, width, height, value } = props;
  if (!height || !value) return null;
  const blockPitch = height / value;
  const blockH = blockPitch * 0.5;

  return (
    <g>
      {Array.from({ length: value as number }).map((_, i) => (
        <rect
          key={i}
          x={x}
          y={y + height - (i + 1) * blockPitch + blockPitch * 0.25}
          width={width}
          height={blockH}
          fill="var(--color-primary)"
          rx={1}
        />
      ))}
    </g>
  );
}

function useAnimatedNumber(target: number, duration = 450) {
  const [display, setDisplay] = useState(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const from = currentRef.current;
    const diff = target - from;
    if (diff === 0) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + diff * eased);
      currentRef.current = next;
      setDisplay(next);
      if (progress < 1) { rafRef.current = requestAnimationFrame(tick); }
      else { currentRef.current = target; setDisplay(target); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return display;
}

function AnimatedValue({ value }: { value: number }) {
  const animated = useAnimatedNumber(value);
  return <>{animated.toLocaleString()}</>;
}

type TooltipItem = { name?: string; value?: number; color?: string; dataKey?: string; type?: string };
type ConfigEntry = { label?: string; color?: string };

function AnimatedTooltipContent({ active, payload, label, hideLabel = false, config }: {
  active?: boolean; payload?: TooltipItem[]; label?: string;
  hideLabel?: boolean; config?: Record<string, ConfigEntry>;
}) {
  if (!active || !payload?.length) return null;
  const items = payload.filter((item) => item.type !== "none" && item.value !== undefined);
  if (!items.length) return null;
  return (
    <div className="grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      {!hideLabel && label && <div className="font-medium">{label}</div>}
      <div className="grid gap-1.5">
        {items.map((item, index) => (
          <div key={index} className="flex w-full items-center gap-2">
            <div className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground">{config?.[item.dataKey ?? ""]?.label ?? item.name}</span>
            <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
              <AnimatedValue value={item.value as number} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ChartBarActiveCode = () => {
  return (
    <ChartContainer config={chartConfig} className="h-50! max-w-60">
      <BarChart
        data={chartData}
        barSize={16}
        barCategoryGap="20%"
        margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
      >
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
        />
        <YAxis hide domain={[0, MAX_BLOCKS]} />
        <ChartTooltip
          cursor={false}
          content={<AnimatedTooltipContent hideLabel config={chartConfig} />}
        />
        <Bar
          dataKey="activity"
          shape={(props: any) => <SegmentedBar {...props} />}
          isAnimationActive
          animationBegin={0}
          animationDuration={700}
          animationEasing="ease-out"
        />
      </BarChart>
    </ChartContainer>
  );
};

export default ChartBarActiveCode;
