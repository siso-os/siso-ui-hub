export default function Image({ src, alt = "", fill, priority, quality, placeholder, blurDataURL, loader, unoptimized, style, ...p }: any) {
  const s = typeof src === "string" ? src : src?.src
  return <img src={s} alt={alt} style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style } : style} {...p} />
}
