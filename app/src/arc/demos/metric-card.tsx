// From Arc's docs page (Usage), imports pointed at the copied source
import { MetricCard } from "../metric-card/metric-card";

export function Uptime() {
  return <MetricCard label="Uptime" value={99.9} suffix="%" context="Last 30 days" change="+0.2%" />;
}
