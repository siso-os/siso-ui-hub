// From Arc's docs page (Usage), imports pointed at the copied source
import { ComparisonTable } from "../blocks/comparison-table/comparison-table";

export function Alternatives() {
  return (
    <ComparisonTable
      columns={[
        { id: "us", name: "Relay", caption: "$10 per seat", highlight: true },
        { id: "them", name: "Legacy suite", caption: "$24 per seat" },
      ]}
      sections={[{ id: "core", title: "Core", rows: [
        { id: "offline", feature: "Offline mode", values: { us: true, them: false } },
        { id: "sso", feature: "SSO", values: { us: true, them: { value: "partial", note: "Enterprise plan" } } },
      ] }]}
      cta={{ label: "Start free trial", href: "/signup" }}
      stickyTop={64}
    />
  );
}
