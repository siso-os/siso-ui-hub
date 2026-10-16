// A page that fits the window (Shaan, 15 Oct: "a one page navigation, so you don't have to scroll ... maybe you can
// scroll horizontal"): the height from the element's top to the window's foot, less the main's bottom padding.
import { useLayoutEffect, useRef, useState } from "react"

export function useFit<T extends HTMLElement>(gap = 40, min = 480) {
  const ref = useRef<T>(null)
  const [h, setH] = useState(() => Math.max(min, window.innerHeight - 160))
  useLayoutEffect(() => {
    const f = () => {
      const el = ref.current
      if (el) setH(Math.max(min, Math.floor(window.innerHeight - (el.getBoundingClientRect().top + window.scrollY) - gap)))
    }
    f()
    window.addEventListener("resize", f)
    return () => window.removeEventListener("resize", f)
  }, [gap, min])
  return [ref, h] as const
}
