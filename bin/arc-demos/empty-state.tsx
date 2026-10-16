// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { Search } from "lucide-react";
import { Button } from "../button/button";
import { EmptyState } from "../empty-state/empty-state";

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
