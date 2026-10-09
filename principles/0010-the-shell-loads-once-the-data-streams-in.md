# ADR 0010: The shell loads once; the data streams in

Status: accepted, round 1 (7 Oct 2026)

> "it loads reloads the whole thing the whole side now… the wireframes already load and everything loads like everything should load and then just the data loads afterwards"
>
> — Shaan, 28 Sep, HALO CRM

- **The shell never reloads.** The side nav, top bar and page frame draw at once and don't reload when you navigate; only the content area changes.
- **Wireframe first.** A page draws its bands and skeletons at real sizes before any data arrives. Data then fills in place without anything jumping.
- **Last good data first.** Show the last good data immediately with its age, then refresh it.

## Check

with the network throttled, click between pages.

- The nav doesn't flash.
- Layout shift stays under 0.05.
- The first frame appears within 200 ms.
