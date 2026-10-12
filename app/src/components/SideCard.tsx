// The right-hand box on a part's page. Shaan, 10 Oct: "design it for the right hand side card and how it fits in".
// Everything needed to judge and use a part sits beside its preview, in the order a decision runs: whose it is and where
// it sits, his rating, how to use it, the facts, then its look-alikes from other libraries. It wears the Halo rim.
import { useMemo, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { Code2, ExternalLink, GitCompareArrows } from "lucide-react"
import { cn } from "@/lib/utils"
import { SIGNALS, authorHref, catLink, catName, fmtNum, groupLabel, itemHref, useIndex, type FullRow, type Row } from "@/lib/data"
import { setBookmark, useBookmarks } from "@/lib/bookmarks"
import { alikeKey, alikesOf } from "@/lib/alike"
import { hostOf } from "@/lib/codebank"
import { Stars } from "@/components/ItemCard"
import { BookmarkToggle, CodeLine, StatusDot } from "@/components/bits"
import { fmtLen } from "@/components/Sound"

const CHIP = "siso-chip inline-flex h-6 items-center rounded-md px-2 text-[11.5px] text-foreground/80 hover:text-foreground"

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="truncate text-[12.5px]">{children}</dd>
    </div>
  )
}

export function SideCard({ row, full, actions }: { row: Row; full: FullRow | null | undefined; actions?: ReactNode }) {
  const idx = useIndex()!
  const { items: marks } = useBookmarks()
  const sig = marks[row.id]?.signal || row.sig
  const alikes = useMemo(() => alikesOf(idx, row), [idx, row])
  const alikeLibs = useMemo(() => new Set(alikes.map((r) => r.s)).size, [alikes])
  const page = full?.page || full?.preview_link || row.pl
  const code = full?.code_path ? `https://github.com/sisodias/siso-ui-code/blob/main/${full.code_path}` : null
  const owner = full?.reg || row.a || row.s
  const ownerHref = full?.reg ? `/libraries/${encodeURIComponent(full.reg)}` : row.a ? authorHref(row.a) : "/libraries"
  const style = full?.style || row.sy || []
  const deps = full?.deps || []
  const t = full?.type
  const facts: [string, ReactNode][] = [
    ["Goes in", t?.slots?.length ? t.slots.map((x) => x.replace(":", " · ")).join(", ") : null],
    ["Level", t?.level || null],
    ["Look", t?.look?.length ? t.look.join(", ") : null],
    ["Motion", t?.motion && t.motion !== "none" ? t.motion : null],
    ["Fits", t?.fits?.length ? t.fits.join(", ") : null],
    ["Kind", idx.kind_labels[row.k] || row.k],
    ["Framework", full?.fw || row.fw || (full?.reg ? "React" : null)],
    ["Style", style.length ? style.join(", ") : null],
    ["Variants", row.vn ? fmtNum(row.vn) : null],
    ["Builds on", deps.length ? `${deps.length} package${deps.length > 1 ? "s" : ""}` : null],
    ["Installs", row.u ? fmtNum(row.u) : null],
    ["Licence", full?.licence || null],
    ["Length", row.du ? fmtLen(row.du) : null],
    ["Sound licence", full?.audio_licence || null],
    ["Made by", full?.audio_author || null],
    ["Picture", full?.picture_from || null],
    ["Code held", full?.reg ? (full.held ? "Yes, in siso-ui-code" : full.refused || "No") : null],
  ]
  return (
    <aside className="h-fit lg:sticky lg:top-20" data-verify-side-card>
      <div className="siso-rim is-idle rounded-[18px] p-1.5">
        <div className="space-y-4 rounded-[14px] bg-card p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-[11px] font-semibold uppercase shadow-[0_0_0_1.5px_color-mix(in_srgb,var(--siso-orange)_40%,transparent)]">
              {(owner || "?").slice(0, 2)}
            </span>
            <div className="min-w-0">
              <Link to={ownerHref} className="block truncate text-sm font-medium hover:underline" data-verify-owner>
                {owner}
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <StatusDot status={row.st} withLabel />
              </div>
            </div>
          </div>

          <nav aria-label="Where it sits" className="flex flex-wrap items-center gap-1 text-muted-foreground" data-verify-place>
            {row.g && (
              <Link to={`/browse/${row.g}`} className={CHIP}>
                {groupLabel(row.g)}
              </Link>
            )}
            {row.c && (
              <>
                <span className="text-xs">›</span>
                <Link to={catLink(idx, row.c)} className={CHIP}>
                  {catName(idx, row.c)}
                </Link>
              </>
            )}
            {row.c && row.sb && (
              <>
                <span className="text-xs">›</span>
                <Link to={`${catLink(idx, row.c)}?sub=${encodeURIComponent(row.sb)}`} className={CHIP}>
                  {row.sb}
                </Link>
              </>
            )}
          </nav>

          {(full?.type?.what || row.rt) && (
            <div className="space-y-2 rounded-xl border bg-foreground/[0.02] px-3 py-2.5" data-verify-type>
              {full?.type?.what && <p className="text-[13px] leading-snug">{full.type.what}</p>}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] text-muted-foreground">
                {row.rt ? (
                  <span className="inline-flex items-center gap-1.5" title="A reader's rating against the hub's rubric: 5 would ship as it is, 3 works but is plain, 1 did not work">
                    <Stars n={row.rt} /> {row.rt} of 5{full?.type?.why ? ` · ${full.type.why}` : ""}
                  </span>
                ) : null}
              </div>
              {row.pat && row.c && (
                <Link to={`${catLink(idx, row.c)}?type=${encodeURIComponent(row.pat)}`} className={cn(CHIP, "text-[11px]")} data-verify-pattern>
                  Type: {row.pat}
                </Link>
              )}
            </div>
          )}

          {!idx.public && (
            <div className="space-y-1.5" data-verify-rating>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Your rating</span>
                <BookmarkToggle row={row} className="size-7 rounded-lg border" />
              </div>
              <div className="grid grid-cols-5 gap-1" role="group" aria-label="Rate it">
                {SIGNALS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setBookmark(row.id, true, { signal: s })}
                    aria-pressed={sig === s}
                    className={cn(
                      "siso-press h-8 rounded-lg border text-[11px] capitalize transition-colors",
                      sig === s ? "border-neon/60 bg-neon/10 text-neon-ink" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2.5">
            {full?.install && <CodeLine text={full.install} />}
            {actions}
            {(page || code) && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                {page && (
                  <a href={page} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                    Open on {hostOf(page)} <ExternalLink className="size-3" />
                  </a>
                )}
                {code && (
                  <a href={code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground" data-verify-code-link>
                    <Code2 className="size-3" /> Code in siso-ui-code
                  </a>
                )}
              </div>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 border-t pt-3.5" data-verify-facts>
            {facts.filter(([, v]) => v !== null && v !== undefined && v !== "").map(([k, v]) => (
              <Fact key={k} label={k}>
                {v}
              </Fact>
            ))}
          </dl>

          {(full?.copy_of || full?.copies?.length || full?.near_copies?.length) && (
            <div className="space-y-1 rounded-xl border border-dashed px-3 py-2.5 text-xs text-muted-foreground" data-verify-copies>
              {full?.copy_of ? (
                <p>
                  {full.copy_sim ? "Nearly the same code as" : "The same code as"}{" "}
                  <Link to={itemHref(full.copy_of)} className="text-foreground hover:underline">
                    {idx.byId.get(full.copy_of)?.t || full.copy_of}
                  </Link>{" "}
                  from {full.copy_of.split(":")[0]}
                  {full.copy_sim ? ` (${Math.round(full.copy_sim * 100)}% alike): an edited copy.` : ": an exact copy."}
                </p>
              ) : full?.copies?.length ? (
                <p>
                  Copied exactly by {full!.copies!.length} {full!.copies!.length === 1 ? "library" : "libraries"}:{" "}
                  {full!.copies!.slice(0, 4).map((c, i) => (
                    <span key={c}>
                      {i ? ", " : ""}
                      <Link to={itemHref(c)} className="text-foreground hover:underline">
                        {c.split(":")[0]}
                      </Link>
                    </span>
                  ))}
                  {full!.copies!.length > 4 ? ` and ${full!.copies!.length - 4} more` : ""}.
                </p>
              ) : null}
              {!full?.copy_of && full?.near_copies?.length ? (
                <p>
                  Nearly copied (edited) by {full.near_copies.length} {full.near_copies.length === 1 ? "library" : "libraries"}:{" "}
                  {full.near_copies.slice(0, 4).map((c, i) => (
                    <span key={c}>
                      {i ? ", " : ""}
                      <Link to={itemHref(c)} className="text-foreground hover:underline">
                        {c.split(":")[0]}
                      </Link>
                    </span>
                  ))}
                  {full.near_copies.length > 4 ? ` and ${full.near_copies.length - 4} more` : ""}.
                </p>
              ) : null}
            </div>
          )}

          {alikes.length > 0 && row.c && (
            <Link
              to={`/compare/${row.c}?k=${encodeURIComponent(alikeKey(row))}`}
              className="flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-sm hover:bg-foreground/[0.04]"
              data-verify-alikes
            >
              <span className="flex items-center gap-2">
                <GitCompareArrows className="size-4 text-neon-ink" />
                Compare {fmtNum(alikes.length)} {row.pat ? "of the same type" : `look-alike${alikes.length > 1 ? "s" : ""}`}
              </span>
              <span className="text-xs text-muted-foreground">{alikeLibs} {alikeLibs > 1 ? "libraries" : "library"}</span>
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
