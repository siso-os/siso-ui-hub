// Look-alikes: the same kind of part from different libraries ("Spotlight Card" from six of them). They are the groups
// Shaan rates to say which of one type he likes best. Shaan, 10 Oct: "which ones are duplicates and need to have my
// rating to tell you which ones are the same types I like more than the others".
import type { Index, Row } from "./data"

const NOISE = /\b(demo|demos|example|examples|preview|variant|variants|component|block|section|shadcn|ui|basic|default|simple|the|a|an|new|v\d+|\d+)\b/g

/** a part's type within its category: its title without numbers, library words and filler */
export const alikeName = (t: string) =>
  t.toLowerCase().replace(/#\d+/g, " ").replace(/[^a-z0-9 ]+/g, " ").replace(NOISE, " ").replace(/\s+/g, " ").trim()

// a read part's type is its reader's pattern ("tier cards with billing toggle"); an unread one's, its cleaned title
export const alikeKey = (r: Pick<Row, "t" | "c" | "pat">) => `${r.c || ""}|${r.pat || alikeName(r.t)}`

export type AlikeGroup = { key: string; name: string; rows: Row[]; libs: number }

/** a category's look-alike groups (two or more libraries each), the widest first */
export function alikeGroups(idx: Index, c: string, sub?: string): AlikeGroup[] {
  const m = new Map<string, Row[]>()
  for (const r of idx.byCategory.get(c) || []) {
    if (sub && r.sb !== sub) continue
    if (r.cp) continue  // an exact copy is the same code as its original: nothing to choose between
    const name = r.pat || alikeName(r.t)
    if (!name) continue
    const k = `${c}|${name}`
    const l = m.get(k)
    if (l) l.push(r)
    else m.set(k, [r])
  }
  return [...m.entries()]
    .map(([key, rows]) => ({ key, name: key.slice(key.indexOf("|") + 1), rows, libs: new Set(rows.map((r) => r.s)).size }))
    .filter((g) => g.libs > 1)
    .sort((a, b) => b.libs - a.libs || b.rows.length - a.rows.length)
}

/** the other parts of a part's own type */
export function alikesOf(idx: Index, row: Row): Row[] {
  if (!row.c) return []
  const k = alikeKey(row)
  return (idx.byCategory.get(row.c) || []).filter((r) => r.id !== row.id && !r.cp && alikeKey(r) === k)
}
