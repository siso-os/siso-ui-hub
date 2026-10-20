import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';
import test from 'node:test';

const script = fileURLToPath(new URL('../build/package-build.mjs', import.meta.url));

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'affine-build-interface-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const donor = join(root, 'donor');
  const frontend = join(donor, 'frontend');
  const web = join(frontend, 'packages/frontend/apps/web');
  const output = join(root, 'artifact');
  const bin = join(root, 'bin');
  mkdirSync(web, { recursive: true });
  mkdirSync(bin);
  writeFileSync(join(frontend, 'package.json'), '{}');
  // A deterministic compiler fixture: no real donor execution, downloads or credentials.
  writeFileSync(join(bin, 'corepack'), `#!${process.execPath}
const fs = require('node:fs');
fs.writeFileSync('compiler-called', JSON.stringify({ args: process.argv.slice(2), network: process.env.COREPACK_ENABLE_NETWORK }));
fs.mkdirSync('packages/frontend/apps/web/dist/js', { recursive: true });
fs.writeFileSync('packages/frontend/apps/web/dist/index.html', '<script src="/js/index.js"></script>');
fs.writeFileSync('packages/frontend/apps/web/dist/js/index.js',
  "(function() { const capturedFetch = window.fetch; globalThis.fixtureCapturedFetch = capturedFetch;\\n" +
  "globalThis.SisoKnowledgeModule = { mount() { if (!globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE) globalThis.fixtureBridgeInstalls = (globalThis.fixtureBridgeInstalls || 0) + 1; if (globalThis.fixtureMountFailure) throw new Error('fixture mount failed'); capturedFetch('/api/captured'); return async () => { if (globalThis.fixtureAsyncCleanup) await new Promise(resolve => setTimeout(resolve, 20)); globalThis.fixtureUnmounts = (globalThis.fixtureUnmounts || 0) + 1; if (globalThis.fixtureCleanupFailure) throw new Error('fixture cleanup failed'); }; } }; })();\\n");
`, { mode: 0o700 });
  const run = args => spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: 'utf8', env: { PATH: `${bin}:${process.env.PATH}`, LANG: 'en_US.UTF-8' } });
  return { donor, frontend, web, output, bin, run };
}

test('build requires explicit donor and new artifact paths before invoking a compiler', t => {
  const f = fixture(t);
  for (const args of [[], ['--donor', f.donor], ['--out', f.output], ['--donor', f.donor, '--out', f.output, '--unknown']]) {
    const r = f.run(args);
    assert.notEqual(r.status, 0);
    assert.equal(existsSync(join(f.frontend, 'compiler-called')), false);
  }
});

test('generated consumer bridge follows remount context and cleans up safely', async t => {
  const f = fixture(t);
  const r = f.run(['--donor', f.donor, '--out', f.output]);
  assert.equal(r.status, 0, `${r.stdout}\n${r.stderr}`);

  const calls = [];
  const hostFetch = (input, init = {}) => {
    calls.push({ input, init });
    return Promise.resolve({ ok: true });
  };
  class HeadersMock {
    constructor(init = {}) { this.values = { ...init }; }
    set(name, value) { this.values[name] = value; }
  }
  class RequestMock {
    constructor(input, init = {}) {
      this.url = input?.url || String(input);
      this.headers = new HeadersMock(input?.headers?.values || init.headers);
    }
  }
  globalThis.location = { href: 'https://host.test/app/', origin: 'https://host.test' };
  globalThis.window = { fetch: hostFetch };
  globalThis.Request = RequestMock;
  delete globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE_STATE;
  globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE = false;
  globalThis.document = {
    head: { append(element) {
      if (element.tagName === 'SCRIPT') {
        const source = readFileSync(new URL(element.src), 'utf8');
        vm.runInThisContext(source, { filename: String(element.src) });
        element.onload?.();
      } else element.onload?.();
    } },
    createElement(tag) { return { tagName: tag.toUpperCase() }; },
  };
  const module = await import(`${pathToFileURL(join(f.output, 'siso-knowledge-module.js')).href}?consumer=${Date.now()}`);
  const host = context => ({ host: { tokens: { sisoRequestContext: context } }, backendBase: '/backend' });

  globalThis.fixtureAsyncCleanup = true;
  globalThis.fixtureUnmounts = 0;
  const firstCleanup = await module.mount({}, host('first'));
  assert.equal(globalThis.fixtureBridgeInstalls, undefined);
  assert.equal(calls.at(-1).input.url, 'https://host.test/backend/api/captured');
  assert.equal(calls.at(-1).input.headers.values['x-siso-request-context'], 'first');
  await window.fetch('https://host.test/backend-other/api/host');
  assert.equal(calls.at(-1).input, 'https://host.test/backend-other/api/host');
  await assert.rejects(module.mount({}, host('overlap')), /overlapping mounts/);
  const laterWrapper = (input, init) => globalThis.fixtureCapturedFetch(input, init);
  window.fetch = laterWrapper;
  await globalThis.fixtureCapturedFetch('/api/during-wrapper');
  assert.equal(calls.at(-1).input.url, 'https://host.test/backend/api/during-wrapper');
  const cleanupPromise = firstCleanup();
  assert.equal(cleanupPromise, firstCleanup());
  assert.equal(module.unmount(), cleanupPromise);
  await assert.rejects(module.mount({}, host('pending-cleanup')), /overlapping mounts/);
  await cleanupPromise;
  assert.equal(window.fetch, laterWrapper);
  assert.equal(globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE, false);
  assert.equal(globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE_STATE.context, '');
  assert.equal(globalThis.fixtureUnmounts, 1);
  const afterUnmount = calls.length;
  await window.fetch('/api/host');
  assert.equal(calls.length, afterUnmount + 1);
  const secondCleanup = await module.mount({}, host('second'));
  assert.equal(globalThis.fixtureBridgeInstalls, undefined, 'The donor must not install a fallback bridge on remount');
  assert.equal(calls.at(-1).input.url, 'https://host.test/backend/api/captured');
  assert.equal(calls.at(-1).input.headers.values['x-siso-request-context'], 'second');
  await laterWrapper('/api/after-remount');
  assert.equal(calls.at(-1).input.headers.values['x-siso-request-context'], 'second');
  await secondCleanup();
  assert.equal(window.fetch, laterWrapper);

  const thirdCleanup = await module.mount({}, { ...host('third'), backendBase: 'https://backend.test/base' });
  for (const url of ['https://backend.test.evil/base/data', 'https://backend.test/base-other/data']) {
    await window.fetch(url);
    assert.equal(calls.at(-1).input, url, 'Do not attach donor context to a lookalike origin or adjacent host path');
  }
  await thirdCleanup();

  const failingCleanup = await module.mount({}, host('cleanup-failure'));
  globalThis.fixtureCleanupFailure = true;
  const failure = failingCleanup();
  await assert.rejects(failure, /fixture cleanup failed/);
  assert.equal(failingCleanup(), failure);
  assert.equal(globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE_STATE.context, '');
  await assert.rejects(module.mount({}, host('after-failed-cleanup')), /overlapping mounts/);
  globalThis.fixtureCleanupFailure = false;
});

test('generated consumer restores fetch after load and donor mount failures', async t => {
  for (const mode of ['load', 'mount', 'preload']) {
    const f = fixture(t);
    const result = f.run(['--donor', f.donor, '--out', f.output]);
    assert.equal(result.status, 0, result.stderr);
    const hostFetch = () => Promise.resolve({ ok: true });
    globalThis.location = { href: 'https://host.test/app/', origin: 'https://host.test' };
    globalThis.window = { fetch: hostFetch };
    globalThis.Request = class { constructor(input) { this.url = input?.url || String(input); this.headers = { set() {} }; } };
    delete globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE_STATE;
    delete globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE;
    globalThis.SisoKnowledgeModule = undefined;
    globalThis.fixtureMountFailure = mode === 'mount';
    globalThis.document = {
      head: { append(element) {
        if ((mode === 'load' || mode === 'preload') && element.tagName === 'SCRIPT') element.onerror?.();
        else if (element.tagName === 'SCRIPT') {
          vm.runInThisContext(readFileSync(new URL(element.src), 'utf8'), { filename: String(element.src) });
          element.onload?.();
        } else element.onload?.();
      } },
      createElement(tag) { return { tagName: tag.toUpperCase() }; },
    };
    const module = await import(`${pathToFileURL(join(f.output, 'siso-knowledge-module.js')).href}?failure=${mode}-${Date.now()}`);
    const operation = mode === 'preload'
      ? module.preload({ host: { tokens: { sisoRequestContext: mode } } })
      : module.mount({}, { host: { tokens: { sisoRequestContext: mode } } });
    await assert.rejects(operation, /failed|did not initialize/);
    assert.equal(window.fetch, hostFetch);
  }
});

test('build refuses a pre-existing output and preserves its sentinel', t => {
  const f = fixture(t);
  mkdirSync(f.output);
  writeFileSync(join(f.output, 'sentinel'), 'preserve');
  const r = f.run(['--donor', f.donor, '--out', f.output]);
  assert.notEqual(r.status, 0);
  assert.equal(readFileSync(join(f.output, 'sentinel'), 'utf8'), 'preserve');
  assert.equal(existsSync(join(f.frontend, 'compiler-called')), false);
});

test('build refuses an existing donor dist before compiler overwrite', t => {
  const f = fixture(t);
  mkdirSync(join(f.web, 'dist'));
  writeFileSync(join(f.web, 'dist/sentinel'), 'preserve');
  const r = f.run(['--donor', f.donor, '--out', f.output]);
  assert.notEqual(r.status, 0);
  assert.equal(readFileSync(join(f.web, 'dist/sentinel'), 'utf8'), 'preserve');
  assert.equal(existsSync(join(f.frontend, 'compiler-called')), false);
});

test('explicit reuse packages recorded compiler output without running or changing it', t => {
  const f = fixture(t);
  const dist = join(f.web, 'dist');
  mkdirSync(join(dist, 'js'), { recursive: true });
  writeFileSync(join(dist, 'index.html'), '<script src="/js/index.js"></script>');
  writeFileSync(join(dist, 'js/index.js'), 'globalThis.recordedCompilerOutput = true;');
  const result = f.run(['--donor', f.donor, '--out', f.output, '--reuse-dist']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(join(f.frontend, 'compiler-called')), false);
  assert.equal(readFileSync(join(dist, 'js/index.js'), 'utf8'), 'globalThis.recordedCompilerOutput = true;');
  assert.equal(JSON.parse(readFileSync(join(f.output, 'package-manifest.json'))).compilerExecuted, false);
});

test('build refuses a dangling output symlink', t => {
  const f = fixture(t);
  symlinkSync(join(f.output, 'absent'), f.output);
  const r = f.run(['--donor', f.donor, '--out', f.output]);
  assert.notEqual(r.status, 0);
  assert.equal(existsSync(join(f.frontend, 'compiler-called')), false);
});

test('build uses the explicit donor from unrelated cwd and retains compiler output', t => {
  const f = fixture(t);
  const r = f.run(['--donor', f.donor, '--out', f.output]);
  assert.equal(r.status, 0, `${r.stdout}\n${r.stderr}`);
  const compiler = JSON.parse(readFileSync(join(f.frontend, 'compiler-called')));
  assert.deepEqual(compiler.args, ['yarn', 'affine', '@affine/web', 'build']);
  assert.equal(compiler.network, '0');
  assert.equal(existsSync(join(f.web, 'dist/index.html')), true);
  const manifest = JSON.parse(readFileSync(join(f.output, 'package-manifest.json')));
  assert.equal(manifest.compiled, true);
  assert.ok(manifest.files.some(file => file.path === 'siso-knowledge-module.js'));
  assert.ok(!readFileSync(join(f.output, 'siso-knowledge-module.js'), 'utf8').includes(f.donor));
});

test('build can reuse a contained Yarn executable but refuses one outside the donor', t => {
  const f = fixture(t);
  const outside = f.run(['--donor', f.donor, '--out', f.output, '--yarn', join(f.bin, 'corepack')]);
  assert.notEqual(outside.status, 0);
  assert.match(outside.stderr, /inside the declared donor frontend/);
  assert.equal(existsSync(join(f.frontend, 'compiler-called')), false);
  const yarn = join(f.frontend, 'fixture-yarn.cjs');
  writeFileSync(yarn, readFileSync(join(f.bin, 'corepack')));
  const result = f.run(['--donor', f.donor, '--out', f.output, '--yarn', yarn]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(readFileSync(join(f.frontend, 'compiler-called'))).args, ['affine', '@affine/web', 'build']);
});
