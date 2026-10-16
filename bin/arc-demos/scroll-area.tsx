// Hand-wired: Arc's docs example plus the state and sample data it references
import { ScrollArea } from "../scroll-area/scroll-area";

const events = [
  { id: "a1", text: "Maya merged Checkout redesign into main" },
  { id: "a2", text: "Deploy to production failed after 42s" },
  { id: "a3", text: "Ava opened PR #486: two headline alternatives" },
  { id: "a4", text: "Daniel rotated the staging database password" },
  { id: "a5", text: "Jasmine registered 41 components against the new tokens" },
  { id: "a6", text: "Ryan moved 3 deals into Contract sent" },
  { id: "a7", text: "Hannah resolved 12 support tickets" },
  { id: "a8", text: "Olivia sharded the events table by month" },
  { id: "a9", text: "Chloe published the weekly retention report" },
  { id: "a10", text: "Mateo shipped build 2.4.1 to TestFlight" },
  { id: "a11", text: "Tyler booked two discovery calls" },
  { id: "a12", text: "Nathan closed the flaky checkout test" },
  { id: "a13", text: "Emma updated the design tokens for radius" },
  { id: "a14", text: "Sofia scheduled the quarterly offsite" },
];

export default function ScrollAreaDemo() {
  return (
    <ScrollArea maxHeight={320} label="Recent activity">
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {events.map(event => (
          <li key={event.id} style={{ padding: "10px 14px", fontSize: 14, borderBottom: "1px solid color-mix(in srgb, currentColor 12%, transparent)" }}>
            {event.text}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
