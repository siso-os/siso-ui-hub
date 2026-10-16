// uihub: siso:set-mobile-settings
// Settings on a phone, the SISO set's way (a gap ECOSYSTEM named on 15 Oct): you at the top, then grouped rows (a value,
// a switch or a way further in), one destructive action at the bottom, alone. Rows are 52 high so a thumb lands on them.
import { useState, type ReactNode } from "react"
import { Bell, ChevronRight, CircleHelp, Globe, KeyRound, Link2, LogOut, Moon, ScanFace, Send, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Phone } from "./phone"

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}
      className={cn("relative h-[26px] w-[44px] shrink-0 rounded-full transition-colors duration-300", on ? "bg-neon" : "bg-foreground/15")}>
      <span className={cn("absolute top-[3px] left-[3px] size-5 rounded-full bg-background shadow transition-transform duration-300 ease-[cubic-bezier(.19,1,.22,1)]", on && "translate-x-[18px]")} />
    </button>
  )
}

function Row({ icon, label, value, end, onClick }: { icon: ReactNode; label: string; value?: string; end?: ReactNode; onClick?: () => void }) {
  const inner = (
    <>
      <span className="grid size-8 place-items-center rounded-[9px] bg-foreground/[0.06] text-foreground [&>svg]:size-4">{icon}</span>
      <span className="flex-1 text-left text-[15px] text-foreground">{label}</span>
      {value && <span className="text-[15px] text-muted-foreground">{value}</span>}
      {end ?? <ChevronRight className="size-4 text-muted-foreground" />}
    </>
  )
  const cls = "flex h-[52px] w-full items-center gap-3 px-4"
  return end ? <div className={cls}>{inner}</div> : <button onClick={onClick} className={cn(cls, "active:bg-foreground/[0.04]")}>{inner}</button>
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h3 className="px-4 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{title}</h3>
      <div className="divide-y divide-border overflow-hidden rounded-[16px] border border-border bg-card">{children}</div>
    </section>
  )
}

export default function MobileSettings() {
  const [push, setPush] = useState(true)
  const [dark, setDark] = useState(true)
  const [face, setFace] = useState(false)
  return (
    <Phone className="bg-background">
      <div className="space-y-6 px-4 pt-3 pb-8">
        <h1 className="px-1 text-[28px] font-semibold tracking-tight text-foreground">Settings</h1>
        <button className="flex w-full items-center gap-3 rounded-[16px] border border-border bg-card p-3 text-left active:bg-foreground/[0.04]">
          <span className="grid size-12 place-items-center rounded-full bg-neon font-mono text-sm text-neon-ink">AL</span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-medium text-foreground">Ana Lima</span>
            <span className="block truncate text-[13px] text-muted-foreground">ana@example.com</span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
        <Group title="Account">
          <Row icon={<User />} label="Profile" />
          <Row icon={<KeyRound />} label="Password" />
          <Row icon={<Link2 />} label="Linked accounts" value="2" />
        </Group>
        <Group title="Preferences">
          <Row icon={<Bell />} label="Notifications" end={<Switch on={push} onChange={setPush} label="Notifications" />} />
          <Row icon={<Moon />} label="Dark mode" end={<Switch on={dark} onChange={setDark} label="Dark mode" />} />
          <Row icon={<Globe />} label="Language" value="English" />
        </Group>
        <Group title="Privacy">
          <Row icon={<ScanFace />} label="Unlock with Face ID" end={<Switch on={face} onChange={setFace} label="Unlock with Face ID" />} />
        </Group>
        <Group title="Support">
          <Row icon={<CircleHelp />} label="Help" />
          <Row icon={<Send />} label="Send feedback" />
        </Group>
        <button className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[16px] border border-border bg-card text-[15px] text-destructive active:bg-foreground/[0.04]">
          <LogOut className="size-4" /> Sign out
        </button>
        <p className="text-center font-mono text-[11px] text-muted-foreground">Version 2.4.0</p>
      </div>
    </Phone>
  )
}
