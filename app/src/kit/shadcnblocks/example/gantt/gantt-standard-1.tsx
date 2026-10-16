"use client";

import {
  GanttFeatureItem,
  GanttFeatureList,
  GanttHeader,
  GanttProvider,
  GanttSidebar,
  GanttSidebarItem,
  GanttTimeline,
  GanttToday,
} from "@/components/kibo-ui/gantt";

export const title = "Basic gantt chart";

const status = { id: "active", name: "Active", color: "#3b82f6" };
const features = [
  {
    id: "1",
    name: "Discovery",
    startAt: new Date("2026-02-01"),
    endAt: new Date("2026-03-15"),
    status,
  },
  {
    id: "2",
    name: "Build",
    startAt: new Date("2026-03-01"),
    endAt: new Date("2026-05-30"),
    status,
  },
  {
    id: "3",
    name: "Launch",
    startAt: new Date("2026-05-15"),
    endAt: new Date("2026-06-30"),
    status,
  },
];

const Example = () => (
  <GanttProvider
    className="h-[420px] w-full max-w-4xl rounded-lg border border-border"
    range="monthly"
    zoom={100}
  >
    <GanttSidebar>
      {features.map((feature) => (
        <GanttSidebarItem key={feature.id} feature={feature} />
      ))}
    </GanttSidebar>
    <GanttTimeline>
      <GanttHeader />
      <GanttFeatureList>
        {features.map((feature) => (
          <GanttFeatureItem key={feature.id} {...feature} />
        ))}
      </GanttFeatureList>
      <GanttToday />
    </GanttTimeline>
  </GanttProvider>
);

export default Example;
