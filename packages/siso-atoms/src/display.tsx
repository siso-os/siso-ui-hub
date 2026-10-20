// uihub: siso:atoms
"use client";
import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cx } from "./shared";
export type Tone="neutral"|"success"|"warning"|"danger"|"info";
export function Badge({tone="neutral",className,...props}:React.ComponentPropsWithRef<"span">&{tone?:Tone}) {return <span {...props} data-tone={tone} className={cx("siso-a-badge",className)}/>}
export function Status({tone="neutral",children,...props}:React.ComponentPropsWithRef<"span">&{tone?:Tone}) {return <Badge {...props} tone={tone}><span aria-hidden="true" className="siso-a-status-dot"/>{children}</Badge>}
export function Avatar({src,alt,fallback,className,...props}:Omit<React.ComponentPropsWithRef<"span">,"children">&{src?:string;alt:string;fallback?:React.ReactNode}) {const [failed,setFailed]=React.useState(false);React.useEffect(()=>setFailed(false),[src]);return <span {...props} className={cx("siso-a-avatar",className)}>{src&&!failed?<img src={src} alt={alt} onError={()=>setFailed(true)}/>:<span role="img" aria-label={alt}>{fallback??alt.slice(0,2).toUpperCase()}</span>}</span>}
export function AvatarGroup({className,...props}:React.ComponentPropsWithRef<"div">) {return <div {...props} className={cx("siso-a-avatar-group",className)}/>}
export function Progress({value,max=100,label="Progress",className,...props}:Omit<React.ComponentPropsWithRef<"progress">,"value"|"max">&{value?:number;max?:number;label?:string}) {const bound=Number.isFinite(max)&&max>0?max:100;return <progress {...props} aria-label={label} value={value===undefined?undefined:Math.max(0,Math.min(bound,value))} max={bound} className={cx("siso-a-progress",className)}/>}
export function Skeleton({className,...props}:React.ComponentPropsWithRef<"span">) {return <span aria-hidden="true" {...props} className={cx("siso-a-skeleton",className)}/>}
export function Card({className,...props}:React.ComponentPropsWithRef<"div">) {return <div {...props} className={cx("siso-a-card",className)}/>}
export function CardHeader({className,...props}:React.ComponentPropsWithRef<"div">) {return <div {...props} className={cx("siso-a-card-header",className)}/>}
export function CardTitle({className,...props}:React.ComponentPropsWithRef<"h3">) {return <h3 {...props} className={cx("siso-a-card-title",className)}/>}
export function CardContent({className,...props}:React.ComponentPropsWithRef<"div">) {return <div {...props} className={cx("siso-a-card-content",className)}/>}
export function CardFooter({className,...props}:React.ComponentPropsWithRef<"div">) {return <div {...props} className={cx("siso-a-card-footer",className)}/>}
export function Separator({orientation="horizontal",decorative=true,className,...props}:React.ComponentPropsWithRef<"div">&{orientation?:"horizontal"|"vertical";decorative?:boolean}) {return <div {...props} role={decorative?"none":"separator"} aria-orientation={decorative?undefined:orientation} data-orientation={orientation} className={cx("siso-a-separator",className)}/>}
export function Text({muted=false,className,...props}:React.ComponentPropsWithRef<"span">&{muted?:boolean}) {return <span {...props} className={cx("siso-a-text",muted&&"siso-a-muted",className)}/>}
export function Heading({className,...props}:React.ComponentPropsWithRef<"h2">) {return <h2 {...props} className={cx("siso-a-heading",className)}/>}
export function Kbd({className,...props}:React.ComponentPropsWithRef<"kbd">) {return <kbd {...props} className={cx("siso-a-kbd",className)}/>}
export function Code({className,...props}:React.ComponentPropsWithRef<"code">) {return <code {...props} className={cx("siso-a-code",className)}/>}
export function Alert({tone="info",className,...props}:React.ComponentPropsWithRef<"div">&{tone?:Tone}) {return <div role="status" {...props} data-tone={tone} className={cx("siso-a-alert",className)}/>}
export const TooltipProvider=TooltipPrimitive.Provider;
export const Tooltip=TooltipPrimitive.Root;
export const TooltipTrigger=TooltipPrimitive.Trigger;
export function TooltipContent({className,sideOffset=6,...props}:React.ComponentPropsWithRef<typeof TooltipPrimitive.Content>) {return <TooltipPrimitive.Portal><TooltipPrimitive.Content {...props} sideOffset={sideOffset} className={cx("siso-a-tooltip",className)}/></TooltipPrimitive.Portal>}
