import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface ThrownMarqueeProps extends ComponentPropsWithoutRef<'div'> {
  /** Idle drift, px/s, toward the start of the line (leftward in left-to-right text). Negative runs the other way. The drift re-engages from rest, critically damped, after the band is let go. */
  speed?: number
  /** Friction λ, per second. A throw's momentum decays as e^(−λt) on top of the idle drift, so it travels v₀/λ. 0 is frictionless. */
  friction?: number
  /** How much of a flick's measured velocity (a least-squares fit over the last 80 ms) the band takes. */
  throwScale?: number
  /** Fastest a throw can go, px/s. */
  maxSpeed?: number
  /** Space between items, and between copies, px. */
  gap?: number
  /** Hold the drift at rest, braking to it and re-engaging from it without a jump. The hook for your own pause control: a paused band can still be dragged, thrown, scrubbed and stepped. */
  paused?: boolean
  /** Brake the drift to rest while a pointer hovers the band. A throw still glides out on its own friction. A finger cannot hover, so a touch that ends on the band holds the drift until a pointer comes down somewhere else. */
  pauseOnHover?: boolean
  /** Let a horizontal wheel or trackpad scrub the band 1:1. A gesture keeps the axis of its first 8 px, so vertical scrolling always passes through to the page. */
  wheel?: boolean
  /** The items on the band, repeated end to end to fill it. */
  children?: ReactNode
}

declare const ThrownMarquee: (props: ThrownMarqueeProps) => JSX.Element
export default ThrownMarquee
