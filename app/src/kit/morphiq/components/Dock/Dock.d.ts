import type { ComponentPropsWithoutRef, ComponentType } from 'react'

export interface DockItem {
  id: string
  label: string
  /** Rendered inside the button, given `size` and `color`. */
  Icon: ComponentType<{ size?: number; color?: string }>
}

export interface DockProps extends ComponentPropsWithoutRef<'div'> {
  /** Defaults to the five-icon row the demos show. */
  items?: DockItem[]
  /** Controlled selection. Pass `null` for none. */
  activeId?: string | null
  /** Starting selection when uncontrolled. */
  defaultActiveId?: string | null
  /** Fires on every activation, including deselection, where `id` is null. */
  onSelect?: (id: string | null, item: DockItem | null, index: number) => void

  /** Item size at rest, in px. */
  baseSize?: number
  /** Item size directly under the pointer, in px. */
  magnifiedSize?: number

  surface?: string
  border?: string
  itemBorder?: string
  accent?: string
  icon?: string
}

declare const Dock: (props: DockProps) => JSX.Element
export default Dock
