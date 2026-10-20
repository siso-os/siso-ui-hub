// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { ExpandingSearch } from "@siso/atoms/source";
import type { ExpandingSearchItem } from "@siso/atoms/source";

const ITEMS: ExpandingSearchItem[] = [
  { id: "p1", title: "Arc website", group: "Projects", meta: "Updated today" },
  { id: "p2", title: "Operator console", group: "Projects", meta: "Updated Monday" },
  { id: "p3", title: "Northwind CRM", group: "Projects", meta: "Updated 2 Oct" },
  { id: "d1", title: "Motion tokens", group: "Docs", keywords: ["spring", "duration"] },
  { id: "d2", title: "Foundation colours", group: "Docs", keywords: ["accent", "palette"] },
  { id: "d3", title: "Spring settings", group: "Docs", keywords: ["motion", "bounce"] },
];

export default function ExpandingSearchDemo() {
  const [opened, setOpened] = useState<string | null>(null);

  async function push(item: ExpandingSearchItem) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.info("Navigating to", `/items/${item.id}`);
    setOpened(item.title);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, width: "100%", maxWidth: 460 }}>
      <ExpandingSearch label="Search projects and docs" items={ITEMS} onSelect={(item) => push(item)} />
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>
        {opened ? `Opened ${opened}` : `${ITEMS.length} items indexed`}
      </p>
    </div>
  );
}

// uihub: siso:package-workbench
