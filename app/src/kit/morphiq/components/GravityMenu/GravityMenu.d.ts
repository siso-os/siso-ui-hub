import type { ComponentPropsWithoutRef } from 'react'

export interface GravityMenuItem {
  id?: string
  label: string
}

export interface GravityMenuProps extends ComponentPropsWithoutRef<'div'> {
  /** The items, in ring order. An item without an `id` is known by its index. */
  items?: GravityMenuItem[]
  /** Orbital radius, px. A change is ridden out on each item's spring. Default 130. */
  orbit?: number
  /** Angular rate, radians per second. The ring holds still under a hovered, pressed or keyboard-focused item. Default 0.16. */
  spin?: number
  /** G·m of the pointer, px³/s². At `spring · softening³` an item close to the pointer rests halfway to it. Default 2.6e6. */
  mass?: number
  /** Softening ε, px. Caps the force at close range so nothing is flung away. Default 46. */
  softening?: number
  /** Pull back to the orbital slot, 1/s². 0 makes it a free two-body system. Default 26. */
  spring?: number
  /** Damping on an item's motion about its slot, 1/s. `2 · √spring` is critical. Default 7.6. */
  damping?: number
  /** Push instead of pull. The push lets go of the item the pointer is on, so it can still be clicked. Default false. */
  repel?: boolean
  /** Id of the current item, or its index if it has no id. It is marked `aria-current` and filled. */
  value?: string | number
  /** Called with the item's id (or index), the item and its index when it is clicked or activated from the keyboard. */
  onSelect?: (id: string | number, item: GravityMenuItem, index: number) => void
}

declare const GravityMenu: (props: GravityMenuProps) => JSX.Element
export default GravityMenu
