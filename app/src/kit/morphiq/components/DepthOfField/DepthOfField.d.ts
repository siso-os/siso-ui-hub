import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface DepthOfFieldProps extends ComponentPropsWithoutRef<'div'> {
  /** f-number. Smaller is a shallower depth of field. */
  aperture?: number
  /** Focal length, mm. */
  focal?: number
  /** Depth of the frontmost card, the first child. Defaults to 200: much closer in, a card two steps of focus from the plane is already at the `maxBlur` ceiling, so most of the stack sits there and a card clears only as the plane arrives. */
  near?: number
  /** Depth of the rearmost card, the last child. The cards between stand at even steps of the focus ring (even in 1/z, not in z), so every card is the same turn of focus from its neighbours and each sharpens and softens by the same amount. */
  far?: number
  /** Where the focal plane rests, 0..1 along the focus ring: 0 is the first card, 1 the last, 0.5 the middle one. Pointing among the cards and keyboard focus rack away from it; a pointer on nothing, or leaving the stack, eases back. */
  focus?: number
  /** Focus by where the pointer is among the cards. Well inside a card the plane is on that card; within the blend distance of another card's visible part it sits between the two, half-way on their shared edge, so a card sharpens as the pointer nears it and softens as it leaves. Off every card the nearest one holds the plane for one blend distance and lets it go to rest over the next. A finger taps a card to rack there, or drags sideways and is followed like a pointer; focus stays on the card it lifts from, and a tap beside the cards sends it back to rest. Off, the plane only moves with `focus`. */
  followPointer?: boolean
  /** Rack to a card while keyboard focus (:focus-visible) is inside it, or a key is pressed there. */
  followKeyboard?: boolean
  /** The blend distance, as a fraction of how deep a pointer can get into the thinnest visible card: how far a neighbouring card's pull reaches into a card, and each way from an edge. Measured from the cards' own boxes where they rest, so it scales with the stack. 0 hands the plane over at the edge; 1 and above leave the thinnest card no place where it is in focus alone. */
  blend?: number
  /** Blur ceiling, px — a wildly defocused card stays a card. Blur is exact up to 70% of it and rolls off toward it above that. */
  maxBlur?: number
  /** How much depth shifts a card with a mouse or pen, measured from the plane the pointer is asking for: a card on it holds still, nearer cards lean with the pointer and farther ones against it, each in one eased move. Applied through `translate`, so a card's own transform is kept. */
  parallax?: number
  /** How closely the pull follows where the pointer says the plane should be: the fraction of the gap one 60 fps frame closes, frame-rate independent. 1 is instant. */
  smoothing?: number
  /** The cards. Each direct child is one card, the first in front and the last at the back. */
  children?: ReactNode
}

declare const DepthOfField: (props: DepthOfFieldProps) => JSX.Element
export default DepthOfField
