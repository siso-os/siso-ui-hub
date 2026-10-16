// From Arc's docs page (Usage), imports pointed at the copied source
import { AnnouncementBar } from "../announcement-bar/announcement-bar";

export function SiteBanner() {
  return (
    <AnnouncementBar
      id="fall-sale-2026"
      tone="inverted"
      messages={[
        { id: "sale", message: "Fall sale: 30% off annual plans.", countdown: { to: "2026-10-01T00:00:00Z", label: "Ends in" }, action: { label: "See plans", href: "/pricing" } },
        { id: "launch", message: "Workflows are now in beta.", action: { label: "Read more", href: "/blog/workflows" } },
      ]}
    />
  );
}
