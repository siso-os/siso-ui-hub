// uihub: siso:charts
// Seeded placeholder data for HALO H6; not live business data.
import { SisoTrendCard } from "@siso/charts"

let seed = 67
const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
const data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
  const previous = Math.round(650 + random() * 300 + i * 35)
  return { day, previous, current: Math.round(previous * (1.08 + random() * 0.25)) }
})
const current = data.reduce((sum, row) => sum + row.current, 0)
const previous = data.reduce((sum, row) => sum + row.previous, 0)
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-sm p-4">
      <SisoTrendCard title="Earnings this week" value={money.format(current)}
        delta={`+${((current / previous - 1) * 100).toFixed(1)}%`} tone="up"
        baseline={`${money.format(previous)} last week · sample data`} data={data} valueFormat={(value) => money.format(value)} />
    </div>
  )
}
