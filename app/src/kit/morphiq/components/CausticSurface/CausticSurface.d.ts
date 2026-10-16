import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface CausticSurfaceProps extends ComponentPropsWithoutRef<'div'> {
  /** Water between surface and floor, px. Deeper focuses the light into a sharper, busier net. */
  depth?: number
  /** Height of the longest wave, px. */
  amplitude?: number
  /** Length of the longest wave, px. The other four are fixed fractions of it. A change rescales the net about the centre of the surface. */
  wavelength?: number
  /** Time scale of the waves. 0 stills them; ripples still run. */
  speed?: number
  /** Strength of the ripple a press or tap drops, or a key that activates something on the surface. A moving pointer sheds weaker ones, scaled by its speed up to three quarters of this; focus arriving by keyboard stirs half of it under the focused element. 0 turns them off. */
  ripple?: number
  /** Brightness of the focused light. */
  intensity?: number
  /** Colour of the light. Any CSS colour. */
  color?: string
  /** Colour of the pool floor, and the fallback where WebGL2 is unavailable. */
  background?: string
  /** Device-pixel-ratio cap for the canvas. Lower is cheaper. */
  resolution?: number
  /** Content laid over the water. It stays real DOM above the canvas. */
  children?: ReactNode
}

declare const CausticSurface: (props: CausticSurfaceProps) => JSX.Element
export default CausticSurface
