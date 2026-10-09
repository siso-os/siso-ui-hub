# Surface: landing site

**Projects:** Café 89 (static HTML/CSS/JS), Kikas (Astro 7, one page), the free sites (SISO-SITES owns the engine).
**Who looks:** a passer-by on a phone, once, for a few seconds.

> "this can be a different branch of like we've got a dashboard business os ui kind of thing… but this is like a consumer landing page side" (Shaan, 7 Oct ~00:15)
> "most of these things don't actually need functionality logins databases shit like that They can just be pages" (7 Oct ~00:25)

- **Layout:** sections, in the order the vertical gives: hero, menu, hours and map, photos, reviews, footer ("built by SISO", small).
- **Stack:** static HTML or Astro, no JavaScript by default, Cloudflare Pages, no worker. A chatbot later is one island.
- **Tokens:** colours, fonts and logo per site; every visible word is a copy key, per language (Vietnamese and English first).
- **Versions:** each section is `component@version`; a site records what it runs; a fix bumps the version in the vertical and rolls out on the next build ("a way to track what components are being used what variations or versions").
- **Components:** the vertical's own static section kit. The 11 libraries are references here, not installs.
- **Careful:** toast (only "Message sent"), timeline (a static "our story"), stat band (one, as social proof), drawer (the phone menu, in CSS).
- **Never:** hover cards, bells, palettes, tables, skeletons.
