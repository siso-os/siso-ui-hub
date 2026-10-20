// uihub: siso:package-workbench
// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { FilterToolbar, type FilterChip } from "@siso/blocks/source";

const fields = [
  { id: "status", label: "Status", options: ["Open", "Closed"] },
  { id: "owner", label: "Owner", options: ["Maya", "Leo"] },
];

export function IssueFilters() {
  const [filters, setFilters] = useState<FilterChip[]>([]);
  return (
    <FilterToolbar
      filters={filters}
      onRemove={id => setFilters(f => f.filter(x => x.id !== id))}
      onClearAll={() => setFilters([])}
      addFilter={{ fields, onAdd: chip => setFilters(f => [...f.filter(x => x.id !== chip.id), chip]) }}
    />
  );
}
