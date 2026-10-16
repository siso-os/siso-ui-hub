// Arc's blocks import next/image; the hub is Vite, so a plain <img> stands in (aliased in vite.config.ts)
import type { ImgHTMLAttributes } from "react"

export type StaticImageData = { src: string; width?: number; height?: number }
type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string | StaticImageData; fill?: boolean; priority?: boolean; quality?: number; placeholder?: string; blurDataURL?: string }

export default function Image({ src, fill, priority: _p, quality: _q, placeholder: _ph, blurDataURL: _b, style, ...rest }: Props) {
  const url = typeof src === "string" ? src : src.src
  return <img src={url} style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style } : style} {...rest} />
}
