// uihub: siso:package-workbench
import { SisoInteractiveWaffle as WaffleChart } from "@siso/charts"
import { shares } from "./data"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <WaffleChart data={shares.map((s) => ({ key: s.name, label: s.name, value: s.value }))} label="Share of traffic" />
    </div>
  )
}
