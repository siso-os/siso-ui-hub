/* @css lp:src/shared/styles/color-system.css ab:packages/siso-tokens/siso.css */
// The two colour schemes as the files define them today (read from the live CSS, not retyped), plus UI blue.
import { useEffect, useState } from "react";
const LP = ["--siso-orange", "--siso-red", "--siso-bg-primary", "--siso-bg-secondary", "--siso-bg-tertiary", "--siso-text-primary", "--siso-text-secondary", "--siso-border"];
const AB = ["--siso-bg", "--siso-bg-alt", "--siso-bg-hover", "--siso-text", "--siso-text-muted", "--crm-color-surface-raised", "--crm-color-text-strong"];
function Row({ title, vars }: { title: string; vars: string[] }) {
  const [vals, setVals] = useState<string[]>([]);
  useEffect(() => { const cs = getComputedStyle(document.documentElement); setVals(vars.map((v) => cs.getPropertyValue(v).trim())); }, []);
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>{title}</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {vars.map((v, i) => (
          <div key={v} style={{ width: 104, fontSize: 10.5 }}>
            <div style={{ height: 44, borderRadius: 10, background: vals[i] || "transparent", border: "1px solid #ffffff22" }} />
            <div style={{ marginTop: 4, opacity: 0.85 }}>{v.replace("--", "")}</div>
            <div style={{ opacity: 0.55 }}>{vals[i] || "not set"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function Demo() {
  return (
    <div style={{ padding: 24 }}>
      <Row title="The landing (color-system.css)" vars={LP} />
      <Row title="Agent Base (@siso/tokens siso.css)" vars={AB} />
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>A colour per core (spec §8: UI is blue), each with the glow</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[["UI", "#3B82F6"], ["Industries", "#10B981"], ["Projects", "#FFA726"], ["Agents", "#A855F7"], ["Law Book", "#EAB308"]].map(([n, c]) => (
          <div key={n} style={{ padding: "10px 14px", borderRadius: 12, border: `1px solid ${c}`, boxShadow: `0 0 18px ${c}55, inset 0 0 12px ${c}22`, fontSize: 12 }}>{n}</div>
        ))}
      </div>
    </div>
  );
}
