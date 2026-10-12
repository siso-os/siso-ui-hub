/* @css ab:packages/halo-face/halo-face.css ab:packages/halo-face/agent-face.css */
/* @js ab:packages/halo-face/halo-face.js ab:packages/halo-face/agent-face.js */
// HALO faces (@halo/agent-face): one per agent, coloured by project, drawn by status.
import { AgentFace } from "@halo/agent-face";
const S = ["working", "waiting", "needs-shaan", "blocked", "done", "offline"] as const;
export default function Demo() {
  return (
    <div style={{ display: "flex", gap: 28, padding: 28, flexWrap: "wrap", alignItems: "end" }}>
      {S.map((s, i) => (
        <div key={s} style={{ textAlign: "center", fontSize: 12, opacity: 0.85 }}>
          <AgentFace name={"APP-FACTORY"} project={["siso-ui-hub", "agent-base", "halo", "landing", "voice", "estate"][i]} status={s} size={56} />
          <div style={{ marginTop: 8 }}>{s}</div>
        </div>
      ))}
    </div>
  );
}
