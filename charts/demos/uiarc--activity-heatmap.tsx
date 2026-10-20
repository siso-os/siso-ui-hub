import { ActivityHeatmap } from "@uiarc/activity-heatmap"
import { heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ActivityHeatmap days={heat} label="Contributions" period="Past year" />
    </div>
  )
}
