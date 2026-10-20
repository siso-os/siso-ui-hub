/* Verifies licensed upstream fidelity in the source workspace, without building. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const pkg = path.resolve(__dirname,'..');
const repo = path.resolve(pkg,'../..');
const manifest = JSON.parse(fs.readFileSync(path.join(pkg,'source-provenance.json'),'utf8'));
const items = fs.readFileSync(path.join(repo,'sources/items.jsonl'),'utf8').trim().split('\n').map(JSON.parse);
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
for (const family of manifest.families) {
  assert.equal(items.find(item=>item.id===family.id)?.tier,'free',family.id);
  assert.ok(family.exports.length>0,family.id);
}
for (const [name,entry] of Object.entries(manifest.files)) {
  const original = fs.readFileSync(path.join(repo,entry.upstreamPath));
  const packaged = fs.readFileSync(path.join(pkg,'src/source',name));
  assert.equal(sha(original),entry.sha256,entry.upstreamPath);
  assert.equal(sha(packaged),entry.packagedSha256,name);
  const expected = /\.tsx?$/.test(name) ? Buffer.concat([original,Buffer.from('\n// uihub: siso:atoms\n')]) : original;
  assert.deepEqual(packaged,expected,name);
}
const demos=JSON.parse(fs.readFileSync(path.join(repo,'examples/package-suite/atom-demos/provenance.json'),'utf8'));
assert.equal(demos.length,manifest.familyCount);
for(const demo of demos) {
 const source=fs.readFileSync(path.join(repo,'examples/package-suite/atom-demos',demo.id+'.tsx'),'utf8');
 assert.ok(source.includes('@siso/atoms/source'),demo.id);
 assert.ok(!/from ["']\.\.\//.test(source),demo.id);
}
console.log(`PASS: ${manifest.familyCount} free families; ${Object.keys(manifest.files).length} source/CSS/helper hashes and byte fidelity; ${demos.length} installed-package demos.`);
