import { Streamgraph } from "@uiarc/streamgraph"
import { series2 } from "./data"
const series = [{ key: "a", label: "Billing" }, { key: "b", label: "Access" }, { key: "c", label: "Bugs" }]
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Streamgraph data={series2(40)} series={series} label="Support tickets by topic" />
    </div>
  )
}
