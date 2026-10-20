---
id: P0044
title: Respect reduced motion; never flash
rule: Honour prefers-reduced-motion by replacing movement with fades or nothing, give users a pause control for anything that moves on its own, and never use flashing content.
layer: motion
applies_to: [transition, animation, video, chart]
nodes: [component/chart, component/gallery, component/carousel, section/hero, atom/loader]
strength: must
status: draft
shaan: [hub-0013]
papers: []
clusters: [C0028, C0063, C0186, C0099]
sources:
  - goodui-pattern-48 | Provide clear close control on autoplay video so users retain control over media playback. | https://goodui.org/patterns/48/
  - laws-ux-von-restorff | Carefully consider users with motion sensitivity when using motion to communicate contrast. | https://lawsofux.com/von-restorff-effect/
  - carbon-design-system-ibm-accessibility | Provide captions and transcripts for all videos and animations with meaningful audio. | https://carbondesignsystem.com/guidelines/accessibility/overview/
  - apple-wwdc2020-10020 | Suppress parallax and motion effects when Reduce Motion accessibility setting is enabled. | https://developer.apple.com/videos/play/wwdc2020/10020/
  - modern-svg-animation | Respect prefers-reduced-motion to ensure animations are accessible to users sensitive to motion. | https://blog.openreplay.com/modern-svg-animation-techniques/
  - svg-animations-dev | Respect the prefers-reduced-motion media feature to support users who prefer reduced motion in animations. | https://dev.to/okoye_ndidiamaka_5e3b7d30/svg-animations-how-to-create-crisp-scalable-and-high-performance-web-animations-4mo3
corpus:
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | atom/loader: 1,835 parts (mean 2.74): dark rates 3.01 vs clean 2.15; loop motion 2.87 vs none 1.98 (model-rated) | 2026-10-11
check: Emulate prefers-reduced-motion: reduce and confirm no element translates or scales; autoplaying motion has a pause control; nothing flashes.
updated: 2026-10-11
---

## Why

Large motion can trigger nausea and vestibular symptoms, and flashing can trigger seizures; the user's setting is a medical request.

## Do / Don't

- **Do:** Wrap non-essential transitions in a prefers-reduced-motion: no-preference media query.
- **Don't:** Autoplay a looping animated background with no pause control.

## Evidence

Backing: 9 independent organisations across 17 quoted claims (14 guideline, 2 expert, 1 experiment). Clusters: C0028, C0063, C0186, C0099.

- **GoodUI** (experiment, [goodui-pattern-48](https://goodui.org/patterns/48/)): Provide clear close control on autoplay video so users retain control over media playback.
- **Laws of UX (Jon Yablonski)** (guideline, [laws-ux-von-restorff](https://lawsofux.com/von-restorff-effect/)): Carefully consider users with motion sensitivity when using motion to communicate contrast.
- **IBM** (guideline, [carbon-design-system-ibm-accessibility](https://carbondesignsystem.com/guidelines/accessibility/overview/)): Provide captions and transcripts for all videos and animations with meaningful audio.
- **Apple** (guideline, [apple-wwdc2020-10020](https://developer.apple.com/videos/play/wwdc2020/10020/)): Suppress parallax and motion effects when Reduce Motion accessibility setting is enabled.
- **OpenReplay** (guideline, [modern-svg-animation](https://blog.openreplay.com/modern-svg-animation-techniques/)): Respect prefers-reduced-motion to ensure animations are accessible to users sensitive to motion.
- **DEV Community** (guideline, [svg-animations-dev](https://dev.to/okoye_ndidiamaka_5e3b7d30/svg-animations-how-to-create-crisp-scalable-and-high-performance-web-animations-4mo3)): Respect the prefers-reduced-motion media feature to support users who prefer reduced motion in animations.

## Check

Emulate prefers-reduced-motion: reduce and confirm no element translates or scales; autoplaying motion has a pause control; nothing flashes.
