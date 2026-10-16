// Hand-wired: Arc's docs example plus the state and sample data it references
import { useEffect, useState } from "react";
// From Arc's docs page (Usage), imports pointed at the copied source
import { TextMorph } from "../text-morph/text-morph";

export function PublishButton({ state }: { state: "idle" | "busy" | "done" }) {
  const label = state === "idle" ? "Publish" : state === "busy" ? "Publishing" : "Published";
  return (
    <button type="button">
      <TextMorph>{label}</TextMorph>
    </button>
  );
}

export default function TextMorphDemo() {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  useEffect(() => {
    const tick = setInterval(() => {
      setState(current => (current === "idle" ? "busy" : current === "busy" ? "done" : "idle"));
    }, 1500);
    return () => clearInterval(tick);
  }, []);
  return <PublishButton state={state} />;
}
