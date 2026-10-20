// uihub: siso:package-workbench
import { SisoLine } from "@siso/charts"
import { monthly, shares, skills } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="h-80"><SisoLine data={monthly} keys={["desktop", "mobile"]} xKey="month" palette="aurora" curve="step" stroke="dashed" formatX={(v) => v.slice(0, 3)} /></div>
    </div>
  )
}
