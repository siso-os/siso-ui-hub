// uihub: siso:page-packages
// Packages, under the SISO tab (Shaan, 10 Oct: "a place called packages … all the pieces … version one, version two,
// version three and how many times you've iterated"): every SISO UI package and piece, each with its versions.
import { useState, type ReactNode } from "react"
import { GitCommitHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { PKGS, SHOT, pkgIcon, whenAt, type Pkg } from "@/lib/packages"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const Status = ({ s }: { s: string }) => (
  <span className="siso-chip shrink-0 rounded-full px-2 py-px text-[11px] font-normal" data-on={s === "Locked" || undefined}>
    {s}
  </span>
)

/** a version's picture; without one (a build without the local pictures) the card shows the piece's icon */
function Shot({ p, file, className, hide }: { p: Pkg; file?: string; className?: string; hide?: boolean }) {
  const [bad, setBad] = useState(false)
  const I = pkgIcon(p.icon)
  if (!file || bad)
    return hide ? null : (
      <div className={cn("grid place-items-center bg-foreground/[0.03]", className)}>
        <I className="size-8 text-muted-foreground/50" strokeWidth={1.5} />
      </div>
    )
  return <img src={SHOT + file} alt="" loading="lazy" onError={() => setBad(true)} className={cn("object-cover object-top", className)} />
}

function PkgCard({ p, onOpen }: { p: Pkg; onOpen: () => void }) {
  const I = pkgIcon(p.icon)
  const vs = p.versions || []
  const last = vs[0]
  return (
    <button type="button" onClick={onOpen} className="siso-glow-card flex flex-col overflow-hidden text-left" data-verify-pkg={p.id}>
      <Shot p={p} file={last?.shot} className="aspect-[16/9] w-full border-b" />
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center gap-2">
          <I className="size-4 shrink-0 text-neon-ink" strokeWidth={1.75} />
          <span className="min-w-0 flex-1 truncate font-medium">{p.name}</span>
          <Status s={p.status} />
        </div>
        {p.pkg && (
          <div className="font-mono text-[11px] text-muted-foreground">
            {p.pkg}
            {p.code && ` · ${p.code.version}`}
          </div>
        )}
        <p className="line-clamp-2 text-[13px] text-muted-foreground">{p.about}</p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
          {last ? (
            <>
              <span className="font-semibold text-foreground">{last.v}</span>
              <span>{last.when}</span>
              <span className="ml-auto tabular-nums">
                {vs.length} {vs.length === 1 ? "version" : "versions"}
              </span>
            </>
          ) : (
            <span>In use{p.code && ` · ${p.code.commits} commits`}</span>
          )}
        </div>
      </div>
    </button>
  )
}

function PkgDetail({ p }: { p: Pkg }) {
  const I = pkgIcon(p.icon)
  return (
    <>
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <I className="size-4 text-neon-ink" strokeWidth={1.75} />
          {p.name}
          <Status s={p.status} />
        </SheetTitle>
        <SheetDescription>{p.about}</SheetDescription>
        {p.pkg && (
          <div className="font-mono text-xs text-muted-foreground">
            {p.pkg}
            {p.code && ` · ${p.code.version} · ${p.code.commits} commits, ${p.code.first} to ${p.code.last}`}
          </div>
        )}
      </SheetHeader>
      <ol className="space-y-7 px-4 pb-8">
        {(p.versions || []).map((v, i) => (
          <li key={v.v} className="relative pl-5" data-verify-version={v.v}>
            <span className={cn("absolute top-1.5 left-0 size-2 rounded-full", i === 0 ? "bg-neon shadow-[0_0_8px_var(--neon)]" : "bg-muted-foreground/40")} />
            <div className="flex items-baseline gap-2">
              <span className="font-semibold">{v.v}</span>
              <span className="text-xs text-muted-foreground">{v.when}</span>
              {v.commit && (
                <span className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                  <GitCommitHorizontal className="size-3" />
                  {v.commit}
                </span>
              )}
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{v.note}</p>
            <Shot p={p} file={v.shot} hide className="mt-3 aspect-[16/10] w-full rounded-lg border" />
          </li>
        ))}
        {!p.versions?.length && <li className="text-sm text-muted-foreground">In use in Agent Base. Its versions start here the first time the shell changes it.</li>}
      </ol>
    </>
  )
}

const Group = ({ title, n, children }: { title: string; n: number; children: ReactNode }) => (
  <section className="mb-10">
    <h2 className="siso-kicker mb-3">
      {title} · {n}
    </h2>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{children}</div>
  </section>
)

export default function Packages() {
  const [open, setOpen] = useState<Pkg | null>(null)
  const pieces = PKGS.packages.filter((p) => p.versions?.length).sort((a, b) => whenAt(b.versions![0].when) - whenAt(a.versions![0].when))
  const inUse = PKGS.packages.filter((p) => !p.versions?.length)
  const versions = pieces.reduce((n, p) => n + p.versions!.length, 0)
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[26px] leading-[1.1] font-semibold lg:text-[30px]">Packages</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          SISO's UI packages and the pieces inside them. {pieces.length} pieces have been through {versions} versions, newest first; {inUse.length} more are in use. Open one to see every version.
        </p>
      </div>
      <Group title="The shell's pieces" n={pieces.length}>
        {pieces.map((p) => (
          <PkgCard key={p.id} p={p} onOpen={() => setOpen(p)} />
        ))}
      </Group>
      <Group title="In use" n={inUse.length}>
        {inUse.map((p) => (
          <PkgCard key={p.id} p={p} onOpen={() => setOpen(p)} />
        ))}
      </Group>
      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">{open && <PkgDetail p={open} />}</SheetContent>
      </Sheet>
    </div>
  )
}
