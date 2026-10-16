// uihub: siso:kit-slot
// The kit slot a library page is filling (Shaan, 15 Oct: "slowly we're taking all of the stuff we like from the larger
// library and we're bringing it into our SISO kit"). A node page provides it (its base, or the variation tab you are
// on); every card under it gets "Add to kit", which writes the same pick the SISO set and the flip deck write:
// siso/base/<scale>/<node>[/<variation>] with the part's id as the note. One pick per slot.
import { createContext, useContext } from "react"

export type KitSlot = { key: string; label: string; picked?: string; others?: { key: string; label: string }[]; skip?: string }
export const KitSlotContext = createContext<KitSlot | null>(null)
export const useKitSlot = () => useContext(KitSlotContext)
