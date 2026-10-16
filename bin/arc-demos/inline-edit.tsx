// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { InlineEdit } from "../inline-edit/inline-edit";

export default function InlineEditDemo() {
  const [project, setProject] = useState({ id: "p-arc", name: "Arc website" });

  async function renameProject(id: string, next: string) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.info(`Renamed ${id} to "${next}"`);
    setProject((current) => ({ ...current, name: next }));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%", maxWidth: 420 }}>
      <InlineEdit
        as="h1"
        label="Project name"
        value={project.name}
        validate={(next) => (next.trim() ? null : "Name can’t be empty")}
        onSave={(next) => renameProject(project.id, next)}
      />
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>Saved value: {project.name}</p>
    </div>
  );
}
