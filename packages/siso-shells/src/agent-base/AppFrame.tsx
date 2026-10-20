/**
 * AppFrame: the SISO desktop shell, laid out like the Codex app (Shaan, 2 Oct: "they've got a top bar spare up there,
 * and then it's like Everything's wrapped in a smaller bar And you've got space along the side And the top").
 *
 *   ┌ top bar: window controls, tabs, layout ────────────────────┐
 *   │ icons │ ╭ frame: the app's sidebar and its work ─────────╮ │
 *   │  ⌂    │ │                                                 │ │
 *   │  ◇    │ │                                                 │ │
 *   │  SS   │ ╰─────────────────────────────────────────────────╯ │
 *
 * The top bar and the icon column sit on the window's darker canvas; everything else sits in one rounded frame.
 * Materials come from the SISO tokens (shell.css).
 */
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "./cn";

export function AppFrame({ top, rail, railFooter, children }: { top: ReactNode; rail: ReactNode; railFooter?: ReactNode; children: ReactNode }) {
  return (
    <div className="siso-app">
      <header className="siso-app__top" data-tauri-drag-region>
        {top}
      </header>
      <nav className="siso-app__rail" aria-label="Spaces">
        {rail}
        <div className="siso-app__rail-gap" />
        {railFooter}
      </nav>
      <div className="siso-app__frame">{children}</div>
    </div>
  );
}

/** One space in the icon column: its name on hover, a dot when something there needs you, dimmed when not built yet. */
/** `dot` marks the button; `dot="alert"` marks it red (something behind it is down). */
export function RailButton({ label, Icon, active, later, dot, onClick }: { label: string; Icon: LucideIcon; active?: boolean; later?: boolean; dot?: boolean | "alert"; onClick?: () => void }) {
  return (
    <button
      type="button"
      className={cn("siso-app__rail-btn", active && "is-active", later && "is-later")}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      title={later ? `${label} · later` : label}
      disabled={later}
      onClick={onClick}
    >
      <Icon aria-hidden="true" />
      {dot && <span className={cn("siso-app__rail-dot", dot === "alert" && "is-alert")} />}
    </button>
  );
}

export function RailDivider() {
  return <span className="siso-app__rail-divider" aria-hidden="true" />;
}

/** A small icon button for the top bar (sidebar toggle and the like). */
export function TopButton({ label, Icon, onClick, pressed }: { label: string; Icon: LucideIcon; onClick: () => void; pressed?: boolean }) {
  return (
    <button type="button" className="siso-app__top-btn" aria-label={label} title={label} aria-pressed={pressed} onClick={onClick}>
      <Icon aria-hidden="true" />
    </button>
  );
}

// uihub: siso:shells
