#!/usr/bin/env python3
"""Give a build's data files names that change only when their content does, and a manifest that maps the plain name to
the hashed one (deploy-pages.sh runs it on the public build and his). Shaan, 11 Oct: "a way to make it faster ... spent
loading many many moons". A hashed file never changes, so the browser keeps it for a year (functions/data/_middleware.ts)
and a second visit downloads nothing but the small manifest. The plain names stay for agents and old tabs.

  hash-data.py DIR      # DIR is a build's data folder (it holds index.json); writes DIR/manifest.json
"""
import hashlib, json, os, re, shutil, sys

d = sys.argv[1]
WANT = re.compile(r"^(index|meta|index-\d+)\.json$|^(item|lib)/[^/]+\.json$")
out = {}
for root, _, files in os.walk(d):
    for f in files:
        rel = os.path.relpath(os.path.join(root, f), d)
        if not WANT.match(rel) or re.search(r"\.[0-9a-f]{12}\.json$", f):
            continue
        h = hashlib.md5(open(os.path.join(d, rel), "rb").read()).hexdigest()[:12]
        hashed = rel[:-5] + f".{h}.json"
        dst = os.path.join(d, hashed)
        if not os.path.exists(dst):
            try:
                os.link(os.path.join(d, rel), dst)
            except OSError:
                shutil.copy2(os.path.join(d, rel), dst)
        out["/data/" + rel] = "/data/" + hashed
json.dump(out, open(os.path.join(d, "manifest.json"), "w"), separators=(",", ":"), sort_keys=True)
print(f"{d}: {len(out)} files hashed")
