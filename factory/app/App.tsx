/* @css ab:packages/siso-tokens/siso.css ab:packages/halo-face/halo-face.css ab:packages/halo-face/agent-face.css ab:packages/halo-face/workspace-mark.css */
/* @js ab:packages/halo-face/halo-face.js ab:packages/halo-face/agent-face.js */
// The SISO side nav, shell pieces and dashboard template, looks v7 (ECOSYSTEM with Shaan, 10 Oct 2026, ideas 36-44).
// Locked: the Halo rim around the whole side nav. v7 per his notes:
// - the header is 21st.dev's: the back arrow beside the title, the fold on the right; search alone, full width;
// - levels and tabs slide across, and every button gives a little under a click and springs back (the SISO press);
// - the pill switch (icons in a pill; the chosen one opens with its name) splits the UI Hub into Browse and SISO assets;
// - labels are 12 letters at most; the edge resizes from the rim itself; the version sits clean at the foot and opens
//   help, docs and the releases;
// - breadcrumbs get their own bar with Saved and light or dark, and only show the way you came;
// - widgets follow HALO's contract: sizes S to XL whose content adapts, the border lights on hover, drag from anywhere;
// - the UI Hub has Packages: every SISO UI package and piece, with each of its versions;
// - Geist, SISO's font, is loaded.
// One package, data per app: ?app=factory | agent-base | agency | whatsapp | voice | library | questions | life,
// ?theme=light, and where you are in the hash (#ui/ui-components:all).
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ResponsiveGridLayout, useContainerWidth } from "react-grid-layout";
import { HaloRim } from "@siso/shell";
import { AgentFace, LivingIcon, WorkspaceMark } from "@halo/agent-face";
import { AnimatedNavIcon, ICONS } from "@siso/icons";
import { Bookmark, Check, ChevronDown, ChevronLeft, ChevronRight, Copy, ExternalLink, Moon, PanelLeftClose, PanelLeftOpen, RotateCcw, SlidersHorizontal, Sun, X } from "lucide-react";

type Icon = keyof typeof ICONS;
type Item = { id: string; name: string; full?: string; icon?: Icon; n?: string; open?: Level; kind?: "toggle" | "tick"; on?: boolean; badge?: string };
type Tab = { id: string; name: string; icon: Icon; groups: string[] };
// home: the page you land on; dash: its dashboard page; section: the UI Hub section it shows; tabs: a pill switch
type Level = { id: string; name: string; full?: string; icon?: Icon; n?: string; about?: string; home?: string; dash?: string; section?: string; tabs?: Tab[]; groups: { name: string; items: Item[] }[] };
type App = { id: string; name: string; about: string; version: string; rgb: string; second: string; face: number; mark?: string; ws?: string; group: "space" | "app" | "os"; root: Level };

const L = (id: string, name: string, icon: Icon, groups: Level["groups"], n?: string, about?: string, more?: Partial<Level>): Level => ({ id, name, icon, groups, n, about, ...more });
const I = (id: string, name: string, icon: Icon, n?: string, open?: Level, badge?: string): Item => ({ id, name, icon, n, open, badge });
const T = (id: string, name: string, icon: Icon, on: boolean, kind: "toggle" | "tick" = "toggle"): Item => ({ id, name, icon, on, kind });
const simple = (id: string, name: string, icon: Icon, items: [string, string, Icon, string?][], n?: string, about?: string) => L(id, name, icon, [{ name: "Pages", items: [I("dash", "Overview", "gauge"), ...items.map(([a, b, c, d]) => I(a, b, c, d))] }], n, about);
const space = (name: string, about: string, groups: Level["groups"]) => L("root", name, "home", [{ name: "", items: [I("dash", "Home", "home")] }, ...groups], undefined, about, { home: "dash" });

// side nav labels stay short (Shaan: "it should have a max letter count"); the full name is the page title and tooltip
const MAX = 12;
const SHORT: Record<string, string> = { "Templates & Themes": "Templates", "Marketing Blocks": "Blocks", "UI Components": "Components", "AI & Agents": "AI", "Spinner Loaders": "Loaders", "Navigation Menus": "Nav menus",
  "Pricing Sections": "Pricing", "Calls to Action": "CTAs", "Team Sections": "Teams", Announcements: "Banners", "Notifications & Toasts": "Toasts", "Command Palettes": "Palettes", "Leaderboards & Rewards": "Leaderboards",
  "Kanban Boards": "Kanban", "Image Compare": "Compare", "Color Pickers": "Colours", "Context Menus": "Right-click", "Number Inputs": "Num inputs", "Sign Ins & Sign Ups": "Sign-ins", "AI Chats & Composers": "AI chats",
  "AI Components": "AI parts", "Image Generation": "Image gen", "Notification Centres": "Inboxes", "Tables of Contents": "Contents", "Segmented Controls": "Segments", "Sheets & Drawers": "Drawers" };
const short = (s: string) => { const x = SHORT[s] ?? s.split(/ & | \/ /)[0]; return x.length > MAX ? `${x.slice(0, MAX - 1)}…` : x; };

// ── the UI Hub: its own index (one fetch), its sections from the hub's nav, a local preview for most parts ──────────
type Row = { id: string; t: string; d?: string; k: string; s: string; c?: string; a?: string; st: string; u?: number; p?: string; pl?: string; sig?: string };
type Sec = { section: string; items: { label: string; categories: string[]; n: number }[] };
type Hub = { generated: string; stats: Record<string, any>; nav: Sec[]; items: Row[]; labelOf: Map<string, string>; bySec: Map<string, Row[]> };
const HUB_AT = "/raw/hub/app/public";
let hubP: Promise<Hub> | null = null;
const loadHub = () =>
  (hubP ??= fetch(`${HUB_AT}/data/index.json`).then((r) => r.json()).then((h) => {
    const secOf = new Map<string, string>(), labelOf = new Map<string, string>(), bySec = new Map<string, Row[]>();
    for (const s of h.nav as Sec[]) { bySec.set(s.section, []); for (const i of s.items) for (const c of i.categories) { secOf.set(c, s.section); labelOf.set(c, i.label); } }
    for (const r of h.items as Row[]) { const s = r.c ? secOf.get(r.c) : undefined; if (s) bySec.get(s)!.push(r); }
    for (const l of bySec.values()) l.sort((x, y) => (y.u ?? 0) - (x.u ?? 0));
    return { ...h, labelOf, bySec };
  }));
function useHub() {
  const [h, setH] = useState<Hub | null>(null);
  useEffect(() => { loadHub().then(setH, () => {}); }, []);
  return h;
}
// a part's full record (install line, licence, link) is in one of 64 shards: FNV-1a of its id, as the hub does it
const shardOf = (id: string) => { let h = 0x811c9dc5; for (const b of new TextEncoder().encode(id)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; } return h % 64; };
const shards = new Map<number, Promise<Record<string, any>>>();
const loadFull = (id: string) => { const n = shardOf(id); if (!shards.has(n)) shards.set(n, fetch(`${HUB_AT}/data/item/${n}.json`).then((r) => r.json())); return shards.get(n)!.then((d) => d[id]); };
const fmt = (n: number) => n.toLocaleString("en-GB");
const slug = (s: string) => s.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const img = (r: Row) => (r.p ? HUB_AT + r.p : r.pl);
const RANK: Record<string, number> = { ours: 6, picked: 5, curated: 4, rated: 3, reviewed: 2, indexed: 1 };
const isPicked = (r: Row) => r.st === "ours" || r.st === "picked" || r.st === "curated" || r.sig === "love" || r.sig === "star";
const SEC_ICON: Record<string, Icon> = { "Templates & Themes": "layers", "Marketing Blocks": "sparkles", "UI Components": "box", "AI & Agents": "brain", Motion: "zap", SISO: "stamp" };
// a SISO icon per category, from what its name says; the section's icon otherwise
const CAT_ICON: [RegExp, Icon][] = [[/hero|text|announce/i, "sparkles"], [/background|shader|gradient|ascii|border|colou?r|theme/i, "palette"], [/nav|dock|menu|breadcrumb|sidebar|tab|pagination|stepper|timeline/i, "route"],
  [/button|toggle|switch|checkbox|radio|slider|cursor/i, "zap"], [/chart|stat|kpi|gauge|number|progress|leaderboard/i, "activity"], [/card|grid|bento|galler|carousel|stack|lightbox|image|video/i, "layers"],
  [/form|input|select|picker|upload|area|sign|otp|search/i, "workflow"], [/pricing|cta|call|compar/i, "wallet"], [/team|testimonial|client|profile|avatar/i, "users"], [/chat|ai |agent|ai$/i, "brain"],
  [/dialog|modal|popover|tooltip|sheet|drawer|toast|notification|alert/i, "bell"], [/table|list|tree|json|code|diff|kanban/i, "terminal"], [/template|page|shell|dashboard|setting/i, "blocks"], [/map|globe/i, "compass"], [/spinner|loader|skeleton/i, "timer"]];
const catIcon = (label: string, sec: string): Icon => CAT_ICON.find(([r]) => r.test(label))?.[1] ?? SEC_ICON[sec] ?? "box";


// ── SISO packages: every UI package and piece, with its versions (factory/data/siso-packages.json) ──────────────
type Ver = { v: string; when: string; note: string; commit?: string; shot?: string };
type Pkg = { id: string; name: string; pkg?: string; parent?: string; icon: Icon; status: string; about: string; code?: { version: string; commits: number; first: string; last: string }; versions?: Ver[] };
type Pkgs = { about: string; packages: Pkg[] };
const SHOTS = "/raw/hub/app/public/a/pkg/";
let pkgP: Promise<Pkgs> | null = null;
function usePkgs() {
  const [p, setP] = useState<Pkgs | null>(null);
  useEffect(() => { (pkgP ??= fetch("/raw/hub/app/src/data/siso-packages.json").then((r) => r.json())).then(setP, () => {}); }, []);
  return p;
}

function sectionLevel(h: Hub, s: Sec, full = s.section): Level {
  const rows = h.bySec.get(s.section) ?? [];
  const id = slug(s.section), icon = SEC_ICON[s.section] ?? "box";
  const last = (l: string) => (/^(unsorted|other)/i.test(l) ? 1 : 0);
  const cats = [...s.items].sort((x, y) => last(x.label) - last(y.label) || y.n - x.n);
  const tick = (c: Sec["items"][number]): Item => ({ id: `cat:${c.label}`, name: short(c.label), full: c.label, icon: catIcon(c.label, s.section), n: fmt(c.n), kind: "tick" });
  const more = L(`${id}-cats`, "Categories", icon, [{ name: "Show only", items: cats.map(tick) }], String(cats.length), `${cats.length} in ${short(full)}`, { home: "all", dash: "overview", section: s.section });
  return L(id, short(full), icon, [
    { name: "Pages", items: [I("overview", "Overview", "gauge"), I("all", "All parts", "layers", fmt(rows.length)), I("picked", "Picked", "stamp", fmt(rows.filter(isPicked).length))] },
    ...(cats.length > 1 ? [{ name: "Show only", items: [...cats.slice(0, 8).map(tick), ...(cats.length > 8 ? [I(more.id, "Categories", "blocks", String(cats.length), more)] : [])] }] : []),
  ], fmt(rows.length), `${fmt(rows.length)} parts`, { full, home: "overview", dash: "overview", section: s.section });
}
function uiHub(h: Hub | null, pk: Pkgs | null): Level {
  const secs = h ? h.nav.filter((s) => s.section !== "SISO").map((s) => sectionLevel(h, s)) : [];
  const siso = h?.nav.find((s) => s.section === "SISO");
  const ours = h && siso ? sectionLevel(h, siso, "Our parts") : null;
  const n = h ? fmt(h.stats.ui_items) : undefined;
  return L("ui", "UI Hub", "palette", [
    { name: "Browse", items: [I("home", "Home", "home"), ...secs.map((l) => ({ ...I(l.id, l.name, l.icon!, l.n, l), full: l.full }))] },
    { name: "View", items: [T("picked-only", "Picked only", "stamp", false), T("ours-first", "Ours first", "rocket", true), T("live", "Live previews", "zap", true)] },
    { name: "SISO assets", items: [I("packages", "Packages", "box", pk ? String(pk.packages.length) : undefined, undefined, "New"), ...(ours ? [I(ours.id, ours.name, "stamp", ours.n, ours)] : []), I("icons", "Icons", "sparkles", String(Object.keys(ICONS).length)), I("faces", "Faces & orbs", "bot")] },
  ], n, h ? `${n} parts · ${h.nav.length} sections` : "Opening the hub…", { home: "home", dash: "home",
    tabs: [{ id: "browse", name: "Browse", icon: "layers", groups: ["Browse", "View"] }, { id: "assets", name: "SISO assets", icon: "sparkles", groups: ["SISO assets"] }] });
}

const factoryRoot = (ui: Level) => space("App Factory", "Make anything, from the parts up", [
  { name: "Know who", items: [I("industries", "Industries", "compass", "3,665", simple("industries", "Industries", "compass", [["map", "The map", "route"], ["ranked", "Ranked", "activity", "3,665"], ["packs", "Packs", "box", "26"], ["agencies", "Agencies", "users"]], "3,665", "Who we build for")),
    I("software", "Software", "layers", undefined, simple("software", "Software", "layers", [["products", "Products", "box"], ["replace", "Open replacements", "route"], ["vibe", "Vibe-codable", "sparkles"]], undefined, "What businesses pay for"))] },
  { name: "Build with", items: [I("ui", "UI Hub", "palette", ui.n, ui), I("code", "Code", "terminal", "1.36M", simple("code", "Code", "terminal", [["repos", "Repos", "box"], ["packages", "Packages", "blocks"], ["search", "Code search", "search"]], "1.36M", "Code to lift"))] },
  { name: "Judge", items: [I("laws", "Law Book", "gavel", "43", simple("laws", "Law Book", "gavel", [["principles", "Principles", "gavel", "43"], ["calls", "His calls", "stamp"], ["evidence", "Evidence", "flask"]], "43", "The rules every build meets"))] },
  { name: "Make", items: [I("projects", "Projects", "rocket", "5", simple("projects", "Projects", "rocket", [["agent-base", "Agent Base", "bot"], ["app-factory", "App Factory", "construction"], ["landing", "SISO landing", "sparkles"]], "5", "Everything on the line")),
    I("kits", "Kits", "blocks", "3", simple("kits", "Kits", "blocks", [["site", "Site Kit", "layers"], ["hub", "Hub Kit", "blocks"], ["os", "OS Kit", "cpu"]], "3", "Moulds for sites, hubs and OSes"))] },
]);


const APPS: Record<string, App> = {
  factory: { id: "factory", name: "App Factory", about: "Make anything, from the parts up", version: "v0.1", rgb: "109 124 255", second: "#38bdf8", face: 232, group: "space", root: factoryRoot(uiHub(null, null)) },
  "agent-base": { id: "agent-base", name: "Agent Base", about: "Your agents, everywhere they run", version: "v174", rgb: "97 154 255", second: "#60e8ff", face: 205, mark: "agent-base", group: "space",
    root: space("Agent Base", "Your agents, everywhere they run", [
      { name: "Agents", items: [I("zero", "Agent Zero", "bot", "4", simple("zero", "Agent Zero", "bot", [["halo", "HALO", "users", "1"], ["agency", "SISO Agency", "users", "2"], ["clients", "Clients", "box"], ["research", "Research", "flask"], ["family", "SISO Family", "users"]], "4", "4 need you")),
        I("tasks", "Tasks", "stamp", "12")] },
      { name: "Work", items: [I("voice", "Voice", "zap"), I("browser", "Browser", "compass", "8"), I("estate", "Estate", "server", undefined, simple("estate", "Estate", "server", [["laptop", "Laptop", "cpu"], ["mini", "Mac mini", "server"], ["vps", "VPSs", "server", "2"], ["repos", "Repos", "box", "70"], ["tokens", "Tokens", "wallet"]], undefined, "Machines, repos and tokens"))] },
      { name: "Tools", items: [I("hub", "Agents Hub", "workflow", "54", simple("hub", "Agents Hub", "workflow", [["skills", "Skills", "sparkles", "54"], ["mcp", "MCP servers", "server"], ["plugins", "Plugins", "blocks"], ["models", "Models", "brain"], ["usage", "Usage", "activity"]], "54", "What your agents can use"), "New")] },
      { name: "Show", items: [T("quiet", "Quiet agents", "bot", false), T("ended", "Ended today", "history", false)] },
    ]) },
  agency: { id: "agency", name: "Agency", about: "Clients, people and what we sell", version: "v0.4", rgb: "255 98 74", second: "#ffc171", face: 14, ws: "siso-agency", group: "space",
    root: space("Agency", "Clients, people and what we sell", [
      { name: "Talk", items: [I("inbox", "Inbox", "bell"), I("whatsapp", "WhatsApp", "users"), I("rolodex", "Rolodex", "compass")] },
      { name: "People", items: [I("people", "People", "users"), I("partners", "Partners", "users")] },
      { name: "Sell", items: [I("solutions", "Solutions", "rocket"), I("proposals", "Proposals", "stamp")] },
    ]) },
  whatsapp: { id: "whatsapp", name: "WhatsApp", about: "Every client chat in one inbox", version: "v0.9", rgb: "37 211 102", second: "#5eead4", face: 145, mark: "whatsapp", group: "app",
    root: space("WhatsApp", "Every client chat in one inbox", [
      { name: "Inbox", items: [I("all", "All chats", "users"), I("reply", "Needs a reply", "bell"), I("clients", "Clients", "box"), I("partners", "Partners", "users")] },
      { name: "Send", items: [I("templates", "Templates", "layers"), I("broadcasts", "Broadcasts", "rocket")] },
      { name: "Numbers", items: [T("business", "Business", "box", true, "tick"), T("personal", "Personal", "users", false, "tick")] },
    ]) },
  voice: { id: "voice", name: "Voice", about: "Talk to any agent, anywhere", version: "v3.2", rgb: "167 139 250", second: "#f472b6", face: 265, mark: "siso-voice", group: "app",
    root: space("Voice", "Talk to any agent, anywhere", [
      { name: "Talk", items: [I("live", "Live", "zap"), I("history", "History", "history")] },
      { name: "Set up", items: [I("voices", "Voices", "sparkles", "6"), T("hotkey", "Hotkey anywhere", "cpu", true), T("speak", "Read replies aloud", "zap", false)] },
    ]) },
  library: { id: "library", name: "Great Library", about: "Everything SISO has read and kept", version: "v2.0", rgb: "245 158 11", second: "#fde68a", face: 40, mark: "library", group: "os",
    root: space("Great Library", "Everything SISO has read and kept", [{ name: "Read", items: [I("shelves", "Shelves", "layers"), I("banks", "Banks", "box"), I("research", "Research", "flask")] }]) },
  questions: { id: "questions", name: "Questions", about: "What the agents need you to answer", version: "v0.3", rgb: "45 212 191", second: "#a5f3fc", face: 172, group: "os",
    root: space("Questions", "What the agents need you to answer", [{ name: "Ask", items: [I("open", "Open", "bell"), I("answered", "Answered", "stamp"), I("asked", "Asked by agents", "bot")] }]) },
  life: { id: "life", name: "Life", about: "Your days, notes and health", version: "v1.2", rgb: "244 114 182", second: "#fbcfe8", face: 330, mark: "lifelog", group: "os",
    root: space("Life", "Your days, notes and health", [{ name: "You", items: [I("today", "Today", "timer"), I("notes", "Notes", "layers"), I("health", "Health", "activity")] }]) },
};

const ECO: [string, App["group"]][] = [["Spaces", "space"], ["Apps", "app"], ["Across the OS", "os"]];

const q = new URLSearchParams(location.search);
let app = APPS[q.get("app") ?? ""] ?? APPS.factory;
let C = `rgb(${app.rgb})`;
const a = (o: number) => `rgb(${app.rgb} / ${o})`;
const allItems = (l: Level) => l.groups.flatMap((g) => g.items);
const first = (l: Level) => l.home ?? allItems(l).find((i) => !i.kind && !i.open)?.id ?? "dash";
const pageIn = (l: Level, p: string) => p === (l.dash ?? "dash") || p === l.home || allItems(l).some((i) => i.id === p && !i.kind && !i.open);
const resolve = (root: Level, path: string[]) => {
  const out = [root];
  for (const id of path) { const nx = allItems(out[out.length - 1]).find((i) => i.open?.id === id)?.open; if (!nx) break; out.push(nx); }
  return out;
};
const startOf = (x: App) => (x.id === "factory" ? { path: ["ui"], page: "home" } : { path: [] as string[], page: first(x.root) });
const START = (() => { const h = decodeURIComponent(location.hash.slice(1)); if (!h) return startOf(app); const [p, pg] = h.split(":"); return { path: p.split("/").filter(Boolean), page: pg || "dash" }; })();
const NAV_W = 256, NAV_MIN = 216, NAV_MAX = 420;
// the grid's styles, and Geist: SISO's font (siso.css names it; nothing loaded it until now)
for (const [id, href] of [["rgl-css", "https://esm.sh/react-grid-layout@2.3.0/css/styles.css"], ["geist", "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"]])
  if (!document.getElementById(id)) document.head.append(Object.assign(document.createElement("link"), { id, rel: "stylesheet", href }));

const THEMES = {
  dark: { page: "var(--crm-color-canvas, #0d0e0d)", rim: "rgb(27 27 25 / .84)", card: "var(--crm-color-surface, #171715)", cardLine: "rgb(255 255 255 / .05)", fg: "#fff", fg2: "rgb(255 255 255 / .74)", fg3: "rgb(255 255 255 / .5)", fg4: "rgb(255 255 255 / .34)",
    hover: "rgb(255 255 255 / .05)", line: "rgb(255 255 255 / .065)", well: "rgb(255 255 255 / .03)", wbg: "rgb(255 255 255 / .022)", pop: "rgb(24 24 23 / .97)", knob: "#fff", off: "rgb(255 255 255 / .14)", spot: "rgb(255 255 255 / .95)", thumb: "#0d0d0c", seg: "rgb(0 0 0 / .55)" },
  light: { page: "#ecebe8", rim: "rgb(255 255 255 / .86)", card: "#ffffff", cardLine: "rgb(0 0 0 / .06)", fg: "#111110", fg2: "rgb(0 0 0 / .72)", fg3: "rgb(0 0 0 / .5)", fg4: "rgb(0 0 0 / .4)",
    hover: "rgb(0 0 0 / .04)", line: "rgb(0 0 0 / .07)", well: "rgb(0 0 0 / .022)", wbg: "rgb(0 0 0 / .016)", pop: "rgb(255 255 255 / .97)", knob: "#fff", off: "rgb(0 0 0 / .16)", spot: "rgb(255 255 255 / 1)", thumb: "#f3f2ef", seg: "#ffffff" },
};
type Theme = typeof THEMES.dark;

function Mark({ x = app, size = 30 }: { x?: App; size?: number }) {
  return (
    <span className="af-orb grid shrink-0 place-items-center rounded-full" style={{ width: size + 6, height: size + 6, ["--h" as any]: x.rgb }}>
      {x.ws ? <WorkspaceMark brand={x.ws as any} size={size} /> : x.mark ? <LivingIcon name={x.mark as any} size={size - 2} variant="glyph" /> : <AgentFace name={x.name} hue={x.face} status="working" size={size} interactive />}
    </span>
  );
}
const Tile = ({ icon, size = 34 }: { icon?: Icon; size?: number }) => (
  <span className="grid shrink-0 place-items-center rounded-[11px]" style={{ width: size, height: size, color: C, background: a(0.14), boxShadow: `inset 0 0 0 1px ${a(0.3)}, 0 0 18px -6px ${a(0.8)}` }}>{icon && <AnimatedNavIcon icon={ICONS[icon]} size={Math.round(size * 0.52)} active />}</span>
);
const Switch = ({ on, t }: { on: boolean; t: Theme }) => (
  <span className="relative inline-block h-[18px] w-[30px] shrink-0 rounded-full transition-colors" style={{ background: on ? C : t.off }}>
    <span className="absolute top-[2px] h-[14px] w-[14px] rounded-full transition-all" style={{ left: on ? 14 : 2, background: t.knob, boxShadow: "0 1px 3px rgb(0 0 0 / .35)" }} />
  </span>
);
const Tick = ({ on, t }: { on: boolean; t: Theme }) => (
  <span className="grid h-[16px] w-[16px] shrink-0 place-items-center rounded-[5px] transition-colors" style={{ background: on ? C : "transparent", boxShadow: on ? "none" : `inset 0 0 0 1.5px ${t.off}` }}>{on && <Check size={11} strokeWidth={3} color="#fff" />}</span>
);
const Pop = ({ t, className, children }: { t: Theme; className: string; children: ReactNode }) => (
  <div className={`af-pop absolute z-30 rounded-2xl p-1.5 ${className}`} style={{ background: t.pop, boxShadow: `inset 0 0 0 1px ${t.line}, 0 24px 60px -18px rgb(0 0 0 / .45), 0 0 30px -14px ${a(0.45)}`, backdropFilter: "blur(20px)" }}>{children}</div>
);
function Fits({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [fits, setFits] = useState(true);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setFits(el.scrollWidth <= el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);
  return <span ref={ref} className="block overflow-hidden whitespace-nowrap text-[11.5px] leading-[1.35]" style={{ ...style, ...(fits ? {} : { height: 0, visibility: "hidden" }) }}>{children}</span>;
}
const Label = ({ t, children }: { t: Theme; children: ReactNode }) => <div className="px-2.5 pb-1.5 pt-0.5 text-[12px] font-medium" style={{ color: t.fg4 }}>{children}</div>;


// the pill switch, a shell piece: icons in a pill; the chosen one opens to show its name (Shaan's picture, 10 Oct)
function PillSwitch({ t, tabs, value, onChange }: { t: Theme; tabs: Tab[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-[14px] p-1" style={{ background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}` }}>
      {tabs.map((x) => {
        const on = x.id === value;
        return (
          <button key={x.id} onClick={() => onChange(x.id)} title={x.name} className="af-seg flex h-9 min-w-0 items-center justify-center rounded-[10px] text-[13.5px] font-medium"
            style={{ flexGrow: on ? 1 : 0, flexBasis: 40, color: on ? t.fg : t.fg3, background: on ? t.seg : "transparent", boxShadow: on ? `inset 0 0 0 1px ${t.line}, 0 1px 2px rgb(0 0 0 / .25)` : "none" }}>
            <span style={{ display: "grid" }}><AnimatedNavIcon icon={ICONS[x.icon]} size={16} active={on} /></span>
            <span className="af-seg-label overflow-hidden whitespace-nowrap" style={{ maxWidth: on ? 150 : 0, opacity: on ? 1 : 0, marginLeft: on ? 8 : 0 }}>{x.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function SideNav({ t, root, stack, go, page, setPage, onSearch, isOn, toggle, width, setWidth, fold, switchApp, eco, setEco, pk }: {
  t: Theme; root: Level; stack: Level[]; go: (s: Level[]) => void; page: string; setPage: (p: string) => void; onSearch: () => void; isOn: (it: Item) => boolean; toggle: (it: Item) => void;
  width: number; setWidth: (w: number) => void; fold: () => void; switchApp: (id: string) => void; eco: boolean; setEco: (v: boolean) => void; pk: Pkgs | null;
}) {
  const [help, setHelp] = useState<"" | "menu" | "releases">("");
  const [tabFor, setTabFor] = useState<Record<string, string>>({});
  const level = stack[stack.length - 1];
  const parent = stack[stack.length - 2];
  const tabs = eco ? undefined : level.tabs;
  const pageTab = tabs?.find((x) => level.groups.some((g) => x.groups.includes(g.name) && g.items.some((i) => i.id === page)));
  const tab = tabs ? tabs.find((x) => x.id === tabFor[level.id]) ?? pageTab ?? tabs[0] : undefined;
  const push = (l: Level) => { go([...stack, l]); setPage(first(l)); };
  const pop = () => { const s = stack.slice(0, -1); go(s); if (!pageIn(s[s.length - 1], page)) setPage(first(s[s.length - 1])); };
  const pick = (x: App) => { setEco(false); if (x.id !== app.id) switchApp(x.id); };
  // the rim lights next to the pointer, and along the edge while it resizes
  const spot = (e: React.MouseEvent<HTMLDivElement>) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); };
  const resize = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const wrap = e.currentTarget.parentElement!, x0 = e.clientX, w0 = width;
    const move = (ev: PointerEvent) => { const w = Math.round(Math.max(NAV_MIN, Math.min(NAV_MAX, w0 + ev.clientX - x0))); setWidth(w); wrap.style.setProperty("--mx", `${w}px`); wrap.style.setProperty("--my", `${ev.clientY - wrap.getBoundingClientRect().top}px`); };
    const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); document.documentElement.classList.remove("af-resizing"); };
    document.documentElement.classList.add("af-resizing");
    addEventListener("pointermove", move); addEventListener("pointerup", up);
  };
  const rows = (l: Level, tb?: Tab) => l.groups.filter((g) => !tb || tb.groups.includes(g.name)).map((g) => (
    <div key={g.name || "top"} className="mb-4">
      {g.name && g.name !== tb?.name && <Label t={t}>{g.name}</Label>}
      {g.items.map((it) => {
        const on = !it.kind && !it.open && it.id === page;
        const lit = isOn(it);
        return (
          <button key={it.id} onClick={() => (it.kind ? toggle(it) : it.open ? push(it.open) : setPage(it.id))} title={it.full}
            className={`af-row af-pill mb-[3px] flex w-full items-center gap-2.5 rounded-[11px] px-2.5 py-[7px] text-left text-[13.5px]${on ? " on" : ""}`} style={{ color: on ? t.fg : t.fg2, fontWeight: on ? 550 : 450, ["--hv" as any]: t.hover }}>
            {it.icon && <span style={{ color: on ? C : undefined, display: "grid" }}><AnimatedNavIcon icon={ICONS[it.icon]} active={on} size={16} /></span>}
            <span className="flex-1 truncate">{it.name}</span>
            {it.badge && <span className="rounded-full px-1.5 py-[1px] text-[10.5px] font-medium" style={{ color: C, background: a(0.14) }}>{it.badge}</span>}
            {it.n && <span className="text-[11.5px] tabular-nums" style={{ color: t.fg4 }}>{it.n}</span>}
            {it.open && <ChevronRight size={13} style={{ color: t.fg4 }} />}
            {it.kind === "toggle" && <Switch on={lit} t={t} />}
            {it.kind === "tick" && <Tick on={lit} t={t} />}
          </button>
        );
      })}
    </div>
  ));
  const ecoRows = ECO.map(([name, g]) => (
    <div key={g} className="mb-4">
      <Label t={t}>{name}</Label>
      {Object.values(APPS).filter((x) => x.group === g).map((x) => (
        <button key={x.id} onClick={() => pick(x)} className={`af-row af-pill mb-[3px] flex w-full items-center gap-2.5 rounded-[11px] px-2 py-[6px] text-left${x.id === app.id ? " on" : ""}`} style={{ ["--hv" as any]: t.hover }}>
          <Mark x={x} size={22} />
          <span className="min-w-0 flex-1"><span className="block truncate text-[13.5px] font-medium" style={{ color: t.fg }}>{x.name}</span><span className="block truncate text-[11.5px]" style={{ color: t.fg3 }}>{x.about}</span></span>
        </button>
      ))}
    </div>
  ));
  const list = eco ? ecoRows : rows(level, tab);
  // levels and tabs slide across: the old list leaves as the new one comes in (Shaan: "almost like it scrolls across")
  const key = eco ? "eco" : `${level.id}:${stack.length}:${tab?.id ?? ""}`;
  const depth = eco ? 0 : stack.length;
  const tabAt = tabs && tab ? tabs.indexOf(tab) : 0;
  const prev = useRef<{ key: string; node: ReactNode; depth: number; tabAt: number } | null>(null);
  const [leaving, setLeaving] = useState<{ node: ReactNode; dir: "in" | "out"; k: string } | null>(null);
  useLayoutEffect(() => {
    const p = prev.current;
    if (p && p.key !== key) setLeaving({ node: p.node, dir: depth > p.depth || (depth === p.depth && tabAt > p.tabAt) ? "in" : "out", k: key });
    prev.current = { key, node: list, depth, tabAt };
  });
  const releases = pk?.packages.find((x) => x.id === "side-nav")?.versions ?? [];
  const sub = eco ? "Every space and app" : parent ? level.about : app.about;
  return (
    <div className="af-navwrap relative h-full shrink-0" style={{ width }} onMouseMove={spot}>
      <HaloRim state="working" hue={C} className="af-rim" style={{ ["--rim-cyan" as any]: app.second, background: t.rim }}>
        <div className="af-spot" />
        <div className="flex h-full flex-col">
          {/* the header, as on 21st.dev: the way back beside the title, the fold on the right */}
          <div className="flex items-center gap-1">
            {eco ? <span className="af-orb grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full" style={{ ["--h" as any]: app.rgb }}><AgentFace name="SISO" hue={app.face} status="waiting" size={28} /></span>
              : parent ? <button onClick={pop} className="af-row grid h-9 w-8 shrink-0 place-items-center rounded-[10px]" style={{ color: t.fg2, ["--hv" as any]: t.hover }} title={`Back to ${parent.full ?? parent.name}`}><ChevronLeft size={19} /></button>
              : <button onClick={() => setEco(true)} className="af-press shrink-0 rounded-full" title="The SISO ecosystem"><Mark size={28} /></button>}
            <button onClick={() => setEco(!eco)} className="af-head flex min-w-0 flex-1 items-center rounded-[11px] px-1.5 py-1 text-left" title={eco ? `Back into ${app.name}` : "The SISO ecosystem"}>
              <span key={key} className="af-title min-w-0 flex-1">
                <span className="flex items-center gap-1"><span className="truncate text-[16px] font-semibold tracking-[-0.02em]" style={{ color: t.fg }}>{eco ? "SISO" : level.name}</span><ChevronDown size={15} className="shrink-0 transition-transform duration-200" style={{ color: t.fg3, transform: eco ? "rotate(180deg)" : undefined }} /></span>
                {sub && <Fits style={{ color: t.fg3 }}>{sub}</Fits>}
              </span>
            </button>
            <button onClick={fold} className="af-row grid h-9 w-9 shrink-0 place-items-center rounded-[10px]" style={{ color: t.fg3, ["--hv" as any]: t.hover }} title="Fold the side nav away (⌘B)"><PanelLeftClose size={17} /></button>
          </div>
          {/* search, full width on its own (21st.dev's) */}
          <button onClick={onSearch} className="af-search mt-2.5 flex h-9 w-full items-center gap-2 rounded-[11px] px-2.5 text-left" style={{ background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}`, color: t.fg3 }}>
            <span style={{ display: "grid" }}><AnimatedNavIcon icon={ICONS.search} size={15} /></span>
            <span className="min-w-0 flex-1 truncate text-[13px]">Search {eco ? "SISO" : level.name}</span>
            <kbd className="rounded-[6px] px-1.5 py-[1px] font-sans text-[10.5px]" style={{ color: t.fg4, boxShadow: `inset 0 0 0 1px ${t.line}` }}>⌘K</kbd>
          </button>
          {tabs && tab && <div className="mt-3"><PillSwitch t={t} tabs={tabs} value={tab.id} onChange={(id) => setTabFor({ ...tabFor, [level.id]: id })} /></div>}
          <div className="relative mt-4 min-h-0 flex-1 overflow-hidden">
            {leaving && <div key={`leave:${leaving.k}`} className={`af-leave-${leaving.dir} pointer-events-none absolute inset-0 overflow-hidden px-0.5`} onAnimationEnd={() => setLeaving(null)}>{leaving.node}</div>}
            <nav key={key} className={`${leaving ? `af-enter-${leaving.dir} ` : ""}h-full overflow-y-auto overflow-x-hidden px-0.5`}>{list}</nav>
          </div>
          {/* the foot: the version, clean and centred; it opens help, docs and the releases */}
          <div className="relative mt-1 flex justify-center">
            {help && (
              <Pop t={t} className="bottom-9 left-1/2 w-[236px] -translate-x-1/2">
                {help === "menu" ? (
                  <>
                    <div className="flex items-center gap-2.5 px-2 pb-2 pt-1"><Mark size={22} /><span className="min-w-0 flex-1"><span className="block truncate text-[13.5px] font-semibold" style={{ color: t.fg }}>{app.name} {app.version}</span><span className="block truncate text-[11.5px]" style={{ color: t.fg3 }}>{app.about}</span></span></div>
                    <div className="mx-2 mb-1 h-px" style={{ background: t.line }} />
                    {([["What's new", "sparkles", () => setHelp("releases")], ["Docs", "layers"], ["Changelog", "history", () => setHelp("releases")], ["Keyboard shortcuts", "terminal"], ["SISO on X, GitHub, YouTube", "users"]] as [string, Icon, (() => void)?][]).map(([n, i, fn]) => (
                      <button key={n} onClick={fn} className="af-row flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-[7px] text-left text-[13px]" style={{ color: t.fg2, ["--hv" as any]: t.hover }}><AnimatedNavIcon icon={ICONS[i]} size={15} /><span className="flex-1">{n}</span>{fn && <ChevronRight size={13} style={{ color: t.fg4 }} />}</button>
                    ))}
                  </>
                ) : (
                  <>
                    <button onClick={() => setHelp("menu")} className="af-row flex w-full items-center gap-1 rounded-[9px] px-1.5 py-1.5 text-left text-[12.5px] font-medium" style={{ color: t.fg2, ["--hv" as any]: t.hover }}><ChevronLeft size={15} />Releases</button>
                    <div className="max-h-[380px] overflow-y-auto px-1 pb-1">
                      {releases.map((v, i) => (
                        <div key={v.v} className="relative py-2 pl-5 pr-1">
                          <span className="absolute left-[6px] top-[13px] h-2 w-2 rounded-full" style={{ background: i === 0 ? C : t.off, boxShadow: i === 0 ? `0 0 8px ${C}` : "none" }} />
                          <div className="flex items-baseline gap-2"><span className="text-[13px] font-semibold" style={{ color: t.fg }}>{v.v}</span><span className="text-[11px]" style={{ color: t.fg4 }}>{v.when}</span></div>
                          <p className="mt-0.5 text-[12px] leading-snug" style={{ color: t.fg3 }}>{v.note}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Pop>
            )}
            <button onClick={() => setHelp(help ? "" : "menu")} className="af-press flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] tabular-nums" style={{ color: t.fg3 }} title="Help, docs and what's new">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: C, boxShadow: `0 0 8px ${C}` }} />{app.name} {app.version}
            </button>
          </div>
        </div>
      </HaloRim>
      {/* the edge: drag the rim itself to resize */}
      <div className="af-resize" onPointerDown={resize} onDoubleClick={() => setWidth(NAV_W)} title="Drag to resize · double-click to reset" />
    </div>
  );
}

// ── the dashboard: HALO's widget contract on a grid. A widget has a size (S to XL) and its content adapts to it; it
// moves from anywhere on its card, resizes from its corner, lights up on hover, and the Widgets menu hides or brings it back
type Size = "S" | "M" | "L" | "XL";
const SIZES: Record<Size, [number, number]> = { S: [3, 4], M: [4, 5], L: [6, 6], XL: [12, 7] };
const sizeOf = (w: number): Size => (w <= 3 ? "S" : w <= 5 ? "M" : w <= 8 ? "L" : "XL");
type W = { id: string; title: string; icon: Icon; size: Size; w?: number; h?: number; render: (s: Size) => ReactNode };
type Lay = { i: string; x: number; y: number; w: number; h: number };
const COLS = { lg: 12, md: 6, sm: 1 }, BREAKS = { lg: 900, md: 560, sm: 0 };
function useBoard(t: Theme, id: string, widgets: W[]) {
  const key = `af.board.v3.${id}`;
  const [saved, setSaved] = useState<{ lg?: Lay[]; hidden?: string[] }>(() => { try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch { return {}; } });
  const [menu, setMenu] = useState(false);
  const { width, containerRef, mounted } = useContainerWidth();
  const keep = (s: typeof saved) => { localStorage.setItem(key, JSON.stringify(s)); return s; };
  const hidden = new Set(saved.hidden ?? []);
  const shown = widgets.filter((w) => !hidden.has(w.id));
  const shape = widgets.map((w) => `${w.id}:${w.size}:${w.w ?? ""}:${w.h ?? ""}`).join(",");
  const lg = useMemo(() => {
    let x = 0, y = 0, rh = 0;
    const have = new Map((saved.lg ?? []).map((it) => [it.i, it]));
    return shown.map((w) => {
      const ww = w.w ?? SIZES[w.size][0], hh = w.h ?? SIZES[w.size][1];
      if (x + ww > 12) { x = 0; y += rh; rh = 0; }
      const auto = { i: w.id, x, y, w: ww, h: hh };
      x += ww; rh = Math.max(rh, hh);
      return { ...auto, ...(have.get(w.id) ?? {}), minW: 2, minH: 3 };
    });
  }, [shape, saved]);
  const at = new Map(lg.map((it) => [it.i, it]));
  const onLayoutChange = (_: unknown, all: any) => {
    const next = (all?.lg ?? []).map(({ i, x, y, w, h }: Lay) => ({ i, x, y, w, h }));
    if (next.length) setSaved((cur) => (JSON.stringify(cur.lg ?? []) === JSON.stringify(next) ? cur : keep({ ...cur, lg: next })));
  };
  const setSize = (wid: string, s: Size) => setSaved((cur) => keep({ ...cur, lg: (cur.lg ?? lg.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }))).map((it) => (it.i === wid ? { ...it, w: SIZES[s][0], h: Math.max(it.h, SIZES[s][1]) } : it)) }));
  const flip = (wid: string) => setSaved((cur) => { const hd = new Set(cur.hidden ?? []); const on = hd.has(wid); on ? hd.delete(wid) : hd.add(wid); return keep({ ...cur, hidden: [...hd], lg: on ? (cur.lg ?? []).filter((it) => it.i !== wid) : cur.lg }); });
  const controls = (
    <div className="relative">
      <button onClick={() => setMenu(!menu)} className="af-press flex h-9 items-center gap-2 rounded-xl px-3 text-[13px] font-medium" style={{ color: t.fg2, background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}` }}><SlidersHorizontal size={15} />Widgets</button>
      {menu && (
        <Pop t={t} className="right-0 top-full mt-2 w-64">
          <Label t={t}>On this dashboard</Label>
          {widgets.map((w) => (
            <button key={w.id} onClick={() => flip(w.id)} className="af-row flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-[7px] text-left text-[13px]" style={{ color: t.fg2, ["--hv" as any]: t.hover }}>
              <AnimatedNavIcon icon={ICONS[w.icon]} size={15} /><span className="min-w-0 flex-1 truncate">{w.title}</span><Switch on={!hidden.has(w.id)} t={t} />
            </button>
          ))}
          <div className="mx-2 my-1.5 h-px" style={{ background: t.line }} />
          <button onClick={() => { localStorage.removeItem(key); setSaved({}); setMenu(false); }} className="af-row flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-[7px] text-left text-[13px]" style={{ color: t.fg3, ["--hv" as any]: t.hover }}><RotateCcw size={14} />Put it back as it was</button>
        </Pop>
      )}
    </div>
  );
  const grid = (
    <div ref={containerRef} className="-mx-2 mt-6">
      {mounted && (
        <ResponsiveGridLayout width={width} layouts={{ lg }} breakpoints={BREAKS} cols={COLS} rowHeight={34} margin={[16, 16]} containerPadding={[8, 0]} dragConfig={{ handle: ".af-widget", cancel: "button, a, input, .af-strip" }} resizeConfig={{ handles: ["se"] }} onLayoutChange={onLayoutChange}>
          {shown.map((w) => {
            const s = sizeOf(at.get(w.id)?.w ?? SIZES[w.size][0]);
            return (
              <div key={w.id}>
                <section className="af-widget flex h-full flex-col overflow-hidden rounded-[18px]" style={{ background: t.wbg }}>
                  <header className="flex h-11 shrink-0 items-center gap-2 pl-3.5 pr-2">
                    <span style={{ color: C, display: "grid" }}><AnimatedNavIcon icon={ICONS[w.icon]} size={15} /></span>
                    <h3 className="min-w-0 flex-1 truncate text-[13px] font-medium" style={{ color: t.fg2 }}>{w.title}</h3>
                    <span className="af-wtools flex items-center gap-0.5 rounded-[9px] p-0.5" style={{ background: t.hover }}>
                      {(["S", "M", "L", "XL"] as Size[]).map((z) => <button key={z} onClick={() => setSize(w.id, z)} className="af-press rounded-[7px] px-1.5 py-[2px] text-[10.5px] font-semibold" style={{ color: z === s ? C : t.fg4, background: z === s ? a(0.14) : undefined }} title={`Size ${z}`}>{z}</button>)}
                      <button onClick={() => flip(w.id)} className="af-press grid h-[20px] w-[20px] place-items-center rounded-[7px]" style={{ color: t.fg4 }} title={`Hide ${w.title}`}><X size={12} /></button>
                    </span>
                  </header>
                  <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4">{w.render(s)}</div>
                </section>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      )}
    </div>
  );
  return { controls, grid };
}
const Big = ({ t, v, dim }: { t: Theme; v: string; dim?: boolean }) => <div className="text-[38px] font-semibold leading-none tracking-[-0.03em] tabular-nums" style={{ color: dim ? t.fg3 : C }}>{v}</div>;
const Sub = ({ t, children }: { t: Theme; children: ReactNode }) => <div className="mt-2 text-[13px]" style={{ color: t.fg3 }}>{children}</div>;
const Stat = ({ t, v, l, dim }: { t: Theme; v: string; l: string; dim?: boolean }) => <div><Big t={t} v={v} dim={dim} /><div className="mt-1.5 text-[13px]" style={{ color: t.fg3 }}>{l}</div></div>;
const Meter = ({ t, v }: { t: Theme; v: number }) => <div className="mt-4 h-2 overflow-hidden rounded-full" style={{ background: t.line }}><div className="h-full rounded-full" style={{ width: `${Math.max(1, v * 100)}%`, background: `linear-gradient(90deg, ${C}, ${app.second})` }} /></div>;
function Bars({ t, rows, max = 99 }: { t: Theme; rows: [string, number, (() => void)?][]; max?: number }) {
  const top = Math.max(1, ...rows.map((r) => r[1]));
  return (
    <div className="-mx-1.5 space-y-0.5">
      {rows.slice(0, max).map(([l, n, go]) => (
        <button key={l} onClick={go} disabled={!go} className="af-row block w-full rounded-lg px-1.5 py-1.5 text-left disabled:cursor-default" style={{ ["--hv" as any]: go ? t.hover : "transparent" }}>
          <span className="flex items-baseline justify-between gap-3 text-[12.5px]"><span className="truncate" style={{ color: t.fg2 }}>{l}</span><span className="tabular-nums" style={{ color: t.fg3 }}>{fmt(n)}</span></span>
          <span className="mt-1.5 block h-[5px] overflow-hidden rounded-full" style={{ background: t.line }}><span className="block h-full rounded-full" style={{ width: `${Math.max(2, (n / top) * 100)}%`, background: `linear-gradient(90deg, ${C}, ${app.second})` }} /></span>
        </button>
      ))}
    </div>
  );
}

// ── parts: a card with the real preview; click for the drawer with its install line ───────────────────────────────
function Thumb({ t, r }: { t: Theme; r: Row }) {
  const [bad, setBad] = useState(false);
  const src = img(r);
  return (
    <div className="aspect-[16/10] overflow-hidden" style={{ background: t.thumb }}>
      {src && !bad ? <img src={src} alt={r.t} loading="lazy" onError={() => setBad(true)} className="h-full w-full object-cover transition-transform duration-500" /> : <div className="grid h-full place-items-center px-4 text-center text-[15px] font-semibold" style={{ color: t.fg3 }}>{r.t}</div>}
    </div>
  );
}
function Card({ t, h, r, onOpen }: { t: Theme; h: Hub; r: Row; onOpen: (r: Row) => void }) {
  return (
    <button onClick={() => onOpen(r)} className="af-comp block overflow-hidden rounded-2xl text-left" style={{ background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}`, ["--hv" as any]: a(0.5) }}>
      <Thumb t={t} r={r} />
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="min-w-0 flex-1"><span className="block truncate text-[13px] font-medium" style={{ color: t.fg }}>{r.t}</span><span className="block truncate text-[11.5px]" style={{ color: t.fg3 }}>{r.a ?? r.s} · {h.labelOf.get(r.c ?? "") ?? r.k}</span></span>
        {isPicked(r) && <span title="Picked" style={{ color: C, display: "grid" }}><Check size={14} strokeWidth={3} /></span>}
        {r.u ? <span className="text-[11px] tabular-nums" style={{ color: t.fg4 }}>{fmt(r.u)}</span> : null}
      </div>
    </button>
  );
}

const Cards = ({ t, h, rows, min = 220, strip, onOpen }: { t: Theme; h: Hub; rows: Row[]; min?: number; strip?: boolean; onOpen: (r: Row) => void }) => (
  <div className={strip ? "af-strip -mx-1 grid gap-3.5 overflow-x-auto px-1 pb-1" : "grid gap-4"} style={strip ? { gridAutoFlow: "column", gridAutoColumns: `${min}px` } : { gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))` }}>
    {rows.map((r) => <Card key={r.id} t={t} h={h} r={r} onOpen={onOpen} />)}
  </div>
);
const StatusChip = ({ t, s }: { t: Theme; s: string }) => (
  <span className="shrink-0 rounded-full px-2 py-[1px] text-[10.5px] font-medium" style={s === "Locked" ? { color: "#fff", background: C } : s === "New" ? { color: C, background: a(0.14) } : { color: t.fg3, boxShadow: `inset 0 0 0 1px ${t.line}` }}>{s}</span>
);
const PageHead = ({ t, icon, mark, title, about, actions }: { t: Theme; icon?: Icon; mark?: boolean; title: string; about: string; actions?: ReactNode }) => (
  <div className="flex items-center gap-4">
    {mark ? <Mark size={40} /> : <Tile icon={icon} size={46} />}
    <div className="min-w-0 flex-1"><h1 className="truncate text-[26px] font-semibold leading-tight tracking-[-0.025em]" style={{ color: t.fg }}>{title}</h1><p className="mt-1 truncate text-[13.5px]" style={{ color: t.fg3 }}>{about}</p></div>
    {actions}
  </div>
);
type Head = (actions?: ReactNode) => ReactNode;

// ── the pages ────────────────────────────────────────────────────────────────────────────────────────────────────
function HubHome({ t, h, head, openSec, onOpen }: { t: Theme; h: Hub; head: Head; openSec: (s: string) => void; onOpen: (r: Row) => void }) {
  const s = h.stats;
  const top = useMemo(() => h.items.filter((r) => r.p && r.k !== "resource").sort((x, y) => (y.u ?? 0) - (x.u ?? 0)).slice(0, 12), [h]);
  const picks = useMemo(() => h.items.filter((r) => r.p && (r.sig === "love" || r.sig === "star" || r.st === "picked" || r.st === "ours")).sort((x, y) => (RANK[y.st] ?? 0) - (RANK[x.st] ?? 0)).slice(0, 12), [h]);
  const secs = h.nav.map((x) => [x.section, h.bySec.get(x.section)?.length ?? 0] as [string, number]).sort((x, y) => y[1] - x[1]);
  const srcs = Object.entries(s.by_source as Record<string, number>).sort((x, y) => y[1] - x[1]);
  const sig = (s.by_signal ?? {}) as Record<string, number>;
  const b = useBoard(t, "ui.home", [
    { id: "total", title: "Total indexed", icon: "gauge", size: "S", render: (z) => <><Big t={t} v={fmt(s.total)} /><Sub t={t}>{z === "S" ? `${s.categories} categories` : `parts across ${s.categories} categories, by ${fmt(s.authors)} authors`}</Sub></> },
    { id: "funnel", title: "The funnel", icon: "activity", size: "L", h: 4, render: (z) => <div className="flex flex-wrap gap-x-9 gap-y-3"><Stat t={t} v={fmt(s.gone_through)} l="gone through" />{z !== "S" && <Stat t={t} v={fmt(s.left_in_corpus)} l="left to go" dim />}{(z === "L" || z === "XL") && <><Stat t={t} v={fmt(s.by_status?.picked ?? 0)} l="picked" /><Stat t={t} v={fmt(s.bookmarked ?? 0)} l="saved" /></>}</div> },
    { id: "signals", title: "His picks", icon: "sparkles", size: "S", render: (z) => <Bars t={t} max={z === "S" ? 3 : 5} rows={["love", "good", "maybe", "star", "meh"].map((k) => [k[0].toUpperCase() + k.slice(1), sig[k] ?? 0] as [string, number])} /> },
    { id: "sections", title: "By section", icon: "layers", size: "M", h: 7, render: (z) => <Bars t={t} max={z === "S" ? 3 : z === "M" ? 6 : 10} rows={secs.map(([n, c]) => [short(n), c, () => openSec(n)])} /> },
    { id: "sources", title: "By source", icon: "compass", size: "M", h: 7, render: (z) => <Bars t={t} max={z === "S" ? 3 : z === "M" ? 6 : 12} rows={srcs} /> },
    { id: "picks", title: "Picked lately", icon: "stamp", size: "M", h: 7, render: () => <Cards strip t={t} h={h} rows={picks} min={200} onOpen={onOpen} /> },
    { id: "most", title: "Most used", icon: "zap", size: "XL", h: 7, render: () => <Cards strip t={t} h={h} rows={top} min={230} onOpen={onOpen} /> },
  ]);
  return <>{head(b.controls)}{b.grid}</>;
}
function SectionHome({ t, h, sec, head, pick, onOpen }: { t: Theme; h: Hub; sec: string; head: Head; pick: (label: string) => void; onOpen: (r: Row) => void }) {
  const rows = h.bySec.get(sec) ?? [];
  const s = h.nav.find((x) => x.section === sec)!;
  const gone = rows.filter((r) => r.st !== "indexed").length;
  const picked = rows.filter(isPicked);
  const byA = new Map<string, number>();
  for (const r of rows) byA.set(r.a ?? r.s, (byA.get(r.a ?? r.s) ?? 0) + 1);
  const topA = [...byA].sort((x, y) => y[1] - x[1])[0] ?? ["none", 0];
  const cats = [...s.items].sort((x, y) => y.n - x.n);
  const b = useBoard(t, `ui.${slug(sec)}`, [
    { id: "size", title: `In ${short(sec)}`, icon: "gauge", size: "S", render: (z) => <><Big t={t} v={fmt(rows.length)} /><Sub t={t}>{z === "S" ? `${s.items.length} categories` : `${s.items.length} categories, by ${fmt(byA.size)} authors`}</Sub></> },
    { id: "gone", title: "Gone through", icon: "activity", size: "L", h: 4, render: (z) => <><div className="flex flex-wrap gap-x-9 gap-y-3"><Stat t={t} v={fmt(gone)} l="gone through" />{z !== "S" && <Stat t={t} v={fmt(rows.length - gone)} l="left" dim />}{(z === "L" || z === "XL") && <Stat t={t} v={fmt(picked.length)} l="picked" />}</div>{z !== "S" && <Meter t={t} v={gone / Math.max(1, rows.length)} />}</> },
    { id: "author", title: "Top author", icon: "users", size: "S", render: (z) => <><div className="truncate text-[24px] font-semibold tracking-[-0.02em]" style={{ color: t.fg }}>{topA[0]}</div><Sub t={t}>{fmt(topA[1])} parts here{z === "S" ? "" : `, of ${fmt(byA.size)} authors`}</Sub></> },
    { id: "cats", title: "Biggest categories", icon: "layers", size: "M", h: 8, render: (z) => <Bars t={t} max={z === "S" ? 4 : z === "M" ? 7 : 12} rows={cats.map((c) => [short(c.label), c.n, () => pick(c.label)])} /> },
    { id: "most", title: "Most used here", icon: "zap", size: "L", w: 8, h: 8, render: () => <Cards strip t={t} h={h} rows={rows.filter((r) => r.p).slice(0, 12)} min={240} onOpen={onOpen} /> },
    { id: "picks", title: "His picks here", icon: "stamp", size: "XL", h: 7, render: () => (picked.length ? <Cards strip t={t} h={h} rows={picked.slice(0, 14)} min={220} onOpen={onOpen} /> : <Sub t={t}>Nothing picked here yet.</Sub>) },
  ]);
  return <>{head(b.controls)}{b.grid}</>;
}
function LevelDash({ t, level, head, open }: { t: Theme; level: Level; head: Head; open: (it: Item) => void }) {
  const items = allItems(level).filter((i) => !i.kind && i.id !== "dash");
  const b = useBoard(t, `${app.id}.${level.id}`, items.map((it): W => ({ id: it.id, title: it.full ?? it.name, icon: it.icon ?? "box", size: "M", h: 4, render: (z) => (
    <button onClick={() => open(it)} className="af-press flex h-full w-full flex-col items-start text-left">
      {it.n ? <span className="text-[30px] font-semibold tabular-nums tracking-[-0.02em]" style={{ color: t.fg }}>{it.n}</span> : <span className="text-[15px] font-medium" style={{ color: t.fg2 }}>Open {it.name}</span>}
      {z !== "S" && <span className="mt-auto pt-2 text-[12.5px]" style={{ color: t.fg3 }}>{it.open?.about ?? `Open ${it.name}`} ›</span>}
    </button>
  ) })));
  return <>{head(b.controls)}{b.grid}</>;
}

// ── SISO packages: every UI package and piece, with each version (Shaan: "how many times you've iterated") ─────────
function Packages({ t, pk, head }: { t: Theme; pk: Pkgs | null; head: Head }) {
  const [open, setOpen] = useState<Pkg | null>(null);
  if (!pk) return <>{head()}<Sub t={t}>Loading the packages…</Sub></>;
  const design = pk.packages.filter((p) => p.versions?.length);
  const code = pk.packages.filter((p) => !p.versions?.length);
  const iters = design.reduce((n, p) => n + (p.versions?.length ?? 0), 0);
  const shot = (p: Pkg) => p.versions?.find((v) => v.shot)?.shot;
  const card = (p: Pkg) => (
    <button key={p.id} onClick={() => setOpen(p)} className="af-comp block overflow-hidden rounded-2xl text-left" style={{ background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}`, ["--hv" as any]: a(0.5) }}>
      <div className="aspect-[16/10] overflow-hidden" style={{ background: t.thumb }}>{shot(p) ? <img src={SHOTS + shot(p)} alt="" loading="lazy" className="h-full w-full object-cover object-left-top transition-transform duration-500" /> : <div className="grid h-full place-items-center"><Tile icon={p.icon} size={54} /></div>}</div>
      <div className="px-3.5 py-3">
        <div className="flex items-center gap-2"><span className="min-w-0 flex-1 truncate text-[14px] font-semibold" style={{ color: t.fg }}>{p.name}</span><StatusChip t={t} s={p.status} /></div>
        <div className="mt-0.5 truncate text-[12px]" style={{ color: t.fg3 }}>{p.pkg ?? (p.parent ? `a piece of ${p.parent}` : "")}</div>
        <div className="mt-2.5 flex items-center gap-2.5 text-[12px] tabular-nums" style={{ color: t.fg2 }}>
          {p.versions?.length ? <><span className="font-semibold" style={{ color: C }}>{p.versions[0].v}</span><span>{p.versions.length} {p.versions.length === 1 ? "version" : "versions"}</span><span className="truncate" style={{ color: t.fg4 }}>{p.versions[0].when}</span></> : <span>{p.code?.version} · {p.code?.commits} commits</span>}
        </div>
      </div>
    </button>
  );
  const chips = <div className="flex items-center gap-2">{[[String(pk.packages.length), "packages"], [String(design.length), "in design"], [String(iters), "iterations"]].map(([v, l]) => <span key={l} className="rounded-xl px-3 py-1.5 text-[12.5px]" style={{ color: t.fg3, background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}` }}><b className="mr-1 tabular-nums" style={{ color: t.fg }}>{v}</b>{l}</span>)}</div>;
  return (
    <>
      {head(chips)}
      <h2 className="mb-3 mt-8 text-[15px] font-semibold" style={{ color: t.fg }}>In design <span className="font-normal" style={{ color: t.fg4 }}>· the pieces we iterate on</span></h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>{design.map(card)}</div>
      <h2 className="mb-3 mt-10 text-[15px] font-semibold" style={{ color: t.fg }}>In code <span className="font-normal" style={{ color: t.fg4 }}>· Agent Base's packages/</span></h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>{code.map(card)}</div>
      {open && <PkgDrawer t={t} pk={pk} p={open} close={() => setOpen(null)} />}
    </>
  );
}
function PkgDrawer({ t, pk, p, close }: { t: Theme; pk: Pkgs; p: Pkg; close: () => void }) {
  const vs = p.versions ?? [];
  return (
    <div className="fixed inset-0 z-40" onClick={close}>
      <aside className="af-drawer absolute bottom-3 right-3 top-3 flex w-[480px] max-w-[92vw] flex-col overflow-hidden rounded-[22px]" onClick={(e) => e.stopPropagation()} style={{ background: t.pop, boxShadow: `inset 0 0 0 1px ${t.line}, 0 30px 80px -20px rgb(0 0 0 / .6), 0 0 40px -16px ${a(0.5)}`, backdropFilter: "blur(18px) saturate(1.4)" }}>
        <div className="flex items-center gap-3 px-4 pb-3 pt-4">
          <Tile icon={p.icon} size={40} />
          <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="truncate text-[17px] font-semibold" style={{ color: t.fg }}>{p.name}</span><StatusChip t={t} s={p.status} /></div><div className="truncate text-[12px]" style={{ color: t.fg3 }}>{p.pkg ?? `a piece of ${p.parent}`}</div></div>
          <button onClick={close} className="af-row grid h-8 w-8 place-items-center rounded-lg" style={{ color: t.fg3, ["--hv" as any]: t.hover }} title="Close (esc)"><X size={16} /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
          <p className="text-[13.5px] leading-relaxed" style={{ color: t.fg2 }}>{p.about}</p>
          {p.code && <div className="mt-3 flex flex-wrap gap-1.5">{[`v${p.code.version}`, `${p.code.commits} commits`, `${p.code.first} → ${p.code.last}`].map((x) => <span key={x} className="rounded-lg px-2 py-1 text-[11.5px] tabular-nums" style={{ color: t.fg2, background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}` }}>{x}</span>)}</div>}
          {vs.length ? (
            <>
              <div className="mb-3 mt-6 text-[12px] font-medium" style={{ color: t.fg4 }}>{vs.length} {vs.length === 1 ? "version" : "versions"}, newest first</div>
              {vs.map((v, i) => (
                <div key={v.v} className="relative pb-6 pl-6">
                  {i < vs.length - 1 && <span className="absolute bottom-0 left-[7px] top-4 w-px" style={{ background: t.line }} />}
                  <span className="absolute left-[3px] top-[5px] h-[9px] w-[9px] rounded-full" style={{ background: i === 0 ? C : t.off, boxShadow: i === 0 ? `0 0 10px ${C}` : "none" }} />
                  <div className="flex items-baseline gap-2"><span className="text-[14px] font-semibold" style={{ color: t.fg }}>{v.v}</span><span className="text-[11.5px] tabular-nums" style={{ color: t.fg4 }}>{v.when}{v.commit ? ` · ${v.commit}` : ""}</span></div>
                  <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: t.fg2 }}>{v.note}</p>
                  {v.shot && <img src={SHOTS + v.shot} alt={`${p.name} ${v.v}`} loading="lazy" className="mt-2.5 w-full rounded-xl" style={{ boxShadow: `0 0 0 1px ${t.line}` }} />}
                </div>
              ))}
            </>
          ) : <Sub t={t}>No design versions yet: this one is code only so far.</Sub>}
        </div>
      </aside>
    </div>
  );
}

function Detail({ t, h, r, close }: { t: Theme; h: Hub; r: Row; close: () => void }) {
  const [full, setFull] = useState<Record<string, any> | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setFull(null); loadFull(r.id).then((d) => setFull(d ?? {}), () => setFull({})); }, [r.id]);
  const install: string | undefined = full?.install;
  const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return "the source"; } };
  return (
    <div className="fixed inset-0 z-40" onClick={close}>
      <aside className="af-drawer absolute bottom-3 right-3 top-3 flex w-[440px] max-w-[92vw] flex-col overflow-hidden rounded-[22px]" onClick={(e) => e.stopPropagation()} style={{ background: t.pop, boxShadow: `inset 0 0 0 1px ${t.line}, 0 30px 80px -20px rgb(0 0 0 / .6), 0 0 40px -16px ${a(0.5)}`, backdropFilter: "blur(18px) saturate(1.4)" }}>
        <div className="flex items-center gap-2 px-4 pt-3"><span className="truncate text-[12px]" style={{ color: t.fg3 }}>{h.labelOf.get(r.c ?? "") ?? r.k} · {r.s}</span><button onClick={close} className="af-row ml-auto grid h-8 w-8 place-items-center rounded-lg" style={{ color: t.fg3, ["--hv" as any]: t.hover }} title="Close (esc)"><X size={16} /></button></div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-5">
          <div className="mt-1.5 overflow-hidden rounded-2xl" style={{ boxShadow: `inset 0 0 0 1px ${t.line}` }}><Thumb key={r.id} t={t} r={r} /></div>
          <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em]" style={{ color: t.fg }}>{r.t}</h2>
          <div className="mt-0.5 text-[13px]" style={{ color: t.fg3 }}>by {r.a ?? r.s}{r.u ? ` · ${fmt(r.u)} uses` : ""}{isPicked(r) ? " · picked" : ""}</div>
          {r.d && <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: t.fg2 }}>{r.d}</p>}
          {full?.pick?.why && <div className="mt-3 rounded-xl px-3 py-2.5 text-[12.5px] leading-relaxed" style={{ color: t.fg2, background: a(0.08), boxShadow: `inset 0 0 0 1px ${a(0.25)}` }}><b style={{ color: C }}>Why it's picked: </b>{full.pick.why}</div>}
          {install && (
            <>
              <div className="mb-1.5 mt-5 text-[12px] font-medium" style={{ color: t.fg4 }}>Install</div>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 font-mono text-[12px]" style={{ background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}`, color: t.fg2 }}>
                <span className="min-w-0 flex-1 break-all">{install}</span>
                <button onClick={() => { navigator.clipboard?.writeText(install); setCopied(true); setTimeout(() => setCopied(false), 1200); }} className="af-row grid h-7 w-7 shrink-0 place-items-center rounded-md" style={{ color: copied ? C : t.fg3, ["--hv" as any]: t.hover }} title="Copy">{copied ? <Check size={14} /> : <Copy size={14} />}</button>
              </div>
            </>
          )}
          {full?.licence && <div className="mt-3 text-[12.5px]" style={{ color: t.fg3 }}>Licence: {String(full.licence)}</div>}
          {full === null && <div className="mt-5 text-[12.5px]" style={{ color: t.fg4 }}>Loading its full record…</div>}
          {full?.url && <a href={full.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-medium text-white" style={{ background: C }}>Open on {host(full.url)} <ExternalLink size={13} /></a>}
        </div>
      </aside>
    </div>
  );
}


function Browse({ t, h, sec, cats, picked, oursFirst, untick, onOpen }: { t: Theme; h: Hub; sec: string; cats: Set<string>; picked: boolean; oursFirst: boolean; untick: (label: string) => void; onOpen: (r: Row) => void }) {
  const s = h.nav.find((x) => x.section === sec)!;
  const live = s.items.filter((c) => cats.has(c.label));
  const all = h.bySec.get(sec) ?? [];
  const [qs, setQs] = useState("");
  const [sort, setSort] = useState<"used" | "best" | "az">("used");
  const [limit, setLimit] = useState(24);
  const tickKey = live.map((c) => c.label).join("|");
  useEffect(() => { setLimit(24); }, [qs, sort, tickKey, picked]);
  const list = useMemo(() => {
    const allow = live.length ? new Set(live.flatMap((c) => c.categories)) : null;
    const ql = qs.trim().toLowerCase();
    let l = all.filter((r) => (!allow || allow.has(r.c ?? "")) && (!picked || isPicked(r)) && (!ql || `${r.t} ${r.a ?? ""} ${r.d ?? ""} ${h.labelOf.get(r.c ?? "") ?? ""}`.toLowerCase().includes(ql)));
    if (sort === "az") l = [...l].sort((x, y) => x.t.localeCompare(y.t));
    if (sort === "best") l = [...l].sort((x, y) => (RANK[y.st] ?? 0) * 1e7 + (y.u ?? 0) - ((RANK[x.st] ?? 0) * 1e7 + (x.u ?? 0)));
    if (oursFirst) l = [...l].sort((x, y) => Number(y.st === "ours") - Number(x.st === "ours"));
    return l;
  }, [h, sec, qs, sort, picked, oursFirst, tickKey]);
  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-[260px] flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5" style={{ background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}` }}>
          <span style={{ color: t.fg3, display: "grid" }}><AnimatedNavIcon icon={ICONS.search} size={16} /></span>
          <input value={qs} onChange={(e) => setQs(e.target.value)} placeholder={`Search ${fmt(all.length)} in ${sec}: hero, pricing, navbar…`} className="flex-1 bg-transparent text-[14px] outline-none" style={{ color: t.fg }} />
        </div>
        <div className="flex items-center rounded-xl p-1" style={{ background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}` }}>
          {([["used", "Most used"], ["best", "Best first"], ["az", "A–Z"]] as const).map(([k, n]) => <button key={k} onClick={() => setSort(k)} className="rounded-lg px-2.5 py-1.5 text-[12.5px]" style={{ color: sort === k ? t.fg : t.fg3, background: sort === k ? t.hover : undefined, boxShadow: sort === k ? `inset 0 0 0 1px ${a(0.45)}` : undefined }}>{n}</button>)}
        </div>
        <span className="text-[13px] tabular-nums" style={{ color: t.fg3 }}>{fmt(list.length)} shown</span>
      </div>
      {live.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{live.map((c) => <button key={c.label} onClick={() => untick(c.label)} className="flex items-center gap-1 rounded-full py-1 pl-2.5 pr-2 text-[12px]" style={{ color: C, background: a(0.1), boxShadow: `inset 0 0 0 1px ${a(0.35)}` }}>{c.label}<X size={12} /></button>)}</div>}
      <div className="mt-5"><Cards t={t} h={h} rows={list.slice(0, limit)} onOpen={onOpen} /></div>
      {list.length > limit && <div className="mt-6 grid place-items-center"><button onClick={() => setLimit(limit + 48)} className="af-row rounded-xl px-4 py-2 text-[13px]" style={{ color: t.fg2, boxShadow: `inset 0 0 0 1px ${t.line}`, ["--hv" as any]: t.hover }}>Show more · {fmt(list.length - limit)} left</button></div>}
    </div>
  );
}

const IconWall = ({ t }: { t: Theme }) => (
  <div className="mt-6 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}>
    {(Object.keys(ICONS) as Icon[]).map((k) => <div key={k} className="af-comp grid place-items-center gap-2 rounded-2xl py-5" style={{ background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}`, color: t.fg2, ["--hv" as any]: a(0.5) }}><AnimatedNavIcon icon={ICONS[k]} size={26} /><span className="text-[12px]" style={{ color: t.fg3 }}>{k}</span></div>)}
  </div>
);
const Faces = ({ t }: { t: Theme }) => (
  <>
    <div className="mt-6 flex flex-wrap gap-8">{Object.values(APPS).map((x) => <div key={x.id} className="grid place-items-center gap-2"><Mark x={x} size={52} /><span className="text-[12px]" style={{ color: t.fg3 }}>{x.name}</span></div>)}</div>
    <h2 className="mt-10 text-[17px] font-semibold" style={{ color: t.fg }}>Agent faces</h2>
    <div className="mt-4 flex flex-wrap gap-8">{([["Agent Zero", 232, "working"], ["ECOSYSTEM", 265, "waiting"], ["AGENT-BASE", 205, "working"], ["APP-FACTORY", 145, "needs-shaan"], ["HALO", 30, "done"]] as [string, number, any][]).map(([n, hue, st]) => <div key={n} className="grid place-items-center gap-2"><AgentFace name={n} hue={hue} status={st} size={64} interactive /><span className="text-[12px]" style={{ color: t.fg3 }}>{n}</span></div>)}</div>
  </>
);


// ── search: the SISO spotlight. The rim, a filter per section, a preview beside the results ──────────────────────
type Hit = { key: string; icon: ReactNode; title: string; sub?: string; n?: string; run: () => void; row?: Row };
function Spotlight({ t, find, filters, place, close, dark }: { t: Theme; find: (q: string, only: string | null) => Hit[]; filters: string[]; place: string; close: () => void; dark: boolean }) {
  const [qs, setQs] = useState("");
  const [only, setOnly] = useState<string | null>(null);
  const [at, setAt] = useState(0);
  const hits = useMemo(() => find(qs, only), [qs, only]);
  const cur = hits[Math.min(at, hits.length - 1)];
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setAt((v) => Math.min(v + 1, hits.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setAt((v) => Math.max(v - 1, 0)); }
    if (e.key === "Enter" && cur) { close(); cur.run(); }
  };
  return (
    <div className="fixed inset-0 z-50 grid justify-center pt-[12vh]" style={{ background: `rgb(0 0 0 / ${dark ? 0.45 : 0.18})`, backdropFilter: "blur(3px)", alignItems: "start" }} onClick={close}>
      <HaloRim state="idle" hue={C} className="af-pop w-[min(760px,92vw)] overflow-hidden" onClick={(e) => e.stopPropagation()} style={{ padding: 0, borderRadius: 20, background: t.pop, backdropFilter: "blur(18px) saturate(1.4)", ["--rim-cyan" as any]: app.second }}>
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: `1px solid ${t.line}` }}>
          <span style={{ color: t.fg3, display: "grid" }}><AnimatedNavIcon icon={ICONS.search} size={17} active /></span>
          <input autoFocus value={qs} onChange={(e) => { setQs(e.target.value); setAt(0); }} onKeyDown={key} placeholder={`Search ${place}…`} className="flex-1 bg-transparent text-[15px] outline-none" style={{ color: t.fg }} />
          <kbd className="rounded-md px-1.5 py-[1px] text-[11px]" style={{ color: t.fg3, background: t.hover }}>esc</kbd>
        </div>
        {filters.length > 0 && <div className="flex flex-wrap gap-1.5 px-3 pt-2.5">{[null, ...filters].map((f) => <button key={f ?? "all"} onClick={() => { setOnly(f); setAt(0); }} className="rounded-full px-2.5 py-1 text-[12px] transition-colors" style={{ color: only === f ? "#fff" : t.fg3, background: only === f ? C : t.hover }}>{f ?? "All"}</button>)}</div>}
        <div className="flex">
          <div className="max-h-[440px] min-w-0 flex-1 overflow-y-auto p-1.5">
            {hits.length === 0 && <div className="px-3 py-6 text-[13px]" style={{ color: t.fg3 }}>Nothing for “{qs}”.</div>}
            {hits.map((x, i) => (
              <button key={x.key} onMouseEnter={() => setAt(i)} onClick={() => { close(); x.run(); }} className="flex w-full items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-left" style={{ background: i === at ? t.hover : undefined, boxShadow: i === at ? `inset 0 0 0 1px ${a(0.35)}` : undefined }}>
                {x.icon}
                <span className="min-w-0 flex-1"><span className="block truncate text-[13.5px]" style={{ color: t.fg }}>{x.title}</span>{x.sub && <span className="block truncate text-[11.5px]" style={{ color: t.fg3 }}>{x.sub}</span>}</span>
                {x.n && <span className="text-[11px] tabular-nums" style={{ color: t.fg4 }}>{x.n}</span>}
              </button>
            ))}
          </div>
          {cur?.row && (
            <div className="w-[290px] shrink-0 p-3" style={{ borderLeft: `1px solid ${t.line}` }}>
              <div className="overflow-hidden rounded-xl" style={{ boxShadow: `inset 0 0 0 1px ${t.line}` }}><Thumb key={cur.row.id} t={t} r={cur.row} /></div>
              <div className="mt-3 text-[14px] font-semibold" style={{ color: t.fg }}>{cur.row.t}</div>
              <div className="mt-0.5 text-[12px]" style={{ color: t.fg3 }}>{cur.sub}</div>
              {cur.row.d && <p className="mt-2 line-clamp-4 text-[12.5px] leading-relaxed" style={{ color: t.fg2 }}>{cur.row.d}</p>}
              <div className="mt-3 text-[11.5px]" style={{ color: t.fg4 }}>↵ opens it, with its install line</div>
            </div>
          )}
        </div>
      </HaloRim>
    </div>
  );
}


export default function Root() {
  const [mode, setMode] = useState<"dark" | "light">((q.get("theme") as any) || (localStorage.getItem("af-theme") as any) || "dark");
  const t = THEMES[mode];
  const [appId, setAppId] = useState(app.id);
  const hx = useHub();
  const pk = usePkgs();
  const root = useMemo(() => (appId === "factory" ? factoryRoot(uiHub(hx, pk)) : APPS[appId].root), [appId, hx, pk]);
  const [path, setPath] = useState<string[]>(START.path);
  const [page, setPage] = useState(START.page);
  const stack = resolve(root, path);
  const level = stack[stack.length - 1];
  const go = (s: Level[]) => setPath(s.slice(1).map((l) => l.id));
  const [eco, setEco] = useState(false);
  const [navW, setNavW] = useState(() => Number(localStorage.getItem("af-nav-w")) || NAV_W);
  const [folded, setFolded] = useState(false);
  const [search, setSearch] = useState(false);
  const [detail, setDetail] = useState<Row | null>(null);
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [cats, setCats] = useState<Set<string>>(new Set());
  const isOn = (it: Item) => (it.id.startsWith("cat:") ? cats.has(it.id.slice(4)) : flags[it.id] ?? !!it.on);
  const setCat = (label: string, on: boolean) => { const n = new Set(cats); on ? n.add(label) : n.delete(label); setCats(n); };
  const toggle = (it: Item) => { if (it.id.startsWith("cat:")) { setCat(it.id.slice(4), !cats.has(it.id.slice(4))); if (page === "overview") setPage("all"); } else setFlags({ ...flags, [it.id]: !isOn(it) }); };
  const switchApp = (id: string) => { app = APPS[id]; C = `rgb(${app.rgb})`; setAppId(id); const s = startOf(app); setPath(s.path); setPage(s.page); setCats(new Set()); };
  const openItem = (it: Item) => { if (it.open) { setPath([...path, it.open.id]); setPage(first(it.open)); } else setPage(it.id); };
  const openSec = (s: string) => { setPath(["ui", slug(s)]); setPage("overview"); };
  useEffect(() => { localStorage.setItem("af-theme", mode); document.documentElement.classList.toggle("dark", mode === "dark"); document.documentElement.classList.toggle("light", mode === "light"); }, [mode]);
  useEffect(() => { localStorage.setItem("af-nav-w", String(navW)); }, [navW]);
  // a link with a new hash (#ui/blocks:all) moves you there without a reload
  useEffect(() => { const f = () => { const [p, pg] = decodeURIComponent(location.hash.slice(1)).split(":"); setPath(p.split("/").filter(Boolean)); setPage(pg || "dash"); }; addEventListener("hashchange", f); return () => removeEventListener("hashchange", f); }, []);
  useEffect(() => { const u = new URL(location.href); u.searchParams.set("app", appId); u.hash = `${path.join("/")}:${page}`; history.replaceState(null, "", u); }, [appId, path, page]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch((v) => !v); }
      if (mod && e.key.toLowerCase() === "b") { e.preventDefault(); setFolded((v) => !v); }
      if (e.key === "Escape") { setSearch(false); setDetail(null); }
    };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, []);

  // the title says where you are; the breadcrumb bar shows only the way you came (Shaan: "shouldn't match the title")
  const lv = level.id.endsWith("-cats") ? stack[stack.length - 2] : level;
  const lvAt = stack.indexOf(lv);
  const landing = page === first(lv) || page === lv.dash;
  const pageItem = [...stack].reverse().map((l) => allItems(l).find((i) => i.id === page && !i.kind && !i.open)).find(Boolean);
  const trail = stack.slice(0, landing ? lvAt : lvAt + 1);
  const crumbTo = (i: number) => { setEco(false); setPath(stack.slice(1, i + 1).map((l) => l.id)); setPage(first(stack[i])); };
  const crumbs = [{ name: "SISO", go: () => setEco(true) }, ...trail.map((l, i) => ({ name: i === 0 ? app.name : l.name, go: () => crumbTo(i) }))];
  const title = landing ? lv.full ?? lv.name : pageItem?.full ?? pageItem?.name ?? lv.name;
  const icon: Icon | undefined = landing ? lv.icon : pageItem?.icon;
  const secLevel = [...stack].reverse().find((l) => l.section);
  const sec = secLevel?.section;
  const inUi = stack.some((l) => l.id === "ui");
  let about = "";
  const head: Head = (actions) => <PageHead t={t} icon={icon} mark={landing && lvAt === 0} title={title} about={about} actions={actions} />;
  let body: ReactNode;
  if (page === "dash") { about = lv.about ?? app.about; body = <LevelDash key={app.id + lv.id} t={t} level={lv} head={head} open={openItem} />; }
  else if (inUi && !hx) { about = "Opening the UI Hub's index…"; body = head(); }
  else if (hx && inUi && !sec && page === "home") { about = `${fmt(hx.stats.total)} parts from its own index, built ${hx.generated.replace("T", " at ")}.`; body = <HubHome t={t} h={hx} head={head} openSec={openSec} onOpen={setDetail} />; }
  else if (hx && sec && page === "overview") { about = `${secLevel!.about} in ${hx.nav.find((x) => x.section === sec)!.items.length} categories. Its own dashboard, from the template every section uses.`; body = <SectionHome key={sec} t={t} h={hx} sec={sec} head={head} pick={(l) => { setCats(new Set([l])); setPage("all"); }} onOpen={setDetail} />; }
  else if (hx && sec && (page === "all" || page === "picked")) {
    about = page === "picked" ? `What he's picked, curated or loved in ${secLevel!.full ?? secLevel!.name}.` : `Every part in ${secLevel!.full ?? secLevel!.name}, with its real preview. Click one for its install line.`;
    body = <>{head()}<Browse key={sec + page} t={t} h={hx} sec={sec} cats={cats} picked={page === "picked" || (flags["picked-only"] ?? false)} oursFirst={flags["ours-first"] ?? true} untick={(l) => setCat(l, false)} onOpen={setDetail} /></>;
  }
  else if (inUi && page === "packages") { about = "Every SISO UI package and the pieces inside them, with each version."; body = <Packages t={t} pk={pk} head={head} />; }
  else if (inUi && page === "icons") { about = `SISO's ${Object.keys(ICONS).length} animated icons. Hover one to see it move; every app uses these.`; body = <>{head()}<IconWall t={t} /></>; }
  else if (inUi && page === "faces") { about = "A colour and an orb for every app, and a face for every agent."; body = <>{head()}<Faces t={t} /></>; }
  else { about = "A placeholder page in the looks prototype; the side nav is the point."; body = head(); }

  // what search finds: where you are first, then the app, other apps, and (in the UI Hub) its parts
  const find = (qs: string, only: string | null): Hit[] => {
    const ql = qs.trim().toLowerCase();
    const nav: Hit[] = [];
    const seen = new Set<string>();
    for (const [l, base] of [[level, stack], [root, [root]]] as [Level, Level[]][]) for (const it of allItems(l)) {
      if (it.kind || seen.has(it.id) || (ql && !`${it.name} ${it.full ?? ""}`.toLowerCase().includes(ql))) continue;
      seen.add(it.id);
      nav.push({ key: `nav:${l.id}:${it.id}`, icon: <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ color: C, background: a(0.12) }}>{it.icon && <AnimatedNavIcon icon={ICONS[it.icon]} size={15} />}</span>, title: it.full ?? it.name, sub: it.open ? it.open.about ?? `Open ${it.name}` : `In ${l.name}`, n: it.n,
        run: () => { const ids = base.slice(1).map((x) => x.id); if (it.open) { setPath([...ids, it.open.id]); setPage(first(it.open)); } else { setPath(ids); setPage(it.id); } } });
    }
    const apps: Hit[] = ql ? Object.values(APPS).filter((x) => x.id !== app.id && x.name.toLowerCase().includes(ql)).map((x) => ({ key: `app:${x.id}`, icon: <Mark x={x} size={20} />, title: x.name, sub: x.about, run: () => switchApp(x.id) })) : [];
    let parts: Hit[] = [];
    if (hx && inUi) {
      const got: Row[] = [];
      for (const r of only ? hx.bySec.get(only) ?? [] : hx.items) if (r.k !== "resource" && (!ql || r.t.toLowerCase().includes(ql) || (hx.labelOf.get(r.c ?? "") ?? "").toLowerCase().includes(ql) || (r.a ?? "").toLowerCase().includes(ql))) got.push(r);
      got.sort((x, y) => (y.u ?? 0) - (x.u ?? 0));
      parts = got.slice(0, 8).map((r) => ({ key: r.id, row: r, title: r.t, sub: `${hx.labelOf.get(r.c ?? "") ?? r.k} · ${r.a ?? r.s}`, n: r.u ? fmt(r.u) : undefined, run: () => setDetail(r),
        icon: <span className="h-7 w-11 shrink-0 overflow-hidden rounded-md" style={{ background: t.thumb, boxShadow: `inset 0 0 0 1px ${t.line}` }}>{img(r) && <img src={img(r)} alt="" className="h-full w-full object-cover" />}</span> }));
    }
    return [...(only ? [] : nav.slice(0, ql ? 4 : 5)), ...apps, ...parts];
  };

  const R = app.rgb;
  return (
    <div className="flex h-screen gap-3 p-3" style={{ background: t.page, fontFamily: "Geist, var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`.af-rim{width:100%;height:100%;padding:10px 9px 9px!important;border-radius:22px!important;
  --rim-ring:conic-gradient(from var(--siso-rim-ang),rgb(${R}),${app.second},rgb(${R} / .22),rgb(168 120 255),rgb(${R}))!important;
  box-shadow:0 0 0 1px rgb(255 255 255 / .02),0 18px 56px -20px rgb(${R} / ${mode === "dark" ? 0.6 : 0.35}),0 0 46px -14px rgb(56 189 248 / ${mode === "dark" ? 0.3 : 0.18})!important}
.af-rim.is-working::before{animation-duration:24s!important}
/* the pointer's light on the rim: a ring-shaped layer, lit where the pointer is (and along the edge while it resizes) */
.af-rim>.af-spot{position:absolute!important;inset:0;z-index:3!important;border-radius:inherit;padding:1.5px;pointer-events:none;opacity:0;transition:opacity .35s ease;
  background:radial-gradient(170px circle at var(--mx,50%) var(--my,0px),${t.spot},rgb(${R}) 28%,transparent 62%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
.af-navwrap:hover .af-spot,.af-resizing .af-spot{opacity:1}
.af-orb{background:radial-gradient(circle at 35% 30%, rgb(var(--h) / .35), rgb(var(--h) / .08) 70%);box-shadow:0 0 0 1px rgb(var(--h) / .35),0 0 16px -4px rgb(var(--h) / .75)}
/* the SISO press, a shell standard: every button gives a little under a click and springs back */
.af-row,.af-press,.af-crumb,.af-search,.af-head{transition:transform .34s cubic-bezier(.34,1.56,.64,1),background .15s ease,color .15s ease,box-shadow .2s ease}
.af-row:active,.af-press:active,.af-crumb:active,.af-search:active,.af-head:active,.af-seg:active{transform:scale(.965);transition-duration:.07s}
.af-row:hover{background:var(--hv)}.af-head:hover{background:${t.hover}}.af-crumb:hover{color:${t.fg}!important;background:${t.hover}}
.af-search:hover{box-shadow:inset 0 0 0 1px rgb(${R} / .45)!important}
.af-pill.on{background:rgb(${R} / .09)!important;box-shadow:inset 0 0 0 1.5px rgb(${R} / .7),0 0 18px -6px rgb(${R} / .7)}
/* the pill switch */
.af-seg{transition:flex-grow .38s cubic-bezier(.22,1,.36,1),background .2s ease,color .2s ease,box-shadow .2s ease,transform .34s cubic-bezier(.34,1.56,.64,1)}.af-seg:hover{color:${t.fg}!important}
.af-seg-label{transition:max-width .38s cubic-bezier(.22,1,.36,1),opacity .25s ease,margin .38s cubic-bezier(.22,1,.36,1)}
.af-comp{transition:box-shadow .2s ease,transform .3s cubic-bezier(.34,1.56,.64,1)}.af-comp:hover{box-shadow:inset 0 0 0 1.5px var(--hv),0 14px 34px -18px var(--hv)!important;transform:translateY(-2px)}.af-comp:hover img{transform:scale(1.04)}.af-comp:active{transform:scale(.985);transition-duration:.07s}
/* the side nav's edge is the rim itself */
.af-resize{position:absolute;top:26px;bottom:26px;right:-6px;width:12px;cursor:col-resize;z-index:6}
.af-resizing,.af-resizing *{user-select:none!important;cursor:col-resize!important}
/* widgets: the border lights on hover; lifted while they move; a dashed place where they'll land */
.af-widget{box-shadow:inset 0 0 0 1px ${t.line};transition:box-shadow .25s ease,transform .3s cubic-bezier(.34,1.56,.64,1);cursor:grab}
.af-widget:hover{box-shadow:inset 0 0 0 1.5px rgb(${R} / .55),0 18px 44px -26px rgb(${R} / .7)}
.af-widget button{cursor:pointer}.af-widget .af-wtools{opacity:0;transition:opacity .2s ease}.af-widget:hover .af-wtools{opacity:1}
.react-draggable-dragging .af-widget{cursor:grabbing;transform:scale(1.02) rotate(-.5deg);box-shadow:inset 0 0 0 1.5px rgb(${R}),0 30px 70px -24px rgb(0 0 0 / .7),0 0 44px -12px rgb(${R} / .6)}
.react-grid-item.react-grid-placeholder{background:rgb(${R} / .07)!important;opacity:1!important;border-radius:18px;outline:1.5px dashed rgb(${R} / .55);outline-offset:-2px}
.react-grid-item>.react-resizable-handle::after{border-color:${t.fg4}!important}
.af-strip{scrollbar-width:thin}
/* levels and tabs slide across, in and out */
@keyframes af-enter-in{from{transform:translateX(100%)}to{transform:none}}
@keyframes af-leave-in{from{transform:none;opacity:1}to{transform:translateX(-32%);opacity:0}}
@keyframes af-enter-out{from{transform:translateX(-32%);opacity:0}to{transform:none;opacity:1}}
@keyframes af-leave-out{from{transform:none;opacity:1}to{transform:translateX(100%);opacity:.2}}
.af-enter-in{animation:af-enter-in .38s cubic-bezier(.22,1,.36,1) both}.af-leave-in{animation:af-leave-in .38s cubic-bezier(.22,1,.36,1) both}
.af-enter-out{animation:af-enter-out .38s cubic-bezier(.22,1,.36,1) both}.af-leave-out{animation:af-leave-out .38s cubic-bezier(.22,1,.36,1) both;z-index:2}
@keyframes af-title{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:none}}.af-title{animation:af-title .3s cubic-bezier(.22,1,.36,1)}
@keyframes af-page{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.af-page{animation:af-page .34s cubic-bezier(.22,1,.36,1)}
@keyframes af-pop{from{opacity:0;transform:translateY(4px) scale(.98)}to{opacity:1;transform:none}}.af-pop{animation:af-pop .18s cubic-bezier(.22,1,.36,1)}
@keyframes af-drawer{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}.af-drawer{animation:af-drawer .24s cubic-bezier(.22,1,.36,1)}
@media (prefers-reduced-motion:reduce){.af-enter-in,.af-leave-in,.af-enter-out,.af-leave-out,.af-title,.af-page,.af-pop,.af-drawer{animation:none}.af-rim>.af-spot{display:none}}`}</style>
      {!folded && <SideNav t={t} root={root} stack={stack} go={go} page={page} setPage={setPage} onSearch={() => setSearch(true)} isOn={isOn} toggle={toggle} width={navW} setWidth={setNavW} fold={() => setFolded(true)} switchApp={switchApp} eco={eco} setEco={setEco} pk={pk} />}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* the breadcrumb bar: its own bar, with Saved and light or dark */}
        <header className="flex h-[48px] shrink-0 items-center gap-1 rounded-[16px] px-1.5" style={{ background: t.card, boxShadow: `inset 0 0 0 1px ${t.cardLine}` }}>
          {folded && <button onClick={() => setFolded(false)} className="af-row grid h-9 w-9 place-items-center rounded-[11px]" style={{ color: t.fg3, ["--hv" as any]: t.hover }} title="Open the side nav (⌘B)"><PanelLeftOpen size={16} /></button>}
          <nav className="flex min-w-0 items-center text-[13px]">
            {crumbs.map((c, i) => (
              <span key={i} className="flex min-w-0 items-center">
                {i > 0 && <ChevronRight size={14} className="mx-0.5 shrink-0" style={{ color: t.fg4 }} />}
                <button onClick={c.go} className="af-crumb flex min-w-0 items-center gap-2 truncate rounded-[9px] px-2 py-1.5" style={{ color: i === crumbs.length - 1 ? t.fg2 : t.fg3 }}>
                  {i === 0 && <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: C, boxShadow: `0 0 8px ${C}` }} />}{c.name}
                </button>
              </span>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1 rounded-xl p-1" style={{ background: t.well, boxShadow: `inset 0 0 0 1px ${t.line}` }}>
            <button className="af-row flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[12.5px]" style={{ color: t.fg2, ["--hv" as any]: t.hover }} title="Your SISO bookmarks"><Bookmark size={15} />Saved</button>
            <button onClick={() => setMode(mode === "dark" ? "light" : "dark")} className="af-row grid h-8 w-8 place-items-center rounded-lg" style={{ color: t.fg3, ["--hv" as any]: t.hover }} title="Light or dark">{mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}</button>
          </div>
        </header>
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[22px]" style={{ background: t.card, boxShadow: `inset 0 0 0 1px ${t.cardLine}, 0 20px 60px -30px rgb(0 0 0 / ${mode === "dark" ? 0.8 : 0.18})` }}>
          <div className="flex-1 overflow-y-auto px-8 pb-10 pt-7">
            <div key={`${appId}:${path.join("/")}:${page}`} className="af-page">{body}</div>
          </div>
        </main>
      </div>
      {search && <Spotlight t={t} dark={mode === "dark"} find={find} filters={hx && inUi ? hx.nav.map((s) => s.section) : []} place={inUi && hx ? `the UI Hub's ${fmt(hx.stats.ui_items)} parts` : level.name} close={() => setSearch(false)} />}
      {detail && hx && <Detail t={t} h={hx} r={detail} close={() => setDetail(null)} />}
    </div>
  );
}
