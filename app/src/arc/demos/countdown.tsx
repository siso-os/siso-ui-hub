// From Arc's docs page (Usage), imports pointed at the copied source
import { Countdown } from "../countdown/countdown";

export function LaunchCountdown() {
  return (
    <Countdown
      target="2026-10-06T10:00:00"
      timeZone="America/Los_Angeles"
      label="Keynote starts in"
      onComplete={() => router.refresh()}
    />
  );
}
