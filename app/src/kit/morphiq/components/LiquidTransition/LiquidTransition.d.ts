import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface LiquidTransitionProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Changing this starts a transition. The new children are swapped in at full cover.
   * Changed again mid-sweep, the fluid carries on or turns back from where it is and
   * swaps in whatever is newest; changed back to the key still on show, it backs out.
   */
  transitionKey?: string | number
  /** The way the front travels. */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** The fluid's colour. Any CSS colour. */
  color?: string
  /** Cover and drain together, ms. Held to at least 200; anything that is not a finite number falls back to 1100. */
  duration?: number
  /** Surface tension. The edge's wobble frequency goes as its square root. */
  tension?: number
  /** How far the middle of the front outruns the walls. 0 is a flat front. */
  lead?: number
  /** How many droplets break off the draining edge, to a length of it: a wider edge sheds more. 0 for none. */
  droplets?: number
  /** Called at full cover, as the content swaps. Not called for a sweep that backs out without swapping. */
  onCovered?: () => void
  /** Called once the fluid has gone and the last droplet has dried. */
  onComplete?: () => void
  /** What is showing for the current `transitionKey`. New children go in at full cover. */
  children?: ReactNode
}

declare const LiquidTransition: (props: LiquidTransitionProps) => JSX.Element
export default LiquidTransition
