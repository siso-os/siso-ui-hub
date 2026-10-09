# Surface: native app

**Project:** the model app (Tauri desktop and web). **Who looks:** a model, while live on camera.

- **Layout:** panels and screens around the live show; nothing surprising mid-show.
- **Density:** low. Big targets. Motion only when it means something (ADR 0013), always with reduced motion.
- **Changes:** weekly, behind a go-live gate. STREAMING owns go-live; UI swaps land after the RC ships.
- **Fits:** bell (plus operating-system notifications), toast, timeline (sessions, supporters), stat tile (glance numbers while live), AI answer and chat thread (the Oracle, room chat), drawer and bottom sheet, skeleton.
- **Careful:** hover card (tap on touch), command palette (desktop builds only), tables (become lists when narrow), period filter (only "tonight / this week"), agent run (the Oracle shows steps only when asked).
- **Never:** big virtual grid, tuning panels, landing-site sections.
