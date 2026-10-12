#!/usr/bin/env python3
"""The hosted hub's copy of src/data/siso-packages.json, with every text that names something private emptied (the
PRIVATE terms of bin/hubindex.py). Its bundle is downloadable before sign-in, so deploy-pages.sh builds with this copy
(HUB_PACKAGES, read by vite.config.ts); the local hub keeps the whole file.

  scripts/scrub-packages.py HUBINDEX SRC OUT
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


json.dump(scrub(json.load(open(sys.argv[2]))), open(sys.argv[3], "w"), ensure_ascii=False)
