// From Arc's docs page (Usage), imports pointed at the copied source
import { AvatarGroup } from "../avatar-group/avatar-group";

const team = [
  { name: "Maya Chen", src: new URL("../media/people/maya.jpg", import.meta.url).href, status: "online" as const },
  { name: "Leo Park" },
  { name: "Sara Ruiz" },
  { name: "Tom Hale" },
  { name: "Ines Ma" },
];

export function Collaborators() {
  return <AvatarGroup members={team} max={3} label="Editors" />;
}
