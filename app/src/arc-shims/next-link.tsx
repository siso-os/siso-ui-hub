// next/link outside Next: a plain anchor that stays on the page, so a block's links never navigate the hub away
import type { AnchorHTMLAttributes } from "react"
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href?: string | { pathname?: string }; prefetch?: boolean; replace?: boolean; scroll?: boolean; legacyBehavior?: boolean; passHref?: boolean }
export default function Link({ href, prefetch, replace, scroll, legacyBehavior, passHref, onClick, ...rest }: Props) {
  void prefetch; void replace; void scroll; void legacyBehavior; void passHref
  const to = typeof href === "string" ? href : href?.pathname ?? "#"
  return <a href={to} onClick={(e) => { e.preventDefault(); onClick?.(e) }} {...rest} />
}
