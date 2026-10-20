// From Arc's docs page (Usage), imports pointed at the copied source
import { AvatarGroup } from "@siso/atoms/source";

const team = [
  { name: "Maya Chen", src: "/brand/siso-mark.png", status: "online" as const },
  { name: "Leo Park" },
  { name: "Sara Ruiz" },
  { name: "Tom Hale" },
  { name: "Ines Ma" },
];

export function Collaborators() {
  return <AvatarGroup members={team} max={3} label="Editors" />;
}

// uihub: siso:package-workbench
