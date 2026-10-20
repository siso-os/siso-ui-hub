# Types: what each part is, where it goes, how good it is

Shaan, 11 Oct 02:4x: "we didn't actually start going through these comps and categorizing them into what types they were in
a more detailed spec". The goal: "re-categorizing them way more detailed ... figure out how to put everything and how to
reorganize it from first principles, how it can actually be useful ... rated as well and which ones are duplicates".

A category says what a part is called. To use a part you need to know more: where it goes, what kind it is, and whether it
is any good. So each part gets one label (`types/labels/*.jsonl`, merged by `bin/types merge` into `types.jsonl`):

| field | what it holds | words from |
|---|---|---|
| `what` | one plain sentence: what you see and what it does | free, at most 18 words |
| `level` | primitive, component, section, page, shell, effect, logic, theme, or demo (a state of another part) | `vocab.json` levels |
| `cat` | its group/category, corrected when the rules got it wrong (5 of 20 read by hand were wrong) | `taxonomy.json` |
| `pattern` | the kind within its category: "tier cards with billing toggle", "single big quote" | `vocab.json` patterns, or a new short phrase |
| `slots` | where it goes, as surface:slot (landing:hero, dashboard:sidebar, ai:composer, any:action) | `vocab.json` slots |
| `look`, `motion`, `fits` | up to three looks, one motion, up to three industries | `vocab.json` |
| `rating`, `why` | 1 to 5 against the rubric, and why in a few words | `vocab.json` rating |

From first principles (A0 note 4, 7 Oct): a site or app is surfaces (a landing site, a dashboard, a mobile app, an AI
app, a shop, docs, a portfolio), each a set of slots; a part is useful when you know which slot it fills, which kind it
is among the others for that slot, and how it ranks. The hub browses by any of these, shows the best first, and puts parts
of the same pattern side by side so Shaan can rate the ones he likes.

Variants and byte-identical copies take their base's label (`from`). Assets (icons, logos, sounds) are not labelled.

  bin/typecard ID ...          # a part's card: what a reader reads
  bin/types batches            # cards and picture sheets for the parts still to read ($TYPES_WORK, default _data/ui-types)
  bin/types check | merge

Read by: ECOSYSTEM by hand (`labels/hand-ecosystem.jsonl`, 20 parts, the reference), then Haiku agents, one batch each.
