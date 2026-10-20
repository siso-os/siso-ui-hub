// uihub: siso:tokens
export const sisoThemes = ["dark", "light"] as const
export type SisoTheme = (typeof sisoThemes)[number]
/** Set a local theme without coupling a package to document, storage, or a framework. */
export function setSisoTheme(element: HTMLElement, theme: SisoTheme): void {
  element.setAttribute("data-siso-theme", theme)
  element.setAttribute("data-theme", theme)
  element.classList.toggle("dark", theme === "dark")
  element.classList.toggle("light", theme === "light")
}
export const sisoSpacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const
export const sisoBreakpoints = { phone: 640, tablet: 960, desktop: 1280 } as const

export * from "./frame"
export * from "./sets"
