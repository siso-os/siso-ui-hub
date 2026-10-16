// Hand-wired: Arc's docs example plus the state and sample data it references
import { ArchiveIcon } from "lucide-react";
import { Tooltip } from "../tooltip/tooltip";

/** The `ArchiveIcon` the docs example references comes from lucide-react, which ships it under that name. */
export default function TooltipDemo() {
  return (
    <Tooltip content="Archive">
      <button
        type="button"
        aria-label="Archive"
        onClick={() => console.info("Archived the selected project")}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, border: "1px solid color-mix(in srgb, currentColor 20%, transparent)", background: "transparent", color: "inherit", cursor: "pointer" }}
      >
        <ArchiveIcon size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </Tooltip>
  );
}
