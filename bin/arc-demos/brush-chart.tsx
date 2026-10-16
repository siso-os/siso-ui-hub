// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { BrushChart } from "../brush-chart/brush-chart";

const DAY = 86_400_000;

/** A year of daily active users from 2025-10-01: a weekly cycle over a slow climb, with one dip over the holidays. */
const days = Array.from({ length: 365 }, (_, index) => ({
  date: Date.UTC(2025, 9, 1) + index * DAY,
  value: Math.round(4_200 + index * 4 + Math.sin(index / 21) * 900 + Math.sin((index / 7) * Math.PI * 2) * 260 - (index > 92 && index < 102 ? 1_500 : 0)),
}));

export default function BrushChartDemo() {
  const [range, setRange] = useState<[number, number]>([days[days.length - 90]!.date, days[days.length - 1]!.date]);
  return (
    <BrushChart
      data={days}
      label="Daily active users"
      unit="users"
      range={range}
      onRangeChange={next => {
        console.info("Window", new Date(next[0]).toISOString().slice(0, 10), "to", new Date(next[1]).toISOString().slice(0, 10));
        setRange(next);
      }}
      annotations={[{ date: Date.UTC(2026, 2, 24), label: "v2", description: "Offline mode and shared spaces" }]}
    />
  );
}
