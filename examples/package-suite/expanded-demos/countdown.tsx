import { router } from "./preview-host";
// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { Countdown } from "@siso/ui/atoms/source";

export function LaunchCountdown() {
  return (
    <Countdown
      target={new Date(Date.now()+7*86400000).toISOString()}
      timeZone="America/Los_Angeles"
      label="Keynote starts in"
      onComplete={() => router.refresh()}
    />
  );
}
