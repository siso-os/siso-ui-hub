import type { ComponentPropsWithoutRef } from 'react'

export interface HalftoneScreenProps extends ComponentPropsWithoutRef<'div'> {
  /** Image URL. Cross-origin images need CORS for their pixels to be read. */
  src?: string
  /** Names the picture, as on an <img>. Empty marks it decorative. A named picture with a loupe is a tab stop: arrows carry the glass, Space or Enter leans in, Escape puts it down. */
  alt?: string
  /** Screen period, px. Smaller is a finer screen. */
  cell?: number
  /** Screen angle of each ink, degrees: [cyan, magenta, yellow, black]. */
  angles?: [number, number, number, number]
  /** Grey-component replacement, 0..1: how much shared grey prints as black. */
  gcr?: number
  /** Paper colour. Any CSS colour. */
  paper?: string
  /** Ink colours: [cyan, magenta, yellow, black]. */
  inks?: [string, string, string, string]
  /** How the image fills the box. */
  fit?: 'cover' | 'contain'
  /** Horizontal alignment of the image within the box, 0..1. */
  focusX?: number
  /** Vertical alignment of the image within the box, 0..1. */
  focusY?: number
  /** Radius of the loupe under the pointer, finger or arrow keys, px. 0 turns it off. */
  loupe?: number
  /** Loupe magnification. */
  magnification?: number
  /** How much closer a held press (or Space / Enter) looks, × magnification. 1 turns it off. */
  press?: number
  /** Time for the glass to come up to its height, ms. 0 is at once. */
  rise?: number
  /** How far the glass trails a moving hand, ms. 0 pins it to the pointer. */
  trail?: number
  /** Device-pixel-ratio cap for the canvas. */
  resolution?: number
}

declare const HalftoneScreen: (props: HalftoneScreenProps) => JSX.Element
export default HalftoneScreen
