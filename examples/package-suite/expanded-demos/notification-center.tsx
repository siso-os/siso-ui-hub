// uihub: siso:package-workbench
// uihub: siso:package-workbench
import { useState } from "react";
// From Arc's docs page (Usage), imports pointed at the copied source
import { NotificationCenter } from "@siso/blocks/source";

export function HeaderBell() {
  const [lastAction, setLastAction] = useState("Select a notification action");
  const markRead = (id: string, read: boolean) => setLastAction(`${id}: ${read ? "read" : "unread"}`);
  const dismiss = (id: string) => setLastAction(`Dismissed ${id}`);
  return (
    <div style={{display:"grid",gap:16,justifyItems:"center"}}><NotificationCenter
      notifications={[
        { id: "1", title: "Deploy finished", time: "2m", tone: "success" },
        { id: "2", title: "Ana commented", time: "1h", actor: { name: "Ana", photo: "/brand/siso-mark.png" } },
      ]}
      onReadChange={(item, read) => markRead(item.id, read)}
      onDismiss={item => dismiss(item.id)}
    /><p role="status" style={{fontSize:12,color:"var(--text-muted)"}}>{lastAction}</p></div>
  );
}
