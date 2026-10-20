import { Sparkline } from "@uiarc/sparkline"
import { days } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Sparkline data={days(24).map((d) => d.v)} label="Revenue" value="$4.2k" change="+12%" tone="success" area />
    </div>
  )
}
