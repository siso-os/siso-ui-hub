import { ChartDots } from "@tweenly/chart-dots"
import { monthly, shares, skills, heat } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ChartDots title="Seats used" value={37} total={50} />
    </div>
  )
}
