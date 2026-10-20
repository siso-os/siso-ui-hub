#!/bin/bash
# Render pass 4 (UI-HUB, 16 Oct): the sandbox's node_modules was cleared after pass 3, and styled-components was never in
# it. Restore the sandbox from its own package.json, add styled-components, then redraw every part whose last failure
# was a bundle missing only packages now present (cva 73 and styled-components 98 when written). tmux uihub-render7 (cva@beta: npm's plain cva is an empty 0.0.0).
cd ~/SISO_Workspace/_data/ui-render || exit 1
export PATH=$HOME/.local/bin:$PATH
P=~/SISO_Workspace/_data/ui-shoot/venv/bin/python
NPM="npm --legacy-peer-deps --ignore-scripts --no-audit --no-fund --loglevel=error"
( cd sb && $NPM install && $NPM install styled-components cva@beta class-variance-authority ) > pass4-setup.log 2>&1
echo "setup exit $?" >> pass4-setup.log
ls -d sb/node_modules/cva sb/node_modules/styled-components sb/node_modules/class-variance-authority >> pass4-setup.log 2>&1
$P - > pass4-select.log 2>&1 <<"PY"
import json, os
last, rows, done = {}, {}, set()
for l in open("thumbs/_render_failed.jsonl"):
    try: r = json.loads(l); last[r["key"]] = r
    except ValueError: pass
for l in open("thumbs/_rendered.jsonl"):
    try: done.add(json.loads(l)["key"])
    except ValueError: pass
for p in ("render-todo.jsonl", "render-todo2.jsonl", "render-pass2.jsonl", "render-new3.jsonl", "render4.jsonl", "render-pass3.jsonl"):
    if not os.path.exists(p): continue
    for l in open(p):
        try: rows[json.loads(l)["key"]] = l
        except ValueError: pass
have = lambda m: os.path.isdir(os.path.join("sb/node_modules", "/".join(m.split("/")[:2]) if m.startswith("@") else m.split("/")[0]))
n, nokey = 0, 0
with open("render-pass4.jsonl", "w") as out:
    for k, r in last.items():
        miss = [m for m in r.get("missing") or [] if not m.startswith((".", "/", "@/", "~"))]
        if k in done or r.get("why") != "bundle" or not miss or not ({"cva", "styled-components"} & set(miss)) or not all(have(m) for m in miss): continue
        if k not in rows: nokey += 1; continue
        out.write(rows[k]); n += 1
print(n, "for pass 4;", nokey, "with no input row")
PY
UI_THUMBS=$PWD/thumbs nice -n 15 $P bin/render run sb --jobs 8 --batch 40 < render-pass4.jsonl > render7.log 2>&1; echo "EXIT $?" >> render7.log
