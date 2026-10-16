// Hand-wired: Arc's docs example plus the state and sample data it references
import { useEffect, useState } from "react";
// From Arc's docs page (Usage), imports pointed at the copied source
import { Check } from "lucide-react";
import { Badge } from "../badge/badge";

export function DeployStatus({ live }: { live: boolean }) {
  return (
    <Badge tone={live ? "success" : "neutral"} icon={live ? <Check size={12} /> : undefined}>
      {live ? "Live" : "Draft"}
    </Badge>
  );
}

export default function BadgeDemo() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const tick = setInterval(() => setLive(current => !current), 2000);
    return () => clearInterval(tick);
  }, []);
  return <DeployStatus live={live} />;
}
