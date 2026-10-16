import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface FoldingPanelProps extends ComponentPropsWithoutRef<'div'> {
  /** How many facets the panel is creased into, 1–64. */
  facets?: number
  /** 0 is flat, 1 is fully closed. A change springs there from where the fold is, at the rate it has; under reduced motion, or out of view, it is simply there. */
  fold?: number
  /** Degrees each facet tilts at fold = 1, −90 to 90. The fold falls back from the panel's plane; a negative angle folds it toward the viewer instead. A change springs like a change of fold. */
  maxAngle?: number
  /** Shared vanishing point, px. */
  perspective?: number
  /** Key light position across the panel, 0..1. A change eases in over ~80 ms. */
  light?: number
  /** Floor brightness, 0..1, so a facet turned away is not black. A change eases in over ~80 ms. */
  ambient?: number
  /** Fold across the width or down the height. */
  axis?: 'x' | 'y'
  /** The point of the panel that stays put as the fold narrows it, 0..1 along the fold: 0 hinges it at the left or top edge, 0.5 closes it on its middle, 1 on the right or bottom. A change eases in over ~80 ms. */
  anchor?: number
  /** Spring carrying the crease angle to a new fold or maxAngle, 1/s², at least 1. Infinity — or anything from 100000 up — follows the prop exactly, for a fold that is already animated or scrubbed by its owner. */
  stiffness?: number
  /** That spring's damping, 1/s, 1 to 10000. With stiffness k the damping ratio is damping / 2√k: at the defaults exactly 1, so the fold is there in about a third of a second and does not swing past. Less and it rings. */
  damping?: number
  /** Let a hand fold it. The paper it takes hold of stays under it, the pull stops at flat and at maxAngle, and on release the fold carries on with the hand's speed. The drag takes the fold's axis and leaves the page the other one and the pinch; text in the panel is no longer selectable. */
  drag?: boolean
  /** Called with the fold, 0..1, that a hand or a key is asking for: through a drag, where a released drag will land, and on each key of the keyboard slider. The panel keeps no fold of its own — set `fold` from this, or the paper springs back to `fold` when it is let go. Without it a drag is a pull-and-release and the panel takes no Tab stop. */
  onFoldChange?: (fold: number) => void
  /** Accessible name of the slider that stands in for the drag on a keyboard and for a screen reader. It is rendered only with `drag` and `onFoldChange`: arrows move the fold by 0.05, Page Up and Page Down by 0.2, Home and End take it flat and closed. */
  dragLabel?: string
  /** Painted once per facet, but real once: the first facet's copy is the one a screen reader reads and Tab reaches, and the rest are aria-hidden and inert. Treat it as artwork. */
  children?: ReactNode
}

declare const FoldingPanel: (props: FoldingPanelProps) => JSX.Element
export default FoldingPanel
