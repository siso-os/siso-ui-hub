"""Local preview delivery. No downloads; uncertain licences are links only.

Thumbnail encoding uses Pillow with WebP support in the current Python, else
UIHUB_IMAGE_PYTHON or the installed python3.11. UIHUB_PREVIEW_BANK may point at a
bank with index.jsonl/previews/. Compact rows expose p (thumbnail), pl (upstream
link), pc (credit); item shards also describe preview_status and preview_licence.
Library screenshots are read from HUB/sources/<library>/shots/ and the documented
pages.jsonl/components.jsonl shot mappings. UIHUB_LIBRARY_PREVIEWS overrides the
sources root when ignored screenshots are stored outside the checkout.
"""
import hashlib
import io
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlsplit

MAX_BYTES = 40_000


def upstream(value):
    if not isinstance(value, str):
        return None
    try:
        url = urlsplit(value)
        return value if url.scheme in ('http', 'https') and url.hostname and not url.username and not url.password else None
    except ValueError:
        return None


def may_copy(licence, tier=None):
    """Require a recorded permissive licence; free availability is not a licence."""
    if tier and tier.lower() != 'free':
        return False
    value = (licence or '').strip().lower()
    if value in {'mit', 'isc', 'apache-2.0', 'apache 2.0', 'bsd-2-clause',
                 'bsd-3-clause', 'cc0-1.0', 'cc0', 'cc-by-4.0', 'ours'}:
        return True
    return value == 'mit (4 repos)' or (value == 'mit (free tier); pro is paid' and tier == 'free')


def local_file(root, relative):
    """Only use an existing file inside the supplied asset root (including symlinks)."""
    if not isinstance(relative, str):
        return None
    root = Path(root).resolve()
    path = (root / relative).resolve()
    return path if path.is_relative_to(root) and path.is_file() else None


def thumbnail(src, out):
    """Content-addressed, still WebP at <=640x480 and <=40,000 bytes."""
    content = src.read_bytes()
    name = hashlib.sha256(b'uihub-webp-640x480-v1\0' + content).hexdigest()[:32] + '.webp'
    dst = Path(out) / 'a' / 'p' / name
    if dst.is_file() and 0 < dst.stat().st_size <= MAX_BYTES:
        return '/a/p/' + name
    try:
        from PIL import Image, ImageOps
    except ImportError as exc:
        encoder = os.environ.get('UIHUB_IMAGE_PYTHON') or shutil.which('python3.11')
        if encoder and Path(encoder).resolve() != Path(sys.executable).resolve():
            encoded = subprocess.run([encoder, str(Path(__file__).resolve()), str(src), str(out)],
                                     capture_output=True, text=True, timeout=60)
            if encoded.returncode:
                raise RuntimeError('Thumbnail encoder failed; provide Python with Pillow/WebP via UIHUB_IMAGE_PYTHON.') from exc
            result = json.loads(encoded.stdout)
            return result if result == '/a/p/' + name and dst.is_file() and 0 < dst.stat().st_size <= MAX_BYTES else None
        raise RuntimeError('Preview thumbnails require Pillow with WebP support; set UIHUB_IMAGE_PYTHON to an environment that provides it.') from exc
    try:
        with Image.open(io.BytesIO(content)) as image:
            image.seek(0)  # never ship animated originals in a card
            image = ImageOps.exif_transpose(image).convert('RGBA')
            for bounds in ((640, 480), (480, 360), (320, 240), (160, 120)):
                image.thumbnail(bounds, Image.Resampling.LANCZOS)
                for quality in (75, 55, 35, 20):
                    encoded = io.BytesIO()
                    image.save(encoded, format='WEBP', quality=quality, method=4, exif=b'', icc_profile=b'')
                    data = encoded.getvalue()
                    if len(data) <= MAX_BYTES:
                        dst.parent.mkdir(parents=True, exist_ok=True)
                        # Replace stale files instead of hardlinking or retaining a full-size image.
                        tmp = dst.with_suffix('.tmp')
                        tmp.write_bytes(data)
                        tmp.replace(dst)
                        return '/a/p/' + name
    except (OSError, ValueError):
        return None  # a corrupt source gets its upstream link, never a broken local URL
    return None


class PreviewDelivery:
    def __init__(self, assets, bank=None, hub=None):
        self.assets = Path(assets)
        self.hub = Path(hub or Path(__file__).resolve().parent.parent)
        canonical_bank = Path.home() / 'SISO_Workspace/Great_Library_of_SISO/banks/siso-component-bank'
        mirrored_bank = Path.home() / 'SISO_Workspace/_data/ui-hub/bank'
        self.bank = Path(bank or os.environ.get('UIHUB_PREVIEW_BANK') or
                         (canonical_bank if canonical_bank.is_dir() else mirrored_bank))
        self.libraries = Path(os.environ.get('UIHUB_LIBRARY_PREVIEWS') or
                              Path(hub or Path(__file__).resolve().parent.parent) / 'sources')
        self.library_rows = {}
        self.by_id, self.by_url = {}, {}
        manifest = self.bank / 'index.jsonl'
        if manifest.is_file():
            with manifest.open() as rows:
                for line in rows:
                    try:
                        row = json.loads(line)
                    except ValueError:
                        continue
                    if not isinstance(row, dict):
                        continue
                    if row.get('id'):
                        self.by_id.setdefault(row['id'], row)
                    if upstream(row.get('url')):
                        self.by_url.setdefault(row['url'], row)

    def library_shots(self, item):
        source = item.get('source') or ''
        if not re.fullmatch(r'[A-Za-z0-9][\w-]*', source) or source == '21st':
            return []
        root = self.libraries / source
        if source not in self.library_rows:
            by_id, by_url = {}, {}
            for filename in ('components.jsonl', 'pages.jsonl'):
                manifest = local_file(root, filename)
                if not manifest:
                    continue
                with manifest.open() as lines:
                    for line in lines:
                        try:
                            row = json.loads(line)
                        except ValueError:
                            continue
                        if not isinstance(row, dict) or row.get('shot_status') == 'fail':
                            continue
                        if row.get('id'):
                            by_id.setdefault(row['id'], row)
                        if row.get('url'):
                            by_url.setdefault(row['url'], row)
            self.library_rows[source] = (by_id, by_url)
        by_id, by_url = self.library_rows[source]
        row = by_id.get(item['id']) or by_url.get(item.get('url')) or {}
        if (row.get('access') or row.get('tier')) in ('pro', 'paid'):
            return []
        candidates = [local_file(root, item.get('shot')), local_file(root, row.get('shot'))]
        for name in (item.get('name'), item['id'].split(':', 1)[-1]):
            if isinstance(name, str) and re.fullmatch(r'[\w-]+', name):
                candidates.extend(local_file(root / 'shots', f'{name}.{ext}')
                                  for ext in ('webp', 'png', 'jpg', 'jpeg'))
        return candidates

    def deliver(self, item, out, assets=True, private_reference=False):
        bank = self.by_id.get(item['id']) or self.by_url.get(item.get('url')) or {}
        link = next((u for u in (upstream(item.get('upstream_preview')), upstream(item.get('preview_url')),
                                upstream(bank.get('upstream_preview')), upstream(item.get('url'))) if u), None)
        licence = item.get('preview_licence') or bank.get('preview_licence') or bank.get('licence') or item.get('licence')
        tier = item.get('tier') or bank.get('tier')
        result = {'preview': None, 'preview_link': link,
                  'preview_credit': item.get('author') or bank.get('author') or item.get('source'),
                  'preview_licence': licence or 'unknown', 'preview_status': 'link' if link else 'unavailable'}
        # Preserve the owner's existing local 21st reference collection privately.
        # This grants no public permission and never downloads new third-party media.
        held_reference = private_reference and item.get('source') == '21st'
        if not assets or not (held_reference or may_copy(licence, tier)):
            return result
        candidates = self.library_shots(item)
        if item.get('source') == 'shadcn-ui':
            candidates.append(local_file(self.hub / '_reference/shadcn/previews', item.get('reference_preview')))
        if item.get('source') == '21st':
            h = item['id'].split(':', 1)[1]
            if item.get('xp'):
                candidates.append(local_file(self.assets / 'extras', item['xp']))
            else:
                candidates.extend(local_file(self.assets / 'harvest', f'{h}/preview.{ext}') for ext in ('webp', 'png', 'jpg'))
        for row in (item, bank):
            for key in ('preview_file', 'preview'):
                relative = row.get(key)
                if isinstance(relative, str):
                    candidates.append(local_file(self.bank, relative))
                    candidates.append(local_file(self.bank / 'previews', relative))
        for src in candidates:
            if src:
                preview = thumbnail(src, out)
                if preview:
                    result.update(preview=preview, preview_status='thumbnail')
                    break
        return result


def archive_unused(out, keep):
    """Move stale preview/bundle assets outside the served tree; never delete them."""
    import uuid
    out = Path(out)
    archive = out.parent / '_archive' / (out.name + '-preview-assets')
    for directory in ('p', 'x', 'b'):
        root = out / 'a' / directory
        if not root.is_dir():
            continue
        for path in root.rglob('*'):
            if not path.is_file() or '/' + path.relative_to(out).as_posix() in keep:
                continue
            dst = archive / path.relative_to(out)
            dst.parent.mkdir(parents=True, exist_ok=True)
            if dst.exists():
                dst = dst.with_name(dst.name + '.' + uuid.uuid4().hex)
            shutil.move(str(path), str(dst))


if __name__ == '__main__':
    print(json.dumps(thumbnail(Path(sys.argv[1]), sys.argv[2])))
