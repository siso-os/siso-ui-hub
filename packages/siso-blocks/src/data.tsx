'use client';
// uihub: siso:blocks
import * as React from 'react';
export type SisoSort = { key: string; direction: 'asc' | 'desc' };
export interface SisoTableColumn<T> {
  key: string;
  label: React.ReactNode;
  value: (row: T) => string | number | Date | null | undefined;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  numeric?: boolean;
}
export interface SisoDataTableProps<T> {
  rows: readonly T[];
  columns: readonly SisoTableColumn<T>[];
  rowKey: (row: T) => string;
  caption: string;
  sort?: SisoSort | null;
  onSortChange?: (sort: SisoSort) => void;
  /** Server data is already sorted; emit changes without rearranging it. */
  manualSort?: boolean;
  selectedKeys?: readonly string[];
  onSelectionChange?: (keys: string[]) => void;
  emptyMessage?: string;
  loading?: boolean;
}
export function sisoSortRows<T>(rows: readonly T[], columns: readonly SisoTableColumn<T>[], sort?: SisoSort | null): T[] {
  const column = columns.find(column => column.key === sort?.key);
  if (!sort || !column) return [...rows];
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  return [...rows].sort((a, b) => {
    const av = column.value(a), bv = column.value(b);
    // Missing values stay last in both directions.
    if (av == null) return bv == null ? 0 : 1;
    if (bv == null) return -1;
    const x = av instanceof Date ? av.getTime() : av;
    const y = bv instanceof Date ? bv.getTime() : bv;
    const result = typeof x === 'number' && typeof y === 'number' ? x - y : collator.compare(String(x), String(y));
    return sort.direction === 'asc' ? result : -result;
  });
}
export function SisoDataTable<T>({ rows, columns, rowKey, caption, sort, onSortChange, manualSort = false, selectedKeys = [], onSelectionChange, emptyMessage = 'No results', loading = false }: SisoDataTableProps<T>) {
  const [localSort, setLocalSort] = React.useState<SisoSort | null>(null);
  const activeSort = sort === undefined ? localSort : sort;
  const ordered = React.useMemo(() => manualSort ? [...rows] : sisoSortRows(rows, columns, activeSort), [rows, columns, activeSort, manualSort]);
  const keys = rows.map(rowKey);
  const all = keys.length > 0 && keys.every(key => selectedKeys.includes(key));
  const some = !all && keys.some(key => selectedKeys.includes(key));
  const selectAll = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (selectAll.current) selectAll.current.indeterminate = some; }, [some]);
  return <div className="siso-blocks siso-blocks-table-scroll" tabIndex={0} role="region" aria-label={caption}>
    <table className="siso-blocks-table" aria-busy={loading}><caption>{caption}</caption><thead><tr>
      {onSelectionChange && <th scope="col"><input ref={selectAll} type="checkbox" aria-label="Select all visible rows" checked={all} disabled={!keys.length} onChange={() => onSelectionChange(all ? selectedKeys.filter(key => !keys.includes(key)) : [...new Set([...selectedKeys, ...keys])])} /></th>}
      {columns.map(column => <th key={column.key} scope="col" data-numeric={column.numeric} aria-sort={activeSort?.key === column.key ? activeSort.direction === 'asc' ? 'ascending' : 'descending' : undefined}>
        {column.sortable ? <button type="button" className="siso-blocks-sort" onClick={() => { const next: SisoSort = { key: column.key, direction: activeSort?.key === column.key && activeSort.direction === 'asc' ? 'desc' : 'asc' }; if (sort === undefined) setLocalSort(next); onSortChange?.(next); }}>{column.label}<span aria-hidden="true">{activeSort?.key === column.key ? activeSort.direction === 'asc' ? ' ↑' : ' ↓' : ' ↕'}</span></button> : column.label}
      </th>)}
    </tr></thead><tbody>{ordered.map(row => { const key = rowKey(row); return <tr key={key} data-selected={selectedKeys.includes(key)}>
      {onSelectionChange && <td><input type="checkbox" aria-label={`Select row ${key}`} checked={selectedKeys.includes(key)} onChange={() => onSelectionChange(selectedKeys.includes(key) ? selectedKeys.filter(id => id !== key) : [...selectedKeys, key])} /></td>}
      {columns.map(column => <td key={column.key} data-numeric={column.numeric}>{column.render ? column.render(row) : String(column.value(row) ?? '')}</td>)}
    </tr>; })}{!ordered.length && <tr><td colSpan={columns.length + (onSelectionChange ? 1 : 0)}>{loading ? 'Loading…' : emptyMessage}</td></tr>}</tbody></table>
  </div>;
}
export interface SisoFilterField { id: string; label: string; options: readonly { value: string; label: string }[]; allLabel?: string }
export interface SisoFilterToolbarProps {
  query: string; onQueryChange: (query: string) => void;
  filters?: readonly SisoFilterField[]; values?: Readonly<Record<string, string>>;
  onFilterChange?: (id: string, value: string) => void;
  onReset?: () => void; actions?: React.ReactNode; searchLabel?: string;
}
export function SisoFilterToolbar({ query, onQueryChange, filters = [], values = {}, onFilterChange, onReset, actions, searchLabel = 'Search' }: SisoFilterToolbarProps) {
  return <div className="siso-blocks siso-blocks-toolbar" role="search" aria-label="Filter results"><label className="siso-blocks-field"><span>{searchLabel}</span><input type="search" className="siso-blocks-input" value={query} onChange={e => onQueryChange(e.target.value)} /></label>
    {filters.map(filter => <label className="siso-blocks-field" key={filter.id}><span>{filter.label}</span><select className="siso-blocks-input" value={values[filter.id] ?? ''} disabled={!onFilterChange} onChange={e => onFilterChange?.(filter.id, e.target.value)}><option value="">{filter.allLabel ?? 'All'}</option>{filter.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>)}
    {onReset && <button type="button" className="siso-blocks-button" onClick={onReset}>Reset</button>}{actions}
  </div>;
}
export interface SisoPaginationProps { page: number; pageCount: number; onPageChange: (page: number) => void; label?: string }
export function SisoPagination({ page, pageCount, onPageChange, label = 'Pagination' }: SisoPaginationProps) {
  const count = Math.max(1, Math.floor(Number.isFinite(pageCount) ? pageCount : 1));
  const current = Math.min(count, Math.max(1, Math.floor(Number.isFinite(page) ? page : 1)));
  const pages = [...new Set([1, current - 1, current, current + 1, count].filter(value => value >= 1 && value <= count))].sort((a, b) => a - b);
  return <nav className="siso-blocks siso-blocks-pagination" aria-label={label}><button type="button" className="siso-blocks-button" disabled={current === 1} onClick={() => onPageChange(current - 1)}>Previous</button>
    {pages.map((value, index) => <React.Fragment key={value}>{index > 0 && value - pages[index - 1]! > 1 && <span aria-hidden="true">…</span>}<button type="button" className="siso-blocks-button" aria-label={`Page ${value}`} aria-current={value === current ? 'page' : undefined} onClick={() => onPageChange(value)}>{value}</button></React.Fragment>)}
    <button type="button" className="siso-blocks-button" disabled={current === count} onClick={() => onPageChange(current + 1)}>Next</button></nav>;
}
