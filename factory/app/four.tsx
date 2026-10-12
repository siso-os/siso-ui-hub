// uihub: siso:factory-four
// What every space's side nav shares in the lab: HALO's four tools and the spaces in the ˅ menu.
// HALO's four are Dashboard, Docs, Sheets and Chat (research/siso-os/halo-side-nav.md); what they do in SISO OS is
// his call later (agent-base.md §4). One option there: Dashboard the space's home, Docs, Sheets its tables, Chat the
// space's lead agent. Glyphs from Agent Base's animated glass set (@siso/icons).
import { useState } from "react";
import { AnimatedNavIcon, ICONS } from "@siso/icons";
import { Bot, Building2, Factory } from "lucide-react";
import type { HubTool } from "@siso/side-nav";
import type { MenuItem } from "@siso/shell";

const glass = (name: string) => (p: { className?: string }) => <span className={p.className}><AnimatedNavIcon icon={(ICONS as any)[name]} size={18} /></span>;

export function useFour(lead: string, onDashboard?: () => void): [HubTool[], string] {
  const [on, setOn] = useState("dashboard");
  const t = (id: string, label: string, icon: string, go?: () => void): HubTool => ({ id, label, icon: glass(icon), onSelect: () => { setOn(id); go?.(); } });
  return [[
    t("dashboard", "Dashboard: this space's home", "layout-grid", onDashboard),
    t("docs", "Docs", "book-text"),
    t("sheets", "Sheets: this space's tables", "layout-panel-top"),
    t("chat", `Chat: ${lead}, this space's lead`, "message-circle-more"),
  ], on];
}

/** The spaces, in the ˅ menu: each sample of the one side nav. */
export const spaces = (here: string): MenuItem[] => [{
  key: "spaces", label: "Spaces", items: [
    { key: "ab", label: "Agent Base", icon: <Bot size={15} />, current: here === "agent-base", onSelect: () => (location.href = "/lab/agent-base") },
    { key: "af", label: "App Factory", icon: <Factory size={15} />, current: here === "app-factory", onSelect: () => (location.href = "/app") },
    { key: "ag", label: "Agency · later", icon: <Building2 size={15} />, disabled: true },
  ],
}];
