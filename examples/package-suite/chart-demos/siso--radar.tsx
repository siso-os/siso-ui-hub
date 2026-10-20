// uihub: siso:package-workbench
import { SisoRadar } from "@siso/charts"
import { monthly, shares, skills } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="h-80"><SisoRadar data={skills} keys={["a", "b"]} xKey="skill" palette="violet" /></div>
    </div>
  )
}
