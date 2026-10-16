import { useId } from "react";

import { Label } from "../../../../../shadcn/ui/label";
import { Switch } from "../../../../../shadcn/ui/switch";

export default function SwitchComponent() {
  const id = useId();
  return (
    <div className="inline-flex items-center gap-2 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]">
      <Switch defaultChecked id={id} />
      <Label className="sr-only" htmlFor={id}>
        Colored switch
      </Label>
    </div>
  );
}
