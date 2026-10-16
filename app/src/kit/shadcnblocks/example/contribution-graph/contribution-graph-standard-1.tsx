"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";

export const title = "Full-year contribution graph";

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/** Deterministic PRNG so the graph stays stable across SSR/hydration. */
const mulberry32 = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const levelFromNoise = (n: number): 0 | 1 | 2 | 3 | 4 => {
  if (n < 0.42) return 0;
  if (n < 0.64) return 1;
  if (n < 0.82) return 2;
  if (n < 0.93) return 3;
  return 4;
};

const DAYS = 365;

const buildData = () => {
  const rand = mulberry32(0x2026_cafe);
  const data: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
  let streakLeft = 0;
  let streakLevel: 0 | 1 | 2 | 3 | 4 = 0;

  for (let i = 0; i < DAYS; i++) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (DAYS - 1 - i));

    if (streakLeft === 0 && rand() < 0.1) {
      streakLeft = 2 + Math.floor(rand() * 4);
      streakLevel = (2 + Math.floor(rand() * 3)) as 2 | 3 | 4;
    }

    let level = levelFromNoise(rand());
    if (streakLeft > 0) {
      level = Math.max(level, streakLevel) as 0 | 1 | 2 | 3 | 4;
      streakLeft -= 1;
    }
    if (rand() < 0.1) level = 0;

    data.push({
      date: formatDate(date),
      count: level === 0 ? 0 : level + Math.floor(rand() * 4),
      level,
    });
  }

  return data;
};

const data = buildData();

const Example = () => (
  <ContributionGraph
    blockMargin={3}
    blockSize={11}
    className="w-full max-w-5xl"
    data={data}
    labels={{ totalCount: "{{count}} contributions in the last year" }}
  >
    <ContributionGraphCalendar>
      {({ activity, dayIndex, weekIndex }) => (
        <ContributionGraphBlock
          activity={activity}
          dayIndex={dayIndex}
          weekIndex={weekIndex}
        />
      )}
    </ContributionGraphCalendar>
    <ContributionGraphFooter>
      <ContributionGraphTotalCount />
    </ContributionGraphFooter>
  </ContributionGraph>
);

export default Example;
