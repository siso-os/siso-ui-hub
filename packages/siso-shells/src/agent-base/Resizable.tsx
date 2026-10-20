import { useRef, useState } from "react";
import { cn } from "./cn";
import { load, save } from "./persist";

/**
 * A side panel's width: dragged by its edge, clamped, remembered, and reset by a double-click (Codex: sidebar
 * 240-520 px, 275 default; right panel 340). `edge` is the side the handle sits on.
 */
export function useResizable(opts: { key: string; min: number; max: number; initial: number; edge: "left" | "right" }) {
  const [width, setWidth] = useState(() => load(opts.key, opts.initial));
  const drag = useRef<{ x: number; w: number } | null>(null);
  const handleProps = {
    role: "separator" as const,
    "aria-orientation": "vertical" as const,
    "aria-valuemin": opts.min,
    "aria-valuemax": opts.max,
    "aria-valuenow": width,
    title: "Drag to resize · double-click to reset",
    onPointerDown: (e: React.PointerEvent) => {
      drag.current = { x: e.clientX, w: width };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.x;
      setWidth(Math.min(opts.max, Math.max(opts.min, drag.current.w + (opts.edge === "right" ? dx : -dx))));
    },
    onPointerUp: () => {
      if (drag.current) save(opts.key, width);
      drag.current = null;
    },
    onDoubleClick: () => {
      setWidth(opts.initial);
      save(opts.key, opts.initial);
    },
  };
  return { width, handleProps };
}

/** The grab strip for useResizable, laid over the panel's edge. */
export function ResizeHandle({ edge, label, ...rest }: { edge: "left" | "right"; label: string } & ReturnType<typeof useResizable>["handleProps"]) {
  return <div aria-label={label} className={cn("absolute inset-y-0 z-20 w-2 cursor-col-resize hover:bg-action/30", edge === "right" ? "-right-1" : "-left-1")} {...rest} />;
}

// uihub: siso:shells
