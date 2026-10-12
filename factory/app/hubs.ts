// uihub: siso:factory-hubs
// The App Factory's side nav as data: the root level lists the hubs in his groups (cores.ts, 10 Oct 05:57); a hub with
// its own side nav is a nested level. UI Hub and Industries have their own side navs first (his order).
import { BookOpen, Boxes, Building2, Compass, FileCode2, Globe2, Layers, ListChecks, MapPinned, Package, Palette, Scale, Sparkles, Users, Wrench } from "lucide-react";
import type { HubItem, HubLevel } from "@siso/side-nav";
import HOME from "../data/projects.json";
import { GROUPS, core } from "./cores";

const UI_HUB: HubLevel = {
  id: "ui", name: "UI Hub", colour: core("ui").color, icon: core("ui").Icon, searchLabel: "Search the UI Hub…",
  groups: [
    { label: "SISO UI", items: [
      { id: "ui/picks", name: "v0.1: take or skip", icon: Sparkles, badge: 24, hint: "every candidate rendered side by side" },
      { id: "ui/set", name: "The set", icon: Package, hint: "what you took, one install line each", disabled: true },
    ] },
    { label: "Catalogue", items: [
      { id: "ui/components", name: "Your components", icon: Layers, badge: "1,710", hint: "every component in your projects" },
      { id: "ui/picks-138", name: "Your picks", icon: Compass, badge: 138, hint: "the 21st picks with your notes" },
      { id: "ui/index", name: "21st index", icon: Globe2, badge: "7,988", hint: "every 21st.dev component, harvested" },
      { id: "ui/libraries", name: "Libraries", icon: Boxes, badge: 11, hint: "shadcn, Origin, Magic UI and the rest: 1,182 items" },
    ] },
    { label: "Rules and docs", items: [
      { id: "ui/rules", name: "Rules", icon: Scale, badge: 15, hint: "the 15 principles with your words" },
      { id: "ui/tokens", name: "Themes and tokens", icon: Palette, hint: "colours, glow, light and dark", disabled: true },
      { id: "ui/docs", name: "Docs", icon: BookOpen, hint: "SISO UI's docs", disabled: true },
    ] },
  ],
};

const INDUSTRIES: HubLevel = {
  id: "industries", name: "Industries", colour: core("industries").color, icon: core("industries").Icon, searchLabel: "Search Industries…",
  groups: [
    { label: "Industries", items: [
      { id: "industries/all", name: "All industries", icon: Building2, badge: "3,665", hint: "ranked, searchable, in 8 families" },
      { id: "industries/packs", name: "Research packs", icon: FileCode2, badge: 26, hint: "with 78 customer jobs" },
    ] },
    { label: "On the ground", items: [
      { id: "industries/map", name: "Businesses on the map", icon: MapPinned, badge: "13,145", hint: "Đà Nẵng records" },
      { id: "industries/work", name: "Work", icon: Wrench, hint: "roles, tasks, wages, AI share", disabled: true },
      { id: "industries/agencies", name: "Agencies", icon: Users, hint: "agencies as an industry", disabled: true },
    ] },
  ],
};

const PROJECTS: HubLevel = {
  id: "projects", name: "Projects", colour: core("projects").color, icon: core("projects").Icon, searchLabel: "Search your projects…",
  groups: [
    { label: "Your projects", items: [
      { id: "projects/home", name: "All projects", icon: ListChecks, badge: (HOME.projects as any[]).length },
      ...(HOME.projects as any[]).map((p): HubItem => ({ id: `p/${p.id}`, name: p.name, badge: p.components, hint: p.about, disabled: p.namesOnly })),
    ] },
  ],
};

const OWN: Record<string, HubLevel> = { ui: UI_HUB, industries: INDUSTRIES, projects: PROJECTS };

export const ROOT: HubLevel = {
  id: "app-factory", name: "App Factory", colour: "#3B82F6", searchLabel: "Search the App Factory…",
  groups: GROUPS.map((g) => ({
    label: g.label,
    items: g.cores.map((c): HubItem => ({
      id: c.id,
      name: c.id === "ui" ? "UI Hub" : c.name,
      icon: c.Icon,
      hint: c.today,
      hub: OWN[c.id],
    })),
  })),
};

/** The hub path an item id lives under, so a deep link opens the right side nav. */
export const pathFor = (id: string): string[] => (id.startsWith("p/") ? ["projects"] : id.includes("/") && id !== "projects/home" ? [id.split("/")[0]] : []);
