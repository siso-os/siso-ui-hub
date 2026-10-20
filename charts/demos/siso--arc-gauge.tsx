import { ArcGauge } from "@siso/charts"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ArcGauge value={72} label="Health score" detail="Last scan" />
    </div>
  )
}
