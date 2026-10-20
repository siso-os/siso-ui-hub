import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';

const read = name => readFileSync(new URL(name, import.meta.url), 'utf8');
const receipt = JSON.parse(read('source-receipt.json'));
for (const file of receipt.files) {
  const bytes = readFileSync(new URL(file.destination.split('/').at(-1), import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), file.destination_sha256);
  if (!file.adaptations.length) {
    assert.equal(createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex'), file.blob);
  }
}
assert.match(read('AgentFace.tsx'), /\.FaceMochi/);
assert.doesNotMatch(read('AgentFace.tsx'), /AgentSoul/);

// Minimal DOM doubles exercise API/lifecycle, not SVG parsing or visual rendering.
class Element {
  dataset = {}; attributes = {}; children = []; listeners = new Map(); selectors = new Map();
  style = {setProperty(name, value) { this[name] = value; }};
  append(child) { this.children.push(child); child.parent = this; }
  remove() { this.parent.children = this.parent.children.filter(child => child !== this); }
  setAttribute(name, value) { this.attributes[name] = value; }
  querySelector(name) {
    if (!this.selectors.has(name)) this.selectors.set(name, new Element());
    return this.selectors.get(name);
  }
  querySelectorAll(name) { return [this.querySelector(name + ':1'), this.querySelector(name + ':2')]; }
  addEventListener(name, fn) { this.listeners.set(name, fn); }
  removeEventListener(name) { this.listeners.delete(name); }
}
let next = 0, disconnected = 0;
const frames = new Map();
const media = {matches: false, addEventListener() {}};
const window = {matchMedia: () => media};
vm.runInNewContext(read('engine.js'), {
  window, document: {createElement: () => new Element()}, performance: {now: () => 100},
  requestAnimationFrame: fn => { frames.set(++next, fn); return next; },
  cancelAnimationFrame: id => frames.delete(id),
  IntersectionObserver: class { observe() {} disconnect() { disconnected++; } },
});
const api = window.FaceMochi;
assert.deepEqual(Array.from(api.statuses), ['working','waiting','needs-shaan','blocked','done','offline']);
for (const size of [24, 32, 48]) {
  const host = new Element();
  const face = api.mount(host, {name:'Synthetic fixture', project:'Fixture', size, interactive:true, track:true});
  assert.equal(face.el.style.width, `${size}px`);
  for (const status of api.statuses) {
    face.status(status);
    assert.equal(face.el.dataset.status, status);
    assert.match(face.el.attributes['aria-label'], new RegExp(status.replaceAll('-', ' ')));
  }
  face.status('invalid'); assert.equal(face.el.dataset.status, 'waiting');
  face.project('Fixture'); assert.equal(face.el.dataset.hue, api.projectHue('Fixture'));
  api.setReducedMotion(true); assert.equal(frames.size, 0);
  face.gesture('boop'); assert.equal(frames.size, 0);
  face.destroy(); assert.equal(host.children.length, 0); assert.equal(face.el.listeners.size, 0);
  assert.equal(api.diagnostics().instances, 0);
  api.setReducedMotion(false);
}
assert.equal(disconnected, 3);
assert.equal(frames.size, 0);
console.log('PASS: 5 source mappings; six statuses, 24/32/48 metadata, hue, reduced motion and teardown (synthetic DOM only)');
