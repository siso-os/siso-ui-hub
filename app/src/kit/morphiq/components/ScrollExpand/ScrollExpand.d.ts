import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type ScrollEase = 'inOut' | 'out' | 'linear' | ((t: number) => number)

export interface ScrollExpandProps extends ComponentPropsWithoutRef<'div'> {
  /** Whatever sits inside the frame — an image, a video, a canvas. */
  media?: ReactNode
  /** Starting frame width, as a percentage of the viewport. */
  width?: number
  /** Starting frame height, as a percentage of the viewport. */
  height?: number
  /** Corner radius at rest, in px. */
  radius?: number
  /** Corner radius once fully open, in px. */
  endRadius?: number
  /** Scale the media starts pushed in at. */
  zoom?: number
  /** Peak darkening over the media, 0..1. */
  scrim?: number
  /** Scroll budget, as a multiple of the pinned panel's height. */
  travel?: number
  /** Fraction of that budget spent held fully open. */
  hold?: number
  /** Per-frame approach rate for the eased value. */
  smoothing?: number
  ease?: ScrollEase
  /** Called with raw progress, 0..1, on every frame it changes. */
  onProgress?: (progress: number) => void
  children?: ReactNode
}

declare const ScrollExpand: (props: ScrollExpandProps) => JSX.Element
export default ScrollExpand
