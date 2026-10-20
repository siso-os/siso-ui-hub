// uihub: siso:charts
// Seeded placeholder data for the range-area demo; not live business data.
import { SisoRangeArea } from "@siso/charts"

let seed = 41
const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
const data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month, i) => {
  const low = Math.round(80 + i * 9 + random() * 25)
  const high = low + Math.round(45 + random() * 30)
  return { month, low, high, value: Math.round(low + (high - low) * (0.25 + random() * 0.5)) }
})

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <SisoRangeArea data={data} title="Monthly earnings outlook" description="Sample forecast · hover for low, high and spread" midLabel="Mid estimate" />
    </div>
  )
}
