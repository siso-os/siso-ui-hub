// uihub: siso:set-mobile-onboarding
// Onboarding then sign-in on a phone, the SISO set's way (a gap ECOSYSTEM named on 15 Oct): three short screens you can
// skip, then three ways in, then a six-digit code that moves itself along. One action per screen, at the thumb.
import { useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, Check, Layers, Mail, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Phone } from "./phone"

const SLIDES = [
  { icon: <Layers />, title: "Everything in one place", body: "Your projects, people and files sit together, so nothing is two taps away." },
  { icon: <Zap />, title: "Done while you sleep", body: "Agents pick up the small jobs and leave you a short note when they finish." },
  { icon: <Sparkles />, title: "Yours, the way you like it", body: "Pick what you see first. Change it any time from Settings." },
]

const ease = [0.19, 1, 0.22, 1] as const

function Screen({ k, children }: { k: string; children: ReactNode }) {
  return (
    <motion.div key={k} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease }} className="absolute inset-0 flex flex-col px-6 pt-4 pb-6">
      {children}
    </motion.div>
  )
}

const Primary = ({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled} className="h-[52px] w-full rounded-[16px] bg-foreground text-[15px] font-medium text-background transition-opacity disabled:opacity-30">
    {children}
  </button>
)

function Code({ onDone }: { onDone: () => void }) {
  const [v, setV] = useState(Array(6).fill(""))
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const set = (i: number, c: string) => {
    const d = c.replace(/\D/g, "").slice(-1)
    const next = v.map((x, j) => (j === i ? d : x))
    setV(next)
    if (d && i < 5) refs.current[i + 1]?.focus()
    if (next.every(Boolean)) onDone()
  }
  return (
    <div className="flex justify-between gap-2">
      {v.map((x, i) => (
        <input key={i} ref={(el) => { refs.current[i] = el }} value={x} inputMode="numeric" autoComplete="one-time-code" aria-label={`Digit ${i + 1}`}
          onChange={(e) => set(i, e.target.value)}
          onKeyDown={(e) => { if (e.key === "Backspace" && !x && i) refs.current[i - 1]?.focus() }}
          className="h-14 w-full rounded-[12px] border border-border bg-card text-center font-mono text-xl text-foreground outline-none focus:border-neon" />
      ))}
    </div>
  )
}

export default function MobileOnboarding() {
  const [step, setStep] = useState(0) // 0-2 slides, 3 ways in, 4 email, 5 code, 6 in
  const [email, setEmail] = useState("")
  const back = step > 3 && step < 6 ? () => setStep(step - 1) : undefined
  return (
    <Phone>
      <div className="relative h-full overflow-hidden">
        <div className="flex h-10 items-center justify-between px-4">
          {back ? <button onClick={back} aria-label="Back" className="grid size-9 place-items-center rounded-full text-foreground hover:bg-foreground/[0.06]"><ArrowLeft className="size-5" /></button> : <span />}
          {step < 3 && <button onClick={() => setStep(3)} className="px-2 text-[15px] text-muted-foreground">Skip</button>}
        </div>
        <div className="absolute inset-x-0 top-10 bottom-0">
          <AnimatePresence mode="wait" initial={false}>
            {step < 3 && (
              <Screen k={`s${step}`}>
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <span className="grid size-24 place-items-center rounded-[28px] bg-neon/15 text-neon shadow-[0_0_60px_-10px_var(--color-neon)] [&>svg]:size-10">{SLIDES[step].icon}</span>
                  <h1 className="mt-10 text-[26px] font-semibold tracking-tight text-foreground">{SLIDES[step].title}</h1>
                  <p className="mt-3 max-w-[18rem] text-[15px] leading-relaxed text-muted-foreground">{SLIDES[step].body}</p>
                </div>
                <div className="mb-6 flex justify-center gap-1.5" aria-label={`Screen ${step + 1} of 3`}>
                  {SLIDES.map((_, i) => <span key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i === step ? "w-6 bg-foreground" : "w-1.5 bg-foreground/20")} />)}
                </div>
                <Primary onClick={() => setStep(step + 1)}>{step === 2 ? "Get started" : "Next"}</Primary>
              </Screen>
            )}
            {step === 3 && (
              <Screen k="ways">
                <div className="flex-1 pt-10">
                  <h1 className="text-[28px] font-semibold tracking-tight text-foreground">Sign in</h1>
                  <p className="mt-2 text-[15px] text-muted-foreground">New here? The same steps make your account.</p>
                </div>
                <div className="space-y-3">
                  {["Continue with Apple", "Continue with Google"].map((w) => (
                    <button key={w} onClick={() => setStep(6)} className="h-[52px] w-full rounded-[16px] border border-border bg-card text-[15px] text-foreground active:bg-foreground/[0.04]">{w}</button>
                  ))}
                  <Primary onClick={() => setStep(4)}><span className="inline-flex items-center gap-2"><Mail className="size-4" /> Continue with email</span></Primary>
                  <p className="pt-2 text-center text-[12px] text-muted-foreground">By continuing you agree to the Terms and Privacy Policy.</p>
                </div>
              </Screen>
            )}
            {step === 4 && (
              <Screen k="email">
                <div className="flex-1 pt-6">
                  <h1 className="text-[28px] font-semibold tracking-tight text-foreground">Your email</h1>
                  <p className="mt-2 text-[15px] text-muted-foreground">We'll send a six-digit code. No password.</p>
                  <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email"
                    className="mt-8 h-[52px] w-full rounded-[16px] border border-border bg-card px-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:border-neon" />
                </div>
                <Primary disabled={!/^\S+@\S+\.\S+$/.test(email)} onClick={() => setStep(5)}>Send code</Primary>
              </Screen>
            )}
            {step === 5 && (
              <Screen k="code">
                <div className="flex-1 pt-6">
                  <h1 className="text-[28px] font-semibold tracking-tight text-foreground">Check your email</h1>
                  <p className="mt-2 text-[15px] text-muted-foreground">Enter the code we sent to <span className="text-foreground">{email}</span>.</p>
                  <div className="mt-8"><Code onDone={() => setStep(6)} /></div>
                  <button className="mt-6 text-[15px] text-muted-foreground underline-offset-4 hover:underline">Send a new code</button>
                </div>
              </Screen>
            )}
            {step === 6 && (
              <Screen k="in">
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <span className="grid size-20 place-items-center rounded-full bg-neon text-neon-ink"><Check className="size-9" /></span>
                  <h1 className="mt-8 text-[26px] font-semibold tracking-tight text-foreground">You're in</h1>
                  <p className="mt-2 text-[15px] text-muted-foreground">Your space is ready.</p>
                </div>
                <Primary onClick={() => { setStep(0); setEmail("") }}>Start again</Primary>
              </Screen>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Phone>
  )
}
