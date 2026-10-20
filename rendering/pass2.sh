#!/bin/bash
# Render pass 2 (ECOSYSTEM, 11 Oct 01:35): after pass 1, install the packages its failures named most (no install
# scripts: the names come from third-party code), then draw everything still without a picture, the photographers'
# failures included, with the newer bin/render (sample text for parts that paint nothing). tmux eco-render2.
cd ~/SISO_Workspace/_data/ui-render || exit 1
P=~/SISO_Workspace/_data/ui-shoot/venv/bin/python
until grep -q "^EXIT" render1.log; do sleep 60; done
$P - <<"PY" > pass2-packages.txt
import json, collections
c = collections.Counter()
for l in open("thumbs/_render_failed.jsonl"):
    for m in json.loads(l).get("missing") or []:
        if m.startswith((".", "/", "@/", "~", "node:")): continue
        c["/".join(m.split("/")[:2]) if m.startswith("@") else m.split("/")[0]] += 1
print("\n".join(k for k, n in c.most_common(40) if n >= 3))
PY
cd sb && for p in $(cat ../pass2-packages.txt); do
  if npm install --legacy-peer-deps --ignore-scripts --no-audit --no-fund --loglevel=error "$p" > /dev/null 2>&1; then echo "installed $p"; else echo "not installed $p"; fi
done > ../pass2-setup.log; cd ..
$P - <<"PY"
import json, os
shot = os.path.expanduser("~/SISO_Workspace/_data/ui-shoot/thumbs")
n = 0
with open("render-pass2.jsonl", "w") as out:
    for l in open("render-todo2.jsonl"):
        k = json.loads(l)["key"]
        if any(os.path.exists(os.path.join(d, k + e)) for d in (shot, "thumbs") for e in (".webp", ".svg")): continue
        out.write(l); n += 1
print(n, "for pass 2")
PY
mv thumbs/_render_failed.jsonl thumbs/_render_failed-pass1.jsonl
UI_THUMBS=$PWD/thumbs nice -n 15 $P bin/render run sb --jobs 8 --batch 40 < render-pass2.jsonl > render2.log 2>&1; echo "EXIT $?" >> render2.log
