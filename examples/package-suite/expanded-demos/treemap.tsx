// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { Treemap } from "@siso/ui/charts/source";

const data = {
  id: "all", label: "All regions",
  children: [
    { id: "na", label: "North America", children: [{ id: "us", label: "United States", value: 18400, color: 24 }, { id: "ca", label: "Canada", value: 2350, color: 19 }] },
    { id: "eu", label: "Europe", children: [{ id: "de", label: "Germany", value: 4120, color: 28 }] },
  ],
};

export function Revenue() {
  return <Treemap data={data} label="ARR" colorLabel="Growth" formatColor={value => `+${value}%`} />;
}
