import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface MagneticFieldProps extends ComponentPropsWithoutRef<'div'> {
  /** Filing spacing, px. */
  cell?: number
  /** Filing length, px. */
  length?: number
  /** Filing stroke width, px. */
  thickness?: number
  /** Dipole strength. The gripped patch grows as its cube root, as a stronger magnet's would. */
  moment?: number
  /** Dipole axis, in radians. 0 lies along x. */
  tilt?: number
  /** How fast alignment gives way to the resting angle with distance. */
  falloff?: number
  /** Angle a filing holds when the magnet is far away, in radians. */
  rest?: number
  /** Share of its remaining turn a filing closes per 60 fps frame, 0..1. Applied in real elapsed time, so the feel is the same at any refresh rate. */
  smoothing?: number
  /** How far under the paper the magnet sits, px. Keeps the field finite under the cursor. */
  depth?: number
  /** Filing colour. */
  color?: string
  /** Background behind the filings. */
  background?: string
  /** Rendered above the filings as real content. A control inside that takes keyboard focus draws the magnet to it. */
  children?: ReactNode
}

declare const MagneticField: (props: MagneticFieldProps) => JSX.Element
export default MagneticField
