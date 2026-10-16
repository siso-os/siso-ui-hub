import { Keyboard } from "../../../ui/keyboard"

export default function KeyboardExample() {
  return (
    <div>
      <Keyboard>⌘ ⌥ ⇧</Keyboard>
      <div aria-hidden className="my-6" />
      <Keyboard>⌘ + K</Keyboard>
    </div>
  )
}
