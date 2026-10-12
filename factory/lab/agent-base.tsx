/* @css ab:packages/siso-tokens/siso.css ab:packages/siso-shell/shell.css ab:packages/siso-side-nav/grouped-rail.css ab:packages/siso-side-nav/rail-extras.css ab:packages/siso-side-nav/hub-nav.css ab:packages/halo-face/halo-face.css ab:packages/halo-face/agent-face.css factory:lab/lab.css */
/* @js ab:packages/halo-face/halo-face.js ab:packages/halo-face/agent-face.js */
// uihub: siso:lab-agent-base
// The side nav's second sample: Agent Base (agent-base.md §2, §4), on its live data (/ab-api → 127.0.0.1:5401, read
// only). A proposal in the lab: AGENT-BASE wires the real modules into apps/web when it merges the side-nav lane.
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { HubNav, ProjectGroup, ThreadRow, type HubItem, type HubLevel } from "@siso/side-nav";
import { PillTabs } from "@siso/shell";
import { AgentFace } from "@halo/agent-face";
import {
  Activity, AppWindow, BarChart3, Blocks, Bot, Boxes, Brain, CircleUser, ClipboardList, Cpu, FolderGit2, GitBranch, Globe,
  History, Laptop, ListTodo, Mic, Network, Pin, Plug, Server, Settings2, Sparkles, Star, Users, Wrench,
} from "lucide-react";
import { spaces, useFour } from "../app/four";

type Agent = { id: string; name: string; status: string; parentId?: string; project?: string; zero?: boolean; kind?: string };
type Org = { bottom: { name: string; state: string; domain: string }[]; groups: { id: string; name: string; projects: { name: string }[] }[] };
type Data = { agents: Agent[]; org: Org | null; ended: number; pinned: number; recent: number; projects: number; asOf: number };

const TEAL = "#14B8A6"; // Agent Base's space colour
const get = (p: string) => fetch("/ab-api/" + p).then((r) => (r.ok ? r.json() : null)).catch(() => null);

function useData(): Data | null {
  const [d, setD] = useState<Data | null>(null);
  useEffect(() => {
    let live = true;
    const read = async () => {
      const [a, org, ended] = await Promise.all([get("agents"), get("org"), get("ended")]);
      if (live && a) setD({ agents: a.agents, org, ended: ended?.ended?.length ?? 0, pinned: a.pinnedPages?.length ?? 0, recent: a.recentPages?.length ?? 0, projects: a.projects?.length ?? 0, asOf: Date.now() });
    };
    read();
    const t = setInterval(read, 10_000);
    return () => { live = false; clearInterval(t); };
  }, []);
  return d;
}

const MARK: Record<string, "working" | "needs" | "failed" | "done" | "quiet"> = { working: "working", "needs-you": "needs", needs: "needs", failed: "failed", done: "done" };
const FACE: Record<string, any> = { working: "working", "needs-you": "needs-shaan", needs: "needs-shaan", failed: "blocked", done: "done", idle: "waiting", offline: "offline" };

/** The org card (agent-base.md §4): Agent Zero's tree, SISO Family, Agents, agent infrastructure in one row, N ended. */
function OrgCard({ d, active, open }: { d: Data | null; active: string | null; open: (id: string, name: string) => void }) {
  const [crew, setCrew] = useState(true);
  if (!d) return <p className="lab-note">Reading Agent Base at 127.0.0.1:5401…</p>;
  const zero = d.agents.find((a) => a.zero);
  const under = d.agents.filter((a) => zero && a.parentId === zero.id);
  const rest = d.agents.filter((a) => !a.zero && !(zero && a.parentId === zero.id));
  const family = d.org?.groups.find((g) => g.id === "family");
  const face = (a: Agent, size = 18) => <span className={`ab-ring is-${a.status}`}><AgentFace name={a.name} status={FACE[a.status] ?? "waiting"} size={size} /></span>;
  const line = (a: Agent, extra: object = {}) => (
    <ThreadRow key={a.id} id={a.id} name={a.name} mark={MARK[a.status] ?? "quiet"} lead={face(a, (extra as any).crew ? 16 : 18)} active={active === a.id}
      time={a.status === "working" ? "working" : undefined} onOpen={() => open(a.id, a.name)} {...extra} />
  );
  return (
    <div className="lab-org">
      {zero && line(zero, { fold: { open: crew, count: under.length, onToggle: () => setCrew(!crew) } })}
      {crew && under.map((a) => line(a, { crew: true }))}
      {family && (
        <ProjectGroup id="lab:family" name={family.name} count={family.projects.length}>
          {family.projects.map((p) => <div key={p.name} className="lab-org__project">{p.name}</div>)}
        </ProjectGroup>
      )}
      <ProjectGroup id="lab:agents" name="Agents" count={rest.length}>
        {rest.map((a) => line(a))}
      </ProjectGroup>
      <div className="lab-org__foot">
        {d.org && d.org.bottom.length > 0 && (
          <button type="button" className="lab-org__infra" title={d.org.bottom.map((b) => `${b.name}: ${b.state}`).join("\n")} onClick={() => open("infra", "Agent infrastructure")}>
            <Wrench size={13} aria-hidden /> {d.org.bottom.map((b) => b.name.toLowerCase()).join(" · ")}
          </button>
        )}
        <button type="button" className="lab-org__ended" onClick={() => open("ended", "Ended")}>{d.ended} ended</button>
      </div>
    </div>
  );
}

function levels(d: Data | null, card: ReactNode): HubLevel {
  const agents = d?.agents ?? [];
  const owners = agents.filter((a) => a.kind === "owner" || a.zero);
  const OWNERS: HubLevel = {
    id: "tasks/owners", name: "By owner", colour: TEAL, groups: [{ label: "Owners", items: owners.map((a) => ({ id: `tasks/owner/${a.id}`, name: a.name, icon: CircleUser })) }],
  };
  const MACHINES: HubLevel = {
    id: "estate/machines", name: "Machines", colour: TEAL, groups: [{ label: "Machines", items: [
      { id: "estate/m/laptop", name: "Laptop", icon: Laptop, hint: "this Mac" },
      { id: "estate/m/mini", name: "Mini", icon: Cpu, hint: "the Mac mini" },
      { id: "estate/m/vps", name: "VPSs", icon: Server },
    ] }],
  };
  const AGENTS: HubLevel = {
    id: "agents", name: "Agents", colour: TEAL, icon: Bot, card, searchLabel: "Search agents…",
    groups: [{ label: "Pages", items: [
      { id: "agents/org", name: "Org chart", icon: Network },
      { id: "agents/stats", name: "Stats", icon: BarChart3 },
      { id: "agents/starred", name: "Starred", icon: Star },
    ] }],
    // search covers what's open: the agents in the card, then the pages
    search: (q) => [
      ...agents.filter((a) => a.name.toLowerCase().includes(q)).map((a): HubItem => ({ id: a.id, name: a.name, icon: Bot, hint: a.status })),
      ...["Org chart", "Stats", "Starred"].filter((n) => n.toLowerCase().includes(q)).map((n): HubItem => ({ id: "agents/" + n.split(" ")[0].toLowerCase(), name: n, icon: Network })),
    ],
  };
  const mod = (id: string, name: string, icon: any, groups: HubLevel["groups"]): HubLevel => ({ id, name, icon, colour: TEAL, groups });
  return {
    id: "agent-base", name: "Agent Base", colour: TEAL, searchLabel: "Search Agent Base…",
    groups: [{ label: "Modules", items: [
      { id: "agents", name: "Agents", icon: Bot, hub: AGENTS, hint: `${agents.length} running` },
      { id: "tasks", name: "Tasks", icon: ListTodo, hub: mod("tasks", "Tasks", ListTodo, [{ label: "Tasks", items: [
        { id: "tasks/needs", name: "Needs you", icon: Activity },
        { id: "tasks/mine", name: "Mine", icon: ClipboardList },
        { id: "tasks/owners", name: "By owner", icon: Users, hub: OWNERS },
        { id: "tasks/projects", name: "By project", icon: FolderGit2, badge: d?.projects },
      ] }]) },
      { id: "voice", name: "Voice", icon: Mic, hub: mod("voice", "Voice", Mic, [{ label: "Voice", items: [
        { id: "voice/sessions", name: "Sessions", icon: History },
        { id: "voice/settings", name: "Settings", icon: Settings2 },
      ] }]) },
      { id: "browser", name: "Browser", icon: Globe, hub: mod("browser", "Browser", Globe, [{ label: "Browser", items: [
        { id: "browser/pinned", name: "Pinned sites", icon: Pin, badge: d?.pinned },
        { id: "browser/history", name: "History", icon: History, badge: d?.recent },
      ] }]) },
      { id: "estate", name: "Estate", icon: Server, hub: mod("estate", "Estate", Server, [
        { label: "Estate", items: [
          { id: "estate/machines", name: "Machines", icon: Laptop, hub: MACHINES },
          { id: "estate/repos", name: "Repos", icon: FolderGit2 },
          { id: "estate/worktrees", name: "Worktrees", icon: GitBranch },
        ] },
        { label: "Pages", items: [
          { id: "estate/servers", name: "Servers", icon: Server },
          { id: "estate/tokens", name: "Tokens", icon: Boxes },
          { id: "estate/land", name: "Land", icon: AppWindow },
        ] },
      ]) },
      { id: "hub", name: "Agents Hub", icon: Sparkles, hint: "new (t-0601)", hub: mod("hub", "Agents Hub", Sparkles, [{ label: "Agents Hub", items: [
        { id: "hub/skills", name: "Skills", icon: Brain },
        { id: "hub/mcp", name: "MCP servers", icon: Plug },
        { id: "hub/plugins", name: "Plugins", icon: Blocks },
        { id: "hub/models", name: "Models", icon: Cpu, hint: "Benchmarks" },
        { id: "hub/usage", name: "Usage", icon: BarChart3 },
      ] }]) },
    ] }],
  };
}

export default function AgentBaseSample() {
  const d = useData();
  const [active, setActive] = useState<string | null>("agents/org");
  const [tabs, setTabs] = useState<{ id: string; label: string }[]>([{ id: "agents/org", label: "Org chart" }]);
  const [where, setWhere] = useState<string[]>([]);
  const open = (id: string, label: string) => { setActive(id); setTabs((t) => (t.some((x) => x.id === id) ? t : [...t, { id, label }])); };
  const card = <OrgCard d={d} active={active} open={open} />;
  const root = useMemo(() => levels(d, card), [d, active]);
  const [tools, tool] = useFour("Agent Zero", () => open("agents/org", "Org chart"));
  const tab = tabs.find((t) => t.id === active);
  return (
    <HubNav root={root} tools={tools} activeTool={tool} brand={<Bot size={18} />} version="v171" storeKey="lab.ab.nav" initialPath={["agents"]}
      menu={spaces("agent-base")} activeId={active} onSelect={(item) => open(item.id, item.name)} onPath={setWhere}
      user={{ name: "Shaan", role: "Agent Base · local", face: <AgentFace name="Shaan" status="working" size={26} />, menu: [{ key: "settings", label: "Settings · later", disabled: true }] }}>
      <div className="lab-page">
        <header className="lab-tabs">
          <PillTabs tabs={tabs} activeId={active ?? ""} onActivate={setActive} onClose={(id) => { const t = tabs.filter((x) => x.id !== id); setTabs(t); if (active === id) setActive(t[t.length - 1]?.id ?? null); }} />
        </header>
        <main className="lab-main">
          <p className="lab-eyebrow">Agent Base › {where.length ? where.map((w) => w.split("/").pop()).join(" › ") : "modules"}</p>
          <h1>{tab?.label ?? "Nothing open"}</h1>
          <p className="lab-note">The open tab draws here. This page is the lab's sample of the side nav: the side nav is the real
            @siso/side-nav from the side-nav lane, the org card is drawn from Agent Base's live data
            {d ? ` (${d.agents.length} agents, ${d.ended} ended, read ${new Date(d.asOf).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})` : ""}, and the pages are not built here.</p>
        </main>
      </div>
    </HubNav>
  );
}
