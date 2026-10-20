// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu } from "@siso/ui/blocks/source";

const SAMPLE_COPIES = ["Homepage v2", "Homepage v2 (copy)", "Homepage v2 (copy 2)"];

export default function DropdownMenuDemo() {
  const [name, setName] = useState("Arc marketing site");
  const [copies, setCopies] = useState<string[]>([]);
  const [removed, setRemoved] = useState(false);

  async function rename() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const next = name === "Arc marketing site" ? "Homepage redesign" : "Arc marketing site";
    console.info("Renamed the project to", next);
    setName(next);
  }

  async function duplicate() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const copy = SAMPLE_COPIES[Math.min(copies.length, SAMPLE_COPIES.length - 1)];
    console.info("Duplicated the project as", copy);
    setCopies((prev) => [...prev, copy]);
  }

  function remove() {
    console.info("Deleted the project", name);
    setRemoved(true);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        width: "100%",
        maxWidth: 480,
        padding: 14,
        borderRadius: 14,
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{removed ? "Project deleted" : name}</span>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          {removed ? "Rename and Duplicate still work" : `Pro · ${1 + copies.length} board${copies.length ? "s" : ""}`}
        </span>
      </div>
      <DropdownMenu
        label="Actions"
        items={[
          { label: "Rename", icon: <Pencil size={15} />, onSelect: rename },
          { label: "Duplicate", icon: <Copy size={15} />, onSelect: duplicate },
          { label: "Delete", icon: <Trash2 size={15} />, onSelect: remove, destructive: true, separatorBefore: true },
        ]}
      />
    </div>
  );
}
