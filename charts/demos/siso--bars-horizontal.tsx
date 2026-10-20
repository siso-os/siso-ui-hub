import { SisoBars } from "@siso/charts"
import { monthly, shares, skills } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="h-80"><SisoBars data={monthly.slice(0, 6)} keys={["desktop"]} xKey="month" palette="sunset" horizontal fill="gradient" formatX={(v) => v.slice(0, 3)} /></div>
    </div>
  )
}
