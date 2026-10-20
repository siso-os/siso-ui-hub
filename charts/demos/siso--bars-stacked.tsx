import { SisoBars } from "@siso/charts"
import { monthly, shares, skills } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="h-80"><SisoBars data={monthly} keys={["desktop", "mobile", "tablet"]} xKey="month" palette="ocean" stack="stacked" fill="duotone" slim formatX={(v) => v.slice(0, 3)} /></div>
    </div>
  )
}
