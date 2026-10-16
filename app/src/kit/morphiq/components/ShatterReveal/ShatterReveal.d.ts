import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface ShatterRevealProps extends ComponentPropsWithoutRef<'div'> {
  /** The image that breaks. */
  src?: string
  /** Describes the image; the strike button is named from it. */
  alt?: string
  /** Controlled state. Leave undefined to shatter on click or Enter. Setting it back to false mends the image. */
  shattered?: boolean
  /** Uncontrolled: start already broken, with the content showing. Default false. */
  defaultShattered?: boolean
  /** Called with the impact point, in px from the top-left, when the image is struck. */
  onShatter?: (point: { x: number; y: number }) => void
  /** Called once the last shard has fallen out of view. */
  onSettle?: () => void
  /** Called once the image is whole again after `shattered` goes back to false. Not called if it is struck again first. */
  onRestore?: () => void
  /** Number of shards. Default 56. */
  shards?: number
  /** Lloyd relaxation passes. 0 leaves raw Voronoi cells, slivers included. Default 2. */
  relax?: number
  /** Strike speed at the point of impact, px/s. Default 560. */
  impulse?: number
  /** px/s². Default 2400. */
  gravity?: number
  /** Quadratic drag coefficient. Higher makes small shards flutter. Default 0.0011. */
  drag?: number
  /** Speed of the crack front, px/s. A shard lets go a beat after the front passes it. 0 breaks everything at once. Default 5200. */
  crack?: number
  /** Seconds for the struck shard to come home when the image is restored; the far ones seat sooner. 0 restores instantly. Default 0.5. */
  mend?: number
  /** Strength of the light under a hovering pointer, 0–1. 0 turns it off. Default 0.08. */
  sheen?: number
  /** Seed for the fracture pattern. The same seed breaks the same way. Default 7. */
  seed?: number
  /** How the image fills the box. Default 'cover'. */
  fit?: 'cover' | 'contain'
  /** What the image covers. */
  children?: ReactNode
}

declare const ShatterReveal: (props: ShatterRevealProps) => JSX.Element
export default ShatterReveal
