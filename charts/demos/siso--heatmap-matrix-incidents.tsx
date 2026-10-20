// Placeholder: service names, days and severity scores are seeded synthetic examples, not HALO incident data.
// uihub: siso:charts
import { SisoMatrixHeatmap } from "@siso/charts"

const rows = ["Streaming", "Chat", "Payments", "Authentication", "Media upload"]
const cols = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const values = (() => {
  let seed = 808
  return rows.map(() => cols.map(() => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed % 11
  }))
})()

export default function Demo() {
  return <div className="mx-auto w-full max-w-3xl p-4">
    <SisoMatrixHeatmap rows={rows} cols={cols} values={values} tone="red" caption="Incidents by service and day · demo severity scores (0–10)" valueLabel="Severity score" />
  </div>
}
