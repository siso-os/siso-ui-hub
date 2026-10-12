# The shell is Agent Base's own rail and tabs

## Decision
The factory's frame uses Agent Base's packages as they are: `GroupedRail` and `RailDock` from `@siso/side-nav`,
`PillTabs` from `@siso/shell`, faces from `@halo/agent-face`. Since 05:06 the shell itself is SISO OS's (AGENT-BASE's
module contract), so the factory will hand its cores to that rail as a manifest instead of drawing its own.

## His words
> "in our agent base, like, I really love how the pages, like, the agent base just works I don't know why, the way you
> can have different tabs up top" (idea 16, 10 Oct 2026 04:20)

> "The base comes first ... we know that we're running an operating system. Maybe we should build the base so it's
> actually like that." (idea 25, 10 Oct 2026 05:06)

## Why
He already lives in Agent Base and likes how it works; one shell for every space means one thing to learn and one
thing to make nicer.

## Instead of
- shadcn's sidebar blocks or the Aceternity sidebar (both on the v0.1 pick page; his call there can still swap the look).
- A factory-only shell, which the OS would then have to replace.
