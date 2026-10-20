// uihub: siso:package-workbench
// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { Search } from "lucide-react";
import { Button } from "@siso/blocks/source";
import { EmptyState } from "@siso/blocks/source";

export function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <EmptyState
      icon={<Search size={24} />}
      title="No matches"
      description="Try a shorter search or clear the filters."
      action={<Button variant="secondary" onClick={onClear}>Clear filters</Button>}
    />
  );
}

export default function EmptyStateDemo() {
  return <NoResults onClear={() => console.info("empty-state: clear filters")} />;
}
