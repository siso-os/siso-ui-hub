import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface BrushedMetalProps extends ComponentPropsWithoutRef<'div'> {
  /** Grain direction, degrees clockwise like CSS rotate. 0 brushes left to right. */
  angle?: number
  /** Roughness across the grain, 0..1. Higher spreads the streak further. */
  roughness?: number
  /** How much smoother the metal is along the grain than across it, 0..1. 0 is polished, not brushed. */
  anisotropy?: number
  /** Depth of the scratches. 0 is a perfect brushed finish with no visible lines. */
  grain?: number
  /** The metal's reflectance at normal incidence (F0). Any CSS colour — gold is #ffc86e, copper #f6a882. */
  color?: string
  /** Brightness of the light, as it is at its resting height. */
  intensity?: number
  /** The light's height above the panel, px. Lower gives a tighter, more raking highlight. */
  height?: number
  /** How far a press lowers the light, as a share of its height, 0..0.9. Brought closer it lights the metal under it more brightly and draws the streak in. 0 turns it off. */
  press?: number
  /** Device-pixel-ratio cap for the canvas. */
  resolution?: number
  /** Content laid on the plate. It stays real DOM above the canvas. */
  children?: ReactNode
}

declare const BrushedMetal: (props: BrushedMetalProps) => JSX.Element
export default BrushedMetal
