import { ChartLine } from "@tweenly/chart-line"
import { monthly, shares, skills, heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ChartLine title="Visitors" data={monthly} index="month" series={[{ key: "desktop", label: "Desktop" }, { key: "mobile", label: "Mobile" }]} fill="gradient" />
    </div>
  )
}
