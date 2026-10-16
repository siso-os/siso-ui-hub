// uihub: siso:landing (a stand-in for next/link, which the landing runs on and the hub does not)
import type { AnchorHTMLAttributes, ReactNode } from "react"
type Href = string | { pathname?: string; hash?: string }
export default function Link({ href, children, prefetch: _p, scroll: _s, replace: _r, ...rest }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: Href; children?: ReactNode; prefetch?: boolean; scroll?: boolean; replace?: boolean }) {
  return <a href={typeof href === "string" ? href : `${href.pathname ?? ""}${href.hash ? `#${href.hash}` : ""}`} {...rest}>{children}</a>
}
