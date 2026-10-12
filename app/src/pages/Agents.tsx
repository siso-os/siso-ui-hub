// uihub: siso:page-agents
import { Terminal, Plug, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeLine, CopyButton, PageHeader } from "@/components/bits"
import { usePublic } from "@/lib/data"

/** bookmark tools write to the hub; the public build is read-only, so they are left out there */
const WRITES = /\b(bookmark|sync)\b|bookmark_item|list_bookmarks/
import { useIndex } from "@/lib/data"

const REPO = "<UI_HUB_DIRECTORY>"

const CLI: [string, string][] = [
  ["bin/uihub find <words> [--kind K] [--source S] [--json]", "Search everything the hub holds, best first: his picks, picks, ours, rated, reviewed, indexed."],
  ["bin/uihub show <id> [--json]", "One item: his note, why it is picked, install, licence, docs, code facts, code files."],
  ["bin/uihub stats [--json]", "The counts this site's home board shows (same function)."],
  ['bin/uihub bookmark <id> [--note "…"] [--signal love|star|good|maybe|meh] [--off]', "Bookmark an item for every agent (catalogue/bookmarks.json)."],
  ["bin/uihub export --out app/public", "Write this site's data, previews and live bundles."],
  ["bin/uihub brief <surface|project|vertical>", "The rules, what fits the surface, the picks with install lines, decided swaps. Run before any UI work."],
]

const TOOLS: [string, string][] = [
  ["find_items", "Search everything (query, kind, source, limit)."],
  ["show_item", "One item in full: note, signal, why, install, licence, docs, live URL, code."],
  ["take_item", "Use an item: install line, licence verdict, the `// uihub: <id>` mark, the registration rule, the code."],
  ["list_bookmarks", "His bookmarks (138 picks plus any since), optionally one signal."],
  ["bookmark_item", "Bookmark or un-bookmark an item for every agent."],
  ["hub_stats", "The home board's counts."],
  ["brief", "The UI brief for a surface, project or vertical."],
]

const mcpJson = (hub: string) => JSON.stringify({ mcpServers: { uihub: { command: "python3", args: [`${hub}/bin/uihub-mcp`] } } }, null, 2)

export default function Agents() {
  const pub = usePublic()
  const cli = pub ? CLI.filter(([c]) => !WRITES.test(c)) : CLI
  const tools = pub ? TOOLS.filter(([n]) => !WRITES.test(n)) : TOOLS
  const MCP_JSON = mcpJson(useIndex()?.hub_path || "<path to siso-ui-hub>")
  return (
    <div className="max-w-4xl space-y-10">
      <PageHeader
        title="Agents (MCP + CLI)"
        sub={pub ? "How agents use the hub. The CLI, the MCP server and this site read the same index." : "How agents use the hub. The CLI, the MCP server and this site read the same index, so an agent sees what Shaan sees, his bookmarks included."}
      />
      {pub && (
        <p className="-mt-4 rounded-md border px-3 py-2 text-sm text-muted-foreground" data-verify-readonly>
          This public build is read-only: it lists, searches and shows items, and nothing here writes to the hub.
        </p>
      )}

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Terminal className="size-4 text-muted-foreground" /> CLI
        </h2>
        <p className="text-sm text-muted-foreground">
          From the repo root (<code className="font-mono text-xs">{REPO}</code>). No model, no network.
        </p>
        <div className="space-y-3">
          {cli.map(([cmd, what]) => (
            <div key={cmd} className="space-y-1.5" data-verify-cli>
              <CodeLine text={cmd} />
              <p className="pl-1 text-xs text-muted-foreground">{what}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Plug className="size-4 text-muted-foreground" /> MCP server
        </h2>
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-muted-foreground">Claude Code</div>
          <CodeLine text={`claude mcp add uihub -- python3 ${REPO}/bin/uihub-mcp`} />
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="flex items-center border-b bg-muted/30 px-3 py-1.5">
            <span className="font-mono text-xs">mcp.json</span>
            <CopyButton text={MCP_JSON} className="ml-auto" />
          </div>
          <pre className="overflow-auto p-4 font-mono text-xs leading-relaxed">{MCP_JSON}</pre>
        </div>
        <Card className="gap-2 py-4 shadow-none">
          <CardHeader className="px-4">
            <CardTitle className="text-sm">Tools</CardTitle>
            <CardDescription className="text-xs">stdio, JSON-RPC, no dependencies</CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <ul className="divide-y">
              {tools.map(([n, d]) => (
                <li key={n} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:gap-4">
                  <code className="w-36 shrink-0 font-mono text-xs">{n}</code>
                  <span className="text-sm text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <BookOpen className="size-4 text-muted-foreground" /> The rule and the skill
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Before any UI work run <code className="font-mono text-xs text-foreground">bin/uihub brief &lt;project|surface|vertical&gt;</code>, then take components from the catalogue only.
          </li>
          <li>
            Mark each component file with <code className="font-mono text-xs text-foreground">// uihub: &lt;id&gt;</code>; <code className="font-mono text-xs text-foreground">bin/uihub check &lt;project&gt;</code> fails on files without one.
          </li>
          <li>
            Nothing fits? Build it and register it with <code className="font-mono text-xs text-foreground">bin/uihub add siso:&lt;id&gt; --from &lt;path&gt; --reason "…"</code> before it ships.
          </li>
          <li>
            The <code className="font-mono text-xs text-foreground">ui-bank</code> and <code className="font-mono text-xs text-foreground">ui-pick</code> skills rank his curated picks against a need.
          </li>
        </ol>
      </section>
    </div>
  )
}
