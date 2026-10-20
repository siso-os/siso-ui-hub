'use client';
// uihub: siso:blocks
import * as React from 'react';
import { SisoPopover } from './overlays';
export interface SisoEmptyStateProps { title: React.ReactNode; description?: React.ReactNode; icon?: React.ReactNode; action?: React.ReactNode; compact?: boolean }
export function SisoEmptyState({ title, description, icon, action, compact = false }: SisoEmptyStateProps) {
  return <div className={`siso-blocks siso-blocks-empty ${compact ? 'siso-blocks-empty-compact' : ''}`}><span aria-hidden="true">{icon}</span><strong>{title}</strong>{description && <p className="siso-blocks-muted">{description}</p>}{action}</div>;
}
export interface SisoTimelineItem { id: string; title: React.ReactNode; description?: React.ReactNode; time: string; dateTime?: string; icon?: React.ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' }
export function SisoTimeline({ items, label = 'Activity' }: { items: readonly SisoTimelineItem[]; label?: string }) {
  return <ol className="siso-blocks siso-blocks-timeline" aria-label={label}>{items.map(item => <li key={item.id} data-tone={item.tone ?? 'neutral'}><span className="siso-blocks-timeline-dot" aria-hidden="true">{item.icon ?? '•'}</span><div><strong>{item.title}</strong><time className="siso-blocks-muted" dateTime={item.dateTime}>{item.time}</time>{item.description && <div>{item.description}</div>}</div></li>)}</ol>;
}
export interface SisoNotification { id: string; title: string; description?: string; time: string; read?: boolean; tone?: 'info' | 'success' | 'warning' }
export interface SisoNotificationCenterProps {
  notifications: readonly SisoNotification[];
  onReadChange?: (id: string, read: boolean) => void;
  onDismiss?: (id: string) => void;
  onSelect?: (notification: SisoNotification) => void;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  emptyMessage?: string;
}
export function SisoNotificationCenter({ notifications, onReadChange, onDismiss, onSelect, title = 'Notifications', open, onOpenChange, emptyMessage = 'No notifications' }: SisoNotificationCenterProps) {
  const [unreadOnly, setUnreadOnly] = React.useState(false);
  const unread = notifications.filter(item => !item.read);
  const visible = unreadOnly ? unread : notifications;
  return <SisoPopover open={open} onOpenChange={onOpenChange} label={title} trigger={<button type="button" className="siso-blocks siso-blocks-button" aria-label={`${title}, ${unread.length} unread`}>{title}{unread.length > 0 && <span className="siso-blocks-badge">{unread.length}</span>}</button>}>
    <header className="siso-blocks-heading"><strong>{title}</strong>{onReadChange && <button type="button" className="siso-blocks-button" disabled={!unread.length} onClick={() => unread.forEach(item => onReadChange(item.id, true))}>Mark all read</button>}</header>
    <label className="siso-blocks-check"><input type="checkbox" checked={unreadOnly} onChange={e => setUnreadOnly(e.target.checked)} />Unread only</label>
    {!visible.length && <p className="siso-blocks-muted">{emptyMessage}</p>}
    <ul className="siso-blocks-notifications">{visible.map(item => <li key={item.id} data-unread={!item.read} data-tone={item.tone}>
      {onSelect ? <button type="button" className="siso-blocks-notification-content" onClick={() => onSelect(item)}><strong>{item.title}</strong>{item.description && <span>{item.description}</span>}<small>{item.time}</small></button> : <div className="siso-blocks-notification-content"><strong>{item.title}</strong>{item.description && <span>{item.description}</span>}<small>{item.time}</small></div>}
      <div className="siso-blocks-actions">{onReadChange && <button type="button" className="siso-blocks-button" onClick={() => onReadChange(item.id, !item.read)}>{item.read ? 'Mark unread' : 'Mark read'}</button>}{onDismiss && <button type="button" className="siso-blocks-button" aria-label={`Dismiss ${item.title}`} onClick={() => onDismiss(item.id)}>×</button>}</div>
    </li>)}</ul>
  </SisoPopover>;
}
export interface SisoToastItem { id: string; title: string; description?: string; tone?: 'info' | 'success' | 'warning' | 'danger'; action?: React.ReactNode; /** No automatic dismissal unless explicitly supplied. */ durationMs?: number }
export interface SisoToastStackProps { items: readonly SisoToastItem[]; onDismiss: (id: string) => void; label?: string; position?: 'inline' | 'bottom-right' | 'top-right' }
export function SisoToastStack({ items, onDismiss, label = 'Notifications', position = 'bottom-right' }: SisoToastStackProps) {
  return <section className={`siso-blocks siso-blocks-toast-stack siso-blocks-toast-${position}`} aria-label={label}>{items.map(item => <Toast key={item.id} item={item} onDismiss={onDismiss} />)}</section>;
}
function Toast({ item, onDismiss }: { item: SisoToastItem; onDismiss: (id: string) => void }) {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const paused = hovered || focused;
  const dismiss = React.useRef(onDismiss);
  dismiss.current = onDismiss;
  React.useEffect(() => {
    if (paused || !item.durationMs || item.durationMs <= 0) return;
    const timer = window.setTimeout(() => dismiss.current(item.id), item.durationMs);
    return () => window.clearTimeout(timer);
  }, [item.id, item.durationMs, paused]);
  return <div className="siso-blocks-toast" data-tone={item.tone ?? 'info'} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
    <div role={item.tone === 'danger' ? 'alert' : 'status'}><strong>{item.title}</strong>{item.description && <p>{item.description}</p>}</div>
    {item.action}<button type="button" className="siso-blocks-button" aria-label={`Dismiss ${item.title}`} onClick={() => onDismiss(item.id)}>×</button>
  </div>;
}
