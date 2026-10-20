---
id: P0036
title: Respond in 0.1 s; show progress past 1 s; show percent and cancel past 10 s
rule: Acknowledge every action within 0.1 s; for waits of about 2 to 10 s show an indeterminate indicator; past 10 s show percent done, time left and a way to cancel.
layer: state
applies_to: [button, spinner, progress-bar, toast]
nodes: [atom/button, atom/loader, atom/progress, component/toast]
strength: should
status: draft
shaan: [hub-0013, hub-0009]
papers: [W03]
clusters: [C0263]
sources:
  - laws-ux-doherty-threshold | Provide system feedback within 400 milliseconds to maintain user attention and productivity. (measured: 400 milliseconds threshold for system response time) | https://lawsofux.com/doherty-threshold/
  - animation-web-usability-nn | Begin animations within 0.1 seconds of user action to maintain direct manipulation feeling. (figure: 0.1 seconds maximum latency required) | https://www.nngroup.com/articles/animation-usability/
  - skeleton-vs-spinners-loading | Use spinners for short, blocking actions like form submission or authentication, not content loading. | https://www.onething.design/post/skeleton-screens-vs-loading-spinners
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | atom/loader: 1,835 parts (mean 2.74): dark rates 3.01 vs clean 2.15; loop motion 2.87 vs none 1.98 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/toast: 391 parts (mean 2.92): dark rates 3.14 vs minimal 2.83; entrance motion 3.06 vs none 2.71 (model-rated) | 2026-10-11
check: Record a trace: a visible change follows each click within 100 ms; any operation over 10 s shows determinate progress and a cancel control.
updated: 2026-10-11
---

## Why

Up to 0.1 s feels instant, about 1 s keeps the flow of thought, and past 10 s attention leaves the task; each band needs a different signal.

## Do / Don't

- **Do:** Disable and show a spinner on Save immediately, and show a progress bar with Cancel for a 30 s export.
- **Don't:** Leave the button idle for 2 s with no response, or show an endless spinner for a long job.

## Evidence

Backing: 3 independent organisations across 12 quoted claims (1 experiment, 8 guideline, 3 expert). Clusters: C0263.

- **Laws of UX (Jon Yablonski)** (experiment, [laws-ux-doherty-threshold](https://lawsofux.com/doherty-threshold/)): Provide system feedback within 400 milliseconds to maintain user attention and productivity. Measured: 400 milliseconds threshold for system response time.
- **Nielsen Norman Group** (guideline, [animation-web-usability-nn](https://www.nngroup.com/articles/animation-usability/)): Begin animations within 0.1 seconds of user action to maintain direct manipulation feeling. Figure: 0.1 seconds maximum latency required.
- **One Thing** (guideline, [skeleton-vs-spinners-loading](https://www.onething.design/post/skeleton-screens-vs-loading-spinners)): Use spinners for short, blocking actions like form submission or authentication, not content loading.

The 0.1 s, 1 s and 10 s limits are Nielsen Norman Group guidance from perception research, not a new experiment. Laws of UX (Doherty threshold) puts the productivity limit at 400 ms. hub-0013 asks for hover feedback under 100 ms, which fits.

## Check

Record a trace: a visible change follows each click within 100 ms; any operation over 10 s shows determinate progress and a cancel control.
