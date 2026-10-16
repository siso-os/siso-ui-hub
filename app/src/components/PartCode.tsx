// uihub: siso:part-code
// A part's install line and code under the Stage (specs C9 and C10, .agents/plan/2026-10-15-sitemap-and-specs.md):
// Install first (the library's line, then the hub's own for agents), then each file with its line count and a copy
// button. Code is only held for parts whose licence lets us; the rest install with their line.
import { FileCode2 } from "lucide-react"
import type { FullRow, Row } from "@/lib/data"
import { CodeLine, CopyButton } from "@/components/bits"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PartCode({ row, full }: { row: Row; full: FullRow | null | undefined }) {
  if (full === undefined) return <Skeleton className="h-24" />
  const files = (full?.files || []).filter((f) => f.code)
  const lines = files.reduce((n, f) => n + (f.code || "").split("\n").length, 0)
  return (
    <Tabs defaultValue="install" key={row.id} data-verify-part-code>
      <TabsList>
        <TabsTrigger value="install">Install</TabsTrigger>
        <TabsTrigger value="code" disabled={!files.length}>
          Code{files.length > 0 && <span className="ml-1.5 font-mono text-[10.5px] text-muted-foreground tabular-nums">{lines.toLocaleString("en-GB")} lines</span>}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="install" className="mt-3 grid max-w-4xl gap-3 md:grid-cols-2">
        {full?.install && (
          <div className="space-y-1.5 md:col-span-2">
            <div className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Install</div>
            <CodeLine text={full.install} />
          </div>
        )}
        <div className="space-y-1.5">
          <div className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Agents, from a shell</div>
          <CodeLine text={`bin/uihub show ${row.id}`} />
        </div>
        <div className="space-y-1.5">
          <div className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Mark the file that uses it</div>
          <CodeLine text={`// uihub: ${row.id}`} />
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-3 space-y-3">
        {files.map((f) => (
          <div key={f.file} className="overflow-hidden rounded-[14px] border bg-card">
            <div className="flex items-center gap-2 border-b bg-foreground/[0.03] px-3 py-2">
              <FileCode2 className="size-3.5 text-muted-foreground" />
              <span className="font-mono text-xs">{f.file}</span>
              <span className="text-[11px] text-muted-foreground">{(f.code || "").split("\n").length} lines</span>
              <CopyButton text={f.code || ""} className="ml-auto" />
            </div>
            <pre className="max-h-[420px] overflow-auto p-4 font-mono text-xs leading-relaxed"><code>{f.code}</code></pre>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  )
}
