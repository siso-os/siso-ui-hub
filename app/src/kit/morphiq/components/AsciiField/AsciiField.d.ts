import type { ComponentPropsWithoutRef } from 'react'

export interface AsciiFieldProps extends ComponentPropsWithoutRef<'div'> {
  /** Reach of the pointer's influence, in px. */
  cursorRadius?: number
  /** Glyph changes per second at the centre of that reach. */
  speed?: number
  color?: string
  /** Resting baseline opacity, before the cursor touches a cell. */
  opacity?: number
  /** Cell scale, holding the 9:16 ratio. Floored just above zero. */
  spacing?: number
  /** The resting glyph. An empty string leaves cells blank. */
  rest?: string
  background?: string
}

declare const AsciiField: (props: AsciiFieldProps) => JSX.Element
export default AsciiField
