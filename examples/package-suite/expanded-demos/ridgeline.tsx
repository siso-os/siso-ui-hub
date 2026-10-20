// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { Ridgeline } from "@siso/ui/charts/source";

/** 60 request timings per region, each around its own median with a slow wave and an occasional slow outlier. */
const regions = [
  { id: "iad", label: "us-east (IAD)", median: 42 },
  { id: "sfo", label: "us-west (SFO)", median: 58 },
  { id: "fra", label: "eu-central (FRA)", median: 71 },
  { id: "sin", label: "ap-southeast (SIN)", median: 96 },
  { id: "gru", label: "sa-east (GRU)", median: 128 },
].map(({ id, label, median }) => ({
  id,
  label,
  values: Array.from({ length: 60 }, (_, index) => Math.round(
    median + Math.sin(index * 1.7 + median) * 18 + Math.sin(index * 0.31) * 12 + (index % 11 === 0 ? 34 : 0),
  )),
}));

export default function RidgelineDemo() {
  return <Ridgeline series={regions} label="API latency by region" unit=" ms" />;
}
