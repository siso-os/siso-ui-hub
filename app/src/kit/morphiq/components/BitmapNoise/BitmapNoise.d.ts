import type { BitmapFieldProps } from '../bitmap-core/bitmap'

export interface BitmapNoiseProps extends BitmapFieldProps {
  /** Patch size, in cells. Bigger is blobbier. */
  scale?: number
  /** Drift rate. 0 freezes the field. */
  speed?: number
  /** 0 is a smooth gradient, 1 is hard islands. */
  patch?: number
  /** Fraction of the field that ends up lit. */
  density?: number
  /** Constant lateral push on the second layer. */
  drift?: number
}

declare const BitmapNoise: (props: BitmapNoiseProps) => JSX.Element
export default BitmapNoise
