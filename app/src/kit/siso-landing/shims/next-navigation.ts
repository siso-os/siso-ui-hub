// uihub: siso:landing (a stand-in for next/navigation, which the landing runs on and the hub does not)
export const usePathname = () => "/"
export const useSearchParams = () => new URLSearchParams()
export const useRouter = () => ({ push() {}, replace() {}, back() {}, forward() {}, refresh() {}, prefetch() {} })
export const useParams = () => ({})
export function notFound(): never { throw new Error("not found") }
export function redirect(_to: string): never { throw new Error("redirect") }
