export default function Link({ href, prefetch, replace, scroll, shallow, legacyBehavior, passHref, ...p }: any) {
  return <a href={typeof href === "string" ? href : href?.pathname || "#"} {...p} />
}
