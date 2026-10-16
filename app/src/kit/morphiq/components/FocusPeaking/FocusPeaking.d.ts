import type { ComponentPropsWithoutRef } from 'react'

export interface FocusPeakingProps extends ComponentPropsWithoutRef<'div'> {
  /** Image URL. Cross-origin images need CORS for their pixels to be read. */
  src?: string
  /** Names the picture, as on an <img>. Empty marks it decorative, and hides it
   *  from assistive technology unless it has been given a tabIndex. */
  alt?: string
  /** Leave undefined to peak while a pointer is over the picture, while a finger
   *  rests on it (a tap peaks for a moment), and while keyboard focus is on the
   *  link or button the picture sits in — or on the picture itself, given a
   *  tabIndex. true or false holds it on or off instead. */
  active?: boolean
  /** Peaking colour. Any CSS colour. */
  color?: string
  /** Sobel magnitude an edge must clear to light up, on 0..1 luma. Lower lights softer edges. */
  threshold?: number
  /** How far the picture dims while peaking, 0..1, so the edges carry. */
  dim?: number
  /** Distance around the pointer that peaks, px. 0 peaks the whole image. With a
   *  reach a finger can carry the disc (a sideways drag is then the picture's,
   *  not the page's), and so can the arrow keys while the picture itself has
   *  keyboard focus, which it can once given a tabIndex. */
  reach?: number
  /** Time for peaking to come on, ms; it goes off in 70% of that. 0 switches at once. */
  fade?: number
  /** How far the reach disc trails a moving hand, ms. 0 pins it to the pointer. */
  trail?: number
  /** How the image fills the box. */
  fit?: 'cover' | 'contain'
  /** Horizontal alignment of the image within the box, 0..1. */
  focusX?: number
  /** Vertical alignment of the image within the box, 0..1. */
  focusY?: number
  /** Device-pixel-ratio cap for the canvas. */
  resolution?: number
}

declare const FocusPeaking: (props: FocusPeakingProps) => JSX.Element
export default FocusPeaking
