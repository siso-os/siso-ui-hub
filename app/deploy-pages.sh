#!/bin/bash
# The hosted UI Hub: Cloudflare Pages at https://ui.sisolabs.space, behind Clerk sign-in. Shaan, 10 Oct: "re-host I used
# it as a subdomain so it actually is a subdomain and works with the clerk keys you already set up". Beside deploy.sh
# (the Worker behind Basic Auth, which agents use), not instead of it.
# - his build (`uihub export`) is served at /data to him only; it is stored at /me/data and functions/ decides per request
# - the public build (`uihub export --public`, privacy gate first) is /data for anyone else signed in
# - the code bank's pictures go to eight Pages projects of their own, siso-ui-thumbs-1 to -8 (20,000 files a project)
# Keys come from .credentials (sisolabs-cloudflare.env, siso-landing-clerk.env) and are never printed. First time only:
# app/pages-setup.py (projects, secrets, the bookmarks KV, the domain).
# Usage: app/deploy-pages.sh [--no-build] [--thumbs-only] [--site-only] [--code-only]
# --code-only: a code change only; reuses the last export (app/public/data, app/public-pub) instead of re-reading 104k parts
# twice and archiving the old data (12 Oct: a deploy took 15 minutes and the archives had grown to 25 GB). Implies --site-only.
set -euo pipefail
APP="$(cd "$(dirname "$0")" && pwd)"; HUB="$(dirname "$APP")"
CRED=~/SISO_Workspace/.credentials/projects
STAGE=~/SISO_Workspace/_data/ui-hub/pages
RUN_ID="$(date +%Y%m%d-%H%M%S)-$$"
export PATH="$HOME/.npm-global/bin:/opt/homebrew/bin:$PATH"
val() { grep -m1 "^$1=" "$2" | cut -d= -f2- | tr -d '"'; }
export CLOUDFLARE_API_TOKEN="$(val CLOUDFLARE_API_TOKEN "$CRED/sisolabs-cloudflare.env")"
export CLOUDFLARE_ACCOUNT_ID="$(val CLOUDFLARE_ACCOUNT_ID "$CRED/sisolabs-cloudflare.env")"
BUILD=1; SITE=1; THUMBS=1; EXPORT=1
for a in "$@"; do case "$a" in --no-build) BUILD=0;; --thumbs-only) SITE=0; BUILD=0;; --site-only) THUMBS=0;; --code-only) THUMBS=0; EXPORT=0;; esac; done
# nothing is deleted: a previous build moves to <where>/_archive/<run> (never inside public/, which vite copies)
archive() { if [ -e "$1" ]; then mkdir -p "$2/_archive/$RUN_ID"; mv "$1" "$2/_archive/$RUN_ID/$(basename "$1")"; fi; }

if [ "$BUILD" = 1 ]; then
  if [ "$EXPORT" = 1 ] || [ ! -e "$APP/public/data/index.json" ] || [ ! -e "$APP/public-pub/data/index.json" ]; then
    # export beside, then swap in (12 Oct: exporting in place blanked the local dev site for ten minutes)
    NEXT="$APP/.export-$RUN_ID"
    "$HUB/bin/uihub" export --out "$NEXT/his"
    "$HUB/bin/uihub" export --out "$NEXT/pub" --public
    archive "$APP/public/data" "$APP"; archive "$APP/public/a/t" "$APP"; archive "$APP/public-pub" "$APP"; archive "$APP/dist" "$APP"
    for e in "$NEXT/his"/*; do b=$(basename "$e"); if [ "$b" = a ]; then mkdir -p "$APP/public/a"; for x in "$e"/*; do archive "$APP/public/a/$(basename "$x")" "$APP"; mv "$x" "$APP/public/a/"; done; else archive "$APP/public/$b" "$APP"; mv "$e" "$APP/public/"; fi; done
    mv "$NEXT/pub" "$APP/public-pub"
    archive "$NEXT" "$APP"
  fi
  python3 "$HUB/bin/kit-import" --code  # the kit's Code panel copies, kept out of git
  mkdir -p "$STAGE"; python3 "$APP/scripts/scrub-packages.py" "$HUB/bin/hubindex.py" "$APP/src/data/siso-packages.json" "$STAGE/siso-packages.public.json"
  # the catalogue files the kit pages import, scrubbed the same way (15 Oct: HALO and client names had reached three kit pages)
  CATS=$(cd "$APP" && grep -rhoE "from \"(\.\./)+catalogue/[^\"?]+" src | sed -E 's/^from "(\.\.\/)+catalogue\///' | sort -u)
  python3 "$APP/scripts/scrub-packages.py" "$HUB/bin/hubindex.py" $(for c in $CATS; do printf '%s %s ' "$HUB/catalogue/$c" "$STAGE/catalogue/$c"; done)
  (cd "$APP" && HUB_PACKAGES="$STAGE/siso-packages.public.json" HUB_SCRUBBED="$STAGE/catalogue" VITE_CLERK_PUBLISHABLE_KEY="$(val CLERK_LIVE_PUBLISHABLE_KEY "$CRED/siso-landing-clerk.env")" \
    VITE_THUMBS_BASE='https://siso-ui-thumbs-{n}.pages.dev' heavy -- npm run build)
fi

if [ "$SITE" = 1 ]; then
  archive "$STAGE/site" "$STAGE"
  # the public part first, checked by the privacy gate before his build goes in beside it
  python3 - "$APP" "$STAGE/site" <<'EOF'
import os, shutil, sys
app, site = sys.argv[1], sys.argv[2]
def put(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if os.path.exists(dst): return
    try: os.link(src, dst)
    except OSError: shutil.copy2(src, dst)
def tree(src, dst, skip=()):
    for root, dirs, files in os.walk(src):
        rel = os.path.relpath(root, src)
        dirs[:] = [d for d in dirs if os.path.normpath(os.path.join(rel, d)) not in skip]
        for f in files: put(os.path.join(root, f), os.path.join(dst, rel, f))
tree(f"{app}/dist", site, skip={"data", "a/t", "a/p"})
tree(f"{app}/public-pub/data", f"{site}/data")
if os.path.isdir(f"{app}/public-pub/a"): tree(f"{app}/public-pub/a", f"{site}/a", skip={"t", "p"})
# 14 Oct: the kit's 13,000 code files left no room under 20,000 for the 10,000 part pictures; they live on siso-ui-pics
open(f"{site}/_redirects", "w").write("/a/p/* https://siso-ui-pics.pages.dev/a/p/:splat 302\n")
open(f"{site}/_headers", "w").write("/*\n  X-Robots-Tag: noindex\n  Referrer-Policy: strict-origin-when-cross-origin\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n")
open(f"{site}/_routes.json", "w").write('{"version": 1, "include": ["/data/*", "/me/*", "/api/*"], "exclude": []}\n')
EOF
  python3 "$APP/scripts/hash-data.py" "$STAGE/site/data"
  "$HUB/bin/uihub" privacy-check "$STAGE/site" >/dev/null || { echo "privacy gate failed on the public part: not deploying"; exit 1; }
  python3 - "$APP/dist/data" "$STAGE/site/me/data" <<'EOF'
import os, shutil, sys
src, dst = sys.argv[1], sys.argv[2]
for root, _, files in os.walk(src):
    for f in files:
        d = os.path.join(dst, os.path.relpath(root, src), f); os.makedirs(os.path.dirname(d), exist_ok=True)
        try: os.link(os.path.join(root, f), d)
        except OSError: shutil.copy2(os.path.join(root, f), d)
EOF
  python3 "$APP/scripts/hash-data.py" "$STAGE/site/me/data"
  n=$(find "$STAGE/site" -type f | wc -l | tr -d ' '); big=$(find "$STAGE/site" -type f -size +25M | head -1)
  [ "$n" -lt 20000 ] && [ -z "$big" ] || { echo "too many files ($n) or one over 25 MB ($big)"; exit 1; }
  echo "site: $n files"
  # the part pictures (/a/p) as their own project, re-sent only when they change
  if [ -d "$APP/public-pub/a/p" ]; then
    sig=$(cd "$APP/public-pub/a/p" && ls -lR . | shasum | cut -c1-16)
    if [ "$(cat "$STAGE/pics.sig" 2>/dev/null)" != "$sig" ]; then
      archive "$STAGE/pics" "$STAGE"; mkdir -p "$STAGE/pics/a"
      cp -Rl "$APP/public-pub/a/p" "$STAGE/pics/a/p" 2>/dev/null || cp -R "$APP/public-pub/a/p" "$STAGE/pics/a/p"
      printf '/*\n  X-Robots-Tag: noindex\n  Cache-Control: public, max-age=86400\n  Access-Control-Allow-Origin: *\n' > "$STAGE/pics/_headers"
      wrangler pages project create siso-ui-pics --production-branch main >/dev/null 2>&1 || true
      wrangler pages deploy "$STAGE/pics" --project-name siso-ui-pics --branch main --commit-dirty=true 2>&1 | tail -2 && echo "$sig" > "$STAGE/pics.sig"
    else echo "pics: unchanged, skipped"; fi
  fi
  (cd "$APP" && wrangler pages deploy "$STAGE/site" --project-name siso-ui-hub --branch main --commit-dirty=true 2>&1 | tail -3)
fi

if [ "$THUMBS" = 1 ]; then
  # eight projects by the hash's first hex digit (src/lib/data.ts pic() does the same): photos and drawn icons. 11 Oct: four
  # were nearly full (20,000 files a project) once the GitHub registries came in; the odd digits moved to 5-8 so 1-4 kept
  # what they had uploaded. The next split takes the second digit the same way.
  for n in 1 2 3 4 5 6 7 8; do
    case $n in 1) pat='[02]*';; 2) pat='[46]*';; 3) pat='[8a]*';; 4) pat='[ce]*';; 5) pat='[13]*';; 6) pat='[57]*';; 7) pat='[9b]*';; 8) pat='[df]*';; esac
    # a project whose pictures haven't changed since its last upload is skipped (12 Oct: every deploy re-sent all eight,
    # ~70,000 files, when 128 had changed); the signature is every picture's name and size
    sig=$(cd "$APP/public/a/t" && ls -l $pat/ 2>/dev/null | shasum | cut -c1-16)
    if [ -e "$STAGE/thumbs-$n.sig" ] && [ "$(cat "$STAGE/thumbs-$n.sig")" = "$sig" ]; then echo "thumbs-$n: unchanged, skipped"; continue; fi
    archive "$STAGE/thumbs-$n" "$STAGE"
    mkdir -p "$STAGE/thumbs-$n/a/t"
    for d in "$APP"/public/a/t/$pat; do
      [ -d "$d" ] || continue
      mkdir -p "$STAGE/thumbs-$n/a/t/$(basename "$d")"
      for f in "$d"/*.webp "$d"/*.svg; do [ -e "$f" ] && ln "$f" "$STAGE/thumbs-$n/a/t/$(basename "$d")/" 2>/dev/null; done; true
    done
    printf '/*\n  X-Robots-Tag: noindex\n  Cache-Control: public, max-age=86400\n' > "$STAGE/thumbs-$n/_headers"
    echo "thumbs-$n: $(find "$STAGE/thumbs-$n" -name '*.webp' -o -name '*.svg' | wc -l | tr -d ' ') pictures"
    wrangler pages deploy "$STAGE/thumbs-$n" --project-name "siso-ui-thumbs-$n" --branch main --commit-dirty=true 2>&1 | tail -2 && echo "$sig" > "$STAGE/thumbs-$n.sig"
  done
fi
