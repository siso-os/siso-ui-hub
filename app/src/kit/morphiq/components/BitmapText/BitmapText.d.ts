import type { BitmapFieldProps } from '../bitmap-core/bitmap'

export interface BitmapTextProps extends BitmapFieldProps {
  /** Rasterised to the canvas, and used as the element's accessible name. */
  text?: string
  fontFamily?: string
  fontWeight?: number | string
  /** CSS px, or 'auto' to fill the box. */
  fontSize?: number | 'auto'
  /** In em. */
  letterSpacing?: number
  lineHeight?: number
  align?: 'left' | 'center' | 'right'
  /** Inset from the edges, in CSS px. */
  padding?: number
  /** 0 leaves the glyphs solid; 1 is pure particles. */
  grain?: number
}

declare const BitmapText: (props: BitmapTextProps) => JSX.Element
export default BitmapText
