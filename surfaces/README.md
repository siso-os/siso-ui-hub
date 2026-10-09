# Surface kinds

Three kinds of surface. Each says what it is for, how it is laid out, and which catalogue items fit it.
A vertical (`verticals/`) names one of these and inherits its rules. Source: round 1, chapter 1 ("How it all fits").

| Kind | Projects | Unit of layout | Stack |
|---|---|---|---|
| [dashboard](dashboard.md) | Agent Base, the Operator, HALO CRM | bands of widgets (widget.v1) | React, Base UI or Radix, tokens |
| [native-app](native-app.md) | the model app | panels and screens around a live show | the same React catalogue inside Tauri |
| [landing-site](landing-site.md) | Café 89, Kikas, the free sites | sections | static HTML or Astro, no JavaScript by default |
