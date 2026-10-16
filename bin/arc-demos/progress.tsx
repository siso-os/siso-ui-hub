// Hand-wired: Arc's docs example plus the state and sample data it references
import { useEffect, useState } from "react";
// From Arc's docs page (Usage), imports pointed at the copied source
import { Progress } from "../progress/progress";

export function UploadProgress({ sent, size }: { sent: number; size: number }) {
  return <Progress label="Uploading report.pdf" value={sent} max={size} showValue />;
}

const SIZE = 4_800_000;

export default function ProgressDemo() {
  const [sent, setSent] = useState(0);
  useEffect(() => {
    const tick = setInterval(() => {
      setSent(current => (current >= SIZE ? 0 : Math.min(SIZE, current + Math.round(SIZE * (0.03 + Math.random() * 0.05)))));
    }, 400);
    return () => clearInterval(tick);
  }, []);
  return <UploadProgress sent={sent} size={SIZE} />;
}
