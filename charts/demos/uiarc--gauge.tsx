import { Gauge } from "@uiarc/gauge"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Gauge value={72} label="Health score" detail="Last scan" />
    </div>
  )
}
