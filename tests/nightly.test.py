"""The installed nightly generates inventory without editing or committing live."""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


class Nightly(unittest.TestCase):
    def test_monorepo_nightly_uses_owned_runtime_copy(self):
        with tempfile.TemporaryDirectory(prefix='siso-ui-nightly-') as tmp:
            root, home = Path(tmp) / 'repo', Path(tmp) / 'home'
            hub = root / 'packages/ui'
            (hub / 'bin').mkdir(parents=True)
            (hub / 'module.json').write_text('{"id":"siso.ui"}')
            (hub / 'bin/nightly').write_bytes((Path(__file__).resolve().parents[1] / 'bin/nightly').read_bytes())
            for name in ('census', 'fingerprint', 'inventory', 'uihub', 'handoff'):
                p = hub / 'bin' / name
                p.write_text('#!/bin/sh\nmkdir -p inventory\necho generated > inventory/generated.txt\n')
                p.chmod(0o755)
            def git(*args):
                return subprocess.check_output(['git', '-C', str(root), *args], text=True).strip()
            git('init', '-q'); git('config', 'user.name', 'Nightly Test'); git('config', 'user.email', 'test@example.invalid')
            git('add', '.'); git('commit', '-qm', 'fixture')
            before = git('rev-parse', 'HEAD')
            env = dict(os.environ, HOME=str(home))
            env.pop('UIHUB_NIGHTLY_RUNTIME', None)
            env.pop('UIHUB_NIGHTLY_HOME', None)
            result = subprocess.run(['/bin/bash', str(hub / 'bin/nightly')], env=env, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(git('rev-parse', 'HEAD'), before)
            self.assertEqual(git('status', '--porcelain'), '')
            runs = list((home / '.local/state/siso-ui/nightly').glob('run-*'))
            self.assertEqual(len(runs), 1)
            self.assertEqual((runs[0] / 'inventory/generated.txt').read_text().strip(), 'generated')


if __name__ == '__main__':
    unittest.main()
