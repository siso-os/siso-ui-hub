// Placeholder: tip totals in USD are seeded synthetic examples by weekday and three-hour block, not HALO revenue.
// uihub: siso:charts
import { SisoMatrixHeatmap } from "@siso/charts"

const rows = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const cols = ["00–03", "03–06", "06–09", "09–12", "12–15", "15–18", "18–21", "21–24"]
const values = (() => {
  let seed = 707
  return rows.map((_, day) => cols.map((_, block) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return Math.round((seed % 90) * (block >= 6 ? 3 : 1) * (day >= 4 ? 1.5 : 1))
  }))
})()

export default function Demo() {
  return <div className="mx-auto w-full max-w-3xl p-4">
    <SisoMatrixHeatmap rows={rows} cols={cols} values={values} tone="amber" caption="Tips by weekday and three-hour block · demo totals (USD)" valueLabel="Tips (USD)" />
  </div>
}
