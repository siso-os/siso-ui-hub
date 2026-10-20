// uihub: siso:package-workbench
import { useState } from 'react'
import AgentFrame from './agent-frame'
import {
  SisoAppFrame, SISO_FRAME, SISO_FRAME_SPEC, applies, fit,
  SCHEMES, FONTS, SURFACES, SISO_TOKENS, tokenVars,
  type FrameCfg, type FrameView, type Tokens,
} from '@siso/ui/shells'
import '@siso/ui/shells/styles.css'

type Option = { key: keyof FrameCfg; title: string; opts: readonly { value: string | number | boolean; label: string; does: string }[] }
const options = SISO_FRAME_SPEC.options as unknown as readonly Option[]

/** Uses only the package: the real source frame with its original data fixture. */
function ConfigurableFrame() {
  const [cfg, setCfg] = useState<FrameCfg>({ ...SISO_FRAME })
  const [tokens, setTokens] = useState<Tokens>({ ...SISO_TOKENS })
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [state, setState] = useState<FrameView['state']>(undefined)
  const [peek, setPeek] = useState<'header' | 'footer' | undefined>(undefined)
  const [variation, setVariation] = useState('custom')
  const effective = fit(cfg)
  const active = applies(effective)
  const labelStyle = { display: 'grid', gap: 4, fontSize: 12 } as const
  const inputStyle = { minHeight: 34, border: '1px solid #71717a', borderRadius: 6, padding: '4px 8px', background: 'transparent', color: 'inherit' } as const
  return <section aria-label="Original UI Hub app frame" style={{ display: 'grid', gap: 16 }}>
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 650 }}>The actual SISO AppFrame</h2>
      <p style={{ opacity: .7 }}>Original hub source, original animated icons, shadcn primitives and all source options. Dashboard metrics and account details below are the source demonstration fixture.</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(145px,1fr))', gap: 12 }}>
      <label style={labelStyle}>Source variation<select style={inputStyle} value={variation} onChange={event => {
        const id = event.target.value; setVariation(id)
        const selected = SISO_FRAME_SPEC.variations.find(item => item.id === id)
        if (selected) setCfg({ ...SISO_FRAME, ...selected.cfg } as FrameCfg)
      }}><option value="custom">Custom / default</option>{SISO_FRAME_SPEC.variations.map(item => <option key={item.id} value={item.id}>{item.id} · {item.name}</option>)}</select></label>
      {options.map(option => <label key={option.key} style={{ ...labelStyle, opacity: active.includes(option.key) ? 1 : .4 }}>{option.title}
        <select style={inputStyle} value={String(effective[option.key])} disabled={!active.includes(option.key)} onChange={event => {
          const selected = option.opts.find(item => String(item.value) === event.target.value)
          if (selected) { setCfg(current => ({ ...current, [option.key]: selected.value })); setVariation('custom') }
        }}>{option.opts.map(item => <option key={String(item.value)} value={String(item.value)} title={item.does}>{item.label}</option>)}</select>
      </label>)}
      <label style={labelStyle}>Scheme<select style={inputStyle} value={tokens.scheme} onChange={event => setTokens({ ...tokens, scheme: event.target.value })}>{SCHEMES.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label style={labelStyle}>Surface<select style={inputStyle} value={tokens.surface} onChange={event => setTokens({ ...tokens, surface: event.target.value })}>{SURFACES.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>
      <label style={labelStyle}>Font<select style={inputStyle} value={tokens.font} onChange={event => setTokens({ ...tokens, font: event.target.value })}>{FONTS.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>
      <label style={labelStyle}>Radius<select style={inputStyle} value={tokens.radius} onChange={event => setTokens({ ...tokens, radius: event.target.value })}>{[['0','Sharp'],['0.375','Soft'],['0.625','Mid'],['1','Round']].map(([id,name]) => <option key={id} value={id}>{name}</option>)}</select></label>
      <label style={labelStyle}>Theme<select style={inputStyle} value={theme} onChange={event => setTheme(event.target.value as 'dark' | 'light')}><option value="dark">Dark</option><option value="light">Light</option></select></label>
      <label style={labelStyle}>Source state<select style={inputStyle} value={state ?? 'interactive'} onChange={event => setState(event.target.value === 'interactive' ? undefined : event.target.value as FrameView['state'])}><option value="interactive">Interactive</option><option value="expanded">Expanded (pinned)</option><option value="collapsed">Collapsed (pinned)</option><option value="phone">Drawn phone</option><option value="phone-open">Phone menu open</option></select></label>
      <label style={labelStyle}>Inspect menu<select style={inputStyle} value={peek ?? 'none'} onChange={event => setPeek(event.target.value === 'none' ? undefined : event.target.value as 'header' | 'footer')}><option value="none">Closed</option><option value="header">Header switcher</option><option value="footer">Account menu</option></select></label>
    </div>
    <div style={{ position: 'relative', width: state === 'phone' ? 'min(390px, 100%)' : '100%', height: 700, overflow: 'hidden', border: '1px solid #52525b', borderRadius: 12 }}>
      <div className={`siso-source-frame ${theme} absolute inset-0 bg-background text-foreground [&_[data-slot=sidebar-container]]:!h-full [&_[data-slot=sidebar-wrapper]]:!h-full [&_[data-slot=sidebar-wrapper]]:!min-h-full [&_.h-svh]:!h-full [&_.min-h-svh]:!min-h-full`}
        data-surface={tokens.surface} style={{ ...tokenVars(tokens, theme), position: 'absolute', inset: 0, transform: 'translateZ(0)' }}>
        <SisoAppFrame cfg={effective} state={state} peek={peek} />
      </div>
    </div>
    <p style={{ fontSize: 12, opacity: .7 }}>Hover navigation and tool icons to animate them. Switch workspaces/views, tools and rail spaces; open the search palette; collapse from the brand row. Every frame shown here is rendered by @siso/shells.</p>
  </section>
}

export default function SourceShells() {
  const [source, setSource] = useState('hub')
  return <div style={{display:'grid',gap:20}}><label>Existing shell source <select aria-label="Existing shell source" value={source} onChange={event=>setSource(event.target.value)}><option value="hub">UI Hub · configurable app frame</option><option value="agent-base">Agent Base · desktop frame</option></select></label>{source==='hub'?<ConfigurableFrame/>:<AgentFrame/>}</div>
}
export { SourceShells }
