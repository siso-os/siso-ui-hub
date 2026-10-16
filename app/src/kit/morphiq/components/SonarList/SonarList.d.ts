import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface SonarListProps extends ComponentPropsWithoutRef<'div'> {
  /** Wavefront speed, in px/s. A row is struck at t = d/c, d measured to its nearest edge. */
  speed?: number
  /** Base angular frequency ω, rad/s. */
  frequency?: number
  /** How much ω rises down the list, so it rings as a chord. */
  spread?: number
  /** Damping ratio ζ. Under 1 the row rings; over 1 it just returns. */
  damping?: number
  /** Peak displacement of a row struck from rest, in px. Pings that land in phase add, tethered towards 2×. */
  amplitude?: number
  /** Which way a struck row moves. It is kicked away from the ping along this axis. */
  axis?: 'x' | 'y'
  /** Opacity of the drawn wavefront as it leaves the press point, 0–1, in currentColor, fading out once it has struck the last row. 0 hides it. */
  wavefront?: number
  /** The rows. Each direct child is one row of the list. */
  children?: ReactNode
}

declare const SonarList: (props: SonarListProps) => JSX.Element
export default SonarList
