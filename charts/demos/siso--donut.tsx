import { SisoDonut } from "@siso/charts"
import { monthly, shares, skills } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="h-80"><SisoDonut data={shares} nameKey="name" valueKey="value" palette="aurora" /></div>
    </div>
  )
}
