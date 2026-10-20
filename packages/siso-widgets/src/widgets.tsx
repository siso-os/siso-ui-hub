// uihub: siso:widgets
import * as React from 'react';
import { WIDGET_BANDS, WIDGET_SIZE_SPANS, defaultWidgetLayout, moveWidget, placeWidgets, validateWidgetLayout, type WidgetBand, type WidgetFill, type WidgetLayout, type WidgetPlacementDefinition, type WidgetSize } from './layout.js';
export type WidgetData<T = unknown> =
  | { state: 'ready'; data: T }
  | { state: 'stale'; data: T; age: string }
  | { state: 'loading' }
  | { state: 'empty'; reason: string }
  | { state: 'error'; message: string };
export interface WidgetRenderProps<T = unknown> { data: T; size?: WidgetSize; options?: Readonly<Record<string, unknown>> }
export interface WidgetRegistration<T = unknown> {
  render: React.ComponentType<WidgetRenderProps<T>>;
  detail?: React.ComponentType<WidgetRenderProps<T>>;
  label: string;
}
export type WidgetRegistry = Readonly<Record<string, WidgetRegistration>>;
export interface WidgetDefinition extends WidgetPlacementDefinition {
  type: string;
  title: string;
  description?: string;
  options?: Readonly<Record<string, unknown>>;
  fill?: WidgetFill;
  /** Retains declared height; long content scrolls within the body. */
  height?: number;
  footer?: React.ReactNode;
}
export interface WidgetFrameProps {
  id?: string;
  title: string;
  description?: string;
  state?: WidgetData;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  detail?: React.ReactNode;
  detailOpen?: boolean;
  onDetailOpenChange?: (open: boolean) => void;
  onRetry?: () => void;
  className?: string;
}
export function WidgetFrame({ id, title, description, state = {state:'ready', data:null}, actions, footer, children, detail, detailOpen, onDetailOpenChange, onRetry, className = '' }: WidgetFrameProps) {
  const labelId = React.useId();
  const detailId = React.useId();
  const [localOpen, setLocalOpen] = React.useState(false);
  const open = detailOpen ?? localOpen;
  const setOpen = (next: boolean) => { if (detailOpen === undefined) setLocalOpen(next); onDetailOpenChange?.(next); };
  return <section id={id} className={`siso-widget-frame ${className}`} aria-labelledby={labelId} data-state={state.state} data-widget-shell="">
    <header className="siso-widget-head"><div><h3 id={labelId}>{title}</h3>{description && <p>{description}</p>}</div><div className="siso-widget-actions">
      {state.state !== 'ready' && <span className="siso-widget-status" role="status">{state.state === 'stale' ? `Stale · ${state.age}` : state.state}</span>}{actions}
      {detail != null && <button type="button" aria-expanded={open} aria-controls={detailId} onClick={() => setOpen(!open)}>{open ? 'Close detail' : 'Details'}</button>}
    </div></header>
    <div className="siso-widget-body" aria-busy={state.state === 'loading'}>
      {state.state === 'loading' ? <div className="siso-widget-skeleton" role="status" aria-label={`Loading ${title}`}><span/><span/><span/></div>
      : state.state === 'empty' ? <p className="siso-widget-message">{state.reason}</p>
      : state.state === 'error' ? <div role="alert" className="siso-widget-message">{state.message} {onRetry && <button type="button" onClick={onRetry}>Retry</button>}</div>
      : children}
    </div>
    {footer != null && <footer className="siso-widget-footer">{footer}</footer>}
    {detail != null && <div id={detailId} className="siso-widget-detail" hidden={!open}>{open ? detail : null}</div>}
  </section>;
}
class WidgetBoundary extends React.Component<{ children: React.ReactNode; onRetry?: () => void; resetKey: unknown }, {failed:boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed:true }; }
  componentDidUpdate(previous: Readonly<{resetKey: unknown}>) { if (this.state.failed && previous.resetKey !== this.props.resetKey) this.setState({failed:false}); }
  render() { return this.state.failed ? <div role="alert" className="siso-widget-message">This widget could not render. <button type="button" onClick={() => { this.setState({failed:false}); this.props.onRetry?.(); }}>Retry</button></div> : this.props.children; }
}
export interface WidgetBandProps { kind: WidgetBand; children: React.ReactNode; label?: string; className?: string }
export function SisoWidgetBand({kind, label, children, className = ''}: WidgetBandProps) {
  return <section className={`siso-widget-band ${className}`} data-band={kind} aria-label={label ?? `${kind[0].toUpperCase()}${kind.slice(1)} widgets`}><div className="siso-widget-grid">{children}</div></section>;
}
export interface SisoWidgetBoardProps {
  widgets: readonly WidgetDefinition[];
  registry: WidgetRegistry;
  data: Readonly<Record<string, WidgetData | undefined>>;
  layout?: WidgetLayout;
  onLayoutChange?: (layout: WidgetLayout) => void;
  onRetry?: (id: string) => void;
  /** Controlled detail id lets the host bind ?widget= to its own router. */
  detailId?: string | null;
  onDetailChange?: (id: string | null) => void;
  unavailable?: Readonly<Record<string, string | undefined>>;
  bandLabels?: Partial<Record<WidgetBand, string>>;
  className?: string;
}
export function SisoWidgetBoard({ widgets, registry, data, layout, onLayoutChange, onRetry, detailId, onDetailChange, unavailable = {}, bandLabels, className = '' }: SisoWidgetBoardProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const [localDetail, setLocalDetail] = React.useState<string | null>(null);
  const activeDetail = detailId === undefined ? localDetail : detailId;
  const changeDetail = (id: string | null) => { if (detailId === undefined) setLocalDetail(id); onDetailChange?.(id); };
  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const read = () => setWidth(el.getBoundingClientRect().width);
    read();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const current = layout ? validateWidgetLayout(layout, widgets) : defaultWidgetLayout(widgets);
  const placements = placeWidgets(widgets, current, width);
  const edit = (next: WidgetLayout) => onLayoutChange?.(validateWidgetLayout(next, widgets));
  return <div ref={root} className={`siso-widget-board ${className}`}>
    {WIDGET_BANDS.map(band => {
      const cells = placements.filter(p => p.band === band);
      return cells.length ? <SisoWidgetBand key={band} kind={band} label={bandLabels?.[band]}>{cells.map(p => {
        const def = widgets.find(w => w.id === p.id)!;
        const registration = Object.prototype.hasOwnProperty.call(registry, def.type) ? registry[def.type] : undefined;
        const reason = unavailable[def.id];
        const state: WidgetData = reason ? {state:'empty', reason} : !registration ? {state:'error',message:`Unknown widget type: ${def.type}`} : data[def.id] ?? {state:'empty',reason:'No data supplied'};
        const usable = state.state === 'ready' || state.state === 'stale';
        const Render = registration?.render;
        const Detail = registration?.detail;
        const renderProps = { data: usable ? state.data : undefined, size: current.sizes[def.id], options: def.options };
        const index = current.order.indexOf(def.id);
        return <div key={def.id} className="siso-widget-cell" data-widget={def.id} data-fill={def.fill ?? 'fluid'} style={{gridColumn:`${p.column} / span ${p.span}`,gridRow:p.row, ...(def.height !== undefined ? {height:def.height} : {})}}>
          <WidgetBoundary resetKey={data[def.id]} onRetry={() => onRetry?.(def.id)}><WidgetFrame title={def.title} description={def.description} state={state} footer={def.footer}
            onRetry={onRetry ? () => onRetry(def.id) : undefined}
            detail={Detail && usable ? <Detail {...renderProps}/> : undefined} detailOpen={activeDetail === def.id} onDetailOpenChange={open => changeDetail(open ? def.id : null)}
            actions={onLayoutChange && <details className="siso-widget-menu"><summary aria-label={`Configure ${def.title}`}>⋯</summary><div>
              {!!def.sizes?.length && <label>Size <select aria-label={`Size of ${def.title}`} value={current.sizes[def.id] ?? ''} onChange={e => { const sizes = {...current.sizes}; if (e.target.value) sizes[def.id] = e.target.value as WidgetSize; else delete sizes[def.id]; edit({...current,sizes}); }}><option value="">Default ({def.span}/12)</option>{def.sizes.map(s => <option key={s} value={s}>{s} ({WIDGET_SIZE_SPANS[s]}/12)</option>)}</select></label>}
              <button type="button" disabled={index === 0} onClick={() => edit(moveWidget(current,def.id,index-1))}>Move earlier</button><button type="button" disabled={index === current.order.length-1} onClick={() => edit(moveWidget(current,def.id,index+1))}>Move later</button>
              {!def.locked && <button type="button" onClick={() => edit({...current,hidden:[...current.hidden,def.id]})}>Hide</button>}
            </div></details>}>{Render && usable ? <Render {...renderProps}/> : null}</WidgetFrame></WidgetBoundary>
        </div>;
      })}</SisoWidgetBand> : null;
    })}
    {onLayoutChange && current.hidden.length > 0 && <details className="siso-widget-gallery"><summary>Add widgets</summary>{widgets.filter(w => current.hidden.includes(w.id)).map(w => <button type="button" key={w.id} disabled={!!unavailable[w.id] || !Object.prototype.hasOwnProperty.call(registry,w.type)} onClick={() => edit({...current,hidden:current.hidden.filter(id=>id!==w.id)})}>{w.title}{unavailable[w.id] ? ` — ${unavailable[w.id]}` : !Object.prototype.hasOwnProperty.call(registry,w.type) ? ' — Requested; renderer not registered' : ''}</button>)}</details>}
  </div>;
}
