// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { StatsBand } from "@siso/ui/blocks/source";

export function Numbers() {
  return (
    <StatsBand
      layout="divided"
      stats={[
        {
          value: 2_334_000, notation: "compact", decimals: 1, label: "Deploys in the last 12 months",
          detail: "Across 12,400 teams", context: "Up from 1.4M the year before",
          visual: { kind: "trend", values: [141, 148, 139, 162, 171, 184, 196, 203, 221, 238, 257, 274] },
        },
        { value: 38, suffix: "ms", label: "Median response time", detail: "At the edge, worldwide" },
        { value: 35, label: "Edge regions on six continents", visual: { kind: "map", points: [[-122.4, 37.8], [-0.1, 51.5], [139.7, 35.7]] } },
      ]}
    />
  );
}
