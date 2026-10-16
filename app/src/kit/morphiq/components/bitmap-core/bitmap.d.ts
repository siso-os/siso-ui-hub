import type { ComponentPropsWithoutRef } from 'react'

/**
 * The raster settings the three bitmap components share. They all run the same
 * engine — only the source differs — so the knobs below mean the same thing in
 * each, and are declared once here rather than three times.
 */
export type DitherKernel =
  | 'bayer2'
  | 'bayer4'
  | 'bayer8'
  | 'bayer16'
  | 'floyd'
  | 'atkinson'
  | 'jarvis'
  | 'none'

export interface BitmapFieldProps extends ComponentPropsWithoutRef<'div'> {
  /** Pixels per cell. Smaller is finer and costs more per frame. */
  cell?: number
  /** Tone steps. 2 is one-bit; higher posterises. */
  levels?: number
  dither?: DitherKernel
  /** 0 passes the tone through untouched, 1 applies the kernel in full. */
  ditherAmount?: number
  /** Alternate scan direction. Error-diffusion kernels only. */
  serpentine?: boolean
  contrast?: number
  brightness?: number
  invert?: boolean
  /** Flow-field shear, in cells. */
  warp?: number

  /** Reach of the pointer's influence, in px. */
  cursorRadius?: number
  /** Outward push at the centre of that reach, in px. */
  cursorStrength?: number
  /** Luminance added at the centre of that reach. */
  cursorLift?: number

  color?: string
  /** `null` renders transparent. */
  background?: string | null

  /** Stops the frame loop without unmounting. */
  paused?: boolean
  /** Honour `prefers-reduced-motion`, and keep honouring it if it changes. */
  respectReducedMotion?: boolean
  /** Position the field to the viewport rather than its container. */
  fullscreen?: boolean
}
