import { cpSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { basename, dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';

const { values } = parseArgs({ options: { donor: { type: 'string' }, out: { type: 'string' }, yarn: { type: 'string' }, 'reuse-dist': { type: 'boolean' } }, strict: true, allowPositionals: false });
if (!values.donor || !values.out) throw new Error('Usage: package-build.mjs --donor <prepared-disposable-checkout> --out <new-artifact-directory>');
const root = realpathSync(resolve(values.donor));
const frontend = realpathSync(resolve(root, 'frontend'));
const web = realpathSync(resolve(frontend, 'packages/frontend/apps/web'));
if (!frontend.startsWith(`${root}/`) || !web.startsWith(`${frontend}/`)) throw new Error('Donor frontend escapes the declared checkout');
if (!statSync(resolve(frontend, 'package.json')).isFile()) throw new Error('Donor frontend package.json is required');
const sourceDist = resolve(web, 'dist');
const requestedOutput = resolve(values.out);
if (lstatSync(requestedOutput, { throwIfNoEntry: false })) throw new Error('Artifact output already exists; nothing will be replaced');
const output = resolve(realpathSync(dirname(requestedOutput)), basename(requestedOutput));
if (output.startsWith(`${root}/`)) throw new Error('Artifact output must be outside the donor checkout');
if (!values['reuse-dist'] && lstatSync(sourceDist, { throwIfNoEntry: false })) throw new Error('Donor dist already exists; use a fresh disposable build checkout or explicitly reuse its compiler output');
const yarn = values.yarn ? realpathSync(resolve(values.yarn)) : null;
if (yarn && (!yarn.startsWith(`${frontend}/`) || !statSync(yarn).isFile())) throw new Error('Yarn executable must be a file inside the declared donor frontend');

if (!values['reuse-dist']) execFileSync(yarn ? process.execPath : 'corepack', yarn ? [yarn, 'affine', '@affine/web', 'build'] : ['yarn', 'affine', '@affine/web', 'build'], {
  cwd: frontend,
  stdio: 'inherit',
  env: {
    ...process.env,
    COREPACK_ENABLE_NETWORK: '0',
    PUBLIC_PATH: '/',
    GITHUB_SHA: process.env.GITHUB_SHA ?? 'siso-knowledge-package',
    SISO_LOCAL_BACKEND_URL: process.env.SISO_LOCAL_BACKEND_URL ?? 'http://127.0.0.1:3012',
  },
});

if (!lstatSync(sourceDist).isDirectory()) throw new Error('Compiler output is not a directory');
for (const file of readdirSync(sourceDist, { recursive: true })) {
  if (lstatSync(resolve(sourceDist, String(file))).isSymbolicLink()) throw new Error('Compiler output contains a symlink');
}
// Reserve a new destination atomically and retain the compiler's original output.
// Failed builds/packaging remain inspectable; never delete an existing artifact.
mkdirSync(output);
cpSync(sourceDist, output, { recursive: true, errorOnExist: true, force: false });

const html = readFileSync(resolve(output, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => match[1]);
const styles = [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map(match => match[1]);
const mainScript = scripts.at(-1);
if (!mainScript) throw new Error('Rspack output has no browser entry script');

// The upstream app is root-hosted. Rewrite all root-relative URLs so a copied
// package remains self-contained under any nested host path.
const textFiles = readdirSync(output, { recursive: true })
  .map(file => resolve(output, String(file)))
  .filter(file => /\.(?:css|js|html|map)$/.test(file));
for (const file of textFiles) {
  let source = readFileSync(file, 'utf8');
  // Source maps and WASM fallbacks can retain the local checkout path. Keep
  // the compiled package portable and do not disclose the build machine.
  source = source.replaceAll(root, '/siso-knowledge-build');
  if (file.includes('/js/runtime.') && file.endsWith('.js')) {
    source = source.replace(/h\.p="?\/?"?/, 'h.p=globalThis.__SISO_KNOWLEDGE_ASSET_BASE__||new URL("./",document.currentScript?.src||location.href).href');
    source = source.replace('var t=h.p+h.u(e),c=Error();', 'var t=new URL(h.u(e),globalThis.__SISO_KNOWLEDGE_ASSET_BASE__||new URL("./",document.currentScript?.src||location.href).href).href,c=Error();');
    source = source.replace('var t=h.miniCssF(e),c=h.p+t;', 'var t=h.miniCssF(e),c=new URL(t,globalThis.__SISO_KNOWLEDGE_ASSET_BASE__||new URL("./",document.currentScript?.src||location.href).href).href;');
  }
  if (file.includes('/js/index.') && file.endsWith('.js')) {
    source = source.replaceAll('i.p=environment.publicPath', 'i.p=globalThis.__SISO_KNOWLEDGE_ASSET_BASE__||new URL("./",document.currentScript?.src||location.href).href');
    source = source.replaceAll('return(environment.subPath||"/")+"js/"+', 'return (globalThis.__SISO_KNOWLEDGE_ASSET_BASE__||new URL("./",document.currentScript?.src||location.href).href)+"js/"+');
    source = source.replace(/:\"\/imgs\//g, ':globalThis.__SISO_KNOWLEDGE_ASSET_BASE__+"imgs/');
    source = source.replaceAll('url:environment.publicPath+"fonts/"+e.url.split("/").pop()', 'url:(globalThis.__SISO_KNOWLEDGE_ASSET_BASE__||new URL("./",document.currentScript?.src||location.href).href)+"fonts/"+e.url.split("/").pop()');
    source = source.replace('let tj=(0,tr.M)("nbstore");', 'let tj=new URL((0,tr.M)("nbstore"),location.href);tj.searchParams.set("siso_backend",globalThis.__SISO_KNOWLEDGE_WORKER_BACKEND_BASE__||"/knowledge-backend/");');
  }
  if (file.includes('/js/nbstore-') && file.endsWith('.worker.js')) {
    // The nbstore worker owns its HTTP fetches and cannot see the page fetch
    // bridge. Pass the host backend base through the worker URL (it is not a
    // credential), then preserve the configured nested path for API/GraphQL
    // requests and Socket.IO.
    source = `globalThis.__SISO_KNOWLEDGE_COMPILED_PACKAGE__=true;globalThis.__SISO_KNOWLEDGE_BACKEND_BASE__=new URL(new URLSearchParams(globalThis.location.search).get("siso_backend")||"/knowledge-backend/",globalThis.location.origin).href;globalThis.__SISO_KNOWLEDGE_BACKEND_REQUEST__=e=>new URL(String(e).replace(/^\\/+/,""),globalThis.__SISO_KNOWLEDGE_BACKEND_BASE__.replace(/\\/?$/, "/")).href;globalThis.__SISO_KNOWLEDGE_SOCKET_PATH__=new URL("socket.io",globalThis.__SISO_KNOWLEDGE_BACKEND_BASE__.replace(/\\/?$/, "/")).pathname;\n${source}`;
    const workerRequest = 'globalThis.__SISO_KNOWLEDGE_BACKEND_REQUEST__';
    source = source.replaceAll('path:r?"/admin/api/cms/affine/socket.io":void 0', 'path:r?globalThis.__SISO_KNOWLEDGE_SOCKET_PATH__:void 0');
    source = source.replaceAll('new URL(e,this.serverBaseUrl)', `${workerRequest}(e)`);
    source = source.replaceAll('new URL("/graphql",this.serverBaseUrl)', `${workerRequest}("/graphql")`);
    source = source.replaceAll('new URL(e,this.options.serverBaseUrl)', `${workerRequest}(e)`);
  }
  if (/\.(?:css|html)$/.test(file)) {
    source = source.replace(/(["'(])\/(?!\/)/g, '$1');
  }
  writeFileSync(file, source);
}

writeFileSync(resolve(output, 'siso-knowledge-module.js'), `
const assets = ${JSON.stringify({ scripts, styles })};
const assetBase = new URL('./', import.meta.url);
globalThis.__SISO_KNOWLEDGE_COMPILED_PACKAGE__ = true;
globalThis.__SISO_KNOWLEDGE_ASSET_BASE__ = assetBase.href;
let priorFetchBridgeFlag;
let ready;
let activeUnmount;
let activeMount = false;
const bridgeState = globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE_STATE || {
  target: '', context: '', active: false, bridge: null, nativeFetch: null, restoreFetch: null,
};
globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE_STATE = bridgeState;
function installRequestBridge(host, backendBase) {
  const target = new URL(backendBase || '/knowledge-backend', location.origin).href.replace(/\\/$/, '');
  if (!bridgeState.active) priorFetchBridgeFlag = globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE;
  globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE = true;
  globalThis.__SISO_KNOWLEDGE_WORKER_BACKEND_BASE__ = target;
  bridgeState.target = target;
  bridgeState.context = host?.tokens?.sisoRequestContext ?? '';
  bridgeState.active = true;
  if (window.fetch === bridgeState.bridge) return;
  bridgeState.restoreFetch = window.fetch;
  // The host may pass an explicit backend base; compiled package mounts that
  // omit it still need the cookie-bearing same-origin CMS prefix.
  if (!bridgeState.nativeFetch) bridgeState.nativeFetch = window.fetch;
  // AFFiNE captures this stable function during evaluation; remounts mutate
  // state rather than leaving the captured function bound to stale context.
  bridgeState.bridge ??= (input, init = {}) => {
    if (!bridgeState.active) return bridgeState.nativeFetch.call(window, input, init);
    const request = new Request(input, init);
    const url = new URL(request.url, location.href);
    const rootRequest = url.origin === location.origin &&
      (url.pathname === '/api' || url.pathname.startsWith('/api/') ||
       url.pathname === '/graphql' || url.pathname.startsWith('/graphql/'));
    const backend = new URL(bridgeState.target);
    const backendPath = backend.pathname.replace(/\\/$/, '');
    const backendRequestPath = url.origin === backend.origin &&
      (url.pathname === backendPath || url.pathname.startsWith(backendPath + '/'));
    if (!rootRequest && !backendRequestPath) return bridgeState.nativeFetch.call(window, input, init);
    const backendRequest = rootRequest
      ? new Request(bridgeState.target + url.pathname + url.search, request)
      : request;
    backendRequest.headers.set('x-siso-request-context', bridgeState.context);
    return bridgeState.nativeFetch.call(window, backendRequest, { ...init, credentials: 'include' });
  };
  window.fetch = bridgeState.bridge;
}
function deactivateRequestBridge() {
  bridgeState.active = false;
  bridgeState.context = '';
  bridgeState.target = '';
  globalThis.__SISO_KNOWLEDGE_WORKER_BACKEND_BASE__ = undefined;
  globalThis.__SISO_KNOWLEDGE_FETCH_BRIDGE = priorFetchBridgeFlag;
  if (window.fetch === bridgeState.bridge && bridgeState.restoreFetch) window.fetch = bridgeState.restoreFetch;
}
function loadAssets() {
  if (ready) return ready;
  ready = Promise.all([
    ...assets.styles.map(href => new Promise((resolve, reject) => {
      const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = new URL(href.replace(/^\\//, ''), assetBase); link.onload = resolve; link.onerror = () => reject(new Error('SISO Knowledge stylesheet failed: ' + link.href)); document.head.append(link);
    })),
    ...assets.scripts.map(src => new Promise((resolve, reject) => {
      const script = document.createElement('script'); script.async = false; script.src = new URL(src.replace(/^\\//, ''), assetBase); script.onload = resolve; script.onerror = () => reject(new Error('SISO Knowledge script failed: ' + script.src)); document.head.append(script);
    })),
  ]);
  return ready;
}
function setInitialPath(options) {
  const workspaceId = options.host?.identity?.workspaceId;
  globalThis.__SISO_KNOWLEDGE_INITIAL_PATH__ = options.initialPath ??
    (workspaceId ? '/workspace/' + workspaceId + '/all' : '/workspace/DsUQAzkXhV7Ex0wbymoab/all');
}
let prefetchReady;
function prefetchAssets() {
  if (prefetchReady) return prefetchReady;
  const preload = (href, as) => new Promise(resolve => {
    const link = document.createElement('link');
    link.rel = 'preload'; link.as = as; link.href = new URL(href.replace(/^\\//, ''), assetBase);
    // A preload is an optimization only. If an edge refuses it, mount() will
    // still load the real stylesheet/script after installing the request bridge.
    link.onload = resolve; link.onerror = resolve; document.head.append(link);
  });
  prefetchReady = Promise.all([
    ...assets.styles.map(href => preload(href, 'style')),
    ...assets.scripts.map(src => preload(src, 'script')),
  ]).then(() => undefined);
  return prefetchReady;
}
export async function mount(target, host) {
  if (activeMount) throw new Error('SISO Knowledge module does not support overlapping mounts');
  activeMount = true;
  const options = host?.host ? host : { host };
  try {
    setInitialPath(options);
    // Install before evaluating donor scripts: AFFiNE captures fetch during
    // module initialization, before its React mount callback runs.
    installRequestBridge(options.host, options.backendBase);
    await loadAssets();
    if (!globalThis.SisoKnowledgeModule?.mount) throw new Error('SISO Knowledge compiled entry did not initialize');
    const donorUnmount = await globalThis.SisoKnowledgeModule.mount(target, options);
    let cleanupPromise;
    activeUnmount = () => cleanupPromise ??= Promise.resolve().then(() => donorUnmount?.()).then(() => {
        activeUnmount = undefined;
        activeMount = false;
      }).finally(() => {
        deactivateRequestBridge();
      });
    return activeUnmount;
  } catch (error) {
    activeUnmount = undefined;
    activeMount = false;
    deactivateRequestBridge();
    throw error;
  }
}
export async function preload(host) {
  if (host) {
    if (activeMount) throw new Error('SISO Knowledge module does not support preload during an active mount');
    const options = host.host ? host : { host };
    setInitialPath(options);
    installRequestBridge(options.host, options.backendBase);
    try { await loadAssets(); } catch (error) { deactivateRequestBridge(); throw error; }
    return;
  }
  await prefetchAssets();
}
export function unmount() {
  if (activeUnmount) return activeUnmount();
  if (!activeMount) deactivateRequestBridge();
}
export const entry = ${JSON.stringify(mainScript)};
`.trimStart());

const files = readdirSync(output, { recursive: true })
  .map(file => String(file).replaceAll('\\', '/'))
  .filter(file => statSync(resolve(output, file)).isFile())
  .filter(file => file !== 'package-manifest.json')
  .sort()
  .map(file => {
    const bytes = readFileSync(resolve(output, file));
    return { path: file, bytes: bytes.byteLength, sha256: createHash('sha256').update(bytes).digest('hex') };
  });

writeFileSync(resolve(output, 'package-manifest.json'), JSON.stringify({
  package: '@siso/knowledge-module',
  entry: 'siso-knowledge-module.js',
  html: 'index.html',
  compiled: true,
  compilerExecuted: !values['reuse-dist'],
  sourceBoundary: 'Rspack output only; no AFFiNE source files are shipped',
  assetBase: 'relative-to-entry-directory',
  assets: { scripts, styles },
  files,
  preload: { host: 'SisoKnowledgeHostContext', returns: 'Promise<void>' },
  mount: { target: 'HTMLElement', host: 'SisoKnowledgeHostContext', returns: '() => Promise<void>' },
}, null, 2));
console.log(JSON.stringify({ output, entry: resolve(output, 'siso-knowledge-module.js'), compilerExecuted: !values['reuse-dist'], assets: scripts.length + styles.length, files: files.length }));
