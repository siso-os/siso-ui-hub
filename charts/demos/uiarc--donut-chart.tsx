import { DonutChart } from "@uiarc/donut-chart"
import { shares } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <DonutChart data={shares.map((s) => ({ key: s.name, label: s.name, value: s.value }))} label="Browsers" />
    </div>
  )
}
