#!/usr/bin/env python3
"""build-v01: SISO UI v0.1's pick page (factory/render/public/index.html) from v01.json, his words from
catalogue/curated/picks.jsonl and real counts from inventory/summary.json. Served by factory/render/server.mjs."""
import html, json, pathlib
F = pathlib.Path(__file__).resolve().parent.parent
HUB = F.parent
v = json.load(open(F / "siso-ui/v01.json"))
picks = {json.loads(l)["n"]: json.loads(l) for l in open(HUB / "catalogue/curated/picks.jsonl")}
summ = json.load(open(HUB / "inventory/summary.json"))
projects = {k: x for k, x in summ.items() if isinstance(x, dict) and "components" in x}
total = sum(x["components"] for x in projects.values())
e = html.escape

def card(o):
    words = picks.get(o.get("n"), {}).get("feedback", "")
    if o["kind"] == "missing":
        frame = f'<div class="miss"><b>Not shown</b><p>{e(o["why"])}</p></div>'
    else:
        src = f'/demo/{o["id"]}' if o["kind"] == "demo" else f'/bundle/{o["id"]}?theme=dark'
        frame = f'<iframe loading="lazy" src="{src}" style="height:{o.get("h",420)}px"></iframe>'
    how = "live from our source" if o["kind"] == "demo" else ("21st's own build, their demo data" if o["kind"] == "bundle" else "")
    return f'''<div class="card" data-id="{e(o["id"])}">{frame}
<div class="body"><h3>{e(o["title"])}</h3>
{f'<p class="words">“{e(words)}”</p>' if words else ''}
{f'<p>{e(o["note"])}</p>' if o.get("note") else ''}
<p class="meta">{e(how)}{' · ' + e(o["src"]) if o.get("src") else ''}{' · ' + e(o["cost"]) if o.get("cost") else ''}</p>
<div class="vote"><button data-v="take">Take</button><button data-v="skip">Skip</button><input placeholder="your words (optional)"><span class="got"></span></div>
</div></div>'''

secs = []
for s in v["sections"]:
    secs.append(f'''<section id="{s["id"]}"><h2>{e(s["title"])}</h2>
<blockquote>“{e(s["quote"])}”</blockquote>
{f'<p class="finding">{e(s["finding"])}</p>' if s.get("finding") else ''}
<div class="grid">{''.join(card(o) for o in s["options"])}</div></section>''')
n_opts = sum(len(s["options"]) for s in v["sections"])
n_miss = sum(1 for s in v["sections"] for o in s["options"] if o["kind"] == "missing")
proj_line = " · ".join(f'{k} {x["components"]}' for k, x in projects.items())
toc = "".join(f'<a href="#{s["id"]}">{e(s["title"])}</a>' for s in v["sections"])

page = f'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SISO UI v0.1: take or skip</title><style>
body{{margin:0;background:#0b0b0c;color:#e8e8ea;font:14px/1.45 Inter,system-ui,sans-serif}}
header{{padding:26px 32px 8px}} h1{{margin:0 0 6px;font-size:26px}} h1 b{{color:#3B82F6}} header p{{color:#9a9aa2;margin:4px 0}}
nav.toc{{position:sticky;top:0;z-index:5;background:#0b0b0cee;backdrop-filter:blur(8px);padding:10px 32px;display:flex;gap:14px;flex-wrap:wrap;border-bottom:1px solid #222}}
nav.toc a{{color:#c8c8d0;text-decoration:none;font-size:13px}} nav.toc a:hover{{color:#3B82F6}}
section{{padding:18px 32px}} h2{{margin:8px 0 8px;font-size:19px;color:#3B82F6}}
blockquote{{margin:0 0 12px;color:#d6c9a8;border-left:3px solid #FFA726;padding:4px 12px;font-style:italic;max-width:1100px}}
.finding{{background:#1f1310;border:1px solid #5a2a1a;border-radius:10px;padding:10px 14px;color:#f3c7b5;max-width:1100px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(420px,100%),1fr));gap:16px}}
.card{{background:#141416;border:1px solid #26262b;border-radius:12px;overflow:hidden;display:flex;flex-direction:column}}
.card.take{{border-color:#22c55e;box-shadow:0 0 18px #22c55e44}} .card.skip{{opacity:.45}}
iframe{{width:100%;border:0;border-bottom:1px solid #26262b;background:#0e0e10;display:block}}
.miss{{padding:28px;background:#1c1c20;color:#b0b0b8;border-bottom:1px solid #26262b}} .miss b{{color:#f59e0b}}
.body{{padding:10px 14px 12px}} h3{{margin:0 0 6px;font-size:15px}} .body p{{margin:4px 0;font-size:13px;color:#c8c8d0}}
.words{{color:#d6c9a8!important;font-style:italic}} .meta{{color:#8a8a92!important;font-size:12px!important}}
.vote{{display:flex;gap:8px;margin-top:8px;align-items:center}} .vote button{{background:#1d1d22;color:#e8e8ea;border:1px solid #333;border-radius:8px;padding:6px 14px;cursor:pointer}}
.vote button[data-v=take]:hover{{border-color:#22c55e}} .vote button[data-v=skip]:hover{{border-color:#ef4444}}
.vote input{{flex:1;background:#0e0e10;border:1px solid #2a2a30;border-radius:8px;color:#e8e8ea;padding:6px 10px}} .got{{font-size:12px;color:#22c55e}}
footer{{padding:20px 32px 40px;color:#8a8a92;font-size:12px}}
</style></head><body>
<header><h1>SISO UI <b>v0.1</b>: take or skip</h1>
<p>The parts the App Factory gets built with. {n_opts} candidates in {len(v["sections"])} decisions, every one rendered, not described: ours live from our own source, your 21st picks from 21st's own build. {n_miss} we can't show yet, and each says why.</p>
<p>Press Take or Skip on each (add words if you like); it's written to <code>factory/siso-ui/picks.jsonl</code> with your words. Or just tell me in chat.</p>
<p>Your projects today: {proj_line} = {total:,} components.</p></header>
<nav class="toc">{toc}</nav>
{''.join(secs)}
<footer>A proposal: no file in Agent Base, the landing or the bank was changed. Render service: factory/render/server.mjs (Sucrase + esm.sh, one React 19).</footer>
<script>
fetch('/api/picks').then(r=>r.json()).then(rows=>rows.forEach(p=>{{const c=document.querySelector('.card[data-id="'+p.id+'"]');if(c){{c.classList.remove('take','skip');c.classList.add(p.verdict);c.querySelector('.got').textContent=p.verdict+(p.words?': '+p.words:'');}}}}));
document.querySelectorAll('.vote button').forEach(b=>b.onclick=()=>{{const c=b.closest('.card');const words=c.querySelector('input').value;
fetch('/api/pick',{{method:'POST',headers:{{'content-type':'application/json'}},body:JSON.stringify({{id:c.dataset.id,verdict:b.dataset.v,words}})}}).then(r=>r.json()).then(()=>{{c.classList.remove('take','skip');c.classList.add(b.dataset.v);c.querySelector('.got').textContent='saved: '+b.dataset.v;}});}});
</script></body></html>'''
out = F / "render/public/index.html"
out.write_text(page)
print(out, n_opts, "options", n_miss, "missing")
