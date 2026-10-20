'use client';
// uihub: siso:blocks
import * as React from 'react';
export interface SisoThreadAuthor { id: string; name: string; avatar?: string }
export interface SisoChatMessage { id: string; author: SisoThreadAuthor; body: string; time: string; dateTime?: string; status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'; attachments?: readonly { id: string; name: string; href: string }[] }
export interface SisoChatThreadProps {
  messages: readonly SisoChatMessage[]; currentUserId?: string; label?: string;
  onSend?: (body: string) => void | Promise<void>; onRetry?: (id: string) => void;
  sending?: boolean; composerLabel?: string; sendLabel?: string; emptyMessage?: string;
}
function Author({ author }: { author: SisoThreadAuthor }) { return <span className="siso-blocks-author">{author.avatar && <img src={author.avatar} alt="" width={28} height={28} />}<strong>{author.name}</strong></span>; }
export function SisoChatThread({ messages, currentUserId, label = 'Conversation', onSend, onRetry, sending = false, composerLabel = 'Message', sendLabel = 'Send', emptyMessage = 'No messages' }: SisoChatThreadProps) {
  return <section className="siso-blocks siso-blocks-thread" aria-label={label}><ol className="siso-blocks-messages" aria-label={label}>{messages.map(message => <li key={message.id} data-mine={message.author.id === currentUserId}>
    <header><Author author={message.author} /><time className="siso-blocks-muted" dateTime={message.dateTime}>{message.time}</time></header><p className="siso-blocks-message-body">{message.body}</p>
    {message.attachments?.length ? <ul>{message.attachments.map(file => <li key={file.id}><a href={file.href}>{file.name}</a></li>)}</ul> : null}
    {message.status && <small className="siso-blocks-muted">{message.status}</small>}{message.status === 'failed' && onRetry && <button type="button" className="siso-blocks-button" onClick={() => onRetry(message.id)}>Retry</button>}
  </li>)}</ol>{!messages.length && <p className="siso-blocks-muted">{emptyMessage}</p>}{onSend && <Composer onSubmit={onSend} pending={sending} label={composerLabel} sendLabel={sendLabel} />}</section>;
}
export interface SisoComment { id: string; author: SisoThreadAuthor; body: string; time: string; edited?: boolean; replies?: readonly SisoComment[] }
export interface SisoCommentThreadProps {
  comments: readonly SisoComment[];
  onReply?: (body: string, parentId: string | null) => void | Promise<void>;
  onDelete?: (id: string) => void;
  /** Determines which existing comments expose a delete action. */
  canDelete?: (comment: SisoComment) => boolean;
  resolved?: boolean; onResolvedChange?: (resolved: boolean) => void;
  label?: string; emptyMessage?: string;
}
export function SisoCommentThread({ comments, onReply, onDelete, canDelete, resolved = false, onResolvedChange, label = 'Comments', emptyMessage = 'No comments' }: SisoCommentThreadProps) {
  const [replyTo, setReplyTo] = React.useState<string | null>(null);
  function render(items: readonly SisoComment[], depth = 0): React.ReactNode {
    return <ol className="siso-blocks-comments" data-depth={depth}>{items.map(comment => <li key={comment.id}><article><header><Author author={comment.author} /><span className="siso-blocks-muted">{comment.time}{comment.edited ? ' · edited' : ''}</span></header><p className="siso-blocks-message-body">{comment.body}</p>
      <div className="siso-blocks-actions">{onReply && !resolved && <button type="button" className="siso-blocks-button" onClick={() => setReplyTo(comment.id)}>Reply</button>}{onDelete && canDelete?.(comment) && <button type="button" className="siso-blocks-button" onClick={() => onDelete(comment.id)}>Delete</button>}</div>
      {onReply && !resolved && replyTo === comment.id && <><Composer label={`Reply to ${comment.author.name}`} sendLabel="Reply" onSubmit={async body => { await onReply(body, comment.id); setReplyTo(null); }} /><button type="button" className="siso-blocks-button" onClick={() => setReplyTo(null)}>Cancel reply</button></>}
    </article>{comment.replies?.length ? render(comment.replies, depth + 1) : null}</li>)}</ol>;
  }
  return <section className="siso-blocks siso-blocks-thread" aria-label={label}><header className="siso-blocks-heading"><strong>{label}</strong>{onResolvedChange ? <button type="button" className="siso-blocks-button" onClick={() => onResolvedChange(!resolved)}>{resolved ? 'Reopen' : 'Resolve'}</button> : resolved && <span className="siso-blocks-muted">Resolved</span>}</header>
    {comments.length ? render(comments) : <p className="siso-blocks-muted">{emptyMessage}</p>}{onReply && !resolved && <Composer label="Add a comment" sendLabel="Comment" onSubmit={body => onReply(body, null)} />}</section>;
}
function Composer({ onSubmit, pending = false, label, sendLabel }: { onSubmit: (body: string) => void | Promise<void>; pending?: boolean; label: string; sendLabel: string }) {
  const [draft, setDraft] = React.useState(''), [busy, setBusy] = React.useState(false), [error, setError] = React.useState('');
  const fieldId = React.useId();
  const inFlight = React.useRef(false);
  return <form className="siso-blocks-composer" onSubmit={async e => {
    e.preventDefault(); const body = draft.trim(); if (!body || pending || inFlight.current) return;
    inFlight.current = true; setBusy(true); setError('');
    try { await onSubmit(body); setDraft(current => current === draft ? '' : current); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not send. Try again.'); }
    finally { inFlight.current = false; setBusy(false); }
  }}><label htmlFor={fieldId}>{label}</label><textarea className="siso-blocks-input" id={fieldId} rows={3} value={draft} onChange={e => setDraft(e.target.value)} disabled={pending || busy} />
    <div className="siso-blocks-actions"><button type="submit" className="siso-blocks-button" disabled={pending || busy || !draft.trim()}>{pending || busy ? 'Sending…' : sendLabel}</button><span className="siso-blocks-error" role="status">{error}</span></div>
  </form>;
}
