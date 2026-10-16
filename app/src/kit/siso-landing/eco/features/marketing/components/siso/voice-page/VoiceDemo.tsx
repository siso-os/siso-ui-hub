// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/voice-page/VoiceDemo.tsx)
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AgentFace } from '../living/living-assets';

// The big live demo for /voice/ (spec product-pages.md, lane voice-page): SISO Voice working, drawn in code. Four stories, one
// per clickable beside it: push to talk, the floating bar, text into any app, talking to your agents. Each runs on `t` (ms since
// the story began; held at VD_DUR under reduced motion, so the finished frame shows). The mic is real: "Try it live" records
// here, functions/api/transcribe.js turns it into text with Groq Whisper, and what it heard lands where the story's text goes.
// The scripted words are illustrative; the windows are generic apps, not anyone's product.

export const VD_DUR = 9000;
export const VD_TABS = [
  { key: 'ptt', label: 'Push to talk', desc: 'Hold a key, say it, let go. The words are typed where your cursor is.' },
  { key: 'bar', label: 'A floating bar', desc: 'A small bar above every app shows it heard you, with live captions.' },
  { key: 'apps', label: 'Into any app', desc: 'Mail, a browser, a chat: whatever has your cursor gets the text.' },
  { key: 'agents', label: 'Talk to your agents', desc: 'Most of what we say goes straight into Claude Code or Codex.' },
] as const;
export type VdKey = (typeof VD_TABS)[number]['key'];

// One timeline for every story: listen, transcribe, type, done.
const LISTEN = 600, TRANSCRIBE = 3600, TYPE = 4400, DONE = 7400;
const WAVE = Array.from({ length: 22 }, (_, i) => ({ h: 30 + ((i * 37) % 70), d: (i * 73) % 900 }));

const SAID: Record<VdKey, string> = {
  ptt: 'Pick up the prints at four, then ask about the Friday booking.',
  bar: 'Move the pricing section above the FAQ and show me the page.',
  apps: '',
  agents: 'Move the pricing section above the FAQ, then show me the updated page.',
};
const APPS = [
  { key: 'mail', name: 'Mail', field: 'Message', said: 'Thanks, the new menu looks great. Can we print it Friday?' },
  { key: 'web', name: 'Browser', field: 'Search', said: 'open source push to talk for mac' },
  { key: 'chat', name: 'Chat', field: 'Message #team', said: 'Deploy is green, I’ll check it on my phone.' },
] as const;
const AGENT_LINES = [
  ['⏺', 'Read(src/sections/Pricing.tsx)'],
  ['⏺', 'Edit(src/app/page.tsx): pricing above FAQ'],
  ['⏺', 'Bash(pnpm exec next build)'],
  ['⎿', '✓ Compiled. Opening the page for you.'],
] as const;

export type Mic = 'idle' | 'rec' | 'sending' | 'error';

/** The real try-out: records up to 15 s, posts it to /api/transcribe, returns what Groq heard. */
export function useMic() {
  const [state, setState] = useState<Mic>('idle');
  const [secs, setSecs] = useState(0);
  const [heard, setHeard] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const started = useRef(0);
  const cancelled = useRef(false);

  useEffect(() => {
    if (state !== 'rec') return;
    const id = window.setInterval(() => {
      const s = Math.floor((Date.now() - started.current) / 1000); setSecs(s);
      if (s >= 15) rec.current?.stop();
    }, 250);
    return () => window.clearInterval(id);
  }, [state]);
  useEffect(() => () => { cancelled.current = true; rec.current?.stream.getTracks().forEach(track => track.stop()); }, []);

  async function toggle() {
    if (state === 'rec') { rec.current?.stop(); return; }
    if (state === 'sending') return;
    setHeard(null); setNote('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const r = new MediaRecorder(stream); rec.current = r; chunks.current = [];
      r.ondataavailable = e => { if (e.data.size) chunks.current.push(e.data); };
      r.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        if (cancelled.current) { cancelled.current = false; setState('idle'); return; }
        setState('sending');
        const type = r.mimeType || 'audio/webm';
        const form = new FormData(); form.append('file', new Blob(chunks.current, { type }), `clip.${type.includes('mp4') ? 'mp4' : 'webm'}`);
        try {
          const res = await fetch('/api/transcribe', { method: 'POST', body: form });
          const data = await res.json() as { text?: string; error?: string };
          if (!res.ok || !data.text) { setState('error'); setNote(data.error ?? 'Didn’t catch that'); return; }
          setHeard(data.text); setState('idle');
        } catch { setState('error'); setNote('Voice is offline here'); }
      };
      started.current = Date.now(); setSecs(0); r.start(); setState('rec');
    } catch { setState('error'); setNote('Allow the microphone to try it'); }
  }
  function cancel() { if (state === 'rec') { cancelled.current = true; rec.current?.stop(); } }
  function clear() { setHeard(null); setNote(''); if (state === 'error') setState('idle'); }
  return { state, secs, heard, note, toggle, cancel, clear };
}

const typed = (s: string, t: number, from = TYPE, per = 26) => s.slice(0, Math.max(0, Math.floor((t - from) / per)));
const phaseAt = (t: number) => t < LISTEN ? 'idle' : t < TRANSCRIBE ? 'listen' : t < TYPE ? 'transcribe' : t < DONE ? 'type' : 'done';
type Phase = ReturnType<typeof phaseAt>;

function MicGlyph({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="7.5" y="2.5" width="5" height="9" rx="2.5" /><path d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5" /></svg>;
}

/** The floating bar, as SISO Voice draws it: mic, level bars, timer, then a tick. */
function Bar({ phase, secs, captions, big = false }: { phase: Phase | 'rec' | 'sending'; secs: number; captions?: string; big?: boolean }) {
  const on = phase === 'listen' || phase === 'rec';
  const busy = phase === 'transcribe' || phase === 'sending';
  const done = phase === 'type' || phase === 'done';
  return <div className={`vd-bar${big ? ' is-big' : ''}`} data-phase={on ? 'on' : busy ? 'busy' : done ? 'done' : 'idle'}>
    {captions !== undefined && <div className="vd-captions" aria-hidden={!on}><span>{captions || '…'}</span></div>}
    <div className="vd-pill">
      <span className="vd-mic"><MicGlyph size={big ? 18 : 15} /></span>
      <span className="vd-wave vp-loop" aria-hidden="true">{WAVE.map((w, i) => <i key={i} style={{ ['--h' as string]: `${w.h}%`, animationDelay: `-${w.d}ms` }} />)}</span>
      <span className="vd-dots" aria-hidden="true"><i /><i /><i /></span>
      <time>0:{String(Math.min(59, secs)).padStart(2, '0')}</time>
      <span className="vd-ok" aria-hidden="true">✓</span>
    </div>
    <span className="vd-state" aria-live="polite">{on ? 'Listening' : busy ? 'Transcribing' : done ? 'Typed' : 'Hold fn to talk'}</span>
  </div>;
}

function Win({ title, children, className = '', focus = false }: { title: ReactNode; children: ReactNode; className?: string; focus?: boolean }) {
  return <div className={`vd-win ${className}${focus ? ' is-focus' : ''}`}>
    <div className="vd-win-bar"><span className="vd-lights"><i /><i /><i /></span><span>{title}</span></div>
    <div className="vd-win-body">{children}</div>
  </div>;
}

function Caret({ on }: { on: boolean }) { return on ? <i className="vd-caret vp-loop" aria-hidden="true" /> : null; }

const CSS = `
.vd{position:relative;height:100%;display:flex;flex-direction:column;overflow:hidden;border-radius:inherit;
  background:radial-gradient(90% 70% at 20% 0%,#e0336a38,transparent 60%),radial-gradient(80% 80% at 100% 100%,#b45cff2e,transparent 60%),linear-gradient(160deg,#1c0710,#0b0710 55%,#07060b)}
.vd-menubar{flex:none;display:flex;align-items:center;gap:14px;height:28px;padding:0 14px;background:#0000004d;font:500 11.5px/1 Inter,sans-serif;color:#ffffffc4}
.vd-menubar b{font-weight:600}.vd-menubar span{color:#ffffff8c}
.vd-menubar .vd-tray{margin-left:auto;display:flex;align-items:center;gap:12px}
.vd-tray-mic{display:grid;place-items:center;width:22px;height:18px;border-radius:5px;color:#fff;transition:background .3s}
.vd[data-on] .vd-tray-mic{background:#e0336a;box-shadow:0 0 12px #e0336a}
.vd-stage{position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:34px 40px 120px}
/* windows */
.vd-win{display:flex;flex-direction:column;min-width:0;border-radius:14px;background:#141318f2;box-shadow:0 0 0 1px #ffffff17,0 30px 60px -24px #000;overflow:hidden;
  transition:transform .5s cubic-bezier(.19,1,.22,1),box-shadow .4s,opacity .4s}
.vd-win.is-focus{box-shadow:0 0 0 1.5px #e0336acc,0 0 34px -8px #e0336a,0 30px 60px -24px #000}
.vd-win-bar{display:flex;align-items:center;gap:10px;height:34px;padding:0 12px;border-bottom:1px solid #ffffff0f;font:500 12px/1 Inter,sans-serif;color:#ffffffa6}
.vd-lights{display:flex;gap:6px}.vd-lights i{width:10px;height:10px;border-radius:50%;background:#ffffff26}
.vd-lights i:first-child{background:#ff5f57}.vd-lights i:nth-child(2){background:#febc2e}.vd-lights i:last-child{background:#28c840}
.vd-win-body{position:relative;flex:1;padding:18px 20px;font:400 16px/1.6 Inter,sans-serif;color:#f3f1ec}
.vd-caret{display:inline-block;width:2px;height:1.1em;margin-left:1px;vertical-align:-3px;background:#ff8fb1;animation:vd-blink 1s steps(1) infinite}
@keyframes vd-blink{50%{opacity:0}}
.vd-ph{color:#ffffff47}
.vd-heard{display:inline-flex;align-items:center;gap:6px;margin-top:12px;height:24px;padding:0 9px;border-radius:7px;background:#e0336a1f;box-shadow:inset 0 0 0 1px #e0336a66;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:#ffb3cb}
/* push to talk: notes + the key */
.vd-notes{width:min(620px,100%);height:300px}
.vd-notes h4{margin:0 0 10px;font:600 22px/1.2 'Inter Display',Inter,sans-serif;letter-spacing:-.02em}
.vd-notes .vd-date{display:block;margin-bottom:16px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:#ffffff59}
.vd-notes ul{margin:0 0 6px;padding-left:18px;color:#ffffff8c}
.vd-key{position:absolute;left:44px;bottom:34px;display:flex;align-items:center;gap:14px;font:500 11px/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:#ffffff8c}
.vd-cap{position:relative;width:64px;height:60px;border-radius:12px;background:linear-gradient(#2a2830,#1b1a20);box-shadow:inset 0 1px 0 #ffffff26,0 6px 0 #0d0c10,0 10px 18px -6px #000;
  display:flex;flex-direction:column;justify-content:space-between;padding:8px 10px;font:500 13px/1 Inter,sans-serif;color:#fff;transition:transform .18s ease,box-shadow .18s ease}
.vd-cap small{align-self:flex-end;font-size:11px;color:#ffffff8c}
.vd-key[data-down] .vd-cap{transform:translateY(5px);box-shadow:inset 0 1px 0 #ffffff1a,0 1px 0 #0d0c10,0 0 26px -4px #e0336a}
.vd-key[data-down] .vd-cap::after{content:"";position:absolute;inset:-1px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #e0336a}
/* the floating bar */
.vd-bar{position:absolute;left:50%;bottom:30px;z-index:5;display:flex;flex-direction:column;align-items:center;gap:10px;transform:translateX(-50%)}
.vd-pill{display:flex;align-items:center;gap:10px;height:46px;padding:0 8px 0 8px;border-radius:99px;background:#1a1a20f2;box-shadow:0 0 0 1px #ffffff21,0 18px 40px -12px #000;
  transition:box-shadow .4s,transform .4s cubic-bezier(.19,1,.22,1)}
.vd-bar[data-phase=on] .vd-pill{box-shadow:0 0 0 1px #e0336a99,0 18px 40px -12px #000,0 0 40px -6px #e0336a}
.vd-mic{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#ffffff12;color:#fff;transition:background .3s}
.vd-bar[data-phase=on] .vd-mic{background:#e0336a}
.vd-wave{display:flex;align-items:center;gap:2.5px;height:28px;width:96px}
.vd-wave i{flex:1;height:var(--h);border-radius:2px;background:linear-gradient(#ffb3cb,#e0336a 60%,#b45cff);transform:scaleY(.12);transition:transform .3s}
.vd-bar[data-phase=on] .vd-wave i{animation:vd-lvl .9s ease-in-out infinite alternate}
@keyframes vd-lvl{from{transform:scaleY(.18)}to{transform:scaleY(1)}}
.vd-dots{display:none;gap:5px;width:96px;justify-content:center}
.vd-dots i{width:6px;height:6px;border-radius:50%;background:#ffb3cb;animation:vd-dot 1s ease-in-out infinite}
.vd-dots i:nth-child(2){animation-delay:.15s}.vd-dots i:nth-child(3){animation-delay:.3s}
@keyframes vd-dot{50%{transform:translateY(-4px);opacity:.4}}
.vd-bar[data-phase=busy] .vd-wave{display:none}.vd-bar[data-phase=busy] .vd-dots{display:flex}
.vd-pill time{min-width:30px;font:500 12px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe4cc}
.vd-ok{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#ffffff0d;color:#ffffff40;font-size:13px;transition:background .3s,color .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.vd-bar[data-phase=done] .vd-ok{background:#e0336a;color:#fff;transform:scale(1.08)}
.vd-state{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#ffffff8c}
.vd-captions{max-width:440px;padding:9px 14px;border-radius:12px;background:#000000b3;box-shadow:0 0 0 1px #ffffff17;font:500 14px/1.45 Inter,sans-serif;color:#fff;text-align:center;
  opacity:0;transform:translateY(6px);transition:opacity .3s,transform .3s}
.vd-bar[data-phase=on] .vd-captions{opacity:1;transform:none}
.vd-bar.is-big{bottom:50%;transform:translate(-50%,50%) scale(1.45)}
.vd-bar.is-big .vd-state{display:none}
/* the bar story: dim window behind, state list beside */
.vd-ghost{width:min(640px,100%);height:280px;opacity:.45}
.vd-ghost .vd-win-body b{display:block;height:9px;margin-bottom:12px;border-radius:5px;background:#ffffff14}
.vd-steps{position:absolute;right:34px;top:34px;display:flex;flex-direction:column;gap:6px;margin:0;padding:0;list-style:none}
.vd-steps li{display:flex;align-items:center;gap:9px;height:32px;padding:0 12px;border-radius:10px;background:#0000004d;box-shadow:inset 0 0 0 1px #ffffff12;
  font:500 12px/1 Inter,sans-serif;color:#ffffff73;transition:color .3s,box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.vd-steps li i{width:7px;height:7px;border-radius:50%;background:#ffffff33}
.vd-steps li.on{color:#fff;box-shadow:inset 0 0 0 1px #e0336a99;transform:translateX(-4px)}.vd-steps li.on i{background:#e0336a;box-shadow:0 0 8px #e0336a}
/* any app: three windows, the focused one gets the text */
.vd-three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;width:100%}
.vd-three .vd-win{height:250px}
.vd-three .vd-win:not(.is-focus){transform:scale(.97);opacity:.75}
.vd-field{display:block;margin-bottom:8px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#ffffff59}
.vd-input{min-height:96px;padding:12px 14px;border-radius:10px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;font-size:15px}
.vd-win.is-focus .vd-input{box-shadow:inset 0 0 0 1px #e0336a80}
.vd-web .vd-input{min-height:0;border-radius:99px;padding:10px 16px}
.vd-web .vd-res b{display:block;height:8px;margin-top:14px;border-radius:4px;background:#ffffff12}.vd-web .vd-res b:nth-child(2){width:70%}.vd-web .vd-res b:nth-child(3){width:84%}
/* agents: a terminal pane */
.vd-term{width:min(760px,100%);height:330px}
.vd-term .vd-win-bar>span:last-child{display:flex;align-items:center;gap:7px}.vd-term .vd-win-bar img{display:block;width:16px;height:16px;border-radius:4px}
.vd-term .vd-win-bar>:last-child{margin-left:auto}
.vd-term .vd-win-body{display:flex;flex-direction:column;gap:7px;font:400 14px/1.55 'Geist Mono',ui-monospace,monospace;color:#d8d6d0}
.vd-prompt{display:flex;gap:10px;padding:12px 14px;border-radius:10px;box-shadow:inset 0 0 0 1px #ffffff1f;color:#fff}
.vd-prompt>b{color:#d97757;font-weight:500}
.vd-line{opacity:0;transform:translateY(5px);transition:opacity .4s,transform .4s cubic-bezier(.19,1,.22,1)}
.vd-line.on{opacity:1;transform:none}
.vd-line em{font-style:normal;color:#d97757;margin-right:8px}.vd-line:last-child{color:#6fdc95}
.vd-sent{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;height:28px;padding:0 12px 0 4px;border-radius:99px;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff17;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe4cc;opacity:0;transition:opacity .4s}
.vd-sent.on{opacity:1}
@media (max-width:991px){
  .vd-stage{padding:22px 16px 118px}
  .vd-three{grid-template-columns:1fr;gap:10px}.vd-three .vd-win{height:auto}.vd-three .vd-win-body{padding:12px 14px}.vd-three .vd-input{min-height:52px}
  .vd-three .vd-win:not(.is-focus){display:none}
  .vd-steps{position:static;flex-direction:row;flex-wrap:wrap;justify-content:center;margin-bottom:14px}
  .vd-stage.is-bar{flex-direction:column}
  .vd-key{left:16px;bottom:auto;top:12px}.vd-key>span:not(.vd-cap){display:none}.vd-cap{width:48px;height:44px;padding:6px 8px;font-size:11px}
  .vd-notes{height:auto;min-height:230px;margin-top:56px}
}
@media (max-width:620px){
  .vd-menubar span:not(.vd-tray){display:none}
  .vd-win-body{padding:14px;font-size:14.5px}
  .vd-notes h4{font-size:18px}
  .vd-term{height:auto}.vd-term .vd-win-body{font-size:11.5px}
  .vd-wave{width:70px}.vd-dots{width:70px}
  .vd-captions{max-width:300px;font-size:12.5px}
  .vd-bar.is-big{transform:translate(-50%,50%) scale(1.15)}
  .vd-ghost{height:200px}
}
@media (prefers-reduced-motion:reduce){.vd *{animation:none!important}.vd-line,.vd-sent{transition:none}}
`;

export default function VoiceDemo({ tab, t, mic }: { tab: number; t: number; mic: ReturnType<typeof useMic> }) {
  const key = VD_TABS[tab].key;
  const real = mic.state === 'rec' || mic.state === 'sending' || mic.heard !== null || mic.state === 'error';
  // While the real mic is in use the story stops and the bar shows the real recording; what Groq heard replaces the script.
  const phase: Phase = real ? (mic.state === 'rec' ? 'listen' : mic.state === 'sending' ? 'transcribe' : 'done') : phaseAt(t);
  const secs = real ? mic.secs : Math.max(0, Math.min(t, TRANSCRIBE) - LISTEN) / 1000 | 0;
  const heard = mic.heard;
  const text = (s: string, from = TYPE) => heard ?? (real ? '' : typed(s, t, from));
  const caretOn = phase === 'type' || (real && mic.state === 'idle' && !heard);
  const heardTag = heard ? <span className="vd-heard"><MicGlyph size={12} />Heard by Groq Whisper, just now</span>
    : mic.state === 'error' ? <span className="vd-heard">{mic.note}</span> : null;

  // Any app: three windows, three seconds each (listen 0–1.2 s, type 1.4–2.8 s).
  const slot = Math.min(2, Math.floor(t / 3000));
  const ts = t - slot * 3000;
  const appPhase: Phase = real ? phase : ts < 200 ? 'idle' : ts < 1100 ? 'listen' : ts < 1400 ? 'transcribe' : ts < 2800 ? 'type' : 'done';
  // Captions for the bar story: the words appear while you talk.
  const capWords = SAID.bar.split(' ');
  const captions = capWords.slice(0, Math.max(0, Math.floor((t - LISTEN) / ((TRANSCRIBE - LISTEN - 300) / capWords.length)))).join(' ');

  let scene: ReactNode;
  if (key === 'ptt') {
    scene = <>
      <Win title="Notes" className="vd-notes" focus={phase === 'type'}>
        <h4>Thursday</h4><span className="vd-date">9 Oct · 16:02</span>
        <ul><li>Menu proof back from the printer</li></ul>
        <div>{text(SAID.ptt) || <span className="vd-ph">{phase === 'listen' ? '' : 'Your words land here.'}</span>}<Caret on={caretOn} /></div>
        {heardTag}
      </Win>
      <div className="vd-key" data-down={phase === 'listen' || undefined} aria-hidden="true">
        <span className="vd-cap"><small>⌥</small>fn</span><span>{phase === 'listen' ? 'Holding fn' : 'Hold fn to talk'}</span>
      </div>
    </>;
  } else if (key === 'bar') {
    const step = phase === 'listen' ? 0 : phase === 'transcribe' ? 1 : phase === 'type' || phase === 'done' ? 2 : -1;
    scene = <>
      <ol className="vd-steps">{['Listening, with live captions', 'Transcribing', 'Typed where your cursor is'].map((s, i) => <li key={s} className={step === i ? 'on' : undefined}><i />{s}</li>)}</ol>
      <Win title="Any app" className="vd-ghost"><b /><b style={{ width: '70%' }} /><b style={{ width: '84%' }} /><b style={{ width: '50%' }} />
        <div>{text(SAID.bar)}<Caret on={caretOn} /></div>{heardTag}</Win>
    </>;
  } else if (key === 'apps') {
    scene = <div className="vd-three">{APPS.map((a, i) => {
      const focus = real ? i === 0 : i === slot;
      const s = real ? (i === 0 ? heard ?? '' : '') : i < slot ? a.said : i === slot ? typed(a.said, ts, 1400, 24) : '';
      return <Win key={a.key} title={a.name} className={`vd-${a.key}`} focus={focus}>
        <span className="vd-field">{a.field}</span>
        <div className="vd-input">{s || <span className="vd-ph">{focus ? '' : '—'}</span>}<Caret on={focus && (appPhase === 'type' || (real && !heard))} /></div>
        {a.key === 'web' && <div className="vd-res" aria-hidden="true"><b /><b /><b /></div>}
        {focus && heardTag}
      </Win>;
    })}</div>;
  } else {
    const shown = real ? 0 : AGENT_LINES.filter((_, i) => t >= DONE - 1200 + i * 450).length;
    scene = <Win className="vd-term" focus={phase === 'type'}
      title={<><img src="/logos/os-top/anthropics.png" alt="" width={16} height={16} />claude · siso-landing</>}>
      <div className="vd-prompt"><b>›</b><span>{text(SAID.agents) || <span className="vd-ph">Talk to Claude Code, Codex or any terminal agent</span>}<Caret on={caretOn} /></span></div>
      {heardTag}
      {AGENT_LINES.map(([m, l], i) => <div key={l} className={`vd-line${i < shown ? ' on' : ''}`}><em>{m}</em>{l}</div>)}
      <span className={`vd-sent${shown >= 2 ? ' on' : ''}`}><AgentFace name="SISO-LANDING" family="claude" status="working" size={20} paused={phase === 'done'} />SISO-LANDING · on it</span>
    </Win>;
  }

  const barPhase: Phase = key === 'apps' ? appPhase : phase;
  return <div className="vd" data-on={barPhase === 'listen' || undefined}>
    <style>{CSS}</style>
    <div className="vd-menubar" aria-hidden="true"><b>SISO Voice</b><span>File</span><span>Edit</span><span>View</span>
      <span className="vd-tray"><span className="vd-tray-mic"><MicGlyph size={12} /></span>16:02</span></div>
    <div className={`vd-stage is-${key}`}>
      {scene}
      <Bar phase={barPhase} secs={key === 'apps' && !real ? Math.ceil(Math.max(0, Math.min(ts, 1100) - 200) / 1000) : secs}
        captions={key === 'bar' ? (real ? (mic.state === 'rec' ? 'Speak now…' : '') : captions) : undefined} big={key === 'bar' && !real && phase !== 'done' && phase !== 'type'} />
    </div>
  </div>;
}
