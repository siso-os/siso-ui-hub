import { Badge } from "../../../../../shadcn/ui/badge";

export function BentoGridHeader() {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <Badge variant="outline" className="h-7 px-3 py-1 text-sm font-normal">
        Overview
      </Badge>
      <h2 className="text-4xl md:text-5xl font-medium text-foreground">
        One Automation Platform
      </h2>
      <p className="max-w-134.5 text-base text-muted-foreground">
        Our team is committed to redefining digital experiences through
        innovative web solutions while fostering a diverse and collaborative
        environment.
      </p>
    </div>
  );
}
