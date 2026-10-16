// Arc's sign-in demos import next/navigation; in the browser a push only logs (aliased in vite.config.ts)
export function useRouter() {
  return { push: (href: string) => console.info("[arc demo] would go to", href), replace: (href: string) => console.info("[arc demo] would replace with", href), back: () => {}, refresh: () => {}, prefetch: () => {} }
}
export function usePathname() {
  return "/"
}
export function useSearchParams() {
  return new URLSearchParams()
}
