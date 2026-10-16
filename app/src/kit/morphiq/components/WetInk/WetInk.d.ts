import type { ComponentPropsWithoutRef } from 'react'

export interface WetInkProps extends ComponentPropsWithoutRef<'div'> {
  /** The word to write. Also the element's accessible name. A new word is written on a fresh sheet once the old one has cleared; of a run of changes, only the last is written. Under reduced motion each word is shown dry as soon as it is worked out, so a slow run may show the ones between. */
  text?: string
  /** CSS font family. The word waits for the face to load rather than drying in the fallback. */
  fontFamily?: string
  /** CSS font weight. */
  fontWeight?: number | string
  /** px, or 'auto' to fit the box. */
  fontSize?: number | 'auto'
  /** Ink colour, #rrggbb; anything else falls back to the default. A change repaints the word as it stands. */
  ink?: string
  /** Paper colour, #rrggbb; anything else falls back to the default. A change repaints the word as it stands. */
  paper?: string
  /** Mean pen speed, px/s: the word takes as long as an even sweep at this speed would. Held to 1 or more, so 0 is a very slow pen, not a stopped one. */
  speed?: number
  /** How far ink wicks through the fibres before it dries. 0 is a dry pen; held to 0–8. Acts on ink still wet. */
  bleed?: number
  /** The paper's machine direction, degrees. Ink bleeds furthest along it. */
  grain?: number
  /** px per simulation cell. Smaller is finer and costs more; held to 1–64. */
  cell?: number
  /** How much the pen keeps a hand's pace — touching down slowly, leaning into heavy strokes, quickening across gaps, easing into the last stroke. 0 sweeps evenly; held to 0–4. The word takes the same time at any value. */
  rhythm?: number
  /** Change to write the word again: what is on the paper clears in a fifth of a second as the new pen touches down. Under reduced motion it is worked out again and shown dry, with nothing seen to move. */
  replay?: unknown
}

declare const WetInk: (props: WetInkProps) => JSX.Element
export default WetInk
