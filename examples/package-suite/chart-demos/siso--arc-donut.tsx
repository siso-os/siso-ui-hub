// uihub: siso:package-workbench
import { ArcDonut } from "@siso/charts"
import { shares } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <ArcDonut data={shares.map((s) => ({ key: s.name, label: s.name, value: s.value }))} label="Browsers" />
    </div>
  )
}
