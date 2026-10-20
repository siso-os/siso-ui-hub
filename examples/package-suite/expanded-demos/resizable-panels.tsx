// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { ResizablePanel, ResizablePanels } from "@siso/ui/blocks/source";

const folders = [
  { name: "Inbox", count: 24 },
  { name: "Starred", count: 6 },
  { name: "Sent", count: 0 },
  { name: "Drafts", count: 3 },
  { name: "Archive", count: 0 },
  { name: "Trash", count: 0 },
];

const messages = [
  { id: "m1", from: "Maya Chen", subject: "Checkout redesign is merged", preview: "The new flow is on main behind a flag.", at: "09:12" },
  { id: "m2", from: "Deploy bot", subject: "Production deploy failed", preview: "Build step exited 1 after 42s.", at: "08:40" },
  { id: "m3", from: "Ava Mitchell", subject: "Two headline alternatives", preview: "Drafted both, pick one in the standup.", at: "08:05" },
  { id: "m4", from: "Daniel Kim", subject: "Latency by region", preview: "eu-central is 12ms slower since Tuesday.", at: "Yesterday" },
  { id: "m5", from: "Jasmine Brooks", subject: "Component audit", preview: "Forty-one components still on the old tokens.", at: "Yesterday" },
];

/** The `FolderList` the docs example renders but never defines. */
function FolderList() {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 8 }}>
      {folders.map(folder => (
        <li key={folder.name} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 10px", fontSize: 14 }}>
          <span>{folder.name}</span>
          {folder.count > 0 ? <span style={{ opacity: 0.6 }}>{folder.count}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/** The `MessageList` the docs example renders but never defines. */
function MessageList() {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {messages.map(message => (
        <li key={message.id} style={{ display: "grid", gap: 2, padding: "14px 16px", borderBottom: "1px solid color-mix(in srgb, currentColor 12%, transparent)" }}>
          <span style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14, fontWeight: 600 }}>
            <span>{message.from}</span>
            <span style={{ fontWeight: 400, opacity: 0.6 }}>{message.at}</span>
          </span>
          <span style={{ fontSize: 14 }}>{message.subject}</span>
          <span style={{ fontSize: 13, opacity: 0.7 }}>{message.preview}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ResizablePanelsDemo() {
  return (
    <div style={{ height: 480 }}>
      <ResizablePanels label="Mail" onLayoutChange={sizes => console.info("Layout", sizes.map(size => `${size.toFixed(1)}%`).join(" / "))}>
        <ResizablePanel id="folders" label="Folders" defaultSize={22} minSize={160} collapsible>
          <FolderList />
        </ResizablePanel>
        <ResizablePanel id="messages" label="Messages" defaultSize={78}>
          <MessageList />
        </ResizablePanel>
      </ResizablePanels>
    </div>
  );
}
