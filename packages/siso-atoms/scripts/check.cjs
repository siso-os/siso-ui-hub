/* Package contract probe: run with React, radix-ui and TypeScript available. */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup: render} = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'siso-atoms-contract-'));
try {
  for (const file of fs.readdirSync(path.join(root, 'src')).filter(f => /\.tsx?$/.test(f) && !f.endsWith('.d.ts'))) {
    const source = fs.readFileSync(path.join(root, 'src', file), 'utf8').replace('export * as sourceAtoms from "./source/index";', '');
    const result = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}});
    fs.writeFileSync(path.join(output, file.replace(/\.tsx?$/, '.js')), result.outputText);
  }
  const atoms = require(path.join(output, 'index.js'));
  const inventory = JSON.parse(fs.readFileSync(path.join(root, 'inventory.json'), 'utf8'));
  const expected = inventory.exports.flatMap(f => f.exports).sort();
  assert.deepEqual(Object.keys(atoms).sort(), expected, 'export inventory matches source');
  const h = React.createElement;
  const button = render(h(atoms.Button, {loading:true}, 'Save'));
  assert.match(button, /disabled=""/); assert.match(button, /aria-busy="true"/); assert.match(button, /type="button"/);
  const field = render(h(atoms.Field, {id:'email',label:'Email',hint:'Work address',error:'Required'}, attrs => h(atoms.Input, attrs)));
  assert.match(field, /for="email"/); assert.match(field, /aria-describedby="email-hint email-error"/); assert.match(field, /aria-invalid="true"/);
  assert.match(render(h(atoms.Switch, {'aria-label':'Enabled',checked:true,readOnly:true})), /role="switch"/);
  assert.match(render(h(atoms.Progress, {value:150,max:100})), /value="100"/);
  assert.doesNotMatch(render(h(atoms.Progress)), /value=/);
  assert.match(render(h(atoms.Avatar,{alt:'Sample Person'})), /aria-label="Sample Person"/);
  assert.match(render(h(atoms.RadioGroup,{label:'Mode',value:'a',onValueChange:()=>{},options:[{value:'a',label:'Alpha'},{value:'b',label:'Beta',disabled:true}]})), /<legend>Mode<\/legend>/);
  const tabs=render(h(atoms.Tabs,{defaultValue:'a'},h(atoms.TabsList,{'aria-label':'Sections'},h(atoms.TabsTrigger,{value:'a'},'Alpha')),h(atoms.TabsContent,{value:'a'},'Content')));
  assert.match(tabs,/role="tablist"/); assert.match(tabs,/aria-selected="true"/); assert.match(tabs,/role="tabpanel"/);
  assert.match(render(h(atoms.MultiSelect,{options:[{value:'a',label:'Alpha'}],value:['a'],onChange:()=>{}})),/multiple=""/);
  console.log(`PASS: ${expected.length} exports match inventory; 16 SSR semantic and state assertions passed.`);
} finally {
  for (const file of fs.readdirSync(output)) fs.unlinkSync(path.join(output,file));
  fs.rmdirSync(output);
}
