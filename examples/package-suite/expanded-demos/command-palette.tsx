// uihub: siso:package-workbench
// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { CommandPalette, type CommandItem } from "@siso/blocks/source";

const items: CommandItem[] = [
  { id: "new", label: "New project", group: "Create", shortcut: "N" },
  { id: "invite", label: "Invite teammate", group: "Team", keywords: ["member"] },
  { id: "theme", label: "Toggle theme", description: "Switch light and dark" },
];

export function Palette({ onClose }: { onClose: () => void }) {
  return <CommandPalette items={items} onSelect={item => run(item.id)} onClose={onClose} />;
}

function run(id: string) {
  console.info(`command-palette: run ${id}`);
}

export default function CommandPaletteDemo() {
  return <Palette onClose={() => console.info("command-palette: closed")} />;
}
