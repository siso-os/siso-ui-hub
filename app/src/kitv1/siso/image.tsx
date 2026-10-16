// uihub: siso:image
// An image that holds its shape while loading, fades in, and shows a fallback when the source fails. No library had all three.
import { useState, type ImgHTMLAttributes, type ReactNode } from "react"
import { cn } from "@/arc-shims/kit-utils"

type Props = ImgHTMLAttributes<HTMLImageElement> & { ratio?: number; fallback?: ReactNode; rounded?: boolean }

export function Image({ ratio, fallback, rounded = true, className, style, onLoad, onError, alt = "", ...rest }: Props) {
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading")
  return (
    <div className={cn("relative overflow-hidden bg-muted", rounded && "rounded-lg", className)} style={{ aspectRatio: ratio, ...style }} aria-busy={state === "loading"}>
      {state === "loading" && <div className="absolute inset-0 animate-pulse bg-muted motion-reduce:animate-none" />}
      {state === "failed" ? (
        <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground" role="img" aria-label={alt}>{fallback ?? "Image unavailable"}</div>
      ) : (
        <img
          {...rest}
          alt={alt}
          className={cn("size-full object-cover transition-opacity duration-300 motion-reduce:transition-none", state === "loaded" ? "opacity-100" : "opacity-0")}
          onLoad={(e) => (setState("loaded"), onLoad?.(e))}
          onError={(e) => (setState("failed"), onError?.(e))}
        />
      )}
    </div>
  )
}
