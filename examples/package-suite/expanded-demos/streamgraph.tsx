// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { Streamgraph } from "@siso/ui/charts/source";

const DAY = 86_400_000;

const series = [
  { key: "bugs", label: "Bugs" },
  { key: "billing", label: "Billing" },
  { key: "onboarding", label: "Onboarding" },
];

/** The 26 weeks of 2026 from Monday 5 January, with one ticket count per topic. */
const weeks = Array.from({ length: 26 }, (_, index) => {
  const start = new Date(Date.UTC(2026, 0, 5) + index * 7 * DAY);
  const tickets: Record<string, number> = {};
  series.forEach((topic, position) => {
    const base = position === 0 ? 46 : position === 1 ? 30 : 22;
    tickets[topic.key] = Math.max(0, Math.round(base + Math.sin((index + position * 4) / 3.3) * 14 + Math.sin(index / 1.4) * 6));
  });
  return {
    iso: `2026-W${String(index + 1).padStart(2, "0")}`,
    name: start.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
    month: start.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" }),
    monthStart: start.getUTCDate() <= 7,
    tickets,
  };
});

const data = weeks.map(week => ({
  key: week.iso,
  label: `Week of ${week.name}`,
  axisLabel: week.monthStart ? week.month : undefined,
  values: week.tickets,
}));

export default function StreamgraphDemo() {
  return <Streamgraph data={data} series={series} label="Support tickets by topic" unit="tickets" categoryLabel="Week" />;
}
