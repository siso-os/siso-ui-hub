import { BrushChart } from "@uiarc/brush-chart"
import { days } from "./data"
const data = days(120).map((d) => ({ date: new Date(d.iso), value: d.v }))
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <BrushChart data={data} label="Daily signups" />
    </div>
  )
}
