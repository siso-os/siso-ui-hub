import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type Falloff = 'linear' | 'smooth' | 'sharp'

export interface WeightGridProps extends ComponentPropsWithoutRef<'div'> {
  /** Number of column tracks. Whole numbers from 1; children flow into them. */
  columns?: number
  /** Number of row tracks. Whole numbers from 1. */
  rows?: number
  /** Extra weight the track nearest the cursor gains, before renormalising. */
  gain?: number
  /** Reach of the cursor's influence, in tracks. */
  cursorRadius?: number
  /**
   * Share of the remaining distance a track closes per 60 fps frame, from 0
   * to 1. Timed by the clock, so it settles at the same speed at any refresh
   * rate. Lower is slower to settle.
   */
  smoothing?: number
  /** Shape of the cursor's bump across its reach. */
  falloff?: Falloff
  /** Grid gap, in px. */
  gap?: number
  /**
   * The cells. Keyboard focus inside one weights it as hovering would; a tap
   * or a sideways drag does the same on touch.
   */
  children?: ReactNode
}

declare const WeightGrid: (props: WeightGridProps) => JSX.Element
export default WeightGrid
