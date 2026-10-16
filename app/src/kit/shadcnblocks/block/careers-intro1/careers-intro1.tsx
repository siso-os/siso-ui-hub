import { CalendarClock, FileText, Layers } from "lucide-react";
import { cn } from "@/arc-shims/kit-utils";

import { Badge } from "../../../shadcn/ui/badge";
import { Button } from "../../../shadcn/ui/button";

interface CareersIntroReason {
  title: string;
  description: string;
  icon?: ElementType<{ className?: string }>;
}
interface Button {
  text: string;
  url: string;
  icon?: React.ReactNode;
}

interface CareersIntroProps {
  label?: string;
  heading: string;
  description: string;
  button?: Button;
  reasons: CareersIntroReason[];
  className?: string;
}

interface CareersIntro1Props extends CareersIntroProps {}
type Props = Partial<CareersIntro1Props>;

const defaultProps: CareersIntro1Props = {
  label: "We're hiring",
  heading: "Discover Your Perfect Career",
  description:
    "Shadcnblocks.com is small enough that your name stays on the work, and clear enough that you are not guessing what matters this week.",
  button: {
    text: "See open roles",
    url: "#",
  },
  reasons: [
    {
      title: "Own a surface",
      icon: Layers,
      description:
        "You take a product area from the first empty state through the incident review, with design and engineering in the same thread.",
    },
    {
      title: "Decisions in writing",
      icon: FileText,
      description:
        "Specs and postmortems stay open inside the company, so you can catch up without a week of meetings.",
    },
    {
      title: "Room to ship",
      icon: CalendarClock,
      description:
        "One day a week stays clear of recurring meetings. Interviews and planning have a slot, not the whole calendar.",
    },
  ],
};

const MAX_REASONS = 3;

const CareersIntro1 = (props: Props) => {
  const { label, heading, description, button, reasons, className } = {
    ...defaultProps,
    ...props,
  };
  const items = (reasons ?? []).slice(0, MAX_REASONS);

  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col items-start gap-6">
            {label ? (
              <Badge variant="outline" className="w-fit">
                {label}
              </Badge>
            ) : null}
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
              {heading}
            </h1>
            <p className="max-w-5xl text-lg text-balance text-muted-foreground">
              {description}
            </p>
            {button?.text ? (
              <Button asChild>
                <a href={button.url}>{button.text}</a>
              </Button>
            ) : null}
          </div>
          <ul className="grid gap-10 border-t border-border pt-10 md:grid-cols-3">
            {items.map((reason) => (
              <li key={reason.title} className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">{reason.title}</h2>
                <p className="text-muted-foreground">{reason.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { CareersIntro1 };
