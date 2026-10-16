import type { BitmapFieldProps } from '../bitmap-core/bitmap'

export interface BitmapImageProps extends BitmapFieldProps {
  src?: string
  /** As on `<img>`: describe the picture, or leave empty to mark it decorative. */
  alt?: string
  fit?: 'cover' | 'contain' | 'fill'
  /** Crop anchor, 0..1. */
  focusX?: number
  focusY?: number
  onStatus?: (status: 'ready' | 'empty' | 'tainted') => void
}

declare const BitmapImage: (props: BitmapImageProps) => JSX.Element
export default BitmapImage
