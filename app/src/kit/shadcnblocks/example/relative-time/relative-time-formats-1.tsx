"use client";

import {
  RelativeTime,
  RelativeTimeZone,
  RelativeTimeZoneDate,
  RelativeTimeZoneDisplay,
  RelativeTimeZoneLabel,
} from "@/components/kibo-ui/relative-time";

export const title = "Custom formats";

const Example = () => (
  <RelativeTime
    className="w-full max-w-sm"
    dateFormatOptions={{
      weekday: "short",
      month: "short",
      day: "numeric",
    }}
    timeFormatOptions={{
      hour: "numeric",
      minute: "2-digit",
    }}
  >
    <RelativeTimeZone zone="UTC">
      <RelativeTimeZoneLabel>UTC</RelativeTimeZoneLabel>
      <div className="flex flex-col items-end gap-0.5">
        <RelativeTimeZoneDate />
        <RelativeTimeZoneDisplay />
      </div>
    </RelativeTimeZone>
  </RelativeTime>
);

export default Example;
