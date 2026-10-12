---
name: uihub
description: Pick, install and register UI from SISO's UI Hub (his own 21st.dev): his 138 bookmarked picks with his notes, best-in-category picks, our own components, 11 libraries, the 21st.dev corpus, siso-shell page families, tools such as image generation, and RESEARCH's map of sites and assets. Use before building or restyling any UI in any SISO project, when asked "which component for X", and when you make a component that should be bookmarked or registered.
---

# Using UI Hub

UI Hub is `~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub`. The site, the CLI and the MCP read one index
(`bin/hubindex.py`), so what you see is what Shaan sees.

## The loop

1. **Brief.** `bin/uihub brief <surface|project|vertical>`: the rules, what fits, the picks and decided swaps.
2. **Find.** `bin/uihub find <words> [--kind component|section|page|theme|shell|layout|motion|tool|resource] [--json]`, or the MCP
   tool `find_items`. Results come best first: his picks (HIS love/star/good), then PICK, OURS, rated, reviewed, indexed.
   His note is the intent; read it.
3. **Look.** Open the item on the site (`/c/<id>`) or `bin/uihub show <id>`: live preview URL, his note, licence.
   Never choose from names alone; for a real choice between several, use design-lab.
4. **Take.** `take_item` (MCP) or `show`: install with the item's own line. Library items under MIT may be installed;
   21st.dev items are their authors': install through 21st's line or rebuild against the project's tokens, never paste
   their code into a product. Arc Pro, Kobra and Kinetics are reference only.
5. **Mark.** First line of the component file: `// uihub: <id>`. `bin/uihub check <project>` fails on new component files
   without one.
6. **Register ours.** If nothing fits and you build it: `bin/uihub add siso:<id> --from <path> --reason "<why no pick fits>"`
   before it ships.
7. **Bookmark.** Something good for later: `bin/uihub bookmark <id> --note "<why>"` or MCP `bookmark_item`. Every agent
   sees it. Bookmarks made on the hosted site arrive with `bin/uihub sync`.

## Facts

- Ids: `21st:<author>__<slug>`, `21st-template:`/`21st-theme:`/`21st-shader:`/`21st-gradient:`/`21st-ascii:<owner>__<slug>`
  (preview and link only; open them on 21st), `<lib>:<name>`, `siso:<name>`, `shell:U<n>`, `tool:<name>`, `res:<id>`.
- MCP: `claude mcp add uihub -- python3 ~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub/bin/uihub-mcp`.
- Site, local: `cd app && node serve.mjs` (port 8790). Hosted URL: `.agents/HANDOFF.md`.
- Mounting in Agent Base: `NOTES-FOR-AGENT-BASE.md`.
