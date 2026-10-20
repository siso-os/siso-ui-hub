import { UsageMeter } from "@uiarc/usage-meter"
export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <UsageMeter label="Storage" unit="GB" limit={100} segments={[{ id: "a", label: "Photos", value: 38 }, { id: "b", label: "Docs", value: 21 }, { id: "c", label: "Mail", value: 12 }]} />
    </div>
  )
}
