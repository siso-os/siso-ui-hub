// Sign-in for the hosted hub. Shaan, 10 Oct: "re-host I used it as a subdomain so it actually is a subdomain and works
// with the clerk keys you already set up". On *.sisolabs.space the hub opens behind Clerk (the SISO Labs live instance);
// anywhere else (localhost, the Worker, agents) it opens as before. Who sees what is the server's call (functions/):
// his full build for him, the public build for anyone else signed in.
//
// Our own sign-in card, not Clerk's widget. Shaan, 11 Oct 02:4x: "We do need our own custom UI which doesn't say secured
// by clerk", and Google sign-in stuck: Clerk's hash-routed widget never finished turning a new Google account into a user
// ("External account was not found", then a spinner). Google goes out from the card and comes back to /sso-callback,
// which finishes the sign-in, or the sign-up when the account is new, and says what went wrong instead of spinning.
import { ClerkProvider, UserButton, useAuth, useClerk, useSignIn } from "@clerk/clerk-react"
import { useEffect, useState, type ReactNode } from "react"
import { loadIndex, loadMeta } from "@/lib/data"

const KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined
export const hosted = !!KEY && typeof location !== "undefined" && /(^|\.)sisolabs\.space$/.test(location.hostname)
const CALLBACK = "/sso-callback"

const look = {
  variables: { colorPrimary: "#3b82f6", colorBackground: "#0d0d12", colorText: "#ececf1", colorTextSecondary: "#a1a1aa", colorInputBackground: "#15151c", colorInputText: "#ececf1", colorNeutral: "#ececf1", borderRadius: "10px" },
}

const why = (e: unknown) => {
  const x = e as { errors?: { longMessage?: string; message?: string }[]; message?: string }
  return x?.errors?.[0]?.longMessage || x?.errors?.[0]?.message || x?.message || String(e)
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-[18px]" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh place-items-center bg-background p-6" data-verify-sign-in>
      <div className="siso-rim is-idle w-full max-w-sm rounded-[18px] p-1.5">
        <div className="space-y-5 rounded-[14px] bg-card px-6 py-8 text-center">
          <div className="mx-auto grid size-11 place-items-center rounded-xl bg-secondary text-[11px] font-semibold uppercase shadow-[0_0_0_1.5px_color-mix(in_srgb,var(--siso-orange)_40%,transparent)]">SI</div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">SISO · UI Hub</h1>
            <p className="mt-1 text-sm text-muted-foreground">Every UI library, in one place.</p>
          </div>
          {children}
          {/* Clerk's bot check mounts here when a new account signs up */}
          <div id="clerk-captcha" />
        </div>
      </div>
    </div>
  )
}

function Spinner() {
  return <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
}

function SignInCard() {
  const { isLoaded, signIn } = useSignIn()
  const clerk = useClerk()
  const [busy, setBusy] = useState(false)
  const back = new URLSearchParams(location.search)
  const [err, setErr] = useState<string | null>(() => {
    if (back.get("signin") === "more") {
      const missing = clerk.client?.signUp?.missingFields || []
      return `Clerk wants more before it lets this account in${missing.length ? `: ${missing.join(", ")}` : ""}.`
    }
    return back.get("signin") === "retry" ? "That sign-in didn't finish. Try again." : null
  })
  const go = async () => {
    if (!isLoaded || !signIn) return
    setBusy(true)
    setErr(null)
    const here = location.pathname === CALLBACK ? "/" : location.pathname
    try {
      await signIn.authenticateWithRedirect({ strategy: "oauth_google", redirectUrl: CALLBACK, redirectUrlComplete: here })
    } catch (e) {
      setBusy(false)
      setErr(why(e))
    }
  }
  return (
    <Card>
      <button
        type="button"
        onClick={go}
        disabled={busy || !isLoaded}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-white/90 disabled:opacity-60"
        data-verify-google
      >
        {busy ? <Spinner /> : <GoogleMark />}
        {busy ? "Opening Google…" : "Continue with Google"}
      </button>
      {err && <p className="text-xs leading-relaxed text-destructive" data-verify-sign-in-error>{err}</p>}
    </Card>
  )
}

function Callback() {
  const clerk = useClerk()
  const [err, setErr] = useState<string | null>(null)
  useEffect(() => {
    clerk
      .handleRedirectCallback(
        { signInFallbackRedirectUrl: "/", signUpFallbackRedirectUrl: "/", signInUrl: "/?signin=retry", signUpUrl: "/?signin=retry", continueSignUpUrl: "/?signin=more" },
        (to: string) => {
          location.replace(to)
          return Promise.resolve()
        },
      )
      .catch((e: unknown) => setErr(why(e)))
  }, [clerk])
  return (
    <Card>
      {err ? (
        <>
          <p className="text-xs leading-relaxed text-destructive" data-verify-sign-in-error>{err}</p>
          <a href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Back to sign-in</a>
        </>
      ) : (
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground"><Spinner /> Signing you in…</p>
      )}
    </Card>
  )
}

function Gate({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth()
  const atCallback = typeof location !== "undefined" && location.pathname === CALLBACK
  useEffect(() => {
    if (isSignedIn && atCallback) location.replace("/")
  }, [isSignedIn, atCallback])
  if (!isLoaded) return <div className="grid min-h-svh place-items-center text-sm text-muted-foreground">Opening the UI Hub…</div>
  if (!isSignedIn) return atCallback ? <Callback /> : <SignInCard />
  // the data waits for the session, so the first fetch already carries it
  loadIndex()
  loadMeta()
  return <>{children}</>
}

export function Auth({ children }: { children: ReactNode }) {
  if (!hosted) return <>{children}</>
  return (
    <ClerkProvider publishableKey={KEY!} afterSignOutUrl="/" appearance={look}>
      <Gate>{children}</Gate>
    </ClerkProvider>
  )
}

/** the signed-in person's menu (sign out), only on the hosted hub */
export function Me() {
  return hosted ? <UserButton appearance={look} /> : null
}
