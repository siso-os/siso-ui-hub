import type { ComponentPropsWithoutRef } from 'react'

export interface FerrofluidNavItem {
  id: string
  label: string
}

export interface FerrofluidNavProps extends ComponentPropsWithoutRef<'div'> {
  /** The nav's items, in order. Each becomes a real `role="tab"` button. */
  items?: FerrofluidNavItem[]
  /** Controlled selection. */
  activeId?: string
  /** Starting selection when uncontrolled. Defaults to the first item. */
  defaultActiveId?: string
  /** Called on click, tap, or arrow / Home / End keys, with the item and its index. */
  onSelect?: (id: string, item: FerrofluidNavItem, index: number) => void

  /**
   * Blend radius across the neck, in px, before speed adds to it — how
   * readily the two ends fuse once they are drawn apart. It never inflates the
   * resting pill. Default 26.
   */
  blend?: number
  /** Extra blend radius at full travel speed, in px, so a fast body holds together across a longer neck. Default 34. */
  stretch?: number
  /** How far the resting pill overhangs an item's box, in px (0 to 120). Default 10. */
  padding?: number
  /** How far the fluid is drawn toward a hovered item, in px; doubled while it is pressed. 0 turns it off. Default 6. */
  reach?: number

  /** Spring constant for the leading end's travel, per s². Default 210. */
  stiffness?: number
  /** Damping coefficient for that spring, per s. Default 22 (ζ ≈ 0.76). */
  damping?: number

  /** Fill colour, any CSS colour. Overrides the `--ffn-fill` custom property. */
  color?: string
}

declare const FerrofluidNav: (props: FerrofluidNavProps) => JSX.Element
export default FerrofluidNav
