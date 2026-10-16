// From Arc's docs page (Usage), imports pointed at the copied source
import { Avatar } from "../avatar/avatar";

export function Owner() {
  return <Avatar name="Maya Chen" src={new URL("../media/people/maya.jpg", import.meta.url).href} size="lg" status="online" />;
}
