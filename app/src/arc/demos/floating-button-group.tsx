// Hand-wired: Arc's docs example plus the state and sample data it references
import { useEffect, useState } from "react";
import { Link2, MessageCircle, Play, Redo2, Undo2 } from "lucide-react";
import { FloatingButtonGroup } from "../floating-button-group/floating-button-group";

const OPERATIONS = ["Drew a frame", "Added a sticky note", "Moved the hero shape", "Renamed a layer"];

export default function FloatingButtonGroupDemo() {
  const [applied, setApplied] = useState(OPERATIONS.length);
  const [copied, setCopied] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  const history = {
    canUndo: applied > 0,
    canRedo: applied < OPERATIONS.length,
    undo: () => {
      console.info("Undo");
      setApplied((count) => Math.max(0, count - 1));
    },
    redo: () => {
      console.info("Redo");
      setApplied((count) => Math.min(OPERATIONS.length, count + 1));
    },
  };

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyLink() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.info("Copied the board link");
    setCopied(true);
  }

  async function onPresent() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.info(presenting ? "Left present mode" : "Entered present mode");
    setPresenting((on) => !on);
  }

  function track(area: string, id: string) {
    console.info("Tracked the toolbar action", id, "in", area);
    setLast(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ width: 260, padding: 14, borderRadius: 14, border: "1px solid var(--border)", background: "var(--surface)" }}>
        <p style={{ margin: 0, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>Board</p>
        <ul style={{ display: "flex", flexDirection: "column", gap: 4, margin: "8px 0 0", padding: 0, listStyle: "none", fontSize: 12 }}>
          {OPERATIONS.slice(0, applied).map((operation) => (
            <li key={operation}>{operation}</li>
          ))}
        </ul>
        {applied === 0 && <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>Nothing on the board</p>}
      </div>
      <FloatingButtonGroup
        label="Board actions"
        variant="floating"
        items={[
          { id: "undo", label: "Undo", icon: <Undo2 />, iconOnly: true, shortcut: "⌘Z", disabled: !history.canUndo, onSelect: history.undo },
          { id: "redo", label: "Redo", icon: <Redo2 />, iconOnly: true, shortcut: "⇧⌘Z", disabled: !history.canRedo, onSelect: history.redo },
          { type: "separator" },
          { id: "comment", label: "Comment", icon: <MessageCircle />, shortcut: "C" },
          { id: "share", label: copied ? "Copied" : "Share", reserveLabels: ["Share", "Copied"], icon: <Link2 />, onSelect: copyLink },
          { type: "separator" },
          { id: "present", label: presenting ? "Stop" : "Present", reserveLabels: ["Present", "Stop"], icon: <Play />, pressed: presenting, onSelect: onPresent },
        ]}
        onAction={(id) => track("toolbar", id)}
      />
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>
        {presenting ? "Presenting" : "Editing"} · {applied} of {OPERATIONS.length} operations{last ? ` · last action ${last}` : ""}
      </p>
    </div>
  );
}
