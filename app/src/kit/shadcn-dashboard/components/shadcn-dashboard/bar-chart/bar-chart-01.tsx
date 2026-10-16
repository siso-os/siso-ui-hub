"use client";

import { ChartContainer, ChartTooltip, type ChartConfig } from "../../../../shadcn/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useEffect, useRef, useState } from "react";

const chartData = [
  { date: "Jan 1", teamA: 7500, teamB: 4700, teamC: 4700 },
  { date: "Jan 4", teamA: 7500, teamB: 4300, teamC: 4300 },
  { date: "Jan 6", teamA: 9200, teamB: 5500, teamC: 5500 },
  { date: "Jan 8", teamA: 8300, teamB: 5000, teamC: 5000 },
  { date: "Jan 12", teamA: 10200, teamB: 6300, teamC: 6300 },
  { date: "Jan 16", teamA: 7100, teamB: 4300, teamC: 4300 },
  { date: "Jan 20", teamA: 8700, teamB: 5400, teamC: 5400 },
  { date: "Jan 24", teamA: 11000, teamB: 6800, teamC: 6800 },
  { date: "Jan 28", teamA: 10300, teamB: 6200, teamC: 6200 },
  { date: "Feb 1", teamA: 9000, teamB: 5500, teamC: 5500 },
  { date: "Feb 5", teamA: 10200, teamB: 6700, teamC: 5500 },
  { date: "Feb 8", teamA: 12000, teamB: 8000, teamC: 6300 }, ,
]

type BarShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
};

const chartConfig = {
  teamA: { label: "Team A", color: "var(--primary)" },
  teamB: { label: "Team B", color: "color-mix(in srgb, var(--primary) 60%, transparent)" },
  teamC: { label: "Team C", color: "color-mix(in srgb, var(--primary) 20%, transparent)" },
} satisfies ChartConfig;

function SegmentBar({ x = 0, y = 0, width = 0, height = 0, fill }: BarShapeProps) {
  if (height <= 0) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      <rect x={x} y={y} width={width} height={1} fill="hsl(var(--background))" />
    </g>
  );
}

function TopSegmentBar({ x = 0, y = 0, width = 0, height = 0, fill }: BarShapeProps) {
  if (height <= 0) return null;
  const r = 1;
  return (
    <g>
      <path
        d={`M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} L${x},${y + height} Z`}
        fill={fill}
      />
      <rect x={x} y={y} width={width} height={1} fill="#0A0A0A80" />
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
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentRef.current = target;
        setDisplay(target);
      }
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

type TooltipPayloadItem = {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string;
  type?: string;
};

function AnimatedTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="grid min-w-36 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium">{label}</div>
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none" && item.value !== undefined)
          .map((item, index) => (
            <div key={index} className="flex w-full items-center gap-2">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">
                {item.name}
              </span>
              <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
                <AnimatedValue value={item.value as number} />
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}


export default function ChartBarDefaultCode() {
  const Countries = [
    {
      id: 1,
      title: "Earning",
      color: "bg-sky-400/50",
    },
    {
      id: 2,
      title: "Profit",
      color: "bg-sky-400",
    },
    {
      id: 3,
      title: "Expense",
      color: "bg-blue-500",
    }
  ];

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 4, right: 0, left: -2, bottom: 0 }}
        barCategoryGap="32%"
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
          tickMargin={8}
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          interval={0}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          domain={[0, 30000]}
          ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000]}
          tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
          width={35}
        />
        <ChartTooltip
          cursor={false}
          content={<AnimatedTooltipContent />}
        />
        <Bar dataKey="teamA" barSize={25} stackId="s" fill="var(--color-teamA)" shape={<SegmentBar />} isAnimationActive animationBegin={0} animationDuration={700} animationEasing="ease-out" />
        <Bar dataKey="teamB" barSize={25} stackId="s" fill="var(--color-teamB)" shape={<SegmentBar />} isAnimationActive animationBegin={120} animationDuration={700} animationEasing="ease-out" />
        <Bar dataKey="teamC" barSize={25} stackId="s" fill="var(--color-teamC)" shape={<TopSegmentBar />} isAnimationActive animationBegin={240} animationDuration={700} animationEasing="ease-out" />
      </BarChart>
    </ChartContainer>
  );
}
