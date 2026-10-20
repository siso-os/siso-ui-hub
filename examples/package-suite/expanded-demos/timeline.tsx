// uihub: siso:package-workbench
// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { Timeline, type TimelineEvent } from "@siso/blocks/source";

const events: TimelineEvent[] = [
  { id: "e1", at: "2026-09-22T09:12:00Z", actor: "Maya", title: "merged Checkout redesign into main", meta: "PR #482" },
  { id: "e2", at: "2026-09-22T08:40:00Z", title: "Deploy failed", tone: "danger", detail: <pre>Build step exited 1</pre> },
];

/** Reference time for the relative labels: 11:30 that same morning in UTC. */
const now = Date.UTC(2026, 8, 22, 11, 30);

export default function TimelineDemo() {
  return <Timeline events={events} now={now} label="Project activity" maxHeight={420} />;
}
