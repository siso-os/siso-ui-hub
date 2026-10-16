import type { ComponentPropsWithoutRef } from 'react'

export type Falloff = 'linear' | 'smooth' | 'sharp'

export interface PressureTextProps extends ComponentPropsWithoutRef<'span'> {
  /** Rendered per glyph, and used as the element's accessible name. */
  text?: string
  /** Resting weight of the single cut the effect thickens. */
  weight?: number
  /** Peak stroke thickening under the cursor, in em. */
  bold?: number
  /** How much width a letter takes from its neighbours, 0..1-ish. */
  spread?: number
  /** Reach of the pointer's influence, in em — it scales with the type. */
  cursorRadius?: number
  /** Per-frame approach rate. Lower is slower to settle. */
  smoothing?: number
  falloff?: Falloff
}

declare const PressureText: (props: PressureTextProps) => JSX.Element
export default PressureText
