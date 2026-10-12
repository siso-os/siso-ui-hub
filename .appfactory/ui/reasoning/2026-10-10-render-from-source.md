# Render every component from its own code

## Decision
A render service (`factory/render/server.mjs`) draws any component straight from its source in its own repo: TSX
transpiled on the server with Sucrase, packages from esm.sh on one React, local imports read-only. It runs on its own
port (its own origin), so outside code never runs where the factory's data lives. 21st picks show in 21st's own build.

## His words
> "origin UI yeah so these are just all showcases, they're really nice and clean, but these are just all showcases, see
> they've actually got the code used and rendered, which is interesting, I wonder if we could actually just partition
> the code and run them on our UI hub on a separate worker or something like that on a separate web page and it renders
> into the thing that way we can see it because I notice a lot of these things we can't actually see it" (idea 20, 10 Oct 2026 04:43)

## Why
He picks by looking. A list of names, or a screenshot that goes stale, can't show a component in its real states. The
same service serves the pick page now and the component page next, so it's built once.

## Instead of
- Screenshots (a picture, not the thing; stale after the next commit).
- Storybook per project (a build per repo and a config per component).
- Installing each candidate into a scratch app (slow; touches lockfiles).
