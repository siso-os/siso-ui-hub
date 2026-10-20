// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { HoverCard, HoverCardProfile } from "@siso/blocks/source";

export function Mention() {
  return (
    <HoverCard
      content={<HoverCardProfile name="Maya Chen" role="Product designer, Payments" stats={[{ label: "Projects", value: 12 }]} />}
    >
      <button type="button">@maya</button>
    </HoverCard>
  );
}
