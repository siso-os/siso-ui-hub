// From Arc's docs page (Usage), imports pointed at the copied source
import { Card } from "../card/card";
import { Avatar } from "../avatar/avatar";

export function ProjectCard() {
  return (
    <Card
      title="Harbour redesign"
      description="New booking flow and room pages."
      media={<img src={new URL("../media/harbour.jpg", import.meta.url).href} alt="" />}
      avatar={<Avatar name="Maya Chen" size="sm" />}
      meta="Maya Chen"
      status="Updated 2 hours ago"
      details={<p>Scope, milestones, and open questions.</p>}
    />
  );
}
