// uihub: siso:widgets
export const WIDGET_BANDS = ['glance', 'work', 'detail'] as const;
export type WidgetBand = typeof WIDGET_BANDS[number];
export const WIDGET_SIZE_SPANS = { S: 3, 'S-wide': 4, M: 6, L: 8, XL: 12, band: 12 } as const;
export type WidgetSize = keyof typeof WIDGET_SIZE_SPANS;
export type WidgetSpan = 3 | 4 | 5 | 6 | 7 | 8 | 12;
export type WidgetFill = 'fluid' | 'fixed' | 'atomic' | 'natural' | 'fit';
export interface WidgetPlacementDefinition {
  id: string;
  band: WidgetBand;
  span: WidgetSpan;
  minWidth?: number;
  sizes?: readonly WidgetSize[];
  defaultOn?: boolean;
  locked?: boolean;
}
export interface WidgetLayout {
  version: 1;
  order: string[];
  hidden: string[];
  sizes: Record<string, WidgetSize>;
}
export interface WidgetPlacement { id: string; band: WidgetBand; row: number; column: number; span: number }
const own = (value: object, key: string) => Object.prototype.hasOwnProperty.call(value, key);
export function defaultWidgetLayout(defs: readonly WidgetPlacementDefinition[]): WidgetLayout {
  validateWidgetDefinitions(defs);
  return { version: 1, order: defs.map(d => d.id), hidden: defs.filter(d => d.defaultOn === false && !d.locked).map(d => d.id), sizes: {} };
}
export function validateWidgetDefinitions(defs: readonly WidgetPlacementDefinition[]): void {
  const ids = new Set<string>();
  for (const d of defs) {
    if (!d.id || ids.has(d.id)) throw new Error(`Duplicate or empty widget id: ${d.id}`);
    ids.add(d.id);
    if (!WIDGET_BANDS.includes(d.band) || ![3,4,5,6,7,8,12].includes(d.span)) throw new Error(`Invalid placement: ${d.id}`);
    if (d.minWidth !== undefined && (!Number.isFinite(d.minWidth) || d.minWidth < 0)) throw new Error(`Invalid minimum width: ${d.id}`);
    if (d.sizes?.some(s => !own(WIDGET_SIZE_SPANS, s))) throw new Error(`Invalid sizes: ${d.id}`);
  }
}
/** Reject unknown ids and forbidden sizes; append newly registered widgets in registry order. */
export function validateWidgetLayout(value: unknown, defs: readonly WidgetPlacementDefinition[]): WidgetLayout {
  validateWidgetDefinitions(defs);
  if (!value || typeof value !== 'object') throw new Error('Layout must be an object');
  const v = value as Record<string, unknown>;
  if (v.version !== 1 || !Array.isArray(v.order) || !Array.isArray(v.hidden) || !v.sizes || typeof v.sizes !== 'object' || Array.isArray(v.sizes)) throw new Error('Invalid widget layout version or shape');
  const byId = new Map(defs.map(d => [d.id, d]));
  const list = (items: unknown[], label: string) => {
    if (items.some(id => typeof id !== 'string' || !byId.has(id)) || new Set(items).size !== items.length) throw new Error(`Invalid ${label} ids`);
    return items as string[];
  };
  const order = list(v.order, 'order');
  const hidden = list(v.hidden, 'hidden');
  if (hidden.some(id => byId.get(id)?.locked)) throw new Error('Locked widgets cannot be hidden');
  const sizes = Object.create(null) as Record<string, WidgetSize>;
  for (const [id, size] of Object.entries(v.sizes)) {
    const def = byId.get(id);
    if (!def || typeof size !== 'string' || !own(WIDGET_SIZE_SPANS, size) || !def.sizes?.includes(size as WidgetSize)) throw new Error(`Size not allowed: ${id}`);
    sizes[id] = size as WidgetSize;
  }
  return { version: 1, order: [...order, ...defs.filter(d => !order.includes(d.id)).map(d => d.id)], hidden: [...hidden], sizes };
}
/** Exact requested span unless readability needs more columns. Narrow containers stack. */
export function fitWidgetSpan(requested: number, minWidth: number, width: number, gap = 16): number {
  if (![requested, minWidth, width, gap].every(Number.isFinite) || requested < 1 || requested > 12 || minWidth < 0 || width < 0 || gap < 0) throw new Error('Invalid grid geometry');
  if (width <= 600) return 12;
  const column = (width - 11 * gap) / 12;
  if (column <= 0) return 12;
  return Math.min(12, Math.max(Math.ceil(requested), Math.ceil((minWidth + gap) / (column + gap))));
}
/** Stable packing without backfilling or stretching: visual order matches reading order. */
export function placeWidgets(defs: readonly WidgetPlacementDefinition[], layout: WidgetLayout, width: number, gap = 16): WidgetPlacement[] {
  const valid = validateWidgetLayout(layout, defs);
  const byId = new Map(defs.map(d => [d.id, d]));
  const result: WidgetPlacement[] = [];
  for (const band of WIDGET_BANDS) {
    let row = 1, column = 1;
    for (const id of valid.order) {
      const def = byId.get(id)!;
      if (def.band !== band || valid.hidden.includes(id)) continue;
      const span = fitWidgetSpan(valid.sizes[id] ? WIDGET_SIZE_SPANS[valid.sizes[id]] : def.span, def.minWidth ?? 300, width, gap);
      if (column + span > 13) { row++; column = 1; }
      result.push({ id, band, row, column, span });
      column += span;
    }
  }
  return result;
}
export function exportWidgetLayout(layout: WidgetLayout, defs: readonly WidgetPlacementDefinition[]): string {
  return JSON.stringify(validateWidgetLayout(layout, defs), null, 2);
}
export function importWidgetLayout(json: string, defs: readonly WidgetPlacementDefinition[]): WidgetLayout {
  if (json.length > 100000) throw new Error('Layout is too large');
  return validateWidgetLayout(JSON.parse(json), defs);
}
export function moveWidget(layout: WidgetLayout, id: string, index: number): WidgetLayout {
  if (!layout.order.includes(id) || !Number.isInteger(index) || index < 0 || index >= layout.order.length) throw new Error('Invalid move');
  const order = layout.order.filter(item => item !== id);
  order.splice(index, 0, id);
  return { ...layout, order };
}
