#!/usr/bin/env python3
"""Curate the charts catalogue (UI-HUB, 16 Oct). Reads the scouts' sorting (~/SISO_Workspace/_data/charts-curate/out/s*.jsonl, one
row per part: c=chart?, g=type, v=variant key, q=1-3), folds near-identical parts into one chart with variants, ranks each type
(Shaan's libraries first), and writes charts/curated.json plus charts/not-charts.jsonl. Needs the build's site/manifest.json
(which parts draw live). Usage: python3 charts/curate.py"""
import json, glob, os, re, math, collections
D = os.path.expanduser("~/SISO_Workspace/_data/charts-curate")
H = os.path.dirname(os.path.abspath(__file__))
rows = {r["id"]: r for r in json.load(open(f"{D}/all.json"))}
inv = {}
for o in json.load(open(f"{D}/inventory.json")):
    inv[("21st/" + o["id"]) if o["src"] == "21st" else o["id"]] = o
sort = {}
for f in sorted(glob.glob(f"{D}/out/s*.jsonl")):
    for l in open(f):
        r = json.loads(l); sort[r["id"]] = r
man = json.load(open(f"{D}/site/manifest.json")); good = set(man["good"])

def live_key(r):
    if r["lib"] == "21st.dev": return "p21--" + r["id"][5:]
    return r["lib"] + "--" + r["name"]
# Shaan's libraries first, in his order (16 Oct review); a bonus per library
PRIORITY = {"uiarc": 12, "evilcharts": 12, "livedocs": 11, "shadcn-ui-blocks": 11, "shadcn-dashboard": 11, "tweenly": 11, "siso-charts": 20,
            "ns-ui": 8, "plotcn": 8, "reactframe": 8, "bklit": 8, "8starlabs-ui": 8, "gh-8starlabs-ui": 8, "minidev": 8, "dashboardcn": 8, "spectrumui": 8,
            "reui": 6, "shadcn": 6, "shadcn-space": 5, "21st.dev": 4}
TITLES = {"area": "Area", "bar": "Bar", "line": "Line (and sparkline)", "pie-radial": "Pie, donut and radial", "radar": "Radar", "heatmap": "Heatmaps",
          "funnel-flow": "Funnel, sankey and flow", "composed": "Composed", "scatter": "Scatter and bubble", "map": "Maps", "other": "Other charts", "visuals": "Visuals (gauges, rings, countdowns)"}
ORDER = ["area", "bar", "line", "pie-radial", "radar", "heatmap", "funnel-flow", "composed", "scatter", "visuals", "map", "other"]
# pieces Shaan named on 16 Oct: always in the top of their type
NAMED = [("heatmap", r"^21st/bankkroll__contribution-graph$", "contribution heatmap (his: \"the contribution heat maps always a nice one\")"),
         ("heatmap", r"^xevrion/contribution-heatmap$", "contribution heatmap"),
         ("heatmap", r"^landing--contribution-city$", "the 3D heatmap on our landing (his: \"a 3D one that we have on one of our landing pages\")"),
         ("funnel-flow", r"^21st/bklitai__funnel-chart$", "the 21st.dev funnel (his: \"Funnel chart from 21st.dev is good\")"),
         ("funnel-flow", r"^shadcn-ui-blocks/application-pro-charts-conversion-funnel-bars$", "conversion funnel"),
         ("area", r"^21st/ahmedmayara__conversion-funnel-area-chart$", "conversion funnels (his: \"conversion funnels alright\")"),
         ("area", r"^reactframe/range-area-chart$", "range area, ReactFrame (his: \"range area chart, react frame, okay\")"),
         ("bar", r"^21st/ahmedmayara__category-bar-chart$", "category bar, 21st.dev (his: \"see when there's different variants of it, it's good\")"),
         ("bar", r"^21st/reaviz__incident-bar-chart$", "incident report (his: \"incident reports are a nice comp\")")]

items = []
for id, r in rows.items():
    s = sort.get(id)
    if not s: continue
    o = inv.get(id, {})
    k = live_key(r)
    items.append(dict(id=id, lib=r["lib"], name=r["name"], c=s["c"], g=s["g"], v=s["v"], q=s["q"], n=s.get("n", ""), k=k if k in good else None,
                      pic=o.get("preview"), desc=r.get("desc", ""), url=o.get("url")))
# parts drawn live that the inventory did not hold: the SISO package demos, the landing's contribution city, uiarc/tweenly with no row
have = {i["k"] for i in items if i["k"]}
EXTRA = {"siso--heatmap-matrix-incidents": ("heatmap", "heatmap-matrix-incidents", "SISO matrix heatmap: incidents, red, service by day"), "siso--heatmap-matrix-tips": ("heatmap", "heatmap-matrix-tips", "SISO matrix heatmap: weekday by time of day, amber"), "siso--funnel": ("funnel-flow", "funnel", "SISO conversion funnel"), "siso--range-area": ("area", "range-area", "SISO range area: low to high band"), "siso--trend-card": ("line", "trend-card", "SISO trend card: this week against last"), "siso--tweenly-radial": ("pie-radial", "tweenly-radial", "SISO goal ring: Tweenly radial, 1,240 of 2,000 in the hole"), "siso--area-rainbow": ("area", "area-rainbow", "SISO area: rainbow, stacked, natural curve"), "siso--area-green-red": ("area", "area-green-red", "SISO area: green and red, hatched, dashed, frosted tooltip"),
         "siso--area-spiky": ("area", "area-spiky", "SISO area: one series, straight lines (spiky), dots"), "siso--bars-stacked": ("bar", "bars-stacked", "SISO bars: stacked, duotone"),
         "siso--bars-horizontal": ("bar", "bars-horizontal", "SISO bars: horizontal, gradient"), "siso--line-dashed": ("line", "line-dashed", "SISO line: step curve, dashed"),
         "siso--donut": ("pie-radial", "donut", "SISO donut (pie and donut are one chart)"), "siso--radial-semi": ("pie-radial", "radial-semi", "SISO radial: semi circle"),
         "siso--radar": ("radar", "radar", "SISO radar"),
         "siso--arc-bars": ("bar", "arc-bars", "SISO Arc bars: UI Arc recoded, takes the site colour, hover shows the day and its share"),
         "siso--arc-line": ("line", "arc-line", "SISO Arc line: UI Arc recoded, per-series colour"), "siso--arc-donut": ("pie-radial", "arc-donut", "SISO Arc donut: UI Arc recoded"),
         "siso--arc-heatmap": ("heatmap", "arc-heatmap", "SISO Arc heatmap: UI Arc recoded, hover shows date, count, level and share of the busiest day"),
         "siso--arc-sparkline": ("line", "arc-sparkline", "SISO Arc sparkline: a line chart with its value and change"), "siso--arc-gauge": ("visuals", "arc-gauge", "SISO Arc gauge"),
 "landing--contribution-city": ("heatmap", "contribution-city", "Contribution city: the isometric 3D heatmap from our landing")}
for k, (g, name, n) in EXTRA.items():
    if k in good and k not in have:
        lib = "siso-charts" if k.startswith("siso--") else "siso-landing"
        items.append(dict(id=(k.replace("--", "/", 1) if lib == "siso-charts" else "landing--contribution-city"), lib=lib, name=name, c=1, g=g, v="siso-" + name, q=3, n=n, k=k, pic=None, desc=n, url=None))
for i in items:
    if i["lib"] in ("uiarc", "tweenly") and i["k"] and i["c"] == 0 and i["g"] == "visuals": pass
# score: quality first, then his libraries, then it draws live, then it has a picture
for i in items:
    i["score"] = i["q"] * 10 + PRIORITY.get(i["lib"], 3) + (14 if i["k"] else 0) + (1 if i["pic"] else 0)
    i["ok"] = bool(i["k"] or i["pic"])
charts = [i for i in items if i["c"] == 1 or (i["c"] == 0 and i["g"] == "visuals")]
for i in charts: i["grp"] = "visuals" if i["g"] == "visuals" else i["g"]
# fold: Evil Charts' examples are one chart with the options as variants; everything else folds on the scouts' variant key
def fam(i):
    if i["lib"] == "evilcharts": return (i["grp"], "evilcharts")
    return (i["grp"], i["v"] or i["name"])
fams = collections.defaultdict(list)
for i in charts: fams[fam(i)].append(i)
# a variant key shared by dozens of parts is too generic ("heatmap"): split those by library
for key in [k for k, m in fams.items() if len(m) > 15 and k[1] != "evilcharts"]:
    for i in fams.pop(key): fams[(key[0], key[1] + "@" + i["lib"])].append(i)
cur = {g: [] for g in ORDER}
for (g, v), mem in fams.items():
    best = max(mem, key=lambda x: (x["ok"], x["score"]))
    f = dict(best); f["family"] = v; f["members"] = len(mem); f["libs"] = sorted({m["lib"] for m in mem})
    f["variants"] = [dict(id=m["id"], lib=m["lib"], name=m["name"], k=m["k"], pic=m["pic"]) for m in sorted(mem, key=lambda m: -m["score"]) if m["id"] != best["id"]][:60]
    f["score"] += 2 * math.log2(len(mem)) + (1 if len(f["libs"]) > 1 else 0)
    cur.setdefault(g, []).append(f)
out = {"groups": []}
forced_ids = {}
for gname, rx, why in NAMED:
    forced_ids.setdefault(gname, []).append((rx, why))
for g in ORDER:
    fl = sorted((f for f in cur[g] if f["ok"]), key=lambda f: -f["score"])
    top, per_lib, seen_v = [], collections.Counter(), set()
    def take(f, why=None):
        top.append(dict(f, why=why)); per_lib[f["lib"]] += 1; seen_v.add(f["family"])
    for rx, why in forced_ids.get(g, []):
        hit = next((f for f in cur[g] if re.search(rx, f["id"])), None)
        if not hit:  # the named part sits inside a family: make it the head, the rest its variants
            fm = next((f for f in cur[g] if any(re.search(rx, v["id"]) for v in f["variants"])), None)
            if fm:
                v = next(v for v in fm["variants"] if re.search(rx, v["id"]))
                rest = [x for x in fm["variants"] if x["id"] != v["id"]] + [dict(id=fm["id"], lib=fm["lib"], name=fm["name"], k=fm["k"], pic=fm["pic"])]
                hit = dict(fm, id=v["id"], lib=v["lib"], name=v["name"], k=v["k"], pic=v["pic"], variants=rest)
        if hit and hit["id"] not in {t["id"] for t in top}: take(hit, why)
    for f in fl:
        if len(top) >= 14: break
        if f["id"] in {t["id"] for t in top} or per_lib[f["lib"]] >= (4 if f["lib"] in ("siso-charts", "evilcharts", "uiarc", "tweenly") else 2): continue
        take(f)
    topids = {t["id"] for t in top}
    more = [f for f in fl if f["id"] not in topids]
    out["groups"].append(dict(key=g, title=TITLES[g], families=len(cur[g]), parts=sum(f["members"] for f in cur[g]), top=top, more=more[:60], more_total=len(more)))
json.dump(out, open(f"{H}/curated.json", "w"), indent=1, ensure_ascii=False)
# the pieces that are not charts, with where they belong
n = collections.Counter()
with open(f"{H}/not-charts.jsonl", "w") as f:
    for i in items:
        if i["c"] == 0 and i["g"] != "visuals":
            dest = {"hero": "hero", "section": "feature section", "input": "input", "loader": "loader", "card": "card", "table": "table", "form": "form", "cropper": "image cropper"}.get(i["g"], "other")
            n[dest] += 1; f.write(json.dumps({"id": i["id"], "belongs": dest, "n": i["n"]}) + "\n")
print({g["key"]: (g["families"], g["parts"], len(g["top"]), g["more_total"]) for g in out["groups"]}); print(dict(n))
