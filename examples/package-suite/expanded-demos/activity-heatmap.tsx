// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { ActivityHeatmap } from "@siso/ui/charts/source";

const DAY = 86_400_000;

/** Every day of 2026, oldest first: a weekday rhythm, a slow seasonal swell, and a quiet fortnight in the summer. */
function contributions2026(): { date: string; count: number }[] {
  const start = Date.UTC(2026, 0, 1);
  return Array.from({ length: 365 }, (_, index) => {
    const date = new Date(start + index * DAY).toISOString().slice(0, 10);
    const weekday = (index + 4) % 7; // 2026-01-01 is a Thursday
    const season = 0.55 + 0.45 * Math.sin((index / 365) * Math.PI * 2 - 1.1);
    const rhythm = weekday === 0 || weekday === 6 ? 0.15 : weekday === 2 || weekday === 3 ? 1 : 0.6;
    const quiet = index > 140 && index < 168 ? 0.1 : 1;
    return { date, count: Math.round(24 * season * rhythm * quiet * (0.6 + 0.4 * (Math.sin(index / 2.7) * 0.5 + 0.5))) };
  });
}

const CONTRIBUTIONS = contributions2026();

export default function ActivityHeatmapDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <ActivityHeatmap
      days={CONTRIBUTIONS}
      label="Contributions in 2026"
      period="2026"
      selectedDate={selected}
      onSelectDate={date => { console.info("Selected day", date); setSelected(date); }}
    />
  );
}
