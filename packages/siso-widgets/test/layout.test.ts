import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultWidgetLayout, fitWidgetSpan, placeWidgets, validateWidgetLayout, exportWidgetLayout, importWidgetLayout, moveWidget, type WidgetPlacementDefinition} from '../src/layout.ts';
const defs: WidgetPlacementDefinition[] = [
  {id:'a',band:'glance',span:3,minWidth:200,sizes:['S','M'],locked:true},
  {id:'b',band:'glance',span:6,minWidth:300},
  {id:'c',band:'glance',span:6,minWidth:300},
  {id:'work',band:'work',span:12},
];
test('requested widths keep gaps and wrap without reordering',()=>{
  const p=placeWidgets(defs,defaultWidgetLayout(defs),1200);
  assert.deepEqual(p.map(({id,row,column,span})=>[id,row,column,span]),[['a',1,1,3],['b',1,4,6],['c',2,1,6],['work',1,1,12]]);
});
test('minimum width widens cells; narrow panel stacks; geometry rejects invalid numbers',()=>{
  assert.equal(fitWidgetSpan(3,520,1000),7);
  assert.equal(fitWidgetSpan(3,200,360),12);
  assert.equal(fitWidgetSpan(12,10000,1200),12);
  assert.throws(()=>fitWidgetSpan(3,100,NaN));
  const p=placeWidgets(defs,defaultWidgetLayout(defs),390);
  assert.ok(p.every(v=>v.span===12&&v.column===1));
});
test('layout rejects unknown ids, duplicates, forbidden sizes and hiding locked work',()=>{
  const l=defaultWidgetLayout(defs);
  assert.throws(()=>validateWidgetLayout({...l,order:['unknown']},defs));
  assert.throws(()=>validateWidgetLayout({...l,order:['a','a']},defs));
  assert.throws(()=>validateWidgetLayout({...l,hidden:['a']},defs));
  assert.throws(()=>validateWidgetLayout({...l,sizes:{b:'XL'}},defs));
  assert.throws(()=>validateWidgetLayout({...l,sizes:{a:'toString'}},defs));
  assert.throws(()=>validateWidgetLayout({...l,version:2},defs));
});
test('portable layout roundtrips without business data and new ids append',()=>{
  const l={...defaultWidgetLayout(defs),order:['b','a'],hidden:['c'],sizes:{a:'M' as const}};
  const restored=importWidgetLayout(exportWidgetLayout(l,defs),defs);
  assert.deepEqual(restored.order,['b','a','c','work']);
  assert.equal(restored.sizes.a,'M');
  assert.equal(placeWidgets(defs,restored,1200)[0].id,'b');
  assert.throws(()=>importWidgetLayout('null',defs));
  assert.throws(()=>importWidgetLayout(' '.repeat(100001),defs));
});
test('reorder is immutable and band ordering remains invariant',()=>{
  const l=defaultWidgetLayout(defs), moved=moveWidget(l,'work',0);
  assert.equal(l.order[0],'a');
  assert.equal(moved.order[0],'work');
  assert.equal(placeWidgets(defs,moved,1200).at(-1)?.band,'work');
  assert.throws(()=>moveWidget(l,'a',-1));
});
test('definition errors fail before rendering',()=>{
  assert.throws(()=>defaultWidgetLayout([...defs,defs[0]]));
  assert.throws(()=>defaultWidgetLayout([{...defs[0],minWidth:-1}]));
});
