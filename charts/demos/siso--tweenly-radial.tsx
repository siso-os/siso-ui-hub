import { SisoGoalRing } from "@siso/charts"
export default function Demo() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center p-6">
      <SisoGoalRing value={1240} goal={2000} />
    </div>
  )
}
