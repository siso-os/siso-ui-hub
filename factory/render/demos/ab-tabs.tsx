/* @css ab:packages/siso-tokens/siso.css ab:packages/siso-shell/shell.css */
// Agent Base's PillTabs (@siso/shell): pages he opened stay up top; first two pinned.
import { useState } from "react";
import { PillTabs } from "@siso/shell";

const START = [
  { id: "home", label: "★ Projects", meta: "5" },
  { id: "ui", label: "★ UI core", meta: "1,710" },
  { id: "ab", label: "agent-base", meta: "173" },
  { id: "speak", label: "SpeakToggle" },
  { id: "ind", label: "Industries", meta: "26 packs" },
];
export default function Demo() {
  const [tabs, setTabs] = useState(START);
  const [active, setActive] = useState("ab");
  return (
    <div style={{ padding: 16 }}>
      <PillTabs tabs={tabs} activeId={active} onActivate={setActive} onClose={(id) => setTabs(tabs.filter((t) => t.id !== id))} />
    </div>
  );
}
