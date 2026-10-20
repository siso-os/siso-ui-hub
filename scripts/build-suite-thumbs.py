#!/usr/bin/env python3
"""Small workbench previews; package originals and their hashes stay untouched."""
import json
from pathlib import Path
import sys
from PIL import Image, ImageOps

site, manifest = Path(sys.argv[1]), json.loads(Path(sys.argv[2]).read_text())
out = site / 'asset-previews'
out.mkdir(exist_ok=True)
seen = {}
for asset in manifest['files']:
    if Path(asset['url']).suffix.lower() not in {'.png', '.jpg', '.jpeg', '.webp'}:
        continue
    key = asset['sha256'][:16]
    if key in seen:
        assert seen[key] == asset['sha256'], 'Thumbnail identity collision'
        continue
    seen[key] = asset['sha256']
    with Image.open(site / asset['url'].lstrip('/')) as original:
        image = original.convert('RGBA')
        if asset['url'].startswith('/sprites/'):
            image = image.crop((0, 0, image.height, image.height))
        image = ImageOps.contain(image, (400, 256))
        image.save(out / (key + '.webp'), 'WEBP', quality=82, method=4)
print(f'PASS asset previews: {len(seen)} small derivatives; original files unchanged')
