import { ChartKpi } from "@tweenly/chart-kpi"
import { monthly, shares, skills, heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ChartKpi title="Revenue" data={monthly} index="month" valueKey="desktop" sparkline="area" />
    </div>
  )
}
