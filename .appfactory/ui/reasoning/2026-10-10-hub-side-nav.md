# One App Factory icon; its own side nav, where each hub opens its own

## Decision
The App Factory is one module in SISO OS. Its side nav is `HubNav` in `@siso/side-nav`: shadcn's Sidebar as the
engine (vendored, MIT: collapse to icons, ⌘B, the phone sheet, tooltips) wearing HALO's glass rail (the CRM rail's
own classes and tokens). Top to bottom: HALO's four tools, search, then the hubs grouped as he decided at 05:57: Know
who (Industries, Software), Build with (UI, Code), Judge (Law Book), Make (Projects and the kits). Clicking UI Hub,
Industries or Projects swaps the side nav for that hub's own; its search only searches that hub, and a breadcrumb
(App Factory › UI Hub) with a back arrow goes up. The four tools are placeholders from Agent Base's animated glass
icons until he names HALO's four.

## His words
> "I want to have an icon which says apps factory When you click on it, it opens and then I want to start working on
> the side now ... it's kind of just the same show as Shadzian UI but like look at our halo side nav with the four
> icons I don't know what those four icons turns into I'm not going to go into yet but we'll import them in then I
> search ... in there you can have an icon called UI hub you click on that now the side nav changes to the UI hub and
> you got the search and that search now works for that you know and you can still click back this breadcrumb
> somewhere" (idea 31, 10 Oct 2026 05:48)

## Why
One icon keeps SISO OS's rail to three spaces; a side nav that changes with where you are keeps every hub's tools
one click away without a second rail. Building it in `@siso/side-nav` means every space gets it later.

## Instead of
- One rail icon per core (the manifest before 05:49).
- Agent Base's GroupedRail with every core in one long list (the "before" shots).
