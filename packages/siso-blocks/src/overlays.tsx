'use client';
// uihub: siso:blocks
import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import * as HoverCard from '@radix-ui/react-hover-card';

export interface SisoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  trigger?: React.ReactElement;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeLabel?: string;
  className?: string;
  onOpenAutoFocus?: React.ComponentProps<typeof Dialog.Content>['onOpenAutoFocus'];
  onCloseAutoFocus?: React.ComponentProps<typeof Dialog.Content>['onCloseAutoFocus'];
}
/** Controlled dialog; Radix owns focus trapping, Escape and trigger focus restoration. */
export function SisoDialog(props: SisoDialogProps) { return <DialogFrame {...props} />; }
export interface SisoDrawerProps extends SisoDialogProps { side?: 'left' | 'right' | 'bottom' }
export function SisoDrawer({ side = 'right', ...props }: SisoDrawerProps) { return <DialogFrame {...props} side={side} />; }
function DialogFrame({ open, onOpenChange, title, description, trigger, children, footer, closeLabel = 'Close', className = '', side, onOpenAutoFocus, onCloseAutoFocus }: SisoDrawerProps) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
    <Dialog.Portal><Dialog.Overlay className="siso-blocks-overlay" /><Dialog.Content
      {...(description == null ? { 'aria-describedby': undefined } : {})}
      onOpenAutoFocus={onOpenAutoFocus} onCloseAutoFocus={onCloseAutoFocus}
      className={`siso-blocks siso-blocks-dialog ${side ? `siso-blocks-drawer siso-blocks-drawer-${side}` : ''} ${className}`}>
      <header className="siso-blocks-heading"><div><Dialog.Title className="siso-blocks-title">{title}</Dialog.Title>
        {description != null && <Dialog.Description className="siso-blocks-muted">{description}</Dialog.Description>}</div>
        <Dialog.Close className="siso-blocks-button" aria-label={closeLabel}>×</Dialog.Close></header>
      <div className="siso-blocks-body">{children}</div>{footer && <footer className="siso-blocks-footer">{footer}</footer>}
    </Dialog.Content></Dialog.Portal>
  </Dialog.Root>;
}
export interface SisoPopoverProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  label: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
}
export function SisoPopover({ trigger, children, label, open, onOpenChange, side = 'bottom', align = 'start', className = '' }: SisoPopoverProps) {
  return <Popover.Root open={open} onOpenChange={onOpenChange}><Popover.Trigger asChild>{trigger}</Popover.Trigger>
    <Popover.Portal><Popover.Content aria-label={label} side={side} align={align} sideOffset={8}
      className={`siso-blocks siso-blocks-popover ${className}`}>{children}</Popover.Content></Popover.Portal></Popover.Root>;
}
/** Supplementary preview. Put essential actions in a popover/dialog for touch and keyboard access. */
export function SisoHoverCard({ trigger, children, label, open, onOpenChange, side = 'bottom', align = 'start', className = '' }: SisoPopoverProps) {
  return <HoverCard.Root open={open} onOpenChange={onOpenChange}><HoverCard.Trigger asChild>{trigger}</HoverCard.Trigger>
    <HoverCard.Portal><HoverCard.Content aria-label={label} side={side} align={align} sideOffset={8}
      className={`siso-blocks siso-blocks-popover ${className}`}>{children}</HoverCard.Content></HoverCard.Portal></HoverCard.Root>;
}
export interface SisoCommandItem { id: string; label: string; description?: string; group?: string; keywords?: string[]; icon?: React.ReactNode; shortcut?: string; disabled?: boolean }
export interface SisoCommandPaletteProps extends Omit<SisoDialogProps, 'title' | 'children' | 'footer'> {
  items: readonly SisoCommandItem[];
  onSelect: (item: SisoCommandItem) => void;
  title?: string;
  placeholder?: string;
  emptyMessage?: string;
}
export function SisoCommandPalette({ items, onSelect, title = 'Commands', placeholder = 'Search commands', emptyMessage = 'No commands found', ...props }: SisoCommandPaletteProps) {
  const [query, setQuery] = React.useState('');
  const list = React.useRef<HTMLDivElement>(null);
  const search = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (!props.open) setQuery(''); }, [props.open]);
  const filtered = items.filter(item => [item.label, item.description, item.group, ...(item.keywords ?? [])].join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()));
  const enabled = filtered.filter(item => !item.disabled);
  function choose(item: SisoCommandItem) { onSelect(item); props.onOpenChange(false); }
  function move(event: React.KeyboardEvent) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const buttons = Array.from(list.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
    if (!buttons.length) return;
    event.preventDefault();
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : event.key === 'ArrowDown' ? (current + 1) % buttons.length : current <= 0 ? buttons.length - 1 : current - 1;
    buttons[next]?.focus();
  }
  return <SisoDialog {...props} title={title} onOpenAutoFocus={event => {
    props.onOpenAutoFocus?.(event);
    if (!event.defaultPrevented) { event.preventDefault(); search.current?.focus(); }
  }}><div onKeyDown={move}>
    <input ref={search} className="siso-blocks-input" aria-label={placeholder} placeholder={placeholder} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => {
      if (e.key === 'Enter' && enabled[0]) { e.preventDefault(); choose(enabled[0]); }
    }} />
    <div ref={list} className="siso-blocks-command-list" aria-label={title}>
      {filtered.length === 0 && <p role="status" className="siso-blocks-muted">{emptyMessage}</p>}
      {filtered.map((item, index) => <React.Fragment key={item.id}>{item.group && item.group !== filtered[index - 1]?.group && <h3 className="siso-blocks-muted">{item.group}</h3>}
        <button type="button" className="siso-blocks-command" disabled={item.disabled} onClick={() => choose(item)}>{item.icon}<span><strong>{item.label}</strong>{item.description && <small>{item.description}</small>}</span>{item.shortcut && <kbd>{item.shortcut}</kbd>}</button>
      </React.Fragment>)}
    </div></div></SisoDialog>;
}
