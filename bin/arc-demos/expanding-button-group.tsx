// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { Archive, Clock3, Forward, Reply, Trash2 } from "lucide-react";
import { ExpandingButtonGroup } from "../expanding-button-group/expanding-button-group";

type Message = { id: string; subject: string };

export function MessageActions({ message }: { message: Message }) {
  return (
    <ExpandingButtonGroup
      label="Message actions"
      defaultExpanded="reply"
      items={[
        { id: "reply", label: "Reply", icon: <Reply />, onSelect: () => openReply(message.id) },
        { id: "forward", label: "Forward", icon: <Forward />, onSelect: () => openForward(message.id) },
        { id: "archive", label: "Archive", doneLabel: "Archived", icon: <Archive />, onSelect: () => archive(message.id) },
        { id: "snooze", label: "Snooze", doneLabel: "Snoozed", icon: <Clock3 />, onSelect: () => snooze(message.id, "tomorrow-8am") },
        { id: "delete", label: "Delete", doneLabel: "Deleted", tone: "danger", icon: <Trash2 />, onSelect: () => moveToTrash(message.id) },
      ]}
    />
  );
}

function openReply(id: string) {
  console.info(`expanding-button-group: open reply for ${id}`);
}

function openForward(id: string) {
  console.info(`expanding-button-group: open forward for ${id}`);
}

function archive(id: string) {
  console.info(`expanding-button-group: archive ${id}`);
}

function snooze(id: string, when: string) {
  console.info(`expanding-button-group: snooze ${id} until ${when}`);
}

function moveToTrash(id: string) {
  console.info(`expanding-button-group: move ${id} to trash`);
}

const demoMessage: Message = { id: "msg_9f31c7", subject: "Re: launch checklist" };

export default function ExpandingButtonGroupDemo() {
  return <MessageActions message={demoMessage} />;
}
