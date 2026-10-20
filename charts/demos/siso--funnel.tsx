// Seeded placeholder data for the conversion funnel demo.
// uihub: siso:charts
import { SisoFunnel } from "@siso/charts"

const stages = [
  { name: "Visitors", value: 12000 },
  { name: "Product views", value: 7800 },
  { name: "Added to cart", value: 3120 },
  { name: "Checkout", value: 1872 },
  { name: "Purchased", value: 1248 },
]

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <h3 className="mb-4 text-sm font-medium">Conversion funnel</h3>
      <SisoFunnel stages={stages} palette={["#818cf8", "#38bdf8", "#2dd4bf", "#a3e635", "#fbbf24"]} />
    </div>
  )
}
