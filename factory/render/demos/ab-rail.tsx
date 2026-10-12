/* @css ab:packages/siso-tokens/siso.css ab:packages/siso-shell/shell.css ab:packages/siso-side-nav/grouped-rail.css ab:packages/siso-side-nav/rail-extras.css */
// Agent Base's GroupedRail (@siso/side-nav), holding the App Factory's cores in V1 §4a's groups.
import { useState } from "react";
import { GroupedRail, RailGroup, RailIcon } from "@siso/side-nav";
import { Factory, Building2, Boxes, Users, HelpCircle, LayoutGrid, Code2, Bot, Scale, Gauge, LayoutTemplate, PanelsTopLeft, MonitorCog, FolderKanban, Rocket, Handshake } from "lucide-react";

const GROUPS: [string, [string, any][]][] = [
  ["The line", [["Projects", FolderKanban]]],
  ["Know who", [["Industries", Building2], ["Software", Boxes], ["People", Users], ["Questions", HelpCircle]]],
  ["Build with", [["UI", LayoutGrid], ["Code", Code2], ["Agents", Bot]]],
  ["Judge", [["Law Book", Scale], ["Benchmarks", Gauge]]],
  ["Moulds", [["Site Kit", LayoutTemplate], ["Hub Kit", PanelsTopLeft], ["OS Kit", MonitorCog]]],
  ["Ship", [["Solutions", Rocket], ["Partners", Handshake]]],
];

export default function Demo() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("UI");
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <GroupedRail name={<b>App Factory</b>} brand={<Factory size={18} />} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} onSearch={() => {}} searchLabel="Search every core…"
        compact={GROUPS.flatMap(([, items]) => items).map(([n, I]) => <RailIcon key={n} label={n} Icon={I} active={active === n} onClick={() => setActive(n)} />)}>
        {GROUPS.map(([g, items]) => (
          <RailGroup key={g} id={g} label={g}>
            {items.map(([n, I]) => (
              <button key={n} type="button" className={"siso-sidebar__item" + (active === n ? " is-active" : "")} onClick={() => setActive(n)} style={{ display: "flex", gap: 8, alignItems: "center", width: "100%", padding: "6px 10px" }}>
                <I size={15} /> <span>{n}</span>
              </button>
            ))}
          </RailGroup>
        ))}
      </GroupedRail>
      <main style={{ flex: 1, padding: 24, opacity: 0.6 }}>{active}</main>
    </div>
  );
}
