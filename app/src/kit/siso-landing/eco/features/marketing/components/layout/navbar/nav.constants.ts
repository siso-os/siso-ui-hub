// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/nav.constants.ts)
// ═══════════════════════════════════════════════════════════════════════════════
// Dropdown Theme - single source of truth for all dropdown styling
// Values are foreplay.co's (foreplay.original.css: .container, .nav-dropdown-menu*, .nav-overline-title)
// ═══════════════════════════════════════════════════════════════════════════════

export const DROPDOWN = {
  // Positioning: the box spans .container (max 1440, 40px side padding) just under the 72px bar
  top: 80, // under the 64px rim capsule + 10px padding (was 67 under Foreplay's 72px bar)
  maxWidth: 1360,
  sidePadding: 40,

  // Box styling (all dropdowns share these values)
  bg: '#020308',
  border: '#2a2b30',
  borderRadius: 28,

  // Open animation (.nav-dropdown-menu → .w--open)
  ease: 'cubic-bezier(.19,1,.22,1)',
  durationMs: 500,
} as const;

// Section overline (RESEARCH, EXTEND, LEARN ...): .nav-overline-title + .text-overline
export const LABEL = {
  fontSize: 12,
  fontWeight: 550,
  lineHeight: '16px',
  letterSpacing: '0.166667em',
  textTransform: 'uppercase' as const,
  color: '#ffffffd6',
  padding: 8,
  marginBottom: 8,
} as const;

// Item title: .text-label-s
export const LINK_ITEM = {
  fontSize: 14,
  fontWeight: 500,
  color: '#fff',
  lineHeight: '20px',
  letterSpacing: '-0.00642857em',
} as const;

// Item description: .text-body-s in #ffffffad
export const LINK_DESC = {
  fontSize: 14,
  fontWeight: 400,
  color: '#ffffffad',
  lineHeight: '20px',
  letterSpacing: '-0.00642857em',
} as const;

export const DIVIDER = '1px solid #2a2b30';

// Kept for the public API; dropdowns open on click like foreplay.co's
export const HOVER_DELAY_MS = 120;
