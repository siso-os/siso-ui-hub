// uihub: siso:package-workbench
import { ArcHeatmap } from "@siso/charts"
import { heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ArcHeatmap days={heat} label="Contributions" period="Past year" />
    </div>
  )
}
