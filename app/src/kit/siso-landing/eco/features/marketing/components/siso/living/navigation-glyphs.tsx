// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/living/navigation-glyphs.tsx)
import type { IconGlyphProps, LivingIconDefinition } from './living-icon-types'
import './navigation-glyphs.css'

function Library({ uid }: IconGlyphProps) {
  return <g className="ng-library">
    <path d="M28 43 60 29 92 43 92 85 60 94 28 85Z" fill={`url(#${uid}-metal)`}/>
    <path d="M32 43 59 32 59 87 32 80Z" fill={`url(#${uid}-accent)`}/>
    <path d="M61 32 88 43 88 80 61 87Z" fill={`url(#${uid}-accent)`}/>
    <path d="M35 40Q47 36 60 46Q73 36 85 40V77Q73 73 60 84Q47 73 35 77Z" fill="#091321"/>
    <path d="M36 41Q49 39 58 47V79Q47 71 36 74Z" fill={`url(#${uid}-bright)`}/>
    <g className="ng-library-page"><path d="M62 47Q72 39 84 41V74Q73 71 62 79Z" fill={`url(#${uid}-metal)`}/><path d="M66 51 79 47M66 58 79 54M66 65 76 62" fill="none" stroke="var(--li-b)" strokeWidth="2.2" opacity=".6"/></g>
    <path d="M60 46V83M40 49 53 53M40 57 53 61M40 65 50 68" fill="none" stroke="#13283a" strokeWidth="2" opacity=".65"/>
    <path d="m55 29 5-4 5 4-5 5Z" fill={`url(#${uid}-bright)`}/>
  </g>
}
function Estate({ uid }: IconGlyphProps) {
  return <g className="ng-estate">
    <path d="M60 26 91 39 88 67Q83 85 60 95Q37 85 32 67L29 39Z" fill={`url(#${uid}-metal)`}/>
    <path d="M60 31 86 42 83 66Q80 80 60 89Q40 80 37 66L34 42Z" fill={`url(#${uid}-accent)`}/>
    <path d="M60 37 79 46 77 65Q75 76 60 83Q45 76 43 65L41 46Z" fill="#0a1720"/>
    <g className="ng-estate-lock"><path d="m43 55 17-15 17 15v4H43Z" fill={`url(#${uid}-bright)`}/><path d="M47 59H73V75H65V63H55V75H47Z" fill={`url(#${uid}-metal)`}/><path d="m60 48 5 5-5 5-5-5Z" fill={`url(#${uid}-accent)`}/></g>
    <path d="M37 43 60 34 82 43" fill="none" stroke="var(--li-pale)" strokeWidth="1.3" opacity=".65"/>
    <path className="ng-estate-scan" d="M43 64H77" stroke="var(--li-pale)" strokeWidth="3" opacity="0"/>
  </g>
}
function Web({ uid }: IconGlyphProps) {
  return <g className="ng-web">
    <defs><clipPath id={`${uid}-world-clip`}><circle cx="60" cy="60" r="27"/></clipPath></defs>
    <circle cx="60" cy="60" r="33" fill={`url(#${uid}-metal)`}/>
    <circle cx="60" cy="60" r="29" fill={`url(#${uid}-accent)`}/>
    <circle cx="60" cy="60" r="24" fill="#0b1b2b"/>
    <g clipPath={`url(#${uid}-world-clip)`}>
      <g className="ng-web-meridian" fill="none" stroke={`url(#${uid}-bright)`} strokeWidth="3"><ellipse cx="60" cy="60" rx="12" ry="28"/><path d="M33 60H87M38 46Q60 54 82 46M38 74Q60 66 82 74"/></g>
      <path d="M37 37Q48 27 65 34L52 46 39 50Z" fill="white" opacity=".14"/>
    </g>
    <path d="m78 76 16 6-8 4-4 8Z" fill={`url(#${uid}-bright)`} stroke="#122236" strokeWidth="2" strokeLinejoin="round"/>
    <circle className="ng-web-travel" cx="60" cy="31" r="3" fill="var(--li-pale)"/>
  </g>
}
function WhatsApp({ uid }: IconGlyphProps) {
  return <g className="ng-whatsapp">
    <path d="M60 27C79 27 93 40 93 58S79 89 60 89Q51 89 44 85L28 92 32 74Q27 67 27 58C27 40 41 27 60 27Z" fill={`url(#${uid}-metal)`}/>
    <path d="M60 31C76 31 89 42 89 58S76 85 60 85Q51 85 44 80L34 85 37 73Q31 66 31 58C31 42 44 31 60 31Z" fill={`url(#${uid}-accent)`}/>
    <path d="M37 48Q47 31 70 36Q45 34 37 57Z" fill="white" opacity=".22"/>
    <g className="ng-whatsapp-handset"><path d="M45 42Q42 42 41 48Q40 60 51 70Q62 80 72 75L79 68Q80 66 77 64L68 60Q66 59 64 62L61 66Q53 63 50 55L54 52Q56 50 54 48L50 42Z" fill="#093c2b" opacity=".5" transform="translate(0 2)"/><path d="M45 42Q42 42 41 48Q40 60 51 70Q62 80 72 75L79 68Q80 66 77 64L68 60Q66 59 64 62L61 66Q53 63 50 55L54 52Q56 50 54 48L50 42Z" fill={`url(#${uid}-bright)`}/></g>
  </g>
}
function LifeLog({ uid }: IconGlyphProps) {
  return <g className="ng-lifelog">
    <path d="M36 31H77L87 41V89H36Q28 89 28 81V39Q28 31 36 31Z" fill={`url(#${uid}-metal)`}/>
    <path d="M38 35H76L83 43V83H38Z" fill={`url(#${uid}-accent)`}/>
    <path d="M34 36H40V84H34Z" fill="#192238"/><path d="M75 34V45H85" fill={`url(#${uid}-bright)`}/>
    <path d="M46 75H72M46 79H64" stroke="var(--li-pale)" strokeWidth="2" opacity=".5"/>
    <circle cx="61" cy="56" r="17" fill="#101829" stroke={`url(#${uid}-bright)`} strokeWidth="3"/>
    <path d="M61 42V45M75 56H72M61 70V67M47 56H50" stroke="var(--li-a)" strokeWidth="2"/>
    <g className="ng-lifelog-hand"><path d="M61 46V56L68 60" fill="none" stroke={`url(#${uid}-bright)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></g>
    <circle cx="61" cy="56" r="2.5" fill="var(--li-pale)"/>
    <path d="M38 86H81" stroke="#08101e" strokeWidth="2"/>
  </g>
}
function Rolodex({ uid }: IconGlyphProps) {
  return <g className="ng-rolodex">
    <g className="ng-rolodex-back"><path d="M37 28H78Q83 28 83 33V73H37Z" fill={`url(#${uid}-accent)`}/><path d="M40 32H77V38H40Z" fill="var(--li-pale)" opacity=".5"/></g>
    <g className="ng-rolodex-mid"><path d="M31 36H85V82H31Z" fill={`url(#${uid}-metal)`}/><path d="M36 40H80V46H36Z" fill="var(--li-a)" opacity=".6"/></g>
    <path d="M28 48Q28 44 32 44H88Q92 44 92 48V85Q92 89 88 89H32Q28 89 28 85Z" fill={`url(#${uid}-accent)`}/>
    <path d="M32 49H88V83H32Z" fill="#0e1b2d"/>
    <circle cx="47" cy="61" r="6" fill={`url(#${uid}-bright)`}/>
    <path d="M37 77Q37 67 47 67T57 77Z" fill={`url(#${uid}-metal)`}/>
    <path d="M64 58H80V61H64ZM64 66H80V69H64ZM64 74H74V77H64Z" fill={`url(#${uid}-bright)`}/>
    <path d="M42 85V93M78 85V93" stroke={`url(#${uid}-metal)`} strokeWidth="5" strokeLinecap="round"/>
  </g>
}
function Voice({ uid }: IconGlyphProps) {
  return <g className="ng-voice">
    <path d="M60 26C51 26 45 33 45 42V59C45 68 51 74 60 74S75 68 75 59V42C75 33 69 26 60 26Z" fill={`url(#${uid}-metal)`}/>
    <path d="M60 30C53 30 49 35 49 42V58C49 65 53 70 60 70S71 65 71 58V42C71 35 67 30 60 30Z" fill={`url(#${uid}-accent)`}/>
    <path d="M53 38H67M53 45H67M53 52H67M53 59H67" stroke="#131e30" strokeWidth="3" strokeLinecap="round"/>
    <path d="M38 56V59C38 72 47 82 60 82S82 72 82 59V56" fill="none" stroke={`url(#${uid}-bright)`} strokeWidth="5" strokeLinecap="round"/>
    <path d="M57 81H63V89H73L77 94H43L47 89H57Z" fill={`url(#${uid}-metal)`}/>
    <path className="ng-voice-wave ng-voice-wave-a" d="M30 49V65M90 49V65" stroke="var(--li-a)" strokeWidth="4" strokeLinecap="round"/>
    <path className="ng-voice-wave ng-voice-wave-b" d="M37 43V51M83 43V51" stroke="var(--li-pale)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M53 34Q56 31 62 32" stroke="white" strokeWidth="1.5" opacity=".6" fill="none"/>
  </g>
}
function Beacon({ uid }: IconGlyphProps) {
  return <g className="ng-agentbase">
    <path d="m60 26 31 53-9 13H38L29 79Z" fill={`url(#${uid}-metal)`}/>
    <path d="m60 31 25 47-7 9H42l-7-9Z" fill={`url(#${uid}-accent)`}/>
    <path d="m60 43 17 35H43Z" fill="#091426"/>
    <path d="m60 31 5 37-5 10-5-10Z" fill={`url(#${uid}-bright)`}/>
    <path d="m35 78 20-10 5 10-18 9ZM85 78 65 68 60 78 78 87Z" fill={`url(#${uid}-metal)`}/>
    <path d="m43 79 17 6 17-6-17 13Z" fill={`url(#${uid}-accent)`}/>
    <g className="ng-agentbase-core"><path d="m60 52 10 12-10 12-10-12Z" fill="#071426"/><path d="m60 55 7 9-7 8-7-8Z" fill={`url(#${uid}-bright)`}/><path d="m60 55 7 9-7 8Z" fill="var(--li-a)" opacity=".6"/></g>
    <path className="ng-agentbase-beam" d="M60 28V40M45 32 49 38M75 32 71 38" fill="none" stroke="var(--li-pale)" strokeWidth="2" strokeLinecap="round" opacity="0"/>
  </g>
}

// Shaan, 9 Oct: "I don't like the agent based icons ... the skills hub ones shit"; research and changelog "should be using the
// real icons". Five more scenes in the same family: metal frame, accent glass, one bright part that moves.
function AgentBase({ uid }: IconGlyphProps) {
  return <g className="ng-abc">
    <rect x="25" y="29" width="70" height="60" rx="11" fill={`url(#${uid}-metal)`}/>
    <rect x="29" y="40" width="62" height="45" rx="7" fill="#081221"/>
    <circle cx="35" cy="34.5" r="2" fill="var(--li-pale)"/><circle cx="42" cy="34.5" r="2" fill="var(--li-a)" opacity=".85"/><circle cx="49" cy="34.5" r="2" fill="var(--li-b)" opacity=".7"/>
    <rect className="ng-abc-tab" x="33" y="45" width="12" height="9" rx="2.5" fill={`url(#${uid}-accent)`}/>
    <rect x="33" y="57" width="12" height="9" rx="2.5" fill="#1b2b44"/>
    <rect x="33" y="69" width="12" height="9" rx="2.5" fill="#1b2b44"/>
    <path d="M51 48l5 4-5 4" fill="none" stroke={`url(#${uid}-bright)`} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
    <rect className="ng-abc-type" x="59" y="50.25" width="22" height="3.5" rx="1.75" fill={`url(#${uid}-accent)`}/>
    <rect className="ng-abc-caret" x="83" y="48.5" width="2.6" height="7.5" rx="1" fill="var(--li-pale)"/>
    <rect x="51" y="61" width="30" height="3" rx="1.5" fill="#24385a"/>
    <rect x="51" y="69" width="21" height="3" rx="1.5" fill="#24385a"/>
    <path d="M32 31.5Q60 28 88 31.5" stroke="white" strokeWidth="1.2" opacity=".35" fill="none"/>
  </g>
}
function SkillsHub({ uid }: IconGlyphProps) {
  return <g className="ng-skh">
    <path d="M27 74H93L87 92H33Z" fill={`url(#${uid}-metal)`}/>
    <path d="M37 79H83" stroke="#081221" strokeWidth="4" strokeLinecap="round"/>
    <rect x="35" y="30" width="38" height="30" rx="6" fill={`url(#${uid}-metal)`} transform="rotate(-12 54 45)"/>
    <rect x="47" y="31" width="38" height="30" rx="6" fill="#152238" stroke="var(--li-a)" strokeOpacity=".55" transform="rotate(10 66 46)"/>
    <g className="ng-skh-card">
      <rect x="39" y="40" width="42" height="36" rx="7" fill={`url(#${uid}-accent)`}/>
      <rect x="43" y="44" width="34" height="28" rx="5" fill="#0b1626"/>
      <path d="M62 47 53 60h7l-3 9 10-14h-7l3-8Z" fill={`url(#${uid}-bright)`}/>
    </g>
    <path className="ng-skh-spark" d="M60 29V23M47 32l-3-5M73 32l3-5" stroke="var(--li-pale)" strokeWidth="2" strokeLinecap="round" opacity="0"/>
  </g>
}
function Jev({ uid }: IconGlyphProps) {
  return <g className="ng-jev">
    <path d="M27 33Q27 27 33 27H65Q71 27 71 33V53Q71 59 65 59H44L35 67V59H33Q27 59 27 53Z" fill={`url(#${uid}-metal)`}/>
    <path d="M35 37H61M35 44H55M35 51H48" stroke="#13233a" strokeWidth="3" strokeLinecap="round"/>
    <g className="ng-jev-check">
      <path d="M50 52Q50 46 56 46H86Q92 46 92 52V76Q92 82 86 82H84V91L75 82H56Q50 82 50 76Z" fill={`url(#${uid}-accent)`}/>
      <circle cx="71" cy="64" r="12" fill="#0b1626"/>
      <path className="ng-jev-tick" d="M64.5 64.5l4.5 4.5 8.5-9.5" fill="none" stroke={`url(#${uid}-bright)`} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </g>
}
function Research({ uid }: IconGlyphProps) {
  return <g className="ng-rsc">
    <path d="M30 26H66L80 40V92H30Z" fill={`url(#${uid}-metal)`}/>
    <path d="M66 26V40H80Z" fill={`url(#${uid}-accent)`}/>
    <path d="M38 48H62M38 56H58M38 64H54M38 72H50" stroke="#13233a" strokeWidth="3" strokeLinecap="round"/>
    <g className="ng-rsc-lens">
      <circle cx="70" cy="70" r="15" fill="#0b1626" fillOpacity=".78" stroke={`url(#${uid}-bright)`} strokeWidth="5"/>
      <path d="M81 81l11 11" stroke={`url(#${uid}-accent)`} strokeWidth="7" strokeLinecap="round"/>
      <path d="M63 65Q66 60 72 60" stroke="white" strokeWidth="1.6" opacity=".55" fill="none"/>
    </g>
  </g>
}
function Changelog({ uid }: IconGlyphProps) {
  return <g className="ng-chl">
    <path d="M38 30V90" stroke="#1b2b44" strokeWidth="4" strokeLinecap="round"/>
    <circle className="ng-chl-dot" cx="38" cy="37" r="6.5" fill={`url(#${uid}-bright)`}/>
    <circle cx="38" cy="61" r="5" fill={`url(#${uid}-metal)`}/>
    <circle cx="38" cy="84" r="5" fill={`url(#${uid}-metal)`}/>
    <g className="ng-chl-new"><path d="M50 28H86Q92 28 92 34V40Q92 46 86 46H50Z" fill={`url(#${uid}-accent)`}/><path d="M57 37H80" stroke="#0b1626" strokeWidth="3" strokeLinecap="round"/></g>
    <path d="M50 52H82Q86 52 86 56V66Q86 70 82 70H50Z" fill={`url(#${uid}-metal)`}/>
    <path d="M56 61H76" stroke="#13233a" strokeWidth="3" strokeLinecap="round"/>
    <path d="M50 77H74Q78 77 78 81V87Q78 91 74 91H50Z" fill={`url(#${uid}-metal)`} opacity=".7"/>
  </g>
}

export const NAVIGATION_ICONS = {
  library: { label: 'Great Library of SISO', description: 'An open illuminated book inside the architecture of a knowledge archive.', motion: 'The right page lifts from its spine, catches the light, and settles.', colorA: '#e8c879', colorB: '#9871e6', pale: '#fff4d1', Glyph: Library },
  estate: { label: 'SISO Estate', description: 'A protected home within a faceted shield: the assets and systems SISO owns.', motion: 'The inner home seats into its shield as a security glint passes upward.', colorA: '#66d8c0', colorB: '#348aa2', pale: '#d5fff4', Glyph: Estate },
  web: { label: 'Web', description: 'A luminous world held in a machined circular rim, with a precise navigation pointer.', motion: 'The globe meridian turns once across the glass as a light travels its rim.', colorA: '#66d9ff', colorB: '#4266da', pale: '#e0faff', Glyph: Web },
  whatsapp: { label: 'WhatsApp', description: 'A custom emerald message bubble and sculpted ivory handset.', motion: 'The handset gives one brief two-part ring and returns to rest.', colorA: '#69eba0', colorB: '#139963', pale: '#eaffee', Glyph: WhatsApp },
  lifelog: { label: 'LifeLog', description: 'A bound personal chronicle with an inset timepiece; entirely synthetic artwork.', motion: 'The clock hand advances through a measured turn, then settles at its starting time.', colorA: '#d5a9f7', colorB: '#8664da', pale: '#f6eaff', Glyph: LifeLog },
  rolodex: { label: 'Rolodex', description: 'Layered contact cards with a bold portrait cutout and polished binding feet.', motion: 'The rear cards fan apart briefly, then stack neatly again.', colorA: '#7aaff7', colorB: '#5e74c4', pale: '#ecf3ff', Glyph: Rolodex },
  'siso-voice': { label: 'SISO Voice', description: 'A sculpted microphone capsule in a luminous cradle with responsive wave bars.', motion: 'The side waves answer in a short staggered phrase and settle.', colorA: '#f4af79', colorB: '#ca5d90', pale: '#fff0d9', Glyph: Voice },
  beacon: { label: 'The lab · Beacon', description: 'A distinct three-sided architectural beacon surrounding a suspended intelligence core.', motion: 'The inner core rises and brightens; three rays briefly appear before it seats again.', colorA: '#72caff', colorB: '#4567e8', pale: '#e5f7ff', Glyph: Beacon },
  'agent-base': { label: 'Agent Base', description: 'A machined console window: a tab per agent down its side, a prompt typing into the glass.', motion: 'The command types out and the caret blinks twice.', colorA: '#ff8f7f', colorB: '#d9443c', pale: '#ffe6df', Glyph: AgentBase },
  'skills-hub': { label: 'Skills Hub', description: 'A skill cartridge with a lightning core, slotting into a hub socket in front of two more.', motion: 'The front cartridge lifts and seats with a spark.', colorA: '#ffc24b', colorB: '#e2852a', pale: '#fff3d6', Glyph: SkillsHub },
  jev: { label: 'Jev', description: "Two speech bubbles: the agent's claim, and Jev's second opinion with a check.", motion: 'The answer bubble pops forward and the check draws.', colorA: '#ffd36b', colorB: '#c98a22', pale: '#fff6dc', Glyph: Jev },
  research: { label: 'Research', description: 'A folded page of findings under a polished lens.', motion: 'The lens sweeps across the lines and settles.', colorA: '#a8d6ff', colorB: '#41567a', pale: '#e8f5ff', Glyph: Research },
  changelog: { label: 'Changelog', description: 'A release timeline: a bright newest entry above two older ones.', motion: 'The newest entry slides in and its dot pulses.', colorA: '#ffc24b', colorB: '#ff6a1a', pale: '#fff0d6', Glyph: Changelog },
} satisfies Record<string, LivingIconDefinition>
