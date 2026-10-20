#!/bin/sh
# One run: build the live parts, curate, write the page, build its CSS, publish. Usage: charts/rebuild.sh
set -e
H="$HOME/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub"; D="$HOME/SISO_Workspace/_data/charts-curate"
cd "$D/sb"
heavy -- node "$H/charts/build.mjs" 2>&1 | grep -E "built|precheck|ERROR" || true
python3 "$H/charts/curate.py" >/dev/null
node "$H/charts/page.mjs" | tail -1
heavy -- npx @tailwindcss/cli -i src/theme-curated.css -o ../site/app.css 2>&1 | tail -1
python3 "$H/charts/publish.py"
