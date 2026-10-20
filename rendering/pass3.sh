#!/bin/bash
# Render pass 3 (ECOSYSTEM, 11 Oct 08:40): after render4, install a hand-checked list of public packages its bundle
# failures named (well-known publishers only: a repo's own internal names are never fetched from npm; no install
# scripts), then redraw every part whose last failure was a bundle that now has all it named. tmux eco-render5.
cd ~/SISO_Workspace/_data/ui-render || exit 1
P=~/SISO_Workspace/_data/ui-shoot/venv/bin/python
while kill -0 3804 2>/dev/null; do sleep 60; done
cd sb && for p in $(cat ../pass3-packages.txt); do
  if npm install --legacy-peer-deps --ignore-scripts --no-audit --no-fund --loglevel=error "$p" > /dev/null 2>&1; then echo "installed $p"; else echo "not installed $p"; fi
done > ../pass3-setup.log; cd ..
$P - <<"PY"
import json, os, glob
last, rows, done = {}, {}, set()
for l in open("thumbs/_render_failed.jsonl"):
    try: r = json.loads(l); last[r["key"]] = r
    except ValueError: pass
for l in open("thumbs/_rendered.jsonl"):
    try: done.add(json.loads(l)["key"])
    except ValueError: pass
for p in ("render-todo2.jsonl", "render-pass2.jsonl", "render-new3.jsonl", "render4.jsonl"):
    for l in open(p):
        try: rows[json.loads(l)["key"]] = l
        except ValueError: pass
have = lambda m: os.path.isdir(os.path.join("sb/node_modules", "/".join(m.split("/")[:2]) if m.startswith("@") else m.split("/")[0]))
n = 0
with open("render-pass3.jsonl", "w") as out:
    for k, r in last.items():
        miss = [m for m in r.get("missing") or [] if not m.startswith((".", "/", "@/", "~"))]
        if k in done or r.get("why") != "bundle" or not miss or k not in rows or not all(have(m) for m in miss): continue
        out.write(rows[k]); n += 1
print(n, "for pass 3")
PY
UI_THUMBS=$PWD/thumbs nice -n 15 $P bin/render run sb --jobs 8 --batch 40 < render-pass3.jsonl > render5.log 2>&1; echo "EXIT $?" >> render5.log
