// uihub: siso:package-workbench
import { SisoArea } from "@siso/charts"
import { monthly, shares, skills } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="h-80"><SisoArea data={monthly} keys={["desktop", "mobile"]} xKey="month" palette="rainbow" curve="natural" stack="stacked" formatX={(v) => v.slice(0, 3)} /></div>
    </div>
  )
}
