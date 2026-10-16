// the utils file kit parts import as @/lib/utils when their library does not ship one: cn, plus the helpers a few
// libraries expect beside it (intentui's twJoin, a demo's wait)
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export { twJoin, twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
