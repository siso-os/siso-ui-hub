"""Focused preview delivery tests; no site build, network or browser.
Run: python3.11 bin/test-hubpreviews.py
"""
import copy
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.dont_write_bytecode = True
from PIL import Image
import hubindex
from hubpreviews import MAX_BYTES, PreviewDelivery, archive_unused, may_copy, thumbnail


class PreviewTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.assets = self.root / 'assets'
        self.bank = self.root / 'bank'
        self.out = self.root / 'out'
        (self.bank / 'previews').mkdir(parents=True)
        self.source = self.bank / 'previews' / 'button.png'
        Image.effect_noise((1400, 900), 100).convert('RGB').save(self.source)
        self.item = dict(id='easyui:button', name='Button', title='Button',
                         source='easyui', author='EasyUI', kind='component',
                         category='actions/button', group='actions', status='reviewed',
                         bookmarked=False, licence='MIT', tier='free',
                         url='https://example.org/button', preview_file='button.png')
        self.delivery = PreviewDelivery(self.assets, self.bank, hub=self.root)

    def test_licence_and_tier_policy(self):
        for licence in ('MIT', 'Apache-2.0', 'BSD-3-Clause', 'ISC', 'CC0', 'CC-BY-4.0', 'ours'):
            self.assertTrue(may_copy(licence))
        for licence in (None, '', 'none', 'unknown', 'Paid', hubindex.LICENCE_21ST, 'MIT OR proprietary'):
            self.assertFalse(may_copy(licence))
        self.assertFalse(may_copy('MIT', 'pro'))
        self.assertFalse(may_copy('MIT (free tier); Pro is paid'))
        self.assertTrue(may_copy('MIT (free tier); Pro is paid', 'free'))

    def test_thumbnail_budget_dimensions_and_cache(self):
        url = thumbnail(self.source, self.out)
        path = self.out / url.lstrip('/')
        self.assertLessEqual(path.stat().st_size, MAX_BYTES)
        with Image.open(path) as image:
            self.assertEqual(image.format, 'WEBP')
            self.assertLessEqual(image.width, 640)
            self.assertLessEqual(image.height, 480)
            self.assertFalse(image.is_animated)
        timestamp = path.stat().st_mtime_ns
        self.assertEqual(thumbnail(self.source, self.out), url)
        self.assertEqual(path.stat().st_mtime_ns, timestamp)
        Image.new('RGB', (100, 100), 'red').save(self.source)
        self.assertNotEqual(thumbnail(self.source, self.out), url)

    def test_unknown_paid_and_explicit_preview_licence(self):
        for licence, tier in (('unknown', 'free'), ('none', 'free'), ('Paid', 'paid'), ('MIT', 'pro')):
            result = self.delivery.deliver(dict(self.item, licence=licence, tier=tier), self.out)
            self.assertIsNone(result['preview'])
            self.assertEqual(result['preview_link'], self.item['url'])
        self.assertFalse(self.out.exists())
        result = self.delivery.deliver(dict(self.item, preview_licence='unknown'), self.out)
        self.assertIsNone(result['preview'])
        result = self.delivery.deliver(dict(self.item, licence=hubindex.LICENCE_21ST, preview_licence='MIT'), self.out)
        self.assertEqual(result['preview_status'], 'thumbnail')

    def test_private_reference_does_not_grant_public_permission(self):
        held = dict(self.item, id='21st:author__button', source='21st', licence=hubindex.LICENCE_21ST)
        private = self.delivery.deliver(held, self.out, private_reference=True)
        self.assertIsNotNone(private['preview'])
        public = self.delivery.deliver(held, self.out)
        self.assertIsNone(public['preview'])
        self.assertEqual(public['preview_link'], held['url'])
        restricted = dict(held, id='kinetics:button', source='kinetics', licence='unknown')
        self.assertIsNone(self.delivery.deliver(restricted, self.out, private_reference=True)['preview'])

    def test_missing_corrupt_unsafe_and_no_assets(self):
        self.assertIsNone(self.delivery.deliver(self.item, self.out, assets=False)['preview'])
        for file in ('missing.png', '../escape.png'):
            self.assertIsNone(self.delivery.deliver(dict(self.item, preview_file=file), self.out)['preview'])
        self.source.write_bytes(b'corrupt')
        self.assertIsNone(self.delivery.deliver(self.item, self.out)['preview'])
        result = self.delivery.deliver(dict(self.item, url='javascript:alert(1)', preview_url='https://user:pass@example.org/image'), self.out)
        self.assertIsNone(result['preview_link'])

    def test_licensed_library_shots_and_manifest_mapping(self):
        library = self.root / 'sources/easyui'
        shots = library / 'shots'
        shots.mkdir(parents=True)
        image = shots / 'button.png'
        Image.new('RGB', (1440, 900), 'orange').save(image)
        item = dict(self.item, preview_file=None)
        result = self.delivery.deliver(item, self.out)
        self.assertEqual(result['preview_status'], 'thumbnail')
        self.assertIsNone(self.delivery.deliver(dict(item, licence='none'), self.out)['preview'])
        self.assertIsNone(self.delivery.deliver(dict(item, tier='pro'), self.out)['preview'])
        # Match a differently named screenshot through the recorded page URL.
        (library / 'pages.jsonl').write_text(json.dumps(dict(url=item['url'], shot='shots/button.png', shot_status='ok')) + '\n')
        mapped = dict(item, id='easyui:other-name', name='other-name')
        delivery = PreviewDelivery(self.assets, self.bank, hub=self.root)
        self.assertEqual(delivery.deliver(mapped, self.out)['preview_status'], 'thumbnail')
        self.assertIsNone(delivery.deliver(dict(mapped, source='../easyui'), self.out)['preview'])

    def test_harvest_fallback_ignores_stale_has_flag(self):
        source = self.assets / 'harvest' / 'author__button' / 'preview.png'
        source.parent.mkdir(parents=True)
        Image.new('RGB', (900, 600), 'green').save(source)
        result = self.delivery.deliver(dict(self.item, id='21st:author__button', source='21st', has={'preview': False}), self.out)
        self.assertEqual(result['preview_status'], 'thumbnail')

    def test_bank_manifest_and_21st_extras(self):
        row = dict(id=self.item['id'], preview='previews/button.png', upstream_preview='https://example.org/image', preview_licence='MIT')
        (self.bank / 'index.jsonl').write_text('invalid\n' + json.dumps(row) + '\n')
        result = PreviewDelivery(self.assets, self.bank).deliver(dict(self.item, licence='unknown', preview_file=None), self.out)
        self.assertEqual(result['preview_status'], 'thumbnail')
        self.assertEqual(result['preview_link'], row['upstream_preview'])
        extra = self.assets / 'extras' / 'themes' / 'sample.png'
        extra.parent.mkdir(parents=True)
        Image.new('RGB', (1000, 600), 'blue').save(extra)
        result = self.delivery.deliver(dict(self.item, id='21st-theme:sample', source='21st', xp='themes/sample.png'), self.out)
        self.assertEqual(result['preview_status'], 'thumbnail')
        escaped = self.assets / 'extras' / 'escape.png'
        escaped.symlink_to(self.source)
        result = self.delivery.deliver(dict(self.item, id='21st-theme:escape', source='21st', xp='escape.png', preview_file=None), self.out)
        self.assertIsNone(result['preview'])

    def test_public_fixture_export_and_reexport(self):
        # Stub the index only; exercise the real export and privacy filter on four items.
        private = dict(self.item, id='siso:private', author='SISO', status='ours')
        unknown = dict(self.item, id='kinetics:button', source='kinetics', licence='none',
                       live='https://example.org/live', video='https://example.org/video',
                       preview_url='https://example.org/preview', bundle_url='https://example.org/bundle')
        corpus = dict(self.item, id='21st:author__button', source='21st', licence=hubindex.LICENCE_21ST, preview_licence='MIT', live='https://example.org/live')
        licensed = dict(self.item, preview_file=None)
        shot = self.root / 'sources/easyui/shots/button.png'
        shot.parent.mkdir(parents=True)
        Image.new('RGB', (1440, 900), 'orange').save(shot)
        idx = dict(items=[licensed, unknown, corpus, private], frontier=[], libraries=[])
        stale = self.out / 'a' / 'b' / 'old.html'
        stale.parent.mkdir(parents=True)
        stale.write_text('old code')
        with patch.object(hubindex, 'build', return_value=copy.deepcopy(idx)), \
             patch.object(hubindex, 'PreviewDelivery', return_value=self.delivery), \
             patch.object(hubindex, 'industries', return_value=[]):
            hubindex.export(self.out, public=True)
            data = json.loads((self.out / 'data/index.json').read_text())
            rows = {r['id']: r for r in data['items']}
            self.assertEqual(set(rows), {self.item['id'], unknown['id'], corpus['id']})
            self.assertTrue(rows[self.item['id']]['p'].startswith('/a/p/'))
            self.assertNotIn('p', rows[unknown['id']])
            self.assertIn('p', rows[corpus['id']])
            for item in (unknown, corpus):
                self.assertNotIn('lv', rows[item['id']])
                self.assertTrue(rows[item['id']]['pl'].startswith('https://'))
            full = json.loads((self.out / f"data/item/{hubindex.fnv(unknown['id'])}.json").read_text())[unknown['id']]
            self.assertIsNone(full['live'])
            self.assertEqual(full['files'], [])
            self.assertNotIn('video', full)
            self.assertEqual(hubindex.privacy_check(self.out), [])
            self.assertFalse(stale.exists())
            self.assertTrue((self.root / '_archive/out-preview-assets/a/b/old.html').is_file())
            old_preview = self.out / rows[self.item['id']]['p'].lstrip('/')
            hubindex.export(self.out, assets=False, public=True)
            self.assertFalse(old_preview.exists())
            rows = json.loads((self.out / 'data/index.json').read_text())['items']
            self.assertTrue(all('p' not in row for row in rows))


if __name__ == '__main__':
    unittest.main(verbosity=2)
