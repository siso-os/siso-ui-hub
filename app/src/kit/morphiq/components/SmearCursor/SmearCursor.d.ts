import type { ComponentPropsWithoutRef } from 'react'

export interface SmearCursorProps extends ComponentPropsWithoutRef<'div'> {
  /** The shutter: how long the ribbon remembers, in 60 fps frames at any refresh rate (26 ≈ 0.43 s). */
  samples?: number
  /** Half-width at rest, in px. Neither end of the smear is wider than its distance to that end, so it closes onto the pointer when you stop. */
  width?: number
  /** How hard speed thins the ribbon — the exposure term k in r ∝ 1 / (1 + speed·k). */
  stretch?: number
  /** Pointer easing per 60 fps frame, 0..1. Lower lags further behind the real cursor. */
  smoothing?: number
  /** Fill colour of the ribbon — any canvas colour string. With hideNative it is the cursor's colour too, so it has to stand out from whatever it passes over. */
  color?: string
  /** How separate strokes combine where they cross: additive light, or plain paint. */
  blend?: 'lighter' | 'source-over'
  /**
   * Replace the system cursor with a disc at the rest width. It gives under a press and steps
   * aside wherever the page shows a cursor of its own (a link, a field). Off by default — it is
   * an accessibility cost. The system cursor is hidden only while the disc is being drawn, so it
   * stays until the pointer has been seen, and always under reduced motion, forced colours or
   * increased contrast. A `data-global` host is never under the pointer and has no cursor to hide:
   * there the disc shows wherever the page itself sets `cursor: none`.
   */
  hideNative?: boolean
  /**
   * Let a finger smear too. Off by default, so touch scrolls and zooms as if the component were
   * not there. On, a drag that sets off sideways smears and one that sets off up or down still
   * scrolls the page (touch-action: pan-y pinch-zoom); lifting throws the head on at the speed it
   * was let go with. Set touch-action: none on the host if every drag should smear.
   */
  touch?: boolean
}

/**
 * The canvas is as large as the host. For a trail over the whole page, give a fixed,
 * viewport-sized host `data-global="true"` and `pointer-events: none`: it listens on the window
 * instead of itself.
 *
 * A frame (iframe, object, embed) is another document, and the pointer cannot be seen over it: the
 * smear runs under the frame's edge, and a new one starts where the pointer comes out.
 */
declare const SmearCursor: (props: SmearCursorProps) => JSX.Element
export default SmearCursor
