"use client";

import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, type ChartConfig } from "../../../../shadcn/ui/chart";
import { useEffect, useRef, useState } from "react";

const chartData = [
  { date: "Mar 30", BTC: 12, ETH: 20 },
  { date: "Apr 1", BTC: 18, ETH: 25 },
  { date: "Apr 2", BTC: 14, ETH: 22 },
  { date: "Apr 4", BTC: 22, ETH: 30 },
  { date: "Apr 5", BTC: 16, ETH: 18 },
  { date: "Apr 7", BTC: 20, ETH: 24 },
  { date: "Apr 9", BTC: 18, ETH: 32 },
  { date: "Apr 11", BTC: 26, ETH: 22 },
  { date: "Apr 12", BTC: 20, ETH: 26 },
  { date: "Apr 14", BTC: 30, ETH: 20 },
  { date: "Apr 15", BTC: 22, ETH: 28 },
  { date: "Apr 17", BTC: 26, ETH: 22 },
  { date: "Apr 19", BTC: 28, ETH: 18 },
  { date: "Apr 20", BTC: 24, ETH: 24 },
  { date: "Apr 22", BTC: 38, ETH: 18 },
  { date: "Apr 23", BTC: 22, ETH: 26 },
  { date: "Apr 24", BTC: 20, ETH: 22 },
  { date: "Apr 26", BTC: 24, ETH: 20 },
  { date: "Apr 27", BTC: 18, ETH: 24 },
  { date: "Apr 29", BTC: 22, ETH: 20 },
  { date: "May 1", BTC: 20, ETH: 18 },
  { date: "May 4", BTC: 24, ETH: 22 },
];

const visibleLabels = new Set(["Mar 30", "Apr 4", "Apr 9", "Apr 14", "Apr 19", "Apr 24", "Apr 29", "May 4"]);

const chartConfig = {
    BTC: { label: "BTC", color: "var(--color-blue-500)" },
    ETH: { label: "ETH", color: "var(--color-border)" },
} satisfies ChartConfig;

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

const ChartLine01 = () => {

    return (
        <ChartContainer config={chartConfig} className="h-72 w-full max-w-2xl">
            <LineChart
                data={chartData}
                margin={{ top: 8, right: 4, bottom: 0, left: -10 }}
            >
                <CartesianGrid
                    vertical={false}
                    stroke="var(--border)"
                    strokeDasharray="4 4"
                />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    interval={0}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    tickFormatter={(v) => (visibleLabels.has(v) ? v : "")}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    ticks={[0, 10, 20, 30, 40]}
                    domain={[0, 40]}
                    tickFormatter={(v) => (v === 0 ? "0" : `${v}k`)}
                />
                <ChartTooltip
                    cursor={{
                        stroke: "var(--border)",
                        strokeWidth: 1,
                        strokeDasharray: "4 4",
                    }}
                    content={<AnimatedTooltipContent config={chartConfig} />}
                />
                <ReferenceLine
                    x="Apr 22"
                    stroke="var(--border)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                />
                {/* New User — solid primary */}
                <Line
                    dataKey="BTC"
                    type="linear"
                    stroke="var(--color-primary)"
                    strokeWidth={1.5}
                    dot={false}
                    activeDot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }}
                    isAnimationActive
                    animationBegin={0}
                    animationDuration={700}
                    animationEasing="ease-out"
                />
                <Line
                    dataKey="ETH"
                    type="linear"
                    stroke="color-mix(in srgb, var(--primary) 60%, transparent)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                    activeDot={{ r: 4, fill: "color-mix(in srgb, var(--primary) 60%, transparent)", strokeWidth: 0 }}
                    isAnimationActive
                    animationBegin={120}
                    animationDuration={700}
                    animationEasing="ease-out"
                />
                <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
        </ChartContainer>
    );
};

export default ChartLine01;
