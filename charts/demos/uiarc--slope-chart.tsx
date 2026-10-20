import { SlopeChart } from "@uiarc/slope-chart"
const data = [{ key: "a", label: "Chrome", start: 52, end: 48 }, { key: "b", label: "Safari", start: 20, end: 27 }, { key: "c", label: "Firefox", start: 14, end: 11 }, { key: "d", label: "Edge", start: 9, end: 10 }]
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <SlopeChart data={data} label="Browser share" startLabel="2025" endLabel="2026" />
    </div>
  )
}
