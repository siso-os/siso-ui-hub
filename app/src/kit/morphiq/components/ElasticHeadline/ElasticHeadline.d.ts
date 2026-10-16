import type { ComponentPropsWithoutRef } from 'react'

export interface ElasticHeadlineProps extends ComponentPropsWithoutRef<'span'> {
  /** Rendered per glyph, and used as the element's accessible name. */
  text?: string

  /** Neighbour coupling. This is the term that makes the line a wave. */
  stiffness?: number
  /** Pull back to the resting slot. Higher settles flatter, faster. */
  anchor?: number
  /** Air resistance: damps every mode of the line alike, the slow sway included. */
  damping?: number
  /** The elastic's own friction, acting on how fast neighbours move apart. It quiets
   *  the short ripples a release throws off and barely touches the sway; 0 leaves
   *  only `damping`. */
  viscosity?: number
  /** Per-letter mass. Heavier rings lower and longer. */
  mass?: number

  /** How much of the pointer's travel a held letter takes, 0..1. */
  grab?: number
  /** How far, in em, a held letter follows the pointer one-to-one before the elastic
   *  resists; past it the letter gains only logarithmically. `Infinity` follows the
   *  pointer exactly. */
  stretch?: number
  /** How far a hover nudge spreads, in letters. */
  reach?: number
  /** Vertical push from hovering, in px. 0 makes the component drag-only. */
  nudge?: number
  /** How much vertical displacement tilts a glyph. */
  lift?: number
}

declare const ElasticHeadline: (props: ElasticHeadlineProps) => JSX.Element
export default ElasticHeadline
