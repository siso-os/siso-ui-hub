#!/usr/bin/env python3
"""The hosted hub's copies of src/data/siso-packages.json and of the catalogue files the kit pages bundle, with every text
that names something private emptied (the PRIVATE terms of bin/hubindex.py). Its bundle is downloadable before sign-in, so
deploy-pages.sh builds with these copies (HUB_PACKAGES and HUB_SCRUBBED, read by vite.config.ts); the local hub keeps the
whole files. A .jsonl file is scrubbed line by line.

  scripts/scrub-packages.py HUBINDEX SRC OUT [SRC OUT ...]
"""
import json, re, sys

src = open(sys.argv[1]).read()
PRIVATE = eval(re.search(r"^PRIVATE = (re\.compile\(.*\))$", src, re.M).group(1))


def scrub(x):
    if isinstance(x, dict):
        return {k: scrub(v) for k, v in x.items()}
    if isinstance(x, list):
        return [scrub(v) for v in x]
    return "" if isinstance(x, str) and PRIVATE.search(x) else x


import os

for src_, out in zip(sys.argv[2::2], sys.argv[3::2]):
    if not os.path.exists(src_):
        continue
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    if src_.endswith(".jsonl"):
        rows = [json.dumps(scrub(json.loads(l)), ensure_ascii=False) for l in open(src_) if l.strip()]
        open(out, "w").write("\n".join(rows) + "\n")
    else:
        json.dump(scrub(json.load(open(src_))), open(out, "w"), ensure_ascii=False)
