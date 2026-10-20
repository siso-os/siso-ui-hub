import { ChartBar } from "@tweenly/chart-bar"
import { monthly, shares, skills, heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ChartBar title="Visits" data={monthly.slice(0, 8)} index="month" series={[{ key: "desktop", label: "Desktop" }, { key: "mobile", label: "Mobile" }]} />
    </div>
  )
}
