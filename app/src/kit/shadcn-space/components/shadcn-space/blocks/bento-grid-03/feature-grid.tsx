import { Clock, Link2, Rocket, Share2 } from "lucide-react";
import { WorkflowTagCloud } from "./workflow-tag-cloud";

const leftFeatures = [
  {
    icon: Share2,
    title: "Visual workflow engine",
    description:
      "Build automation sequences on a drag-and-drop canvas. Connect triggers, conditions, and actions across your stack in minutes.",
  },
  {
    icon: Rocket,
    title: "AI workflow intelligence",
    description:
      "Harness AI to suggest workflow improvements, auto-complete missing steps, and predict failures before they occur.",
  },
];

const rightFeatures = [
  {
    icon: Clock,
    title: "Real-time execution",
    description:
      "Run thousands of simultaneous workflows with sub-second latency. Monitor live runs and debug instantly.",
  },
  {
    icon: Link2,
    title: "Connected tool ecosystem",
    description:
      "Integrate with 1,000+ apps out of the box from Slack and GitHub to Salesforce, Stripe, and more.",
  },
];

function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Share2;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col justify-between gap-10 p-8">
      <Icon className="size-6 text-foreground" />
      <div className="flex flex-col gap-1">
        <p className="text-lg font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="flex flex-col divide-y divide-border border-b border-border lg:border-r lg:border-b-0">
        {leftFeatures.map((feature) => (
          <FeatureItem key={feature.title} {...feature} />
        ))}
      </div>

      <div className="relative aspect-square sm:aspect-video lg:aspect-384/562 xl:aspect-384/452 overflow-hidden border-b border-border lg:border-r lg:border-b-0">
        <img
          src="https://images.shadcnspace.com/assets/bento-grid/bento-grid-03-bg.webp"
          alt="Automation workflow canvas connecting teams across the organization"
          className="size-full object-cover"
        />
        <WorkflowTagCloud />
      </div>

      <div className="flex flex-col divide-y divide-border">
        {rightFeatures.map((feature) => (
          <FeatureItem key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}
