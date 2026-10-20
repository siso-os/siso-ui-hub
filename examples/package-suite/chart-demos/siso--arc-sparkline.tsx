// uihub: siso:package-workbench
import { ArcSparkline } from "@siso/charts"
import { days } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ArcSparkline data={days(24).map((d) => d.v)} label="Revenue" value="$4.2k" change="+12%" tone="success" area />
    </div>
  )
}
