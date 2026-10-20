import { ChartHeatmap } from "@tweenly/chart-heatmap"
import { monthly, shares, skills, heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ChartHeatmap title="Contributions" data={heat} dateKey="date" valueKey="count" />
    </div>
  )
}
