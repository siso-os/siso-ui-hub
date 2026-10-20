import { ChartRadar } from "@tweenly/chart-radar"
import { monthly, shares, skills, heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ChartRadar title="Team skills" data={skills} index="skill" series={[{ key: "a", label: "Now" }, { key: "b", label: "Goal" }]} />
    </div>
  )
}
