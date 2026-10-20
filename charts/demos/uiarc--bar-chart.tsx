import { BarChart } from "@uiarc/bar-chart"
import { days } from "./data"
const data = days(14).map((d) => ({ key: d.iso, label: d.label, axisLabel: d.short, value: d.v }))
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <BarChart data={data} label="Sessions" period="Last 14 days" unit="sessions" />
    </div>
  )
}
