#!/usr/bin/env python3
"""One-time setup for the hosted UI Hub (deploy-pages.sh does every deploy after this). Safe to rerun.

Makes the Pages projects (siso-ui-hub, siso-ui-thumbs-1 to -8); gives siso-ui-hub its Clerk settings
(CLERK_FAPI, and the secrets CLERK_SECRET_KEY and HUB_ALLOW) and the bookmarks KV the Worker uses (or one of its own when
that KV is in another account); points ui.sisolabs.space at it. Keys come from .credentials and are never printed.

  app/pages-setup.py --allow EMAIL[,EMAIL]
"""
import argparse, json, os, sys, urllib.error, urllib.request

CRED = os.path.expanduser("~/SISO_Workspace/.credentials/projects")
WORKER_KV = "58d068dda8c0466bbf29ee64d38fba27"  # worker/wrangler.toml, BOOKMARKS


def env(path):
    out = {}
    for line in open(os.path.join(CRED, path)):
        if "=" in line and not line.lstrip().startswith("#"):
            k, v = line.rstrip("\n").split("=", 1)
            out[k.strip()] = v.strip().strip('"')
    return out


CF, CK = env("sisolabs-cloudflare.env"), env("siso-landing-clerk.env")
ACC, ZONE = CF["CLOUDFLARE_ACCOUNT_ID"], CF["SISOLABS_ZONE_ID"]


def api(method, path, body=None):
    req = urllib.request.Request("https://api.cloudflare.com/client/v4" + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Authorization": f"Bearer {CF['CLOUDFLARE_API_TOKEN']}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        return json.loads(e.read() or b"{}") or {"success": False, "status": e.code}


def say(what, r):
    ok = r.get("success")
    errs = "; ".join(str(e.get("message")) for e in r.get("errors") or [])[:160]
    print(f"{'ok ' if ok else 'NO '} {what}{'' if ok else ' · ' + errs}")
    return ok


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--allow", required=True)
    a = ap.parse_args()
    for name in ("siso-ui-hub", *(f"siso-ui-thumbs-{n}" for n in range(1, 9))):
        if api("GET", f"/accounts/{ACC}/pages/projects/{name}").get("success"):
            print(f"ok  project {name} (there already)")
        else:
            say(f"project {name}", api("POST", f"/accounts/{ACC}/pages/projects", {"name": name, "production_branch": "main"}))
    kv = WORKER_KV if api("GET", f"/accounts/{ACC}/storage/kv/namespaces/{WORKER_KV}").get("success") else None
    if not kv:
        found = [n for n in api("GET", f"/accounts/{ACC}/storage/kv/namespaces?per_page=100").get("result") or [] if n.get("title") == "siso-ui-hub-bookmarks"]
        kv = found[0]["id"] if found else (api("POST", f"/accounts/{ACC}/storage/kv/namespaces", {"title": "siso-ui-hub-bookmarks"}).get("result") or {}).get("id")
        print(f"ok  bookmarks KV of its own (the Worker's is in another account)" if kv else "NO  bookmarks KV")
    else:
        print("ok  bookmarks KV shared with the Worker")
    vars_ = {"CLERK_FAPI": {"type": "plain_text", "value": "clerk.sisolabs.space"},
             "CLERK_SECRET_KEY": {"type": "secret_text", "value": CK["CLERK_LIVE_SECRET_KEY"]},
             "HUB_ALLOW": {"type": "secret_text", "value": a.allow}}
    conf = {"env_vars": vars_, "compatibility_date": "2026-09-01"}
    if kv:
        conf["kv_namespaces"] = {"BOOKMARKS": {"namespace_id": kv}}
    say("siso-ui-hub settings (Clerk, list, KV)", api("PATCH", f"/accounts/{ACC}/pages/projects/siso-ui-hub",
                                                     {"deployment_configs": {"production": conf, "preview": conf}}))
    doms = [d.get("name") for d in api("GET", f"/accounts/{ACC}/pages/projects/siso-ui-hub/domains").get("result") or []]
    if "ui.sisolabs.space" in doms:
        print("ok  domain ui.sisolabs.space (there already)")
    else:
        say("domain ui.sisolabs.space", api("POST", f"/accounts/{ACC}/pages/projects/siso-ui-hub/domains", {"name": "ui.sisolabs.space"}))
    recs = api("GET", f"/zones/{ZONE}/dns_records?name=ui.sisolabs.space").get("result") or []
    if recs:
        print(f"ok  DNS ui.sisolabs.space -> {recs[0].get('content')} (there already)")
    else:
        say("DNS ui -> siso-ui-hub.pages.dev", api("POST", f"/zones/{ZONE}/dns_records",
                                                   {"type": "CNAME", "name": "ui", "content": "siso-ui-hub.pages.dev", "proxied": True,
                                                    "comment": "UI Hub on Cloudflare Pages (siso-ui-hub), behind Clerk"}))


if __name__ == "__main__":
    sys.exit(main())
