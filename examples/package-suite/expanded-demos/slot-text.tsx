// uihub: siso:package-workbench
// Hand-wired: Arc's docs show two bare JSX lines; this gives them the state they reference
import { useEffect, useState } from "react";
import { SlotText } from "@siso/ui/atoms/source";

export default function SlotTextDemo() {
  const [revenue, setRevenue] = useState(48210);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setRevenue((r) => r + Math.round(200 + Math.random() * 900));
      setLive((l) => !l);
    }, 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 text-2xl">
      <SlotText value={revenue} format={(value: number) => `$${value.toLocaleString("en-US")}`} announce />
      <SlotText value={live ? "Live now" : "Soon"} spins={2} />
    </div>
  );
}
