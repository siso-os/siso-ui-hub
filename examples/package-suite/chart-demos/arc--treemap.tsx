// uihub: siso:package-workbench
import { SisoInteractiveTreemap as Treemap } from "@siso/charts"
const data = { id: "all", label: "Spend", children: [{ id: "a", label: "Cloud", children: [{ id: "a1", label: "Compute", value: 40, color: 0.1 }, { id: "a2", label: "Storage", value: 22, color: -0.05 }] }, { id: "b", label: "People", children: [{ id: "b1", label: "Eng", value: 60, color: 0.2 }, { id: "b2", label: "Ops", value: 24, color: -0.1 }] }, { id: "c", label: "Tools", value: 18, color: 0 }] }
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Treemap data={data} label="Spend by team" />
    </div>
  )
}
