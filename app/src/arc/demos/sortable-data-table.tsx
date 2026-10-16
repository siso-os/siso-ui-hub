// From Arc's docs page (Usage), imports pointed at the copied source
import { SortableDataTable } from "../sortable-data-table/sortable-data-table";

const projects = [
  { id: "p1", name: "Harbour", owner: "Maya", budget: 42000 },
  { id: "p2", name: "Atlas", owner: "Leo", budget: 18500 },
];

export function Projects() {
  return (
    <SortableDataTable
      rows={projects}
      rowKey="id"
      caption="Projects"
      columns={[{ key: "name", label: "Name" }, { key: "owner", label: "Owner" }, { key: "budget", label: "Budget" }]}
      defaultSort={{ key: "name", direction: "asc" }}
      selectable
      itemName={{ one: "project", other: "projects" }}
    />
  );
}
