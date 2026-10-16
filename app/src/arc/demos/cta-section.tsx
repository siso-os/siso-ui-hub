// From Arc's docs page (Usage), imports pointed at the copied source
import { CtaSection } from "../blocks/cta-section/cta-section";

export function Closing() {
  return (
    <CtaSection
      variant="split"
      title="Your team, set up before lunch"
      primaryAction={{ label: "Create a workspace", href: "/signup" }}
      secondaryAction={{ label: "Book a demo", href: "/demo" }}
      points={["Import from any tracker", "SSO included", "Cancel anytime"]}
    />
  );
}
