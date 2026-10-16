import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface ChannelSwitchProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Changing this switches channel. The new children go in while the tube is
   * dark. A change mid-switch carries on from wherever the picture is; one
   * back to the channel still on show reopens it with nothing swapped.
   */
  channel?: string | number
  /**
   * Off and on again, ms, never under 200: about a third going off, a fifth
   * dark, the rest coming on. The vertical hold locks a moment after.
   */
  duration?: number
  /**
   * Phosphor colour. Any colour a canvas can parse — not `currentColor` or a
   * `var()`; one that does not parse falls back to the default.
   */
  color?: string
  /** Phosphor decay constant τ, seconds. Longer leaves more afterglow. */
  persistence?: number
  /** How far out of vertical hold the new picture arrives. 0 locks at once. */
  roll?: number
  /** Called as the new content goes in — once per swap, at once under reduced motion. */
  onSwitched?: () => void
  /** What is showing on the current `channel`. New children go in while the tube is dark. */
  children?: ReactNode
}

declare const ChannelSwitch: (props: ChannelSwitchProps) => JSX.Element
export default ChannelSwitch
