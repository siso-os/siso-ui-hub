// uihub: siso:app-shell
import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Crumbs } from "./Crumbs"
import { Bookmark, Menu, Moon, PanelLeftOpen, Search, Sun, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useBookmarks } from "@/lib/bookmarks"
import { useIndex } from "@/lib/data"
import { SideNav } from "./SideNav"
import { CommandSearch } from "./CommandSearch"
import { PillSwitch } from "@/components/ui/pill-switch"
import { setTopTab, tabOf, topTabs, useTopTab, type TopTab } from "@/lib/tab"
import { coreOf } from "@/lib/factory"
import { Me } from "@/lib/auth"

// the side nav's width: drag its edge (Shaan, 10 Oct: "drag it from the border"), double-click to reset
const NAV_W = 256
const NAV_MIN = 216
const NAV_MAX = 400

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("uihub.theme", dark ? "dark" : "light")
  }, [dark])
  return [dark, setDark] as const
}

const NOTICE_KEY = "uihub.localNotice"

function LocalNotice() {
  const { store } = useBookmarks()
  const [hidden, setHidden] = useState(() => localStorage.getItem(NOTICE_KEY) === "1")
  // said once, then it goes by itself: it never sits over the page
  useEffect(() => {
    if (store !== "local" || hidden) return
    const t = setTimeout(() => {
      localStorage.setItem(NOTICE_KEY, "1")
      setHidden(true)
    }, 6000)
    return () => clearTimeout(t)
  }, [store, hidden])
  if (store !== "local" || hidden) return null
  return (
    <div role="status" data-verify-bookmark-store="local" className="siso-rim is-idle siso-rise fixed right-4 bottom-4 z-50 flex max-w-sm items-start gap-3 p-3 text-sm">
      <p className="text-muted-foreground">
        The bookmarks API is not running here, so bookmarks are kept in this browser only. Run <code className="font-mono text-xs text-foreground">node serve.mjs</code> to share them with every agent.
      </p>
      <Button
        variant="ghost"
        size="icon"
        className="size-6 shrink-0"
        aria-label="Dismiss"
        onClick={() => {
          localStorage.setItem(NOTICE_KEY, "1")
          setHidden(true)
        }}
      >
        <X className="size-3.5" />
      </Button>
    </div>
  )
}

export function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("uihub.nav.collapsed") === "1")
  const [navW, setNavW] = useState(() => Math.min(NAV_MAX, Math.max(NAV_MIN, Number(localStorage.getItem("uihub.nav.w")) || NAV_W)))
  const tab = useTopTab()
  const [dark, setDark] = useTheme()
  const loc = useLocation()
  const idx = useIndex()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
      if ((e.key === "b" || e.key === "B") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleCollapsed()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [loc.pathname])

  // a page that belongs to one tab opens that tab, so the side nav follows (an item or a kind needs the index)
  useEffect(() => {
    const t = tabOf(decodeURIComponent(loc.pathname), loc.search, idx)
    if (t) setTopTab(t)
  }, [loc.pathname, loc.search, idx])

  // a link to a part of a page (#id) brings it into view under the top bar
  useEffect(() => {
    if (!loc.hash) return
    const t = setTimeout(() => document.getElementById(decodeURIComponent(loc.hash.slice(1)))?.scrollIntoView({ behavior: "smooth", block: "start" }), 60)
    return () => clearTimeout(t)
  }, [loc.hash, loc.pathname])

  // the box stays pinned (Shaan, 10 Oct: "that box should stay pinned"): its rim is a frame over the page, the page
  // scrolls inside it, and the rim lights up next to the pointer
  const frame = useRef<HTMLDivElement>(null)
  const spot = (e: React.MouseEvent<HTMLDivElement>) => {
    const f = frame.current
    if (!f) return
    const r = f.getBoundingClientRect()
    f.style.setProperty("--mx", `${e.clientX - r.left}px`)
    f.style.setProperty("--my", `${e.clientY - r.top}px`)
    f.style.setProperty("--spot", "1")
  }
  const unspot = () => frame.current?.style.setProperty("--spot", "0")
  // the UI Hub's tabs show in the UI Hub; the factory's home and the other cores have none yet
  const inUi = !!idx?.public || coreOf(loc.pathname) === "ui"
  // the whole kit's pages belong to no one scale, so no pill is lit there
  const wholeKit = ["/kit", "/kit/map", "/ours", "/bookmarks"].includes(loc.pathname) || (loc.pathname === "/siso" && !new URLSearchParams(loc.search).get("scale"))

  const toggleCollapsed = () =>
    setCollapsed((c) => {
      localStorage.setItem("uihub.nav.collapsed", c ? "0" : "1")
      return !c
    })

  const resize = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    const x0 = e.clientX
    const w0 = navW
    let w = w0
    const move = (ev: PointerEvent) => {
      w = Math.round(Math.max(NAV_MIN, Math.min(NAV_MAX, w0 + ev.clientX - x0)))
      setNavW(w)
    }
    const up = () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
      document.documentElement.classList.remove("siso-resizing")
      localStorage.setItem("uihub.nav.w", String(w))
    }
    document.documentElement.classList.add("siso-resizing")
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }
  const resetWidth = () => {
    setNavW(NAV_W)
    localStorage.removeItem("uihub.nav.w")
  }

  return (
    <div className="min-h-svh" style={{ "--nav-w": `${navW}px`, "--frame-l": collapsed ? "8px" : `${navW}px` } as React.CSSProperties}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-50 focus:rounded-md focus:bg-popover focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:outline-2 focus:outline-ring">Skip to content</a>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-[var(--nav-w)] bg-sidebar transition-transform duration-200 lg:block",
          collapsed && "-translate-x-full",
        )}
      >
        <SideNav onSearch={() => setSearchOpen(true)} onFold={toggleCollapsed} />
        {!collapsed && <div className="siso-edge" onPointerDown={resize} onDoubleClick={resetWidth} title="Drag to resize · double-click to reset" data-verify-nav-edge />}
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 bg-sidebar p-0 [&>button]:hidden">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SideNav
            onSearch={() => {
              setMobileOpen(false)
              setSearchOpen(true)
            }}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className={cn("transition-[padding] duration-200", collapsed ? "lg:pl-2" : "lg:pl-[var(--nav-w)]")}>
        <header className="siso-topbar sticky top-0 z-20 grid h-14 grid-cols-[auto_1fr_auto] items-center gap-2 border-b bg-background/85 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70 lg:border-b-0 lg:bg-frame lg:px-6 lg:backdrop-blur-none lg:supports-[backdrop-filter]:bg-frame lg:after:hidden">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-8 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
              <Menu className="size-4" />
            </Button>
            {collapsed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden size-8 lg:inline-flex" onClick={toggleCollapsed} aria-label="Open the side nav">
                    <PanelLeftOpen className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open the side nav (⌘B)</TooltipContent>
              </Tooltip>
            )}
            {/* the top tabs, a pill switch: the chosen one shows its name, and it changes the side nav */}
            {inUi && (
              <div className={cn("hidden lg:flex", collapsed && "ml-1")} data-verify-topnav="desktop">
                <PillSwitch label="Top" options={topTabs(idx?.public)} value={wholeKit ? ("" as TopTab) : tab} onChange={setTopTab} />
              </div>
            )}
          </div>
          <Crumbs />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-8 lg:hidden" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="size-4" />
            </Button>
            {/* Saved, and light or dark, in one light pill (looks v7) */}
            <div className="siso-well flex items-center gap-0.5 p-[3px]" data-verify-top-pills>
              {!idx?.public && (
                <Link to="/bookmarks" aria-label="Bookmarks" className="siso-press flex h-7 items-center gap-1.5 rounded-[7px] px-2.5 text-[12.5px] text-foreground/80 hover:bg-foreground/[0.06] hover:text-foreground">
                  <Bookmark className="size-[15px]" strokeWidth={1.75} />
                  Saved
                </Link>
              )}
              <button onClick={() => setDark(!dark)} aria-label="Toggle theme" aria-pressed={dark} title={dark ? "Light" : "Dark"} className="siso-press grid size-7 place-items-center rounded-[7px] text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground">
                {dark ? <Sun className="size-[15px]" strokeWidth={1.75} /> : <Moon className="size-[15px]" strokeWidth={1.75} />}
              </button>
            </div>
            <Me />
          </div>
        </header>
        {/* phones and tablets: the same three links as a slim scrollable row under the bar */}
        <TopLinks className="sticky top-14 z-20 flex gap-1 overflow-x-auto border-b bg-background/85 px-3 py-1.5 backdrop-blur [scrollbar-width:none] supports-[backdrop-filter]:bg-background/70 lg:hidden" />
        <div className="siso-sheet" onMouseMove={spot} onMouseLeave={unspot}>
          <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1600px] px-4 py-6 lg:px-8 lg:py-8">
            {/* no search card on top of the pages (Shaan, 15 Oct: "I don't like how it's got the search up top always ... the
                search UI is already ... in the side nav"); the side nav's bar and ⌘K are the one search */}
            {idx ? (
              <div key={loc.pathname} className="siso-page">
                <Outlet />
              </div>
            ) : (
              <Loading />
            )}
          </main>
        </div>
        <div ref={frame} className="siso-frame" aria-hidden>
          <div className="siso-frame-spot" />
        </div>
      </div>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <LocalNotice />
    </div>
  )
}

/** phones and tablets: the top tabs as a row of words */
function TopLinks({ className }: { className?: string }) {
  const tab = useTopTab()
  const idx = useIndex()
  return (
    <nav className={cn("items-center text-sm", className)} aria-label="Top (phone)" data-verify-topnav="phone">
      {topTabs(idx?.public).map(({ id, to, label }) => {
        const on = tab === id
        return (
          <Link
            key={id}
            to={to}
            onClick={() => setTopTab(id)}
            aria-current={on ? "page" : undefined}
            className={cn(
              "siso-top-tab shrink-0 rounded-[7px] px-3 py-1 font-medium transition-[color,background-color,box-shadow] duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              on ? "bg-accent text-neon-ink" : "text-muted-foreground",
            )}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

function Loading() {
  return (
    <div className="space-y-4" aria-busy>
      <div className="siso-shimmer h-8 w-48 rounded-md" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="siso-shimmer aspect-[4/3] rounded-[14px]" />
        ))}
      </div>
    </div>
  )
}
