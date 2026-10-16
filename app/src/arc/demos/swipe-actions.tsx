// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { Archive, MailOpen } from "lucide-react";
import { SwipeActions, SwipeActionsRow } from "../swipe-actions/swipe-actions";

type Message = { id: string; subject: string; from: string; preview: string; unread: boolean; time: string };

const SAMPLE_MESSAGES: Message[] = [
  { id: "m1", subject: "Launch week numbers", from: "Jordan Lee", preview: "Sign-ups doubled across launch week — write-up attached.", unread: false, time: "09:14" },
  { id: "m2", subject: "Kickoff: spring campaign", from: "Dani Reyes", preview: "Run of show for Thursday, plus the shot list from last time.", unread: true, time: "08:02" },
  { id: "m3", subject: "Invoice #2291 paid", from: "Stripe", preview: "Your invoice was paid in full. A receipt is in the billing tab.", unread: false, time: "Yesterday" },
  { id: "m4", subject: "Brand kit v4", from: "Priya Nair", preview: "Marks, the type ramp and the new accent set are all in there.", unread: false, time: "Mon" },
];

function MessagePreview({ message }: { message: Message }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        padding: "12px 14px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: message.unread ? 600 : 500 }}>{message.subject}</span>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{message.time}</span>
      </div>
      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
        {message.from} · {message.unread ? "Unread" : "Read"}
      </span>
      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{message.preview}</span>
    </div>
  );
}

export default function SwipeActionsDemo() {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const unread = messages.filter((message) => message.unread).length;

  function markUnread(id: string) {
    console.info("Marked unread", id);
    setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, unread: true } : message)));
  }

  function archive(id: string) {
    console.info("Archived", id);
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 520 }}>
      <SwipeActions label="Inbox">
        {messages.map((message) => (
          <SwipeActionsRow
            key={message.id}
            label={message.subject}
            leading={[{ label: "Unread", icon: <MailOpen size={18} />, tone: "accent", keepRow: true, onSelect: () => markUnread(message.id) }]}
            trailing={[{ label: "Archive", icon: <Archive size={18} />, tone: "danger", onSelect: () => archive(message.id) }]}
          >
            <MessagePreview message={message} />
          </SwipeActionsRow>
        ))}
      </SwipeActions>
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>
        Swipe a row to the left for Archive; {unread} unread of {messages.length}
      </p>
    </div>
  );
}
