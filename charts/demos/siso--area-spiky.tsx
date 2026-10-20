import { SisoArea } from "@siso/charts"
import { monthly, shares, skills } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="h-80"><SisoArea data={monthly} keys={["desktop"]} xKey="month" palette="violet" curve="linear" fill="lines" dots formatX={(v) => v.slice(0, 3)} /></div>
    </div>
  )
}
