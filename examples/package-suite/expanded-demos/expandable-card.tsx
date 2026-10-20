// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { ExpandableCard } from "@siso/ui/blocks/source";

export function PlanDetails() {
  return (
    <ExpandableCard title="Pro plan" description="Billed yearly, renews March 4" width={400} expandedWidth={600}>
      <ul>
        <li>Unlimited projects</li>
        <li>Priority support</li>
      </ul>
    </ExpandableCard>
  );
}
