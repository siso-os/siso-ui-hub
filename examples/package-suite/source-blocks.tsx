// uihub: siso:package-workbench
import { useState, type ComponentType } from 'react';
import { SourceBlockScope } from '@siso/ui/blocks/source';
import '@siso/ui/blocks/source.css';
import { RenameProject as DialogDemo } from './block-demos/dialog';
import DrawerDemo from './block-demos/drawer';
import { ShareMenu as PopoverDemo } from './block-demos/popover';
import { Mention as HoverCardDemo } from './block-demos/hover-card';
import CommandDemo from './block-demos/command-palette';
import { SavedToast as ToastDemo } from './block-demos/toast';
import { HeaderBell as NotificationDemo } from './block-demos/notification-center';
import { Projects as TableDemo } from './block-demos/sortable-data-table';
import { AttachmentUpload as FileDemo } from './block-demos/file-dropzone';
import TimelineDemo from './block-demos/timeline';
import EmptyStateDemo from './block-demos/empty-state';
import { Results as PaginationDemo } from './block-demos/pagination';
import { SupportChat as ChatDemo } from './block-demos/chat-thread';
import CommentDemo from './block-demos/comment-thread';
import { IssueFilters as FilterDemo } from './block-demos/filter-toolbar';

export const sourceBlockDemos: { id: string; label: string; group: string; Demo: ComponentType }[] = [
  { id: 'dialog', label: 'Dialog', group: 'Overlays', Demo: DialogDemo },
  { id: 'drawer', label: 'Drawer', group: 'Overlays', Demo: DrawerDemo },
  { id: 'popover', label: 'Popover', group: 'Overlays', Demo: PopoverDemo },
  { id: 'hover-card', label: 'Hover card', group: 'Overlays', Demo: HoverCardDemo },
  { id: 'command-palette', label: 'Command palette', group: 'Overlays', Demo: CommandDemo },
  { id: 'toast', label: 'Toast', group: 'Feedback', Demo: ToastDemo },
  { id: 'notification-center', label: 'Notification center', group: 'Feedback', Demo: NotificationDemo },
  { id: 'timeline', label: 'Timeline', group: 'Feedback', Demo: TimelineDemo },
  { id: 'empty-state', label: 'Empty state', group: 'Feedback', Demo: EmptyStateDemo },
  { id: 'sortable-data-table', label: 'Sortable data table', group: 'Data and files', Demo: TableDemo },
  { id: 'filter-toolbar', label: 'Filter toolbar', group: 'Data and files', Demo: FilterDemo },
  { id: 'pagination', label: 'Pagination', group: 'Data and files', Demo: PaginationDemo },
  { id: 'file-dropzone', label: 'File dropzone', group: 'Data and files', Demo: FileDemo },
  { id: 'chat-thread', label: 'Chat thread', group: 'Conversations', Demo: ChatDemo },
  { id: 'comment-thread', label: 'Comment thread', group: 'Conversations', Demo: CommentDemo },
];
export function SourceBlocksPage() {
  const [selected, setSelected] = useState('dialog');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const entry = sourceBlockDemos.find(item => item.id === selected) ?? sourceBlockDemos[0]!;
  const groups = [...new Set(sourceBlockDemos.map(item => item.group))];
  const Demo = entry.Demo;
  return <section aria-label="Original free Arc blocks">
    <header style={{display:'flex',alignItems:'start',justifyContent:'space-between',gap:16,flexWrap:'wrap',marginBottom:24}}>
      <div><h2 style={{margin:0}}>The original blocks</h2><p style={{margin:'8px 0 0',opacity:.65}}>15 free Arc families · original demos, CSS and motion</p></div>
      <label>Preview theme <select aria-label="Block preview theme" value={theme} onChange={event => setTheme(event.target.value as typeof theme)}><option value="dark">Dark</option><option value="light">Light</option></select></label>
    </header>
    <div style={{display:'flex',alignItems:'start',gap:24,flexWrap:'wrap'}}>
      <nav aria-label="Block families" style={{flex:'1 1 210px',maxWidth:300,display:'grid',gap:20}}>
        {groups.map(group => <div key={group}><h3 style={{fontSize:12,letterSpacing:'.1em',textTransform:'uppercase',opacity:.6,margin:'0 0 8px'}}>{group}</h3><div style={{display:'flex',flexWrap:'wrap',gap:6}}>{sourceBlockDemos.filter(item => item.group === group).map(item => <button type="button" key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)} style={{font:'inherit',fontSize:12,padding:'7px 10px',borderRadius:8,border:'1px solid var(--siso-border,#34343c)',background:selected === item.id ? 'var(--siso-accent,#ffa726)' : 'transparent',color:selected === item.id ? '#17120a' : 'inherit',cursor:'pointer'}}>{item.label}</button>)}</div></div>)}
      </nav>
      <div style={{flex:'3 1 400px',minWidth:0}}>
        <div style={{display:'flex',justifyContent:'space-between',gap:12,marginBottom:12}}><h3 style={{margin:0}}>{entry.label}</h3><a href={`https://uiarc.dev/components/${entry.id}`} target="_blank" rel="noreferrer" style={{color:'inherit',fontSize:12}}>Original documentation ↗</a></div>
        <SourceBlockScope theme={theme} accent="orange" style={{minHeight:420,padding:'clamp(20px,4vw,48px)',border:'1px solid var(--border)',borderRadius:16,background:'var(--background)',color:'var(--foreground)',fontSize:14,lineHeight:1.5}}>
          <div key={entry.id} style={{width:'100%',maxWidth:760,margin:'0 auto'}}><Demo /></div>
        </SourceBlockScope>
        <p style={{fontSize:12,opacity:.65,lineHeight:1.6}}>The complete source documentation example runs through <code>@siso/blocks/source</code>. File transfer is explicitly simulated in this browser; no server receives uploads. Sample portraits use the owned SISO mark.</p>
      </div>
    </div>
  </section>;
}
export const SourceBlocks = SourceBlocksPage;
export default SourceBlocksPage;
