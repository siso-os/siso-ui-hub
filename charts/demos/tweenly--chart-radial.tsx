import { ChartRadial } from "@tweenly/chart-radial"
import { monthly, shares, skills, heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ChartRadial title="Browsers" data={shares} nameKey="name" valueKey="value" />
    </div>
  )
}
