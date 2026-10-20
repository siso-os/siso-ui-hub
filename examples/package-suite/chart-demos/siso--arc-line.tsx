// uihub: siso:package-workbench
import { ArcLine } from "@siso/charts"
import { series2 } from "./data"
const data = series2(30).map((d) => ({ ...d, values: { a: d.values.a, b: d.values.b } }))
const series = [{ key: "a", label: "This month", area: true }, { key: "b", label: "Last month", dashed: true }]
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ArcLine data={data} series={series} label="Visitors" />
    </div>
  )
}
