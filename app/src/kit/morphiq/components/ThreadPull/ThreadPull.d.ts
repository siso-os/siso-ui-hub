import type { ComponentPropsWithoutRef } from 'react'

export interface ThreadPullProps extends ComponentPropsWithoutRef<'div'> {
  /** Rendered per glyph, and used as the element's accessible name. */
  text?: string
  /** Thread length as a multiple of its span, 1–10. 1 is taut; above 1 it hangs in a catenary. A change eases in over ~80 ms. */
  slack?: number
  /** Pull-back spring on the hooked point once released, 1/s². It starts from the velocity the thread was let go with. 0 leaves the kink where it was dropped. */
  stiffness?: number
  /** That spring's damping, 1/s, never less than 0.5. With stiffness k the damping ratio is damping / 2√k: at the defaults about 0.5, one swing just past rest, then still. */
  damping?: number
  /** How much the thread's slope beneath a letter tilts it. 0 keeps the letters upright. */
  lean?: number
  /** How much the thread's sag pulls the letters down with it. 0 leaves them on their line. */
  rise?: number
  /** Stroke width, px. The stroke firms up by a quarter under a hovering pointer and by a half while held. */
  thickness?: number
  /** Samples per catenary segment, 2–512. */
  steps?: number
  /** Stroke colour. Defaults to currentColor. */
  color?: string
}

declare const ThreadPull: (props: ThreadPullProps) => JSX.Element
export default ThreadPull
