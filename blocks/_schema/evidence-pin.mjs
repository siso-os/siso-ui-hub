#!/usr/bin/env node
//
// Evidence pin resolution — pin the ROW, not the file.
//
// The defect this replaces: an evidence pin holding a SHA-256 of an entire
// append-only ledger. `source-registry.jsonl` grew 191 -> 3,010 rows, so the
// digest moved, and every block citing the file went red for a row that was
// appended 3,000 lines away from the evidence it actually cares about.
//
// `block-hub/block-register.json` maps 80 blocks against that registry. Whole-file
// pinning turns one intake run into 80 simultaneous red blocks - GQ-006 falsifier 2
// at scale ("a gate that cries wolf is worse than no gate"). It also contradicts
// GQ-006 criterion 3, which asks evidence to attach by reference into a source
// rather than by whole-corpus digest.
//
// WHEN TO USE WHICH SHAPE
//
//   whole-file pin   - CORRECT for artifacts that do not grow: a schema, a
//                      manifest, a receipt, a pinned donor revision archive.
//                      Keep using it there. It is the stronger check.
//   row-selector pin - REQUIRED for append-only ledgers (.jsonl registries,
//                      inventories, event logs). Survives growth, still detects
//                      tampering with the row that matters.
//
// The distinction is "does this artifact grow?", not "is it big?" or "is it JSON?".
//
// FOUR STATES, ALL DISTINCT. R8: an input the resolver cannot classify is never a
// pass, and "the evidence is gone" is a different fact from "the evidence changed":
//
//   ok            selector matched exactly one row and its digest matches
//   digest_drift  matched one row, digest differs      -> the row was TAMPERED with
//   missing_row   selector matched zero rows           -> the evidence is GONE
//   ambiguous     selector matched more than one row   -> ambiguity is not a pass

import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

export const PIN_OK = 'ok';
export const PIN_DIGEST_DRIFT = 'digest_drift';
export const PIN_MISSING_ROW = 'missing_row';
export const PIN_AMBIGUOUS = 'ambiguous';
export const PIN_UNREADABLE = 'unreadable';
export const PIN_BAD_SELECTOR = 'bad_selector';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

/**
 * Resolve a row-selector evidence pin.
 *
 * @param {string} absPath  the ledger file
 * @param {{kind:string,key:string,value:string}} selector
 * @param {{row_sha256?:string,row_bytes?:number}} expected
 * @returns {{state:string, message:string, observed?:object}}
 */
export function resolveRowPin(absPath, selector, expected = {}) {
  if (!selector || typeof selector !== 'object') {
    return { state: PIN_BAD_SELECTOR, message: 'selector is missing or not an object' };
  }
  const { kind, key, value } = selector;
  if (kind !== 'jsonl_row') {
    // Not a silent skip: an unrecognised selector kind is a violation, because a
    // resolver that shrugs at input it does not understand reports success.
    return { state: PIN_BAD_SELECTOR, message: `unsupported selector kind ${JSON.stringify(kind)} (expected "jsonl_row")` };
  }
  if (typeof key !== 'string' || !key || typeof value !== 'string' || !value) {
    return { state: PIN_BAD_SELECTOR, message: 'selector.key and selector.value must be non-empty strings' };
  }
  if (!existsSync(absPath)) {
    return { state: PIN_UNREADABLE, message: `ledger does not resolve: ${absPath}` };
  }

  let text;
  try { text = readFileSync(absPath, 'utf8'); }
  catch (e) { return { state: PIN_UNREADABLE, message: `cannot read ledger: ${e.message}` }; }

  // Collect EVERY match rather than stopping at the first. Stopping early would
  // hide the ambiguous case, turning a violation into a pass.
  const matches = [];
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) continue;
    let row;
    try { row = JSON.parse(trimmed); }
    catch {
      // A malformed line is not evidence and must not silently vanish, but it is
      // only reportable if it could plausibly be the row we want.
      if (trimmed.includes(`"${value}"`)) {
        return { state: PIN_UNREADABLE, message: `line ${i + 1} contains ${value} but is not valid JSON` };
      }
      continue;
    }
    if (row && row[key] === value) matches.push({ line: i + 1, text: trimmed });
  }

  if (matches.length === 0) {
    return {
      state: PIN_MISSING_ROW,
      message: `no row where ${key}=${JSON.stringify(value)} - the evidence is GONE, not merely changed`,
    };
  }
  if (matches.length > 1) {
    return {
      state: PIN_AMBIGUOUS,
      message: `${matches.length} rows match ${key}=${JSON.stringify(value)} (lines ${matches.map((m) => m.line).join(', ')}) - ambiguous evidence is not a pass`,
    };
  }

  const only = matches[0];
  const bytes = Buffer.byteLength(only.text, 'utf8');
  const digest = sha256(Buffer.from(only.text, 'utf8'));
  const observed = { row_sha256: digest, row_bytes: bytes, line: only.line };

  if (expected.row_sha256 && expected.row_sha256 !== digest) {
    return {
      state: PIN_DIGEST_DRIFT,
      message: `row ${key}=${value} CHANGED: pinned ${expected.row_sha256.slice(0, 16)}… but found ${digest.slice(0, 16)}…`,
      observed,
    };
  }
  if (expected.row_bytes !== undefined && expected.row_bytes !== bytes) {
    return {
      state: PIN_DIGEST_DRIFT,
      message: `row ${key}=${value} byte length changed: pinned ${expected.row_bytes}, found ${bytes}`,
      observed,
    };
  }
  return { state: PIN_OK, message: `row ${key}=${value} matches its pin`, observed };
}

/**
 * Resolve one evidence source, dispatching on its pin shape.
 * A source carrying a `selector` is a row pin; one carrying only `sha256` is a
 * whole-file pin. A source carrying NEITHER is a violation, not a skip.
 */
export function resolveEvidenceSource(absPath, source) {
  if (source.selector) {
    return resolveRowPin(absPath, source.selector, {
      row_sha256: source.row_sha256,
      row_bytes: source.row_bytes,
    });
  }
  if (typeof source.sha256 === 'string') {
    if (!existsSync(absPath)) return { state: PIN_UNREADABLE, message: `file does not resolve: ${absPath}` };
    const actual = sha256(readFileSync(absPath));
    return actual === source.sha256
      ? { state: PIN_OK, message: 'whole-file digest matches', observed: { sha256: actual } }
      : {
          state: PIN_DIGEST_DRIFT,
          message: `whole-file digest changed: pinned ${source.sha256.slice(0, 16)}… but found ${actual.slice(0, 16)}…`,
          observed: { sha256: actual },
        };
  }
  return {
    state: PIN_BAD_SELECTOR,
    message: 'evidence source carries neither a selector nor a sha256 - it pins nothing',
  };
}
