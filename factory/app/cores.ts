// uihub: siso:factory-cores
// The App Factory's cores in V1 §4a's groups. A core's colour is one line here (spec §14.7).
import { Boxes, Building2, Code2, FolderKanban, LayoutGrid, LayoutTemplate, MonitorCog, PanelsTopLeft, Scale, type LucideIcon } from "lucide-react";

export type Core = { id: string; name: string; Icon: LucideIcon; color: string; parts: string; today: string; live?: boolean };

// Shaan, 10 Oct 05:57: which hubs live in the App Factory. Benchmarks and Agents moved to Agent Base; People, Partners
// and Solutions to the Agency; Questions and the Great Library serve the whole OS.
export const GROUPS: { label: string; cores: Core[] }[] = [
  { label: "Know who", cores: [
    { id: "industries", name: "Industries", Icon: Building2, color: "#10B981", parts: "industries in 8 families; businesses on the map; work; research packs; rules; agencies as an industry", today: "3,665 ranked; 26 packs, 78 customer jobs; 13,145 Đà Nẵng records" },
    { id: "software", name: "Software", Icon: Boxes, color: "#06B6D4", parts: "what businesses pay for; platforms; open replacements; vibe-codable or not", today: "none yet" },
  ] },
  { label: "Build with", cores: [
    { id: "ui", name: "UI", Icon: LayoutGrid, color: "#3B82F6", live: true, parts: "SISO UI; components; themes and tokens; media; screens and flows; rules; docs; live previews", today: "138 picks; 21st 7,988; 11 libraries 1,182" },
    { id: "code", name: "Code", Icon: Code2, color: "#14B8A6", parts: "repos; packages; code search; how-to cards; engines to lift", today: "1.36M indexed, 23,778 rated" },
  ] },
  { label: "Judge", cores: [
    { id: "law", name: "Law Book", Icon: Scale, color: "#EAB308", parts: "the SISO philosophy; principles with evidence; his calls", today: "15 UI principles; the site kit's 43 laws" },
  ] },
  { label: "Make", cores: [
    { id: "projects", name: "Projects", Icon: FolderKanban, color: "#FFA726", live: true, parts: "his projects, each with pages, sub-pages and components; variations; picks; the recipe", today: "5 projects, 1,710 components inventoried" },
    { id: "site-kit", name: "Site Kit", Icon: LayoutTemplate, color: "#22C55E", parts: "blocks and sections", today: "200 café sites" },
    { id: "hub-kit", name: "Hub Kit", Icon: PanelsTopLeft, color: "#0EA5E9", parts: "the shell and the five hub screens", today: "this shell" },
    { id: "os-kit", name: "OS Kit", Icon: MonitorCog, color: "#64748B", parts: "apps, patterns, connectors, engines", today: "HALO census (41 modules)" },
  ] },
];

export const CORES: Core[] = GROUPS.flatMap((g) => g.cores);
export const core = (id: string) => CORES.find((c) => c.id === id) ?? CORES[0];

// Status colours (spec §6): picked green, needs a pick amber, dead red, ours SISO orange.
export const STATUS: Record<string, { label: string; color: string }> = {
  picked: { label: "picked", color: "#22C55E" },
  "needs-pick": { label: "needs a pick", color: "#F59E0B" },
  ours: { label: "ours", color: "#FF7A1A" },
  dead: { label: "dead", color: "#EF4444" },
};
