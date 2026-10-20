// From Arc's docs page (Usage), imports pointed at the copied source
import { Card } from "@siso/atoms/source";
import { Avatar } from "@siso/atoms/source";

export function ProjectCard() {
  return (
    <Card
      title="Harbour redesign"
      description="New booking flow and room pages."
      media={<img src={"/siso-img/products/web/09-footer-launch.webp"} alt="" />}
      avatar={<Avatar name="Maya Chen" size="sm" />}
      meta="Maya Chen"
      status="Updated 2 hours ago"
      details={<p>Scope, milestones, and open questions.</p>}
    />
  );
}

// uihub: siso:package-workbench
