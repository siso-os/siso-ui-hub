#!/bin/bash
# Build UI Hub and deploy it to Cloudflare (Worker "siso-ui-hub", free plan, private behind Basic Auth).
# Builds here (export + vite), then ships dist/ and worker/ to the laptop, whose wrangler is already logged in, and
# deploys from there. The Worker answers 503 until HUB_PASSWORD is set, so it is never open, not even for a moment.
# The password is the estate world's (WORLD_PASSWORD in .credentials); it goes from that file into the secret through
# a pipe and is never printed.
# --public builds and deploys the public build instead (worker-public/, no password; the privacy gate must pass first).
# Usage: app/deploy.sh [--public] [--no-build] [--host laptop]
set -euo pipefail
APP="$(cd "$(dirname "$0")" && pwd)"; HUB="$(dirname "$APP")"
HOST=laptop; BUILD=1; PUB=0
RUN_ID="$(date +%Y%m%d-%H%M%S)-$$"
archive_local() {
  if [ -e "$1" ]; then mkdir -p "$APP/_archive/$RUN_ID"; mv "$1" "$APP/_archive/$RUN_ID/$(basename "$1")"; fi
}
while [ $# -gt 0 ]; do case "$1" in --no-build) BUILD=0;; --public) PUB=1;; --host) HOST="$2"; shift;; esac; shift; done

if [ "$PUB" = 1 ]; then
  if [ "$BUILD" = 1 ]; then archive_local "$APP/public-pub"; archive_local "$APP/dist-public"; (cd "$APP" && heavy -- npm run build:public); fi
  "$HUB/bin/uihub" privacy-check "$APP/dist-public" >/dev/null || { echo "privacy gate failed on dist-public: not deploying"; exit 1; }
  R='~/SISO_Workspace/_data/ui-hub/deploy-public'
  ssh -o BatchMode=yes "$HOST" "mkdir -p ~/SISO_Workspace/_data/ui-hub/_archive; if [ -d $R ]; then mv $R ~/SISO_Workspace/_data/ui-hub/_archive/deploy-public-$RUN_ID; fi; mkdir -p $R"
  (cd "$APP" && tar cf - -h dist-public worker-public) | ssh -o BatchMode=yes "$HOST" "tar xf - -C $R"
  ssh -o BatchMode=yes "$HOST" "set -euo pipefail; export PATH=\$HOME/.npm-global/bin:/opt/homebrew/bin:\$PATH; cd $R/worker-public && wrangler deploy -c wrangler.toml 2>&1 | grep -E 'https://|Uploaded|error|ERROR'"
  exit 0
fi
REMOTE='~/SISO_Workspace/_data/ui-hub/deploy'
CRED='~/SISO_Workspace/.credentials/projects/SISO_Agents/siso-estate/world-worker.env'

if [ "$BUILD" = 1 ]; then
  archive_local "$APP/public/data"
  archive_local "$APP/dist"
  "$HUB/bin/uihub" export --out "$APP/public"
  (cd "$APP" && heavy -- npm run build)
fi
test -f "$APP/dist/index.html" && test -f "$APP/dist/data/index.json"
# previews and live bundles (dist/a, ~300 MB) are shipped only when they changed: a stamp of count and size
STAMP="$(find "$APP/dist/a" -type f | wc -l | tr -d ' ')-$(du -sk "$APP/dist/a" | cut -f1)"
if [ "$(ssh -o BatchMode=yes "$HOST" "cat $REMOTE/.a-stamp 2>/dev/null")" = "$STAMP" ]; then
  echo "dist/a unchanged ($STAMP): shipping the rest"
  ssh -o BatchMode=yes "$HOST" "cd $REMOTE && mkdir -p _archive/$RUN_ID/dist && if [ -d worker ]; then mv worker _archive/$RUN_ID/; fi; find dist -mindepth 1 -maxdepth 1 ! -name a -exec mv {} _archive/$RUN_ID/dist/ \;"
  (cd "$APP" && tar cf - -h --exclude 'dist/a' dist worker) | ssh -o BatchMode=yes "$HOST" "tar xf - -C $REMOTE"
else
  echo "shipping $(find "$APP/dist" -type f | wc -l | tr -d ' ') files to $HOST"
  ssh -o BatchMode=yes "$HOST" "mkdir -p ~/SISO_Workspace/_data/ui-hub/_archive; if [ -d $REMOTE ]; then mv $REMOTE ~/SISO_Workspace/_data/ui-hub/_archive/deploy-$RUN_ID; fi; mkdir -p $REMOTE"
  (cd "$APP" && tar cf - -h dist worker) | ssh -o BatchMode=yes "$HOST" "tar xf - -C $REMOTE && echo $STAMP > $REMOTE/.a-stamp"
fi
ssh -o BatchMode=yes "$HOST" "set -euo pipefail; export PATH=\$HOME/.npm-global/bin:/opt/homebrew/bin:\$PATH; cd $REMOTE/worker && wrangler deploy -c wrangler.toml 2>&1 | grep -E 'https://|Uploaded|error|ERROR' ;
  if ! wrangler secret list -c wrangler.toml 2>/dev/null | grep -q HUB_PASSWORD; then
    grep '^WORLD_PASSWORD=' $CRED | cut -d= -f2- | tr -d '\n' | wrangler secret put HUB_PASSWORD -c wrangler.toml 2>&1 | grep -E 'Success|error|ERROR'
  fi"
