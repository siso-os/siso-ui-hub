"use client";

import {
  RelativeTime,
  RelativeTimeZone,
  RelativeTimeZoneDate,
  RelativeTimeZoneDisplay,
  RelativeTimeZoneLabel,
} from "@/components/kibo-ui/relative-time";

export const title = "World clock layout";

const zones = [
  { label: "SF", zone: "America/Los_Angeles" },
  { label: "NYC", zone: "America/New_York" },
  { label: "LON", zone: "Europe/London" },
  { label: "TYO", zone: "Asia/Tokyo" },
];

const Example = () => (
  <RelativeTime className="w-full max-w-md rounded-lg border p-4">
    <p className="mb-3 text-sm font-medium">World clock</p>
    {zones.map(({ label, zone }) => (
      <RelativeTimeZone key={zone} zone={zone}>
        <RelativeTimeZoneLabel>{label}</RelativeTimeZoneLabel>
        <div className="flex flex-col items-end gap-0.5">
          <RelativeTimeZoneDate />
          <RelativeTimeZoneDisplay />
        </div>
      </RelativeTimeZone>
    ))}
  </RelativeTime>
);

export default Example;
