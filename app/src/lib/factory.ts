// uihub: siso:factory
// The App Factory around the UI Hub (spec app-factory §0: built from this app; §1: every hub is a core inside it).
// The name at the top of the side nav switches between the cores, in his groups; each core is its own side nav.
// The cores, their colours and their parts are APP-FACTORY's (factory/app/cores.ts and hubs.ts, 10 Oct). Owners,
// stages and sources are ECOSYSTEM's (siso-os-release ecosystem/hubs.json and V1.md §5).
// How a core connects: it exports its data the way the UI Hub does (data/index.json, which this app reads). Until a
// core's export lands, its page says what it holds, what there is today, where that lives and who owns it.
// 10 Oct (Shaan): the UI Hub is "UI"; Site Kit and Hub Kit live inside it ("hub kit site kit … should probably be in the
// UI hub"), so they are KITS, not cores; OS Kit left (a census of the OS's modules, and the App Factory is "anything
// inside of the app factory. Not across the OS"); the screens each industry needs belong to Industries.
import { useEffect, useState } from "react"
import { Boxes, Building2, Code2, FileCode2, FolderKanban, Gavel, LayoutGrid, LayoutTemplate, MapPinned, MonitorCog, PanelsTopLeft, Scale, ScrollText, Store, Users, Wrench, type LucideIcon } from "lucide-react"

export type Part = { id: string; name: string; icon?: LucideIcon; n?: string; hint?: string; to?: string }
export type Core = {
  id: string
  name: string
  icon: LucideIcon
  color: string
  verb: string
  holds: string
  today: string
  n?: string
  owner?: string
  stage: string
  sources: string
  live?: boolean
  to: string
  parts: Part[]
}
const part = (id: string, name: string, more: Omit<Part, "id" | "name"> = {}): Part => ({ id, name, ...more })

export const GROUPS: { label: string; cores: Core[] }[] = [
  {
    label: "Know who",
    cores: [
      {
        id: "industries", name: "Industries", icon: Building2, color: "#10B981", verb: "build for", n: "3,665", to: "/cores/industries",
        holds: "Every industry, agencies included: businesses on the map, roles and tasks and what they cost, how automatable each task is, the rules, and what we offer.",
        today: "3,665 ranked; 26 packs with 78 customer jobs; 13,145 Đà Nẵng records", owner: "LIBRARY with SISO-AGENCY", stage: "Researched; a blind-research pilot",
        sources: "Overture places; O*NET and ESCO (roles, tasks); BLS and ILO (wages); NAICS and ISIC; Anthropic's Economic Index and GDPval; our packs; government sites (rules)",
        parts: [
          part("all", "All industries", { icon: Building2, n: "3,665", hint: "ranked, in 8 families" }),
          part("packs", "Research packs", { icon: FileCode2, n: "26", hint: "with 78 customer jobs" }),
          part("map", "On the map", { icon: MapPinned, n: "13,145", hint: "Đà Nẵng records" }),
          part("work", "Work", { icon: Wrench, hint: "roles, tasks, wages, AI share" }),
          part("agencies", "Agencies", { icon: Users, hint: "agencies as an industry" }),
          part("screens", "Screens they need", { icon: LayoutGrid, hint: "per industry, with the best components we hold", to: "/industries" }),
        ],
      },
      {
        id: "software", name: "Software", icon: Boxes, color: "#06B6D4", verb: "replace", to: "/cores/software",
        holds: "What businesses pay for, the platforms they work on (API, fees, automation rules), the open replacement, and whether it can be vibe-coded.",
        today: "Seeds only", owner: "LIBRARY", stage: "Researched",
        sources: "canivibecodeit; awesome-selfhosted; openalternative; G2 and Capterra categories; Product Hunt; vendor pricing pages; platform developer docs",
        parts: [part("products", "Products", { icon: Store }), part("platforms", "Platforms", { icon: Boxes }), part("open", "Open replacements", { icon: Code2 }), part("vibe", "Vibe-codable", { icon: Wrench })],
      },
    ],
  },
  {
    label: "Build with",
    cores: [
      {
        id: "ui", name: "UI", icon: LayoutGrid, color: "#3B82F6", verb: "install", to: "/", live: true,
        holds: "Everything design, split by what you are making: components, sites, apps and looks, and what each project is built from. SISO's Site Kit and Hub Kit live inside it.",
        today: "This app", owner: "UI-HUB", stage: "Live", sources: "21st.dev; shadcn registries; GitHub UI repos; icon, font and 3D sets; our own sections",
        parts: [],
      },
      {
        id: "code", name: "Code", icon: Code2, color: "#14B8A6", verb: "lift", n: "1.36M", to: "/cores/code",
        holds: "Things you can clone: repos, packages and libraries, code search, how-to-use cards and engines to lift.",
        today: "1.36M indexed, 23,778 rated", owner: "LIBRARY", stage: "Researched; a search fix filed (t-0591)",
        sources: "our GitHub index; GH Archive (daily); deps.dev and ecosyste.ms (packages); Software Heritage; GitLab, Codeberg, Gitee and Hugging Face",
        parts: [part("repos", "Repos", { icon: FolderKanban }), part("packages", "Packages", { icon: Boxes }), part("search", "Code search", { icon: Code2 }), part("cards", "How-to cards", { icon: ScrollText }), part("engines", "Engines", { icon: MonitorCog })],
      },
    ],
  },
  {
    label: "Judge",
    cores: [
      {
        id: "law", name: "Law Book", icon: Scale, color: "#EAB308", verb: "cite", n: "43", to: "/cores/law",
        holds: "The SISO philosophy, then every principle with its evidence: the psychology of UI and apps, people with AI, what agents can do, automation economics and his calls.",
        today: "15 UI principles; the site kit's 43 laws", owner: "LIBRARY", stage: "Researched",
        sources: "books and papers via People and OpenAlex; Laws of UX; Microsoft's human-AI guidelines; Google PAIR; METR; ExO; our ADRs",
        parts: [part("philosophy", "Philosophy", { icon: ScrollText }), part("principles", "Principles", { icon: Scale, n: "15" }), part("laws", "Site kit laws", { icon: Gavel, n: "43" }), part("calls", "His calls", { icon: Gavel })],
      },
    ],
  },
  {
    label: "Make",
    cores: [
      {
        id: "projects", name: "Projects", icon: FolderKanban, color: "#FFA726", verb: "make", n: "5", to: "/cores/projects", live: true,
        holds: "His projects, each with its pages, sub-pages and components, the variations and picks, and the line from brief to ship.",
        today: "5 projects, 1,710 components inventoried", owner: "APP-FACTORY", stage: "Building (t-0594)",
        sources: "the UI Hub's nightly census (inventory/), built by factory/bin/build-data",
        parts: [],
      },
    ],
  },
]

export const CORES: Core[] = GROUPS.flatMap((g) => g.cores)

/** SISO's own kits, inside UI: Site Kit under Sites, Hub Kit under Apps. Their pages are core pages; the side nav stays UI's. */
export const KITS: Core[] = [
  {
    id: "site-kit", name: "Site Kit", icon: LayoutTemplate, color: "#22C55E", verb: "mould", n: "200", to: "/cores/site-kit",
    holds: "Blocks and sections that sites are made from.", today: "200 café sites", stage: "In use for the free sites", sources: "SISO_Agency/factory/ (siso-app-factory)",
    parts: [part("blocks", "Blocks", { icon: Boxes }), part("sections", "Sections", { icon: LayoutTemplate }), part("sites", "Sites made", { icon: Store, n: "200" })],
  },
  {
    id: "hub-kit", name: "Hub Kit", icon: PanelsTopLeft, color: "#0EA5E9", verb: "mould", to: "/cores/hub-kit",
    holds: "The shell and the five hub screens every hub is made from: list and search, the record page, compare and curate.", today: "This shell", stage: "In design (looks v8)",
    sources: "this app's shell; Packages, under UI's Apps", parts: [part("shell", "The shell", { icon: PanelsTopLeft, to: "/packages" }), part("screens", "The five screens", { icon: LayoutGrid })],
  },
]
export const coreById = (id: string | null | undefined) => CORES.find((c) => c.id === id) || KITS.find((c) => c.id === id)

/** the core a page belongs to: the factory's home, /cores/<id> (a kit's page is UI's), the industries' screens, or UI */
export function coreOf(path: string): string | null {
  if (path === "/factory") return null
  if (path.startsWith("/cores/")) {
    const id = path.split("/")[2] || null
    return KITS.some((k) => k.id === id) ? "ui" : id
  }
  if (path === "/industries" || path.startsWith("/industries/")) return "industries"
  return "ui"
}

export type Project = { id: string; name: string; about: string; components: number; pages: number; picked: number; needsPick: number; ours: number; dead: number; namesOnly?: boolean }

let projectsP: Promise<Project[]> | null = null
/** his projects (factory/data/projects.json), exported into data/factory/ for his build only: client names stay off the public one */
export function useProjects(): Project[] | null {
  const [p, setP] = useState<Project[] | null>(null)
  useEffect(() => {
    ;(projectsP ??= fetch("/data/factory/projects.json")
      .then((r) => (r.ok ? r.json() : { projects: [] }))
      .then((d) => d.projects as Project[], () => [])).then(setP)
  }, [])
  return p
}
