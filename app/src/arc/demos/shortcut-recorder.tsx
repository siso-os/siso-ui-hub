// From Arc's docs page (Usage), imports pointed at the copied source
import { useEffect, useState } from "react";
import { ShortcutRecorder, matchesShortcut, usePlatform } from "../shortcut-recorder/shortcut-recorder";

export function SearchShortcut() {
  const platform = usePlatform();
  const [shortcut, setShortcut] = useState<string | null>("mod+k");

  useEffect(() => {
    if (!shortcut) return;
    const onKey = (event: KeyboardEvent) => {
      if (matchesShortcut(event, shortcut, platform)) { event.preventDefault(); openSearch(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [platform, shortcut]);

  return (
    <ShortcutRecorder
      label="Open search"
      value={shortcut}
      onValueChange={setShortcut}
      resetValue="mod+k"
      bindings={[{ shortcut: "mod+p", label: "Print" }]}
    />
  );
}
