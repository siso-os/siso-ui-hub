import type { ComponentPropsWithoutRef } from 'react'

export interface ElasticRailProps extends ComponentPropsWithoutRef<'div'> {
  /** Simulation nodes along the string, 4 to 256. Default 24. */
  nodes?: number
  /**
   * String tension T. Wave speed is √(T/μ) with μ = 8.3×10⁻⁴ per px, and the
   * pitch follows from that and the rail's own length: f = (1/2L)·√(T/μ).
   * Default 5200.
   */
  tension?: number
  /** How quickly the ring dies, 1/s: its amplitude falls as e^(−damping·t/2). Default 4.5. */
  damping?: number
  /** Px of bulge per px of overscroll. Negative bows it the other way. Default 0.42. */
  give?: number
  /**
   * The most overscroll, px, the rail stands in for on platforms that have
   * none of their own: a wheel, a finger or a scroll key pushing past the end
   * is resisted like a rubber-banding page and never comes to more than this.
   * 0 leaves only the platform's own elastic overscroll. Default 120.
   */
  reach?: number
  /** Stroke width, px. Default 3. */
  thickness?: number
  /** Colour of the fill. currentColor when unset. */
  progressColor?: string
  /** Colour of the track, drawn at 18% opacity. currentColor when unset. */
  trackColor?: string
  /** Run top to bottom rather than left to right. Default false. */
  vertical?: boolean
  /** Element to track. Defaults to the page. */
  target?: HTMLElement | null
}

declare const ElasticRail: (props: ElasticRailProps) => JSX.Element
export default ElasticRail
