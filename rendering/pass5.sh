#!/bin/bash
# Render pass 5 (UI-HUB, 16 Oct): the 71 cva parts (racket-ui 56, kanpeki 15) import defineConfig, which cva dropped
# after 1.0.0-beta.8 (beta.11 kept the word, not the export). Pin that beta and redraw them from render-pass4.jsonl. tmux uihub-render9.
cd ~/SISO_Workspace/_data/ui-render || exit 1
export PATH=$HOME/.local/bin:$PATH
P=~/SISO_Workspace/_data/ui-shoot/venv/bin/python
( cd sb && npm install --legacy-peer-deps --ignore-scripts --no-audit --no-fund --loglevel=error cva@1.0.0-beta.8 ) > pass5-setup.log 2>&1
grep '"version"' sb/node_modules/cva/package.json >> pass5-setup.log
UI_THUMBS=$PWD/thumbs nice -n 15 $P bin/render run sb --jobs 8 --batch 40 < render-pass4.jsonl > render9.log 2>&1; echo "EXIT $?" >> render9.log
