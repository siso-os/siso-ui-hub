// uihub: siso:knowledge
// What the library knows about each node (bin/hubindex.py writes data/knowledge.json in both builds): the variations SISO
// needs (catalogue/schema/variations.json), first-principles notes (node-notes.json), which looks and motion rate best there
// (siso-design-system research/corpus-nodes.json, a model's ratings) and the white papers (papers.json). Loaded once.
import { useEffect, useState } from "react"
import { dataUrl } from "@/lib/data"

export interface Variation { id: string; name: string; kind?: string; why?: string; match?: string[] }
export interface Note { good: { line: string; refs: string[] }[]; avoid?: string }
export interface Taste { n: number; mean: number; looks: { style: string; mean: number; n: number }[]; motion: { style: string; mean: number; n: number }[] }
export interface Paper { id: string; title: string; status: string; abstract: string; rules?: string[]; consensus?: string[] }
export interface Papers {
  intro?: string
  papers: Paper[]
  findings: { title: string; finding: string; consensus?: string; rules?: string[] }[]
  families: { id: string; name: string; about: string; sources: { title: string; org?: string; year?: number; url: string; why?: string }[] }[]
}
export interface Knowledge {
  variations?: Record<string, { variations: Variation[] }>
  notes?: Record<string, Note>
  taste?: { about?: string; nodes: Record<string, Taste> }
  papers?: Papers
  /** the products SISO builds, each with the slots it needs (catalogue/schema/use-cases.json) */
  use_cases?: { use_cases: UseCase[] }
  /** each library part read for the job it does (catalogue/schema/lib-map/<lib>.jsonl): id -> [node, variation, job, same_as] */
  libmap?: Record<string, [string | null, string | null, string, string | null]>
}
export interface UseCase { id: string; name: string; about?: string; needs: { slot: string; variations: string[]; must?: boolean; why?: string }[] }

let p: Promise<Knowledge> | null = null
let v: Knowledge | null = null
export function useKnowledge(): Knowledge | null {
  const [k, setK] = useState<Knowledge | null>(v)
  useEffect(() => {
    p ??= dataUrl("/data/knowledge.json")
      .then((u) => fetch(u))
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
      .then((x: Knowledge) => (v = x))
    if (!k) p.then(setK)
  }, [k])
  return k
}

/** a variation's parts on a node: the ones whose type or name carries its words */
export const matchRows = <R extends { pat?: string; t: string }>(rows: R[], v: Variation) => {
  const words = (v.match || []).map((w) => w.toLowerCase()).filter(Boolean)
  return words.length ? rows.filter((r) => words.some((w) => `${r.pat || ""} ${r.t}`.toLowerCase().includes(w))) : []
}

// the rules that govern a node (UI-PRINCIPLES' siso-design-system principles/, exported as data/rules.json): the 15 house
// rules and the research rules, each with its sources (12 Oct: "roll that in and see how it's useful")
export type Rule = { id: string; title: string; rule: string; strength?: string; set?: string; check?: string; src: [string, string][]; nodes: string[]; scales: string[] }
let rulesP: Promise<Rule[]> | null = null
export function useRules(): Rule[] | null {
  const [r, setR] = useState<Rule[] | null>(null)
  useEffect(() => {
    rulesP ??= dataUrl("/data/rules.json")
      .then((u) => fetch(u))
      .then((x) => (x.ok ? x.json() : { rules: [] }))
      .then((d) => d.rules as Rule[])
      .catch(() => [])
    rulesP.then(setR)
  }, [])
  return r
}
