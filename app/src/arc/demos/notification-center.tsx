// From Arc's docs page (Usage), imports pointed at the copied source
import { NotificationCenter } from "../notification-center/notification-center";

export function HeaderBell() {
  return (
    <NotificationCenter
      notifications={[
        { id: "1", title: "Deploy finished", time: "2m", tone: "success" },
        { id: "2", title: "Ana commented", time: "1h", actor: { name: "Ana", photo: new URL("../media/ana.jpg", import.meta.url).href } },
      ]}
      onReadChange={(item, read) => markRead(item.id, read)}
      onDismiss={item => dismiss(item.id)}
    />
  );
}
