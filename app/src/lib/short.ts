// uihub: siso:short-labels
// Side nav labels stay short (Shaan, 10 Oct: "it should have a max letter count"); the full name is the page title and
// the row's tooltip.
const MAX = 12
const SHORT: Record<string, string> = {
  "Templates & Themes": "Templates", "Marketing Blocks": "Blocks", "UI Components": "Components", "AI & Agents": "AI",
  "Spinner Loaders": "Loaders", "Navigation Menus": "Nav menus", "Pricing Sections": "Pricing", "Calls to Action": "CTAs",
  "Team Sections": "Teams", Announcements: "Banners", "Notifications & Toasts": "Toasts", "Command Palettes": "Palettes",
  "Leaderboards & Rewards": "Leaderboards", "Kanban Boards": "Kanban", "Image Compare": "Compare", "Color Pickers": "Colours",
  "Context Menus": "Right-click", "Number Inputs": "Num inputs", "Sign Ins & Sign Ups": "Sign-ins", "AI Chats & Composers": "AI chats",
  "AI Components": "AI parts", "Image Generation": "Image gen", "Notification Centres": "Inboxes", "Tables of Contents": "Contents",
  "Segmented Controls": "Segments", "Sheets & Drawers": "Drawers",
}

export function short(s: string) {
  const x = SHORT[s] ?? s.split(/ & | \/ /)[0]
  return x.length > MAX ? `${x.slice(0, MAX - 1)}…` : x
}
