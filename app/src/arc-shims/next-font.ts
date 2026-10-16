// next/font/google outside Next: every font loader returns empty class names, so the block falls back to the hub's font
const font = () => ({ className: "", variable: "", style: { fontFamily: "inherit" } })
export default new Proxy(font, { get: () => font })
export const Inter = font, Geist = font, Geist_Mono = font, Roboto = font, Poppins = font, Manrope = font, DM_Sans = font, Space_Grotesk = font, JetBrains_Mono = font, Outfit = font, Plus_Jakarta_Sans = font, Instrument_Serif = font
