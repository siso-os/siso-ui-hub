/* @css lp:src/shared/styles/color-system.css */
/* @root lp */
// The landing's living marks: WorkspaceMark in its three looks, and the lion.
import { WorkspaceMark } from "@/features/marketing/components/siso/living/WorkspaceMark";
import LionGlyph from "@/features/marketing/components/siso/ui/LionGlyph";
const B = ["siso-agency", "agent-base", "halo"] as const;
const L = ["prism", "orbit", "relief"] as const;
export default function Demo() {
  return (
    <div style={{ padding: 28, display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 26, justifyContent: "center", alignItems: "center" }}>
      {L.map((l) => [
        ...B.map((b) => <div key={b + l} style={{ textAlign: "center", fontSize: 11, opacity: 0.8 }}><WorkspaceMark brand={b} look={l} size={72} interactive /><div>{b} · {l}</div></div>),
        l === "prism" ? <div key="lion" style={{ color: "#FFA726", textAlign: "center", fontSize: 11 }}><LionGlyph size={72} /><div>lion</div></div> : <div key={"x" + l} />,
      ])}
    </div>
  );
}
