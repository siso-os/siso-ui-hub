import { ChartRings } from "@tweenly/chart-rings"
import { monthly, shares, skills, heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ChartRings title="Goals" data={[{ name: "Move", value: 72, max: 100 }, { name: "Exercise", value: 40, max: 60 }, { name: "Stand", value: 9, max: 12 }]} nameKey="name" valueKey="value" maxKey="max" />
    </div>
  )
}
