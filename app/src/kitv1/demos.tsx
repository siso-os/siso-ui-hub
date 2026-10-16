// uihub: siso:kit-v1-demos
// Small usage demos for the kit v1 picks that have no demo of their own: shadcn's base parts, the icon sets and our own atoms.
// Keyed by the pick's ref in catalogue/kit-v1.json.
import type { ComponentType } from "react"
import * as L from "lucide-react"
import { SiFigma, SiGithub, SiLinear, SiNotion, SiFramer, SiStripe, SiVercel, SiX, SiYoutube, SiDiscord, SiGoogle, SiApple } from "@icons-pack/react-simple-icons"
import { Separator } from "@/kit/shadcn/ui/separator"
import { AspectRatio } from "@/kit/shadcn/ui/aspect-ratio"
import { ScrollArea } from "@/kit/shadcn/ui/scroll-area"
import { Kbd, KbdGroup } from "@/kit/shadcn/ui/kbd"
import { Button } from "@/kit/shadcn/ui/button"
import { Avatar, AvatarFallback } from "@/kit/shadcn/ui/avatar"
import { Badge } from "@/kit/shadcn/ui/badge"
import { Input } from "@/kit/shadcn/ui/input"
import { Textarea } from "@/kit/shadcn/ui/textarea"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/kit/shadcn/ui/input-otp"
import { Checkbox } from "@/kit/shadcn/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/kit/shadcn/ui/radio-group"
import { Switch } from "@/kit/shadcn/ui/switch"
import { Toggle } from "@/kit/shadcn/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/kit/shadcn/ui/toggle-group"
import { Slider } from "@/kit/shadcn/ui/slider"
import { Spinner } from "@/kit/shadcn/ui/spinner"
import { Skeleton } from "@/kit/shadcn/ui/skeleton"
import { Progress } from "@/kit/shadcn/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/kit/shadcn/ui/tooltip"
import { Image } from "./siso/image"
import { StatusDot } from "./siso/status-dot"
import { ProgressRing } from "./siso/progress-ring"
import { Separator as SisoSeparator } from "./siso/separator"
import { RelativeTime } from "./siso/relative-time"
import { Swatch } from "./siso/swatch"
import { DragHandle } from "./siso/drag-handle"
import { Label } from "@/kit/shadcn/ui/label"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/kit/shadcn/ui/field"

const PIC = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#ffad5e"/><stop offset="1" stop-color="#a78bff"/></linearGradient></defs><rect width="160" height="90" fill="url(#g)"/></svg>')
const Row = ({ children }: { children: React.ReactNode }) => <div className="flex flex-wrap items-center justify-center gap-3">{children}</div>
const UI_ICONS = [L.Menu, L.X, L.Settings, L.Search, L.ArrowRight, L.ChevronDown, L.Plus, L.Trash2, L.Bell, L.User, L.Home, L.Check]
const FILE_ICONS = [L.File, L.FileText, L.FileCode, L.FileImage, L.FileVideo, L.FileAudio, L.FileArchive, L.FileSpreadsheet, L.FileJson]
const BRANDS = [SiGithub, SiFigma, SiLinear, SiNotion, SiFramer, SiStripe, SiVercel, SiX, SiYoutube, SiDiscord, SiGoogle, SiApple]

export const DEMOS: Record<string, ComponentType> = {
  "shadcn:separator": () => (
    <div className="w-56 text-sm">
      <p className="font-medium">Workspace</p>
      <p className="text-muted-foreground">Settings for everyone</p>
      <Separator className="my-3" />
      <div className="flex h-5 items-center gap-3 text-muted-foreground">Docs<Separator orientation="vertical" />Billing<Separator orientation="vertical" />Team</div>
    </div>
  ),
  "shadcn:aspect-ratio": () => (
    <div className="w-64"><AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg"><img src={PIC} alt="" className="size-full object-cover" /></AspectRatio></div>
  ),
  "shadcn:scroll-area": () => (
    <ScrollArea className="h-40 w-48 rounded-md border p-3 text-sm">
      {Array.from({ length: 30 }, (_, i) => <div key={i} className="py-1">Version 1.{i}</div>)}
    </ScrollArea>
  ),
  "shadcn:typography": () => (
    <div className="max-w-sm space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight">Heading one</h1>
      <h2 className="text-xl font-semibold tracking-tight">Heading two</h2>
      <p className="text-sm leading-relaxed">Body text sits at a comfortable measure and line height so a paragraph reads easily.</p>
      <p className="text-sm text-muted-foreground">Muted text for hints and captions.</p>
    </div>
  ),
  "shadcn:kbd": () => <Row><KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup><span className="text-sm text-muted-foreground">to search</span><Kbd>Esc</Kbd></Row>,
  "shadcn:button": () => <Row><Button>Save</Button><Button variant="secondary">Cancel</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Delete</Button><Button size="icon" aria-label="Add"><L.Plus /></Button></Row>,
  "shadcn:avatar": () => <Row><Avatar><AvatarFallback>AL</AvatarFallback></Avatar><Avatar><AvatarFallback>JM</AvatarFallback></Avatar><Avatar className="size-12"><AvatarFallback>KP</AvatarFallback></Avatar></Row>,
  "shadcn:badge": () => <Row><Badge>New</Badge><Badge variant="secondary">Draft</Badge><Badge variant="outline">v2.1</Badge><Badge variant="destructive">Failed</Badge></Row>,
  "shadcn:input": () => <Input className="w-64" placeholder="Email address" />,
  "shadcn:textarea": () => <Textarea className="w-72" placeholder="Write a note…" />,
  "shadcn:input-otp": () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup><InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /></InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup><InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} /></InputOTPGroup>
    </InputOTP>
  ),
  "shadcn:checkbox": () => (
    <div className="space-y-2 text-sm">
      {["Email me updates", "Weekly summary", "Product news"].map((t, i) => <label key={t} className="flex items-center gap-2"><Checkbox defaultChecked={i === 0} />{t}</label>)}
    </div>
  ),
  "shadcn:radio-group": () => (
    <RadioGroup defaultValue="monthly" className="text-sm">
      {["monthly", "yearly", "lifetime"].map((v) => <label key={v} className="flex items-center gap-2"><RadioGroupItem value={v} />{v[0].toUpperCase() + v.slice(1)}</label>)}
    </RadioGroup>
  ),
  "shadcn:switch": () => <label className="flex items-center gap-3 text-sm"><Switch defaultChecked />Notifications</label>,
  "shadcn:toggle": () => <Row><Toggle aria-label="Bold"><L.Bold /></Toggle><Toggle aria-label="Italic" defaultPressed><L.Italic /></Toggle><Toggle variant="outline">Starred</Toggle></Row>,
  "shadcn:toggle-group": () => (
    <ToggleGroup type="single" defaultValue="week" variant="outline">
      <ToggleGroupItem value="day">Day</ToggleGroupItem><ToggleGroupItem value="week">Week</ToggleGroupItem><ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  ),
  "shadcn:slider": () => <div className="w-64 space-y-6"><Slider defaultValue={[40]} max={100} /><Slider defaultValue={[20, 70]} max={100} /></div>,
  "shadcn:spinner": () => <Row><Spinner /><Spinner className="size-6" /><Button disabled><Spinner />Saving</Button></Row>,
  "shadcn:skeleton": () => (
    <div className="flex w-64 items-center gap-3"><Skeleton className="size-10 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-2/3" /></div></div>
  ),
  "shadcn:progress": () => <div className="w-64 space-y-3"><Progress value={30} /><Progress value={72} /></div>,
  "shadcn:tooltip": () => (
    <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger><TooltipContent>Saved 2 minutes ago</TooltipContent></Tooltip></TooltipProvider>
  ),
  lucide: () => <div className="grid grid-cols-6 gap-4">{UI_ICONS.map((I, i) => <I key={i} className="size-5" />)}</div>,
  "lucide:file-*": () => <div className="grid grid-cols-5 gap-4">{FILE_ICONS.map((I, i) => <I key={i} className="size-6" />)}</div>,
  "simple-icons": () => <div className="grid grid-cols-6 gap-4">{BRANDS.map((I, i) => <I key={i} size={22} />)}</div>,
  "build:siso:image": () => (
    <div className="flex gap-3"><Image src={PIC} ratio={4 / 3} className="w-40" alt="Gradient" /><Image src="/missing-image.png" ratio={4 / 3} className="w-40" alt="Missing" /></div>
  ),
  "build:siso:status-dot": () => (
    <div className="space-y-2 text-sm">
      {(["online", "away", "busy", "offline"] as const).map((s) => <div key={s} className="flex items-center gap-2"><StatusDot status={s} ping={s === "online"} />{s}</div>)}
    </div>
  ),
  "build:siso:progress-ring": () => <Row><ProgressRing value={25} label="Upload" /><ProgressRing value={68} size={64} label="Storage" /><ProgressRing value={null} label="Loading" /></Row>,
  "build:siso:separator": () => (
    <div className="w-72 space-y-5 text-sm">
      <div><p className="font-medium">Workspace</p><p className="text-muted-foreground">Settings for everyone</p></div>
      <SisoSeparator look="fade" />
      <SisoSeparator label="or continue with" />
      <SisoSeparator look="dashed" />
      <div className="flex h-5 items-center gap-3 text-muted-foreground">Docs<SisoSeparator orientation="vertical" look="fade" />Billing<SisoSeparator orientation="vertical" />Team</div>
    </div>
  ),
  "build:siso:relative-time": () => (
    <div className="space-y-1.5 text-sm">
      {[5_000, 4 * 60_000, 3 * 3_600_000, 2 * 86_400_000, 40 * 86_400_000].map((ago) => (
        <div key={ago} className="flex gap-3"><span className="w-28 text-muted-foreground">Edited</span><RelativeTime date={Date.now() - ago} /></div>
      ))}
    </div>
  ),
  "build:siso:swatch": () => (
    <div className="space-y-4">
      <Row>{[["Ember", "#ff7a1a"], ["Ink", "#18181b"], ["Mist", "#e4e4e7"], ["Moss", "#4d7c0f"], ["Sky", "#38bdf8"]].map(([n, c]) => <Swatch key={c} color={c} name={n} showValue />)}</Row>
      <Row>{["#f43f5e", "#f59e0b", "#10b981", "#6366f1", "#a855f7", "#71717a"].map((c) => <Swatch key={c} color={c} shape="round" size={24} />)}</Row>
    </div>
  ),
  "build:siso:drag-handle": () => (
    <div className="w-64 space-y-1.5 text-sm">
      {["Design review", "Ship the beta", "Write release notes"].map((t, i) => (
        <div key={t} className="flex items-center gap-2 rounded-lg border border-border px-2 py-1.5"><DragHandle look={i === 2 ? "lines" : "dots"} />{t}</div>
      ))}
    </div>
  ),
  "shadcn:label": () => (
    <div className="grid w-64 gap-2"><Label htmlFor="kv1-email">Email address</Label><Input id="kv1-email" placeholder="you@example.com" /></div>
  ),
  "shadcn:field": () => (
    <div className="w-72 space-y-5">
      <Field><FieldLabel htmlFor="kv1-user">Username</FieldLabel><Input id="kv1-user" defaultValue="sam" /><FieldDescription>Letters and numbers, 3 to 20.</FieldDescription></Field>
      <Field data-invalid="true"><FieldLabel htmlFor="kv1-mail">Email</FieldLabel><Input id="kv1-mail" aria-invalid defaultValue="sam@" /><FieldError>Enter a full email address.</FieldError></Field>
    </div>
  ),
}
