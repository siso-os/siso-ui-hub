// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { useEffect, useState } from "react";
// From Arc's docs page (Usage), imports pointed at the copied source
import { TextShimmer } from "@siso/ui/atoms/source";

export function AssistantStatus({ busy }: { busy: boolean }) {
  return (
    <TextShimmer active={busy}>
      {busy ? "Generating summary" : "Summary ready"}
    </TextShimmer>
  );
}

export default function TextShimmerDemo() {
  const [busy, setBusy] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setBusy(false), 6000);
    return () => clearTimeout(timer);
  }, []);
  return <AssistantStatus busy={busy} />;
}
